import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Juspay, APIError } from 'expresscheckout-nodejs';

// CUSTOM IMPORTS
import { PaymentRepository } from './repository/payment.repository';
import { AwsService } from '../helper/aws.helper';
import { OrderStatus } from './enum/orderStatus.enum';
import { BadRequestException, InternalServerErrorException } from '../_app/exceptions';
import { RefundStatus } from './enum/refundStatus.enum';
import { PointService } from '../point/point.service';
import { PointAssignmentType } from '../point/enum/points.enum';
import { ActivitySubType, ActivityType } from '../activity/enum/activity.enum';
import { PointAmountRepository } from '../point/repository/pointAmount.repository';
import { InitiatePaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymentService {
  private merchantId: string;
  private juspay: Juspay;
  private baseUrl: string;
  private keyUuid: string;
  private paymentPageClientId: string;
  private port: number;
  private publicKey;
  private privateKey;
  private bucketName: string;
  private publicKeyPath: string;
  private privateKeyPath: string;
  private juspayBucketPrefix: string;
  private publicKeyName: string;
  private privateKeyName: string;
  private publicEncryptionKeyName: string;
  private privateEncryptionKeyName: string;
  private publicEncryptionKeyPath: string;
  private privateEncryptionKeyPath: string;
  private frontendUrl: string;
  private readonly logger: Logger = new Logger(PaymentService.name);

  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly awsService: AwsService,
    private readonly configService: ConfigService,
    private readonly pointService: PointService,
    private readonly pointAmountRepository: PointAmountRepository,
  ) {
    (async () => {
      this.merchantId = this.configService.get('JUSPAY_MERCHANT_ID');
      this.baseUrl = this.configService.get('JUSPAY_BASE_URL');
      this.keyUuid = this.configService.get('JUSPAY_KEY_UUID');
      this.paymentPageClientId = this.configService.get('JUSPAY_PAYMENT_PAGE_CLIENT_ID');
      this.port = configService.get('port');
      this.bucketName = this.configService.get('JUSPAY_JWK_BUCKET_NAME');
      this.juspayBucketPrefix = this.configService.get('JUSPAY_BUCKET_PREFIX');
      this.publicKeyName = this.configService.get('JUSPAY_JWK_PUBLIC_KEY_NAME');
      this.privateKeyName = this.configService.get('JUSPAY_JWK_PRIVATE_KEY_NAME');
      this.publicKeyPath = `${this.juspayBucketPrefix}${this.publicKeyName}`;
      this.privateKeyPath = `${this.juspayBucketPrefix}${this.privateKeyName}`;
      this.publicEncryptionKeyName = this.configService.get('JUSPAY_JWK_PUBLIC_ENCRYPTION_KEY_NAME');
      this.privateEncryptionKeyName = this.configService.get('JUSPAY_JWK_PRIVATE_ENCRYPTION_KEY_NAME');
      this.frontendUrl = this.configService.get('FRONTEND_URL');
      this.publicEncryptionKeyPath = `${this.juspayBucketPrefix}${this.publicEncryptionKeyName}`;
      this.privateEncryptionKeyPath = `${this.juspayBucketPrefix}${this.privateEncryptionKeyName}`;
      this.publicKey = await this.awsService.retrieveAndDecryptFile(
        this.bucketName,
        this.publicKeyPath,
        this.publicEncryptionKeyPath,
      );
      this.privateKey = await this.awsService.retrieveAndDecryptFile(
        this.bucketName,
        this.privateKeyPath,
        this.privateEncryptionKeyPath,
      );

      this.juspay = new Juspay({
        merchantId: this.merchantId,
        baseUrl: this.baseUrl,
        jweAuth: {
          keyId: this.keyUuid,
          publicKey: this.publicKey,
          privateKey: this.privateKey,
        },
      });
    })();
  }

  async initiatePayment(body: InitiatePaymentDto[], userId: string, protocol: string, hostname: string) {
    try {
      const orderId = `order_${Date.now()}`;
      const returnUrl = `${protocol}://${hostname}/v1/payment/user/${userId}/handle_response`;

      let _amount = 0;
      let _points = 0;

      if (!body.length) {
        throw new BadRequestException('Required paramteres are missing');
      }

      for (const cartDetails of body) {
        const { amount, points } = await this.pointAmountRepository.getPointAmountMappingById(
          cartDetails.pointAmountMappingId,
        );

        _amount += cartDetails.quantity * Number(amount);
        _points += cartDetails.quantity * points;
      }

      // once fetched multiply the amount and points by quantity to get the final amount and points

      const _paymentDetails = {
        orderId,
        userId,
        amount: _amount,
        points: _points,
      };

      const paymentDetails = await this.paymentRepository.savePayment(_paymentDetails);

      if (!paymentDetails) {
        throw new InternalServerErrorException('Payment creation failed');
      }

      const sessionResponse = await this.juspay.orderSession.create({
        order_id: orderId,
        amount: _amount,
        payment_page_client_id: this.paymentPageClientId, // [required] shared with you, in config.json
        customer_id: userId, // [optional] your customer id here
        action: 'paymentPage', // [optional] default is paymentPage
        return_url: returnUrl, // [optional] default is value given from dashboard
        currency: 'INR', // [optional] default is INR
        udf1: _points.toString(),
        udf2: userId,
      });

      // removes http field from response, typically you won't send entire structure as response
      return {
        data: this.makeJuspayResponse(sessionResponse),
      };
    } catch (error) {
      if (error instanceof APIError) {
        // handle errors comming from juspay's api
        return this.makeError(error.message);
      }
      return this.makeError();
    }
  }

  async handlePaymentResponse(orderId: string, isTimeout?: boolean) {
    try {
      const statusResponse = await this.juspay.order.status(orderId);
      const orderStatus = statusResponse.status;

      const paymentDetails = await this.paymentRepository.updatePayment(orderId, {
        status: statusResponse.status,
        $push: { transactionIds: { $each: [statusResponse.txn_id] } },
        isTimeout: isTimeout || false,
      });

      if (!paymentDetails) {
        throw new InternalServerErrorException('Payment updation failed');
      }

      let message = '';
      switch (orderStatus) {
        case OrderStatus.CHARGED:
          message = 'order payment done successfully';
          this.pointService.updatePoints(
            statusResponse.udf2,
            {
              points: statusResponse.udf1,
              type: 'credit',
              description: '',
              expiryDate: '',
              steps: [PointAssignmentType.PAYMENT],
            },
            { type: ActivityType.UNIVERSAL, subType: ActivitySubType.PAYMENT },
          );
          break;
        case OrderStatus.PENDING:
        case OrderStatus.PENDING_VBV:
          message = 'order payment pending';
          break;
        case OrderStatus.AUTHORIZATION_FAILED:
          message = 'order payment authorization failed';
          break;
        case OrderStatus.AUTHENTICATION_FAILED:
          message = 'order payment authentication failed';
          break;
        default:
          message = 'order status ' + orderStatus;
          break;
      }

      // removes http field from response, typically you won't send entire structure as response
      return {
        data: this.makeJuspayResponse(statusResponse),
      };
    } catch (error) {
      if (error instanceof APIError) {
        // handle errors comming from juspay's api,
        return this.makeError(error.message);
      }
      return this.makeError();
    }
  }

  makeJuspayResponse(successRspFromJuspay) {
    if (successRspFromJuspay == undefined) return successRspFromJuspay;
    if (successRspFromJuspay.http != undefined) delete successRspFromJuspay.http;
    return successRspFromJuspay;
  }

  makeError(message?) {
    return {
      message: message || 'Something went wrong',
    };
  }

  async handleWebhookResponse(webhookResponse) {
    const orderId = webhookResponse?.content?.order?.order_id;
    const status = webhookResponse?.content?.order?.status;

    if (webhookResponse.event_name === 'ORDER_REFUNDED' || webhookResponse.event_name === 'ORDER_REFUND_FAILED') {
      const refundStatus = webhookResponse?.content?.order?.refunds[0].status;
      const paymentDetails = await this.paymentRepository.updatePayment(orderId, refundStatus);

      if (!paymentDetails) {
        this.logger.error('Payment updation failed');
      }

      return true;
    }

    if (webhookResponse.event_name === 'ORDER_SUCCEEDED') {
      this.pointService.updatePoints(
        webhookResponse.content.order.udf2,
        {
          points: webhookResponse.content.order.udf1,
          type: 'credit',
          description: '',
          expiryDate: '',
          steps: [PointAssignmentType.PAYMENT],
        },
        { type: ActivityType.UNIVERSAL, subType: ActivitySubType.PAYMENT },
      );
    }

    if (!orderId || !status) {
      this.logger.error('OrderId or status not found');
      return false;
    }

    const paymentDetails = await this.paymentRepository.updatePayment(orderId, status);

    if (!paymentDetails) {
      this.logger.error('Payment updation failed');
    }

    return true;
  }

  async processRefund(orderId: string) {
    try {
      const orderDetails = await this.paymentRepository.getOrderDetails({
        orderId,
        refundStatus: RefundStatus.NA,
        isTimeout: true,
      });

      const requestId = `refund_${Date.now()}`;
      const refundResponse = await this.juspay.order.refund(orderId, {
        unique_request_id: requestId,
        order_id: orderId,
        amount: orderDetails.amount,
      });

      await this.paymentRepository.updatePayment(orderId, {
        refundStatus: refundResponse.refunds[0].status,
        refundUniqueRequestId: refundResponse.refunds[0].unique_request_id,
      });

      return {
        data: this.makeJuspayResponse(refundResponse),
      };
    } catch (error) {
      if (error instanceof APIError) {
        // handle errors comming from juspay's api,
        return this.makeError(error.message);
      }
      return this.makeError();
    }
  }

  async getTransactionDetails(userId: string, page: number, limit: number) {
    const offset = (page - 1) * limit;

    return {
      data: {
        totalRecords: await this.paymentRepository.getTotalTransactions(userId),
        transactions: await this.paymentRepository.getTransactionDetails(userId, offset, limit),
      },
    };
  }
}

import { Controller, Post, Body, Req, Res, UseGuards, HttpCode, HttpStatus, Get, Param, Query } from '@nestjs/common';

import { PaymentService } from './payment.service';
import { JwtAuthGuard } from '../auth/guards/jwtauth.guard';
import { InitiatePaymentDto } from './dto/payment.dto';
import { JuspayWebHookGuard } from '../auth/guards/juspayWebhookAuth.guard';
import { PaymentHelper } from '../helper/payment.helper';
import { BadRequestException } from '../_app/exceptions';
import { ConfigService } from '@nestjs/config';
import { ConfigEnv } from '../config/config.env.enums';

@Controller('payment/user/:id')
export class PaymentController {
  private readonly frontendUrl: string;
  constructor(
    private paymentService: PaymentService,
    private readonly paymentHelper: PaymentHelper,
    private readonly configService: ConfigService,
  ) {
    this.frontendUrl = `${this.configService.get(ConfigEnv.FRONTEND_URL)}`;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/initiate')
  initiatePayment(
    @Body() body: InitiatePaymentDto[],
    @Req() { protocol, hostname },
    @Param('id') userId,
  ) {
    return this.paymentService.initiatePayment(body, userId, protocol, hostname);
  }

  @Post('/handle_response')
  async handlePaymentResponse(@Body() body, @Res() res) {
    const isSignatureValid = this.paymentHelper.verifyHmacSignature(body);
    if (isSignatureValid) {
      const response: any = await this.paymentService.handlePaymentResponse(body.order_id);
      const { status, amount, udf1: points, order_id: orderId } = response.data;
      const code = Buffer.from(JSON.stringify({ status, amount, points, orderId })).toString('base64');
      return res.redirect(`${this.frontendUrl}/user/store?code=${code}`);
    }
    throw new BadRequestException('Signature invalid');
  }

  @UseGuards(JuspayWebHookGuard)
  @Post('/handle_webhook')
  @HttpCode(HttpStatus.OK)
  handleWebhookResponse(@Body() body) {
    return this.paymentService.handleWebhookResponse(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/order_details/:orderId')
  getOrderDetails(@Param('orderId') orderId: string, @Query('isTimeout') isTimeout: boolean) {
    return this.paymentService.handlePaymentResponse(orderId, isTimeout);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/refund/:orderId')
  processRefund(@Param('orderId') orderId: string) {
    return this.paymentService.processRefund(orderId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('transaction_details')
  getTransactionDetails(@Body() { page, limit }, @Param('id') userId: string) {
    return this.paymentService.getTransactionDetails(userId, page, limit);
  }
}

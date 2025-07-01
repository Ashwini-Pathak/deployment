import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { asyncHandler } from '../_app/utils';
import { format } from 'util';

@Injectable()
export class SmsService {
  private readonly logger: Logger = new Logger(SmsService.name);
  private headers: { apikey: string; };
  private url: string;

  // FORM BODY
  private userId: string;
  private password: string;
  private senderId: string;
  private dltEntityId: string;
  private sendMethod: string;
  private msgType: string;
  private dltTemplateId: string;
  private output: string;
  private duplicateCheck: string;
  private msgPayload: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.headers = {
      apikey: this.configService.get('SMS_API_KEY'),
    };

    this.url = this.configService.get<string>('SMS_SERVER_URL');

    this.userId = this.configService.get<string>('SMS_USER_ID');
    this.password = this.configService.get<string>('SMS_PASSWORD');
    this.senderId = this.configService.get<string>('SMS_SENDER_NAME');
    this.dltEntityId = this.configService.get<string>('SMS_DLT_ENTITY_ID');
    this.sendMethod = this.configService.get<string>('SMS_SEND_METHOD', 'quick');
    this.msgType = this.configService.get<string>('SMS_MSG_TYPE', 'text');
    this.dltTemplateId = this.configService.get<string>('SMS_DLT_TEMPLATE_ID');
    this.output = this.configService.get<string>('SMS_OUTPUT', 'json');
    this.duplicateCheck = this.configService.get<string>('SMS_DUPLICATE_CHECK', 'true');
    this.msgPayload = this.configService.get<string>('SMS_PAYLOAD', 'true');
  }

  async sendOtp(payload: { countryCode: number; phoneNumber: number; token: number; }) {
    this.logger.log('Sending OTP');
    const { countryCode, phoneNumber, token } = payload;

    try {
      const url = `${this.url}/send`;

      const body = new FormData();
      body.append('userid', this.userId);
      body.append('password', this.password);
      body.append('mobile', `${countryCode}${phoneNumber}`);
      body.append('senderid', this.senderId);
      body.append('dltEntityId', this.dltEntityId);
      body.append('msg', format(this.msgPayload, token));
      body.append('sendMethod', this.sendMethod);
      body.append('msgType', this.msgType);
      body.append('dltTemplateId', this.dltTemplateId);
      body.append('output', this.output);
      body.append('duplicatecheck', this.duplicateCheck);

      const [otpResponse] = await asyncHandler(
        this.httpService.axiosRef.post(url, body, { headers: this.headers }),
      );

      this.logger.log({ otpResponse });

      return otpResponse;
    } catch (error) {
      this.logger.error({ error }, 'Error Occured');
      throw new Error('Error Occured');
    }
  }
}

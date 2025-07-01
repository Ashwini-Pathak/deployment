import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export class TwilioHelper {
  private readonly logger: Logger = new Logger(TwilioHelper.name);

  private twilioClient: Twilio;
  private twilioServiceSID;

  constructor(private readonly configService: ConfigService) {
    const accountSid = configService.get('twilioAccountSID');
    const authToken = configService.get('twilioAuthToken');
    this.twilioServiceSID = this.configService.get('twilioServiceSID');

    this.twilioClient = new Twilio(accountSid, authToken);
  }

  async verifyOtp(payload) {
    const { countryCode, phoneNumber, otp } = payload;
    try {
      const verificationResponse = await this.twilioClient.verify.v2
        .services(this.twilioServiceSID)
        .verificationChecks.create({
          to: `+${countryCode}${phoneNumber}`,
          code: otp,
        });

      this.logger.log({ verificationResponse }, 'received verification response');

      return verificationResponse;
    } catch (error) {
      this.logger.error({ error }, 'Error occured while verifying otp');
      throw error;
    }
  }

  async sendOtp(payload) {
    this.logger.log('Sending OTP');
    const { countryCode, phoneNumber } = payload;

    try {
      const otpResponse = await this.twilioClient.verify.v2.services(this.twilioServiceSID).verifications.create({
        to: `+${countryCode}${phoneNumber}`,
        channel: 'sms',
      });

      this.logger.log({ otpResponse });

      return otpResponse;
    } catch (error) {
      this.logger.error({ error }, 'Error Occured');
      throw new Error('Error Occured');
    }
  }
}

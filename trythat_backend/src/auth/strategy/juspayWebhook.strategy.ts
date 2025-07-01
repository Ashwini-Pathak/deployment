import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy } from 'passport-http';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class JuspayWebhookStrategy extends PassportStrategy(BasicStrategy, 'juspayWebhook') {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  async validate(username, password): Promise<any> {
    const _username = this.configService.get('JUSPAY_WEBHOOK_USERNAME');
    const _password = this.configService.get('JUSPAY_WEBHOOK_PASSWORD');

    if (username !== _username || password !== password) {
      return null;
    }

    return true;
  }
}

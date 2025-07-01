import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-linkedin-oauth2';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigEnv } from '../../config/config.env.enums';

@Injectable()
export class LinkedinStrategy extends PassportStrategy(Strategy, 'linkedin') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('linkedinClientID'),
      clientSecret: configService.get('linkedinClientSecret'),
      callbackURL: `${configService.get(ConfigEnv.HOST_URL)}/auth/linkedin/callback`,
      scope: ['openid', 'profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    done(null, profile);
  }
}

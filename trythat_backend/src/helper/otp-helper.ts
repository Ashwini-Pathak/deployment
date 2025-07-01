import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OtpHelper {
  constructor(private readonly configService: ConfigService) {}

  generateToken() {
    return Math.floor(100000 + Math.random() * 900000);
  }
}

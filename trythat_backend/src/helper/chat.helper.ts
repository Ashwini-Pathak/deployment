import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { get } from 'lodash';
import { asyncHandler } from '../_app/utils';

@Injectable()
export class ChatService {
  private readonly logger: Logger = new Logger(ChatService.name);
  private appId;
  private region;
  private headers;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.appId = this.configService.get('COMETCHAT_APPID');
    this.region = this.configService.get('COMETCHAT_REGION');

    this.headers = {
      accept: 'application/json',
      apikey: this.configService.get('COMETCHAT_AUTHKEY'),
      'content-type': 'application/json',
    };
  }

  async createChatUser(chatData) {
    const url = `https://${this.appId}.api-${this.region}.cometchat.io/v3/users`;
    this.logger.log({ url }, 'urlchat');

    const [chatResp, chatErr] = await asyncHandler(
      this.httpService.axiosRef.post(url, chatData, { headers: this.headers }),
    );

    if (chatErr) {
      const chatErrMessage = get(chatErr, 'response.data.error.message', '');
      const chatErrCode = get(chatErr, 'response.data.error.code');
      this.logger.error({ chatErr, chatErrMessage, chatErrCode }, 'Error occured while creating comet chat user');
      const errResp = {
        message: chatErrMessage,
        code: chatErrCode,
        status: get(chatErr, 'status', 500),
      };
      return errResp;
    }
    this.logger.log({ chatResp }, 'Comet chat user created');
    return {
      message: get(chatResp, 'data.data', ''),
      status: get(chatResp, 'status', 500),
    };
  }
}

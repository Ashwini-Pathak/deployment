import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { get, isEmpty } from 'lodash';
import CryptoJS = require('crypto-js');

// custom imports
import { asyncHandler } from '../_app/utils';
import { formatFmsPayload } from '../_app/utils/formatFmsPayload';

@Injectable()
export class FmsHelper {
  private readonly logger: Logger = new Logger(FmsHelper.name);
  private readonly hostUrl: string;
  private readonly uiUrl: string;
  private readonly password: string;
  private readonly secretKey: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.hostUrl = this.configService.get('FMS_HOST_URL');
    this.uiUrl = this.configService.get('FMS_UI_URL');
    this.password = this.configService.get('FMS_PASSWORD');
    this.secretKey = this.configService.get('FMS_SECRET_KEY');
  }

  // TODO: Revisit for if conditions specific to FMS
  async authenticateUser(payload) {
    this.logger.log({ payload }, 'FMS payload');

    const registerResp = await this.registerUser(payload);

    this.logger.log({ registerResp }, 'Register response ');

    const loginResp = await this.loginUser(payload);
    this.logger.log({ loginResp }, 'login response ');

    if (!isEmpty(get(loginResp, 'message', ''))) {
      return {
        fmsDetails: {
          message: get(loginResp, 'message.message', ''),
        },
      };
    }

    return loginResp;
  }

  async registerUser(payload) {
    const requestUrl = `${this.hostUrl}/auth/user/save`;

    const _payload = formatFmsPayload(payload);

    this.logger.log({ requestUrl, _payload }, 'Register FMS payload');

    const [registerResp, registerErr] = await asyncHandler(this.httpService.axiosRef.post(requestUrl, _payload));

    if (registerErr) {
      const errResp = {
        message: get(registerErr, 'response.text', ''),
        status: get(registerErr, 'response.code', 500),
      };

      this.logger.error({ errResp }, 'Error occured while making request to FMS ');

      return errResp;
    }

    this.logger.log({ registerResp: registerResp?.data }, 'Register FMS completed');

    return registerResp?.data;
  }

  async loginUser(payload) {
    const requestUrl = `${this.hostUrl}/auth/signin`;

    const { email } = payload;
    const _payload = {
      username: email,
      password: this.password,
    };

    this.logger.log({ requestUrl, _payload }, 'Login FMS payload');

    const [loginResp, loginErr] = await asyncHandler(this.httpService.axiosRef.post(requestUrl, _payload));

    // TODO: Revisit the response from FMS
    if (loginErr) {
      const errResp = {
        message: get(loginErr, 'response.error', ''),
        status: get(loginErr, 'response.status', 500),
      };

      this.logger.error({ errResp }, 'Error occured while making login request to FMS ');

      return errResp;
    }

    this.logger.log({ loginResp: loginResp?.data }, 'Login to FMS completed');

    const loginPaylod = get(loginResp, 'data', {});
    const id = get(loginPaylod, 'userId', '');
    const accessToken = get(loginPaylod, 'token', '');

    let urlToken = CryptoJS.AES.encrypt(JSON.stringify(loginPaylod), this.secretKey).toString();
    //urlencodding
    urlToken = encodeURIComponent(`=${urlToken}`);

    return {
      fmsDetails: {
        id,
        accessToken,
        url: `${this.uiUrl}?token=${urlToken}`,
      },
    };
  }
}

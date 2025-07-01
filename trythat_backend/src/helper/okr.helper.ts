import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { get, isEmpty } from 'lodash';
import CryptoJS = require('crypto-js');
import generator = require('generate-password');

// custom imports
import { asyncHandler } from '../_app/utils';

@Injectable()
export class OkrHelper {
  private readonly logger: Logger = new Logger(OkrHelper.name);

  private readonly hostUrl;
  private readonly uiUrl;
  private readonly organizationId;
  private readonly secretKey;
  private readonly prefix;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.hostUrl = this.configService.get('OKR_HOST_URL');
    this.uiUrl = this.configService.get('OKR_UI_URL');
    this.secretKey = this.configService.get('OKR_SECRET_KEY');
    this.organizationId = this.configService.get('OKR_ORGANIZATION');
    this.prefix = 'V3*l-';
  }

  async authenticateUser(payload) {
    this.logger.log({ payload }, 'OKR Payload');
    const registerResp = await this.registerUser(payload);

    this.logger.log({ registerResp }, 'Register response ');

    if (
      (!isEmpty(get(registerResp, 'message', '')) &&
        get(registerResp, 'message') === 'Organization user already exists') ||
      get(registerResp, 'result') === true
    ) {
      const loginResp = await this.loginUser(payload);
      this.logger.log({ loginResp }, 'login response ');

      if (!isEmpty(get(loginResp, 'message', ''))) {
        return {
          okrDetails: {
            message: get(loginResp, 'message.message', ''),
          },
        };
      }

      return loginResp;
    }

    return registerResp;
  }

  async registerUser(payload) {
    const { name, email } = payload;

    const requestUrl = `${this.hostUrl}/organization/registerSSO`;
    const uniqStr = `${this.prefix}${generator.generate({
      length: 7,
      numbers: true,
    })}`;

    const _payload = {
      fullName: name,
      work_email: email,
      organization_name: `${this.organizationId}`,
      org_Info_filled: true,
      flag: 5,
    };

    this.logger.log({ requestUrl, _payload }, 'Register OKR payload');

    const [registerResp, registerErr] = await asyncHandler(this.httpService.axiosRef.post(requestUrl, _payload));

    if (registerErr) {
      const errResp = {
        message: get(registerErr, 'response.data', ''),
        status: get(registerErr, 'response.statusCode', 500),
      };

      this.logger.error({ errResp }, 'Error occured while making request to OKR ');

      return errResp;
    }

    this.logger.log({ registerResp: registerResp?.data }, 'Register OKR completed');

    return registerResp?.data;
  }

  async loginUser(payload) {
    const requestUrl = `${this.hostUrl}/organization/login_organizationSSO`;

    const { email } = payload;
    const _payload = {
      email,
    };

    this.logger.log({ requestUrl, _payload }, 'Login OKR payload');

    const [loginResp, loginErr] = await asyncHandler(this.httpService.axiosRef.post(requestUrl, _payload));

    if (loginErr) {
      const errResp = {
        message: get(loginErr, 'response.data', ''),
        status: get(loginErr, 'response.status', 500),
      };

      this.logger.error({ errResp }, 'Error occured while making login request to OKR ');

      return errResp;
    }

    this.logger.log({ loginResp: loginResp?.data }, 'Login to OKR completed');

    const loginPaylod = get(loginResp, 'data', {});
    const id = get(loginPaylod, 'data._id', '');
    const accessToken = get(loginPaylod, 'token', '');
    const urlToken = CryptoJS.AES.encrypt(JSON.stringify(loginPaylod), this.secretKey).toString();

    return {
      okrDetails: {
        id,
        accessToken,
        url: `${this.uiUrl}?token=${urlToken}`,
      },
    };
  }
}

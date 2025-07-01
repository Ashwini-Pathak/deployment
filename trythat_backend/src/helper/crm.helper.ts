import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { get, isEmpty } from 'lodash';
import CryptoJS = require('crypto-js');
import generator = require('generate-password');

// custom imports
import { asyncHandler } from '../_app/utils';
import { formatDataForCrm } from '../_app/utils/formatCrmData';

@Injectable()
export class CrmHelper {
  private readonly logger: Logger = new Logger(CrmHelper.name);

  private readonly hostUrl;
  private readonly uiUrl;
  private readonly organizationId;
  private readonly registerKey;
  private readonly loginKey;
  private readonly secretKey;
  private readonly prefix;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.hostUrl = this.configService.get('CRM_HOST_URL');
    this.uiUrl = this.configService.get('CRM_UI_URL');
    this.organizationId = this.configService.get('CRM_ORGANIZATION');
    this.registerKey = this.configService.get('CRM_ENCRYPTION_KEY');
    this.loginKey = this.configService.get('CRM_LOGIN_KEY');
    this.secretKey = this.configService.get('CRM_SECRET_KEY');
    this.prefix = 'V3*l-';
  }

  async authenticateUser(payload) {
    const registerResp = await this.registerUser(payload);

    this.logger.log({ registerResp }, 'Register response ');

    if (
      !isEmpty(get(registerResp, 'message', '')) &&
      (get(registerResp, 'message.msg') === 'Email already exists. Please login' ||
        get(registerResp, 'message.msg') === 'Mobile already exists. Please login')
    ) {
      const loginResp = await this.loginUser(payload);
      this.logger.log({ loginResp }, 'login response ');

      if (!isEmpty(get(loginResp, 'message', ''))) {
        return {
          crmDetails: {
            message: get(loginResp, 'message.msg', ''),
          },
        };
      }

      return loginResp;
    }

    return registerResp;
  }

  async registerUser(payload) {
    const { name, email, phone, industryType, orgName, role } = payload;

    const requestUrl = `${this.hostUrl}/register/registeremail`;
    const uniqStr = `${this.prefix}${generator.generate({
      length: 7,
      numbers: true,
    })}`;

    const _payload = {
      organizationName: orgName,
      encrypted: this.registerKey,
      'email.verified': true,
      password: uniqStr,
      confirmPassword: uniqStr,
      firstName: name,
      lastName: name,
      email: email,
      mobile: `${phone}`,
      indystry: `${industryType}`,
      roleTitle: role,
    };

    this.logger.log({ requestUrl, _payload }, 'Register CRM payload');

    const [registerResp, registerErr] = await asyncHandler(this.httpService.axiosRef.post(requestUrl, _payload));

    if (registerErr) {
      const errResp = {
        message: get(registerErr, 'response.data', ''),
        status: get(registerErr, 'response.status', 500),
      };

      this.logger.error({ errResp }, 'Error occured while making request to CRM ');

      return errResp;
    }

    this.logger.log({ registerResp: registerResp?.data }, 'Register CRM completed');

    const loginPaylod = get(registerResp, 'data.data', {});
    const id = get(loginPaylod, 'userData._id', '');
    const accessToken = get(loginPaylod, 'accessToken', '');
    const urlToken = CryptoJS.AES.encrypt(JSON.stringify(loginPaylod), this.secretKey).toString();

    return {
      crmDetails: {
        id,
        accessToken,
        url: `${this.uiUrl}?token=${urlToken}`,
      },
    };
  }

  async loginUser(payload) {
    const requestUrl = `${this.hostUrl}/direct-login`;

    const { email } = payload;
    const _payload = {
      email,
      password: this.loginKey,
    };

    this.logger.log({ requestUrl, _payload }, 'Login CRM payload');

    const [loginResp, loginErr] = await asyncHandler(this.httpService.axiosRef.post(requestUrl, _payload));

    if (loginErr) {
      const errResp = {
        message: get(loginErr, 'response.data', ''),
        status: get(loginErr, 'response.status', 500),
      };

      this.logger.error({ errResp }, 'Error occured while making login request to CRM ');

      return errResp;
    }

    this.logger.log({ loginResp: loginResp?.data }, 'Login to CRM completed');

    const loginPaylod = get(loginResp, 'data.data', {});
    const id = get(loginPaylod, 'userData._id', '');
    const accessToken = get(loginPaylod, 'accessToken', '');
    const urlToken = CryptoJS.AES.encrypt(JSON.stringify(loginPaylod), this.secretKey).toString();

    return {
      crmDetails: {
        id,
        accessToken,
        url: `${this.uiUrl}?token=${urlToken}`,
      },
    };
  }

  async createLead(payload, crmDetails) {
    /* 
    {
      "LeadsOwnerId": "65e6b17a40d9c7ec8d6bdcb7",
      "FirstName": "",
      "LastName": "",
      "Company": "",
      "Title": "",
      "Mobile": "",
      "Email": "",
      "City": "",
      "ModuleTitle": "Leads"
    }
    */

    const formattedCrmData = formatDataForCrm(payload);
    this.logger.log({ formattedCrmData }, 'CRM formatted data');
    const requestUrl = `${this.hostUrl}/leads`;
    const { accessToken, id } = crmDetails;

    this.logger.log({ requestUrl, formattedCrmData }, 'create CRM lead payload');

    const [createLeadResp, createLeadErr] = await asyncHandler(
      this.httpService.axiosRef.post(
        requestUrl,
        { ...formattedCrmData, ModuleTitle: 'Leads', LeadsOwnerId: id },
        {
          headers: {
            'X-Auth-Token': `bearer ${accessToken}`,
          },
        },
      ),
    );

    if (createLeadErr) {
      const errResp = {
        message: get(createLeadErr, 'response.data', ''),
        status: get(createLeadErr, 'response.status', 500),
      };

      this.logger.error({ errResp }, 'Error occured while making request to CRM ');

      return errResp;
    }

    this.logger.log({ createLeadResp: createLeadResp?.data }, 'CRM lead POST completed');

    return {
      response: get(createLeadResp, 'data', {}),
    };
  }
}

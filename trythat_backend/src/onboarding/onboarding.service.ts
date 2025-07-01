import { Injectable, Logger } from '@nestjs/common';
import { ContactUsRepository } from './repository/contactUs.repository';
import { ApplicationRepository } from './repository/application.repository';

import { OkrHelper } from '../helper/okr.helper';
import { FmsHelper } from '../helper/fms.helper';

import { get, isEmpty } from 'lodash';

import { InternalServerErrorException, NotFoundException } from '../_app/exceptions';

import { MailService } from '../mail/mail.service';
import { CrmHelper } from '../helper/crm.helper';

@Injectable()
export class OnboardingService {
  private readonly logger: Logger = new Logger(OnboardingService.name);

  constructor(
    private readonly contactUsRepository: ContactUsRepository,
    private readonly applicationRepository: ApplicationRepository,
    private readonly mailService: MailService,
    private readonly crmHelper: CrmHelper,
    private readonly okrHelper: OkrHelper,
    private readonly fmsHelper: FmsHelper,
  ) {}

  async addContactUs({ userId, name, email, message }) {
    const contactUsEmailDetails = await this.contactUsRepository.addContactUs({ userId, name, email, message });
    if (!contactUsEmailDetails) {
      throw new NotFoundException('Failed to add contact us details');
    }

    this.mailService.sendContactUs({ userId, name, email, message });
    this.mailService.sendContactUsUserConfirmation({ name, email });

    return {
      message: 'contact us details added',
      data: contactUsEmailDetails,
    };
  }

  async registerCrm(crmPayload, userId) {
    this.logger.log({ crmPayload, userId }, 'Crm payload');

    const _data = await this.crmHelper.authenticateUser(crmPayload);

    if (isEmpty(get(_data, 'crmDetails.accessToken', ''))) {
      throw new InternalServerErrorException('Error occured while authenticating CRM');
    }

    this.logger.log({ crmDetails: _data }, 'Adding applications details');

    const data = await this.applicationRepository.registerApplication(_data, userId);

    return {
      message: `crm login response`,
      data: get(data, 'crmDetails'),
    };
  }

  async registerOkr(okrPayload, userId) {
    this.logger.log({ okrPayload, userId }, 'okr payload');

    const _data = await this.okrHelper.authenticateUser(okrPayload);

    if (isEmpty(get(_data, 'okrDetails.accessToken', ''))) {
      throw new InternalServerErrorException('Error occured while authenticating FMS');
    }

    const data = await this.applicationRepository.registerApplication(_data, userId);

    return {
      message: `okr login response`,
      data: get(data, 'okrDetails'),
    };
  }

  async registerFms(fmsPayload, userId) {
    this.logger.log({ fmsPayload, userId }, 'fms payload');

    const _data = await this.fmsHelper.authenticateUser(fmsPayload);

    if (isEmpty(get(_data, 'fmsDetails.accessToken', ''))) {
      throw new InternalServerErrorException('Error occured while authenticating FMS');
    }

    const data = await this.applicationRepository.registerApplication(_data, userId);

    return {
      message: `fms login response`,
      data: get(data, 'fmsDetails'),
    };
  }
}

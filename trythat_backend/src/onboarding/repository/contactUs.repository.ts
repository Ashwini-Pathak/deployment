import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InternalServerErrorException } from '../../_app/exceptions';
import { asyncHandler } from '../../_app/utils';
import { DatabaseEnv } from '../../config/database-env.enum';
import { AddContactUsDto, ContactUsDto } from '../dto/contactUs.dto';
import { ContactUs, ContactUsDocument } from '../schema/contactUs.schema';

@Injectable()
export class ContactUsRepository {
  private readonly logger: Logger = new Logger(ContactUsRepository.name);
  constructor(
    @InjectModel(ContactUs.name, DatabaseEnv.DB_USER_CONN)
    private readonly contactUsModel: Model<ContactUsDocument>,
  ) {}

  async addContactUs(contactUsEmailDetails: AddContactUsDto) {
    this.logger.log({ concernDetails: contactUsEmailDetails }, 'Adding contact us details');

    const dbcontactUs = new this.contactUsModel(contactUsEmailDetails);
    const [contactUsResponse, contactUsRespError] = await asyncHandler(dbcontactUs.save());

    if (contactUsRespError || !contactUsResponse) {
      this.logger.error({ contactUsResponse, contactUsRespError }, 'Error occured while adding contact us details');
      throw new InternalServerErrorException();
    }

    this.logger.log({ contactUsResponse }, 'Recieved response');
    return dbcontactUs;
  }
}

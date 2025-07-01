import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DatabaseEnv } from '../../../config/database-env.enum';
import { Industry, IndustryDocument } from '../schemas/Industry.schema';

@Injectable()
export class IndustryRepository {
  private readonly logger: Logger = new Logger(IndustryRepository.name);

  constructor(@InjectModel(Industry.name, DatabaseEnv.DB_USER_CONN) private industryModel: Model<IndustryDocument>) {}

  getAllIndustries() {
    return this.industryModel.find({});
  }

  getIndustry(industryId: string) {
    return this.industryModel.findOne({ _id: industryId });
  }
}

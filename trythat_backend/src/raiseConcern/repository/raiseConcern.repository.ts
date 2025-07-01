import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InternalServerErrorException } from '../../_app/exceptions';
import { asyncHandler } from '../../_app/utils/';
import { DatabaseEnv } from '../../config/database-env.enum';
import { AddConcernDto } from '../dto/raiseConcern.dto';
import { RaiseConcern, RaiseConcernDocument } from '../schema/raiseConcern.schema';

@Injectable()
export class RaiseConcernRepository {
  private readonly logger: Logger = new Logger(RaiseConcernRepository.name);
  constructor(
    @InjectModel(RaiseConcern.name, DatabaseEnv.DB_USER_CONN)
    private readonly raiseConcernModel: Model<RaiseConcernDocument>,
  ) {}

  async addConcern(concernDetails: AddConcernDto) {
    this.logger.log({ concernDetails }, 'Adding concern');

    const userConcern = new this.raiseConcernModel(concernDetails);
    const [concernResp, concernRespErr] = await asyncHandler(userConcern.save());

    if (concernRespErr || !concernResp) {
      this.logger.error({ concernResp, concernRespErr }, 'Error occured while adding concern');
      throw new InternalServerErrorException();
    }

    this.logger.log({ concernResp }, 'Recieved response');
    return userConcern;
  }
}

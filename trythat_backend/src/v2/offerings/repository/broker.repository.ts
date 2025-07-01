import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DatabaseEnv } from '../../../config/database-env.enum';
import { InternalServerErrorException } from '../../../_app/exceptions';
import { asyncHandler } from '../../../_app/utils/';
import { Broker, BrokerDocument } from '../schemas/Broker.schema';

@Injectable()
export class BrokerRepository {
  private readonly logger: Logger = new Logger(BrokerRepository.name);

  constructor(@InjectModel(Broker.name, DatabaseEnv.DB_USER_CONN) private brokerModel: Model<BrokerDocument>) {}

  async createBroker(userId, brokerDetails) {
    try {
      this.logger.log('create broker request');

      const _brokerDetails = new this.brokerModel({ userId, ...brokerDetails });
      const [savedBrokerResp, savedBrokerError] = await asyncHandler(_brokerDetails.save());

      if (savedBrokerError) {
        this.logger.error({ savedBrokerError }, 'Error occured while saving broker');
      }

      if (!savedBrokerResp) {
        this.logger.error({ savedBrokerResp }, 'Error occured');
        throw new InternalServerErrorException();
      }

      return savedBrokerResp;
    } catch (error) {
      this.logger.error('error occured while creating broker');

      throw new InternalServerErrorException('Error occured while creating broker', error);
    }
  }

  getBrokerDetails(userId: string, limit: number, offset: number) {
    return this.brokerModel.find({ userId }).skip(offset).limit(limit);
  }

  getTotalBrokers(userId: string) {
    return this.brokerModel.countDocuments({ userId });
  }

  async updateBroker(brokerId: string, dataToUpdate) {
    const [updateBrokerResp, updateBrokerError] = await asyncHandler(
      this.brokerModel.findOneAndUpdate({ _id: brokerId }, dataToUpdate, {
        new: true,
      }),
    );

    if (updateBrokerError || !updateBrokerResp) {
      this.logger.error({ updateBrokerError, updateBrokerResp }, 'Error occured while updateBrokerResp request');

      throw new InternalServerErrorException('Error occured while updating broker', {
        updateBrokerError,
        updateBrokerResp,
      });
    }

    return updateBrokerResp;
  }
}

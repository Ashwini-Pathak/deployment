import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DatabaseEnv } from '../../../config/database-env.enum';
import { InternalServerErrorException } from '../../../_app/exceptions';
import { asyncHandler } from '../../../_app/utils/';
import { CoWorker, CoWorkerDocument } from '../schemas/Co-worker.schema';

@Injectable()
export class CoWorkerRepository {
  private readonly logger: Logger = new Logger(CoWorkerRepository.name);

  constructor(@InjectModel(CoWorker.name, DatabaseEnv.DB_USER_CONN) private coWorkerModel: Model<CoWorkerDocument>) {}

  async createCoWorker(userId, coWorkerDetails) {
    try {
      this.logger.log('create co-worker request');

      const _coWorkerDetails = new this.coWorkerModel({ userId, ...coWorkerDetails });
      const [savedCoWorkerResp, savedCoWorkerError] = await asyncHandler(_coWorkerDetails.save());

      if (savedCoWorkerError) {
        this.logger.error({ savedCoWorkerError }, 'Error occured while saving co-worker');
      }

      if (!savedCoWorkerResp) {
        this.logger.error({ savedCoWorkerResp }, 'Error occured');
        throw new InternalServerErrorException();
      }

      return savedCoWorkerResp;
    } catch (error) {
      this.logger.error('error occured while creating co-worker');

      throw new InternalServerErrorException('Error occured while creating co-worker', error);
    }
  }

  getCoWorkerDetails(userId: string, limit: number, offset: number) {
    return this.coWorkerModel.find({ userId }).skip(offset).limit(limit);
  }

  getTotalCoWorkers(userId: string) {
    return this.coWorkerModel.countDocuments({ userId });
  }

  async updateCoWorker(coworkerId: string, dataToUpdate) {
    const [updateCoworkerResp, updateCoworkerError] = await asyncHandler(
      this.coWorkerModel.findOneAndUpdate({ _id: coworkerId }, dataToUpdate, {
        new: true,
      }),
    );

    if (updateCoworkerError || !updateCoworkerResp) {
      this.logger.error({ updateCoworkerError, updateCoworkerResp }, 'Error occured while updateCoworkerResp request');

      throw new InternalServerErrorException('Error occured while updating coworker', {
        updateCoworkerError,
        updateCoworkerResp,
      });
    }

    return updateCoworkerResp;
  }
}

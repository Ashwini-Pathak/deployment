import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InternalServerErrorException } from '../../../_app/exceptions';
import { asyncHandler } from '../../../_app/utils/';
import { DatabaseEnv } from '../../../config/database-env.enum';
import { Preference, PreferenceDocument } from '../schema/Preference.schema';
import { CreatePreferenceDto } from '../dto/create-preference.dto';
import { PreferenceList, PreferenceListDocument } from '../schema/Preference-list.schema';

@Injectable()
export class PreferenceRepository {
  private readonly logger: Logger = new Logger(PreferenceRepository.name);

  constructor(
    @InjectModel(Preference.name, DatabaseEnv.DB_USER_CONN)
    private readonly preferenceModel: Model<PreferenceDocument>,

    @InjectModel(PreferenceList.name, DatabaseEnv.DB_USER_CONN)
    private readonly preferenceListModel: Model<PreferenceListDocument>,
  ) {}

  async findUsersByPreference(preference, userId) {
    const query = {
      $or: [
        { dreamClients: { $in: preference?.dreamClients } },
        { interest: { $in: preference?.interest } },
        { userSells: { $in: preference?.userSells } },
        { userTargetAudience: { $in: preference?.userTargetAudience } },
        { userWouldBuy: { $in: preference?.userWouldBuy } },
      ],
      userId: { $ne: userId },
    };

    const data = await this.preferenceModel.find(query, { userId: 1 });

    return data.map((el) => el.userId);
  }

  async createPreference(userId, createPreference: CreatePreferenceDto) {
    this.logger.log({ createPreference, userId }, 'Adding preference');

    const [updatePreferenceResp, updatePreferenceErr] = await asyncHandler(
      this.preferenceModel.findOneAndUpdate({ userId }, createPreference, {
        new: true,
        upsert: true,
      }),
    );

    if (updatePreferenceErr || !updatePreferenceResp) {
      this.logger.error({ updatePreferenceResp, updatePreferenceErr }, 'Error occured while adding concern');
      throw new InternalServerErrorException();
    }

    this.logger.log({ updatePreferenceResp }, 'Recieved response');
    return updatePreferenceResp;
  }

  async findUserPreference(userId) {
    this.logger.log({ userId }, 'Finding user preference');

    const [userPreferenceResp, userPreferenceErr] = await asyncHandler(this.preferenceModel.find({ userId }));

    if (userPreferenceErr || !userPreferenceResp) {
      this.logger.error({ userPreferenceResp, userPreferenceErr }, 'Error occured while adding concern');
      throw new InternalServerErrorException();
    }

    this.logger.log({ userPreferenceResp }, 'Recieved response');
    return userPreferenceResp;
  }

  async getPreferenceList(type) {
    this.logger.log({ type }, 'getting preference list');

    const [preferenceListResp, preferenceListErr] = await asyncHandler(this.preferenceListModel.find({ type }));

    if (preferenceListErr || !preferenceListResp) {
      this.logger.error({ preferenceListResp, preferenceListErr }, 'Error occured while getting preferences list');
      throw new InternalServerErrorException();
    }

    this.logger.log({ preferenceListResp }, 'Recieved response');
    return preferenceListResp;
  }
}

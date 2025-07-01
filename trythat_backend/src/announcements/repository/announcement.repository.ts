import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Announcements, AnnouncementsDocument } from '../schemas/Announcements.schema';
import { DatabaseEnv } from '../../config/database-env.enum';
import { asyncHandler } from '../../_app/utils/';
import { InternalServerErrorException } from '../../_app/exceptions';
import { AnnouncementDto } from '../../announcements/dto/announcement.dto';

@Injectable()
export class AnnouncementsRepository {
  private readonly logger: Logger = new Logger(AnnouncementsRepository.name);

  constructor(
    @InjectModel(Announcements.name, DatabaseEnv.DB_USER_CONN) private announcementsModel: Model<AnnouncementsDocument>,
  ) {}

  async createAnnouncement(announcement) {
    this.logger.log('createAnnouncement request');

    const _announcement = new this.announcementsModel(announcement);
    const [saveAnnouncementResp, saveAnnouncementError] = await asyncHandler(_announcement.save());

    if (saveAnnouncementError || !saveAnnouncementResp) {
      this.logger.error({ saveAnnouncementError, saveAnnouncementResp }, 'Error occured while saving announcement');
      throw new InternalServerErrorException('Error occured while saving announcement', {
        saveAnnouncementError,
        saveAnnouncementResp,
      });
    }

    return saveAnnouncementResp;
  }

  async getAnnouncements() {
    this.logger.log('getAnnouncements request');
    const [getAnnouncementResp, getAnnouncementError] = await asyncHandler(this.announcementsModel.find({}));

    if (getAnnouncementError || !getAnnouncementResp) {
      this.logger.error({ getAnnouncementError, getAnnouncementResp }, 'Error occured while getAnnouncements request');
      throw new InternalServerErrorException('Error occured while saving announcement', {
        getAnnouncementError,
        getAnnouncementResp,
      });
    }

    return getAnnouncementResp;
  }

  async getAnnouncementById(id: string) {
    this.logger.log('getAnnouncementById request');

    const [getAnnouncementResp, getAnnouncementError] = await asyncHandler(this.announcementsModel.findById(id));

    if (getAnnouncementError || !getAnnouncementResp) {
      this.logger.error({ getAnnouncementError, getAnnouncementResp }, 'Error occured while getAnnouncements request');

      throw new InternalServerErrorException('Error occured while saving announcement', {
        getAnnouncementError,
        getAnnouncementResp,
      });
    }

    return getAnnouncementResp;
  }

  async updateAnnouncement(id: string, announcementDto: AnnouncementDto) {
    this.logger.log({ id, announcementDto }, 'updateAnnouncement request ');

    await this.getAnnouncementById(id);

    const filter = { _id: id };
    const update = announcementDto;
    const [updateAnnouncementResp, updateAnnouncementError] = await asyncHandler(
      this.announcementsModel.findOneAndUpdate(filter, update, {
        new: true,
      }),
    );

    if (updateAnnouncementError || !updateAnnouncementResp) {
      this.logger.error(
        { updateAnnouncementError, updateAnnouncementResp },
        'Error occured while updateAnnouncementResp request',
      );

      throw new InternalServerErrorException('Error occured while saving announcement', {
        updateAnnouncementError,
        updateAnnouncementResp,
      });
    }

    return updateAnnouncementResp;
  }

  async getAnnouncementsByUser(id) {
    this.logger.log('getAnnouncementsByUser request');
    const filter = { $or: [{ isGlobal: { $eq: true } }, { users: [id] }] };
    const [getAnnouncementResp, getAnnouncementError] = await asyncHandler(this.announcementsModel.find(filter));

    if (getAnnouncementError || !getAnnouncementResp) {
      this.logger.error(
        { getAnnouncementError, getAnnouncementResp },
        'Error occured while getAnnouncementsByUser request',
      );
      throw new InternalServerErrorException(`Error occured while retrieving announcements for user ${id}`, {
        getAnnouncementError,
        getAnnouncementResp,
      });
    }

    return getAnnouncementResp;
  }
}

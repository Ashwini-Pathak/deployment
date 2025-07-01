import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DatabaseEnv } from '../../config/database-env.enum';
import { asyncHandler } from '../../_app/utils/';
import { InternalServerErrorException } from '../../_app/exceptions';
import { Notifications, NotificationsDocument } from '../schemas/Notifications.schema';

@Injectable()
export class NotificationsRepository {
  private readonly logger: Logger = new Logger(NotificationsRepository.name);

  constructor(
    @InjectModel(Notifications.name, DatabaseEnv.DB_USER_CONN) private notificationsModel: Model<NotificationsDocument>,
  ) {}

  async createNotification(notification) {
    this.logger.log('createNotification request');

    const _notification = new this.notificationsModel(notification);
    const [saveNotificationResp, saveNotificationError] = await asyncHandler(_notification.save());

    if (saveNotificationError || !saveNotificationResp) {
      this.logger.error({ saveNotificationError, saveNotificationResp }, 'Error occured while saving announcement');
      throw new InternalServerErrorException('Error occured while saving announcement', {
        saveNotificationError,
        saveNotificationResp,
      });
    }

    return saveNotificationResp;
  }

  async getNotifications(userId: string) {
    this.logger.log({ userId }, 'getNotifications request');
    const [getNotificationsResp, getNotificationsError] = await asyncHandler(this.notificationsModel.find({ userId }));

    if (getNotificationsError || !getNotificationsResp) {
      this.logger.error(
        { getNotificationsError, getNotificationsResp },
        'Error occured while getNotifications request',
      );

      throw new InternalServerErrorException('Error occured while saving announcement', {
        getNotificationsError,
        getNotificationsResp,
      });
    }

    return getNotificationsResp;
  }

  async updateNotification(userId: string, notificationId, status) {
    this.logger.log({ userId }, 'updateNotification request');

    const filter = { _id: notificationId };
    const update = { status };

    const [updateNotificationResp, updateNotificationError] = await asyncHandler(
      this.notificationsModel.findOneAndUpdate(filter, update, {
        new: true,
      }),
    );

    if (updateNotificationError || !updateNotificationResp) {
      this.logger.error(
        { updateNotificationError, updateNotificationResp },
        'Error occured while getNotifications request',
      );

      throw new InternalServerErrorException('Error occured while saving announcement', {
        updateNotificationError,
        updateNotificationResp,
      });
    }

    return updateNotificationResp;
  }
}

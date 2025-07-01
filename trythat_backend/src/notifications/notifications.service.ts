import { Injectable, Logger } from '@nestjs/common';

import { NotificationDto } from './dto/notification.dto';
import { NotificationsRepository } from './repository/notification.repository';

@Injectable()
export class NotificationsService {
  private readonly logger: Logger = new Logger(NotificationsService.name);

  constructor(private readonly notificationRepository: NotificationsRepository) {}

  async createNotification(notificationDto: NotificationDto) {
    this.logger.log('Creating notification');

    const data = await this.notificationRepository.createNotification(notificationDto);

    return {
      message: 'Notification created',
      data,
    };
  }

  async getUserNotifications(userId: string) {
    this.logger.log('getting all user notifications');

    const response = await this.notificationRepository.getNotifications(userId);

    return {
      message: 'Retrieved all user notifications',
      data: response,
    };
  }

  async updateNotificationStatus(userId: string, notificationId: string, status: boolean) {
    this.logger.log('getting all user notifications');

    const response = await this.notificationRepository.updateNotification(userId, notificationId, status);

    return {
      message: 'updated notification ' + notificationId,
      data: response,
    };
  }
}

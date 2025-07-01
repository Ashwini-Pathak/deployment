import { Injectable, Logger } from '@nestjs/common';
import { ActivityRepository } from './repository/activity.repository';

@Injectable()
export class ActivityService {
  private readonly logger: Logger = new Logger(ActivityService.name);

  constructor(private readonly activityRepository: ActivityRepository) {}

  async getActivity(userId: string) {
    const activityLogs = await this.activityRepository.getActivity(userId);
    return {
      message: 'retrived user activity',
      data: activityLogs,
    };
  }

  async createActivity(userId: string, activityLog: any) {
    const userActivity = { userId, ...activityLog };
    const activityLogs = await this.activityRepository.createActivity(userActivity);
    return {
      message: 'created user activity',
      data: activityLogs,
    };
  }
}

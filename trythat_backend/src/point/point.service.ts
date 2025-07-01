import { Injectable, Logger } from '@nestjs/common';
import { PointsRepository } from './repository/points.repository';
import { PointsTransactionType } from './enum/points.enum';
import { NotFoundException } from '../_app/exceptions';
import { PointsDto } from './dto/points.dto';
import { ActivityDto } from '../activity/dto/activity.dto';
import { ActivityAction, ActivitySubType, ActivityType } from '../activity/enum/activity.enum';
import { ActivityService } from '../activity/activity.service';
import { Activity } from '../activity/enum/activity.entity';
import { TransactionService } from '../transaction/transaction.service';
import { PointAmountRepository } from './repository/pointAmount.repository';

@Injectable()
export class PointService {
  private readonly logger: Logger = new Logger(PointService.name);

  constructor(
    private readonly pointRepository: PointsRepository,
    private readonly pointAmountRepository: PointAmountRepository,
    private readonly activityService: ActivityService,
    private readonly transactionService: TransactionService,
  ) {}

  async getPoints(userId: string) {
    const userPoints = await this.pointRepository.getPoints(userId);

    if (!userPoints) {
      throw new NotFoundException('User Points Not found');
    }

    return {
      message: 'retrived user points',
      data: userPoints,
    };
  }

  async updatePoints(userId: string, payload: PointsDto, activity: Activity, resourceName?: string) {
    const existingUserPoints: any = await this.pointRepository.getPoints(userId);
    const useractivity: ActivityDto = {
      type: activity.type,
      subType: activity.subType,
      message: undefined,
    };
    let transactionPayload;
    this.logger.log({ existingUserPoints }, 'Retrieved existing user points');
    if (!existingUserPoints) {
      const userPointsDetails = await this.pointRepository.addPoints({ userId, ...payload });

      if (!userPointsDetails) {
        throw new NotFoundException('Failed to assign poinst to user');
      }
      useractivity.message = `${payload.points} ${ActivityAction.CREDIT} for ${useractivity.subType}`;
      await this.activityService.createActivity(userId, useractivity);
      return {
        message: 'retrived user points',
        data: userPointsDetails,
      };
    }

    this.logger.log({ payload }, 'computing on exisiting points');
    if (payload.type == PointsTransactionType.CREDIT) {
      existingUserPoints.points += Number(payload.points);
      useractivity.message = `${payload.points} ${ActivityAction.CREDIT} for ${useractivity.subType}`;
    }

    if (payload.type == PointsTransactionType.DEBIT) {
      existingUserPoints.points -= Number(payload.points);
      useractivity.message = `${payload.points} ${ActivityAction.DEBIT} for ${useractivity.subType}`;
      transactionPayload = {
        itemUnlocked: resourceName,
        pointUtilised: payload.points,
        purchaseDate: Date.now(),
        category: useractivity.subType,
      };
      await this.transactionService.createTransaction(userId, transactionPayload);
    }

    if (payload?.steps) {
      existingUserPoints.steps.push(payload.steps);
    }

    const updatedUserPoints = await this.pointRepository.updatePoints(userId, existingUserPoints);
    await this.activityService.createActivity(userId, useractivity);
    return {
      message: 'retrived user points',
      data: updatedUserPoints,
    };
  }

  async getPointAmountMapping() {
    return {
      data: await this.pointAmountRepository.getPointAmountMapping()
    };
  }
}

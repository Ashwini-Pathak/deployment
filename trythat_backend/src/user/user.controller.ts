import {
  Controller,
  Get,
  UseGuards,
  Param,
  Post,
  Body,
  Query,
  HttpCode,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { UserService } from './user.service';
import { ProfileDetailsDto, ProfileDetailsQueryDto } from './dto/profile-details.dto';
import { GeoCodeDto } from './dto/geo-code.dto';
import { JwtAuthGuard } from '../auth/guards/jwtauth.guard';

import { PointService } from '../point/point.service';
import { ActivityService } from '../activity/activity.service';
import { UpdateNotificationStatusDto } from '../notifications/enum/notification-status.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { OtpPayloadSendDto, OtpPayloadVerifyDto } from './dto/otp.dto';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private userService: UserService,
    private readonly pointService: PointService,
    private readonly activityService: ActivityService,
  ) {}

  @Get('/:id')
  getUserDetails(@Param('id') userId: string) {
    return this.userService.getUserDetails(userId);
  }

  @Post('/:id/profile-details')
  updateProfile(
    @Body() profileDetails: ProfileDetailsDto,
    @Param('id') userId: string,
    @Query() profileDetailsType: ProfileDetailsQueryDto,
  ) {
    return this.userService.createProfileDetails(userId, profileDetailsType, profileDetails);
  }

  @Get('/:id/points')
  getUserPoints(@Param('id') userId: string) {
    return this.pointService.getPoints(userId);
  }

  @Get('/:id/activity')
  getActivity(@Param('id') userId: string) {
    return this.activityService.getActivity(userId);
  }

  @Get('/:id/completion')
  getProfileCompletion(@Param('id') userId: string) {
    return this.userService.getUserProfileCompletion(userId);
  }

  @HttpCode(200)
  @Post('/:id/geo-location')
  getLocation(@Body() geoCodeDto: GeoCodeDto) {
    return this.userService.getLocation(geoCodeDto);
  }

  @HttpCode(200)
  @Get('/:id/geo-location')
  getLocationBySearch(@Query('query') searchQuery: string) {
    return this.userService.getLocationBySearch(searchQuery);
  }

  @HttpCode(200)
  @Get('/:id/announcements')
  getUserAnnouncements(@Param('id') id: string) {
    return this.userService.getUserAnnouncements(id);
  }

  @HttpCode(200)
  @Get('/:id/notifications')
  getUserNotifications(@Param('id') id: string) {
    return this.userService.getUserNotifications(id);
  }

  @Patch('/:id/notification/:notificationId/status')
  updateNotificationStatus(
    @Param('id') id: string,
    @Param('notificationId') notificationId: string,
    @Body() updateNotificationStatusDto: UpdateNotificationStatusDto,
  ) {
    const { status } = updateNotificationStatusDto;
    return this.userService.updateNotificationStatus(id, notificationId, status);
  }

  @Post('/:id/image')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() imagePayload: Express.Multer.File, @Param('id') userId: string) {
    return this.userService.uploadImage(imagePayload, userId);
  }

  @Post('/:id/otp/send')
  sendOtp(@Body() sendOtpPayload: OtpPayloadSendDto, @Param('id') userId: string) {
    return this.userService.sendOtp(sendOtpPayload, userId);
  }

  @Post('/:id/otp/verify')
  verifyOtp(@Body() verifyOtpPayload: OtpPayloadVerifyDto, @Param('id') userId: string) {
    return this.userService.verifyOtp(verifyOtpPayload, userId);
  }
}

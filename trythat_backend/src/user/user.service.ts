import { Injectable, Logger, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { pick } from 'lodash';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

// CUSTOM IMPORTS
import { UsersRepository } from './repository/users.repository';
import { ForbiddenException, InternalServerErrorException, NotFoundException } from '../_app/exceptions/';
import { GeoCodeDto } from './dto/geo-code.dto';
import { asyncHandler, getFormatedLocations, getFormatedPredictions } from '../_app/utils/';
import { ConfigEnv } from '../config/config.env.enums';
import { AnnouncementsService } from '../announcements/announcements.service';
import { NotificationsService } from '../notifications/notifications.service';
import { pointAssignmentRule } from '../point/rules/rule.engine.constant';
import { RuleEngineService } from '../point/rules/ruleEngine.strategy';
import { PointService } from '../point/point.service';
import { calculateProfileCompletion } from './utils/user.util';
import { ActivitySubType, ActivityType } from '../activity/enum/activity.enum';
import { AwsService } from '../helper/aws.helper';
import { AuthService } from '../auth/auth.service';
import { OtpType } from '../auth/enum/OtpType.enum';
import { OtpPayloadVerifyDto } from './dto/otp.dto';
import { MailService } from '../mail/mail.service';
import { ProfileDetailsType } from './enum/profileDetailsType.enum';
import { SmsService } from '../sms/sms.service';
import { CrmHelper } from '../helper/crm.helper';
import { OtpHelper } from '../helper/otp-helper';

@Injectable()
export class UserService {
  private googlePlacesApiUrl;
  private googleGeoCodeUrl;
  private readonly logger: Logger = new Logger(UserService.name);

  constructor(
    @Inject(CACHE_MANAGER) private cacheService: Cache,
    private readonly usersRepository: UsersRepository,
    private configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly ruleEngineService: RuleEngineService,
    private readonly announcementsService: AnnouncementsService,
    private readonly notificationService: NotificationsService,
    private readonly pointService: PointService,
    private readonly awsService: AwsService,
    private mailService: MailService,
    private authService: AuthService,
    private readonly smsService: SmsService,
    private readonly crmHelper: CrmHelper,
    private readonly otpHelper: OtpHelper,
  ) {
    this.googleGeoCodeUrl = `${configService.get(ConfigEnv.GOOGLE_MAPS_API_URL)}/geocode/json?key=${configService.get(ConfigEnv.GOOGLE_API_KEY)}&region=in`;
    this.googlePlacesApiUrl = `${configService.get(ConfigEnv.GOOGLE_MAPS_API_URL)}/place/autocomplete/json?key=${configService.get(ConfigEnv.GOOGLE_API_KEY)}`;
  }

  async getUserDetails(userId: string) {
    const userProfile = await this.usersRepository.getUserDetails(userId);

    if (!userProfile) {
      throw new NotFoundException('User Not found');
    }

    return {
      message: 'retrived user profile',
      data: userProfile,
    };
  }

  async getLocation(payload: GeoCodeDto) {
    const { latitude = '', longitude = '' } = payload;

    const requestUrl = `${this.googleGeoCodeUrl}&latlng=${latitude},${longitude}`;

    const { data: geoLocationResults } = await firstValueFrom(
      this.httpService.get(requestUrl).pipe(
        catchError((error) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );

    this.logger.log({ locationResults: geoLocationResults?.results.length }, 'Received geolocation recieved');

    this.logger.log({ locationResults: geoLocationResults?.results.length }, 'Received geolocation recieved');

    if (geoLocationResults['status'] === 'ZERO_RESULTS') {
      return {
        message: 'no results found',
        data: {},
      };
    }

    const locationDetails = getFormatedLocations(geoLocationResults);

    return {
      message: 'Geolocation fetched successfully',
      data: {
        locationDetails,
      },
    };
  }

  async createProfileDetails(userId, profileDetailsType, profileDetails) {
    const { type } = profileDetailsType;
    const _profileDetails = await this.usersRepository.findUserAndUpdate(userId, type, profileDetails);

    if (!_profileDetails) {
      throw new NotFoundException('User Not found');
    }

    const existingSteps = await this.pointService.getPoints(userId);
    const profileCompletion = calculateProfileCompletion(_profileDetails);
    const facts = {
      step: type,
      status: existingSteps.data.steps?.includes(type),
      completion: profileCompletion[type],
    };
    const rules = pointAssignmentRule;
    const { events, success } = await this.ruleEngineService.execute(rules, facts);
    if (success) {
      const pointsPayload = {
        points: events[0].params.points,
        steps: events[0].params.step,
        type: events[0].type,
      };
      await this.pointService.updatePoints(userId, pointsPayload, {
        type: ActivityType.UNIVERSAL,
        subType: ActivitySubType[type],
      });
    }

    return {
      message: `${type} created`,
      data: _profileDetails,
    };
  }

  async getUserProfileCompletion(userId) {
    const userProfile = await this.usersRepository.getUserDetails(userId);

    if (!userProfile) {
      throw new NotFoundException('User Not found');
    }

    const userProfileCompletion = calculateProfileCompletion(userProfile);
    return {
      message: 'retrived user profile completion',
      data: userProfileCompletion,
    };
  }

  async getLocationBySearch(searchQuery) {
    const requestUrl = `${this.googlePlacesApiUrl}&types=geocode&input=${searchQuery}`;

    this.logger.log({ requestUrl }, 'Fetching request for getLocationBySearch');
    const { data: predictionsResult } = await firstValueFrom(
      this.httpService.get(requestUrl).pipe(
        catchError((error) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );

    this.logger.log({ locationResults: predictionsResult?.predictions.length }, 'Received predictionsResult recieved');

    if (predictionsResult['status'] === 'ZERO_RESULTS') {
      return {
        message: 'no results found',
        data: {},
      };
    }

    const locationDetails = getFormatedPredictions(predictionsResult);

    return {
      message: 'Geolocation fetched successfully',
      data: {
        locationDetails,
      },
    };
  }

  // ANNOUNCEMENTS
  async getUserAnnouncements(id) {
    const data = await this.announcementsService.getUserAnnouncements(id);

    return data;
  }

  // NOTIFICATIONS
  async getUserNotifications(id) {
    const data = await this.notificationService.getUserNotifications(id);

    return data;
  }

  async updateNotificationStatus(id, notificationId, status) {
    const data = await this.notificationService.updateNotificationStatus(id, notificationId, status);

    return data;
  }

  async uploadImage(imagePayload, userId) {
    const userProfile = await this.usersRepository.getUserDetails(userId);

    if (!userProfile) {
      throw new NotFoundException('User Not found');
    }
    const fileName = `${userId}_${userProfile.name}`;
    const bucketName = this.configService.get('IMAGE_UPLOAD_BUCKET');
    const imageUrl = await this.awsService.uploadImageToS3(imagePayload, bucketName, fileName);
    return {
      message: 'ImageUrl fetched successfully',
      data: { imageUrl },
    };
  }

  async otpSendSms(payload) {
    const { phone, userId } = payload;
    const cachedPhoneNumber = await this.cacheService.get(userId);
    const cachedPhoneTimeout = await this.cacheService.get(userId + '_timeout');

    this.logger.log({ cachedPhoneNumber }, 'cachedPhoneNumber');

    if (cachedPhoneTimeout) {
      throw new ForbiddenException('OTP Requests limit error, wait sometime before sending another request');
    }

    // SEND PHONE OTP
    const token = this.otpHelper.generateToken();
    const [otpResponse, otpErr] = await asyncHandler(
      this.smsService.sendOtp({ countryCode: +91, phoneNumber: phone, token }),
    );

    await this.cacheService.set(userId, token.toString(), 30000);
    await this.cacheService.set(userId + '_timeout', token.toString(), 30000);

    if (otpErr) {
      this.logger.error({ otpErr });
      throw new InternalServerErrorException('Error occured while sending OTP', otpErr);
    }

    this.logger.log({ otpResponse }, 'Received OTP Response');

    return pick(otpResponse, ['data']);
  }

  async otpSendEmail(payload) {
    const { email, personalEmail, name, userId } = payload;

    const cachedEmail = await this.cacheService.get(userId);

    this.logger.log({ cachedEmail }, 'cachedEmail');

    if (cachedEmail) {
      throw new ForbiddenException('OTP Requests limit error, wait sometime before sending another request');
    }

    const token = Math.floor(100000 + Math.random() * 900000);
    await this.cacheService.set(userId, token, 60000);
    this.logger.log({ userId: userId }, 'Hashed user, sending OTP to email');

    // SEND EMAIL OTP
    const [emailResp, emailErr] = await asyncHandler(
      this.mailService.sendUserConfirmation({ user: { name, email: email || personalEmail }, token }),
    );

    if (emailErr) {
      throw new InternalServerErrorException(emailErr, 'Error occured while sending OTP');
    }

    this.logger.log({ emailResp }, 'Received OTP Response');

    return emailResp;
  }

  async sendOtp(sendOtpPayload, userId) {
    const userProfile = await this.usersRepository.getUserDetails(userId);

    if (!userProfile) {
      throw new NotFoundException('User Not found');
    }
    const { type, data } = sendOtpPayload;
    const payload = { [type]: data, name: userProfile.name, userId };
    if (type === OtpType.PHONE) {
      const smsOtpResp = await this.otpSendSms(payload);
      this.logger.log({ smsOtpResp }, 'OTP response');
      return {
        message: `OTP ${type} sent successfully`,
        data: smsOtpResp,
      };
    }

    if (type === OtpType.EMAIL || type === OtpType.PERSONALEMAIL) {
      const emailOtpResp = await this.otpSendEmail(payload);
      this.logger.log({ emailOtpResp }, 'email response');
      return {
        message: `OTP ${type} sent successfully`,
        data: emailOtpResp,
      };
    }

    throw new InternalServerErrorException();
  }

  async otpVerifyEmail(payload) {
    const { otp, userId } = payload;
    const otpFromCache = await this.cacheService.get(userId);
    this.logger.log({ otpFromCache }, 'retrieved otp from cache');
    if (otpFromCache === parseInt(otp, 10)) {
      await this.cacheService.del(userId);

      return {
        message: 'OTP validated',
      };
    }

    throw new InternalServerErrorException('Invalid otp');
  }

  async otpVerifySms(payload) {
    const { otp, userId } = payload;
    const otpFromCache = await this.cacheService.get(userId);
    this.logger.log({ otpFromCache }, 'retrieved otp from cache');
    if (otpFromCache === otp) {
      await this.cacheService.del(userId);

      return {
        message: 'OTP validated',
      };
    }

    throw new InternalServerErrorException('Invalid otp');
  }
  async verifyOtp(verifyOtpPayload: OtpPayloadVerifyDto, userId) {
    const userProfile = await this.usersRepository.getUserDetails(userId);

    if (!userProfile) {
      throw new NotFoundException('User Not found');
    }
    const { type, otp } = verifyOtpPayload;
    this.logger.log('starting verification');

    if (type === OtpType.PHONE) {
      const otpVerifyResp = await this.otpVerifySms({ userId, otp });
      this.logger.log({ otpVerifyResp, type }, 'OTP verification response');
      await this.cacheService.del(userId);
      const verificationStatus = {
        personalEmail: userProfile.verificationStatus.personalEmail,
        email: userProfile.verificationStatus.email,
        phone: true,
      };
      await this.usersRepository.findUserAndUpdate(userId, ProfileDetailsType.VERIFICATIONSTATUS, verificationStatus);
      return {
        message: `OTP ${type} verified successfully`,
        data: otpVerifyResp,
      };
    }

    if (type === OtpType.EMAIL || type === OtpType.PERSONALEMAIL) {
      this.logger.log('validating email');
      const otpVerifyResp = await this.otpVerifyEmail({ otp, userId });
      this.logger.log({ otpVerifyResp, type }, 'OTP verification response');
      let verificationStatus;
      if (type === OtpType.PERSONALEMAIL) {
        verificationStatus = {
          personalEmail: true,
          phone: userProfile.verificationStatus.phone,
          email: userProfile.verificationStatus.email,
        };
      }
      if (type === OtpType.EMAIL)
        verificationStatus = {
          personalEmail: userProfile.verificationStatus.personalEmail,
          phone: userProfile.verificationStatus.phone,
          email: true,
        };
      await this.usersRepository.findUserAndUpdate(userId, ProfileDetailsType.VERIFICATIONSTATUS, verificationStatus);
      return {
        message: `OTP ${type} verified successfully`,
        data: otpVerifyResp,
      };
    }

    throw new InternalServerErrorException('Error occured while sending OTP');
  }

  async authenticateCrm(crmPayload, userId) {
    this.logger.log({ crmPayload, userId }, 'Crm payload');
    const data = await this.crmHelper.authenticateUser(crmPayload);

    return {
      message: `crm user login`,
      data,
    };
  }
}

import { Injectable, Inject, Logger } from '@nestjs/common';
import * as hash from 'object-hash';
import { JwtService } from '@nestjs/jwt';
import { get, omit, pick, isEmpty } from 'lodash';
import generator = require('generate-password');

// custom imports
import { UsersRepository } from '../user/repository/users.repository';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { asyncHandler, parseJson } from '../_app/utils';
import { OtpType } from './enum/OtpType.enum';
import { InitType } from './enum/initType.enum';
import { ForbiddenException, ConflictException, InternalServerErrorException } from '../_app/exceptions/index';
import { MailService } from '../mail/mail.service';
import { OtpPayloadSendDto } from './dto/otp-payload-send.dto';
import { OtpPayloadVerifyDto } from './dto/otp-payload-verify.dto';
import { SignUpInitDto } from './dto/signup-init.dto';
import { SignInInitDto } from './dto/signin-init.dto';
import { SignInDto } from './dto/signin-dto';
import { PointService } from '../point/point.service';
import { PointAssignmentType } from '../point/enum/points.enum';
import { ActivityType, ActivitySubType } from '../activity/enum/activity.enum';
import { ChatService } from '../helper/chat.helper';
import { OtpHelper } from '../helper/otp-helper';
import { CrmHelper } from '../helper/crm.helper';
import { SmsService } from '../sms/sms.service';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);

  private hashedUser;
  private hashedEmail;

  constructor(
    @Inject(CACHE_MANAGER) private cacheService: Cache,
    private readonly usersRepository: UsersRepository,
    private readonly pointService: PointService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly chatService: ChatService,
    private readonly smsService: SmsService,
    private readonly otpHelper: OtpHelper,
    private readonly crmHelper: CrmHelper,
  ) {}

  async initSignUp(userInitDto: SignUpInitDto) {
    this.logger.log('initSignUp');
    return await this.initUser(userInitDto, InitType.SIGNUP);
  }

  async validateUserFromCache(userId) {
    const cachedUser = await this.cacheService.get(userId);
    this.logger.log({ cachedUser, userId }, 'Retrieved Cached user: validateUserFromCache');
    const parsedCachedUser = parseJson(cachedUser);

    if (!parsedCachedUser) {
      throw new ForbiddenException('validateUserFromCache: user not found');
    }

    return parsedCachedUser;
  }

  async otpSendEmail(payload) {
    const { email, name } = payload;
    const hashedEmail = hash({ email });
    const cachedEmail = await this.cacheService.get(hashedEmail);
    const cachedEmailTimeout = await this.cacheService.get(hashedEmail + '_timeout');

    this.logger.log({ hashedEmail, cachedEmail }, 'cachedEmail');

    if (cachedEmailTimeout) {
      throw new ForbiddenException('OTP Requests limit error, wait sometime before sending another request');
    }

    const token = await this.otpHelper.generateToken();

    await this.cacheService.set(hashedEmail, token, 300000);
    await this.cacheService.set(hashedEmail + '_timeout', token, 30000);
    this.logger.log({ hashedEmail }, 'Hashed user, sending OTP to phone / email');

    // SEND EMAIL OTP
    const [emailResp, emailErr] = await asyncHandler(
      this.mailService.sendUserConfirmation({ user: { name, email }, token }),
    );

    if (emailErr) {
      throw new InternalServerErrorException('Error occured while sending OTP', emailErr);
    }

    this.logger.log({ emailResp }, 'Received OTP Response');

    return emailResp;
  }

  async otpSendSms(payload) {
    const { phone } = payload;
    const hashedPhoneNumber = hash({ phone });
    const cachedPhoneNumber = await this.cacheService.get(hashedPhoneNumber);
    const cachedPhoneTimeout = await this.cacheService.get(hashedPhoneNumber + '_timeout');
    this.logger.log({ hashedPhoneNumber, cachedPhoneNumber }, 'cachedPhoneNumber');

    if (cachedPhoneTimeout) {
      throw new ForbiddenException('OTP Requests limit error, wait sometime before sending another request');
    }

    // SEND PHONE OTP
    const token = this.otpHelper.generateToken();
    await asyncHandler(this.smsService.sendOtp({ countryCode: +91, phoneNumber: phone, token }));

    await this.cacheService.set(hashedPhoneNumber, token.toString(), 300000);
    await this.cacheService.set(hashedPhoneNumber + '_timeout', token.toString(), 30000);

    return {
      message: 'OTP sent successfully',
    };
  }

  async otpVerifySms({ parsedCachedUser, otp }) {
    this.logger.log({ parsedCachedUser, otp }, 'Verification details');
    const hashedPhoneNumber = hash({ phone: parsedCachedUser.phone });
    const otpFromCache = await this.cacheService.get(hashedPhoneNumber);
    if (!otpFromCache) {
      this.logger.error({ otpFromCache }, 'otp from cache not found');

      throw new InternalServerErrorException('OTP from cache not found');
    }
    this.logger.log({ otpFromCache }, 'retrieved otp from cache');
    if (otpFromCache === otp) {
      await this.cacheService.del(hashedPhoneNumber);

      return {
        message: 'OTP validated',
      };
    }

    throw new InternalServerErrorException('Invalid otp');
  }

  async otpVerifyEmail({ parsedCachedUser, otp }) {
    this.logger.log({ parsedCachedUser, otp }, 'verifications details');
    const hashedEmail = hash({ email: parsedCachedUser.email });
    const otpFromCache = await this.cacheService.get(hashedEmail);
    if (!otpFromCache) {
      this.logger.error({ otpFromCache }, 'otp from cache not found');

      throw new InternalServerErrorException('OTP from cache not found');
    }
    this.logger.log({ otpFromCache }, 'retrieved otp from cache');
    if (otpFromCache === parseInt(otp, 10)) {
      await this.cacheService.del(this.hashedEmail);

      return {
        message: 'OTP validated',
      };
    }

    throw new InternalServerErrorException('Invalid otp');
  }

  async sendAuthOtp(sendOtpPayload: OtpPayloadSendDto) {
    const { userId, type } = sendOtpPayload;

    const parsedCachedUser = await this.validateUserFromCache(userId);

    if (type === OtpType.PHONE) {
      const smsOtpResp = await this.otpSendSms(parsedCachedUser);
      this.logger.log({ smsOtpResp }, 'OTP response');
      return {
        message: `OTP ${type} sent successfully`,
        data: smsOtpResp,
      };
    }

    if (type === OtpType.EMAIL) {
      const emailOtpResp = await this.otpSendEmail(parsedCachedUser);
      this.logger.log({ emailOtpResp }, 'email response');
      return {
        message: `OTP ${OtpType.EMAIL} sent successfully`,
        data: {},
      };
    }

    throw new InternalServerErrorException();
  }

  async updateUserCache(payload) {
    const { parsedCachedUser, status } = payload;

    const _payload = JSON.stringify({
      ...parsedCachedUser,
      verificationStatus: {
        ...parsedCachedUser.verificationStatus,
        ...status,
      },
      status,
    });

    await this.cacheService.set(this.hashedUser, _payload, 0);

    this.logger.log({ _payload, hashedUser: this.hashedUser }, 'updated cache');
    return _payload;
  }

  async verifyAuthOtp(verifyOtpPayload: OtpPayloadVerifyDto) {
    const { userId, type, otp } = verifyOtpPayload;
    this.logger.log('starting verification');

    const parsedCachedUser = await this.validateUserFromCache(userId);

    if (type === OtpType.PHONE) {
      this.logger.log('validating phone');
      const otpVerifyResp = await this.otpVerifySms({ parsedCachedUser, otp });
      this.logger.log({ otpVerifyResp, type }, 'OTP verification response');

      await this.updateUserCache({ parsedCachedUser, status: { phone: true } });

      return {
        message: `OTP ${type} verified successfully`,
        data: otpVerifyResp,
      };
    }

    if (type === OtpType.EMAIL) {
      this.logger.log('validating email');
      const otpVerifyResp = await this.otpVerifyEmail({ parsedCachedUser, otp });
      this.logger.log({ otpVerifyResp, type }, 'OTP verification response');

      await this.updateUserCache({ parsedCachedUser, status: { email: true } });

      return {
        message: `OTP ${type} verified successfully`,
        data: otpVerifyResp,
      };
    }

    // catch all
    throw new InternalServerErrorException('Error occured while sending OTP');
  }

  async registerUser(payload) {
    const { userId } = payload;

    const parsedCachedUser = await this.validateUserFromCache(userId);

    const { status } = parsedCachedUser;
    if (!status?.email && !status?.phone) {
      throw new InternalServerErrorException('user otp not validated');
    }

    const userData = Object(omit(parsedCachedUser, [status])) as any;
    const personalDetails = {
      name: userData.name,
      phone: userData.phone,
      personalEmail: '',
      imageUrl: '',
      aadharNumber: '',
      panNumber: '',
    };

    const _user = {
      ...userData,
      personalDetails,
    };
    const user = await this.usersRepository.createUser(_user);

    if (!user) {
      throw new InternalServerErrorException('No user found');
    }

    await this.cacheService.del(this.hashedUser);
    const accessTokenPayload = pick(user.toJSON(), ['name', 'phone', 'email', 'role', 'id']);
    const accessToken: string = await this.jwtService.sign(accessTokenPayload);

    this.pointService.updatePoints(
      user.id,
      {
        points: 50,
        type: 'credit',
        description: '',
        expiryDate: '',
        steps: [PointAssignmentType.REGISTER],
      },
      { type: ActivityType.UNIVERSAL, subType: ActivitySubType.REGISTER },
    );

    // CHAT REGISTER
    const chatRequestData = {
      uid: user.id,
      name: user.name,
    };
    const chatResp = await this.chatService.createChatUser(chatRequestData);

    return {
      message: 'user created successfully',
      data: { accessToken, user: accessTokenPayload, chatDetails: chatResp },
    };
  }

  async initSignIn(signInInitDto: SignInInitDto) {
    this.logger.log('initSignIn');
    const { type, data } = signInInitDto;

    const payload = {
      [type]: data,
    };
    return await this.initUser(payload, InitType.SIGNIN);
  }

  async signInUser(payload: SignInDto) {
    this.logger.log('Starting sign up process');
    const { userId } = payload;

    const parsedCachedUser = await this.validateUserFromCache(userId);

    const { status } = parsedCachedUser;
    if (!status?.email && !status?.phone) {
      throw new InternalServerErrorException('user otp not validated');
    }

    const _crmDetails =
      !isEmpty(parsedCachedUser?.professionalDetails?.companyName) && !isEmpty(parsedCachedUser?.role)
        ? await this.crmHelper.authenticateUser({
            name: parsedCachedUser?.name,
            email: parsedCachedUser?.email,
            phone: parsedCachedUser?.phone,
            industryType: parsedCachedUser?.industryType,
            orgName: parsedCachedUser?.professionalDetails?.companyName,
            role: parsedCachedUser?.role,
          })
        : {};

    const filteredOutput = pick(parsedCachedUser, ['name', 'phone', 'email', 'id']);
    const accessToken: string = await this.jwtService.sign(filteredOutput);

    await this.cacheService.del(this.hashedUser);

    return {
      message: 'Otp verified successfully',
      data: { accessToken, user: { ...filteredOutput, ..._crmDetails } },
    };
  }

  async initUser(payload, type) {
    this.logger.log({ payload, type }, 'validating if user exists in system');
    const existingUser = await this.usersRepository.findUser(payload);

    this.logger.log({ existingUser }, 'existing user details');

    if (existingUser && type === InitType.SIGNUP) {
      this.logger.error({ existingUser }, 'Existing User found');
      throw new ConflictException('User already exists');
    }

    if (!existingUser && type === InitType.SIGNIN) {
      this.logger.error({ existingUser }, 'Existing User not found');
      throw new ForbiddenException('User does not exist, please register');
    }

    let userPayload;

    if (type === InitType.SIGNUP) {
      userPayload = {
        ...payload,
        verificationStatus: {
          phone: false,
          email: false,
          personalEmail: false,
        },
      };
    }

    // REVISIT
    if (type === InitType.SIGNIN) {
      userPayload = {
        ...omit(existingUser.toJSON(), ['_id']),
      };
    }

    this.hashedUser = hash(userPayload);
    const cachedUser = await this.cacheService.get(this.hashedUser);
    this.logger.log({ cachedUser }, 'Retrieved Cached user: initUser');

    if (cachedUser) {
      return {
        message: 'process initialized; returning user',
        data: {
          userId: this.hashedUser,
        },
      };
    }

    await this.cacheService.set(this.hashedUser, JSON.stringify(userPayload), 300000);

    return {
      message: 'process initialized',
      data: {
        userId: this.hashedUser,
      },
    };
  }

  async authorizeLinkedin(payload) {
    if (isEmpty(payload)) {
      throw new InternalServerErrorException('Error occured via authorizeLinkedin');
    }

    const existingUser = await this.usersRepository.findUser(get(payload, '_json'));

    this.logger.debug({ existingUser }, 'existing user details');

    // user is registered - login
    if (!isEmpty(existingUser)) {
      const { oauthData } = existingUser;
      if (!oauthData) {
        // update payload in user details if it does not exist
        const id = get(existingUser, 'id', '');
        this.usersRepository.findUserAndUpdate(id, 'oauthData', payload);
      }

      const crmDetails = get(existingUser.toJSON(), 'crmDetails', {});
      this.logger.debug({ crmDetails }, 'CRM details from parsedUser');
      const _crmDetails = !isEmpty(crmDetails) ? await this.crmHelper.authenticateUser(crmDetails) : {};

      const user = pick(existingUser.toJSON(), ['name', 'phone', 'email', 'id']);
      const accessToken: string = await this.jwtService.sign(user);

      this.logger.debug(
        {
          accessToken,
          user: {
            ...user,
            ..._crmDetails,
          },
        },
        'authorized via linkedin details ',
      );

      return {
        message: 'authorized via linkedin',
        data: {
          accessToken,
          user: {
            ...user,
            ..._crmDetails,
          },
        },
      };
    }

    const userDetails = {
      name: get(payload, '_json.name'),
      phone: get(payload, '_json.phone', ''),
      email: get(payload, '_json.email'),
    };

    const crmPayloadPrefix = `${generator.generate({
      length: 4,
      numbers: true,
      symbols: false,
    })}-`;

    const crmPayload = {
      name: get(userDetails, 'name', ''),
      email: `${get(userDetails, 'email')}`,
      phone: `${crmPayloadPrefix}${get(userDetails, 'phone')}`,
    };
    const _crmDetails = await this.crmHelper.authenticateUser(crmPayload);
    const crmDetails = !isEmpty(get(_crmDetails, 'crmDetails', {}))
      ? {
          id: get(_crmDetails, 'crmDetails.id', {}),
          ...crmPayload,
        }
      : {};

    const userPayload = {
      ...userDetails,
      acceptedTerms: true,
      industryType: 'coworking',
      verificationStatus: {
        email: get(payload, '_json.email_verified', false),
        phone: get(payload, '_json.phone_verified', false),
        personalEmail: get(payload, '_json.email_verified', false),
      },
      personalDetails: {
        name: get(payload, '_json.name'),
        phone: get(payload, '_json.phone', ''),
        personalEmail: get(payload, '_json.email'),
        imageUrl: get(payload, '_json.picture'),
        aadharNumber: '',
        panNumber: '',
      },
      oauthData: [payload],
      crmDetails,
    };

    const _user = await this.usersRepository.createUser(userPayload);

    if (!_user) {
      throw new InternalServerErrorException('No user found');
    }

    const user = pick(_user?.toJSON(), ['name', 'phone', 'email', 'id']);
    const accessToken: string = await this.jwtService.sign(user);
    this.pointService.updatePoints(
      user.id,
      {
        points: 50,
        type: 'credit',
        description: '',
        expiryDate: '',
        steps: [PointAssignmentType.REGISTER],
      },
      { type: ActivityType.UNIVERSAL, subType: ActivitySubType.REGISTER },
    );

    const chatRequestData = {
      uid: user.id,
      name: user.name,
    };
    const chatResp = await this.chatService.createChatUser(chatRequestData);

    return {
      message: 'user created successfully',
      data: {
        accessToken,
        user: {
          ...user,
          ..._crmDetails,
        },
        chatDetails: chatResp,
      },
    };
  }
}

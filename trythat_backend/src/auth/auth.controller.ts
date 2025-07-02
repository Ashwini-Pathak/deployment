import { Controller, Post, Body, HttpCode, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpInitDto } from './dto/signup-init.dto';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

import { OtpPayloadSendDto } from './dto/otp-payload-send.dto';
import { OtpPayloadVerifyDto } from './dto/otp-payload-verify.dto';
import { UserRegistrationDto } from './dto/user-registration.dto';
import { SignInInitDto } from './dto/signin-init.dto';
import { SignInDto } from './dto/signin-dto';
import { ConfigEnv } from '../config/config.env.enums';

@Controller('auth')
export class AuthController {
  private readonly frontendUrl;

  constructor(
    private authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    this.frontendUrl = `${this.configService.get(ConfigEnv.FRONTEND_URL)}`;
  }

  @HttpCode(202)
  @Post('/otp/send')
  sendAuthOtp(@Body() sendOtpPayload: OtpPayloadSendDto) {
    return this.authService.sendAuthOtp(sendOtpPayload);
  }

  @HttpCode(202)
  @Post('/otp/verify')
  verifyAuthOtp(@Body() verifyOtpPayload: OtpPayloadVerifyDto) {
    return this.authService.verifyAuthOtp(verifyOtpPayload);
  }

  @HttpCode(200)
  @Post('/sign-up/init')
  initSignUp(@Body() signUpInitDto: SignUpInitDto) {
    return this.authService.initSignUp(signUpInitDto);
  }

  @HttpCode(201)
  @Post('/register')
  registerUser(@Body() userRegistrationDto: UserRegistrationDto) {
    return this.authService.registerUser(userRegistrationDto);
  }

  @HttpCode(200)
  @Post('/sign-in/init')
  initSignIn(@Body() signInInitDto: SignInInitDto) {
    return this.authService.initSignIn(signInInitDto);
  }

  @HttpCode(200)
  @Post('/sign-in')
  signInUser(@Body() signInDto: SignInDto) {
    return this.authService.signInUser(signInDto);
  }

  @Get('/linkedin')
  @UseGuards(AuthGuard('linkedin'))
  async login() {}

  @Get('/linkedin/callback')
  @UseGuards(AuthGuard('linkedin'))
  async authCallback(@Req() req, @Res() res) {
    const user = req.user;
    const authData = await this.authService.authorizeLinkedin(user);
    const code = Buffer.from(JSON.stringify(authData)).toString('base64');

    res.redirect(`${this.frontendUrl}?code=${code}`);
  }
}

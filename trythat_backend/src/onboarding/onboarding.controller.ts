import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ContactUsDto } from './dto/contactUs.dto';

import { OnboardingService } from './onboarding.service';
import { JwtAuthGuard } from '../auth/guards/jwtauth.guard';
import { RegisterOkrDto } from './dto/register-okr.dto';
import { RegisterFmsDto } from './dto/register-fms.dto';
import { RegisterCrmDto } from './dto/register-crm.dto';

@Controller('onboarding')
@UseGuards(JwtAuthGuard)
export class OnboardingController {
  constructor(private readonly universalService: OnboardingService) {}

  @Post('/contact-us/:id')
  contactUs(@Body() contactUsDto: ContactUsDto, @Param('id') userId) {
    const { firstName, lastName, email, message } = contactUsDto;
    const name = `${firstName} ${lastName}`;
    return this.universalService.addContactUs({ userId, name, email, message });
  }
  @Post('/:id/register-crm')
  registerCrm(@Body() registerCrmDto: RegisterCrmDto, @Param('id') userId) {
    return this.universalService.registerCrm(registerCrmDto, userId);
  }

  @Post('/:id/register-okr')
  registerOkr(@Body() registerOkrDto: RegisterOkrDto, @Param('id') userId) {
    return this.universalService.registerOkr(registerOkrDto, userId);
  }

  @Post('/:id/register-fms')
  registerFms(@Body() registerFmsDto: RegisterFmsDto, @Param('id') userId) {
    return this.universalService.registerFms(registerFmsDto, userId);
  }
}

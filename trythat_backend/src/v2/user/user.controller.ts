import { Controller, Post, Param, UseGuards, Body, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwtauth.guard';
import { UserV2Service } from './user.service';
import { AssociateCompanyDto } from './dto/associate-company.dto';

@UseGuards(JwtAuthGuard)
@Controller({
  path: 'user/:id',
  version: '2',
})
export class UserV2Controller {
  constructor(private readonly userV2Service: UserV2Service) {}

  @Get()
  getUserDetails(@Param('id') userId: string) {
    return this.userV2Service.getUserDetails(userId);
  }

  @Post('associate-company/:companyId')
  associateCompany(@Body() body: AssociateCompanyDto, @Param('id') userId: string) {
    return this.userV2Service.updateUser({ userId, companyId: body.companyId, industryId: body.industryId });
  }
}

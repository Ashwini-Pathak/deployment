import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { JwtAuthGuard } from '../../auth/guards/jwtauth.guard';

@Controller({
  path: 'user/:id/company',
  version: '2',
})
@UseGuards(JwtAuthGuard)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  createCompany(@Body() createCompanyDto: CreateCompanyDto, @Param('id') userId: string) {
    return this.companyService.createCompany(createCompanyDto, userId);
  }

  @Get()
  getCompanyList() {
    return this.companyService.getCompanyList();
  }

  @Get(':companyId')
  getCompanyDetails(@Param('companyId') companyId: string) {
    return this.companyService.getCompanyDetails(companyId);
  }
}

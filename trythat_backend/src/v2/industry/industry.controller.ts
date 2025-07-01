import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { IndustryService } from './industry.service';
import { JwtAuthGuard } from '../../auth/guards/jwtauth.guard';

@Controller({
  path: 'user/:id/industry',
  version: '2',
})
@UseGuards(JwtAuthGuard)
export class IndustryController {
  constructor(private readonly industryService: IndustryService) {}

  @Get()
  getAllIndustries() {
    return this.industryService.getAllIndustries();
  }

  @Get(':industryId')
  getIndustry(@Param('industryId') industryId: string) {
    return this.industryService.getIndustry(industryId);
  }
}

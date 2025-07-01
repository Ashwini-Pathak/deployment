import { Controller, UseGuards, Get } from '@nestjs/common';
import { PointService } from './point.service';
import { JwtAuthGuard } from '../auth/guards/jwtauth.guard';

@Controller('user/:id/point')
export class PointController {
  constructor(private readonly pointService: PointService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/get_point_amount_mapping')
  getPointAmountMapping() {
    return this.pointService.getPointAmountMapping();
  }
}

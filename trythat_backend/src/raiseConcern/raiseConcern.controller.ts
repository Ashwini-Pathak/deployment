import { Body, Controller, UseGuards, Param, Post } from '@nestjs/common';
import { RaiseConcernDto } from './dto/raiseConcern.dto';
import { RaiseConcernService } from './raiseConcern.service';
import { JwtAuthGuard } from '../auth/guards/jwtauth.guard';

@Controller('raiseConcern/user/:id')
export class RaiseConcernController {
  constructor(private readonly raiseConcernService: RaiseConcernService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/addConcern')
  addConcern(@Body() { category, description, path, name, email }: RaiseConcernDto, @Param('id') userId) {
    return this.raiseConcernService.addConcern({ path, category, description,  userId, name, email });
  }
}

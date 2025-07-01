import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwtauth.guard';
import { LikesService } from '../likes/likes.service';

@Controller({
  path: 'user/:id/likes',
  version: '2',
})
@UseGuards(JwtAuthGuard)
export class LikesController {
  constructor(private readonly likeService: LikesService) {}
}

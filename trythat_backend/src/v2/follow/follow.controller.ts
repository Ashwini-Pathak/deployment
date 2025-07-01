import { Controller, Post, Get, Body, Param, UseGuards, ValidationPipe, Query } from '@nestjs/common';
import { FollowService } from './follow.service';
import { JwtAuthGuard } from '../../auth/guards/jwtauth.guard';
import { OwnerDto } from '../posts/dto/get-post-query.dto';

@Controller({
  path: 'user/:id/follow',
  version: '2',
})
@UseGuards(JwtAuthGuard)
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post()
  followUser(@Param('id') userId: string, @Body() { userToFollow }) {
    return this.followService.followUser(userId, userToFollow);
  }

  @Get('/stats')
  getFollowStats(
    @Query(new ValidationPipe({ transform: true }))
    postQueryDto: OwnerDto,
  ) {
    return this.followService.getFollowStats(postQueryDto);
  }

  @Post('unfollow')
  unfollowUser(@Param('id') userId: string, @Body() { userToUnfollow }) {
    return this.followService.unfollowUser(userId, userToUnfollow);
  }
}

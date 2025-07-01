import { Controller, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwtauth.guard';
import { CommentsService } from '../comments/comments.service';

@Controller({
  path: 'user/:id/comments',
  version: '2',
})
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Patch('/:commentId')
  updateComment(@Param('commentId') commentId: string, @Body() body) {
    return this.commentService.updateComments(commentId, body);
  }
}

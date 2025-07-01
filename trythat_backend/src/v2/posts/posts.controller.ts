import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  ValidationPipe,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from '../../auth/guards/jwtauth.guard';
import { GetPostQueryDTO } from './dto/get-post-query.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { LikesService } from '../likes/likes.service';
import { CommentsService } from '../comments/comments.service';
import { UserAction } from './enum/user-action.enum';
import { BadRequestException } from '../../_app/exceptions';

@Controller({
  path: 'user/:id/posts',
  version: '2',
})
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly likesService: LikesService,
    private readonly commentService: CommentsService,
  ) {}

  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  @Get()
  getAllPosts(
    @Param('id') userId: string,
    @Query(new ValidationPipe({ transform: true }))
    postQueryDto: GetPostQueryDTO,
    @Query('limit') limit: string = '10',
    @Query('offset') offset: string = '0',
  ) {
    return this.postsService.getAllPosts(userId, postQueryDto, +limit, +offset);
  }

  @Get('dashboard')
  getAllDashboardPosts(
    @Param('id') userId: string,
    @Query('limit') limit: string = '10',
    @Query('offset') offset: string = '0',
  ) {
    return this.postsService.getAllDashboardPosts(userId, +limit, +offset);
  }

  @Post('upload-images')
  @UseInterceptors(FilesInterceptor('files', 10))
  imagesUpload(@UploadedFiles() files: Express.Multer.File[]) {
    return this.postsService.postImageUpload(files);
  }

  @Get(':postId')
  getPost(
    @Param('postId') postId: string,
    @Param('id') userId: string,
    @Query(new ValidationPipe({ transform: true }))
    postQueryDto: GetPostQueryDTO,
  ) {
    return this.postsService.getPost(postId, userId, postQueryDto);
  }

  @Post('/activity/:postId')
  async updateActivity(@Param('id') userId: string, @Param('postId') postId: string, @Body() { action, text }) {
    switch (action) {
      case UserAction.LIKES:
        await this.likesService.createLikes(userId, postId);
        return this.postsService.updateActivity(postId, action);

      case UserAction.COMMENTS:
        await this.commentService.createComments(userId, postId, text);
        return this.postsService.updateActivity(postId, action);

      case UserAction.UNLIKES:
        await this.likesService.unLike(userId, postId);
        return this.postsService.updateActivity(postId, UserAction.LIKES);

      default:
        throw new BadRequestException('Unsupported action');
    }
  }

  @Get('activity/:postId')
  getActivity(@Param('postId') postId: string, @Query('action') action: string) {
    return this.postsService.getActivity(postId, action);
  }
}

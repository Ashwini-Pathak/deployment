import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsRepository } from './repository/post.repository';
import { GetPostQueryDTO } from './dto/get-post-query.dto';
import { PostRel } from './enum/post-rel.enum';
import { BadRequestException, ForbiddenException } from '../../_app/exceptions';
import { UserV2Service } from '../user/user.service';
import { AwsService } from '../../helper/aws.helper';
import { ConfigService } from '@nestjs/config';
import { PreferencesService } from '../preferences/preferences.service';
import { FollowService } from '../follow/follow.service';

@Injectable()
export class PostsService {
  private readonly postsBucketName: string;
  constructor(
    private readonly postRepository: PostsRepository,
    private readonly userV2Service: UserV2Service,
    private readonly awsService: AwsService,
    private readonly configService: ConfigService,
    private readonly preferencesService: PreferencesService,
    private readonly followService: FollowService,
  ) {
    this.postsBucketName = this.configService.get('POSTS_BUCKET_NAME');
  }

  async createPost(createPostDto: CreatePostDto) {
    const data = await this.postRepository.createPost(createPostDto);

    return {
      message: `creating post for user`,
      data,
    };
  }

  async isUserAuthorized(type, userId, ownerId) {
    if (type === PostRel.USER_POST && userId !== ownerId) {
      throw new ForbiddenException('unauthorized resource');
    }

    if (type === PostRel.COMPANY_POST) {
      const {
        data: {
          companyDetails: { companyId },
        },
      } = await this.userV2Service.getUserDetails(userId);

      if (companyId !== ownerId) {
        throw new ForbiddenException('unauthorized resource');
      }
    }
  }

  async getAllPosts(userId, { ownerId, type }: GetPostQueryDTO, limit: number, offset: number) {
    await this.isUserAuthorized(type, userId, ownerId);

    const totalRecords = await this.postRepository.getTotalPosts(ownerId);
    const posts = await this.postRepository.getAllPosts(ownerId, limit, offset);

    return {
      message: `retrieved all posts for user: ${ownerId}`,
      data: {
        totalRecords,
        posts,
      },
    };
  }

  async getPost(postId: string, userId, { ownerId, type }: GetPostQueryDTO) {
    await this.isUserAuthorized(type, userId, ownerId);

    const data = await this.postRepository.getPost(postId);

    return {
      message: `retrieved post for postId: ${postId}`,
      data,
    };
  }

  async postImageUpload(files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided');
    }

    const uploadPromises = files.map((file) => {
      const fileName = `${Date.now()}-${file.originalname}`;

      return this.awsService.uploadImageToS3(file, this.postsBucketName, fileName);
    });

    const uploadResults = await Promise.all(uploadPromises);

    return {
      message: 'Files uploaded successfully',
      data: uploadResults,
    };
  }

  async getAllDashboardPosts(userId: string, limit: number, offset: number) {
    const [preferences] = await this.preferencesService.findUserPreference(userId);
    const userByPreferences = await this.preferencesService.findUsersByPreference(preferences, userId);

    const { follows = [] } = await this.followService.getUserFollows(userId);

    const ownerIds = [...userByPreferences, ...follows];

    const allPosts = await this.postRepository.getPostsByUserIds(ownerIds, userId, limit, offset);

    return {
      message: 'Fetched all dashboard posts',
      data: allPosts,
    };
  }

  async updatePost(postId: string, dataToUpdate) {
    return {
      data: await this.postRepository.updatePost(postId, dataToUpdate),
    };
  }

  async updateActivity(postId: string, action: string) {
    return {
      data: await this.postRepository.updateActivity(postId, action),
    };
  }

  async getActivity(postId: string, action: string) {
    return {
      data: await this.postRepository.getActivity(postId, action),
    };
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { DatabaseEnv } from '../../../config/database-env.enum';
import { InternalServerErrorException } from '../../../_app/exceptions';
import { asyncHandler } from '../../../_app/utils';
import { Posts, PostsDocument } from '../schemas/Post.schema';

@Injectable()
export class PostsRepository {
  private readonly logger: Logger = new Logger(PostsRepository.name);

  constructor(@InjectModel(Posts.name, DatabaseEnv.DB_USER_CONN) private postsModel: Model<PostsDocument>) {}

  async createPost(postDetails) {
    try {
      this.logger.log(postDetails, 'create post request');

      const _postDetails = await new this.postsModel(postDetails);
      const [savedPostResp, savedPostError] = await asyncHandler(_postDetails.save());

      if (savedPostError || !savedPostResp) {
        this.logger.error({ savedPostError, savedPostResp }, 'Error occured while saving post');
        throw new InternalServerErrorException();
      }

      return savedPostResp;
    } catch (error) {
      this.logger.error(error, 'error occured while creating post');

      throw new InternalServerErrorException('Error occured while creating post', error);
    }
  }

  async getAllPosts(ownerId: string, limit: number, offset: number) {
    const query: any = [
      {
        $match: {
          ownerId: {
            $in: [ownerId],
          },
        },
      },
      {
        $lookup: {
          from: 'userv2',
          as: 'userDetails',
          let: {
            searchId: {
              $toObjectId: '$ownerId',
            },
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$_id', '$$searchId'],
                },
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: 'companies',
          as: 'companyDetails',
          let: {
            searchId: {
              $toObjectId: '$ownerId',
            },
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$_id', '$$searchId'],
                },
              },
            },
          ],
        },
      },
      {
        $addFields: {
          ownerDetails: {
            $cond: {
              if: {
                $eq: ['$ownerType', 'user_post'],
              },
              then: {
                $arrayElemAt: ['$userDetails', 0],
              },
              else: {
                $arrayElemAt: ['$companyDetails', 0],
              },
            },
          },
        },
      },
      {
        $addFields: {
          fullDetails: {
            $mergeObjects: [
              '$$ROOT',
              {
                ownerDetails: '$ownerDetails',
              },
            ],
          },
        },
      },
      {
        $unset: ['fullDetails.userDetails', 'fullDetails.companyDetails'],
      },
      {
        $replaceRoot: {
          newRoot: '$fullDetails',
        },
      },
      {
        $facet: {
          totalCount: [
            {
              $count: 'totalRecords',
            }, // Count the total number of records
          ],
          user_posts: [
            {
              $match: {
                ownerType: 'user_post',
              },
            },
            {
              $project: {
                type: 1,
                title: 1,
                body: 1,
                tags: 1,
                CTA: 1,
                imageUrls: 1,
                ownerId: 1,
                createdAt: 1,
                ownerType: 1,
                isFollowed: 1,
                'ownerDetails._id': 1,
                'ownerDetails.name': 1,
                'ownerDetails.email': 1,
                'ownerDetails.professionalDetails.designation': 1,
                'ownerDetails.professionalDetails.companyName': 1,
              },
            },
            { $sort: { createdAt: -1 } },
            { $skip: offset },
            { $limit: limit },
          ],
          company_posts: [
            {
              $match: {
                ownerType: 'company_post',
              },
            },
            {
              $project: {
                type: 1,
                title: 1,
                body: 1,
                tags: 1,
                CTA: 1,
                imageUrls: 1,
                ownerId: 1,
                createdAt: 1,
                ownerType: 1,
                isFollowed: 1,
                'ownerDetails._id': 1,
                'ownerDetails.name': 1,
                'ownerDetails.address.city': 1,
                'ownerDetails.address.state': 1,
              },
            },
            { $sort: { createdAt: -1 } },
            { $skip: offset },
            { $limit: limit },
          ],
        },
      },
      {
        $project: {
          result: {
            $cond: {
              if: {
                $gt: [
                  {
                    $size: '$user_posts',
                  },
                  0,
                ],
              },
              // Check if any documents were matched
              then: '$user_posts',
              else: '$company_posts',
            },
          },
          totalCount: 1,
        },
      },
    ];

    const data: any = await this.postsModel.aggregate(query);

    return {
      posts: data[0]?.result || [],
      totalRecords: data[0]?.totalCount[0]?.totalRecords || 0,
    };
  }

  getTotalPosts(ownerId) {
    return this.postsModel.countDocuments({ ownerId });
  }

  getPost(postId: string) {
    return this.postsModel.findOne({ _id: postId });
  }

  async getPostsByUserIds(ownerIds: string[], userId, limit: number, offset: number) {
    const query: any = [
      {
        $match: {
          ownerId: {
            $in: ownerIds,
          },
        },
      },
      {
        $lookup: {
          from: 'userv2',
          as: 'userDetails',
          let: {
            searchId: {
              $toObjectId: '$ownerId',
            },
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$_id', '$$searchId'],
                },
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: 'companies',
          as: 'companyDetails',
          let: {
            searchId: {
              $toObjectId: '$ownerId',
            },
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$_id', '$$searchId'],
                },
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: 'follows',
          as: 'followDetails',
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$userId', userId],
                },
              },
            },
          ],
        },
      },
      {
        $addFields: {
          ownerDetails: {
            $cond: {
              if: {
                $eq: ['$ownerType', 'user_post'],
              },
              then: {
                $arrayElemAt: ['$userDetails', 0],
              },
              else: {
                $arrayElemAt: ['$companyDetails', 0],
              },
            },
          },
        },
      },
      {
        $addFields: {
          isFollowed: {
            $cond: {
              if: {
                $anyElementTrue: {
                  $map: {
                    input: '$followDetails',
                    as: 'detail',
                    in: {
                      $in: ['$ownerId', '$$detail.follows'],
                    },
                  },
                },
              },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $addFields: {
          postIdStr: {
            $toString: '$_id',
          },
        },
      },
      {
        $lookup: {
          from: 'likes',
          as: 'likeDetails',
          let: {
            postIdStr: '$postIdStr',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ['$postId', '$$postIdStr'],
                    },
                    {
                      $eq: ['$userId', userId],
                    },
                  ],
                },
              },
            },
          ],
        },
      },
      {
        $addFields: {
          isLiked: {
            $cond: {
              if: {
                $gt: [
                  {
                    $size: '$likeDetails',
                  },
                  0,
                ],
              },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $addFields: {
          fullDetails: {
            $mergeObjects: [
              '$$ROOT',
              {
                ownerDetails: '$ownerDetails',
              },
            ],
          },
        },
      },
      {
        $unset: ['fullDetails.userDetails', 'fullDetails.companyDetails', 'fullDetails.followDetails'],
      },
      {
        $replaceRoot: {
          newRoot: '$fullDetails',
        },
      },
      {
        $facet: {
          totalCount: [
            {
              $count: 'totalRecords',
            }, // Count the total number of records
          ],
          user_posts: [
            {
              $match: {
                ownerType: 'user_post',
              },
            },
            {
              $project: {
                type: 1,
                title: 1,
                body: 1,
                tags: 1,
                CTA: 1,
                imageUrls: 1,
                ownerId: 1,
                createdAt: 1,
                ownerType: 1,
                isFollowed: 1,
                isLiked: 1,
                likes: 1,
                comments: 1,
                'ownerDetails._id': 1,
                'ownerDetails.name': 1,
                'ownerDetails.email': 1,
                'ownerDetails.personalDetails.imageUrl': 1,
                'ownerDetails.professionalDetails.designation': 1,
                'ownerDetails.professionalDetails.companyName': 1,
              },
            },
            { $sort: { createdAt: -1 } },
            { $skip: offset },
            { $limit: limit },
          ],
          company_posts: [
            {
              $match: {
                ownerType: 'company_post',
              },
            },
            {
              $project: {
                type: 1,
                title: 1,
                body: 1,
                tags: 1,
                CTA: 1,
                imageUrls: 1,
                ownerId: 1,
                createdAt: 1,
                ownerType: 1,
                isFollowed: 1,
                isLiked: 1,
                likes: 1,
                comments: 1,
                'ownerDetails._id': 1,
                'ownerDetails.name': 1,
                'ownerDetails.companyLogo': 1,
                'ownerDetails.address.city': 1,
                'ownerDetails.address.state': 1,
              },
            },
            { $sort: { createdAt: -1 } },
            { $skip: offset },
            { $limit: limit },
          ],
        },
      },
      {
        $project: {
          result: {
            $cond: {
              if: {
                $gt: [
                  {
                    $size: '$user_posts',
                  },
                  0,
                ],
              },
              // Check if any documents were matched
              then: '$user_posts',
              else: '$company_posts',
            },
          },
          totalCount: 1,
        },
      },
    ];

    const data: any = await this.postsModel.aggregate(query);

    return {
      posts: data[0]?.result || [],
      totalRecords: data[0]?.totalCount[0]?.totalRecords || 0,
    };
  }

  async updatePost(postId: string, dataToUpdate) {
    const [updatePostResp, updatePostError] = await asyncHandler(
      this.postsModel.findOneAndUpdate({ _id: postId }, dataToUpdate, {
        new: true,
      }),
    );

    if (updatePostError || !updatePostResp) {
      this.logger.error({ updatePostError, updatePostResp }, 'Error occured while updatePostResp request');

      throw new InternalServerErrorException('Error occured while updating post', {
        updatePostError,
        updatePostResp,
      });
    }

    return updatePostResp;
  }

  async updateActivity(postId: string, action: string) {
    const query = [
      {
        $match: {
          _id: new Types.ObjectId(postId),
        },
      },
      {
        $addFields: {
          postIdStr: { $toString: '$_id' },
        },
      },
      {
        $lookup: {
          from: action,
          let: { postIdStr: '$postIdStr' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$postId', '$$postIdStr'],
                },
              },
            },
            { $count: `${action}Count` },
          ],
          as: action,
        },
      },
      {
        $addFields: {
          [action]: {
            $ifNull: [
              {
                $arrayElemAt: [`$${action}.${action}Count`, 0],
              },
              0,
            ],
          },
        },
      },
      {
        $project: {
          [action]: 1,
        },
      },
    ];

    const result: any = await this.postsModel.aggregate(query);
    const currentCount = result.length > 0 ? result[0][action] : 0;

    const data = await this.postsModel
      .findByIdAndUpdate(new Types.ObjectId(postId), { $set: { [action]: currentCount } }, { new: true })
      .lean(true);

    return data;
  }

  async getActivity(postId: string, action: string) {
    const query: any = [
      {
        $match: {
          _id: new Types.ObjectId(postId),
        },
      },
      {
        $lookup: {
          from: action,
          let: {
            postId: '$_id',
          },
          pipeline: [
            {
              $addFields: {
                postIdObj: {
                  $toObjectId: '$postId',
                },
              },
            },
            {
              $match: {
                $expr: {
                  $eq: ['$postIdObj', '$$postId'],
                },
              },
            },
            {
              $project: {
                postIdObj: 0,
              },
            },
            {
              $addFields: {
                userIdObj: {
                  $toObjectId: '$userId',
                },
              },
            },
            {
              $lookup: {
                from: 'userv2',
                let: {
                  userId: '$userIdObj',
                },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ['$_id', '$$userId'],
                      },
                    },
                  },
                  {
                    $addFields: {
                      companyIdObj: {
                        $toObjectId: '$companyDetails.companyId',
                      },
                    },
                  },
                  {
                    $lookup: {
                      from: 'companies',
                      localField: 'companyIdObj',
                      foreignField: '_id',
                      as: 'companyFullDetails',
                    },
                  },
                  {
                    $unwind: '$companyFullDetails',
                  },
                  {
                    $addFields: {
                      companyFullDetails: '$companyFullDetails',
                    },
                  },
                  {
                    $project: {
                      companyIdObj: 0,
                    },
                  },
                ],
                as: 'userDetails',
              },
            },
            {
              $unwind: '$userDetails',
            },
            {
              $project: {
                userIdObj: 0,
              },
            },
          ],
          as: 'activityDetails',
        },
      },
      {
        $project: {
          _id: 0,
          'activityDetails._id': 1,
          'activityDetails.userId': 1,
          'activityDetails.postId': 1,
          'activityDetails.text': 1,
          'activityDetails.createdAt': 1,
          'activityDetails.userDetails._id': 1,
          'activityDetails.userDetails.name': 1,
          'activityDetails.userDetails.email': 1,
          'activityDetails.userDetails.personalDetails.imageUrl': 1,
          'activityDetails.userDetails.professionalDetails.companyName': 1,
          'activityDetails.userDetails.professionalDetails.designation': 1,
          'activityDetails.userDetails.companyFullDetails': 1,
        },
      },
    ];

    const data: any = await this.postsModel.aggregate(query);

    return data[0] || [];
  }
}

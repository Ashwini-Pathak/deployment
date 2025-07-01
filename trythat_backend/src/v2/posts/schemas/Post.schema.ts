import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PostType } from '../enum/post-type.enum';
import { PostRel } from '../enum/post-rel.enum';

@Schema({ _id: false })
export class CTA {
  @Prop()
  name: string;

  @Prop()
  link: string;
}

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  versionKey: false,
  timestamps: true,
  toObject: {
    getters: true,
    virtuals: true,
    versionKey: false,
  },
})
export class Posts extends Document {
  @Prop({ type: String, enum: PostType, required: true })
  type: PostType;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  body: string;

  @Prop({ type: Array })
  tags: string[];

  @Prop({ type: Object, ref: 'CTA' })
  CTA: CTA;

  @Prop({ type: Array })
  likes: string[];

  @Prop({ type: Array })
  comments: string[];

  @Prop({ type: Array })
  shares: string[];

  @Prop({ type: Array })
  repost: string[];

  @Prop({ type: Array })
  saves: string[];

  @Prop({ type: Array })
  imageUrls: string[];

  @Prop({ required: true })
  ownerId: string;

  @Prop({ type: String, enum: PostRel })
  ownerType: PostRel;
}

export type PostsDocument = Posts & Document;

export const PostsSchema = SchemaFactory.createForClass(Posts);

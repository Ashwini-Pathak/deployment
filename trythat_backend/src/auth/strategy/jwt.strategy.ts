import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Model } from 'mongoose';

import { User } from '../../user/schemas/User.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from '../../user/schemas/User.schema';
import { asyncHandler, getQueryFromPayload } from '../../_app/utils/';
import { ConfigService } from '@nestjs/config';
import { DatabaseEnv } from '../../config/database-env.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name, DatabaseEnv.DB_USER_CONN) private userModel: Model<UserDocument>,
    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('jwtSecretKey'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload): Promise<User> {
    const query = getQueryFromPayload(payload);
    const [userResp] = await asyncHandler(this.userModel.findOne(query));

    if (!userResp) {
      throw new UnauthorizedException();
    }

    return userResp;
  }
}

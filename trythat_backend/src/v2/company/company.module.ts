import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './schemas/Company.schema';
import { UserV2, UserV2Schema } from '../user/schemas/User.schema';
import { DatabaseEnv } from '../../config/database-env.enum';
import { UserV2Service } from '../user/user.service';
import { CompanyRepository } from './repository/company.repository';
import { UserV2Repository } from '../user/repository/users.repository';
import { User } from '../../user/schemas/User.schema';
import { FollowModule } from '../follow/follow.module';

@Module({
  imports: [
    FollowModule,
    MongooseModule.forFeature(
      [
        {
          name: Company.name,
          schema: CompanySchema,
        },
        {
          name: UserV2.name,
          schema: UserV2Schema,
        },
        {
          name: User.name,
          schema: UserV2Schema,
        },
      ],
      DatabaseEnv.DB_USER_CONN,
    ),
  ],
  controllers: [CompanyController],
  providers: [CompanyService, UserV2Service, CompanyRepository, UserV2Repository],
})
export class CompanyModule {}

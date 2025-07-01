import { Module } from '@nestjs/common';
import { OfferingsService } from './offerings.service';
import { OfferingsController } from './offerings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Broker, Seller } from '../user/schemas/User.schema';
import { BrokerSchema } from './schemas/Broker.schema';
import { SellerSchema } from './schemas/Seller.schema';
import { Buyer, BuyerSchema } from './schemas/Buyer.schema';
import { CoWorker, CoWorkerSchema } from './schemas/Co-worker.schema';
import { DatabaseEnv } from '../../config/database-env.enum';
import { BuyerRepository } from './repository/buyer.repository';
import { SellerRepository } from './repository/seller.repository';
import { CoWorkerRepository } from './repository/co-worker.repository';
import { BrokerRepository } from './repository/broker.repository';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [
    PostsModule,
    MongooseModule.forFeature(
      [
        {
          name: Broker.name,
          schema: BrokerSchema,
        },
        {
          name: Seller.name,
          schema: SellerSchema,
        },
        {
          name: Buyer.name,
          schema: BuyerSchema,
        },
        {
          name: CoWorker.name,
          schema: CoWorkerSchema,
        },
      ],
      DatabaseEnv.DB_USER_CONN,
    ),
  ],
  controllers: [OfferingsController],
  providers: [OfferingsService, BuyerRepository, SellerRepository, CoWorkerRepository, BrokerRepository],
})
export class OfferingsModule {}

import { Injectable } from '@nestjs/common';
import { CreateBuyerDto } from './dto/create-buyer.dto';
import { CreateSellerDto } from './dto/create-seller.dto';
import { CreateBrokerDto } from './dto/create-broker.dto';
import { CreateCoWorkerDto } from './dto/create-co-worker.dto';
import { BuyerRepository } from './repository/buyer.repository';
import { SellerRepository } from './repository/seller.repository';
import { BrokerRepository } from './repository/broker.repository';
import { CoWorkerRepository } from './repository/co-worker.repository';
import { PostsService } from '../posts/posts.service';
import { PostType } from '../posts/enum/post-type.enum';
import { PostRel } from '../posts/enum/post-rel.enum';

@Injectable()
export class OfferingsService {
  constructor(
    private readonly buyerRepository: BuyerRepository,
    private readonly sellerRepository: SellerRepository,
    private readonly brokerRepository: BrokerRepository,
    private readonly coWorkerRepository: CoWorkerRepository,
    private readonly postsService: PostsService,
  ) {}

  async createBuyer(userId: string, createBuyerDto: CreateBuyerDto) {
    return {
      data: await this.buyerRepository.createBuyer(userId, createBuyerDto),
    };
  }

  async createSeller(userId: string, createSellerDto: CreateSellerDto) {
    const data = await this.sellerRepository.createSeller(userId, createSellerDto);
    const body = `Location: ${createSellerDto.location}
Purpose: ${createSellerDto.purpose}
PropertyType: ${createSellerDto.propertyType?.map((el) => el?.text)}
OpenToBroker: ${createSellerDto.openToBroker ? 'yes' : 'no'}`;

    const _createdPost = await this.postsService.createPost({
      type: PostType.GENERIC_CARD,
      ownerType: PostRel.USER_POST,
      title: 'Seller / I want to rent out a property',
      body,
      ownerId: userId,
    });

    await this.sellerRepository.updateSeller(data.id, { postId: _createdPost.data.id });

    return {
      message: 'created seller',
      data,
    };
  }

  async createBroker(userId: string, createBrokerDto: CreateBrokerDto) {
    const data = await this.brokerRepository.createBroker(userId, createBrokerDto);

    return {
      data,
    };
  }

  async createCoWorker(userId: string, createCoWorkerDto: CreateCoWorkerDto) {
    const data = await this.coWorkerRepository.createCoWorker(userId, createCoWorkerDto);

    const body = `Location: ${createCoWorkerDto.location}
Available Seats: ${createCoWorkerDto.availability}
Expected Price: Rs. ${createCoWorkerDto.expectation}
OpenToBroker: ${createCoWorkerDto.openToBroker ? 'yes' : 'no'}`;

    const _createdPost = await this.postsService.createPost({
      type: PostType.GENERIC_CARD,
      ownerType: PostRel.USER_POST,
      title: 'Lead: Co-Working Operator',
      body,
      ownerId: userId,
    });

    await this.coWorkerRepository.updateCoWorker(data.id, { postId: _createdPost.data.id });

    return {
      message: 'created CoWorker',
      data,
    };
  }

  async getBuyerDetails(userId: string) {
    return {
      data: {
        totalRecords: await this.buyerRepository.getTotalBuyers(userId),
        buyer: await this.buyerRepository.getBuyerDetails(userId),
      },
    };
  }

  async getSellerDetails(userId: string) {
    return {
      data: {
        totalRecords: await this.sellerRepository.getTotalSellers(userId),
        seller: await this.sellerRepository.getSellerDetails(userId),
      },
    };
  }

  async getBrokerDetails(userId: string, limit: number = 5, offset: number = 0) {
    return {
      data: {
        totalRecords: await this.brokerRepository.getTotalBrokers(userId),
        broker: await this.brokerRepository.getBrokerDetails(userId, limit, offset),
      },
    };
  }

  async getCoWorkerDetails(userId: string, limit: number = 5, offset: number = 0) {
    return {
      data: {
        totalRecords: await this.coWorkerRepository.getTotalCoWorkers(userId),
        coWorker: await this.coWorkerRepository.getCoWorkerDetails(userId, limit, offset),
      },
    };
  }

  async updateBuyer(buyerId: string, buyerDetails) {
    return {
      data: await this.buyerRepository.updateBuyer(buyerId, buyerDetails),
    };
  }

  async updateSeller(sellerId: string, sellerDetails) {
    const _updatedSeller = await this.sellerRepository.updateSeller(sellerId, sellerDetails);
    const body = `Location: ${_updatedSeller.location}
Purpose: ${_updatedSeller.purpose}
PropertyType: ${_updatedSeller.propertyType?.map((el) => el?.text)}
OpenToBroker: ${_updatedSeller.openToBroker ? 'yes' : 'no'}`;

    await this.postsService.updatePost(_updatedSeller.postId, { body });

    return {
      data: _updatedSeller,
    };
  }

  async updateBroker(brokerId: string, brokerDetails) {
    return {
      data: await this.brokerRepository.updateBroker(brokerId, brokerDetails),
    };
  }

  async updateCoWorker(coworkerId: string, coworkerDetails) {
    const _updatedCoWorker = await this.coWorkerRepository.updateCoWorker(coworkerId, coworkerDetails);
    const body = `Location: ${_updatedCoWorker.location}
Available Seats: ${_updatedCoWorker.availability}
Expected Price: Rs. ${_updatedCoWorker.expectation}
OpenToBroker: ${_updatedCoWorker.openToBroker ? 'yes' : 'no'}`;

    await this.postsService.updatePost(_updatedCoWorker.postId, { body });

    return {
      data: _updatedCoWorker,
    };
  }
}

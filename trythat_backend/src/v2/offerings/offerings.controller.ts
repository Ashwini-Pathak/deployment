import { Controller, Get, Post, Body, Param, UseGuards, Query, Put } from '@nestjs/common';
import { OfferingsService } from './offerings.service';
import { JwtAuthGuard } from '../../auth/guards/jwtauth.guard';
import { CreateBuyerDto } from './dto/create-buyer.dto';
import { CreateSellerDto } from './dto/create-seller.dto';
import { CreateBrokerDto } from './dto/create-broker.dto';
import { CreateCoWorkerDto } from './dto/create-co-worker.dto';
import { UpdateBuyerDto } from './dto/update-buyer.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { UpdateBrokerDto } from './dto/update-broker.dto';
import { UpdateCoWorkerDto } from './dto/update-co-worker.dto';

@Controller({
  path: 'user/:id/offerings',
  version: '2',
})
// @UseGuards(JwtAuthGuard)
export class OfferingsController {
  constructor(private readonly offeringsService: OfferingsService) {}

  @Post('buyer')
  createBuyer(@Body() createBuyerDto: CreateBuyerDto, @Param('id') userId: string) {
    return this.offeringsService.createBuyer(userId, createBuyerDto);
  }

  @Post('seller')
  createSeller(@Body() createSellerDto: CreateSellerDto, @Param('id') userId: string) {
    return this.offeringsService.createSeller(userId, createSellerDto);
  }

  @Post('broker')
  createBroker(@Body() createBrokerDto: CreateBrokerDto, @Param('id') userId: string) {
    return this.offeringsService.createBroker(userId, createBrokerDto);
  }

  @Post('coworking')
  createCoworker(@Body() createCoWorkerDto: CreateCoWorkerDto, @Param('id') userId: string) {
    return this.offeringsService.createCoWorker(userId, createCoWorkerDto);
  }

  @Put('buyer/:buyerId')
  updateBuyer(@Body() updateBuyerDto: UpdateBuyerDto, @Param('buyerId') buyerId: string) {
    return this.offeringsService.updateBuyer(buyerId, updateBuyerDto);
  }

  @Put('seller/:sellerId')
  updateSeller(
    @Body() updateSellerDto: UpdateSellerDto,
    @Param('sellerId') sellerId: string,
  ) {
    return this.offeringsService.updateSeller(sellerId, updateSellerDto);
  }

  @Put('broker/:brokerId')
  updateBroker(
    @Body() updateBrokerDto: UpdateBrokerDto,
    @Param('brokerId') brokerId: string,
  ) {
    return this.offeringsService.updateBroker(brokerId, updateBrokerDto);
  }

  @Put('coworking/:coworkingId')
  updateCoworker(
    @Body() updateCoWorkerDto: UpdateCoWorkerDto,
    @Param('coworkingId') coworkingId: string,
  ) {
    return this.offeringsService.updateCoWorker(coworkingId, updateCoWorkerDto);
  }

  @Get('buyer')
  getBuyerDetails(@Param('id') userId: string) {
    return this.offeringsService.getBuyerDetails(userId);
  }

  @Get('seller')
  getSellerDetails(@Param('id') userId: string) {
    return this.offeringsService.getSellerDetails(userId);
  }

  @Get('broker')
  getBrokerDetails(@Param('id') userId: string, @Query('limit') limit: string, @Query('offset') offset: string) {
    return this.offeringsService.getBrokerDetails(userId, +limit, +offset);
  }

  @Get('coworking')
  getCoWorkerDetails(@Param('id') userId: string, @Query('limit') limit: string, @Query('offset') offset: string) {
    return this.offeringsService.getCoWorkerDetails(userId, +limit, +offset);
  }
}

import { Controller, Post, Get, Body, Param, Query, HttpCode, ValidationPipe, Delete, UseGuards } from '@nestjs/common';
import { ProspectsService } from '../prospects/prospects.service';
import { CreateProspectDto } from '../prospects/dto/create-prospect.dto';
import { RSearchDto } from '../search/dto/r-search.dto';
import { SearchService } from '../search/search.service';
import { ConnectQueryDto, OrgQueryDto, PropQueryDto } from '../search/dto/r-rel.dto';
import { CreateReviewDto } from '../search/dto/create-review.dto';
import { InitTransactDto } from '../search/dto/transact-dto';
import { ContactsService } from '../contacts/contacts.service';
import {
  CommercialQueryDto,
  ContactsSearchDto,
  ResidentialQueryDto,
  TransactionQueryParam,
} from './dto/contact.query.dto';
import { JwtAuthGuard } from '../auth/guards/jwtauth.guard';
import { TransactionService } from '../transaction/transaction.service';

@Controller('leadgen/user/:id')
@UseGuards(JwtAuthGuard)
export class LeadgenController {
  constructor(
    private prospectsService: ProspectsService,
    private readonly contactsService: ContactsService,
    private searchService: SearchService,
    private transactionService: TransactionService,
  ) {}

  @Delete('/prospect')
  deleteProspect(@Param('id') userId: string, @Body(new ValidationPipe()) deleteProspectDto: CreateProspectDto) {
    return this.prospectsService.deleteProspect(userId, deleteProspectDto);
  }

  @Post('/prospect')
  createProspect(@Param('id') userId: string, @Body(new ValidationPipe()) createProspectDto: CreateProspectDto) {
    return this.prospectsService.createProspect(userId, createProspectDto);
  }

  @Get('/prospect')
  getProspects(@Param('id') userId: string, @Query() { limit, skip }) {
    return this.prospectsService.getProspects({ userId, limit, skip });
  }
  @Get('/prospect/stats')
  getProspectsStats(@Param('id') userId: string) {
    return this.prospectsService.getProspectsStats(userId);
  }

  @Get('/prospect/wishlist')
  getProspectsWishlist(@Param('id') userId: string) {
    return this.prospectsService.getProspectWishlist(userId);
  }

  @HttpCode(200)
  @Post('/recommendation/search')
  getSearchResults(@Param('id') userId: string, @Body() rSearchDto: RSearchDto) {
    return this.searchService.searchREngine(rSearchDto, userId);
  }

  @Get('/recommendation/organisation/:orgId')
  getOrgById(@Param('id') userId: string, @Param('orgId') orgId: string, @Query() rel: OrgQueryDto) {
    return this.searchService.getOrgById(userId, orgId, rel);
  }

  @Get('/recommendation/property/:propId')
  getPropById(@Param('id') userId: string, @Param('propId') propId: string, @Query() rel: PropQueryDto) {
    return this.searchService.getPropById(userId, propId, rel);
  }

  @Get('/recommendation/commercialProperty/:propId')
  getCommercialPropById(@Param('id') userId: string, @Param('propId') propId: string, @Query() rel: PropQueryDto) {
    return this.searchService.getCommercialPropById(userId, propId, rel);
  }

  @Get('/recommendation/residentialProperty/:propId')
  getResidentialPropById(@Param('id') userId: string, @Param('propId') propId: string, @Query() rel: PropQueryDto) {
    return this.searchService.getResidentialPropById(userId, propId, rel);
  }

  @Get('/recommendation/property/:propId/transaction/:transactionId')
  getPropTransactionById(
    @Param('id') userId: string,
    @Param('propId') propId: string,
    @Param('transactionId') transactionId: string,
  ) {
    return this.searchService.getPropTranscationById(userId, propId, transactionId);
  }

  @Get('/recommendation/connect/:connId')
  getConnectById(@Param('id') userId: string, @Param('connId') connId: string, @Query() rel: ConnectQueryDto) {
    return this.searchService.getConnectById(userId, connId, rel);
  }

  @Get('/recommendation/property/:propId/reviews')
  getPropertyReviews(@Param('propId') propId: string) {
    return this.searchService.getReviews('property', propId);
  }

  @Get('/recommendation/organisation/:orgId/reviews')
  getOrganisationReviews(@Param('orgId') orgId: string) {
    return this.searchService.getReviews('organization', orgId);
  }

  @Get('/recommendation/connect/:connId/reviews')
  getConnectReviews(@Param('connId') connId: string) {
    return this.searchService.getReviews('connect', connId);
  }

  @Post('/recommendation/reviews')
  createReview(@Body() createReviewDto: CreateReviewDto) {
    return this.searchService.createReview(createReviewDto);
  }

  @HttpCode(200)
  @Post('/recommendation/transact')
  initiateTransaction(@Param('id') userId: string, @Body(new ValidationPipe()) initTransactDto: InitTransactDto) {
    return this.searchService.initiateTransaction(userId, initTransactDto);
  }

  @Get('/contact/commercial')
  getCommertialContacts(@Param('id') userId: string, @Query() queryParam: CommercialQueryDto) {
    return this.contactsService.getCommercialContacts(userId, queryParam);
  }

  @Get('/contact/residential')
  getResidentialContacts(@Param('id') userId: string, @Query() queryParam: ResidentialQueryDto) {
    return this.contactsService.getResidentialContacts(userId, queryParam);
  }

  @Get('/contact/stats')
  getContactsStats(@Param('id') userId: string) {
    return this.contactsService.getContactsStats(userId);
  }

  @Post('/contact/search')
  getContactsByQuery(@Param('id') userId: string, @Body() contactsSearchDto: ContactsSearchDto) {
    return this.contactsService.getContactsByQuery(userId, contactsSearchDto);
  }

  @Get('/transactions')
  getTransaction(@Param('id') userId: string, @Query() transactionQuery: TransactionQueryParam) {
    return this.transactionService.getTransactions(userId, transactionQuery);
  }
}

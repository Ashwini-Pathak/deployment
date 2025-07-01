import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { get } from 'lodash';

import { asyncHandler } from '../_app/utils';
import { ConfigEnv } from '../config/config.env.enums';
import { PropRelType, OrgRelType, ConnectRelType } from '../search/enum/re-rel-type.enum';

@Injectable()
export class REngineApi {
  private readonly logger: Logger = new Logger(REngineApi.name);
  private readonly rSearchApi;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.rSearchApi = `${configService.get(ConfigEnv.R_ENGINE_HOST)}`;
  }

  async query(queryFor) {
    const requestUrl = `${this.rSearchApi}/${queryFor}`;
    this.logger.log({ requestUrl }, 'query request');

    const [queryResponse, queryError] = await asyncHandler(this.httpService.axiosRef.get(requestUrl));

    if (queryError) {
      return [null, queryError];
    }

    return [get(queryResponse, 'data', {}), null];
  }

  async search(rSearchDto) {
    const requestUrl = `${this.rSearchApi}/search-query`;
    this.logger.log({ requestUrl, rSearchDto }, 'search request');

    const [searchResponse, searchError] = await asyncHandler(
      this.httpService.axiosRef.post(requestUrl, { ...rSearchDto }),
    );
    if (searchError) {
      return [null, searchError];
    }

    return [get(searchResponse, 'data', {}), null];
  }

  async getOrganisation(orgId) {
    const requestUrl = `${this.rSearchApi}/organization/${orgId}`;
    this.logger.log({ requestUrl }, 'getOrganisation request');

    const [getOrganisationResp, getOrganisationError] = await asyncHandler(this.httpService.axiosRef.get(requestUrl));

    if (getOrganisationError) {
      return [null, getOrganisationError];
    }

    return [get(getOrganisationResp, 'data.data', {}), null];
  }

  async getProperty(propId) {
    const requestUrl = `${this.rSearchApi}/property/${propId}`;
    this.logger.log({ requestUrl }, 'getProperty request');

    const [getPropertyRes, getPropertyError] = await asyncHandler(this.httpService.axiosRef.get(requestUrl));

    if (getPropertyError) {
      return [null, getPropertyError];
    }

    return [get(getPropertyRes, 'data.data', {}), null];
  }

  // to get commercial property

  async getCommercialProperty(propId) {
    const requestUrl = `${this.rSearchApi}/commercial-property/${propId}`;
    this.logger.log({ requestUrl }, 'getCommercialProperty request');

    const [getPropertyRes, getPropertyError] = await asyncHandler(this.httpService.axiosRef.get(requestUrl));

    if (getPropertyError) {
      return [null, getPropertyError];
    }

    return [get(getPropertyRes, 'data.data', {}), null];
  }

  // to get residential property

  async getResidentialProperty(propId) {
    const requestUrl = `${this.rSearchApi}/residential-property/${propId}`;
    this.logger.log({ requestUrl }, 'getResidentialProperty request');

    const [getPropertyRes, getPropertyError] = await asyncHandler(this.httpService.axiosRef.get(requestUrl));

    if (getPropertyError) {
      return [null, getPropertyError];
    }

    return [get(getPropertyRes, 'data.data', {}), null];
  }

  async getPropTransaction(transactionId) {
    const requestUrl = `${this.rSearchApi}/transaction/${transactionId}`;
    this.logger.log({ requestUrl }, 'getPropTransaction request');

    const [getPropTransactionRes, getPropTransactionError] = await asyncHandler(
      this.httpService.axiosRef.get(requestUrl),
    );

    if (getPropTransactionError) {
      return [null, getPropTransactionError];
    }
    return [get(getPropTransactionRes, 'data.data', {}), null];
  }

  async getConnect(connectId) {
    const requestUrl = `${this.rSearchApi}/connect/${connectId}`;
    this.logger.log({ requestUrl }, 'getConnect request');

    const [getConnectResp, getConnectError] = await asyncHandler(this.httpService.axiosRef.get(requestUrl));

    if (getConnectError) {
      return [null, getConnectError];
    }

    this.logger.log({ getConnectResp: get(getConnectResp, 'data', {}) }, 'getConnect response');
    return [get(getConnectResp, 'data.data', {}), null];
  }

  async getPropertyRelated(id: string, relType: PropRelType) {
    const requestUrl = `${this.rSearchApi}/property/${id}?rel=${relType}`;
    this.logger.log({ requestUrl }, 'getPropertyRelated request');

    const [getRelatedResp, getRelatedError] = await asyncHandler(this.httpService.axiosRef.get(requestUrl));

    if (getRelatedError) {
      return [null, getRelatedError];
    }

    return [get(getRelatedResp, 'data.data', []), null];
  }

  async getCommercialPropertyRelated(id: string, relType: PropRelType, offset: PropRelType, limit: PropRelType) {
    const requestUrl = `${this.rSearchApi}/commercial-property/${id}?rel=${relType}&pageSize=${limit}&offset=${offset}`;
    this.logger.log({ requestUrl }, 'getCommercialPropertyRelated request');

    const [getRelatedResp, getRelatedError] = await asyncHandler(this.httpService.axiosRef.get(requestUrl));

    if (getRelatedError) {
      return [null, getRelatedError];
    }

    return [get(getRelatedResp, 'data.data', []), null];
  }

  async getResidentialPropertyRelated(id: string, relType: PropRelType) {
    const requestUrl = `${this.rSearchApi}/residential-property/${id}?rel=${relType}`;
    this.logger.log({ requestUrl }, 'getResidentialPropertyRelated request');

    const [getRelatedResp, getRelatedError] = await asyncHandler(this.httpService.axiosRef.get(requestUrl));

    if (getRelatedError) {
      return [null, getRelatedError];
    }

    return [get(getRelatedResp, 'data.data', []), null];
  }

  async getOrganizationRelated(id, relType: OrgRelType) {
    const requestUrl = `${this.rSearchApi}/organization/${id}?rel=${relType}`;
    this.logger.log({ requestUrl }, 'getPropertyRelated request');

    const [getRelatedResp, getRelatedError] = await asyncHandler(this.httpService.axiosRef.get(requestUrl));

    if (getRelatedError) {
      return [null, getRelatedError];
    }

    return [get(getRelatedResp, 'data.data', []), null];
  }

  async getConnectRelated(id, relType: ConnectRelType) {
    const requestUrl = `${this.rSearchApi}/connect/${id}?rel=${relType}`;
    this.logger.log({ requestUrl }, 'getConnectRelated request');

    const [getRelatedResp, getRelatedError] = await asyncHandler(this.httpService.axiosRef.get(requestUrl));

    if (getRelatedError) {
      return [null, getRelatedError];
    }

    return [get(getRelatedResp, 'data.data', []), null];
  }

  async getReviews(type, id) {
    const requestUrl = `${this.rSearchApi}/${type}/${id}/reviews`;
    this.logger.log({ requestUrl }, 'getReviews request');

    const [getReviewsResp, getReviewsError] = await asyncHandler(this.httpService.axiosRef.get(requestUrl));

    if (getReviewsError) {
      return [null, getReviewsError];
    }

    return [get(getReviewsResp, 'data.data', []), null];
  }

  async createReview(payload) {
    const { resourceId, resourceType, ...review } = payload;

    const requestUrl = `${this.rSearchApi}/${resourceType}/${resourceId}/reviews`;
    this.logger.log({ requestUrl }, 'getReviews request');

    const [createReviewResp, createReviewError] = await asyncHandler(
      this.httpService.axiosRef.post(requestUrl, {
        ...review,
      }),
    );

    if (createReviewError) {
      return [null, createReviewError];
    }

    return [get(createReviewResp, 'data', {}), null];
  }
}

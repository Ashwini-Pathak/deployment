import { Injectable, Logger } from '@nestjs/common';
import { compact, get, isEmpty, size } from 'lodash';

import { REngineApi } from '../helper/r-engine.helper';
import {
  ContactExistsException,
  InsuffucientBalanceException,
  InternalServerErrorException,
  ResourceNotFound,
} from '../_app/exceptions';
import { PointsRepository } from '../point/repository/points.repository';
import { ContactsRepository } from '../contacts/repository/contacts.repository';
import { formatDataForContact, formatSearchResponse, resourceDetailsFromSearch } from '../_app/utils/formatSearchData';
import { ProspectsRepository } from '../prospects/repository/prospects.repository';
import { CtxSearch } from './enum/ctx-search.enum';
import { getTransactionItemCount } from '../_app/utils/getTransactionItemCount';
import { formatTransactData } from '../_app/utils/formatTransactData';
import { CrmHelper } from '../helper/crm.helper';
import { mapRelToCtx, mapTagToCtx } from './util/search.util';
import { PointService } from '../point/point.service';

@Injectable()
export class SearchService {
  private readonly logger: Logger = new Logger(SearchService.name);

  constructor(
    private readonly reApi: REngineApi,
    private readonly pointRepository: PointsRepository,
    private readonly contactRepository: ContactsRepository,
    private readonly prospectsRepository: ProspectsRepository,
    private readonly crmHelper: CrmHelper,
    private readonly pointService: PointService,
  ) {}

  async getContactsForUser({ userId, payload }) {
    return await Promise.all(
      payload.map(async (item) => {
        const contact = await this.contactRepository.getContact({
          userId,
          resourceType: item.resourceType,
          resourceSubType: item.resourceSubType,
          resourceId: item.resourceId,
        });

        return contact;
      }),
    );
  }

  async getProspectsForUser({ userId, payload }) {
    return await Promise.all(
      payload.map(async (item) => {
        const prospect = await this.prospectsRepository.getProspectsForResources(userId, {
          resourceType: item.resourceType,
          resourceSubType: item.resourceSubType,
          resourceId: item.resourceId,
        });

        return get(prospect, 'resourceId');
      }),
    );
  }

  async searchREngine(rSearchDto, userId) {
    this.logger.log({ rSearchDto, userId }, 'Making search request:: ');

    const [searchResponse, searchREngineErr] = await this.reApi.search(rSearchDto);
    if (searchREngineErr) {
      throw new InternalServerErrorException(
        'Error occured while searching recommendation engine',
        get(searchREngineErr, 'message', 'something went wrong'),
      );
    }

    const ctx = mapTagToCtx(get(searchResponse, 'tag', ''));
    this.logger.log({ ctx }, 'seach request completed; extracted context ');

    const data = await this.getFormattedData({ response: searchResponse, userId, ctx });
    this.logger.log(data, 'formatted data to return');

    // process results and send back
    return { message: 'retrieved search recommendations', data };
  }

  // ORG
  async getOrgById(userId: string, orgId: string, relType) {
    if (!isEmpty(relType)) {
      const rel = get(relType, 'rel');
      const [getOrgByIdResp, getOrgByIdErr] = await this.reApi.getOrganizationRelated(orgId, rel);

      if (getOrgByIdErr) {
        throw new InternalServerErrorException(
          'Error occured while getting organization',
          get(getOrgByIdErr, 'message', 'something went wrong'),
        );
      }

      const ctx = mapRelToCtx(rel);
      this.logger.log({ ctx }, 'seach request completed; extracted context');

      const data = await this.getFormattedData({ response: getOrgByIdResp, userId, ctx });

      // process results and send back
      return { message: `retrieved related ${rel} for connect ID: ${orgId}`, data };
    }

    const [getOrgByIdResp, getOrgByIdErr] = await this.reApi.getOrganisation(orgId);

    if (getOrgByIdErr) {
      throw new InternalServerErrorException(
        'Error occured while getting organization',
        get(getOrgByIdErr, 'message', 'something went wrong'),
      );
    }

    const data = await this.getFormattedData({ response: getOrgByIdResp, userId, ctx: CtxSearch.ORGANIZATION });

    // process results and send back
    return { message: `retrieved organization for ID: ${orgId}`, data };
  }

  // PROPS
  async getPropById(userId: string, propId: string, relType) {
    if (!isEmpty(relType)) {
      const rel = get(relType, 'rel');
      const [getPropertyRelatedRes, getPropertyRelatedErr] = await this.reApi.getPropertyRelated(propId, rel);

      if (getPropertyRelatedErr) {
        throw new InternalServerErrorException(
          'Error occured while getting properties',
          get(getPropertyRelatedErr, 'message', 'something went wrong'),
        );
      }

      const ctx = mapRelToCtx(rel);
      this.logger.log({ ctx }, 'seach request completed; extracted context');

      const data = await this.getFormattedData({ response: getPropertyRelatedRes, userId, ctx });

      // process results and send back
      return { message: `retrieved related ${rel} for connect ID: ${propId}`, data };
    }

    const [getPropertyRelatedRes, getPropertyRelatedErr] = await this.reApi.getProperty(propId);

    if (getPropertyRelatedErr) {
      throw new InternalServerErrorException(
        'Error occured while getting properties',
        get(getPropertyRelatedErr, 'message', 'something went wrong'),
      );
    }

    const data = await this.getFormattedData({ response: getPropertyRelatedRes, userId, ctx: CtxSearch.PROPERTY });
    // process results and send back
    return { message: `retrieved connect for ID: ${propId}`, data };
  }

  // API for getting commercial property details
  async getCommercialPropById(userId: string, propId: string, relType) {
    if (!isEmpty(relType)) {
      const rel = get(relType, 'rel');
      const offset = get(relType, 'offset');
      const limit = get(relType, 'limit');
      const [getPropertyRelatedRes, getPropertyRelatedErr] = await this.reApi.getCommercialPropertyRelated(
        propId,
        rel,
        offset,
        limit,
      );

      if (getPropertyRelatedErr) {
        throw new InternalServerErrorException(
          'Error occured while getting residential properties',
          get(getPropertyRelatedErr, 'message', 'something went wrong'),
        );
      }

      const ctx = mapRelToCtx(rel);
      this.logger.log({ ctx }, 'seach request completed; extracted context');

      const data = await this.getFormattedData({ response: getPropertyRelatedRes, userId, ctx });

      // process results and send back
      return { message: `retrieved related ${rel} for property ID: ${propId}`, data };
    }

    const [getPropertyRelatedRes, getPropertyRelatedErr] = await this.reApi.getCommercialProperty(propId);

    if (getPropertyRelatedErr) {
      throw new InternalServerErrorException(
        'Error occured while getting commercial properties',
        get(getPropertyRelatedErr, 'message', 'something went wrong'),
      );
    }

    const data = await this.getFormattedData({
      response: getPropertyRelatedRes,
      userId,
      ctx: CtxSearch.COMMERCIAL_PROPERTY,
    });
    // process results and send back
    return { message: `retrieved property for ID: ${propId}`, data };
  }

  // API for getting residential property details
  async getResidentialPropById(userId: string, propId: string, relType) {
    if (!isEmpty(relType)) {
      const rel = get(relType, 'rel');
      const [getPropertyRelatedRes, getPropertyRelatedErr] = await this.reApi.getResidentialPropertyRelated(
        propId,
        rel,
      );

      if (getPropertyRelatedErr) {
        throw new InternalServerErrorException(
          'Error occured while getting residential properties',
          get(getPropertyRelatedErr, 'message', 'something went wrong'),
        );
      }

      const ctx = mapRelToCtx(rel);
      this.logger.log({ ctx }, 'seach request completed; extracted context');

      const data = await this.getFormattedData({ response: getPropertyRelatedRes, userId, ctx });

      // process results and send back
      return { message: `retrieved related ${rel} for property ID: ${propId}`, data };
    }

    const [getPropertyRelatedRes, getPropertyRelatedErr] = await this.reApi.getResidentialProperty(propId);

    if (getPropertyRelatedErr) {
      throw new InternalServerErrorException(
        'Error occured while getting residential properties',
        get(getPropertyRelatedErr, 'message', 'something went wrong'),
      );
    }

    const data = await this.getFormattedData({
      response: getPropertyRelatedRes,
      userId,
      ctx: CtxSearch.RESIDENTIAL_PROPERTY,
    });
    // process results and send back
    return { message: `retrieved property for ID: ${propId}`, data };
  }

  async getPropTranscationById(userId: string, propId: string, transactionId: string) {
    const [getPropTransactionRes, getPropTransactionErr] = await this.reApi.getPropTransaction(transactionId);
    if (getPropTransactionErr) {
      throw new InternalServerErrorException(
        'Error occured while getting Property Transactions',
        get(getPropTransactionErr, 'message', 'something went wrong'),
      );
    }
    this.logger.log(userId, propId, transactionId, 'property transaction data');
    return { message: `retrieved Transaction for ID: ${transactionId}`, data: getPropTransactionRes };
  }

  // CONNECTS
  async getConnectById(userId: string, connectId: string, relType) {
    // condition for query param
    if (!isEmpty(relType)) {
      const rel = get(relType, 'rel');
      const [getConnectByIdResp, getConnectByIdErr] = await this.reApi.getConnectRelated(connectId, rel);

      if (getConnectByIdErr) {
        throw new InternalServerErrorException(
          'Error occured while getting organization',
          get(getConnectByIdErr, 'message', 'something went wrong'),
        );
      }

      const ctx = mapRelToCtx(rel);
      this.logger.log({ ctx }, 'seach request completed; extracted context');

      const data = await this.getFormattedData({ response: getConnectByIdResp, userId, ctx });

      // process results and send back
      return { message: `retrieved related ${rel} for connect ID: ${connectId}`, data };
    }

    // condition for general query
    const [getConnectByIdResp, getConnectByIdErr] = await this.reApi.getConnect(connectId);

    if (getConnectByIdErr) {
      throw new InternalServerErrorException(
        'Error occured while getting connects',
        get(getConnectByIdErr, 'message', 'something went wrong'),
      );
    }

    const data = await this.getFormattedData({ response: getConnectByIdResp, userId, ctx: CtxSearch.CONNECT });

    // process results and send back
    return { message: `retrieved connect for ID: ${connectId}`, data };
  }

  // GET REVIEWS
  async getReviews(type, id) {
    const [getReviewsResp, getReviewsErr] = await this.reApi.getReviews(type, id);

    if (getReviewsErr) {
      throw new InternalServerErrorException(
        'Error occured while searching recommendation engine',
        get(getReviewsErr, 'message', 'something went wrong'),
      );
    }

    // process results and send back
    return { message: `retrieved ${type} reviews for ID ${id}`, data: getReviewsResp };
  }

  async createReview(createReviewDto) {
    const [createReviewResp, createReviewError] = await this.reApi.createReview(createReviewDto);

    if (createReviewError) {
      throw new InternalServerErrorException(
        'Error occured while searching recommendation engine',
        get(createReviewError, 'message', 'something went wrong'),
      );
    }

    // process results and send back
    return { message: `created review`, data: createReviewResp };
  }

  async getContactsFromDb(userId, initTransactPayload) {
    try {
      const contactsFromDb = await Promise.all(
        initTransactPayload.map(async (item) => {
          const _contact = await this.contactRepository.getContact(
            {
              userId,
              resourceType: item.resourceType,
              resourceSubType: item.resourceSubType,
              resourceId: item.resourceId,
            },
            { resourceId: 1, resourceType: 1, resourceSubType: 1, unlockedFields: 1, _id: 0 },
          );
          return _contact;
        }),
      );
      return contactsFromDb;
    } catch (error) {
      throw new Error(`Failed to fetch contacts from database: ${error.message}`);
    }
  }

  async filterePayload(contactsFromDb, initTransactPayload) {
    const filteredPayload = initTransactPayload.filter((payload) => {
      const contact: any = compact(contactsFromDb).find(
        (contact: any) =>
          contact.resourceId === payload.resourceId &&
          contact.resourceType === payload.resourceType &&
          contact.resourceSubType === payload.resourceSubType,
      );

      if (contact) {
        return !payload.unlockedFields.every((field) => contact.unlockedFields.includes(field));
      }

      return true;
    });

    if (isEmpty(filteredPayload)) {
      throw new ContactExistsException('Items already in contacts');
    }
    return filteredPayload;
  }

  async getFilterResourcesFromSearch(filteredPayload) {
    let resourcesFromSearch;
    try {
      resourcesFromSearch = await Promise.all(
        filteredPayload.map(async (payload) => {
          //this needs to be revisited
          let resourceSubType = payload.resourceSubType;
          if (payload.resourceSubType === 'property') {
            resourceSubType = 'commercial-property';
          }
          const requestUrl = `${resourceSubType}/${payload.resourceId}`;
          this.logger.log({ requestUrl, payload }, 'Making requests for resources');
          const [queryResponse, queryError] = await this.reApi.query(requestUrl);
          if (queryError) {
            this.logger.error(queryError);
            return queryError;
            // throw new InternalServerErrorException();
          }
          return { data: { ...queryResponse?.data?.[0], ...payload, isResourceLocked: false, isSaved: false } };
        }),
      );
    } catch (error) {
      throw new Error(`Failed to fetch contacts from search database: ${error.message}`);
    }

    const filteredResources = resourcesFromSearch.filter((resource) => !(resource instanceof Error));
    this.logger.log({ filteredResources }, 'filteredResources');

    if (isEmpty(filteredResources)) {
      this.logger.error({ resourcesFromSearch }, 'Error occured filteredResources');
      const resources = resourcesFromSearch.map((resource) => {
        const url = get(resource, 'config.url', '');
        const idArr = url.split('/');
        const id = get(idArr, size(idArr) - 1, '');
        return id;
      });

      throw new ResourceNotFound('Precondition failed; resource unavailable from search', {
        resources,
      });
    }
    return filteredResources;
  }

  async updatePointsAfterTransact(createdContact, userId) {
    try {
      const transactionPoints = 50 * get(createdContact, 'unlockedFields', []).length;
      const updatedPoints = {
        points: transactionPoints,
        type: 'debit',
      };
      await this.pointService.updatePoints(
        userId,
        updatedPoints,
        {
          type: createdContact.resourceType,
          subType: createdContact.resourceSubType,
        },
        createdContact.resourceName,
      );
    } catch (error) {
      throw new Error(`Failed to update points: ${error.message}`);
    }
  }

  async createTransactContacts(formattedData, userId) {
    try {
      const createdContacts = [];
      for await (const contact of formattedData) {
        this.logger.log({ contact }, 'creating contact');
        const createdContact = await this.contactRepository.updateOrCreate(contact);
        await this.updatePointsAfterTransact(createdContact, userId);
        createdContacts.push(createdContact);
      }
      return createdContacts;
    } catch (error) {
      throw new Error(`Failed to create contact in database: ${error.message}`);
    }
  }

  async removeProspects(formattedData) {
    try {
      const removedProspects = await Promise.all(
        formattedData.map(async (contact) => {
          try {
            this.logger.log({ contact }, 'remove  ');
            return await this.prospectsRepository.removeProspect(contact);
          } catch (error) {
            this.logger.error(error);
            return error;
          }
        }),
      );
      return removedProspects;
    } catch (error) {
      throw new Error(`Failed to remove prospect: ${error.message}`);
    }
  }

  async updateCrm(filteredResources, crmDetails) {
    try {
      const updatedCrmLeads = await Promise.all(
        filteredResources.map(async (contact) => {
          try {
            this.logger.log({ contact }, 'create crm lead');
            return await this.crmHelper.createLead(contact, crmDetails);
          } catch (error) {
            this.logger.error(error);
            return error;
          }
        }),
      );
      return updatedCrmLeads;
    } catch (error) {
      throw new Error(`Failed to update crm details: ${error.message}`);
    }
  }
  /*
    find what each transaction is worth
    check if user has enough points for transaction
      if not throw InsuffucientBalanceException
    check if the contact already exists to be on the safe side
    if user has enough points, fetch the data
      after data retrieval
        1) deduct points
        2) add to contacts
        3) send back data
  */
  async initiateTransaction(userId, initTransactDto) {
    const initTransactPayload = get(initTransactDto, 'payload', []);
    const crmDetails = get(initTransactDto, 'crmDetails', {});

    this.logger.log({ initTransactPayload }, `Getting if contact exists: ${userId}`);
    const contactsFromDb = await this.getContactsFromDb(userId, initTransactPayload);

    const filteredPayload = await this.filterePayload(contactsFromDb, initTransactPayload);
    this.logger.log({ contactsFromDb, filteredPayload }, 'filtering items from array if exists');

    const userPointsResp = await this.pointRepository.getPoints(userId);
    this.logger.log({ userPointsResp }, `Fetched points for user: ${userId}`);
    const userPoints = get(userPointsResp, 'points', 0);
    const transactionItemCount = getTransactionItemCount(filteredPayload);

    this.logger.log({ transactionItemCount }, 'Item count for transaction');
    const transactionPoints = 50 * transactionItemCount;

    if (userPoints < transactionPoints) {
      const additionalPoints = transactionPoints - userPoints;
      throw new InsuffucientBalanceException('insufficient balance', { additionalPoints });
    }

    this.logger.log(`Getting data for resources`);

    const filteredResources = await this.getFilterResourcesFromSearch(filteredPayload);
    this.logger.log({ filteredResources }, 'filteredResources Data');
    const formattedData = formatDataForContact(filteredResources, initTransactPayload, userId);
    this.logger.log({ formattedData }, 'formatted Data');
    const createdContacts = await this.createTransactContacts(formattedData, userId);
    this.logger.log({ createdContacts }, 'createdContacts Data');

    const removedProspects = await this.removeProspects(formattedData);
    this.logger.log({ removedProspects }, 'removedProspects Data');

    this.logger.log({ crmDetails }, 'CRM details');
    if (!isEmpty(crmDetails)) {
      this.logger.log({ crmDetails }, 'posting CRM leads');

      const updatedCrmLeads = await this.updateCrm(filteredResources, crmDetails);
      this.logger.log({ updatedCrmLeads }, 'removedProspects Data');
    }

    const data = filteredResources.map((el) => {
      return formatTransactData({
        payload: el.data,
        ctx: el.data.resourceSubType,
      });
    });

    return { data };
  }

  async getFormattedData({ response, userId, ctx }) {
    // temp fix to be refactored later
    let searchCtx = ctx;
    if (ctx === 'residentialProperty' || ctx === 'commercialProperty') {
      searchCtx = 'property';
    }
    const resourceDetails = resourceDetailsFromSearch(response, searchCtx);
    this.logger.debug({ resourceDetails: resourceDetails.length }, 'extracted resourceDetailsFromSearch');

    const contacts = await this.getContactsForUser({ userId, payload: resourceDetails });
    this.logger.log({ contacts }, 'retrieved contacts');

    const prospects = await this.getProspectsForUser({ userId, payload: resourceDetails });
    this.logger.log({ prospects }, 'retrieved prospects');

    return formatSearchResponse({
      payload: response,
      contacts,
      prospects,
      ctx,
      logger: this.logger,
    });
  }
}

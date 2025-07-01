import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DatabaseEnv } from '../../config/database-env.enum';
import { asyncHandler } from '../../_app/utils/';
import { InternalServerErrorException } from '../../_app/exceptions';
import { Contacts, ContactsDocument } from '../schema/Contacts.schema';
import { ContactsSubType } from '../../leadgen/enum/contacts.quertType.enum';

@Injectable()
export class ContactsRepository {
  private readonly logger: Logger = new Logger(ContactsRepository.name);

  constructor(@InjectModel(Contacts.name, DatabaseEnv.DB_USER_CONN) private contactsModel: Model<ContactsDocument>) {}

  async getContactsList(userId, resourceType, type, limit, offset) {
    let resourceSubType;
    switch (type) {
      case 'organization':
        resourceSubType = ContactsSubType.ORGANIZATION;
        break;
      case 'connects':
        resourceSubType = ContactsSubType.CONNECTS;
        break;
      case 'properties':
        resourceSubType = ContactsSubType.PROPERTIES;
        break;
      case 'units':
        resourceSubType = ContactsSubType.UNITS;
        break;
    }
    let query = this.contactsModel.find({ userId, resourceType });

    if (resourceSubType) {
      query = query.where('resourceSubType').equals(resourceSubType);
    }

    query = query.sort({ updatedAt: -1 }).skip(offset).limit(limit);

    return query.exec();
  }

  async updateOrCreate(contact) {
    this.logger.log('updateOrCreate request');

    const { resourceId, userId } = contact;
    const [updateOrCreateResp, updateOrCreateError] = await asyncHandler(
      this.contactsModel.findOneAndUpdate({ resourceId, userId }, contact, {
        new: true,
        upsert: true, // Make this update into an upsert
      }),
    );

    if (updateOrCreateError || !updateOrCreateResp) {
      this.logger.error({ updateOrCreateError, updateOrCreateResp }, 'Error occured while updateOrCreate contact');
      throw new InternalServerErrorException('Error occured while updateOrCreate contact', {
        updateOrCreateError,
        updateOrCreateResp,
      });
    }

    return updateOrCreateResp;
  }

  async createContact(contact) {
    this.logger.log({ contact }, 'createContact request');

    const _contact = new this.contactsModel(contact);
    const [saveContactResp, saveContactError] = await asyncHandler(_contact.save());

    if (saveContactError || !saveContactResp) {
      this.logger.error({ saveContactError, saveContactResp }, 'Error occured while saving contact');
      throw new InternalServerErrorException('Error occured while saving contact', {
        saveContactError,
        saveContactResp,
      });
    }

    return saveContactResp;
  }

  async getContactsStats(userId) {
    this.logger.log('getContact request', { userId });
    const contactStats = await this.contactsModel.aggregate([
      {
        $match: { userId: userId },
      },
      {
        $group: {
          _id: '$resourceType',
          properties: { $sum: { $cond: [{ $eq: ['$resourceSubType', 'property'] }, 1, 0] } },
          units: { $sum: { $cond: [{ $eq: ['$resourceSubType', 'unit'] }, 1, 0] } },
          connects: { $sum: { $cond: [{ $eq: ['$resourceSubType', 'connect'] }, 1, 0] } },
          organization: { $sum: { $cond: [{ $eq: ['$resourceSubType', 'organization'] }, 1, 0] } },
        },
      },
      {
        $group: {
          _id: null,
          data: {
            $push: {
              k: '$_id',
              v: {
                properties: '$properties',
                units: '$units',
                connects: '$connects',
                organization: '$organization',
                all: { $add: ['$properties', '$units', '$connects', '$organization'] },
              },
            },
          },
        },
      },
      {
        $replaceRoot: {
          newRoot: { $arrayToObject: '$data' },
        },
      },
    ]);
    return contactStats?.[0];
  }

  async getContact({ userId, resourceType, resourceSubType, resourceId }, projection = {}) {
    // this.logger.log({ userId, resourceType, resourceSubType, resourceId }, 'getContact request');
    const contact = await this.contactsModel.findOne({ userId, resourceType, resourceSubType, resourceId }, projection);
    return contact;
  }

  async getContactsByQuery(userId, resourceType, resourceSubType, searchQuery, limit, offset) {
    this.logger.log('getContact request', { userId, resourceType, resourceSubType, searchQuery });
    let subType;
    switch (resourceSubType) {
      case 'organization':
        subType = ContactsSubType.ORGANIZATION;
        break;
      case 'connects':
        subType = ContactsSubType.CONNECTS;
        break;
      case 'properties':
        subType = ContactsSubType.PROPERTIES;
        break;
      case 'units':
        subType = ContactsSubType.UNITS;
        break;
    }
    const queryConditions = {
      userId: userId,
      resourceType: resourceType,
    };

    if (subType) {
      queryConditions['resourceSubType'] = subType;
    }

    const aggregationPipeline = [];
    aggregationPipeline.push({ $match: queryConditions });

    if (searchQuery) {
      const partialQuery = new RegExp(`.*${searchQuery}.*`, 'i');
      const orCondition = [{ name: partialQuery }, { email: partialQuery }, { industry: partialQuery }];
      aggregationPipeline.push({ $match: { $or: orCondition } });
    }

    const totalCountResults = await this.contactsModel.aggregate(aggregationPipeline).exec();
    const totalCount = totalCountResults.length;
    aggregationPipeline.push({ $sort: { updatedAt: -1 } });
    aggregationPipeline.push({ $skip: offset });
    aggregationPipeline.push({ $limit: limit });
    const queryResults = await this.contactsModel.aggregate(aggregationPipeline).exec();

    return { queryResults, totalCount };
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { get, isEmpty } from 'lodash';

import { ProspectsRepository } from './repository/prospects.repository';
import { ResourceNotFound } from '../_app/exceptions';

@Injectable()
export class ProspectsService {
  private readonly logger: Logger = new Logger(ProspectsService.name);

  constructor(private readonly prospectsRepository: ProspectsRepository) {}
  async getProspects({ userId, limit, skip }) {
    const data = await this.prospectsRepository.getProspects({ userId, limit, skip });

    return { message: 'retrieved prospects', data };
  }

  async createProspect(userId, createProspectDto) {
    const prospectPayload = get(createProspectDto, 'payload', []);

    const createdProspects = await Promise.all(
      prospectPayload.map(async (prospect) => {
        try {
          this.logger.log({ prospect }, 'create prospect');
          const createdProspect = await this.prospectsRepository.createProspect({ userId, ...prospect });
          return { ...createdProspect.toJSON(), isSaved: true };
        } catch (error) {
          this.logger.error(error, 'error occured while saving prospect');
          return error;
        }
      }),
    );

    const filteredProspects = createdProspects.filter((prospect) => prospect instanceof Error);
    if (!isEmpty(filteredProspects)) {
      this.logger.error({ filteredProspects }, 'Error occured filteredProspects');

      throw filteredProspects;
    }

    this.logger.log({ createdProspects }, 'Created prospects');

    return { message: 'saved prospect', data: createdProspects };
  }

  async getProspectsStats(userId) {
    const data = await this.prospectsRepository.getProspectsStats(userId);
    return { message: 'prospect stats fetched successfully', data };
  }

  async getProspectWishlist(userId: string) {
    const data = await this.prospectsRepository.getProspectsWishlist(userId);
    return { message: 'prospect wishlist fetched', data};
  }

  async deleteProspect(userId, deleteProspect) {
    const prospectPayload = get(deleteProspect, 'payload', []);
    const deletedProspects = [];
    for (const contact of prospectPayload) {
      const resourceId = get(contact, 'resourceId', '');
      try {
        this.logger.log({ contact }, 'removing contact');
        const { document } = await this.prospectsRepository.removeProspect({ userId, resourceId });
        if (document) {
          deletedProspects.push({
            name: contact.name,
            resourceId,
            resourceType: contact.resourceType,
            resourceSubType: contact.resourceSubType,
            unlockedFields: contact.unlockedFields,
          });
        }
      } catch (error) {
        this.logger.error(`Error removing prospect with resourceId ${resourceId}:`, error);
      }
    }
    this.logger.log({ deletedProspects }, 'deleted prospects');
    
    return { message: 'deleted prospect', data: deletedProspects };
  }
}

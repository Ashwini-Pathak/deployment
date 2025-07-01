import { Injectable } from '@nestjs/common';
import { ContactsRepository } from './repository/contacts.repository';
import { CommercialQueryDto, ResidentialQueryDto } from '../leadgen/dto/contact.query.dto';
import { ContactType } from '../leadgen/enum/contacts.quertType.enum';
import { ContactsDto } from './dto/constacts.dto';

@Injectable()
export class ContactsService {
  constructor(private readonly contactRepository: ContactsRepository) {}

  async getCommercialContacts(userId: string, queryParam: CommercialQueryDto) {
    const { type, limit = 10, offset = 0 } = queryParam;
    const resourceType = ContactType.COMMERCIAL;
    const contacts = await this.contactRepository.getContactsList(
      userId,
      resourceType,
      type,
      Number(limit),
      Number(offset),
    );
    return {
      message: 'contacts fetched successfully',
      data: { contacts },
    };
  }

  async getResidentialContacts(userId: string, queryParam: ResidentialQueryDto) {
    const { type, limit = 10, offset = 0 } = queryParam;
    const resourceType = ContactType.RESIDENTIAL;
    const contacts = await this.contactRepository.getContactsList(
      userId,
      resourceType,
      type,
      Number(limit),
      Number(offset),
    );
    return {
      message: 'contacts fetched successfully',
      data: { contacts },
    };
  }

  async getContactsStats(userId: string) {
    const contactsStats = await this.contactRepository.getContactsStats(userId);
    return {
      message: 'contacts stats fetched successfully',
      data: { contactsStats },
    };
  }

  async addContacts(contact: ContactsDto) {
    const contactRes = await this.contactRepository.createContact(contact);
    return {
      message: 'contact creted successfully',
      data: { contactRes },
    };
  }

  async getContactsByQuery(userId, contactsSearchDto) {
    const { resourceType, resourceSubType, searchQuery, limit = 10, offset = 0 } = contactsSearchDto;
    const contact = await this.contactRepository.getContactsByQuery(
      userId,
      resourceType,
      resourceSubType,
      searchQuery,
      limit,
      offset,
    );
    return {
      message: 'contacts fetched successfully',
      data: { contact },
    };
  }
}

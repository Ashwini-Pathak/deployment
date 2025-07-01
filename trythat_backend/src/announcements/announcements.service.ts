import { Injectable, Logger } from '@nestjs/common';
import { AnnouncementDto } from '../announcements/dto/announcement.dto';
import { AnnouncementsRepository } from './repository/announcement.repository';
import { NotFoundException } from '../_app/exceptions';

@Injectable()
export class AnnouncementsService {
  private readonly logger: Logger = new Logger(AnnouncementsService.name);

  constructor(private readonly announcementsRepository: AnnouncementsRepository) {}

  async createAnnouncement(announcementDto: AnnouncementDto) {
    this.logger.log('Creating announcement');

    const response = await this.announcementsRepository.createAnnouncement(announcementDto);

    return {
      message: 'Announcement created',
      data: response,
    };
  }

  async getAllAnnouncements() {
    this.logger.log('getting all announcements');

    const response = await this.announcementsRepository.getAnnouncements();

    return {
      message: 'Retrieved all announcements',
      data: response,
    };
  }

  async getAnnouncementById(id: string) {
    this.logger.log('getting announcement ', id);

    const found = await this.announcementsRepository.getAnnouncementById(id);
    if (!found) {
      throw new NotFoundException(`Announcement with ID ${id} not found`);
    }

    return {
      message: 'Retrieved all announcements',
      data: found,
    };
  }

  async updateAnnouncement(id: string, announcementDto: AnnouncementDto) {
    this.logger.log('updating announcement ');

    const updated = await this.announcementsRepository.updateAnnouncement(id, announcementDto);

    return {
      message: 'Retrieved all announcements',
      data: updated,
    };
  }

  async getUserAnnouncements(id: string) {
    this.logger.log({ id }, 'getAnnouncementsByUser');
    const announcements = await this.announcementsRepository.getAnnouncementsByUser(id);

    return {
      message: 'Retrieved all announcements',
      data: announcements,
    };
  }
}

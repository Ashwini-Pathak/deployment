import { Injectable, Logger } from '@nestjs/common';
import { CreatePreferenceDto } from './dto/create-preference.dto';
// import { UpdatePreferenceDto } from './dto/update-preference.dto';
import { PreferenceRepository } from './repository/preference.repository';
import { NotFoundException } from '../../_app/exceptions';
import { isEmpty } from 'lodash';
import { PreferenceTypeDto } from './dto/list-preference.dto';

@Injectable()
export class PreferencesService {
  private readonly logger: Logger = new Logger(PreferencesService.name);

  constructor(private readonly preferenceRepository: PreferenceRepository) {}
  async createPreference(userId, createPreferenceDto: CreatePreferenceDto) {
    const preferenceDetails = await this.preferenceRepository.createPreference(userId, createPreferenceDto);

    if (!preferenceDetails) {
      throw new NotFoundException('Failed to raise concern');
    }

    return {
      message: 'Preference created successfully',
      data: preferenceDetails,
    };
  }

  async findUsersByPreference(preference, userId) {
    return this.preferenceRepository.findUsersByPreference(preference, userId);
  }

  async findUserPreference(userId) {
    const userPreference = await this.preferenceRepository.findUserPreference(userId);

    if (isEmpty(userPreference)) {
      throw new NotFoundException('Failed to retrieve user preference');
    }

    return userPreference;
  }

  async getPreferenceList({ type }: PreferenceTypeDto) {
    const preferences = await this.preferenceRepository.getPreferenceList(type);

    if (isEmpty(preferences)) {
      throw new NotFoundException('Failed to retrieve preferences');
    }

    return {
      message: `${type} preferences fetched`,
      data: preferences,
    };
  }
}

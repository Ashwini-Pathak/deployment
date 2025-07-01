import { Injectable } from '@nestjs/common';
import { RaiseConcernRepository } from './repository/raiseConcern.repository';
import { NotFoundException } from '../_app/exceptions';
import { MailService } from '../mail/mail.service';

@Injectable()
export class RaiseConcernService {
  constructor(
    private readonly raiseConcernRepository: RaiseConcernRepository,
    private readonly mailService: MailService,
  ) {}

  async addConcern({ userId, path, category, description, name, email }) {
    const concernDetails = await this.raiseConcernRepository.addConcern({ userId, path, category, description });
    if (!concernDetails) {
      throw new NotFoundException('Failed to raise concern');
    }

    this.mailService.sendRaiseConcernEfc({ user: { name, id: userId }, category, description, path });
    this.mailService.sendRaiseConcernUserConfirmation({ user: { name, email } });

    return {
      message: 'Concern raised successfully',
      data: concernDetails,
    };
  }
}

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private readonly supportEmailId: string;

  constructor(
    private mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {
    this.supportEmailId = this.configService.get('SUPPORT_EMAIL_ID');
  }

  async sendUserConfirmation({ user, token }) {
    await this.mailerService.sendMail({
      to: user.email,
      from: `"Support Team" <${this.supportEmailId}>`, // override default from
      subject: 'Register for trythat ai',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: user.name,
        token,
      },
    });
  }

  async sendRaiseConcernEfc({ user, category, description, path }) {
    await this.mailerService.sendMail({
      to: this.supportEmailId,
      from: `"Support Team" <${this.supportEmailId}>`, // override default from
      subject: 'Raise a Concern',
      template: './raiseConcernEfc', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        userId: user.id,
        name: user.name,
        category,
        description,
        path,
      },
    });
  }

  async sendRaiseConcernUserConfirmation({ user }) {
    await this.mailerService.sendMail({
      to: user.email,
      from: `"Support Team" <${this.supportEmailId}>`, // override default from
      subject: 'Raise a Concern confirmation',
      template: './raiseConcernUserConfirmation', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: user.name,
      },
    });
  }

  async sendContactUs({ userId, email, name, message}) {
    await this.mailerService.sendMail({
      to: this.supportEmailId,
      from: `"Support Team" <${this.supportEmailId}>`,
      subject: 'User trying to contact you!',
      template: './contactUs',
      context: {
        userId: userId,
        name: name,
        email: email,
        message: message,
      },
    });
  }

  async sendContactUsUserConfirmation({ email, name }) {
    await this.mailerService.sendMail({
      to: email,
      from: `"Support Team" <${this.supportEmailId}>`,
      subject: 'Thank you for reaching out to us!',
      template: './contactUsUserConfirmation',
      context: {
        name: name
      },
    });
  }
}

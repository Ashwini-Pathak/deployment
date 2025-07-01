import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

import { MailService } from './mail.service';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [], // import module if not enabled globally
      useFactory: async (configService: ConfigService) => {
        return {
          transport: {
            host: configService.get('mailHost'),
            port: configService.get('mailPort'),
            auth: {
              user: configService.get('mailUser'),
              pass: configService.get('mailPassword'),
            },
            authentication: 'plain',
          },
          defaults: {
            from: `"No Reply" <${configService.get('mailFrom')}>`,
          },
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
  controllers: [],
})
export class MailModule {}

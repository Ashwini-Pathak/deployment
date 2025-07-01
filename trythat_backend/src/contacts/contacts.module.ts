import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Contacts, ContactsSchema } from './schema/Contacts.schema';
import { DatabaseEnv } from '../config/database-env.enum';
import { ContactsRepository } from './repository/contacts.repository';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Contacts.name,
          schema: ContactsSchema,
        },
      ],
      DatabaseEnv.DB_USER_CONN,
    ),
  ],
  providers: [ContactsService, ContactsRepository],
})
export class ContactsModule {}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Industry } from '../v2/industry/schemas/Industry.schema';
import { PreferenceList } from '../v2/preferences/schema/Preference-list.schema';
import { SeedHistory } from './schemas/SeedHistory.schema';
import { seedIndustries } from './industries.seed';
import { seedPreferenceList } from './preferenceList.seed';
import { DatabaseEnv } from '../config/database-env.enum';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Industry.name, DatabaseEnv.DB_USER_CONN) private readonly industryModel: Model<Industry>,
    @InjectModel('PreferenceList', DatabaseEnv.DB_USER_CONN)
    private readonly preferenceListModel: Model<PreferenceList>,
    @InjectModel('SeedHistory', DatabaseEnv.DB_USER_CONN) private readonly seedHistoryModel: Model<SeedHistory>,
  ) {}

  private async hasRunBefore(fileName: string): Promise<boolean> {
    const record = await this.seedHistoryModel.findOne({ fileName });
    return !!record;
  }

  private async markAsRun(fileName: string): Promise<void> {
    await this.seedHistoryModel.create({ fileName });
  }

  async seed() {
    const seedFiles = [
      { name: 'industries.seed.ts', fn: () => seedIndustries(this.industryModel) },
      { name: 'preferenceList.seed.ts', fn: () => seedPreferenceList(this.preferenceListModel) },
    ];

    for (const seedFile of seedFiles) {
      if (await this.hasRunBefore(seedFile.name)) {
        console.log(`${seedFile.name} has already been run, skipping.`);
        continue;
      }

      await seedFile.fn();
      await this.markAsRun(seedFile.name);
      console.log(`${seedFile.name} executed and recorded.`);
    }
  }
}

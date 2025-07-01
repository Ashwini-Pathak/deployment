import { Model } from 'mongoose';
import { Industry } from '../v2/industry/schemas/Industry.schema';

export async function seedIndustries(industryModel: Model<Industry>) {
  const industries = [
    {
      name: 'Real Estate',
    },
    {
      name: 'Banking',
    },
    {
      name: 'Architecture',
    },
    {
      name: 'interior Design',
    },
    {
      name: 'Networking',
    },
    {
      name: 'Hardware And Computers',
    },
    {
      name: 'Office Supplies',
    },
    {
      name: 'Human Services',
    },
  ];

  await industryModel.insertMany(industries);
  console.log('Industries seeding completed');
}

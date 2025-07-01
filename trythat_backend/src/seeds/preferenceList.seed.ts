import { Model } from 'mongoose';
import { PreferenceList } from '../v2/preferences/schema/Preference-list.schema';

export async function seedPreferenceList(preferenceListModel: Model<PreferenceList>) {
  const userWouldbuy = [
    {
      name: 'IT Hardware and Software',
      type: 'userWouldBuy',
    },
    {
      name: 'Office Furniture and Equipment',
      type: 'userWouldBuy',
    },
    {
      name: 'Telecommunications Equipment',
      type: 'userWouldBuy',
    },
    {
      name: 'Security Systems',
      type: 'userWouldBuy',
    },
    {
      name: 'Financial Software and Systems',
      type: 'userWouldBuy',
    },
    {
      name: 'Office Supplies',
      type: 'userWouldBuy',
    },
    {
      name: 'Data Storage Solutions',
      type: 'userWouldBuy',
    },
    {
      name: 'Training and Development',
      type: 'userWouldBuy',
    },
    {
      name: 'Marketing and Advertising',
      type: 'userWouldBuy',
    },
    {
      name: 'Consulting Services',
      type: 'userWouldBuy',
    },
    {
      name: 'Insurance Services',
      type: 'userWouldBuy',
    },
    {
      name: 'Real Estate',
      type: 'userWouldBuy',
    },
    {
      name: 'Travel and Entertainment',
      type: 'userWouldBuy',
    },
    {
      name: 'Human Resources Services',
      type: 'userWouldBuy',
    },
    {
      name: 'Research and Development',
      type: 'userWouldBuy',
    },
    {
      name: 'Supply Chain Management',
      type: 'userWouldBuy',
    },
    {
      name: 'Legal and Regulatory Compliance',
      type: 'userWouldBuy',
    },
    {
      name: 'Customer Relationship Management (CRM)',
      type: 'userWouldBuy',
    },
    {
      name: 'Health and Safety Equipment',
      type: 'userWouldBuy',
    },
    {
      name: 'Utilities and Facilities Management',
      type: 'userWouldBuy',
    },
  ];
  const userSells = [
    {
      name: 'Broker- Commercial real estate Consulting',
      type: 'userSells',
    },
    {
      name: 'Broker- Residential Real estate Consulting',
      type: 'userSells',
    },
    {
      name: 'Broker-All Type of real estate consulting including Ware house, Factory premises etc',
      type: 'userSells',
    },
    {
      name: 'Buyer- Purchase of Residential property',
      type: 'userSells',
    },
    {
      name: 'Buyer- Purchase of comercial property',
      type: 'userSells',
    },
    {
      name: 'Buyer- Investment opportunities',
      type: 'userSells',
    },
    {
      name: "Seller- 'I am interested to sell' my commercial property/s",
      type: 'userSells',
    },
    {
      name: "Seller- 'I am here to sell' my residential property/s",
      type: 'userSells',
    },
    {
      name: "Seller - 'I am interested to sell' both residential and commercial property/s",
      type: 'userSells',
    },
    {
      name: 'Co-working Operator- Intersted in - Sourcing property/s',
      type: 'userSells',
    },
    {
      name: 'Co-working Operator- Intersted in - Selling Seats/ Cabins/ Enterprises managed office deals',
      type: 'userSells',
    },
    {
      name: 'Co-Working Operator- Intersted in-Streamlining Processes and Sell faster',
      type: 'userSells',
    },
  ];
  const userTargetAudience = [
    {
      name: 'IT /ITES companies',
      type: 'userTargetAudience',
    },
    {
      name: 'BPO/KPO',
      type: 'userTargetAudience',
    },
    {
      name: 'Consulting businesses',
      type: 'userTargetAudience',
    },
    {
      name: 'Banking, Financial Services, and Insurance (BFSI)',
      type: 'userTargetAudience',
    },
    {
      name: 'Telecommunications',
      type: 'userTargetAudience',
    },
    {
      name: 'Consulting and Professional Services',
      type: 'userTargetAudience',
    },
    {
      name: 'E-commerce and Technology Startups',
      type: 'userTargetAudience',
    },
    {
      name: 'Manufacturing and Industrial',
      type: 'userTargetAudience',
    },
    {
      name: 'Real Estate and Construction',
      type: 'userTargetAudience',
    },
    {
      name: 'Healthcare and Pharmaceuticals',
      type: 'userTargetAudience',
    },
    {
      name: 'Retail and Consumer Goods',
      type: 'userTargetAudience',
    },
    {
      name: 'Government and Public Sector',
      type: 'userTargetAudience',
    },
  ];
  const dreamClients = [
    {
      name: 'Tata Consultancy Services (TCS)',
      type: 'dreamClients',
    },
    {
      name: 'Infosys Limited',
      type: 'dreamClients',
    },
    {
      name: 'Wipro Limited',
      type: 'dreamClients',
    },
    {
      name: 'HCL Technologies',
      type: 'dreamClients',
    },
    {
      name: 'Tech Mahindra',
      type: 'dreamClients',
    },
    {
      name: 'Cognizant Technology Solutions',
      type: 'dreamClients',
    },
    {
      name: 'Accenture',
      type: 'dreamClients',
    },
    {
      name: 'IBM India',
      type: 'dreamClients',
    },
    {
      name: 'Capgemini',
      type: 'dreamClients',
    },
    {
      name: 'Larsen & Toubro Infotech (LTI)',
      type: 'dreamClients',
    },
    {
      name: 'State Bank of India (SBI)',
      type: 'dreamClients',
    },
    {
      name: 'HDFC Bank',
      type: 'dreamClients',
    },
    {
      name: 'ICICI Bank',
      type: 'dreamClients',
    },
    {
      name: 'Axis Bank',
      type: 'dreamClients',
    },
    {
      name: 'Kotak Mahindra Bank',
      type: 'dreamClients',
    },
    {
      name: 'Bajaj Finance',
      type: 'dreamClients',
    },
    {
      name: 'HDFC Life Insurance',
      type: 'dreamClients',
    },
    {
      name: 'Life Insurance Corporation of India (LIC)',
      type: 'dreamClients',
    },
    {
      name: 'Birla Sun Life Insurance',
      type: 'dreamClients',
    },
    {
      name: 'SBI Life Insurance',
      type: 'dreamClients',
    },
    {
      name: 'Bharti Airtel',
      type: 'dreamClients',
    },
    {
      name: 'Reliance Jio',
      type: 'dreamClients',
    },
    {
      name: 'Vodafone Idea Limited',
      type: 'dreamClients',
    },
    {
      name: 'BSNL (Bharat Sanchar Nigam Limited)',
      type: 'dreamClients',
    },
    {
      name: 'Tata Communications',
      type: 'dreamClients',
    },
    {
      name: 'Idea Cellular',
      type: 'dreamClients',
    },
    {
      name: 'Aircel',
      type: 'dreamClients',
    },
    {
      name: 'MTNL (Mahanagar Telephone Nigam Limited)',
      type: 'dreamClients',
    },
    {
      name: 'Reliance Communications',
      type: 'dreamClients',
    },
    {
      name: 'Tata Teleservices',
      type: 'dreamClients',
    },
    {
      name: 'McKinsey & Company',
      type: 'dreamClients',
    },
    {
      name: 'Boston Consulting Group (BCG)',
      type: 'dreamClients',
    },
    {
      name: 'Bain & Company',
      type: 'dreamClients',
    },
    {
      name: 'Deloitte',
      type: 'dreamClients',
    },
    {
      name: 'PricewaterhouseCoopers (PwC)',
      type: 'dreamClients',
    },
    {
      name: 'Ernst & Young (EY)',
      type: 'dreamClients',
    },
    {
      name: 'KPMG',
      type: 'dreamClients',
    },
    {
      name: 'Accenture Consulting',
      type: 'dreamClients',
    },
    {
      name: 'Capgemini Consulting',
      type: 'dreamClients',
    },
    {
      name: 'Booz Allen Hamilton',
      type: 'dreamClients',
    },
    {
      name: 'Amazon India',
      type: 'dreamClients',
    },
    {
      name: 'Flipkart',
      type: 'dreamClients',
    },
    {
      name: 'Paytm',
      type: 'dreamClients',
    },
    {
      name: 'Ola Cabs',
      type: 'dreamClients',
    },
    {
      name: 'Swiggy',
      type: 'dreamClients',
    },
    {
      name: 'Zomato',
      type: 'dreamClients',
    },
    {
      name: "Byju's",
      type: 'dreamClients',
    },
    {
      name: 'MakeMyTrip',
      type: 'dreamClients',
    },
    {
      name: 'OYO Rooms',
      type: 'dreamClients',
    },
    {
      name: 'Policybazaar',
      type: 'dreamClients',
    },
    {
      name: 'Tata Steel',
      type: 'dreamClients',
    },
    {
      name: 'Reliance Industries Limited (RIL)',
      type: 'dreamClients',
    },
    {
      name: 'Mahindra & Mahindra',
      type: 'dreamClients',
    },
    {
      name: 'Larsen & Toubro (L&T)',
      type: 'dreamClients',
    },
    {
      name: 'Bharat Heavy Electricals Limited (BHEL)',
      type: 'dreamClients',
    },
    {
      name: 'Hindustan Unilever Limited (HUL)',
      type: 'dreamClients',
    },
    {
      name: 'Maruti Suzuki India Limited',
      type: 'dreamClients',
    },
    {
      name: 'Hero MotoCorp',
      type: 'dreamClients',
    },
    {
      name: 'Siemens India',
      type: 'dreamClients',
    },
    {
      name: 'Aditya Birla Group',
      type: 'dreamClients',
    },
    {
      name: 'DLF Limited',
      type: 'dreamClients',
    },
    {
      name: 'Godrej Properties Limited',
      type: 'dreamClients',
    },
    {
      name: 'Oberoi Realty Limited',
      type: 'dreamClients',
    },
    {
      name: 'Prestige Group',
      type: 'dreamClients',
    },
    {
      name: 'Brigade Group',
      type: 'dreamClients',
    },
    {
      name: 'Sobha Limited',
      type: 'dreamClients',
    },
    {
      name: 'Tata Housing Development Company Limited',
      type: 'dreamClients',
    },
    {
      name: 'Mahindra Lifespace Developers Limited',
      type: 'dreamClients',
    },
    {
      name: 'Lodha Group',
      type: 'dreamClients',
    },
    {
      name: 'Hiranandani Developers',
      type: 'dreamClients',
    },
    {
      name: 'Sun Pharmaceutical Industries Limited',
      type: 'dreamClients',
    },
    {
      name: "Dr. Reddy's Laboratories",
      type: 'dreamClients',
    },
    {
      name: 'Cipla Limited',
      type: 'dreamClients',
    },
    {
      name: 'Lupin Limited',
      type: 'dreamClients',
    },
    {
      name: 'Aurobindo Pharma',
      type: 'dreamClients',
    },
    {
      name: 'Biocon Limited',
      type: 'dreamClients',
    },
    {
      name: 'Cadila Healthcare',
      type: 'dreamClients',
    },
    {
      name: 'GlaxoSmithKline Pharmaceuticals Limited (GSK)',
      type: 'dreamClients',
    },
    {
      name: 'Apollo Hospitals',
      type: 'dreamClients',
    },
    {
      name: 'Fortis Healthcare',
      type: 'dreamClients',
    },
    {
      name: 'Reliance Retail',
      type: 'dreamClients',
    },
    {
      name: 'Future Group',
      type: 'dreamClients',
    },
    {
      name: 'Aditya Birla Fashion and Retail Limited',
      type: 'dreamClients',
    },
    {
      name: 'Avenue Supermarts (D-Mart)',
      type: 'dreamClients',
    },
    {
      name: 'Titan Company Limited',
      type: 'dreamClients',
    },
    {
      name: 'ITC Limited (FMCG Division)',
      type: 'dreamClients',
    },
    {
      name: 'Hindustan Unilever Limited (HUL)',
      type: 'dreamClients',
    },
    {
      name: 'Patanjali Ayurved Limited',
      type: 'dreamClients',
    },
    {
      name: 'BigBasket',
      type: 'dreamClients',
    },
    {
      name: "Spencer's Retail",
      type: 'dreamClients',
    },
    {
      name: 'Bharat Electronics Limited (BEL)',
      type: 'dreamClients',
    },
    {
      name: 'Indian Oil Corporation Limited (IOCL)',
      type: 'dreamClients',
    },
    {
      name: 'Bharat Heavy Electricals Limited (BHEL)',
      type: 'dreamClients',
    },
    {
      name: 'State Bank of India (SBI)',
      type: 'dreamClients',
    },
    {
      name: 'Life Insurance Corporation of India (LIC)',
      type: 'dreamClients',
    },
    {
      name: 'Air India',
      type: 'dreamClients',
    },
    {
      name: 'National Thermal Power Corporation Limited (NTPC)',
      type: 'dreamClients',
    },
    {
      name: 'Indian Railways',
      type: 'dreamClients',
    },
    {
      name: 'Oil and Natural Gas Corporation Limited (ONGC)',
      type: 'dreamClients',
    },
    {
      name: 'Bharat Sanchar Nigam Limited (BSNL)',
      type: 'dreamClients',
    },
  ];
  const interests = [
    {
      name: 'Reading',
      type: 'interests',
    },
    {
      name: 'Writing',
      type: 'interests',
    },
    {
      name: 'Cooking and baking',
      type: 'interests',
    },
    {
      name: 'Hiking and nature exploration',
      type: 'interests',
    },
    {
      name: 'Painting or drawing',
      type: 'interests',
    },
    {
      name: 'Photography',
      type: 'interests',
    },
    {
      name: 'Playing musical instruments',
      type: 'interests',
    },
    {
      name: 'Traveling',
      type: 'interests',
    },
    {
      name: 'Yoga and meditation',
      type: 'interests',
    },
    {
      name: 'Gardening',
      type: 'interests',
    },
    {
      name: 'DIY crafts ',
      type: 'interests',
    },
    {
      name: 'Gaming',
      type: 'interests',
    },
    {
      name: 'Fitness and exercise',
      type: 'interests',
    },
    {
      name: 'Astronomy and stargazing',
      type: 'interests',
    },
    {
      name: 'Learning new languages',
      type: 'interests',
    },
    {
      name: 'Volunteer work and community service',
      type: 'interests',
    },
    {
      name: 'Film and cinema appreciation',
      type: 'interests',
    },
    {
      name: 'History and historical reenactment',
      type: 'interests',
    },
    {
      name: 'Fashion and styling',
      type: 'interests',
    },
    {
      name: 'Podcasting and content creation',
      type: 'interests',
    },
    {
      name: 'Music appreciation (e.g., concerts, music festivals)',
      type: 'interests',
    },
    {
      name: 'Philosophy and deep conversations',
      type: 'interests',
    },
    {
      name: 'Scuba diving and snorkeling',
      type: 'interests',
    },
    {
      name: 'Sustainable living and environmental activism',
      type: 'interests',
    },
    {
      name: 'Collecting',
      type: 'interests',
    },
  ];

  const preferenceList = [...userWouldbuy, ...userSells, ...userTargetAudience, ...dreamClients, ...interests];

  await preferenceListModel.insertMany(preferenceList);
  console.log('Preference List seeding completed');
}

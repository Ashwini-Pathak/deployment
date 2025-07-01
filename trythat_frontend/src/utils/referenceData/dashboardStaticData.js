import { format, compareAsc } from 'date-fns';
const { faker } = require('@faker-js/faker');

export const getDashboardData = () => {
  const payload = {
    stats: [
      {
        cardTitle: 'Total Points',
        value: 300,
      },
      {
        cardTitle: 'Total Connects Saved',
        value: 0,
      },
      {
        cardTitle: 'Total Organizations Saved',
        value: 0,
      },
      {
        cardTitle: 'Total Properties Saved',
        value: 0,
      },
    ],
    profile: {
      completionStatus: '20%',
    },
    announcements: [
      {
        timestamp: format(faker.date.past(), 'dd-mm-yyyy'),
        title: 'New Year Offer',
        text: 'Earn 500 points and unlock 120 leads with Premium Plan',
        buttonEnabled: false,
        buttonText: 'Buy Now',
        linkTo: '/',
      },
      {
        timestamp: format(faker.date.past(), 'dd-mm-yyyy'),
        title: 'New Year Offer',
        text: 'Earn 500 points and unlock 120 leads with Premium Plan',
        buttonEnabled: true,
        buttonText: 'Buy Now',
        linkTo: '/',
      },
      {
        timestamp: format(faker.date.past(), 'dd-mm-yyyy'),
        title: 'New Year Offer',
        text: 'Earn 500 points and unlock 120 leads with Premium Plan',
        buttonEnabled: true,
        buttonText: 'Buy Now',
        linkTo: '/',
      },
      {
        timestamp: format(faker.date.past(), 'dd-mm-yyyy'),
        title: 'New Year Offer',
        text: 'Earn 500 points and unlock 120 leads with Premium Plan',
        buttonEnabled: false,
        buttonText: '',
        linkTo: '/',
      },
      {
        timestamp: format(faker.date.past(), 'dd-mm-yyyy'),
        title: 'New Year Offer',
        text: 'Earn 500 points and unlock 120 leads with Premium Plan',
        buttonEnabled: true,
        buttonText: 'Buy Now',
        linkTo: '/',
      },
    ],
    notification: [
      {
        timestamp: faker.date.anytime(),
        text: faker.word.words(15),
      },
      {
        timestamp: faker.date.anytime(),
        text: faker.word.words(15),
      },
      {
        timestamp: faker.date.anytime(),
        text: faker.word.words(15),
      },
      {
        timestamp: faker.date.anytime(),
        text: faker.word.words(15),
      },
    ],
    recommendedConnects: [
      {
        name: faker.person.fullName(),
        designation: faker.person.jobType(),
        companyName: faker.company.name(),
        contact: faker.phone.number(),
        email: faker.internet.email(),
        organizationImage: faker.image.avatar(),
        yearsOfExperience: faker.number.int({ min: 1, max: 9 }),
        serviceTags: ['Construction', 'Software'],
        keySkills: ['Commercial leasing', 'Property Management', 'Strategic Thinker'],
      },
      {
        name: faker.person.fullName(),
        designation: faker.person.jobType(),
        companyName: faker.company.name(),
        contact: faker.phone.number(),
        email: faker.internet.email(),
        organizationImage: faker.image.avatar(),
        yearsOfExperience: faker.number.int({ min: 1, max: 9 }),
        serviceTags: ['Construction', 'Software'],
        keySkills: ['Commercial leasing', 'Property Management', 'Strategic Thinker'],
      },
      {
        name: faker.person.fullName(),
        designation: faker.person.jobType(),
        companyName: faker.company.name(),
        contact: faker.phone.number(),
        email: faker.internet.email(),
        organizationImage: faker.image.avatar(),
        yearsOfExperience: faker.number.int({ min: 1, max: 9 }),
        serviceTags: ['Construction', 'Software'],
        keySkills: ['Commercial leasing', 'Property Management', 'Strategic Thinker'],
      },
      {
        name: faker.person.fullName(),
        designation: faker.person.jobType(),
        companyName: faker.company.name(),
        contact: faker.phone.number(),
        email: faker.internet.email(),
        organizationImage: faker.image.avatar(),
        yearsOfExperience: faker.number.int({ min: 1, max: 9 }),
        serviceTags: ['Construction', 'Software'],
        keySkills: ['Commercial leasing', 'Property Management', 'Strategic Thinker'],
      },
      {
        name: faker.person.fullName(),
        designation: faker.person.jobType(),
        companyName: faker.company.name(),
        contact: faker.phone.number(),
        email: faker.internet.email(),
        organizationImage: faker.image.avatar(),
        yearsOfExperience: faker.number.int({ min: 1, max: 9 }),
        serviceTags: ['Construction', 'Software'],
        keySkills: ['Commercial leasing', 'Property Management', 'Strategic Thinker'],
      },
    ],
  };
  return payload;
};

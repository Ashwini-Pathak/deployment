import LeadGenLogo from '../../assets/LeadGen.png';
import CRMLogo from '../../assets/CRM.png';
import sheetLogo from '../../assets/images/sheet.png';
import okr from '../../assets/images/okr.png';
import group from '../../assets/images/Group.png';
import financeLogo from '../../assets/images/finance.png';
import { format } from 'date-fns';
const { faker } = require('@faker-js/faker');

export const getUserMockData = () => {
  const payload = {
    profile: {
      name: faker.person.firstName,
      userImage: faker.image.url(),
      totalPoints: faker.number.int(3000),
    },
  };
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(payload);
    }, 2000);
  });
};

export const getUserPlanOfferingsData = () => {
  const payload = {
    planOfferings: [
      {
        imgUrl: LeadGenLogo,
        label: 'Lead Generations',
        enabled: true,
        border: '1px solid #0080FC',
        route: '/leadgen/dashboard',
      },
      {
        imgUrl: CRMLogo,
        label: 'CRM Tool',
        enabled: true,
        border: '1px solid #C497F4',
      },
      {
        imgUrl: okr,
        label: 'EasyOKR',
        border: '1px solid #F9A824',
        descColor: '#F9A824',
      },
      {
        imgUrl: group,
        label: 'FMS',
        enabled: true,
        border: '1px solid #16D33A',
        descColor: '#16D33A',
      },
    ],
  };
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(payload);
    }, 300);
  });
};

export const getAnnouncementsData = () => {
  const payload = {
    announcements: [
      {
        timestamp: format(faker.date.past(), 'dd-mm-yyyy'),
        title: 'New Year Offer!',
        text: 'Earn 500 points and unlock 120 leads with Premium Plan',
        buttonEnabled: true,
        buttonText: 'Buy Now',
        linkTo: '/',
        background: 'linear-gradient(180deg, #ACCAFE 0%, #2F6DDB 100%)',
      },
      {
        timestamp: format(faker.date.past(), 'dd-mm-yyyy'),
        title: 'New Year Offer',
        text: 'Earn 500 points and unlock 120 leads with Premium Plan',
        buttonEnabled: true,
        buttonText: 'Buy Now',
        linkTo: '/',
        background: 'linear-gradient(180deg, #B4E5EC 0%, #45BED0 100%)',
      },
      // {
      //   timestamp: format(faker.date.past(), "dd-mm-yyyy"),
      //   title: "New Year Offer",
      //   text: "Earn 500 points and unlock 120 leads with Premium Plan",
      //   buttonEnabled: true,
      //   buttonText: "Buy Now",
      //   linkTo: "/",
      //   background: 'linear-gradient(180deg, #ACCAFE 0%, #2F6DDB 100%)'
      // },
      // {
      //   timestamp: format(faker.date.past(), "dd-mm-yyyy"),
      //   title: "New Year Offer",
      //   text: "Earn 500 points and unlock 120 leads with Premium Plan",
      //   buttonEnabled: false,
      //   buttonText: "",
      //   linkTo: "/",
      //   background: 'linear-gradient(180deg, #ACCAFE 0%, #2F6DDB 100%)'
      // },
      // {
      //   timestamp: format(faker.date.past(), "dd-mm-yyyy"),
      //   title: "New Year Offer",
      //   text: "Earn 500 points and unlock 120 leads with Premium Plan",
      //   buttonEnabled: true,
      //   buttonText: "Buy Now",
      //   linkTo: "/",
      //   background: 'linear-gradient(180deg, #ACCAFE 0%, #2F6DDB 100%)'
      // },
    ],
  };
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(payload);
    }, 2000);
  });
};

export const getRecentActivitiesData = () => {
  const payload = {
    recentActivities: [
      {
        imgUrl: LeadGenLogo,
        count: 10,
        enabled: true,
      },
      {
        imgUrl: CRMLogo,
        label: 'CRM Tool',
        enabled: true,
      },
    ],
  };
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(payload);
    }, 2000);
  });
};

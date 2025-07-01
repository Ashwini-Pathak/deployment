const { faker } = require('@faker-js/faker');

export const getContactDataByKey = (key) => {
  let tableData = {};
  switch (key) {
    case '1': {
      const tableHeaders = [
        { display: 'Name', key: 'name' },
        { display: 'Mobile No', key: 'mobileNumber' },
        { display: 'E-Mail', key: 'email' },
        { display: 'Industry', key: 'industry' },
        { display: 'Type', key: 'typeOfContact' },
        { display: 'Actions', key: 'action' },
      ];

      const tableRows = [];
      for (let i = 0; i < 50; i++) {
        const recentlyAddedFakeData = {
          name: faker.person.fullName(),
          mobileNumber: faker.phone.number(),
          email: faker.internet.email(),
          industry: faker.company.catchPhraseAdjective(),
          typeOfContact: faker.helpers.arrayElement(['Customer', 'Vendor', 'Partner']),
          action: faker.datatype.boolean(),
        };
        tableRows.push(recentlyAddedFakeData);
      }
      tableData = {
        tableHeaders,
        tableRows,
      };
      break;
    }
    case '2': {
      const tableHeaders = [
        { display: 'Name', key: 'name' },
        { display: 'Mobile No', key: 'mobileNumber' },
        { display: 'E-Mail', key: 'email' },
        { display: 'Industry', key: 'industry' },
        { display: 'Type', key: 'typeOfContact' },
        { display: 'Actions', key: 'action' },
      ];

      const tableRows = [];
      for (let i = 0; i < 10; i++) {
        const allFakeData = {
          name: faker.person.fullName(),
          mobileNumber: faker.phone.number(),
          email: faker.internet.email(),
          industry: faker.company.catchPhraseAdjective(),
          typeOfContact: faker.helpers.arrayElement(['Customer', 'Vendor', 'Partner']),
          action: faker.datatype.boolean(),
        };
        tableRows.push(allFakeData);
      }
      tableData = {
        tableHeaders,
        tableRows,
      };
      break;
    }
    case '3': {
      const tableHeaders = [
        { display: 'Name', key: 'name' },
        { display: 'Mobile No', key: 'mobileNumber' },
        { display: 'E-Mail', key: 'email' },
        { display: 'Industry', key: 'industry' },
        { display: 'Registered Date', key: 'registeredDate' },
        { display: 'Actions', key: 'action' },
      ];

      const tableRows = [];
      for (let i = 0; i < 100; i++) {
        const connectFakeData = {
          name: faker.person.fullName(),
          mobileNumber: faker.phone.number(),
          email: faker.internet.email(),
          industry: faker.company.catchPhraseAdjective(),
          registeredDate: faker.date.past().toLocaleDateString(),
          action: faker.datatype.boolean(),
        };
        tableRows.push(connectFakeData);
      }
      tableData = {
        tableHeaders,
        tableRows,
      };
      break;
    }
    case '4': {
      const tableHeaders = [
        { display: 'Organization Name', key: 'organizationName' },
        { display: 'Contact No.', key: 'contactNumber' },
        { display: 'E-Mail', key: 'email' },
        { display: 'Industry', key: 'industry' },
        { display: 'Location', key: 'location' },
        { display: 'Actions', key: 'action' },
      ];

      const tableRows = [];
      for (let i = 0; i < 30; i++) {
        const organisationsFakeData = {
          organizationName: faker.company.name(),
          contactNumber: faker.phone.number(),
          email: faker.internet.email(),
          industry: faker.company.catchPhraseAdjective(),
          location: faker.location.city(),
          action: faker.datatype.boolean(),
        };
        tableRows.push(organisationsFakeData);
      }
      tableData = {
        tableHeaders,
        tableRows,
      };
      break;
    }
    case '5': {
      const tableHeaders = [
        { display: 'Organization Name', key: 'organizationName' },
        { display: 'Contact No.', key: 'contactNumber' },
        { display: 'E-Mail', key: 'email' },
        { display: 'Industry', key: 'industry' },
        { display: 'Location', key: 'location' },
        { display: 'Actions', key: 'action' },
      ];

      const tableRows = [];
      for (let i = 0; i < 10; i++) {
        const propertiesFakeData = {
          organizationName: faker.company.name(),
          contactNumber: faker.phone.number(),
          email: faker.internet.email(),
          industry: faker.company.catchPhraseAdjective(),
          location: faker.location.city(),
          action: faker.datatype.boolean(),
        };
        tableRows.push(propertiesFakeData);
      }
      tableData = {
        tableHeaders,
        tableRows,
      };
      break;
    }
    case '6': {
      const tableHeaders = [
        { display: 'Name', key: 'name' },
        { display: 'Mobile No', key: 'mobileNumber' },
        { display: 'E-Mail', key: 'email' },
        { display: 'Industry', key: 'industry' },
        { display: 'Registered Date', key: 'registeredDate' },
        { display: 'Actions', key: 'action' },
      ];

      const tableRows = [];
      for (let i = 0; i < 100; i++) {
        const connectFakeData = {
          name: faker.person.fullName(),
          mobileNumber: faker.phone.number(),
          email: faker.internet.email(),
          industry: faker.company.catchPhraseAdjective(),
          registeredDate: faker.date.past().toLocaleDateString(),
          action: faker.datatype.boolean(),
        };
        tableRows.push(connectFakeData);
      }
      tableData = {
        tableHeaders,
        tableRows,
      };
      break;
    }
    case '7': {
      const tableHeaders = [
        { display: 'Name', key: 'name' },
        { display: 'Mobile No', key: 'mobileNumber' },
        { display: 'E-Mail', key: 'email' },
        { display: 'Industry', key: 'industry' },
        { display: 'Registered Date', key: 'registeredDate' },
        { display: 'Actions', key: 'action' },
      ];

      const tableRows = [];
      for (let i = 0; i < 100; i++) {
        const connectFakeData = {
          name: faker.person.fullName(),
          mobileNumber: faker.phone.number(),
          email: faker.internet.email(),
          industry: faker.company.catchPhraseAdjective(),
          registeredDate: faker.date.past().toLocaleDateString(),
          action: faker.datatype.boolean(),
        };
        tableRows.push(connectFakeData);
      }
      tableData = {
        tableHeaders,
        tableRows,
      };
      break;
    }
    default:
      return;
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tableData);
    }, 2000);
  });
};

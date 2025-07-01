const { faker } = require("@faker-js/faker");

export const getUserProfileMockData = () => {
   const payload = {
     
      profile: {
         name: faker.person.firstName,
         mobile : faker.string.numeric(10),
         email : faker.internet.email(),
         aadharNumber : faker.string.numeric(12),
         PanNumber : faker.string.alphanumeric({casing: "upper", length: { min: 10, max: 10 }}),
         totalPoints : faker.number.int(3000)
      }
   };
   return new Promise((resolve) => {
      setTimeout(() => {
         resolve(payload);
      }, 2000);
   });
};

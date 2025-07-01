import { User } from '../schemas/User.schema';

export function calculateProfileCompletion(user: User) {
  const registration = 100;
  const personalDetails = calculatePersonalDetailsCompletion(user);
  const professionalDetails = calculateProfessionalDetailsCompletion(user);
  const geoLocation = calculateGeoLocationCompletion(user);
  const offerings = calculateOfferingsCompletion(user);
  const preferences = calculatePreferencesCompletion(user);

  const overallCompletion = Math.floor(
    (registration + personalDetails + professionalDetails + geoLocation + offerings + preferences) / 6,
  );

  return {
    registration,
    personalDetails,
    professionalDetails,
    geoLocation,
    offerings,
    preferences,
    overallCompletion,
  };
}

function calculatePersonalDetailsCompletion(user: User): number {
  const requiredFields = ['name', 'phone', 'personalEmail', 'aadharNumber', 'panNumber'];

  if (!user?.personalDetails) {
    return 0;
  }
  const filledFields = requiredFields.filter((field) => !!user?.personalDetails[field]);

  const completionPercentage = (filledFields.length / requiredFields.length) * 100;
  return Math.floor(completionPercentage);
}

function calculateProfessionalDetailsCompletion(user: User): number {
  const requiredFields = ['companyName', 'companyEmailId', 'designation', 'experience', 'industry', 'keySkills'];

  if (!user?.professionalDetails) {
    return 0;
  }
  const filledFields = requiredFields.filter((field) => !!user?.professionalDetails[field]);

  const completionPercentage = (filledFields.length / requiredFields.length) * 100;
  return Math.floor(completionPercentage);
}

function calculateGeoLocationCompletion(user: User): number {
  const requiredFields = ['latitude', 'longitude', 'location'];

  if (!user?.geoLocation) {
    return 0;
  }
  const filledFields = requiredFields.filter((field) => !!user?.geoLocation[field]);

  const completionPercentage = (filledFields.length / requiredFields.length) * 100;

  return Math.floor(completionPercentage);
}

function calculateOfferingsCompletion(user: User): number {
  if (user?.offerings?.broker || user?.offerings?.coworking || user?.offerings?.buyer || user?.offerings?.seller) {
    return 100;
  }
  return 0;
}

function calculatePreferencesCompletion(user: User): number {
  const requiredFields = ['userSells', 'userTargetAudience', 'userWouldBuy'];

  if (!user?.preferences) {
    return 0;
  }
  const filledFields = requiredFields.filter((field) => !!user?.preferences[field]);

  const completionPercentage = (filledFields.length / requiredFields.length) * 100;

  return Math.floor(completionPercentage);
}

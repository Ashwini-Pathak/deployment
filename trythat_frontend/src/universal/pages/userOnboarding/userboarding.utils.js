import {
  userOnboardingAddOfferings,
  userOnboardingAddPreferences,
  userOnboardingAssociateCompany,
  userOnboardingCreateCompany,
  userOnboardingUpdateOfferings,
} from '../../features/userOnboardingSlice';

export const STEPS_MAP = Object.freeze({
  0: 'companyDetails',
  1: 'professionalDetails',
  2: 'offerings',
  3: 'preferences',
  4: 'currentPlanDetails',
});

// --------V1 CALLS--------
export const getOfferingsIAmABodyV1 = (e) => {
  switch (e?.iAmI) {
    case 'broker':
      return {
        broker: {
          purpose: e?.broker_expertise,
          propertyType: e?.broker_property_type,
          location: e?.broker_location,
          openToBrokers: e?.broker_open_to_broker,
        },
      };
    case 'seller':
      return {
        seller: [
          {
            purpose: e?.seller_iAmHereTo,
            propertyType: e?.seller_property_type,
            location: e?.seller_location,
            openToBrokers: e?.seller_open_to_broker,
          },
        ],
      };
    case 'buyer':
      return {
        buyer: {
          purpose: e?.buyer_lookingFor,
          propertyType: e?.buyer_propertyType,
          location: e?.buyer_location,
          openToBrokers: e?.buyer_open_to_broker,
          requirements: e?.buyer_requirements,
          budgetRange: {
            min: e?.buyer_budgetRange_lower_limit,
            max: e?.buyer_budgetRange_upper_limit,
          },
        },
      };

    case 'coworking':
      return {
        coworking: [
          {
            availability: e?.coworking_availability,
            expectation: e?.coworking_expectaion,
            location: e?.coworking_location,
            openToBrokers: e?.coworking_openToBrokers,
          },
        ],
      };
  }
};
export const getPayloadTemplateV1 = ({
  e,
  current,
  allCompanyList,
  allIndustriesList,
  userOnboardingData,
  createCompany,
}) => {
  switch (STEPS_MAP?.[current]) {
    case 'companyDetails':
      return {
        pageName: 'professionalDetails',
        body: {
          companyName: createCompany
            ? e?.addCompanyName
            : allCompanyList?.find((elem) => elem?.value == e?.companyName)?.label,
          industry: allIndustriesList?.find((elem) => elem?.value == (createCompany ? e?.addIndustryName : e?.industry))
            ?.label,
          companyEmailId: e?.representativeEmail || userOnboardingData?.email,
          designation: e?.designation || userOnboardingData?.professionalDetails?.designation,
          experience: e.yearsOfExperience || userOnboardingData?.professionalDetails?.experience,
          keySkills: e.keySkills || userOnboardingData?.professionalDetails?.keySkills,
        },
      };
    case 'professionalDetails':
      return {
        pageName: 'professionalDetails',
        body: {
          companyName:
            allCompanyList?.find((elem) => elem?.value == e?.companyName)?.label ||
            userOnboardingData?.professionalDetails?.companyName,
          industry:
            allIndustriesList?.find((elem) => elem?.value == e?.industry)?.label ||
            userOnboardingData?.professionalDetails?.industry,
          companyEmailId: e?.representativeEmail || userOnboardingData?.email,
          designation: e?.designation || userOnboardingData?.professionalDetails?.designation,
          experience: e.yearsOfExperience || userOnboardingData?.professionalDetails?.experience,
          keySkills: e.keySkills || userOnboardingData?.professionalDetails?.keySkills,
        },
      };
    case 'offerings':
      return {
        pageName: 'offerings',
        body: getOfferingsIAmABodyV1(e),
      };
    case 'preferences':
      return {
        pageName: 'preferences',
        body: {
          userSells: e?.preference_userSells,
          userTargetAudience: e?.preference_userTargetAudience,
          userWouldBuy: e?.preference_userWouldBuy,
        },
      };
  }
};

export const getCrmPayload = (e) => {
  return {
    orgName: e?.professionalDetails?.companyName,
    name: e?.personalDetails?.name,
    email: e?.professionalDetails?.companyEmailId,
    phone: e?.phone,
    industryType: e?.industryType,
    role: e?.role,
  };
};
export const getFmsPayload = (e) => {
  return {
    name: e?.personalDetails?.name,
    email: e?.professionalDetails?.companyEmailId,
    phone: e?.phone,
  };
};

export const getOkrPayload = (e) => {
  return {
    name: e?.personalDetails?.name,
    email: e?.professionalDetails?.companyEmailId,
  };
};
// ----------V1 CALLS-------

// ----------------V2 Calls------------
export const getOfferingsIAmABodyV2 = (e, selectedIAmI) => {
  const openToBroker = (openToBroker) => {
    return openToBroker?.[0]?.toLowerCase() == 'yes' ? true : false;
  };
  const offeringPayloadMap = {
    broker: {
      purpose: e?.broker_expertise,
      propertyType: e?.broker_property_type,
      location: e?.broker_location?.map((elem) => elem?.label),
      openToBroker: openToBroker(e?.broker_open_to_broker),
    },
    seller: {
      purpose: e?.seller_iAmHereTo,
      propertyType: e?.seller_property_type,
      location: e?.seller_location?.map((elem) => elem?.label),
      openToBroker: openToBroker(e?.seller_open_to_broker),
    },
    buyer: {
      purpose: e?.buyer_lookingFor,
      propertyType: e?.buyer_propertyType,
      location: e?.buyer_location?.map((elem) => elem?.label),
      openToBroker: openToBroker(e?.buyer_open_to_broker),
      requirements: e?.buyer_requirements,
      budgetRange: {
        min: parseInt(e?.buyer_budgetRange_lower_limit) || 0,
        max: parseInt(e?.buyer_budgetRange_upper_limit) || 0,
      },
    },
    coworking: {
      availability: parseInt(e?.coworking_availability),
      expectation: parseInt(e?.coworking_expectaion),
      location: e?.coworking_location?.map((elem) => elem?.label),
      openToBroker: openToBroker(e?.coworking_openToBrokers),
    },
  };
  return offeringPayloadMap?.[selectedIAmI];
};

export const getPayloadTemplateV2 = ({ e, current, selectedIAmI, createCompany, dataupdationIds }) => {
  const stepAPIMapping = {
    companyDetails: createCompany
      ? userOnboardingCreateCompany({
          name: e?.addCompanyName,
          type: e?.addIndustryName,
          cin: e?.CIN,
          website: e?.websiteLink,
          address: {
            addressLine1: e?.address,
            locality: e?.locality,
            city: e?.city,
            state: e?.state,
            pin: parseInt(e?.pinCode),
          },
        })
      : userOnboardingAssociateCompany({ companyId: e?.companyName, industryId: e?.industry }),
    offerings: dataupdationIds?.[selectedIAmI]
      ? userOnboardingUpdateOfferings({
          payload: getOfferingsIAmABodyV2(e, selectedIAmI),
          type: selectedIAmI,
          typeId: dataupdationIds?.[selectedIAmI],
        })
      : userOnboardingAddOfferings({ payload: getOfferingsIAmABodyV2(e, selectedIAmI), type: selectedIAmI }),
    preferences: userOnboardingAddPreferences({
      userSells: e?.preference_userSells,
      userTargetAudience: e?.preference_userTargetAudience,
      userWouldBuy: e?.preference_userWouldBuy,
      dreamClients: [],
      interest: [],
    }),
  };

  return stepAPIMapping?.[STEPS_MAP?.[current]];
};

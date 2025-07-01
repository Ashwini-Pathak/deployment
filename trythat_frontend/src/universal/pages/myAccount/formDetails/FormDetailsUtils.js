import { userOnboardingAddOfferings } from '../../../features/userOnboardingSlice';

export const STEPS_MAP = Object.freeze({
  0: 'companyDetails',
  1: 'professionalDetails',
  2: 'offerings',
  3: 'preferences',
  4: 'currentPlanDetails',
});

// ---------Getting data on submitting ( seller and coworking) V1-----------
export const getFormSubmitOfferingsBody = (e, selectedIAmI, user) => {
  switch (selectedIAmI) {
    case 'broker':
      return {
        pageName: 'offerings',
        body: {
          ...(user?.offerings || []),
          broker: {
            purpose: e?.broker_expertise,
            propertyType: e?.broker_property_type,
            location: e?.broker_location,
            openToBrokers: e?.broker_open_to_broker,
          },
        },
      };
    case 'buyer':
      return {
        pageName: 'offerings',
        body: {
          ...(user?.offerings || []),
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
        },
      };
    case 'seller':
      let sellerBody = [];
      if (user?.offerings?.seller) {
        sellerBody = [
          ...(user?.offerings?.seller || []),
          {
            purpose: e?.seller_iAmHereTo,
            propertyType: e?.seller_property_type,
            location: e?.seller_location,
            openToBrokers: e?.seller_open_to_broker,
          },
        ];
      } else {
        sellerBody = [
          {
            purpose: e?.seller_iAmHereTo,
            propertyType: e?.seller_property_type,
            location: e?.seller_location,
            openToBrokers: e?.seller_open_to_broker,
          },
        ];
      }
      return {
        pageName: 'offerings',
        body: {
          ...user?.offerings,
          seller: sellerBody,
        },
      };
    case 'coworking':
      let coWorkingBody = [];
      if (user?.offerings?.coworking) {
        coWorkingBody = [
          ...(user?.offerings?.coworking || []),
          {
            availability: e?.coworking_availability,
            expectation: e?.coworking_expectaion,
            location: e?.coworking_location,
            openToBrokers: e?.coworking_openToBrokers,
          },
        ];
      } else {
        coWorkingBody = [
          {
            availability: e?.coworking_availability,
            expectation: e?.coworking_expectaion,
            location: e?.coworking_location,
            openToBrokers: e?.coworking_openToBrokers,
          },
        ];
      }
      return {
        pageName: 'offerings',
        body: {
          ...user?.offerings,
          coworking: coWorkingBody,
        },
      };
  }
};

// ---------Getting data on change V1 ( buyer and broker)-----------

export const getFormFieldsChangeOfferingsBody = (e, selectedIAmI, user) => {
  switch (selectedIAmI) {
    case 'broker':
      return {
        pageName: 'offerings',
        body: {
          ...(user?.offerings || []),
          broker: {
            purpose: e?.broker_expertise,
            propertyType: e?.broker_property_type,
            location: e?.broker_location,
            openToBrokers: e?.broker_open_to_broker,
          },
        },
      };
    case 'buyer':
      return {
        pageName: 'offerings',
        body: {
          ...(user?.offerings || []),
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
        },
      };
  }
};

// ----------------V2 Calls------------
export const getOfferingsIAmABodyV2 = (e, type) => {
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
        min: parseInt(e?.buyer_budgetRange_lower_limit),
        max: parseInt(e?.buyer_budgetRange_upper_limit),
      },
    },
    coworking: {
      availability: parseInt(e?.coworking_availability),
      expectation: parseInt(e?.coworking_expectaion),
      location: e?.coworking_location?.map((elem) => elem?.label),
      openToBroker: openToBroker(e?.coworking_openToBrokers),
    },
  };
  return offeringPayloadMap?.[type];
};

// setting offering data on change
export const formDetailsSetOfferingData = ({ values, selectedIAmI }) => {
  return userOnboardingAddOfferings({ payload: getOfferingsIAmABodyV2(values, selectedIAmI), type: selectedIAmI });
};

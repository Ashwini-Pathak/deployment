import { client, clientV2 } from '../../utils/apiClient';
import { asyncHandler } from '../../utils/asyncHandler';

export const fetchUserOnboardingDataAPI = async (userId) => {
  try {
    const response = await client.get(`/user/${userId}`);
    return response.data.response;
  } catch (error) {
    console.error(error);
  }
};

export const postOnboardingData = async (param, userId) => {
  try {
    const response = await client.post(`/user/${userId}/profile-details?type=${param?.pageName}`, param?.body);
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const fetchUserPoints = async (userId) => {
  try {
    const response = await client.get(`/user/${userId}/points`);
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const registerCrm = async (payload, userId) => {
  try {
    const response = await client.post(`/onboarding/${userId}/register-crm`, payload);
    return response;
  } catch (err) {
    console.error(err);
  }
};
export const registerFms = async (payload, userId) => {
  try {
    const response = await client.post(`/onboarding/${userId}/register-fms`, payload);
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const registerOkr = async (payload, userId) => {
  try {
    const response = await client.post(`/onboarding/${userId}/register-okr`, payload);
    return response;
  } catch (err) {
    console.error(err);
  }
};
// --------------V2--------------------
// Create company
export const createCompany = async (userId, payload) => {
  const [data, err] = await asyncHandler(clientV2.post(`user/${userId}/company`, payload));
  if (err) return err;
  return data;
};
// associate company

export const associateCompany = async (userId, companyId, payload) => {
  try {
    const response = await clientV2.post(`user/${userId}/associate-company/${companyId}`, payload, {
      authorization: true,
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};
// get company details
export const getCompanyDetail = async (companyId, userId) => {
  try {
    const response = await clientV2.get(`user/${userId}/company/${companyId}`, {
      authorization: true,
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};
// get company follow details
export const getCompanyFollowDetails = async (payload, userId) => {
  try {
    const response = await clientV2.get(`user/${userId}/follow/stats?ownerId=${payload?.ownerId}&type=company_post`, {
      authorization: true,
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};
// get all companies
export const getAllCompanyDetails = async (userId) => {
  try {
    const response = await clientV2.get(`user/${userId}/company`, {
      authorization: true,
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};
// get all industries
export const getAllIndustriesDetails = async (userId) => {
  try {
    const response = await clientV2.get(`user/${userId}/industry`, {
      authorization: true,
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};
// get all industries
export const getIndustryDetails = async (userId, industryId) => {
  try {
    const response = await clientV2.get(`user/${userId}/industry/${industryId}`, {
      authorization: true,
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};
// ---------Offering----------
// add offering data
export const addOfferingDetails = async (userId, payload, type) => {
  try {
    const response = await clientV2.post(`/user/${userId}/offerings/${type}`, payload, {
      authorization: true,
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};
// update offering data
export const updateOfferingDetails = async (userId, payload, type, typeId) => {
  try {
    const response = await clientV2.put(`/user/${userId}/offerings/${type}/${typeId}`, payload, {
      authorization: true,
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};
// get offering details
export const getOfferingData = async (userId, type) => {
  try {
    const response = await clientV2.get(`/user/${userId}/offerings/${type}`, {
      authorization: true,
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};
// ---------Offering----------

// ---------Preferences----------

// add preferneces data
export const addUserPreferences = async (userId, payload) => {
  try {
    const response = await clientV2.post(`/user/${userId}/preferences`, payload, {
      authorization: true,
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};
// get preferneces details
export const getUserPreferences = async (userId) => {
  try {
    const response = await clientV2.get(`/user/${userId}/preferences`, {
      authorization: true,
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};
// get preferneces list

export const getUserPreferenceList = async (userId, preferenceType) => {
  try {
    const response = await clientV2.get(`/user/${userId}/preferences/list?type=${preferenceType}`, {
      authorization: true,
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};

// ---------Select Plan----------
// add select Plan
export const postSelectPlanData = async (payload, userId) => {
  try {
    const response = await client.post(`/onboarding/contact-us/${userId}`, payload, {
      authorization: true,
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};

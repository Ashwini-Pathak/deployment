import { client, clientV2, docClient } from '../../utils/apiClient/index.js';
import { asyncHandler } from '../../utils/asyncHandler/index.js';

const getUserProfile = async (userId) => {
  const [data, err] = await asyncHandler(client.get(`/user/${userId}`));
  if (err) return err;
  return data;
};
const getUserProfileV2 = async (userId) => {
  const [data, err] = await asyncHandler(clientV2.get(`/user/${userId}`));
  if (err) return err;
  return data;
};

const getUserProfileCompletion = async (userId) => {
  const [data, err] = await asyncHandler(client.get(`/user/${userId}/completion`));
  if (err) return err;
  return data;
};

const updateUserProfile = async (param, userId) => {
  const [personalDetails, personalDetailsErr] = await asyncHandler(
    client.post(`/user/${userId}/profile-details?type=${param?.[0]?.pageName}`, param?.[0]?.body),
  );

  if (personalDetailsErr) return personalDetailsErr;

  const [professionalDetails, professionalDetailsErr] = await asyncHandler(
    client.post(`/user/${userId}/profile-details?type=${param?.[1]?.pageName}`, param?.[1]?.body),
  );

  if (professionalDetailsErr) return professionalDetailsErr;

  const data = { ...personalDetails, data: { ...personalDetails?.data, response: { ...personalDetails?.data?.response, data: { ...personalDetails?.data?.response?.data, professionalDetails: professionalDetails?.data?.response?.data?.professionalDetails } } } }
  return data;
};

const postOnboardingData = async (param, userId) => {
  try {
    const response = await client.post(`/user/${userId}/profile-details?type=${param?.pageName}`, param?.body);
    return response;
  } catch (err) {
    console.error(err);
  }
};

const uploadUserImage = async (param, userId) => {
  try {
    const response = await docClient.post(`/user/${userId}/image`, param);
    return response;
  } catch (err) {
    console.error(err);
  }
};

const sendOtp = async (param, userId) => {
  const [data, err] = await asyncHandler(client.post(`/user/${userId}/otp/send`, param));
  if (err) return err;
  return data;
};

const verifyOtp = async (param, userId) => {
  const [data, err] = await asyncHandler(client.post(`/user/${userId}/otp/verify`, param));
  if (err) return err;
  return data;
};
const getTransactionDetails = async (param, userId) => {
  const [data, err] = await asyncHandler(
    client.get(`leadgen/user/${userId}/transactions?limit=${param?.limit}&offset=${param?.offset}`),
  );
  if (err) return err;
  return data;
};

// fetch paynment details call
const fetchPaymentDetails = async (payload, userId) => {
  const [data, err] = await asyncHandler(
    client.post(`payment/user/${userId}/transaction_details`, payload, { authorization: true }),
  );
  if (err) return err;
  return data;
};

export {
  getUserProfile,
  updateUserProfile,
  postOnboardingData,
  getUserProfileCompletion,
  uploadUserImage,
  sendOtp,
  verifyOtp,
  getTransactionDetails,
  fetchPaymentDetails,
  getUserProfileV2,
};

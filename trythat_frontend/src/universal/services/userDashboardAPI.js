import { getAnnouncementsData, getUserPlanOfferingsData } from '../../utils/referenceData/userDashboard';
import { client } from '../../utils/apiClient';
import { asyncHandler } from '../../utils/asyncHandler';

const getUserData = async (id) => {
  // const response = await api.get(`/getSearchData`);
  // return response.data;
  return {};
};

const getUserPlanOfferings = async (id) => {
  // const response = await api.get(`/getSearchData`);
  // return response.data;
  return await getUserPlanOfferingsData();
};

const getAnnouncements = async (userId) => {
  const [data, err] = await asyncHandler(client.get(`/user/${userId}/announcements`));
  if (err) return err;
  return data;
};

const fetchCurrentLocation = async (param) => {
  const [data, err] = await asyncHandler(client.post(`/user/${param.userId}/geo-location`, param.body));
  if (err) return err;
  return data;
};

const postUserLocationAPI = async (param, userId) => {
  const [data, err] = await asyncHandler(client.post(`/user/${userId}/profile-details?type=geoLocation`, param));
  if (err) return err;
  return data;
};

const fetchRecentActivities = async (userId) => {
  const [data, err] = await asyncHandler(client.get(`/user/${userId}/activity`));
  if (err) return err;
  return data;
};

const fetchCRMUrl = async (userId, body) => {
  const [data, err] = await asyncHandler(client.post(`/user/${userId}/crm`, body));
  if (err) return err;
  return data;
};

const fetchFMSUrl = async (userId, body) => {
  const [data, err] = await asyncHandler(client.post(`/user/${userId}/fms`, body));
  if (err) return err;
  return data;
};

const fetchOKRUrl = async (userId, body) => {
  const [data, err] = await asyncHandler(client.post(`/user/${userId}/okr`, body));
  if (err) return err;
  return data;
};

export {
  getUserData,
  getUserPlanOfferings,
  getAnnouncements,
  fetchCurrentLocation,
  postUserLocationAPI,
  fetchRecentActivities,
  fetchCRMUrl,
  fetchFMSUrl,
  fetchOKRUrl
};

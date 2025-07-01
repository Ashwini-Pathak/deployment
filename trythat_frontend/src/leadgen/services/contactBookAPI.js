import { client } from '../../utils/apiClient';
import { asyncHandler } from '../../utils/asyncHandler';

const getContactBookData = async (body, userId) => {
  const [data, err] = await asyncHandler(
    client.get(
      `/leadgen/user/${userId}/contact/${body?.propertyType}?type=${body?.contactType}&limit=${body?.limit}&offset=${body?.offset}`,
    ),
  );
  if (err) return err;
  return data;
};

const getContactBookDataThroughSearch = async (body, userId) => {
  const [data, err] = await asyncHandler(client.post(`/leadgen/user/${userId}/contact/search`, body));
  if (err) return err;
  return data;
};

const getContactBookStats = async (userId) => {
  const [data, err] = await asyncHandler(client.get(`/leadgen/user/${userId}/contact/stats`));
  if (err) return err;
  return data;
};

const postContactFeedback = async (body, userId) => {
  const [data, err] = await asyncHandler(client.post(`/leadgen/user/${userId}/recommendation/reviews`, body));
  if (err) return err;
  return data;
};

const getPropertyReviews = async (propertyId, userId) => {
  const [data, err] = await asyncHandler(
    client.get(`/leadgen/user/${userId}/recommendation/property/${propertyId}/reviews`),
  );
  if (err) return err;
  return data;
};
const getOrganizationReviews = async (organisationId, userId) => {
  const [data, err] = await asyncHandler(
    client.get(`/leadgen/user/${userId}/recommendation/organisation/${organisationId}/reviews`),
  );
  if (err) return err;
  return data;
};

export {
  getContactBookData,
  getContactBookDataThroughSearch,
  getContactBookStats,
  postContactFeedback,
  getPropertyReviews,
  getOrganizationReviews,
};

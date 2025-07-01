import { client } from '../../utils/apiClient';
import { asyncHandler } from '../../utils/asyncHandler';

// common search API
const getSearchResultsAPI = async (param, userId) => {
  try {
    return await client.post(`/leadgen/user/${userId}/recommendation/search`, param.body);
  } catch (error) {
    console.error(error);
  }
};

// Commercial search details APIs
const getDetailedPropertyInfoAPI = async (propertyId, userId) => {
  try {
    return await client.get(`/leadgen/user/${userId}/recommendation/commercialProperty/${propertyId}`);
  } catch (error) {
    console.error(error);
  }
};

const getOrganizationFromPropertyAPI = async (propertyId, userId, offset) => {
  try {
    return await client.get(
      `/leadgen/user/${userId}/recommendation/commercialProperty/${propertyId}?rel=orgs&limit=5&offset=${offset}`,
    );
  } catch (error) {
    console.error(error);
  }
};

const getOccupantsFromPropertyAPI = async (propertyId, userId) => {
  try {
    return await client.get(`/leadgen/user/${userId}/recommendation/commercialProperty/${propertyId}?rel=occupants`);
  } catch (error) {
    console.error(error);
  }
};

// Residential search details APIs

const getResidentialDetailedPropertyInfoAPI = async (propertyId, userId) => {
  try {
    return await client.get(`/leadgen/user/${userId}/recommendation/residentialProperty/${propertyId}`);
  } catch (error) {
    console.error(error);
  }
};

const getResidentialUnitsFromPropertyAPI = async (propertyId, userId) => {
  try {
    return await client.get(`/leadgen/user/${userId}/recommendation/residentialProperty/${propertyId}?rel=units`);
  } catch (error) {
    console.error(error);
  }
};

const getOrganizationFromConnectsAPI = async (connectsId, userId) => {
  try {
    return await client.get(`/leadgen/user/${userId}/recommendation/connect/${connectsId}?rel=orgs`);
  } catch (error) {
    console.error(error);
  }
};

const getPropertiesFromOrganizationAPI = async (orgId, userId) => {
  try {
    return await client.get(`/leadgen/user/${userId}/recommendation/organisation/${orgId}?rel=props`);
  } catch (error) {
    console.error(error);
  }
};

const getConnectsFromOrganizationAPI = async (orgId, userId) => {
  try {
    return await client.get(`/leadgen/user/${userId}/recommendation/organisation/${orgId}?rel=connects`);
  } catch (error) {
    console.error(error);
  }
};

const getDetailedOrganizationInfoAPI = async (orgId, userId) => {
  try {
    return await client.get(`/leadgen/user/${userId}/recommendation/organisation/${orgId}`);
  } catch (error) {
    console.error(error);
  }
};

const getDetailedConnectInfoAPI = async (connectId, userId) => {
  try {
    return await client.get(`/leadgen/user/${userId}/recommendation/connect/${connectId}`);
  } catch (error) {
    console.error(error);
  }
};

const saveResourcesAPI = async (param, userId) => {
  try {
    return await client.post(`/leadgen/user/${userId}/prospect`, param.body);
  } catch (error) {
    console.error(error);
  }
};

const deleteResourcesAPI = async (param, userId) => {
  try {
    return await client.delete(`/leadgen/user/${userId}/prospect`, { data: param.body });
  } catch (error) {
    console.error(error);
  }
};

const getWishlistContentAPI = async (userId) => {
  try {
    return await client.get(`/leadgen/user/${userId}/prospect/stats`);
  } catch (error) {
    console.error(error);
  }
};

const getWishlistContentWithPointsAPI = async (userId) => {
  try {
    return await client.get(`/leadgen/user/${userId}/prospect/wishlist`);
  } catch (error) {
    console.error(error);
  }
};

const unlockFieldsAPI = async (param, userId) => {
  const [data, err] = await asyncHandler(client.post(`/leadgen/user/${userId}/recommendation/transact`, param.body));
  if (err) return err;
  return data;
};

const getOccupantDetailsFullInfoAPI = async (transactionId, userId, propertyId) => {
  try {
    return await client.get(
      `/leadgen/user/${userId}/recommendation/property/${propertyId}/transaction/${transactionId}`,
    );
  } catch (error) {
    console.error(error);
  }
};

export {
  getSearchResultsAPI,
  getDetailedPropertyInfoAPI,
  getOrganizationFromPropertyAPI,
  getConnectsFromOrganizationAPI,
  getDetailedOrganizationInfoAPI,
  saveResourcesAPI,
  deleteResourcesAPI,
  getWishlistContentAPI,
  getWishlistContentWithPointsAPI,
  getOrganizationFromConnectsAPI,
  getPropertiesFromOrganizationAPI,
  getDetailedConnectInfoAPI,
  unlockFieldsAPI,
  getOccupantDetailsFullInfoAPI,
  getOccupantsFromPropertyAPI,
  getResidentialDetailedPropertyInfoAPI,
  getResidentialUnitsFromPropertyAPI,
};

// imports
import { client } from '../../utils/apiClient';
import { asyncHandler } from '../../utils/asyncHandler';
import { getStorePointsData } from '../../utils/referenceData/storeData';

// ----------Get Store Points---------

const getStorePoints = async () => {
  // const response = await api.get(`/getSearchData`);
  // return response.data;
  return await getStorePointsData();
};

// ----------Initiate payment---------
const initiatePayment = async (payload, userId) => {
  const [data, err] = await asyncHandler(
    client.post(`/payment/user/${userId}/initiate`, payload, {
      authorization: true,
    }),
  );
  if (err) return err;
  return data;
};
// ----------get payment status details---------
const getPaymentStatus = async (orderId, isTimedOut, userId) => {
  const [data, err] = await asyncHandler(
    client.get(`/payment/user/${userId}/order_details/${orderId}?isTimeout=${isTimedOut}`, {
      authorization: true,
    }),
  );
  if (err) return err;
  return data;
};
// ----------get payment status details---------
const getPointAmountDetails = async (userId) => {
  const [data, err] = await asyncHandler(
    client.get(`user/${userId}/point/get_point_amount_mapping`, {
      authorization: true,
    }),
  );
  if (err) return err;
  return data;
};
// ----------get cart status details---------
const getCartDetails = async (userId) => {
  const [data, err] = await asyncHandler(
    client.get(`/cart/user/${userId}`, {
      authorization: true,
    }),
  );
  if (err) return err;
  return data;
};
// ----------get cart status details---------
const createCart = async (userId) => {
  const [data, err] = await asyncHandler(
    client.post(`/cart/user/${userId}/create`, {
      authorization: true,
    }),
  );
  if (err) return err;
  return data;
};
// ----------updatre cart  details---------

const updateCartDetails = async (payload, userId) => {
  const [data, err] = await asyncHandler(
    client.patch(`/cart/user/${userId}/update`, payload, {
      authorization: true,
    }),
  );
  if (err) return err;
  return data;
};

export {
  getStorePoints,
  initiatePayment,
  updateCartDetails,
  getPaymentStatus,
  getPointAmountDetails,
  createCart,
  getCartDetails,
};

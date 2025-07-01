import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import {
  getStorePoints as _getStorePoints,
  initiatePayment as _initiatePayment,
  getPaymentStatus as _getPaymentStatus,
  getPointAmountDetails as _getPointAmountDetails,
  getCartDetails as _getCartDetails,
  updateCartDetails as _updateCartDetails,
  createCart as _createCart,
} from '../services/userStoreServiceAPI';
import { ExternalError } from '../../utils/error/error';
import { get } from 'lodash';

const createSliceWithThunks = buildCreateSlice({
  creators: {
    asyncThunk: asyncThunkCreator,
  },
});

const initialState = {
  loading: false,
  error: null,
  storePoints: [],
  paymentLoading: false,
  paymentStatusDetails: null,
  pointAmountDetails: null,
  userCartDetails: null,
};

const userStoreSlice = createSliceWithThunks({
  name: 'userStore',
  initialState,
  reducers: (create) => ({
    // ----------Fetch Store Points Data---------

    fetchStorePointsData: create.asyncThunk(
      async (payload, thunkAPI) => {
        const userId = thunkAPI.getState().user?.user?.id;
        return await _getPointAmountDetails(userId);
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        rejected: (state, action) => {
          state.error = action.error;
          state.loading = false;
        },
        fulfilled: (state, action) => {
          const pointData = action.payload?.data?.response?.data?.map((elem) => ({ ...elem, quantity: 0 }));
          state.storePoints = pointData;
          state.loading = false;
        },
      },
    ),
    // ----------Initiate payment---------
    initiatePayment: create.asyncThunk(
      async (payload, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await _initiatePayment(payload, userId);
          if (data?.status !== 201) {
            throw new ExternalError(data?.response?.data?.errors?.[0]?.message, {
              statusCode: data?.status,
            });
          }
          return data;
        } catch (err) {
          const message = get(err, 'message', 'Something Went Wrong!');
          const name = get(err, 'name', 'Error!');
          const statusCode = get(err, 'metadata.statusCode', '');
          return thunkAPI.rejectWithValue({ message, name, statusCode });
        }
      },
      {
        pending: (state) => {
          state.paymentLoading = true;
        },
        rejected: (state, action) => {
          state.error = action.error;
          state.paymentLoading = false;
        },
        fulfilled: (state, action) => {
          const redirectionUrl = action.payload?.data?.response?.data?.payment_links?.web;
          // Redirect the user to the extracted URL
          window.location.replace(redirectionUrl);
          state.paymentLoading = false;
        },
      },
    ),
    // ----------Getb payment status---------
    getPaymentStatus: create.asyncThunk(
      async ({ orderId, isTimedOut }, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await _getPaymentStatus(orderId, isTimedOut, userId);
          if (data?.status !== 200) {
            throw new ExternalError(data?.response?.data?.errors?.[0]?.message, {
              statusCode: data?.status,
            });
          }
          return data;
        } catch (err) {
          const message = get(err, 'message', 'Something Went Wrong!');
          const name = get(err, 'name', 'Error!');
          const statusCode = get(err, 'metadata.statusCode', '');
          return thunkAPI.rejectWithValue({ message, name, statusCode });
        }
      },

      {
        rejected: (state, action) => {
          state.error = action.error;
        },
        fulfilled: (state, action) => {
          state.paymentStatusDetails = action.payload?.data?.response?.data;
        },
      },
    ),

    // ----------Get cart details---------
    getCartDetails: create.asyncThunk(
      async (_, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await _getCartDetails(userId);
          if (data?.status !== 200) {
            throw new ExternalError(data?.response?.data?.errors?.[0]?.message, {
              statusCode: data?.status,
            });
          }
          return data;
        } catch (err) {
          const message = get(err, 'message', 'Something Went Wrong!');
          const name = get(err, 'name', 'Error!');
          const statusCode = get(err, 'metadata.statusCode', '');
          return thunkAPI.rejectWithValue({ message, name, statusCode });
        }
      },

      {
        rejected: (state, action) => {
          state.error = action.error;
        },
        fulfilled: (state, action) => {
          state.userCartDetails = action.payload?.data?.response?.data;
        },
      },
    ),
    // ----------Update cart details---------
    updateCartDetails: create.asyncThunk(
      async (payload, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await _updateCartDetails(payload, userId);
          if (data?.status !== 200) {
            throw new ExternalError(data?.response?.data?.errors?.[0]?.message, {
              statusCode: data?.status,
            });
          }
          return data;
        } catch (err) {
          const message = get(err, 'message', 'Something Went Wrong!');
          const name = get(err, 'name', 'Error!');
          const statusCode = get(err, 'metadata.statusCode', '');
          return thunkAPI.rejectWithValue({ message, name, statusCode });
        }
      },

      {
        rejected: (state, action) => {
          state.error = action.error;
        },
        fulfilled: (state, action) => {
          state.paymentStatusDetails = action.payload?.data?.response?.data;
        },
      },
    ),
    // ----------Create cart---------
    createCart: create.asyncThunk(
      async (_, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await _createCart(userId);
          if (data?.status !== 200) {
            throw new ExternalError(data?.response?.data?.errors?.[0]?.message, {
              statusCode: data?.status,
            });
          }
          return data;
        } catch (err) {
          const message = get(err, 'message', 'Something Went Wrong!');
          const name = get(err, 'name', 'Error!');
          const statusCode = get(err, 'metadata.statusCode', '');
          return thunkAPI.rejectWithValue({ message, name, statusCode });
        }
      },

      {
        rejected: (state, action) => {
          state.error = action.error;
        },
      },
    ),

    increaseUserStoreQuantity: (state, action) => {
      let storePointsIdIndex = state.storePoints.findIndex((el) => el._id === action.payload);
      state.storePoints[storePointsIdIndex].quantity += 1;
    },
    updateStorePoints: (state, action) => {
      state.storePoints = action?.payload;
    },
    updatePointAmountDetails: (state, action) => {
      state.pointAmountDetails = action?.payload;
    },
    decreaseUserStoreQuantity: (state, action) => {
      let storePointsIdIndex = state.storePoints.findIndex((el) => el._id === action.payload);
      state.storePoints[storePointsIdIndex].quantity -= 1;
    },
  }),
});

export const {
  fetchStorePointsData,
  increaseUserStoreQuantity,
  decreaseUserStoreQuantity,
  initiatePayment,
  getPaymentStatus,
  updatePointAmountDetails,
  getPointAmountDetails,
  createCart,
  updateCartDetails,
  getCartDetails,
  updateStorePoints,
} = userStoreSlice.actions;
export default userStoreSlice.reducer;

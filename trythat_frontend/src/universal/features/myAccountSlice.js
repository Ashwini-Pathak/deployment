import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import {
  getUserProfile as _getUserProfile,
  getUserProfileCompletion as _getUserProfileCompletion,
  updateUserProfile as _updateUserProfile,
  postOnboardingData as pOData,
  uploadUserImage as _uploadUserImage,
  sendOtp as _sendOtp,
  verifyOtp as _verifyOtp,
  getTransactionDetails as _getTransactionDetails,
  fetchPaymentDetails as _fetchPaymentDetails,
  getUserProfileV2,
} from '../services/myAccountAPI';
import { AuthenticationError, ExternalError } from '../../utils/error/error';
import { setProfileCompletion, setProfileImage, setUserData, setUserDataV2 } from './userSlice';
import { get } from 'lodash';
import { fetchUserPoints } from './userOnboardingSlice';
import { set_toast } from './toastSlice';

const createSliceWithThunks = buildCreateSlice({
  creators: {
    asyncThunk: asyncThunkCreator,
  },
});

const initialState = {
  loading: false,
  error: null,
  isFormEditable: false,
  coWorkingLocations: {},
  coWorkingOpenToBroker: '',
  buyerOpenToBroker: '',
  sellerLocations: {},
  sellerPriceNegotiable: '',
  verifyOtpModalState: false,
  transactionDetails: [],
  buyerLocations: {},
  brokerLocations: {},
  paymentDetails: {},
  paymentDetailsLoader: {},
};

const myAccountSlice = createSliceWithThunks({
  name: 'myAccount',
  initialState,
  reducers: (create) => ({
    setIsFormEditable: (state, action) => {
      state.isFormEditable = action?.payload;
    },
    setCoWorkingLocations: (state, action) => {
      state.coWorkingLocations = action?.payload;
    },
    setCoWorkingOpenToBroker: (state, action) => {
      state.coWorkingOpenToBroker = action?.payload;
    },
    setBuyerOpenToBroker: (state, action) => {
      state.buyerOpenToBroker = action?.payload;
    },
    setBuyerLocation: (state, action) => {
      state.buyerLocations = action?.payload;
    },
    setBrokerLocation: (state, action) => {
      state.brokerLocations = action?.payload;
    },
    setSellerLocations: (state, action) => {
      state.sellerLocations = action?.payload;
    },
    setSellerPriceNegotiable: (state, action) => {
      state.sellerPriceNegotiable = action?.payload;
    },
    setVerifyOtpModalState: (state, action) => {
      state.verifyOtpModalState = action?.payload;
    },
    fetchUserProfileData: create.asyncThunk(
      async (_, thunkApi) => {
        try {
          const userId = thunkApi.getState().user?.user?.id;
          let data = await _getUserProfile(userId);
          if (data?.status !== 200) {
            throw new AuthenticationError(data?.response?.data?.errors?.message, {
              statusCode: data.status,
            });
          }
          thunkApi.dispatch(setUserData(data?.data?.response?.data));
          return data;
        } catch (err) {
          const message = get(err, 'message', 'Something Went Wrong!');
          const name = get(err, 'name', 'Error!');
          const statusCode = get(err, 'metadata.statusCode', '');
          return thunkApi.rejectWithValue({ message, name, statusCode });
        }
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
          state.loading = false;
        },
      },
    ),
    fetchUserProfileDataV2: create.asyncThunk(
      async (_, thunkApi) => {
        try {
          const userId = thunkApi.getState().user?.user?.id;
          let data = await getUserProfileV2(userId);
          if (data?.status !== 200) {
            throw new AuthenticationError(data?.response?.data?.errors?.message, {
              statusCode: data.status,
            });
          }
          thunkApi.dispatch(setUserDataV2(data?.data?.response?.data));
          return data;
        } catch (err) {
          const message = get(err, 'message', 'Something Went Wrong!');
          const name = get(err, 'name', 'Error!');
          const statusCode = get(err, 'metadata.statusCode', '');
          return thunkApi.rejectWithValue({ message, name, statusCode });
        }
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
          state.loading = false;
        },
      },
    ),
    updateUserProfileData: create.asyncThunk(
      async (_, thunkApi) => {
        try {
          const userId = thunkApi.getState().user?.user?.id;
          let data = await _updateUserProfile(_, userId);
          if (data?.status !== 201) {
            throw new AuthenticationError(data?.response?.data?.errors?.message, {
              statusCode: data.status,
            });
          }
          thunkApi.dispatch(setUserData(data?.data?.response?.data));
          thunkApi.dispatch(fetchUserProfileCompletion());
          thunkApi.dispatch(fetchUserPoints());
          thunkApi.dispatch(set_toast({ show: true, type: 'success', content: 'User profile updated successfully!' }));
          return data;
        } catch (err) {
          const message = get(err, 'message', 'Something Went Wrong!');
          const name = get(err, 'name', 'Error!');
          const statusCode = get(err, 'metadata.statusCode', '');
          thunkApi.dispatch(set_toast({ show: true, type: 'warning', content: message }));
          return thunkApi.rejectWithValue({ message, name, statusCode });
        }
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
          state.loading = false;
          state.isFormEditable = false;
        },
      },
    ),
    postOnboardingData: create.asyncThunk(
      async (_, thunkApi) => {
        try {
          const userID = thunkApi.getState().user.user.id;
          const data = await pOData(_, userID);
          if (data?.status !== 201) {
            throw new ExternalError(data?.response?.data?.errors?.[0]?.message, {
              statusCode: data.status,
            });
          }
          thunkApi.dispatch(setUserData(data?.data?.response?.data));
          return data;
        } catch (err) {
          const message = get(err, 'message', 'Something Went Wrong!');
          const name = get(err, 'name', 'Error!');
          const statusCode = get(err, 'metadata.statusCode', '');
          return thunkApi.rejectWithValue({ message, name, statusCode });
        }
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        rejected: (state, action) => {
          state.loading = false;
        },
        fulfilled: (state, action) => {
          state.loading = false;
        },
      },
    ),
    fetchUserProfileCompletion: create.asyncThunk(
      async (_, thunkApi) => {
        try {
          const userId = thunkApi.getState().user?.user?.id;
          let data = await _getUserProfileCompletion(userId);
          if (data?.status !== 200) {
            throw new AuthenticationError(data?.response?.data?.errors?.message, {
              statusCode: data.status,
            });
          }
          thunkApi.dispatch(setProfileCompletion(data?.data?.response?.data));
          return data;
        } catch (err) {
          const message = get(err, 'message', 'Something Went Wrong!');
          const name = get(err, 'name', 'Error!');
          const statusCode = get(err, 'metadata.statusCode', '');
          return thunkApi.rejectWithValue({ message, name, statusCode });
        }
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
          state.loading = false;
        },
      },
    ),
    uploadUserImage: create.asyncThunk(
      async (_, thunkApi) => {
        try {
          const { user } = thunkApi.getState().user;
          let data = await _uploadUserImage(_, user?.id);
          if (data?.status !== 201) {
            throw new AuthenticationError(data?.response?.data?.errors?.message, {
              statusCode: data.status,
            });
          }
          thunkApi.dispatch(setProfileImage(data?.data?.response?.data?.imageUrl));
          return data;
        } catch (err) {
          const message = get(err, 'message', 'Something Went Wrong!');
          const name = get(err, 'name', 'Error!');
          const statusCode = get(err, 'metadata.statusCode', '');
          return thunkApi.rejectWithValue({ message, name, statusCode });
        }
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
          state.loading = false;
        },
      },
    ),
    sendOtp: create.asyncThunk(
      async (_, thunkApi) => {
        try {
          const { user } = thunkApi.getState().user;
          let data = await _sendOtp(_, user?.id);
          if (data?.status !== 201) {
            throw new AuthenticationError(data?.response?.data?.errors?.message, {
              statusCode: data.status,
            });
          }
          thunkApi.dispatch(set_toast({ show: true, type: 'success', content: 'OTP sent successfully!' }));
          return data;
        } catch (err) {
          const message = get(err, 'message', 'Something Went Wrong!');
          const name = get(err, 'name', 'Error!');
          const statusCode = get(err, 'metadata.statusCode', '');
          thunkApi.dispatch(set_toast({ show: true, type: 'warning', content: message }));
          return thunkApi.rejectWithValue({ message, name, statusCode });
        }
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
          state.loading = false;
          state.verifyOtpModalState = true;
        },
      },
    ),
    verifyOtp: create.asyncThunk(
      async (_, thunkApi) => {
        try {
          const { user } = thunkApi.getState().user;
          let data = await _verifyOtp(_, user?.id);
          if (data?.status !== 201) {
            throw new AuthenticationError(data?.response?.data?.errors?.message, {
              statusCode: data.status,
            });
          }
          thunkApi.dispatch(set_toast({ show: true, type: 'success', content: 'Email verified successfully!' }));
          thunkApi.dispatch(fetchUserProfileData(user?.id));
          thunkApi.dispatch(fetchUserProfileDataV2(user?.id));
          return data;
        } catch (err) {
          const message = get(err, 'message', 'Something Went Wrong!');
          const name = get(err, 'name', 'Error!');
          const statusCode = get(err, 'metadata.statusCode', '');
          thunkApi.dispatch(set_toast({ show: true, type: 'warning', content: message }));
          return thunkApi.rejectWithValue({ message, name, statusCode });
        }
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
          state.loading = false;
          state.verifyOtpModalState = false;
        },
      },
    ),
    fetchTransactionDetails: create.asyncThunk(
      async (_, thunkApi) => {
        try {
          const userId = thunkApi.getState().user?.user?.id;
          let data = await _getTransactionDetails(_, userId);
          if (data?.status !== 200) {
            throw new AuthenticationError(data?.response?.data?.errors?.message, {
              statusCode: data.status,
            });
          }
          return data;
        } catch (err) {
          const message = get(err, 'message', 'Something Went Wrong!');
          const name = get(err, 'name', 'Error!');
          const statusCode = get(err, 'metadata.statusCode', '');
          return thunkApi.rejectWithValue({ message, name, statusCode });
        }
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
          state.loading = false;
          state.transactionDetails = action?.payload?.data?.response?.data;
        },
      },
    ),
    // -------fetch payment details action-------
    fetchPaymentDetails: create.asyncThunk(
      async (payload, thunkApi) => {
        try {
          const userId = thunkApi.getState().user?.user?.id;
          let data = await _fetchPaymentDetails(payload, userId);
          if (data?.status !== 201) {
            throw new AuthenticationError(data?.response?.data?.errors?.message, {
              statusCode: data.status,
            });
          }
          return data;
        } catch (err) {
          const message = get(err, 'message', 'Something Went Wrong!');
          const name = get(err, 'name', 'Error!');
          const statusCode = get(err, 'metadata.statusCode', '');
          return thunkApi.rejectWithValue({ message, name, statusCode });
        }
      },
      {
        pending: (state) => {
          state.paymentDetailsLoader = true;
        },
        rejected: (state, action) => {
          state.error = action.error;
          state.paymentDetailsLoader = false;
        },
        fulfilled: (state, action) => {
          state.paymentDetailsLoader = false;
          state.paymentDetails = action?.payload?.data?.response?.data;
        },
      },
    ),
  }),
});

export const {
  fetchUserProfileData,
  fetchUserProfileDataV2,
  setIsFormEditable,
  updateUserProfileData,
  postOnboardingData,
  fetchUserProfileCompletion,
  uploadUserImage,
  setCoWorkingLocations,
  setBuyerLocation,
  setBrokerLocation,
  setCoWorkingOpenToBroker,
  setBuyerOpenToBroker,
  setSellerLocations,
  setSellerPriceNegotiable,
  sendOtp,
  verifyOtp,
  setVerifyOtpModalState,
  fetchTransactionDetails,
  fetchPaymentDetails,
} = myAccountSlice.actions;
export default myAccountSlice.reducer;

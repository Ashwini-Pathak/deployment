import { buildCreateSlice, asyncThunkCreator, nanoid } from '@reduxjs/toolkit';

import { register, registerInit, sendOtp, verifyOtpAPI } from '../services/authenticationAPI';
import { AuthenticationError } from '../../utils/error/error';
// lodash imports
import get from 'lodash/get';
import { setAccessToken, setUserData } from './userSlice';
import { set_toast } from './toastSlice';
import { setCRMData, setFMSData, setOKRData } from './userDashboardSlice';

const createSliceWithThunks = buildCreateSlice({
  creators: {
    asyncThunk: asyncThunkCreator,
  },
});

const initialState = {
  currentStep: 'REGISTER_FORM',
  otpMedium: '',
  userId: '',
  registerLoading: false,
  loading: {
    verifyOtpLoading: false,
    registerLoading: false,
  },
  sendEmailOTP: true,
  authComplete: {
    phoneVerified: false,
    emailVerified: false,
  },
};

const registerSlice = createSliceWithThunks({
  name: 'register',
  initialState,
  reducers: (create) => ({
    initSignUp: (state, action) => {
      state.loading.registerLoading = true;
    },
    verifyOtp: (state, action) => {
      state.loading.verifyOtpLoading = true;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action?.payload;
    },
    userRegisterInit: create.asyncThunk(
      async (userData, thunkAPI) => {
        try {
          let data = await registerInit(userData);
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
          thunkAPI.dispatch(set_toast({ show: true, type: 'warning', content: message }));
          return thunkAPI.rejectWithValue({ message, name, statusCode });
        }
      },
      {
        pending: (state) => {
          state.loading.registerLoading = true;
        },
        rejected: (state, action) => {
          state.error = action.error;
          state.loading.registerLoading = false;
        },
        fulfilled: (state, action) => {
          state.userId = action?.payload?.data?.response?.data?.userId;
          state.otpMedium = 'phone';
        },
      },
    ),
    sendRegisterOtp: create.asyncThunk(
      async (param, thunkAPI) => {
        try {
          let data = await sendOtp(param);
          if (data?.status !== 202) {
            throw new AuthenticationError(data?.response?.data?.errors?.message, {
              statusCode: data?.status,
            });
          }
          thunkAPI.dispatch(set_toast({ show: true, type: 'success', content: 'OTP sent successfully!' }));
          return data;
        } catch (err) {
          const message = get(err, 'message', 'Something Went Wrong!');
          const name = get(err, 'name', 'Error!');
          const statusCode = get(err, 'metadata.statusCode', '');
          thunkAPI.dispatch(set_toast({ show: true, type: 'warning', content: message }));
          return thunkAPI.rejectWithValue({ message, name, statusCode });
        }
      },
      {
        pending: (state) => {
          state.loading.registerLoading = true;
        },
        rejected: (state, action) => {
          state.error = action.error;
          state.loading.registerLoading = false;
        },
        fulfilled: (state, action) => {
          state.loading.registerLoading = false;
          state.currentStep = 'OTP_FORM';
          if (state.otpMedium === 'email') {
            state.sendEmailOTP = false;
          }
        },
      },
    ),
    verifyOtpDB: create.asyncThunk(
      async (param, thunk) => {
        try {
          let data = await verifyOtpAPI(param);
          if (data?.status !== 202) {
            throw new AuthenticationError(data?.response?.data?.errors?.message, {
              statusCode: data?.status,
            });
          }
          return data;
        } catch (err) {
          console.error(err);
          const message = get(err, 'message', 'Something Went Wrong!');
          const name = get(err, 'name', 'Error!');
          const statusCode = get(err, 'metadata.statusCode', '');
          thunk.dispatch(set_toast({ show: true, type: 'warning', content: message }));
          return thunk.rejectWithValue({ message, name, statusCode });
        }
      },
      {
        pending: (state) => {
          state.loading.verifyOtpLoading = true;
        },
        rejected: (state, action) => {
          state.error = action.error;
          state.loading.verifyOtpLoading = false;
        },
        fulfilled: (state, action) => {
          if (state.otpMedium === 'email') {
            state.authComplete.emailVerified = true;
          }
          if (state.otpMedium === 'phone') {
            state.authComplete.phoneVerified = true;
            state.otpMedium = 'email';
          }
          state.loading.verifyOtpLoading = false;
        },
      },
    ),
    userRegister: create.asyncThunk(
      async (param, thunkAPI) => {
        try {
          let data = await register(param);
          if (data?.status !== 201) {
            throw new AuthenticationError(data?.response?.data?.errors?.message, {
              statusCode: data.status,
            });
          }
          thunkAPI.dispatch(setAccessToken(data?.data?.response?.data?.accessToken));
          thunkAPI.dispatch(setUserData(data?.data?.response?.data?.user));
          thunkAPI.dispatch(setOKRData(data?.data?.response?.data?.user?.okrDetails));
          thunkAPI.dispatch(setFMSData(data?.data?.response?.data?.user?.fmsDetails));

          thunkAPI.dispatch(set_toast({ show: true, type: 'success', content: 'User registered successfully!' }));
          return data;
        } catch (err) {
          console.error(err);
          const message = get(err, 'message', 'Something Went Wrong!');
          const name = get(err, 'name', 'Error!');
          const statusCode = get(err, 'metadata.statusCode', '');
          thunkAPI.dispatch(set_toast({ show: true, type: 'warning', content: message }));

          return thunkAPI.rejectWithValue({ message, name, statusCode });
        }
      },
      {
        pending: (state) => {
          state.loading.verifyOtpLoading = true;
        },
        rejected: (state, action) => {
          state.error = action.error;
          state.loading.verifyOtpLoading = false;
        },
        fulfilled: (state, action) => {
          state.loading.verifyOtpLoading = false;
        },
      },
    ),
  }),
});

export const { initSignUp, userRegisterInit, sendRegisterOtp, verifyOtp, verifyOtpDB, userRegister, setCurrentStep } =
  registerSlice.actions;

export default registerSlice.reducer;

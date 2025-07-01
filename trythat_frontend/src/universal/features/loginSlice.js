import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';
import { AuthenticationError } from '../../utils/error/error';
import { get } from 'lodash';
import { sendOtp, signIn, signInInit, verifyOtpAPI } from '../services/authenticationAPI';
import { set_toast } from './toastSlice';
import { setCRMData, setFMSData, setOKRData } from './userDashboardSlice';

const createSliceWithThunks = buildCreateSlice({
  creators: {
    asyncThunk: asyncThunkCreator,
  },
});

const initialState = {
  currentStep: 'LOGIN_FORM',
  otpMedium: '',
  userId: '',
  loading: {
    verifyOtpLoading: false,
    loginLoading: false,
  },
  data: '',
};

const loginSlice = createSliceWithThunks({
  name: 'login',
  initialState,
  reducers: (create) => ({
    initLogin: (state, action) => {
      state.loading.loginLoading = true;
      state.otpMedium = action.payload.body.type;
      state.data = action.payload.body.data;
    },
    verifyLoginOtp: (state, action) => {
      state.loading.verifyOtpLoading = true;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action?.payload;
    },
    loginInit: create.asyncThunk(
      async (userData, thunkAPI) => {
        try {
          let data = await signInInit(userData);
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
          state.loading.loginLoading = true;
        },
        rejected: (state, action) => {
          state.error = action.error;
          state.loading.loginLoading = false;
          state.toastMessage = {
            type: 'danger',
            content: action?.payload?.message,
          };
        },
        fulfilled: (state, action) => {
          state.userId = action?.payload?.data?.response?.data?.userId;
          state.loading.loginLoading = false;
        },
      },
    ),
    sendLoginOtp: create.asyncThunk(
      async (param, thunk) => {
        try {
          let data = await sendOtp(param);
          if (data?.status !== 202) {
            throw new AuthenticationError(data?.response?.data?.errors?.message, {
              statusCode: data?.status,
            });
          }
          thunk.dispatch(
            set_toast({
              type: 'success',
              content: 'OTP sent successfully!',
            }),
          );
          return data;
        } catch (err) {
          const message = get(err, 'message', 'Something Went Wrong!');
          const name = get(err, 'name', 'Error!');
          const statusCode = get(err, 'metadata.statusCode', '');
          thunk.dispatch(set_toast({ show: true, type: 'warning', content: message }));
          return thunk.rejectWithValue({ message, name, statusCode });
        }
      },
      {
        pending: (state) => {
          state.loading.loginLoading = true;
        },
        rejected: (state, action) => {
          state.error = action.error;
          state.loading.loginLoading = false;
          state.toastMessage = {
            type: 'danger',
            content: action?.payload?.message,
          };
        },
        fulfilled: (state, action) => {
          state.loading.loginLoading = false;
          state.currentStep = 'OTP_FORM';
        },
      },
    ),
    loginVerifyOtp: create.asyncThunk(
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
          state.toastMessage = {
            type: 'danger',
            content: action?.payload?.message,
          };
        },
        fulfilled: (state, action) => {
          state.loading.verifyOtpLoading = false;
          state.dataVerified = true;
        },
      },
    ),
    userRegisterLogin: create.asyncThunk(
      async (param, thunkAPI) => {
        try {
          let data = await signIn(param);
          if (data?.status !== 201) {
            throw new AuthenticationError(data?.response?.data?.errors?.message, {
              statusCode: data.status,
            });
          }
          thunkAPI.dispatch(setCRMData(data?.data?.response?.data?.user?.crmDetails));
          thunkAPI.dispatch(setOKRData(data?.data?.response?.data?.user?.okrDetails));
          thunkAPI.dispatch(setFMSData(data?.data?.response?.data?.user?.fmsDetails));
          thunkAPI.dispatch(set_toast({ show: true, type: 'success', content: 'User logged-in successfully!' }));
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
          state.toastMessage = {
            type: 'danger',
            content: action?.payload?.message,
          };
        },
        fulfilled: (state, action) => {
          state.loading.verifyOtpLoading = false;
        },
      },
    ),
    userSignIn: create.asyncThunk(
      async (param, thunk) => {
        try {
          let data = await signIn(param);
          if (data?.status !== 200) {
            throw new AuthenticationError(data?.response?.data?.errors?.message, {
              statusCode: data.status,
            });
          }
          thunk.dispatch(setCRMData(data?.data?.response?.data?.user?.crmDetails));
          thunk.dispatch(setOKRData(data?.data?.response?.data?.user?.okrDetails));
          thunk.dispatch(setFMSData(data?.data?.response?.data?.user?.fmsDetails));
          thunk.dispatch(set_toast({ show: true, type: 'success', content: 'User logged-in successfully!' }));
          return data;
        } catch (err) {
          console.error(err);
          const message = get(err, 'message', 'Something Went Wrong!');
          const name = get(err, 'name', 'Error!');
          const statusCode = get(err, 'metadata.statusCode', '');
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
          state.toastMessage = {
            type: 'warning',
            content: action?.payload?.message,
          };
        },
        fulfilled: (state, action) => {
          state.userDetails = action?.payload?.data?.response?.data?.user;
          state.accessToken = action?.payload?.data?.response?.data?.accessToken;
          state.loading.verifyOtpLoading = false;
        },
      },
    ),
  }),
});

export const { initLogin, verifyLoginOtp, loginInit, sendLoginOtp, loginVerifyOtp, userSignIn, setCurrentStep } =
  loginSlice.actions;

export default loginSlice.reducer;

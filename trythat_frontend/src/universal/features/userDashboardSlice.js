import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import {
  getAnnouncements as _getAnnouncements,
  getUserData,
  getUserPlanOfferings as _getUserPlanOfferings,
  fetchCurrentLocation,
  postUserLocationAPI,
  fetchRecentActivities as _fetchRecentActivities,
  fetchCRMUrl as _fetchCRMUrl,
  fetchFMSUrl as _fetchFMSUrl,
  fetchOKRUrl as _fetchOKRUrl

} from '../services/userDashboardAPI';
import { AuthenticationError } from '../../utils/error/error';
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
  userData: {},
  planOfferings: [],
  announcements: [],
  currentLocation: {},
  recentActivities: [],
  crmData: {},
  okrData: {},
  fmsData: {},
};

const userDashboardSlice = createSliceWithThunks({
  name: 'userDashboard',
  initialState,
  reducers: (create) => ({
    setCRMData: (state, action) => {
      state.crmData = action?.payload;
    },
    setOKRData: (state, action) => {
      state.okrData = action?.payload;
    },
    setFMSData: (state, action) => {
      state.fmsData = action?.payload;
    },
    fetchUserData: create.asyncThunk(
      async (_, thunkApi) => {
        return await getUserData();
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
          state.userData = action.payload.userData;
          state.loading = false;
        },
      },
    ),
    fetchUserPlanOfferingData: create.asyncThunk(
      async (_, thunkApi) => {
        const data = await _getUserPlanOfferings();
        return data;
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
          state.planOfferings = action.payload.planOfferings;
          state.loading = false;
        },
      },
    ),
    fetchLocationViaLongLat: create.asyncThunk(
      async (param, thunkApi) => {
        try {
          return await fetchCurrentLocation(param);
        } catch (e) {
          thunkApi.rejectWithValue(e);
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
          state.currentLocation = action?.payload?.data?.response?.data;
        },
      },
    ),
    saveUserLocationDB: create.asyncThunk(
      async (param, thunkApi) => {
        try {
          const userId = thunkApi.getState().user?.user?.id;
          let data = await postUserLocationAPI(param, userId);
          await thunkApi.dispatch(fetchUserPoints());
          return data;
        } catch (e) {
          thunkApi.rejectWithValue(e);
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
    fetchAccouncementsData: create.asyncThunk(
      async (_, thunkApi) => {
        try {
          const userId = thunkApi.getState().user?.user?.id;
          let data = await _getAnnouncements(userId);
          if (data?.status !== 200) {
            throw new AuthenticationError(data?.response?.data?.errors?.[0]?.message, {
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
          state.announcements = action?.payload?.data?.response?.data;
        },
      },
    ),
    fetchRecentActivities: create.asyncThunk(
      async (_, thunkApi) => {
        try {
          const userId = thunkApi.getState().user?.user?.id;
          let data = await _fetchRecentActivities(userId);
          if (data?.status !== 200) {
            throw new AuthenticationError(data?.response?.data?.errors?.[0]?.message, {
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
          state.recentActivities = action?.payload?.data?.response?.data;
        },
      },
    ),
    fetchCRMUrl: create.asyncThunk(
      async (_, thunkApi) => {
        try {
          const user = thunkApi.getState().user?.user;
          const body = {
            name: user?.name,
            email: user?.email,
            phone: user?.phone,
          };

          let data = await _fetchCRMUrl(user?.id, body);
          if (data?.status !== 201) {
            throw new AuthenticationError(data?.response?.data?.errors?.message, {
              statusCode: data.status,
            });
          }
          if (data?.data?.response?.data?.crmDetails?.message) {
            throw new AuthenticationError(data?.data?.response?.data?.crmDetails?.message, {
              statusCode: data.status,
            });
          }
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
          state.crmData = action?.payload?.data?.response?.data?.crmDetails;
          if (action?.payload?.data?.response?.data?.crmDetails?.message) {
          }
          const redirectionUrl = action?.payload?.data?.response?.data?.crmDetails?.url;
          // Redirect the user to the extracted URL
          window.location.href = redirectionUrl;
        },
      },
    ),
    fetchFMSUrl: create.asyncThunk(
      async (_, thunkApi) => {
        try {
          const user = thunkApi.getState().user?.user;
          const body = {
            name: user?.name,
            email: user?.email,
            phone: user?.phone,
          };

          let data = await _fetchFMSUrl(user?.id, body);
          if (data?.status !== 201) {
            throw new AuthenticationError(data?.response?.data?.errors?.message, {
              statusCode: data.status,
            });
          }
          if (data?.data?.response?.data?.crmDetails?.message) {
            throw new AuthenticationError(data?.data?.response?.data?.crmDetails?.message, {
              statusCode: data.status,
            });
          }
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
          state.fmsData = action?.payload?.data?.response?.data?.fmsDetails;
          if (action?.payload?.data?.response?.data?.fmsDetails?.message) {
          }
          const redirectionUrl = action?.payload?.data?.response?.data?.fmsDetails?.url;
          // Redirect the user to the extracted URL
          window.location.href = redirectionUrl;
        },
      },
    ),
    fetchOKRUrl: create.asyncThunk(
      async (_, thunkApi) => {
        try {
          const user = thunkApi.getState().user?.user;
          const body = {
            name: user?.name,
            email: user?.email,
          };

          let data = await _fetchOKRUrl(user?.id, body);
          if (data?.status !== 201) {
            throw new AuthenticationError(data?.response?.data?.errors?.message, {
              statusCode: data.status,
            });
          }
          if (data?.data?.response?.data?.okrDetails?.message) {
            throw new AuthenticationError(data?.data?.response?.data?.okrDetails?.message, {
              statusCode: data.status,
            });
          }
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
          state.fmsData = action?.payload?.data?.response?.data?.fmsDetails;
          if (action?.payload?.data?.response?.data?.okrDetails?.message) {
          }
          const redirectionUrl = action?.payload?.data?.response?.data?.okrDetails?.url;
          // Redirect the user to the extracted URL
          window.location.href = redirectionUrl;
        },
      },
    ),
  }),
  // selectors: {
  //   getUserData: state => state.userData,
  //   getAnnouncements: state => state.announcements,
  //   getPlanOfferings: state=> state.planOfferings
  // }
});

export const {
  fetchUserData,
  fetchUserPlanOfferingData,
  fetchAccouncementsData,
  fetchLocationViaLongLat,
  saveUserLocationDB,
  fetchRecentActivities,
  fetchCRMUrl,
  fetchFMSUrl,
  setCRMData,
  setOKRData,
  setFMSData,
} = userDashboardSlice.actions;
export default userDashboardSlice.reducer;

import { asyncThunkCreator, buildCreateSlice, createSlice } from '@reduxjs/toolkit';
import { getAllNotificationsAPI, markAsReadNotificationAPI, raiseConcernAPI } from '../services/userServiceAPI';
import { get } from 'lodash';
import { ExternalError } from '../../utils/error/error';

const createSliceWithThunks = buildCreateSlice({
  creators: {
    asyncThunk: asyncThunkCreator,
  },
});

const initialState = {
  user: {
    phone: '',
    email: '',
  },
  userV2: {},
  accessToken: '',
  universalNotifications: [],
  loading: false,
  profileCompletion: {},
  userImgUrl: '',
};

const user = createSliceWithThunks({
  name: 'user',
  initialState,
  reducers: (create) => ({
    setUserData: (state, action) => {
      state.user = {
        ...action.payload,
      };
    },
    setUserDataV2: (state, action) => {
      state.userV2 = {
        ...action.payload,
      };
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setUniversalNotifications: (state, action) => {
      state.universalNotifications = [...state.universalNotifications, action.payload];
    },
    setProfileCompletion: (state, action) => {
      state.profileCompletion = action.payload;
    },
    setProfileImage: (state, action) => {
      let tempUser = { ...state?.user };
      tempUser.personalDetails.imageUrl = action?.payload;
      state.userImgUrl = action?.payload;
      state.user = tempUser;
    },

    getAllNotifications: create.asyncThunk(
      async (param, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await getAllNotificationsAPI(param, userId);
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
        pending: (state) => {
          state.loading = true;
        },
        rejected: (state, action) => {
          state.loading = false;
        },
        fulfilled: (state, action) => {
          state.universalNotifications = action?.payload?.data?.response?.data;
          state.loading = false;
        },
      },
    ),
    markAsreadNotification: create.asyncThunk(
      async (param, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await markAsReadNotificationAPI(param, userId);
          //  if (data?.status !== 202) {
          //    throw new ExternalError(data?.response?.data?.errors?.[0]?.message, {
          //      statusCode: data?.status,
          //    });
          //  }
          thunkAPI.dispatch(getAllNotifications());
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
          state.loading = true;
        },
        rejected: (state, action) => {
          state.loading = false;
        },
        fulfilled: (state, action) => {
          // state.universalNotifications = action?.payload?.data?.response?.data;
          state.loading = false;
        },
      },
    ),
    raiseConcern: create.asyncThunk(async (payload, thunkAPI) => {
      try {
        const userId = thunkAPI.getState().user?.user?.id;
        const name = thunkAPI.getState().user?.user?.name;
        const email = thunkAPI.getState().user?.user?.email;
        let data = await raiseConcernAPI({ ...payload, name, email }, userId);
        return data;
      } catch (err) {
        const message = get(err, 'message', 'Something Went Wrong!');
        const name = get(err, 'name', 'Error!');
        const statusCode = get(err, 'metadata.statusCode', '');
        return thunkAPI.rejectWithValue({ message, name, statusCode });
      }
    }),
  }),
});

export const {
  setUserData,
  setAccessToken,
  getAllNotifications,
  setUniversalNotifications,
  markAsreadNotification,
  setProfileCompletion,
  setProfileImage,
  raiseConcern,
  setUserDataV2,
} = user.actions;
export default user.reducer;

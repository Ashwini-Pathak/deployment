import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';
import { get } from 'lodash';
import { ExternalError } from '../../utils/error/error';
import {
  getUserAllPosts as _getAllPosts,
  getCompanyAllPosts as _getCompanyAllPosts,
  uploadPostImage as _uploadPostImage,
  createPost,
  followUser,
  unfollowUser,
  getDashboardAllPosts,
  updateActivity as _updateActivity,
  getComments as _getComments,
  getPost
} from '../services/socialAppServiceAPI';
const createSliceWithThunks = buildCreateSlice({
  creators: {
    asyncThunk: asyncThunkCreator,
  },
});

const initialState = {
  socialApploader: false,
  socialAppPosts: [],
  socialAppComments: [],
  socialAppOffset: 0,
  socialAppLimit: 10,
  isUserFollowed: false,
  isModalShow: false,
  searchVisibleSocialApp: false,
};

const socialAppSlice = createSliceWithThunks({
  name: 'socialAppSlice',
  initialState,
  reducers: (create) => ({
    setSocialAppLimit: (state, action) => {
      state.socialAppLimit = action?.payload;
    },
    setSocialAppOffet: (state, action) => {
      state.socialAppOffset = action?.payload;
    },
    setIsUserFollowed: (state, action) => {
      state.isUserFollowed = false;
    },
    isModalShow: (state, action) => {
      state.isModalShow = false;
    },

    setSearchVisibleSocialApp: (state, action) => {
      state.searchVisibleSocialApp = action?.payload;
    },
    getSocialDashbordPosts: create.asyncThunk(
      async (payload, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await getDashboardAllPosts(userId, payload);
          if (data?.status !== 200) {
            throw new ExternalError(data?.response?.data?.errors?.message, {
              statusCode: data.status,
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
        pending: (state, action) => {
          state.socialApploader = true;
        },
      },
      {
        rejected: (state, action) => {
          state.error = action.error;
          state.socialApploader = false;
        },
      },
      {
        fulfilled: (state, action) => {
          state.socialApploader = false;
          const prevPosts = state.socialAppPosts;
          state.socialAppPosts = [...prevPosts, action?.payload?.data?.response?.data];
        },
      },
    ),
    getUserAllPosts: create.asyncThunk(
      async (payload, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await _getAllPosts(userId, payload);
          if (data?.status !== 200) {
            throw new ExternalError(data?.response?.data?.errors?.message, {
              statusCode: data.status,
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
        pending: (state, action) => {
          state.socialApploader = true;
        },
      },
      {
        rejected: (state, action) => {
          state.error = action.error;
          state.socialApploader = false;
        },
      },
      {
        fulfilled: (state, action) => {
          state.socialApploader = false;
          const prevPosts = state.socialAppPosts;
          state.socialAppPosts = [...prevPosts, action?.payload?.data?.response?.data];
        },
      },
    ),
    getCompanyAllPosts: create.asyncThunk(
      async (payload, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          const companyId = thunkAPI.getState().user?.userV2?.companyDetails?.companyId;
          let data = await _getCompanyAllPosts(userId, companyId, payload);
          if (data?.status !== 200) {
            throw new ExternalError(data?.response?.data?.errors?.message, {
              statusCode: data.status,
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
        pending: (state, action) => {
          state.socialApploader = true;
        },
      },
      {
        rejected: (state, action) => {
          state.error = action.error;
          state.socialApploader = false;
        },
      },
      {
        fulfilled: (state, action) => {
          state.socialApploader = false;
          const prevPosts = state.socialAppPosts;
          state.socialAppPosts = [...prevPosts, action?.payload?.data?.response?.data];
        },
      },
    ),
    // ----------Get All  Post---------
    socialAppCreatePost: create.asyncThunk(async (payload, thunkAPI) => {
      try {
        const userId = thunkAPI.getState().user?.user?.id;
        let data = await createPost(userId, payload);
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
    }),

    uploadPostImage: create.asyncThunk(
      async (_, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await _uploadPostImage(_, userId);
          if (data?.status !== 201) {
            throw new ExternalError(data?.response?.data?.errors?.message, {
              statusCode: data.status,
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
          state.error = action.error;
          state.loading = false;
        },
        fulfilled: (state, action) => {
          state.loading = false;
        },
      },
    ),
    // ------Follow user reducer-------
    socialAppFollowUser: create.asyncThunk(
      async (payload, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await followUser(payload, userId);
          if (data?.status !== 201) {
            throw new ExternalError(data?.response?.data?.errors?.message, {
              statusCode: data.status,
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
          state.error = action.error;
          state.loading = false;
        },
        fulfilled: (state, action) => {
          state.loading = false;
          state.isUserFollowed = true;
        },
      },
    ),
    socialAppUnFollowUser: create.asyncThunk(
      async (payload, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await unfollowUser(payload, userId);
          if (data?.status !== 201) {
            throw new ExternalError(data?.response?.data?.errors?.message, {
              statusCode: data.status,
            });
          }
          return { userId: payload.userToUnfollow };
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
          state.error = action.error;
          state.loading = false;
        },
        fulfilled: (state, action) => {
          state.loading = false;
          state.isUserFollowed = true;
        },
      },
    ),
    updateActivity: create.asyncThunk(
      async (payload, thunkAPI) => {
        try {
          const { userId, postId, action, text } = payload;
          const response = await _updateActivity(userId, postId, action, text);
          if (response.status !== 201) {
            throw new ExternalError(response.data.errors.message, {
              statusCode: response.status,
            });
          }
          return response.data.response.data;
        } catch (err) {
          const message = get(err, 'message', 'Something Went Wrong!');
          const name = get(err, 'name', 'Error!');
          const statusCode = get(err, 'metadata.statusCode', '');
          return thunkAPI.rejectWithValue({ message, name, statusCode });
        }
      },
      {
        pending: (state) => {
          state.socialApploader = true;
        },
        rejected: (state, action) => {
          state.error = action.error;
          state.socialApploader = false;
        },
        fulfilled: (state, action) => {
          state.socialApploader = false;
          const updatedPost = action.payload;
          const index = state.socialAppPosts.findIndex(post => post._id === updatedPost._id);
          if (index !== -1) {
            state.socialAppPosts[index] = updatedPost;
          }
        },
      }
    ),
    getComments: create.asyncThunk(
      async ({ userId, postId }, thunkAPI) => {
        try {
          const response = await _getComments(userId, postId);
          if (response.status !== 200) {
            throw new ExternalError(response.data.errors.message, {
              statusCode: response.status,
            });
          }
          return response.data.response.data.activityDetails;
        } catch (err) {
          const message = get(err, 'message', 'Something Went Wrong!');
          const name = get(err, 'name', 'Error!');
          const statusCode = get(err, 'metadata.statusCode', '');
          return thunkAPI.rejectWithValue({ message, name, statusCode });
        }
      },
      {
        pending: (state) => {
          state.socialApploader = true;
        },
        rejected: (state, action) => {
          state.error = action.error;
          state.socialApploader = false;
        },
        fulfilled: (state, action) => {
          state.socialApploader = false;
          state.socialAppComments = action.payload;
        },
      }
    ),
    getPostDetails: create.asyncThunk(
      async ({ userId, postId }, thunkAPI) => {
        try {
          const response = await getPost(userId, postId);
          console.log('response', response);
          return response.data.response.data.activityDetails;
        } catch (err) {
          const message = get(err, 'message', 'Something Went Wrong!');
          const name = get(err, 'name', 'Error!');
          const statusCode = get(err, 'metadata.statusCode', '');
          return thunkAPI.rejectWithValue({ message, name, statusCode });
        }
      },
      {
        pending: (state) => {
          state.socialApploader = true;
        },
        rejected: (state, action) => {
          state.error = action.error;
          state.socialApploader = false;
        },
        fulfilled: (state, action) => {
          state.socialApploader = false;
          const updatedPost = action.payload;
          state.socialAppPosts = state.socialAppPosts.map((post) =>
            post._id === updatedPost._id ? updatedPost : post
          );
        },
      }
    )
  }),
});

export const {
  getUserAllPosts,
  getCompanyAllPosts,
  uploadPostImage,
  setSocialAppLimit,
  setSocialAppOffet,
  socialAppCreatePost,
  getSocialDashbordPosts,
  setIsUserFollowed,
  socialAppFollowUser,
  socialAppUnFollowUser,
  isModalShow,
  setSearchVisibleSocialApp,
  updateActivity,
  updateActivityLinkUnLink,
  getComments,
  getPostDetails,
} = socialAppSlice.actions;
export default socialAppSlice.reducer;

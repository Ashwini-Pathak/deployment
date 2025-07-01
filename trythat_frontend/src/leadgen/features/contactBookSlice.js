import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import {
  getContactBookData as _getContactBookData,
  getContactBookDataThroughSearch as _getContactBookDataThroughSearch,
  getContactBookStats as _getContactBookStats,
  postContactFeedback as _postContactFeedback,
  getPropertyReviews as _getPropertyReviews,
  getOrganizationReviews as _getOrganizationReviews,
} from '../services/contactBookAPI';
import { ExternalError } from '../../utils/error/error';
import { get } from 'lodash';
import { set_toast } from '../../universal/features/toastSlice';

const createSliceWithThunks = buildCreateSlice({
  creators: {
    asyncThunk: asyncThunkCreator,
  },
});

const initialState = {
  contactBookData: [],
  contactBookStats: {},
  loading: false,
  error: null,
  selectedKey: '',
  feedbackModalVisible: false,
  propertyReviews: [],
  organizationReviews: [],
  searchInputValue: '',
};

const contactBookSlice = createSliceWithThunks({
  name: 'contactBook',
  initialState,
  reducers: (create) => ({
    setFeedbackModalVisible: (state, action) => {
      state.feedbackModalVisible = action?.payload;
    },
    setSearchInputValue: (state, action) => {
      state.searchInputValue = action?.payload;
    },
    getContactBookData: create.asyncThunk(
      async (_, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await _getContactBookData(_, userId);
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
          state.contactBookData = [];
        },
        rejected: (state, action) => {
          state.loading = false;
          state.contactBookData = [];
        },
        fulfilled: (state, action) => {
          state.contactBookData = action?.payload?.data?.response?.data?.contacts;
          state.loading = false;
        },
      },
    ),
    getContactBookDataThroughSearch: create.asyncThunk(
      async (_, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await _getContactBookDataThroughSearch(_, userId);
          if (data?.status !== 201) {
            throw new ExternalError(data?.data?.response?.data?.errors?.[0]?.message, {
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
          state.contactBookData = [];
        },
        rejected: (state, action) => {
          state.loading = false;
          state.contactBookData = [];
        },
        fulfilled: (state, action) => {
          state.contactBookData = action?.payload?.data?.response?.data?.contact?.queryResults;
          state.loading = false;
        },
      },
    ),
    getContactBookStats: create.asyncThunk(
      async (_, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await _getContactBookStats(userId);
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
          state.contactBookStats = action?.payload?.data?.response?.data?.contactsStats;
          state.loading = false;
        },
      },
    ),
    getPropertyReviews: create.asyncThunk(
      async (_, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await _getPropertyReviews(_, userId);
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
          state.propertyReviews = action?.payload?.data?.response?.data;
          state.loading = false;
        },
      },
    ),
    getOrganizationReviews: create.asyncThunk(
      async (_, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await _getOrganizationReviews(_, userId);
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
          state.organizationReviews = action?.payload?.data?.response?.data;
          state.loading = false;
        },
      },
    ),
    postContactFeedback: create.asyncThunk(
      async (_, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await _postContactFeedback(_, userId);
          if (data?.status !== 201) {
            throw new ExternalError(data?.response?.data?.errors?.[0]?.message, {
              statusCode: data?.status,
            });
          }
          thunkAPI.dispatch(set_toast({ show: true, type: 'success', content: 'Reviews created successfully!' }));
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
          state.loading = true;
        },
        rejected: (state, action) => {
          state.loading = false;
          // state.feedbackModalVisible = false;
        },
        fulfilled: (state, action) => {
          state.contactBookStats = action?.payload?.data?.response?.data?.contactsStats;
          state.loading = false;
          state.feedbackModalVisible = false;
        },
      },
    ),
  }),
});

export const {
  getContactBookData,
  getContactBookDataThroughSearch,
  getContactBookStats,
  postContactFeedback,
  setFeedbackModalVisible,
  setSearchInputValue,
  getPropertyReviews,
  getOrganizationReviews,
} = contactBookSlice.actions;
// export const { setSelectedKey } = contactBookSlice.actions;
export default contactBookSlice.reducer;

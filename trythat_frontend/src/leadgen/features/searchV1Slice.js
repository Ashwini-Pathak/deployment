import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';
import {
  getDetailedOrganizationInfoAPI as _getDetailedOrganizationInfoAPI,
  deleteResourcesAPI,
  getDetailedConnectInfoAPI,
  getDetailedPropertyInfoAPI,
  getSearchResultsAPI,
  getWishlistContentAPI,
  saveResourcesAPI,
  unlockFieldsAPI,
} from '../services/searchAPI';
import { get } from 'lodash';
import { ExternalError } from '../../utils/error/error';
import { fetchUserPoints } from '../../universal/features/userOnboardingSlice';
import { set_toast } from '../../universal/features/toastSlice';

const createSliceWithThunks = buildCreateSlice({
  creators: {
    asyncThunk: asyncThunkCreator,
  },
});

const initialState = {
  propertyData: [],
  organizationsData: [],
  connectsData: [],
  organizationFullInfo: [],
  connectFullInfo: [],
  propertyFullInfo: [],
  searchClasifier: '',
  wishlist: {},
  searchQuery: {},
  pagination: { current: 1, pageSize: 5 },
  searchContext: 'connect',
};

const searchV1Slice = createSliceWithThunks({
  name: 'searchV1',
  initialState,
  reducers: (create) => ({
    showSearchBar: (state, action) => {
      state.searchVisible = action.payload;
    },
    reset_data: (state, action) => {
      state.organizationsData = [];
      state.propertyData = [];
      state.connectsData = [];
    },
    getSearchResults: create.asyncThunk(
      async (param, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          param.body.query = `${param.body.query}`;
          param.body.tag = `${thunkAPI.getState().searchV1.searchContext.toLowerCase()}`;
          let data = await getSearchResultsAPI(param, userId);
          if (data?.data?.response?.code !== 200) {
            throw new ExternalError(data?.data?.errors?.[0]?.message, {
              statusCode: data?.data?.response?.code,
            });
          }
          return data?.data?.response;
        } catch (err) {
          const message = get(err, 'message', 'Something Went Wrong!');
          const name = get(err, 'name', 'Error!');
          const statusCode = get(err, 'metadata.statusCode', '');
          return thunkAPI.rejectWithValue({ message, name, statusCode });
        }
      },
      {
        pending: (state) => {
          state.searchClasifier = '';
          state.propertyData = [];
          state.connectsData = [];
          state.organizationsData = [];
          state.loading = true;
        },
        rejected: (state, action) => {
          state.loading = false;
        },
        fulfilled: (state, action) => {
          state.loading = false;
          state.searchClasifier = action?.payload?.data?.tag;
          switch (action?.payload?.data?.tag) {
            case 'property': {
              state.propertyData = action?.payload?.data?.data;
              break;
            }
            case 'connect': {
              state.connectsData = action?.payload?.data?.data?.result;
              break;
            }
            case 'organization': {
              state.organizationsData = action?.payload?.data?.data?.result;
              break;
            }
          }
        },
      },
    ),
    setSearchQuery: (state, action) => {
      state.searchQuery = action?.payload;
    },
    setPagination: (state, action) => {
      state.pagination = action?.payload;
    },
    setSearchContext: (state, action) => {
      state.searchContext = action?.payload;
    },
    getOrganizationDataV1: create.asyncThunk(
      async (param, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await _getDetailedOrganizationInfoAPI(param, userId);
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
          state.organizationFullInfo = action?.payload?.data?.response?.data;
          state.loading = false;
        },
      },
    ),
    getConnectDataV1: create.asyncThunk(
      async (param, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await getDetailedConnectInfoAPI(param, userId);
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
          state.connectFullInfo = action?.payload?.data?.response?.data;
          state.loading = false;
        },
      },
    ),
    getPropertyDataV1: create.asyncThunk(
      async (param, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await getDetailedPropertyInfoAPI(param, userId);
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
          state.propertyFullInfo = action?.payload?.data?.response?.data;

          state.loading = false;
        },
      },
    ),
    deleteResources: create.asyncThunk(
      async (param, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await deleteResourcesAPI(param, userId);
          if (data?.status !== 200) {
            throw new ExternalError(data?.response?.data?.errors?.[0]?.message, {
              statusCode: data?.status,
            });
          }

          await thunkAPI.dispatch(fetchUserPoints());
          await thunkAPI.dispatch(getWishlistContent());
          return data?.data?.response?.data?.[0]?.document;
        } catch (err) {
          const message = get(err, 'message', 'Something Went Wrong!');
          const name = get(err, 'name', 'Error!');
          const statusCode = get(err, 'metadata.statusCode', '');
          return thunkAPI.rejectWithValue({ message, name, statusCode });
        }
      },
      {
        pending: (state) => {},
        rejected: (state, action) => {},
        fulfilled: (state, action) => {
          state.loading = false;

          state.loading = false;
          switch (action.payload?.resourceSubType) {
            case 'property': {
              state.propertyData = state.propertyData?.map((el) => {
                if (el._id === action.payload?.resourceId) {
                  return {
                    ...el,
                    isSaved: false,
                  };
                } else {
                  return el;
                }
              });
            }
            case 'organization': {
              state.organizationsData = state.organizationsData?.map((el) => {
                if (el._id === action.payload?.resourceId) {
                  return {
                    ...el,
                    isSaved: false,
                  };
                } else {
                  return el;
                }
              });
            }
            case 'connect': {
              state.connectsData = state.connectsData?.map((el) => {
                if (el._id === action.payload?.resourceId) {
                  return {
                    ...el,
                    isSaved: false,
                  };
                } else {
                  return el;
                }
              });
            }
          }
        },
      },
    ),
    saveResources: create.asyncThunk(
      async (param, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await saveResourcesAPI(param, userId);
          if (data?.status !== 201) {
            throw new ExternalError(data?.response?.data?.errors?.[0]?.message, {
              statusCode: data?.status,
            });
          }

          await thunkAPI.dispatch(fetchUserPoints());
          await thunkAPI.dispatch(getWishlistContent());
          return data?.data?.response?.data;
        } catch (err) {
          const message = get(err, 'message', 'Something Went Wrong!');
          const name = get(err, 'name', 'Error!');
          const statusCode = get(err, 'metadata.statusCode', '');
          return thunkAPI.rejectWithValue({ message, name, statusCode });
        }
      },
      {
        pending: (state) => {},
        rejected: (state, action) => {},
        fulfilled: (state, action) => {
          state.loading = false;
          switch (action.payload?.[0].resourceSubType) {
            case 'property': {
              state.propertyData = state.propertyData?.map((el) => {
                if (el._id === action.payload?.[0]?.resourceId) {
                  return {
                    ...el,
                    isSaved: true,
                  };
                } else {
                  return el;
                }
              });
            }
            case 'organization': {
              state.organizationsData = state.organizationsData?.map((el) => {
                if (el._id === action.payload?.[0]?.resourceId) {
                  return {
                    ...el,
                    isSaved: true,
                  };
                } else {
                  return el;
                }
              });
            }
            case 'connect': {
              state.connectsData = state.connectsData?.map((el) => {
                if (el._id === action.payload?.[0]?.resourceId) {
                  return {
                    ...el,
                    isSaved: true,
                  };
                } else {
                  return el;
                }
              });
            }
          }
        },
      },
    ),
    unlockConnectsFields: create.asyncThunk(
      async (param, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await unlockFieldsAPI(param, userId);

          if (data?.response?.status === 402) {
            throw new ExternalError(data?.response?.data?.errors?.message, {
              statusCode: data?.status,
            });
          }

          if (data?.status !== 200) {
            throw new ExternalError(data?.response?.data?.errors?.[0]?.message, {
              statusCode: data?.status,
            });
          }

          thunkAPI.dispatch(fetchUserPoints());
          return data?.data?.response?.data?.[0];
        } catch (err) {
          const message = get(err, 'message', 'Something Went Wrong!');
          const name = get(err, 'name', 'Error!');
          const statusCode = get(err, 'metadata.statusCode', '');
          thunkAPI.dispatch(set_toast({ show: true, type: 'warning', content: message }));
          return thunkAPI.rejectWithValue({ message, name, statusCode });
        }
      },
      {
        pending: (state) => {},
        rejected: (state, action) => {},
        fulfilled: (state, action) => {
          state.loading = false;
          state.connectsData = state.connectsData?.map((el) => {
            if (el?._id === action?.payload?._id) {
              return { ...action.payload, isExpanded: true };
            } else {
              return el;
            }
          });
        },
      },
    ),
    unlockOrganizationFields: create.asyncThunk(
      async (param, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await unlockFieldsAPI(param, userId);

          if (data?.response?.status === 402) {
            throw new ExternalError(data?.response?.data?.errors?.message, {
              statusCode: data?.status,
            });
          }

          if (data?.status !== 200) {
            throw new ExternalError(data?.response?.data?.errors?.[0]?.message, {
              statusCode: data?.status,
            });
          }

          thunkAPI.dispatch(fetchUserPoints());

          return data?.data?.response?.data?.[0];
        } catch (err) {
          const message = get(err, 'message', 'Something Went Wrong!');
          const name = get(err, 'name', 'Error!');
          const statusCode = get(err, 'metadata.statusCode', '');
          thunkAPI.dispatch(set_toast({ show: true, type: 'warning', content: message }));
          return thunkAPI.rejectWithValue({ message, name, statusCode });
        }
      },
      {
        pending: (state) => {},
        rejected: (state, action) => {},
        fulfilled: (state, action) => {
          state.loading = false;
          state.organizationsData = state.organizationsData?.map((el) => {
            if (el?._id === action?.payload?._id) {
              return { ...action.payload, isExpanded: true };
            } else {
              return el;
            }
          });
        },
      },
    ),
    unlockPropertyFields: create.asyncThunk(
      async (param, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await unlockFieldsAPI(param, userId);
          if (data?.response?.status === 402) {
            throw new ExternalError(data?.response?.data?.errors?.message, {
              statusCode: data?.status,
            });
          }
          if (data?.status !== 200) {
            throw new ExternalError(data?.response?.data?.errors?.[0]?.message, {
              statusCode: data?.status,
            });
          }

          thunkAPI.dispatch(fetchUserPoints());
          thunkAPI.dispatch(
            set_toast({
              show: true,
              type: 'success',
              content: 'Selected record(s) unlocked and available in contact book!',
            }),
          );
          return data?.data?.response?.data?.[0];
        } catch (err) {
          const message = get(err, 'message', 'Something Went Wrong!');
          const name = get(err, 'name', 'Error!');
          thunkAPI.dispatch(set_toast({ show: true, type: 'warning', content: message }));
          const statusCode = get(err, 'metadata.statusCode', '');
          return thunkAPI.rejectWithValue({ message, name, statusCode });
        }
      },
      {
        pending: (state) => {},
        rejected: (state, action) => {},
        fulfilled: (state, action) => {
          state.loading = false;
          state.propertyData = state.propertyData?.map((el) => {
            if (el?._id === action?.payload?._id) {
              return { ...action.payload, isExpanded: true };
            } else {
              return el;
            }
          });
        },
      },
    ),
    getWishlistContent: create.asyncThunk(
      async (param, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await getWishlistContentAPI(userId);
          if (data?.status !== 200) {
            throw new ExternalError(data?.response?.data?.errors?.[0]?.message, {
              statusCode: data?.status,
            });
          }

          return data?.data?.response?.data;
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
          state.loading = false;
          state.wishlist = action.payload;
        },
      },
    ),
  }),
});

export const {
  getSearchResults,
  getConnectDataV1,
  getOrganizationDataV1,
  getPropertyDataV1,
  deleteResources,
  saveResources,
  getWishlistContent,
  showSearchBar,
  reset_data,
  unlockPropertyFields,
  setSearchContext,
  unlockConnectsFields,
  unlockOrganizationFields,
  setSearchQuery,
  setPagination,
} = searchV1Slice.actions;
export default searchV1Slice.reducer;

import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';
import { ExternalError } from '../../utils/error/error';
import { get } from 'lodash';
import {
  deleteResourcesAPI,
  getConnectsFromOrganizationAPI,
  getDetailedConnectInfoAPI,
  getDetailedOrganizationInfoAPI,
  getDetailedPropertyInfoAPI,
  getOrganizationFromConnectsAPI,
  getOrganizationFromPropertyAPI,
  getOccupantsFromPropertyAPI,
  getPropertiesFromOrganizationAPI,
  getSearchResultsAPI,
  getWishlistContentAPI,
  getWishlistContentWithPointsAPI,
  saveResourcesAPI,
  unlockFieldsAPI,
  getOccupantDetailsFullInfoAPI,
  getResidentialDetailedPropertyInfoAPI,
  getResidentialUnitsFromPropertyAPI,
} from '../services/searchAPI';
import { fetchUserPoints } from '../../universal/features/userOnboardingSlice';
import { set_toast } from '../../universal/features/toastSlice';
import { FormatProperty } from '../../utils/formatSearchData/Property';

const createSliceWithThunks = buildCreateSlice({
  creators: {
    asyncThunk: asyncThunkCreator,
  },
});

const initialState = {
  loading: false,
  organizationsData: [],
  propertyData: [],
  connectsData: [],
  unitsData: [],
  residentialPropertyData: [],
  searchVisible: false,
  searchClasifier: '',
  column1View: '',
  column2View: '',
  column3View: '',
  wishlist: {},
  detailedConnectData: {},
  detailedPropertyData: {},
  detailedResidentialPropertyData: {},
  detailedOrganizationData: {},
  navigateFrom: '',
  occupantDetails: [],
  searchContext: 'commercialProperty',
  propertyToggle: true,
  pagination: {},
  searchQuery: {},
  hasMoreData: true,
  selectedPropertyId: '',
  organizationPagination: {},
  isSavedAllProperty: false,
  isSavedAllOrganization: false,
  isSavedAllConnects: false,
  isSavedAllResidentialProperty: false,
};

const handleSelectDeselectState = (state, action, isSaved) => {
  state.loading = false;

  const payloadArray = Array.isArray(action.payload) ? action.payload : [action.payload];
  const updateState = (data, payload, isSaved) => {
    return data.map((el) => {
      const match = payload.some((res) => res.resourceId === el._id);
      return match ? { ...el, isSaved } : el;
    });
  };

  const resourceSubType = payloadArray?.[0]?.resourceType === 'residential'
    ? 'residentialProperty'
    : payloadArray?.[0]?.resourceSubType;

  const setIsSavedAllFlag = (data) => {
    return data.every((item) => item.isSaved === true);
  };

  switch (resourceSubType) {
    case 'property':
      state.propertyData = updateState(state.propertyData, payloadArray, isSaved);
      state.isSavedAllProperty = setIsSavedAllFlag(state.propertyData);
      break;
    case 'organization':
      state.organizationsData = updateState(state.organizationsData, payloadArray, isSaved);
      state.isSavedAllOrganization = setIsSavedAllFlag(state.organizationsData);
      break;
    case 'connect':
      state.connectsData = updateState(state.connectsData, payloadArray, isSaved);
      state.isSavedAllConnects = setIsSavedAllFlag(state.connectsData);
      break;
    case 'units':
      state.unitsData = updateState(state.unitsData, payloadArray, isSaved);
      break;
    case 'residentialProperty':
      state.residentialPropertyData = updateState(state.residentialPropertyData, payloadArray, isSaved);
      state.isSavedAllResidentialProperty = setIsSavedAllFlag(state.residentialPropertyData);
      break;
    default:
      console.warn('resourceSubType not found');
  }
};

const searchSlice = createSliceWithThunks({
  name: 'search',
  initialState,
  reducers: (create) => ({
    showSearchBar: (state, action) => {
      state.searchVisible = action.payload;
    },
    setSavedAllProperty: (state, action) => {
      state.isSavedAllProperty = action.payload;
    },
    setSavedAllOrganization: (state, action) => {
      state.isSavedAllOrganization = action.payload;
    },
    setSavedAllConnects: (state, action) => {
      state.isSavedAllConnects = action.payload;
    },
    setSavedAllResidentialProperty: (state, action) => {
      state.isSavedAllResidentialProperty = action.payload;
    },
    setpropertyToggle: (state, action) => {
      state.propertyToggle = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
    setOrganizationPagination: (state, action) => {
      state.organizationPagination = action.payload;
    },
    setHasMoreData: (state, action) => {
      state.hasMoreData = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setDetailedPropertyData: (state, action) => {
      state.detailedPropertyData = FormatProperty(action?.payload);
    },
    setDetailedResidentialPropertyData: (state, action) => {
      state.detailedResidentialPropertyData = FormatProperty(action?.payload);
    },
    setDetailedOrganizationData: (state, action) => {
      state.detailedOrganizationData = action.payload;
    },
    setSearchContext: (state, action) => {
      state.searchContext = action?.payload;
    },
    setPropertyData: (state, action) => {
      state.propertyData = action?.payload;
    },
    reset_data: (state, action) => {
      state.organizationsData = [];
      state.propertyData = [];
      state.connectsData = [];
      state.residentialPropertyData = [];
      state.unitsData = [];
      state.column1View = '';
      state.column2View = '';
      state.column3View = '';
    },
    viewMoreProperty: (state, action) => {
      state.loading = true;
      state.organizationsData = [];
      state.connectsData = [];
      state.selectedPropertyId = action?.payload;
      state.organizationPagination = { offset: 0 };
    },
    viewMoreResidentialProperty: (state, action) => {
      state.loading = true;
      state.unitsData = [];
    },
    viewMoreResidentialProperty: (state, action) => {
      state.loading = true;
      state.unitsData = [];
    },
    viewLessProperty: (state, action) => {
      state.organizationsData = [];
      state.connectsData = [];
      state.selectedPropertyId = '';
      state.propertyData = state?.propertyData?.map((el) => {
        if (el?._id === action.payload) {
          return {
            ...el,
            isExpanded: false,
          };
        } else {
          return {
            ...el,
          };
        }
      });
    },
    viewLessResidentialProperty: (state, action) => {
      state.unitsData = [];
      state.residentialPropertyData = state?.residentialPropertyData?.map((el) => {
        if (el?._id === action.payload) {
          return {
            ...el,
            isExpanded: false,
          };
        } else {
          return {
            ...el,
          };
        }
      });
    },
    viewLessPropertyOrganizationFlow: (state, action) => {
      // state.organizationsData = [];
      // state.connectsData = [];
      state.propertyData = state?.propertyData?.map((el) => {
        if (el?._id === action.payload) {
          return {
            ...el,
            isExpanded: false,
          };
        } else {
          return {
            ...el,
          };
        }
      });
    },
    viewMoreOrganization: (state, action) => {
      state.loading = true;
    },
    viewLessOrganization: (state, action) => {
      state.connectsData = [];
      state.organizationsData = state?.organizationsData?.map((el) => {
        if (el?._id === action.payload) {
          return {
            ...el,
            isExpanded: false,
          };
        } else {
          return {
            ...el,
          };
        }
      });
    },
    viewMoreConnects: (state, action) => {
      state.loading = true;
      state.connectsData = state?.connectsData?.map((el) => {
        if (el?._id === action.payload) {
          return {
            ...el,
            isExpanded: true,
          };
        } else {
          return {
            ...el,
            isExpanded: false,
          };
        }
      });
    },
    viewMoreOrganizationConnectsFlow: (state, action) => {
      state.loading = true;
    },
    viewLessOrganizationConnectsFlow: (state, action) => {
      state.propertyData = [];
      state.organizationsData = state?.organizationsData?.map((el) => {
        if (el?._id === action.payload) {
          return {
            ...el,
            isExpanded: false,
          };
        } else {
          return {
            ...el,
          };
        }
      });
    },
    getSearchResults: create.asyncThunk(
      async (param, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          param.body.tag = thunkAPI.getState().search.propertyToggle
            ? `${thunkAPI.getState().search.searchContext}`
            : 'residentialProperty';
          let data = await getSearchResultsAPI(param, userId);
          if (data?.status !== 200) {
            throw new ExternalError(data?.response?.data?.errors?.[0]?.message, {
              statusCode: data?.status,
            });
          }
          thunkAPI.dispatch(setSearchQuery(param));
          if (data?.data?.response?.data?.tag === 'organization') {
            thunkAPI.dispatch(getConnectsFromOrganization(data?.data?.response?.data?.data?.[0]?._id));
          }
          if (data.data.response.data?.data?.length > 0) {
            thunkAPI.dispatch(setPagination({ offset: thunkAPI.getState().search.pagination?.offset + 10, limit: 10 }));
            thunkAPI.dispatch(setSavedAllProperty(false));
            thunkAPI.dispatch(setSavedAllResidentialProperty(false));
          } else {
            thunkAPI.dispatch(setHasMoreData(false));
          }
          return data.data.response.data;
        } catch (err) {
          const message = get(err, 'message', 'Something Went Wrong!');
          const name = get(err, 'name', 'Error!');
          const statusCode = get(err, 'metadata.statusCode', '');
          return thunkAPI.rejectWithValue({ message, name, statusCode });
        }
      },
      {
        pending: (state) => {
          // state.propertyData = [];
          state.connectsData = [];
          state.organizationsData = [];
          state.loading = true;
        },
        rejected: (state, action) => {
          state.loading = false;
        },
        fulfilled: (state, action) => {
          state.loading = false;
          state.searchClasifier = action.payload.tag;
          switch (action.payload.tag) {
            case 'commercialProperty': {
              state.column1View = 'Property';
              state.column2View = 'Company';
              state.column3View = 'Connects';
              state.propertyData.push(...(action?.payload?.data || []));
              break;
            }
            case 'residentialProperty': {
              state.column1View = 'ResidentialProperty';
              state.column2View = 'Units';
              state.residentialPropertyData.push(...(action?.payload?.data || []));
              break;
            }
            case 'connect': {
              state.column1View = 'Connects';
              state.column2View = 'Company';
              state.column3View = 'Property';
              state.connectsData.push(...(action?.payload?.data || []));
              break;
            }
            case 'organization': {
              state.column1View = 'Connects';
              state.column2View = 'Company';
              state.column3View = 'Property';
              state.organizationsData.push(...(action?.payload?.data || []));
              break;
            }
          }
        },
      },
    ),
    getDetailedPropertyInfo: create.asyncThunk(
      async (param, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await getDetailedPropertyInfoAPI(param, userId);
          if (data?.data?.response?.code !== 200) {
            throw new ExternalError(data?.data?.errors?.[0]?.message, {
              statusCode: data?.data?.response?.code,
            });
          }
          thunkAPI.dispatch(setDetailedPropertyData(data?.data?.response?.data?.[0]));
          const editedPayload = thunkAPI.getState().search?.propertyData?.map((ele) => {
            if (ele?._id === data?.data?.response?.data?.[0]?._id) {
              return { ...ele, ...data?.data?.response?.data?.[0], isExpanded: true };
            } else {
              return { ...ele, isExpanded: false };
            }
          });
          return editedPayload;
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
          state.propertyData = action.payload;
        },
      },
    ),

    getDetailedResidentialPropertyInfo: create.asyncThunk(
      async (param, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await getResidentialDetailedPropertyInfoAPI(param, userId);
          if (data?.data?.response?.code !== 200) {
            throw new ExternalError(data?.data?.errors?.[0]?.message, {
              statusCode: data?.data?.response?.code,
            });
          }
          thunkAPI.dispatch(setDetailedResidentialPropertyData(data?.data?.response?.data?.[0]));
          const editedPayload = thunkAPI.getState().search?.residentialPropertyData?.map((ele) => {
            if (ele?._id === data?.data?.response?.data?.[0]?._id) {
              return { ...ele, ...data?.data?.response?.data?.[0], isExpanded: true };
            } else {
              return { ...ele, isExpanded: false };
            }
          });
          return editedPayload;
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
          state.residentialPropertyData = action.payload;
        },
      },
    ),
    getOrganizationFromConnects: create.asyncThunk(
      async (param, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await getOrganizationFromConnectsAPI(param, userId);
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
        pending: (state) => {},
        rejected: (state, action) => {},
        fulfilled: (state, action) => {
          state.organizationsData = action.payload;
          state.loading = false;
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
        pending: (state) => {
          state.loading = true;
        },
        rejected: (state, action) => {
          state.loading = false;
        },
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
        pending: (state) => {
          state.loading = true;
        },
        rejected: (state, action) => {
          state.loading = false;
        },
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
        pending: (state) => {
          state.loading = true;
        },
        rejected: (state, action) => {
          state.loading = false;
        },
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
    getConnectsFromOrganization: create.asyncThunk(
      async (param, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await getConnectsFromOrganizationAPI(param, userId);
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
        pending: (state) => {},
        rejected: (state, action) => {},
        fulfilled: (state, action) => {
          state.connectsData = action?.payload;
          state.loading = false;
        },
      },
    ),
    getDetailedOrganizationInfo: create.asyncThunk(
      async (param, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await getDetailedOrganizationInfoAPI(param, userId);
          if (data?.status !== 200) {
            throw new ExternalError(data?.response?.data?.errors?.[0]?.message, {
              statusCode: data?.status,
            });
          }
          thunkAPI.dispatch(setDetailedOrganizationData(data?.data?.response?.data?.[0]));
          const editedPayload = thunkAPI.getState().search?.organizationsData?.map((ele) => {
            if (ele?._id === data?.data?.response?.data?.[0]?._id) {
              return { ...ele, ...data.data.response.data[0], isExpanded: true };
            } else {
              return { ...ele, isExpanded: false };
            }
          });

          return editedPayload;
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
          state.organizationsData = action?.payload;
          state.loading = false;
        },
      },
    ),
    getDetailedConnectInfo: create.asyncThunk(
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
          state.detailedConnectData = action.payload?.data?.response?.data;
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
          await thunkAPI.dispatch(getWishlistContentWithPoints());
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
        fulfilled: (state, action) => handleSelectDeselectState(state, action, false),
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
          await thunkAPI.dispatch(getWishlistContentWithPoints());
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
        fulfilled: (state, action) => handleSelectDeselectState(state, action, true),
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
    getWishlistContentWithPoints: create.asyncThunk(
      async (param, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await getWishlistContentWithPointsAPI(userId);
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
    getPropertiesFromOrganization: create.asyncThunk(
      async (param, thunkAPI) => {
        try {
          thunkAPI.dispatch(setPropertyData([]));
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await getPropertiesFromOrganizationAPI(param, userId);
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
        pending: (state) => {},
        rejected: (state, action) => {},
        fulfilled: (state, action) => {
          state.propertyData.push(...action?.payload);
          state.loading = false;
        },
      },
    ),
    getOrganizationFromProperty: create.asyncThunk(
      async (param, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          const offset = thunkAPI.getState().search.organizationPagination?.offset;
          let data = await getOrganizationFromPropertyAPI(param, userId, offset);
          if (data?.status !== 200) {
            throw new ExternalError(data?.response?.data?.errors?.[0]?.message, {
              statusCode: data?.status,
            });
          }
          if (data?.data?.response?.data?.length > 0) {
            thunkAPI.dispatch(
              setOrganizationPagination({
                offset: thunkAPI.getState().search.organizationPagination?.offset + 5,
                limit: 5,
              }),
            );
            thunkAPI.dispatch(setSavedAllOrganization(false));
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
          // state.organizationsData = action.payload;
          state.organizationsData.push(...action?.payload);
          state.loading = false;
        },
      },
    ),

    getUnitsFromProperty: create.asyncThunk(
      async (param, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await getResidentialUnitsFromPropertyAPI(param, userId);
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
          state.unitsData.push(...action?.payload);
          state.loading = false;
        },
      },
    ),

    getOccupantsFromProperty: create.asyncThunk(
      async (param, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await getOccupantsFromPropertyAPI(param, userId);
          if (data?.data?.response?.code !== 200) {
            throw new ExternalError(data?.data?.errors?.[0]?.message, {
              statusCode: data?.data?.response?.code,
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
        pending: (state) => {},
        rejected: (state, action) => {},
        fulfilled: (state, action) => {
          state.occupantsData = action?.payload;
          state.loading = false;
        },
      },
    ),
    setNavigateFrom: (state, action) => {
      state.navigateFrom = action?.payload;
    },
    getOccupantDetailsFullInfo: create.asyncThunk(
      async (param, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          const propertyId = thunkAPI.getState().search?.detailedPropertyData?._id;
          let data = await getOccupantDetailsFullInfoAPI(param, userId, propertyId);
          if (data?.data?.response?.code !== 200) {
            throw new ExternalError(data?.data?.response?.errors?.[0]?.message, {
              statusCode: data?.data?.response?.code,
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
          state.occupantDetails = action?.payload?.[0];
          state.loading = false;
        },
      },
    ),

    getUnitsFromProperty: create.asyncThunk(
      async (param, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await getResidentialUnitsFromPropertyAPI(param, userId);
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
          state.unitsData.push(...action?.payload);
          state.loading = false;
        },
      },
    ),

    getOccupantsFromProperty: create.asyncThunk(
      async (param, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await getOccupantsFromPropertyAPI(param, userId);
          if (data?.data?.response?.code !== 200) {
            throw new ExternalError(data?.data?.errors?.[0]?.message, {
              statusCode: data?.data?.response?.code,
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
        pending: (state) => {},
        rejected: (state, action) => {},
        fulfilled: (state, action) => {
          state.occupantsData = action?.payload;
          state.loading = false;
        },
      },
    ),
    setNavigateFrom: (state, action) => {
      state.navigateFrom = action?.payload;
    },
    getOccupantDetailsFullInfo: create.asyncThunk(
      async (param, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          const propertyId = thunkAPI.getState().search?.detailedPropertyData?._id;
          let data = await getOccupantDetailsFullInfoAPI(param, userId, propertyId);
          if (data?.data?.response?.code !== 200) {
            throw new ExternalError(data?.data?.response?.errors?.[0]?.message, {
              statusCode: data?.data?.response?.code,
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
          state.occupantDetails = action?.payload?.[0];
          state.loading = false;
        },
      },
    ),
  }),
});

export const {
  getSearchResults,
  showSearchBar,
  getDetailedPropertyInfo,
  reset_data,
  viewMoreProperty,
  viewLessProperty,
  getConnectsFromOrganization,
  getOrganizationFromProperty,
  viewMoreOrganization,
  viewLessOrganization,
  getDetailedOrganizationInfo,
  deleteResources,
  saveResources,
  getWishlistContent,
  getWishlistContentWithPoints,
  viewMoreConnects,
  getOrganizationFromConnects,
  getPropertiesFromOrganization,
  viewMoreOrganizationConnectsFlow,
  viewLessOrganizationConnectsFlow,
  getDetailedConnectInfo,
  unlockPropertyFields,
  unlockOrganizationFields,
  unlockConnectsFields,
  setDetailedPropertyData,
  setDetailedResidentialPropertyData,
  setDetailedOrganizationData,
  setNavigateFrom,
  getOccupantDetailsFullInfo,
  getOccupantsFromProperty,
  setSearchContext,
  viewLessPropertyOrganizationFlow,
  setpropertyToggle,
  viewMoreResidentialProperty,
  getDetailedResidentialPropertyInfo,
  getUnitsFromProperty,
  viewLessResidentialProperty,
  setPagination,
  setSearchQuery,
  setHasMoreData,
  setOrganizationPagination,
  setSavedAllProperty,
  setSavedAllOrganization,
  setSavedAllConnects,
  setSavedAllResidentialProperty,
  setPropertyData,
} = searchSlice.actions;
export default searchSlice.reducer;

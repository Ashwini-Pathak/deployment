import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';
import { get } from 'lodash';
import { ExternalError } from '../../utils/error/error';
import {
  addOfferingDetails,
  addUserPreferences,
  createCompany,
  associateCompany,
  fetchUserPoints as fetchPoints,
  fetchUserOnboardingDataAPI,
  getCompanyDetail,
  getOfferingData,
  getUserPreferences,
  postOnboardingData as pOData,
  getAllCompanyDetails,
  getAllIndustriesDetails,
  getUserPreferenceList,
  getCompanyFollowDetails,
  getIndustryDetails,
  updateOfferingDetails,
  postSelectPlanData,
  registerCrm as registerCrmUser,
  registerFms as registerFmsUser,
  registerOkr as registerOkrUser,
} from '../services/userOnboardingAPI';
import { setCRMData,setFMSData,setOKRData } from './userDashboardSlice';

const createSliceWithThunks = buildCreateSlice({
  creators: {
    asyncThunk: asyncThunkCreator,
  },
});

const initialState = {
  userOnboardingData: {},
  loading: false,
  error: null,
  userPoints: 0,
};

const userOnboardingSlice = createSliceWithThunks({
  name: 'userOnboarding',
  initialState,
  reducers: (create) => ({
    clearUserOnboardingData: (state, action) => {
      state.userOnboardingData = {};
    },
    saveScreenData: (state, action) => {
      state.userOnboardingData = true;
    },
    addUserPoints: (state, action) => {
      state.userPoints = parseInt(state.userPoints || 0) + parseInt(action?.payload || 0);
    },

    fetchUserOnboardingData: create.asyncThunk(
      async (_, thunkAPI) => {
        try {
          const userID = thunkAPI.getState().user.user.id;
          const data = await fetchUserOnboardingDataAPI(userID);
          if (data?.code !== 200) {
            throw new ExternalError(data?.response?.data?.errors?.[0]?.message, {
              statusCode: data.status,
            });
          }
          return data.data;
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
          state.userOnboardingData = action.payload;
        },
      },
    ),
    postOnboardingData: create.asyncThunk(
      async (pageData, thunkAPI) => {
        try {
          const userID = thunkAPI.getState().user.user.id;
          const data = await pOData(pageData, userID);
          if (data?.status !== 201) {
            throw new ExternalError(data?.response?.data?.errors?.[0]?.message, {
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
          state.loading = false;
        },
        fulfilled: (state, action) => {
          state.loading = false;
          state.userOnboardingData = action.payload?.data?.response?.data;
        },
      },
    ),
    // -------------Register CRM--------------
    registerCrm: create.asyncThunk(
      async (payload, thunkAPI) => {
        try {
          const userID = thunkAPI.getState().user.user.id;
          const data = await registerCrmUser(payload, userID);
          if (data?.status !== 201) {
            throw new ExternalError(data?.response?.data?.errors?.[0]?.message, {
              statusCode: data.status,
            });
          }
          thunkAPI.dispatch(setCRMData(data?.data?.response?.data));
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
          state.loading = false;
        },
      },
    ),
    // -------------Register FMS--------------
    registerFms: create.asyncThunk(
      async (payload, thunkAPI) => {
        try {
          const userID = thunkAPI.getState().user.user.id;
          const data = await registerFmsUser(payload, userID);
          if (data?.status !== 201) {
            throw new ExternalError(data?.response?.data?.errors?.[0]?.message, {
              statusCode: data.status,
            });
          }
          thunkAPI.dispatch(setFMSData(data?.data?.response?.data));
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
          state.loading = false;
          const redirectionUrl = action?.payload?.data?.response?.data?.url;
          // Redirect the user to the extracted URL
          window.location.href = redirectionUrl;   
        },
      },
    ),
     // -------------Register OKR--------------
     registerOkr: create.asyncThunk(
      async (payload, thunkAPI) => {
        try {
          const userID = thunkAPI.getState().user.user.id;
          const data = await registerOkrUser(payload, userID);
          if (data?.status !== 201) {
            throw new ExternalError(data?.response?.data?.errors?.[0]?.message, {
              statusCode: data.status,
            });
          }
          thunkAPI.dispatch(setOKRData(data?.data?.response?.data));
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
          state.loading = false;
          const redirectionUrl = action?.payload?.data?.response?.data?.url;
          // Redirect the user to the extracted URL
          window.location.href = redirectionUrl;        },
      },
    ),
    // -------------Create company------------
    userOnboardingCreateCompany: create.asyncThunk(async (payload, thunkAPI) => {
      try {
        const userID = thunkAPI.getState().user.user.id;
        const data = await createCompany(userID, payload);
        if (data?.status !== 201) {
          throw new ExternalError(data?.response?.data?.errors?.data?.message, {
            statusCode: data?.response?.status,
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
    // -------------associate company------------
    userOnboardingAssociateCompany: create.asyncThunk(async (payload, thunkAPI) => {
      try {
        const { companyId } = payload;
        const userID = thunkAPI.getState().user.user.id;
        const data = await associateCompany(userID, companyId, payload);
        if (data?.status !== 201) {
          throw new ExternalError(data?.response?.data?.errors?.[0]?.message, {
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
    }),
    // -------------get all company detail------------
    userOnboardingGetAllCompanyDetails: create.asyncThunk(async (_, thunkAPI) => {
      try {
        const userID = thunkAPI.getState().user.user.id;
        const data = await getAllCompanyDetails(userID);
        if (data?.status !== 200) {
          throw new ExternalError(data?.response?.data?.errors?.[0]?.message, {
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
    }),
    // -------------get all industries detail------------
    userOnboardingGetAllIndusteriesDetails: create.asyncThunk(async (_, thunkAPI) => {
      try {
        const userID = thunkAPI.getState().user.user.id;
        const data = await getAllIndustriesDetails(userID);
        if (data?.status !== 200) {
          throw new ExternalError(data?.response?.data?.errors?.[0]?.message, {
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
    }),
    // -------------get all industries detail------------
    userOnboardingGetIndustryDetails: create.asyncThunk(async (industryId, thunkAPI) => {
      try {
        const userID = thunkAPI.getState().user.user.id;
        const data = await getIndustryDetails(userID, industryId);
        if (data?.status !== 200) {
          throw new ExternalError(data?.response?.data?.errors?.[0]?.message, {
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
    }),
    // -------------get company detail------------
    userOnboardingGetCompany: create.asyncThunk(
      async (_, thunkAPI) => {
        try {
          const userID = thunkAPI.getState().user.user.id;
          const companyId = thunkAPI.getState().user?.userV2?.companyDetails?.companyId;
          const data = await getCompanyDetail(companyId, userID);
          if (data?.status !== 200) {
            throw new ExternalError(data?.response?.data?.errors?.[0]?.message, {
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
          state.loading = false;
        },
        fulfilled: (state, action) => {
          state.loading = false;
        },
      },
    ),
    // -------------get company detail------------
    userOnboardingGetCompanyFollowStats: create.asyncThunk(
      async (_, thunkAPI) => {
        try {
          const userID = thunkAPI.getState().user.user.id;
          const companyId = thunkAPI.getState().user?.userV2?.companyDetails?.companyId;
          const data = await getCompanyFollowDetails(
            {
              ownerId: companyId,
              type: 'company_post',
            },
            userID,
          );
          if (data?.status !== 200) {
            throw new ExternalError(data?.response?.data?.errors?.[0]?.message, {
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
          state.loading = false;
        },
        fulfilled: (state, action) => {
          state.loading = false;
        },
      },
    ),

    // -------------Add offering detail------------
    userOnboardingAddOfferings: create.asyncThunk(async ({ payload, type }, thunkAPI) => {
      try {
        const userID = thunkAPI.getState().user.user.id;
        const data = await addOfferingDetails(userID, payload, type);
        if (data?.status !== 201) {
          throw new ExternalError(data?.response?.data?.errors?.[0]?.message, {
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
    }),
    // -------------update offering detail------------
    userOnboardingUpdateOfferings: create.asyncThunk(async ({ payload, type, typeId }, thunkAPI) => {
      try {
        const userID = thunkAPI.getState().user.user.id;
        const data = await updateOfferingDetails(userID, payload, type, typeId);
        if (data?.status !== 200) {
          throw new ExternalError(data?.response?.data?.errors?.[0]?.message, {
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
    }),
    // -------------get  offering detail------------
    userOnboardingGetOfferings: create.asyncThunk(async (type, thunkAPI) => {
      try {
        const userID = thunkAPI.getState().user.user.id;
        const data = await getOfferingData(userID, type);
        if (data?.status !== 200) {
          throw new ExternalError(data?.response?.data?.errors?.[0]?.message, {
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
    }),
    // -------------Add perferences detail------------
    userOnboardingAddPreferences: create.asyncThunk(async (payload, thunkAPI) => {
      try {
        const userID = thunkAPI.getState().user.user.id;
        const data = await addUserPreferences(userID, payload);
        if (data?.status !== 201) {
          throw new ExternalError(data?.response?.data?.errors?.[0]?.message, {
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
    }),
    // -------------get  perferences detail------------
    userOnboardingGetPreferences: create.asyncThunk(async (_, thunkAPI) => {
      try {
        const userID = thunkAPI.getState().user.user.id;
        const data = await getUserPreferences(userID);
        if (data?.status !== 200) {
          throw new ExternalError(data?.response?.data?.errors?.[0]?.message, {
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
    }),
    // -------------get  perferences list------------
    userOnboardingGetPreferencesList: create.asyncThunk(async (preferenceType, thunkAPI) => {
      try {
        const userID = thunkAPI.getState().user.user.id;
        const data = await getUserPreferenceList(userID, preferenceType);
        if (data?.status !== 200) {
          throw new ExternalError(data?.response?.data?.errors?.[0]?.message, {
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
    }),

    fetchUserPoints: create.asyncThunk(
      async (_, thunkAPI) => {
        try {
          const userID = thunkAPI.getState().user.user.id;
          const data = await fetchPoints(userID);
          if (data?.status !== 200) {
            throw new ExternalError(data?.response?.data?.errors?.[0]?.message, {
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
          state.loading = false;
        },
        fulfilled: (state, action) => {
          state.loading = false;
          state.userPoints = action.payload?.data?.response?.data?.points;
        },
      },
    ),
    selectPlanPost: create.asyncThunk(async (payload, thunkAPI) => {
      try {
        const userID = thunkAPI.getState().user.user.id;
        const data = await postSelectPlanData(payload, userID);
        if (data?.status !== 200) {
          throw new ExternalError(data?.response?.data?.errors?.[0]?.message, {
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
    }),
  }),
});

export const {
  fetchUserOnboardingData,
  addUserPoints,
  clearUserOnboardingData,
  postOnboardingData,
  saveScreenData,
  fetchUserPoints,
  userOnboardingGetAllCompanyDetails,
  userOnboardingGetAllIndusteriesDetails,
  userOnboardingCreateCompany,
  userOnboardingAddOfferings,
  userOnboardingAddPreferences,
  userOnboardingGetPreferencesList,
  userOnboardingGetCompany,
  userOnboardingGetOfferings,
  userOnboardingUpdateOfferings,
  userOnboardingGetPreferences,
  userOnboardingAssociateCompany,
  userOnboardingGetCompanyFollowStats,
  userOnboardingGetIndustryDetails,
  selectPlanPost,
  registerCrm,
  registerFms,
  registerOkr,
} = userOnboardingSlice.actions;
export default userOnboardingSlice.reducer;

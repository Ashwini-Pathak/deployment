import { configureStore, combineReducers, createListenerMiddleware } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

// custom imports
// LEADGEN
import contactBookReducer from '../leadgen/features/contactBookSlice';
import searchSlice, {
  getConnectsFromOrganization,
  getDetailedOrganizationInfo,
  getDetailedPropertyInfo,
  getDetailedResidentialPropertyInfo,
  getOrganizationFromConnects,
  getOrganizationFromProperty,
  getPropertiesFromOrganization,
  getUnitsFromProperty,
  viewMoreConnects,
  viewMoreOrganization,
  viewMoreOrganizationConnectsFlow,
  viewMoreProperty,
  viewMoreResidentialProperty,
} from '../leadgen/features/searchSlice';
import searchV1Slice from '../leadgen/features/searchV1Slice';
import dashboardSlice from '../leadgen/features/dashboardSlice';

// LEADGEN
import userOnboardingSlice, {
  fetchUserOnboardingData,
  fetchUserPoints,
  postOnboardingData,
  saveScreenData,
} from '../universal/features/userOnboardingSlice';
import userDashboardSlice from '../universal/features/userDashboardSlice';
import registerSlice, {
  initSignUp,
  sendRegisterOtp,
  userRegister,
  userRegisterInit,
  verifyOtp,
  verifyOtpDB,
} from '../universal/features/registerSlice';
import userSlice, { setAccessToken, setUserData } from '../universal/features/userSlice';
import { isEmpty } from 'lodash';
import userStoreSlice from '../universal/features/userStoreSlice';
import loginSlice, {
  initLogin,
  loginInit,
  loginVerifyOtp,
  sendLoginOtp,
  userSignIn,
  verifyLoginOtp,
} from '../universal/features/loginSlice';
import toastSlice, { set_toast } from '../universal/features/toastSlice';
import myAccountSlice, { fetchUserProfileData, fetchUserProfileDataV2 } from '../universal/features/myAccountSlice';

import _ from 'lodash';
import savedSlice from '../leadgen/features/savedSlice';
import leadGenSideNavSlice from '../leadgen/features/leadGenSideNavSlice';
import universalSidenavSlice from '../leadgen/features/universalSidenavSlice';
import socialAppSlice from '../universal/features/socialAppSlice';

const rootReducer = combineReducers({
  contactBook: contactBookReducer,
  search: searchSlice,
  searchV1: searchV1Slice,
  dashboard: dashboardSlice,
  userOnboarding: userOnboardingSlice,
  userDashboard: userDashboardSlice,
  user: userSlice,
  register: registerSlice,
  userStore: userStoreSlice,
  login: loginSlice,
  toast: toastSlice,
  myAccount: myAccountSlice,
  saved: savedSlice,
  leadGenSideNav: leadGenSideNavSlice,
  universalSideNav: universalSidenavSlice,
  socialAppSlice: socialAppSlice,
});

const persistConfig = {
  key: `tt_app`,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: initSignUp,
  effect: async (action, listenerApi) => {
  listenerApi.dispatch(userRegisterInit({ body: action.payload }))
    .then(async (data)=>{
      listenerApi.dispatch(setUserData({ ...action.payload }));
        if (!isEmpty(listenerApi.getState().register.userId) && data.payload?.data) {
          listenerApi.dispatch(
            sendRegisterOtp({
              body: {
                userId: listenerApi.getState().register.userId,
                type: listenerApi.getState().register.otpMedium,
                data: action.payload.phone,
              },
            }),
          );
          listenerApi.cancelActiveListeners(); // <- pay attention
        }
    })
   
  },
});

listenerMiddleware.startListening({
  actionCreator: initLogin,
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(loginInit(action.payload));
    if (
      await listenerApi.condition((action, currentState) => {
        return !isEmpty(currentState.login.userId);
      })
    ) {
      listenerApi
        .dispatch(
          sendLoginOtp({
            body: {
              userId: listenerApi.getState().login.userId,
              type: listenerApi.getState().login.otpMedium,
              data: action.payload.body.data,
            },
          }),
        )
        .then((data) => {
          // listenerApi.dispatch(
          //   set_toast({
          //     type: 'success',
          //     content: 'OTP sent successfully!',
          //   }),
          // );
        })
        .catch((err) => {
          listenerApi.dispatch(
            set_toast({
              type: 'error',
              content: 'Something went wrong!',
            }),
          );
        });
      listenerApi.cancelActiveListeners(); // <- pay attention
    }
  },
});

listenerMiddleware.startListening({
  actionCreator: verifyLoginOtp,
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(
      loginVerifyOtp({
        body: {
          userId: listenerApi.getState().login.userId,
          type: listenerApi.getState().login.otpMedium,
          data: listenerApi.getState().login?.data,
          otp: action.payload.otp,
        },
      }),
    );

    if (
      await listenerApi.condition((action, currentState) => {
        return !isEmpty(currentState.login.userId);
      })
    ) {
      listenerApi
        .dispatch(
          userSignIn({
            body: {
              userId: listenerApi.getState().login.userId,
            },
          }),
        )
        .then((data) => {
          listenerApi.dispatch(setUserData(_.get(data, 'payload.data.response.data.user', '')));
          listenerApi.dispatch(setAccessToken(_.get(data, 'payload.data.response.data.accessToken', '')));
        });
      listenerApi.cancelActiveListeners(); // <- pay attention
    }
  },
});

listenerMiddleware.startListening({
  actionCreator: saveScreenData,
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(postOnboardingData(action.payload)).then((data) => {
      // listenerApi.dispatch(setUserData(_.get(data, "payload.data.response.data", "")));
      listenerApi.dispatch(fetchUserOnboardingData());
      listenerApi.dispatch(fetchUserPoints());
      listenerApi.dispatch(fetchUserProfileData());
    });
    listenerApi.cancelActiveListeners();
  },
});

listenerMiddleware.startListening({
  actionCreator: verifyOtp,
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(
      verifyOtpDB({
        body: {
          userId: listenerApi.getState().register.userId,
          type: listenerApi.getState().register.otpMedium,
          data:
            listenerApi.getState().register.otpMedium === 'phone'
              ? listenerApi.getState().user.user?.phone
              : listenerApi.getState().user.user?.email,
          otp: action.payload.otp,
        },
      }),
    );

    if (
      await listenerApi.condition((action, currentState) => {
        return currentState.register.otpMedium === 'email' && currentState.register.sendEmailOTP;
      })
    ) {
      listenerApi
        .dispatch(
          sendRegisterOtp({
            body: {
              userId: listenerApi.getState().register.userId,
              type: listenerApi.getState().register.otpMedium,
              data:
                listenerApi.getState().register.otpMedium === 'phone'
                  ? listenerApi.getState().user.user?.phone
                  : listenerApi.getState().user.user?.email,
            },
          }),
        )
        .then((data) => {
          listenerApi.dispatch(
            set_toast({
              type: 'success',
              content: 'OTP sent successfully!',
            }),
          );
        })
        .catch((err) => {
          listenerApi.dispatch(
            set_toast({
              type: 'error',
              content: 'Something went wrong!',
            }),
          );
        });
    }

    if (
      await listenerApi.condition((action, currentState) => {
        return currentState.register.authComplete.phoneVerified;
      }) &&  await listenerApi.condition((action, currentState) => {
        return currentState.register.authComplete.emailVerified
      })
    ) {
      listenerApi
        .dispatch(
          userRegister({
            body: {
              userId: listenerApi.getState().register.userId,
            },
          }),
        )
        .then((data) => {
          listenerApi.dispatch(setUserData(_.get(data, 'payload.data.response.data.user', '')));
          listenerApi.dispatch(setAccessToken(_.get(data, 'payload.data.response.data.accessToken')));
        });

      listenerApi.cancelActiveListeners(); // <- pay attention
    }
  },
});

listenerMiddleware.startListening({
  actionCreator: viewMoreProperty,
  effect: async (action, listenerApi) => {
    await listenerApi.dispatch(getDetailedPropertyInfo(action.payload));
    await listenerApi.dispatch(getOrganizationFromProperty(action.payload)).then((data) => {
      if (data?.payload?.[0]?._id) {
        listenerApi.dispatch(getConnectsFromOrganization(data?.payload?.[0]?._id));
      }
    });
  },
});

listenerMiddleware.startListening({
  actionCreator: viewMoreResidentialProperty,
  effect: async (action, listenerApi) => {
    await listenerApi.dispatch(getDetailedResidentialPropertyInfo(action.payload));
    await listenerApi.dispatch(getUnitsFromProperty(action.payload));
    // .then((data) => {
    //   console.log(data, 'data');
    //   if (data?.payload?.[0]?._id) {
    //     listenerApi.dispatch(getUnitsFromProperty(data?.payload?.[0]?._id));
    //   }
    // });
  },
});

listenerMiddleware.startListening({
  actionCreator: viewMoreConnects,
  effect: async (action, listenerApi) => {
    await listenerApi.dispatch(getOrganizationFromConnects(action.payload)).then((data) => {
      listenerApi.dispatch(getPropertiesFromOrganization(data?.payload?.[0]?._id));
    });
  },
});

listenerMiddleware.startListening({
  actionCreator: viewMoreOrganization,
  effect: async (action, listenerApi) => {
    await listenerApi.dispatch(getDetailedOrganizationInfo(action?.payload));
    await listenerApi.dispatch(getConnectsFromOrganization(action?.payload));
  },
});

listenerMiddleware.startListening({
  actionCreator: viewMoreOrganizationConnectsFlow,
  effect: async (action, listenerApi) => {
    await listenerApi.dispatch(getDetailedOrganizationInfo(action?.payload));
    await listenerApi.dispatch(getPropertiesFromOrganization(action?.payload));
  },
});

export const store = configureStore({
  reducer: persistedReducer,
  // devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).prepend(listenerMiddleware.middleware),
});

export const persistor = persistStore(store);

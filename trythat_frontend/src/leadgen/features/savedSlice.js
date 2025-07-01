import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';
import { getUserProspects as _getUserProspects, transactProspects as _transactProspects } from '../services/savedAPI';
import { get } from 'lodash';
import { ExternalError } from '../../utils/error/error';
import { set_toast } from '../../universal/features/toastSlice';
import { fetchUserPoints } from '../../universal/features/userOnboardingSlice';
import { fa } from '@faker-js/faker';

const createSliceWithThunks = buildCreateSlice({
  creators: {
    asyncThunk: asyncThunkCreator,
  },
});

const initialState = {
  userProspectsData: [],
  totalUserProspects: 0,
  transactionModal: false,
  transactionLoading: false,
  insufficientPoints: 0,
};

const saved = createSliceWithThunks({
  name: 'saved',
  initialState,
  reducers: (create) => ({
    setTransactionModal: (state, action) => {
      state.transactionModal = action?.payload;
    },
    setInsufficientPoints: (state, action) => {
      state.insufficientPoints = action?.payload;
    },
    getUserProspects: create.asyncThunk(
      async (_, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await _getUserProspects(_, userId);
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
          state.totalUserProspects = [];
        },
        rejected: (state, action) => {
          state.loading = false;
          state.totalUserProspects = [];
        },
        fulfilled: (state, action) => {
          state.userProspectsData = action?.payload?.data?.response?.data?.documents;
          state.totalUserProspects = action?.payload?.data?.response?.data?.totalCount;
          state.loading = false;
        },
      },
    ),
    transactProspects: create.asyncThunk(
      async (_, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await _transactProspects(_, userId);
          if (data?.status !== 200) {
            throw new ExternalError(data?.response?.data?.errors?.message, {
              statusCode: data?.response?.status,
              additionalPoints: data?.response?.data?.errors?.data?.additionalPoints,
            });
          }

          thunkAPI.dispatch(getUserProspects(0));
          thunkAPI.dispatch(fetchUserPoints());
          thunkAPI.dispatch(
            set_toast({
              show: true,
              type: 'success',
              content: 'Selected record(s) unlocked and available in contact book!',
            }),
          );
          return data;
        } catch (err) {
          const message = get(err, 'message', 'Something Went Wrong!');
          const name = get(err, 'name', 'Error!');
          const statusCode = get(err, 'metadata.statusCode', '');
          const additionalPoints = get(err, 'metadata.additionalPoints', '');
          if (statusCode !== 402) {
            thunkAPI.dispatch(set_toast({ show: true, type: 'warning', content: message }));
            return thunkAPI.rejectWithValue({ message, name, statusCode });
          }
          thunkAPI.dispatch(setTransactionModal(true));
          thunkAPI.dispatch(
            set_toast({
              show: true,
              type: 'warning',
              content: 'Transaction abort due to insufficient balance!',
            }),
          );
          thunkAPI.dispatch(setInsufficientPoints(additionalPoints));
        }
      },
      {
        pending: (state) => {
          state.transactionLoading = true;
        },
        rejected: (state, action) => {
          state.transactionLoading = false;
        },
        fulfilled: (state, action) => {
          state.transactionLoading = false;
          // state.transactionModal = false;
        },
      },
    ),
  }),
});

export const { getUserProspects, transactProspects, setTransactionModal, setInsufficientPoints } = saved.actions;
export default saved.reducer;

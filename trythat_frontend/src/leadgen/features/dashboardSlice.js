import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';
import { getUserProspectsStats as _getUserProspectsStats } from '../services/dashboardAPI';
import { get } from 'lodash';
import { ExternalError } from '../../utils/error/error';

const createSliceWithThunks = buildCreateSlice({
  creators: {
    asyncThunk: asyncThunkCreator,
  },
});

const initialState = {
  stats: {},
};

const dashboardSlice = createSliceWithThunks({
  name: 'dashboard',
  initialState,
  reducers: (create) => ({
    getUserProspectsStats: create.asyncThunk(
      async (_, thunkAPI) => {
        try {
          const userId = thunkAPI.getState().user?.user?.id;
          let data = await _getUserProspectsStats(_, userId);
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
          state.stats = action?.payload?.data?.response?.data;

          state.loading = false;
        },
      },
    ),
  }),
});

export const { getUserProspectsStats } = dashboardSlice.actions;
export default dashboardSlice.reducer;

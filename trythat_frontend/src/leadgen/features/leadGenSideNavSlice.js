import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';

const createSliceWithThunks = buildCreateSlice({
  creators: {
    asyncThunk: asyncThunkCreator,
  },
});

const initialState = {
  selectedNav: 'Home',
};

const leadGenSideNav = createSliceWithThunks({
  name: 'leadGenSideNav',
  initialState,
  reducers: (create) => ({
    setSelectedNav: (state, action) => {
      state.selectedNav = action?.payload;
    },
  }),
});

export const { setSelectedNav } = leadGenSideNav.actions;
export default leadGenSideNav.reducer;

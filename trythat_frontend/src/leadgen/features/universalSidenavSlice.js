import { asyncThunkCreator, buildCreateSlice } from '@reduxjs/toolkit';

const createSliceWithThunks = buildCreateSlice({
  creators: {
    asyncThunk: asyncThunkCreator,
  },
});

const initialState = {
  selectedNav: 'Home',
};

const universalSideNav = createSliceWithThunks({
  name: 'universalSideNav',
  initialState,
  reducers: (create) => ({
    setSelectedNav: (state, action) => {
      state.selectedNav = action?.payload;
    },
  }),
});

export const { setSelectedNav } = universalSideNav.actions;
export default universalSideNav.reducer;

import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';

const createSliceWithThunks = buildCreateSlice({
  creators: {
    asyncThunk: asyncThunkCreator,
  },
});

const initialState = {
  _toast: {
    type: '',
    content: '',
    show: false,
  },
};

const toastSlice = createSliceWithThunks({
  name: 'toast',
  initialState,
  reducers: (create) => ({
    set_toast: (state, action) => {
      state._toast.type = action.payload.type;
      state._toast.content = action.payload.content;
      state._toast.show = true;
    },
    disable_toast: (state, action) => {
      state._toast.type = '';
      state._toast.content = '';
      state._toast.show = false;
    },
  }),
});

export const { set_toast, disable_toast } = toastSlice.actions;
export default toastSlice.reducer;

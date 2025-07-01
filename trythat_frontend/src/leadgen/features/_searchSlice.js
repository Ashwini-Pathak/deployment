import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPropertyData, getOrganizationData, getContactsData } from '../services/searchAPI';

const fetchPropertyList = createAsyncThunk('search/fetchPropertyList', async (searchQuery) => {
  return await getPropertyData(searchQuery);
});

const fetchOrganizationList = createAsyncThunk('search/fetchOrganizationList', async (id) => {
  return await getOrganizationData(id);
});

const fetchContactList = createAsyncThunk('search/fetchContactList', async (id) => {
  return await getContactsData(id);
});

const initialState = {
  searchQuery: '',
  showSearchBar: false,
  propertyData: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    showSearchBar: (state, action) => {
      state.showSearchBar = action.payload;
    },
    setPropertyData: (state, action) => {
      state.propertyData = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPropertyList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchPropertyList.fulfilled, (state, action) => {
        state.loading = false;
        state.propertyData = action?.payload;
      })
      .addCase(fetchPropertyList.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchOrganizationList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchOrganizationList.fulfilled, (state, action) => {
        state.loading = false;
        let finalPropertyList;
        if (action?.payload.length == 0) {
          finalPropertyList = state?.propertyData;
        } else {
          finalPropertyList = state?.propertyData?.map((data) => {
            let newItem = { ...data };
            if (data.id === action?.payload[0].propertyId) newItem.organizationList = action?.payload;
            return newItem;
          });
        }
        state.propertyData = finalPropertyList;
      })
      .addCase(fetchOrganizationList.rejected, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchContactList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchContactList.fulfilled, (state, action) => {
        state.loading = false;
        state.propertyData = action?.payload;
      })
      .addCase(fetchContactList.rejected, (state, action) => {
        state.loading = true;
      });
  },
});

export const { showSearchBar, setPropertyData, setSearchQuery } = searchSlice.actions;
export { fetchPropertyList, fetchOrganizationList, fetchContactList };
export default searchSlice.reducer;

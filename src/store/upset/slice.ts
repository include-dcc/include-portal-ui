import { createSlice } from '@reduxjs/toolkit';

import { fetchUpsetCoOccuringConditions } from './thunks';
import { initialState } from './types';

export const UpsetState: initialState = {
  cooccuringconditions: {
    data: [],
    loading: false,
    error: false,
  },
};

const upsetSlice = createSlice({
  name: 'upset',
  initialState: UpsetState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUpsetCoOccuringConditions.pending, (state) => {
      state.cooccuringconditions.loading = true;
      state.cooccuringconditions.error = false;
    });
    builder.addCase(fetchUpsetCoOccuringConditions.fulfilled, (state, action) => {
      state.cooccuringconditions.loading = false;
      state.cooccuringconditions.data = action.payload.data;
    });
    builder.addCase(fetchUpsetCoOccuringConditions.rejected, (state) => {
      state.cooccuringconditions.loading = false;
      state.cooccuringconditions.error = true;
    });
  },
});

export const upsetActions = upsetSlice.actions;
export default upsetSlice.reducer;

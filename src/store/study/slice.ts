import { createSlice } from '@reduxjs/toolkit';

import { InitialState } from './type';

export const studyState: InitialState = {
  study: {},
};

const studySlice = createSlice({
  name: 'study',
  initialState: studyState,
  reducers: {},
});

export const studyActions = studySlice.actions;
export default studySlice.reducer;

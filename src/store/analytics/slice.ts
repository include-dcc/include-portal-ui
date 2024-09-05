import { createSlice } from '@reduxjs/toolkit';

import { fetchTranscriptomicsFacets, fetchTranscriptomicsSampleGeneExp } from './thunks';
import { initialState } from './types';

export const AnalyticsState: initialState = {
  transcriptomics: {
    facets: {
      loading: false,
      data: undefined,
      error: false,
    },
    sampleGeneExp: {
      loading: false,
      data: undefined,
      error: false,
    },
  },
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: AnalyticsState,
  reducers: {},
  extraReducers: (builder) => {
    // Facets
    builder.addCase(fetchTranscriptomicsFacets.pending, (state) => {
      state.transcriptomics.facets.loading = true;
    });
    builder.addCase(fetchTranscriptomicsFacets.fulfilled, (state) => {
      state.transcriptomics.facets.loading = false;
    });
    builder.addCase(fetchTranscriptomicsFacets.rejected, (state) => {
      state.transcriptomics.facets.loading = false;
    });
    // Facets
    builder.addCase(fetchTranscriptomicsSampleGeneExp.pending, (state) => {
      state.transcriptomics.facets.loading = true;
    });
    builder.addCase(fetchTranscriptomicsSampleGeneExp.fulfilled, (state) => {
      state.transcriptomics.sampleGeneExp.loading = false;
    });
    builder.addCase(fetchTranscriptomicsSampleGeneExp.rejected, (state) => {
      state.transcriptomics.sampleGeneExp.loading = false;
    });
  },
});

export const analyticsActions = analyticsSlice.actions;
export default analyticsSlice.reducer;

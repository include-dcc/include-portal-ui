import { createSlice } from '@reduxjs/toolkit';

import {
  fetchTranscriptomicsDiffGeneExp,
  fetchTranscriptomicsFacets,
  fetchTranscriptomicsSampleGeneExp,
} from './thunks';
import { initialState } from './types';

export const AnalyticsState: initialState = {
  transcriptomics: {
    facets: {
      loading: false,
      data: undefined,
      error: false,
    },
    diffGeneExp: {
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
      state.transcriptomics.facets.error = false;
    });
    builder.addCase(fetchTranscriptomicsFacets.fulfilled, (state, action) => {
      state.transcriptomics.facets.loading = false;
      state.transcriptomics.facets.data = action.payload.facets;
    });
    builder.addCase(fetchTranscriptomicsFacets.rejected, (state) => {
      state.transcriptomics.facets.loading = false;
      state.transcriptomics.facets.error = true;
    });
    // DiffGeneExp
    builder.addCase(fetchTranscriptomicsDiffGeneExp.pending, (state) => {
      state.transcriptomics.diffGeneExp.loading = true;
      state.transcriptomics.diffGeneExp.error = false;
    });
    builder.addCase(fetchTranscriptomicsDiffGeneExp.fulfilled, (state, action) => {
      state.transcriptomics.diffGeneExp.loading = false;
      state.transcriptomics.diffGeneExp.data = action.payload.diffGeneExp;
    });
    builder.addCase(fetchTranscriptomicsDiffGeneExp.rejected, (state) => {
      state.transcriptomics.diffGeneExp.loading = false;
      state.transcriptomics.diffGeneExp.error = true;
    });
    // SampleGeneExp
    builder.addCase(fetchTranscriptomicsSampleGeneExp.pending, (state) => {
      state.transcriptomics.sampleGeneExp.loading = true;
      state.transcriptomics.sampleGeneExp.error = false;
    });
    builder.addCase(fetchTranscriptomicsSampleGeneExp.fulfilled, (state, action) => {
      state.transcriptomics.sampleGeneExp.loading = false;
      state.transcriptomics.sampleGeneExp.data = action.payload.sampleGeneExp;
    });
    builder.addCase(fetchTranscriptomicsSampleGeneExp.rejected, (state) => {
      state.transcriptomics.sampleGeneExp.loading = false;
      state.transcriptomics.sampleGeneExp.error = true;
    });
  },
});

export const analyticsActions = analyticsSlice.actions;
export default analyticsSlice.reducer;

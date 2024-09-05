import { RootState } from '../types';

export const transcriptomicsFacetsSelector = (state: RootState) =>
  state.analytics.transcriptomics.facets;

export const transcriptomicsSampleGeneExpSelector = (state: RootState) =>
  state.analytics.transcriptomics.sampleGeneExp;

export type { initialState as AnalyticsInitialState } from './types';

import { useSelector } from 'react-redux';

import { transcriptomicsFacetsSelector, transcriptomicsSampleGeneExpSelector } from './selector';

export { default, AnalyticsState } from './slice';

export const useTranscriptomicsFacet = () => {
  const facets = useSelector(transcriptomicsFacetsSelector);
  return facets;
};

export const useTranscriptomicsSampleGeneExp = () => {
  const sampleGeneExp = useSelector(transcriptomicsSampleGeneExpSelector);
  return sampleGeneExp;
};

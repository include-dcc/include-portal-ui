export type { initialState as AnalyticsInitialState } from './types';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchTranscriptomicsDiffGeneExp,
  fetchTranscriptomicsFacets,
  fetchTranscriptomicsSampleGeneExp,
} from 'store/analytics/thunks';

import {
  transcriptomicsDiffGeneExpSelector,
  transcriptomicsFacetsSelector,
  transcriptomicsSampleGeneExpSelector,
} from './selector';

export { default, AnalyticsState } from './slice';

export const useTranscriptomicsFacets = () => {
  const dispatch = useDispatch();
  const facets = useSelector(transcriptomicsFacetsSelector);
  useEffect(() => {
    dispatch(fetchTranscriptomicsFacets());
  }, []);
  return facets;
};

export const useTranscriptomicsDiffGeneExp = () => {
  const dispatch = useDispatch();
  const diffGeneExp = useSelector(transcriptomicsDiffGeneExpSelector);

  useEffect(() => {
    dispatch(fetchTranscriptomicsDiffGeneExp());
  }, []);
  return diffGeneExp;
};

export const useTranscriptomicsSampleGeneExp = (id: string) => {
  const dispatch = useDispatch();
  const sampleGeneExp = useSelector(transcriptomicsSampleGeneExpSelector);

  useEffect(() => {
    dispatch(fetchTranscriptomicsSampleGeneExp({ id }));
  }, [id]);
  return sampleGeneExp;
};

import { createAsyncThunk } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';

import { TranscriptomicsApi } from 'services/api/transcriptomics';
import {
  ITranscriptomicsFacets,
  ITranscriptomicsSampleGeneExp,
  TTranscriptomicsDiffGeneExp,
} from 'services/api/transcriptomics/models';

import { RootState } from '../types';
import { handleThunkApiResponse } from '../utils';

// @TODO: could be a get
export const fetchTranscriptomicsFacets = createAsyncThunk<
  {
    facets?: ITranscriptomicsFacets;
  },
  void,
  { rejectValue: string; state: RootState }
>(
  'transcriptomics/facets/fetch',
  async (_, thunkAPI) => {
    const { data, error } = await TranscriptomicsApi.fetchFacets();

    return handleThunkApiResponse({
      error,
      data: {
        facets: data,
      },
      reject: thunkAPI.rejectWithValue,
    });
  },
  {
    condition: (_, { getState }) => {
      const { analytics } = getState();
      return isEmpty(analytics.transcriptomics.facets.data);
    },
  },
);

export const fetchTranscriptomicsDiffGeneExp = createAsyncThunk<
  {
    diffGeneExp?: TTranscriptomicsDiffGeneExp[];
  },
  void,
  { rejectValue: string; state: RootState }
>(
  'transcriptomics/diffGeneExp/fetch',
  async (_, thunkAPI) => {
    const { data, error } = await TranscriptomicsApi.fetchDiffGeneExp();

    return handleThunkApiResponse({
      error,
      data: {
        diffGeneExp: data,
      },
      reject: thunkAPI.rejectWithValue,
    });
  },
  {
    condition: (_, { getState }) => {
      const { analytics } = getState();
      return isEmpty(analytics.transcriptomics.sampleGeneExp.data);
    },
  },
);

// @TODO: could be a get
export const fetchTranscriptomicsSampleGeneExp = createAsyncThunk<
  {
    sampleGeneExp?: ITranscriptomicsSampleGeneExp;
  },
  { id: string },
  { rejectValue: string; state: RootState }
>('transcriptomics/sampleGeneExp/fetch', async (args, thunkAPI) => {
  const { data, error } = await TranscriptomicsApi.fetchSampleGeneExp(args.id);

  return handleThunkApiResponse({
    error,
    data: {
      sampleGeneExp: data,
    },
    reject: thunkAPI.rejectWithValue,
  });
});

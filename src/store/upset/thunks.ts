import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ArrangerApi } from 'services/api/arranger';
import { IArrangerUpset } from 'services/api/arranger/models';
import { RootState } from 'store/types';
import { handleThunkApiResponse } from 'store/utils';

export const fetchUpsetCoOccuringConditions = createAsyncThunk<
  {
    data: IArrangerUpset[];
  },
  {
    sqon: ISqonGroupFilter;
    topN: number;
  },
  { rejectValue: string; state: RootState }
>('upset/cooccuringconditions/fetch', async (args, thunkAPI) => {
  const { data, error } = await ArrangerApi.fetchCoOccuringConditions(args.sqon, args.topN);

  return handleThunkApiResponse({
    error,
    data,
    reject: thunkAPI.rejectWithValue,
  });
});

import { createAsyncThunk } from '@reduxjs/toolkit';
import { IStudyEntity } from 'graphql/studies/models';

import { StudyApi } from 'services/api/study';
import { IStudyFetchParams } from 'services/api/study/model';
import { RootState } from 'store/types';
import { handleThunkApiReponse } from 'store/utils';

export const fetchStudy = createAsyncThunk<
  {
    study?: IStudyEntity;
  },
  IStudyFetchParams,
  { state: RootState }
>('study/fetch', async (args, thunkAPI) => {
  const { data, error } = await StudyApi.fetch(args);

  return handleThunkApiReponse({
    error,
    data: {
      study: data?.data!,
    },
    reject: thunkAPI.rejectWithValue,
  });
});

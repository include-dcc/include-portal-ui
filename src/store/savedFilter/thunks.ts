import intl from 'react-intl-universal';
import { setQueryBuilderState } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';
import { v4 } from 'uuid';

import { FILTER_TAG_QB_ID_MAPPING } from 'common/queryBuilder';
import { SavedFilterApi } from 'services/api/savedFilter';
import {
  TUserSavedFilter,
  TUserSavedFilterInsert,
  TUserSavedFilterUpdate,
} from 'services/api/savedFilter/models';
import { globalActions } from 'store/global';
import { handleThunkApiReponse } from 'store/utils';

const fetchSavedFilters = createAsyncThunk<
  TUserSavedFilter[],
  void | string,
  { rejectValue: string }
>('savedfilters/fetch', async (tag, thunkAPI) => {
  const { data, error } = await SavedFilterApi.fetchAll(tag as string);

  return handleThunkApiReponse({
    error,
    data: data || [],
    reject: thunkAPI.rejectWithValue,
  });
});

const fetchSharedSavedFilter = createAsyncThunk<
  TUserSavedFilter | undefined,
  string,
  { rejectValue: string }
>('shared/savedFilters/fetch', async (id, thunkAPI) => {
  const { data, error } = await SavedFilterApi.fetchById(id);

  if (data) {
    setQueryBuilderState(FILTER_TAG_QB_ID_MAPPING[data.tag], {
      active: isEmpty(data.queries) ? v4() : data.queries[0].id,
      state: data.queries ?? [],
    });
  }

  return handleThunkApiReponse({
    error,
    data: data,
    reject: thunkAPI.rejectWithValue,
  });
});

const createSavedFilter = createAsyncThunk<
  TUserSavedFilter,
  TUserSavedFilterInsert,
  { rejectValue: string }
>('savedfilters/create', async (filter, thunkAPI) => {
  const { data, error } = await SavedFilterApi.create(filter);

  return handleThunkApiReponse({
    error,
    data: data!,
    reject: thunkAPI.rejectWithValue,
    onError: () =>
      thunkAPI.dispatch(
        globalActions.displayMessage({
          type: 'error',
          content: intl.get('api.savedFilter.error.messageUpdate'),
        }),
      ),
    onSuccess: () =>
      thunkAPI.dispatch(
        globalActions.displayMessage({
          type: 'success',
          content: intl.get('api.savedFilter.success.messageSaved'),
        }),
      ),
  });
});

const updateSavedFilter = createAsyncThunk<
  TUserSavedFilter,
  TUserSavedFilterUpdate & { id: string },
  { rejectValue: string }
>('savedfilters/update', async (filter, thunkAPI) => {
  const { id, ...filterInfo } = filter;
  const { data, error } = await SavedFilterApi.update(id, filterInfo);

  return handleThunkApiReponse({
    error,
    data: data!,
    reject: thunkAPI.rejectWithValue,
    onError: () =>
      thunkAPI.dispatch(
        globalActions.displayNotification({
          type: 'error',
          message: intl.get('api.savedFilter.error.title'),
          description: intl.get('api.savedFilter.error.messageUpdate'),
        }),
      ),
    onSuccess: () =>
      thunkAPI.dispatch(
        globalActions.displayMessage({
          type: 'success',
          content: intl.get('api.savedFilter.success.messageSaved'),
          duration: 5,
        }),
      ),
  });
});

const setSavedFilterAsDefault = createAsyncThunk<
  TUserSavedFilter,
  TUserSavedFilterUpdate & { id: string },
  { rejectValue: string }
>('savedfilters/setDefault', async (filter, thunkAPI) => {
  const { id, ...filterInfo } = filter;
  const { data, error } = await SavedFilterApi.setAsDefault(id, filterInfo);

  return handleThunkApiReponse({
    error,
    data: data!,
    reject: thunkAPI.rejectWithValue,
  });
});

const deleteSavedFilter = createAsyncThunk<string, string, { rejectValue: string }>(
  'savedfilters/delete',
  async (id, thunkAPI) => {
    const { data, error } = await SavedFilterApi.destroy(id);

    return handleThunkApiReponse({
      error,
      data: data!,
      reject: thunkAPI.rejectWithValue,
      onError: () =>
        thunkAPI.dispatch(
          globalActions.displayNotification({
            type: 'error',
            message: intl.get('api.savedFilter.error.title'),
            description: intl.get('api.savedFilter.error.messageDelete'),
          }),
        ),
      onSuccess: () =>
        thunkAPI.dispatch(
          globalActions.displayMessage({
            type: 'success',
            content: intl.get('api.savedFilter.success.messageDeleted'),
          }),
        ),
    });
  },
);

export {
  fetchSavedFilters,
  createSavedFilter,
  updateSavedFilter,
  deleteSavedFilter,
  setSavedFilterAsDefault,
  fetchSharedSavedFilter,
};

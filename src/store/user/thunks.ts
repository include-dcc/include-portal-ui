import intl from 'react-intl-universal';
import { TColumnStates } from '@ferlab/ui/core/components/ProTable/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { cloneDeep, get, keys, merge, set } from 'lodash';

import { UserApi } from 'services/api/user';
import { TNewsletterSubscribe, TUser, TUserConfig, TUserUpdate } from 'services/api/user/models';
import { globalActions } from 'store/global';
import { RootState } from 'store/types';
import { handleThunkApiResponse } from 'store/utils';

import { userActions } from './slice';

const fetchUser = createAsyncThunk<TUser, void, { rejectValue: string; state: RootState }>(
  'user/fetch',
  async (_, thunkAPI) => {
    const { data, error } = await UserApi.fetch();

    if (!error) {
      return data!;
    }

    return thunkAPI.rejectWithValue(error?.message);
  },
  {
    condition: (_, { getState }) => {
      const { user } = getState();
      if (user.userInfo) {
        return false;
      }
    },
  },
);

const updateUser = createAsyncThunk<
  TUser,
  {
    data: TUserUpdate;
    callback?: () => void;
  },
  { rejectValue: string }
>(
  'user/update',
  async (args, thunkAPI) => {
    const { data, error } = await UserApi.update(args.data);

    return handleThunkApiResponse({
      error,
      data: data!,
      reject: thunkAPI.rejectWithValue,
      onSuccess: args.callback,
    });
  },
  {
    condition: (args) => {
      if (Object.keys(args.data).length < 1) {
        return false;
      }
    },
  },
);

const unsubscribeNewsletter = createAsyncThunk<
  TUser,
  {
    callback?: () => void;
  },
  { rejectValue: string }
>('user/update', async (args, thunkAPI) => {
  const { data, error } = await UserApi.unsubscribeNewsletter();

  if (error) {
    thunkAPI.dispatch(
      globalActions.displayNotification({
        type: 'error',
        message: intl.get('screen.profileSettings.cards.newsletter.error.title'),
        description: intl.get('screen.profileSettings.cards.newsletter.error.unsubscribeMessage'),
      }),
    );
  }

  return handleThunkApiResponse({
    error,
    data: data!,
    reject: thunkAPI.rejectWithValue,
    onSuccess: args.callback,
  });
});

const subscribeNewsletter = createAsyncThunk<
  TUser,
  {
    data: TNewsletterSubscribe;
    callback?: () => void;
  },
  { rejectValue: string }
>(
  'user/update',
  async (args, thunkAPI) => {
    const { data, error } = await UserApi.subscribeNewsletter({
      newsletter_email: args.data.newsletter_email,
    });

    if (error) {
      thunkAPI.dispatch(
        globalActions.displayNotification({
          type: 'error',
          message: intl.get('screen.profileSettings.cards.newsletter.error.title'),
          description: intl.get('screen.profileSettings.cards.newsletter.error.subscribeMessage'),
        }),
      );
    }

    return handleThunkApiResponse({
      error,
      data: data!,
      reject: thunkAPI.rejectWithValue,
      onSuccess: args.callback,
    });
  },
  {
    condition: (args) => {
      if (Object.keys(args.data).length < 1) {
        return false;
      }
    },
  },
);

const refreshNewsletterStatus = createAsyncThunk<
  TUser,
  {
    callback?: () => void;
  },
  { rejectValue: string }
>('user/update', async (args, thunkAPI) => {
  const { data, error } = await UserApi.refreshNewsletter();

  return handleThunkApiResponse({
    error,
    data: data!,
    reject: thunkAPI.rejectWithValue,
    onSuccess: args.callback,
  });
});

export const cleanupConfig = (updateConfig: TUserConfig, config?: TUserConfig): TUserConfig => {
  // keep last item
  const removeDuplicates = (cols: TColumnStates) =>
    cols.filter((c, i) => !cols.some((other, j) => c.key === other.key && j > i));

  const configMerged = merge(cloneDeep(config), cloneDeep(updateConfig));
  // for every tables in config replace columns with no duplicates
  if (updateConfig.data_exploration?.tables) {
    // for every tables in config replace columns with no duplicates
    keys(configMerged.data_exploration?.tables).forEach((key) => {
      const path = 'data_exploration.tables.' + key + '.columns';
      const cols = get(configMerged, path, []);
      set(configMerged, path, removeDuplicates(cols));
    });

    return configMerged;
  } else if (updateConfig.data_exploration?.summary && config?.data_exploration?.summary) {
    config.data_exploration.summary = updateConfig.data_exploration.summary;
    return config;
  }

  return configMerged;
};

const updateUserConfig = createAsyncThunk<TUserConfig, TUserConfig, { state: RootState }>(
  'user/updateConfig',
  async (config, thunkAPI) => {
    const state = thunkAPI.getState();
    const mergedConfig = cleanupConfig(cloneDeep(config), cloneDeep(state?.user?.userInfo?.config));
    await UserApi.update({ config: mergedConfig });

    return mergedConfig;
  },
  {
    condition: (config) => Object.keys(config).length > 0,
  },
);

const deleteUser = createAsyncThunk<void, void, { rejectValue: string; state: RootState }>(
  'user/delete/user',
  async (_, thunkAPI) => {
    const { error } = await UserApi.deleteUser();

    return handleThunkApiResponse({
      error: error,
      data: undefined,
      reject: thunkAPI.rejectWithValue,
      onSuccess: () => thunkAPI.dispatch(userActions.cleanLogout()),
      onError: () =>
        thunkAPI.dispatch(
          globalActions.displayNotification({
            type: 'error',
            message: 'Error',
            description: 'Unable to delete your account at the moment',
          }),
        ),
    });
  },
);

export {
  fetchUser,
  updateUser,
  updateUserConfig,
  subscribeNewsletter,
  unsubscribeNewsletter,
  refreshNewsletterStatus,
  deleteUser,
};

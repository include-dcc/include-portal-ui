import { createAsyncThunk } from '@reduxjs/toolkit';

import { UserApi } from 'services/api/user';
import { TUser, TUserConfig, TUserUpdate } from 'services/api/user/models';
import { globalActions } from 'store/global';
import { RootState } from 'store/types';
import { handleThunkApiReponse } from 'store/utils';
import { mergeDeep } from 'utils/object';

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

    return handleThunkApiReponse({
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

const updateUserConfig = createAsyncThunk<
  TUserConfig,
  TUserConfig,
  { rejectValue: string; state: RootState }
>(
  'user/update/config',
  async (config, thunkAPI) => {
    const { user } = thunkAPI.getState();

    const deepCopyUserConfig = JSON.parse(JSON.stringify(user.userInfo?.config));
    const deepCopyNewConfig = JSON.parse(JSON.stringify(config));
    const mergedConfig = mergeDeep<TUserConfig>(deepCopyUserConfig, deepCopyNewConfig);

    const { error } = await UserApi.update({
      config: mergedConfig,
    });

    return handleThunkApiReponse({
      error: error,
      data: mergedConfig,
      reject: thunkAPI.rejectWithValue,
    });
  },
  {
    condition: (config) => {
      if (Object.keys(config).length < 1) {
        return false;
      }
    },
  },
);

const deleteProfileImage = createAsyncThunk<TUser, void, { rejectValue: string; state: RootState }>(
  'user/delete/profileImage',
  async (_, thunkAPI) => {
    const { error, data } = await UserApi.deleteProfileImage();

    return handleThunkApiReponse({
      error: error,
      data: data!,
      reject: thunkAPI.rejectWithValue,
      onError: () =>
        thunkAPI.dispatch(
          globalActions.displayNotification({
            type: 'error',
            message: 'Error',
            description: 'Unable to delete your profile image',
          }),
        ),
    });
  },
);

const deleteUser = createAsyncThunk<void, void, { rejectValue: string; state: RootState }>(
  'user/delete/user',
  async (_, thunkAPI) => {
    const { error } = await UserApi.deleteUser();

    return handleThunkApiReponse({
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

export { fetchUser, updateUser, updateUserConfig, deleteUser, deleteProfileImage };

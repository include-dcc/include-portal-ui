import axios from 'axios';
import EnvironmentVariables from 'helpers/EnvVariables';
import { roleOptions, usageOptions } from 'views/Community/contants';

import { sendRequest } from 'services/api';

import { TProfileImagePresignedOutput, TUser, TUserUpdate } from './models';

export const USERS_API_URL_USER = `${EnvironmentVariables.configFor('USERS_API')}/user`;
export const USERS_API_URL = `${EnvironmentVariables.configFor('USERS_API')}`;

export const headers = (contentType: string = 'application/json') => ({
  'Content-Type': contentType,
});

const fetch = () =>
  sendRequest<TUser>({
    method: 'GET',
    url: USERS_API_URL_USER,
    headers: headers(),
  });

const search = ({
  pageIndex = 0,
  pageSize = 15,
  match,
  sort,
  roles,
  dataUses,
}: {
  pageIndex?: number;
  pageSize?: number;
  match?: string;
  sort?: string;
  roles?: string;
  dataUses?: string;
}) =>
  sendRequest<{
    users: TUser[];
    total: number;
  }>({
    method: 'GET',
    url: `${USERS_API_URL_USER}/search`,
    headers: headers(),
    params: {
      pageIndex: pageIndex,
      pageSize: pageSize,
      match,
      sort,
      roles,
      dataUses,
      roleOptions: roleOptions.map(({ value }) => value).join(','),
      usageOptions: usageOptions.map(({ value }) => value).join(','),
    },
  });

const update = (body: TUserUpdate) =>
  sendRequest<TUser>({
    method: 'PUT',
    url: USERS_API_URL_USER,
    headers: headers(),
    data: body,
  });

const deleteUser = () =>
  sendRequest<void>({
    method: 'DELETE',
    url: USERS_API_URL_USER,
    headers: headers(),
  });

const uploadImageToS3 = async (file: File | Blob) => {
  const result = await sendRequest<TProfileImagePresignedOutput>({
    method: 'GET',
    url: `${USERS_API_URL_USER}/image/presigned`,
    headers: headers(),
  });

  if (result.error) {
    throw new Error(result.error.message);
  }

  await axios.request({
    method: 'PUT',
    url: result.data?.presignUrl!,
    data: file,
    headers: headers('image/jpeg'),
  });

  return result.data?.s3Key;
};

export const UserApi = {
  search,
  fetch,
  update,
  deleteUser,
  uploadImageToS3,
};

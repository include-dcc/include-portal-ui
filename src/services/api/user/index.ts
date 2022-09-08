import EnvironmentVariables from 'helpers/EnvVariables';
import { sendRequest } from 'services/api';
import { TUser, TUserUpdate } from './models';

export const USER_API_URL = `${EnvironmentVariables.configFor('USERS_API')}/user`;

export const headers = () => ({
  'Content-Type': 'application/json',
});

const fetch = () =>
  sendRequest<TUser>({
    method: 'GET',
    url: USER_API_URL,
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
    url: `${USER_API_URL}/search`,
    headers: headers(),
    params: {
      pageIndex: pageIndex,
      pageSize: pageSize,
      match,
      sort,
      roles,
      dataUses,
    },
  });

const update = (body: TUserUpdate) =>
  sendRequest<TUser>({
    method: 'PUT',
    url: USER_API_URL,
    headers: headers(),
    data: body,
  });

const deleteUser = () =>
  sendRequest<void>({
    method: 'DELETE',
    url: USER_API_URL,
    headers: headers(),
  });

export const UserApi = {
  search,
  fetch,
  update,
  deleteUser,
};

import EnvironmentVariables from 'helpers/EnvVariables';
import { roleOptions, usageOptions } from 'views/Community/contants';

import { sendRequest } from 'services/api';

import { TNewsletterSubscribe, TUser, TUserUpdate } from './models';

export const USER_API_URL = `${EnvironmentVariables.configFor('USERS_API')}/user`;
export const NEWSLETTER_API_URL = `${EnvironmentVariables.configFor('USERS_API')}/newsletter`;

export const headers = () => ({
  'Content-Type': 'application/json',
});

const fetch = () =>
  sendRequest<TUser>({
    method: 'GET',
    url: USER_API_URL,
    headers: headers(),
  });

export interface ISearchParams {
  pageIndex?: number;
  pageSize?: number;
  match?: string;
  sort?: string;
  roles?: string;
  dataUses?: string;
}

const search = ({ pageIndex = 0, pageSize = 15, match, sort, roles, dataUses }: ISearchParams) =>
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
      roleOptions: roleOptions.map(({ value }) => value).join(','),
      usageOptions: usageOptions.map(({ value }) => value).join(','),
    },
  });

const update = (body: TUserUpdate) =>
  sendRequest<TUser>({
    method: 'PUT',
    url: USER_API_URL,
    headers: headers(),
    data: body,
  });

const refreshNewsletter = () =>
  sendRequest<TUser>({
    method: 'PUT',
    url: `${NEWSLETTER_API_URL}/refresh`,
    headers: headers(),
  });

const subscribeNewsletter = (body: TNewsletterSubscribe) =>
  sendRequest<TUser>({
    method: 'PUT',
    url: `${NEWSLETTER_API_URL}/subscribe`,
    headers: headers(),
    data: body,
  });

const unsubscribeNewsletter = () =>
  sendRequest<TUser>({
    method: 'PUT',
    url: `${NEWSLETTER_API_URL}/unsubscribe`,
    headers: headers(),
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
  subscribeNewsletter,
  unsubscribeNewsletter,
  refreshNewsletter,
};

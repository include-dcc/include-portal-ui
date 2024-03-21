import { TUser } from 'services/api/user/models';

export type initialState = {
  userInfo: TUser | null;
  isLoading: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  newsletterError?: string;
  error?: string;
};

export enum SubscriptionStatus {
  SUBSCRIBED = 'subscribed',
  UNSUBSCRIBED = 'unsubscribed',
  FAILED = 'failed',
}

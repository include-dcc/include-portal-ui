import React, { ReactElement } from 'react';
import { AuthClientError, AuthClientEvent } from '@react-keycloak/core/';
import { ReactKeycloakProvider as KeycloakProvider } from '@react-keycloak/web';
import { notification } from 'antd';
import keycloak from 'auth/keycloak-api/keycloak';
import EnvVariables from 'helpers/EnvVariables';

import { trackAuthError, trackAuthSuccess } from 'services/analytics';

export interface IProvider {
  children: React.ReactNode;
}

const eventLogger = (eventType: AuthClientEvent, error?: AuthClientError) => {
  const keySessionExpiredNotification = 'key_session_expired_notification';
  if (EnvVariables.configFor('ENV') === 'development' && error) {
    trackAuthError();
    console.error('eventLogger ', 'eventType ', eventType);
    console.error('eventLogger ', 'error ', error);
  }

  if (eventType === 'onAuthSuccess') {
    trackAuthSuccess();
    notification.close(keySessionExpiredNotification);
  }

  if (eventType === 'onAuthRefreshError') {
    notification.open({
      key: keySessionExpiredNotification,
      type: 'warning',
      message: 'Session expired',
      description: 'Your session has expired. To continue, you must log in again.',
      duration: 0,
    });
  }
};

const Keycloak = ({ children }: IProvider): ReactElement => (
  <KeycloakProvider
    authClient={keycloak}
    onEvent={eventLogger}
    initOptions={{ enableLogging: false }}
  >
    {children}
  </KeycloakProvider>
);

export default Keycloak;

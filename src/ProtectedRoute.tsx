import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

import { HASH_DATASET_KEY, REDIRECT_URI_KEY } from 'common/constants';
import PageLayout from 'components/Layout';
import { useUser } from 'store/user';
import { STATIC_ROUTES } from 'utils/routes';

type TProtectedRoute = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: TProtectedRoute) => {
  const { userInfo, error } = useUser();
  const location = useLocation();
  const { keycloak } = useKeycloak();
  const userNeedsToLogin = !userInfo || !keycloak.authenticated;
  const params = new URLSearchParams(location.hash.substring(1));
  const dataset_id = params.get(HASH_DATASET_KEY);

  if (error) {
    return <Navigate to={STATIC_ROUTES.ERROR} />;
  }

  if (userNeedsToLogin) {
    return (
      <Navigate
        to={{
          pathname: STATIC_ROUTES.LOGIN,
          search: `${REDIRECT_URI_KEY}=${location?.pathname}${location?.search}`,
          hash: dataset_id ? `${HASH_DATASET_KEY}=${dataset_id}` : undefined,
        }}
      />
    );
  }

  if (location.pathname === STATIC_ROUTES.LOGIN) {
    return <Navigate to={STATIC_ROUTES.DASHBOARD} />;
  }

  return (
    <PageLayout>
      <>{children}</>
    </PageLayout>
  );
};

export default ProtectedRoute;

import React from 'react';
import intl from 'react-intl-universal';
import { useKeycloak } from '@react-keycloak/web';
import { Button, Space } from 'antd';

import { REDIRECT_URI_KEY } from 'common/constants';
import useQueryParams from 'hooks/useQueryParams';
import { STATIC_ROUTES } from 'utils/routes';

import IncludeIconLogin from '../../../components/Icons/IncludeIconLogin';

import MondoChart from './MondoChart';

import styles from './index.module.scss';

const TopBanner = () => {
  const { keycloak } = useKeycloak();
  const query = useQueryParams();

  const handleSignin = async () => {
    const url = keycloak.createLoginUrl({
      redirectUri: `${window.location.origin}/${
        query.get(REDIRECT_URI_KEY) || STATIC_ROUTES.STUDIES
      }`,
      locale: intl.getInitOptions().currentLocale,
    });
    window.location.assign(url);
  };

  return (
    <div className={styles.topBanner}>
      <div className={styles.contentContainer}>
        <div className={styles.content}>
          <div className={styles.title}>
            <IncludeIconLogin />
            {intl.get('screen.loginPage.title')}
          </div>
          <div className={styles.subtitle}>{intl.getHTML('screen.loginPage.subtitle')}</div>
          <div className={styles.description}>{intl.get('screen.loginPage.resume')}</div>
          <Space size={8}>
            <Button type="primary" size="large" data-cy="Login" onClick={handleSignin}>
              {intl.get('screen.loginPage.login')}
            </Button>
            <Button ghost size="large" data-cy="Signup" onClick={handleSignin}>
              {intl.get('screen.loginPage.signup')}
            </Button>
          </Space>
        </div>
        <MondoChart />
      </div>
    </div>
  );
};

export default TopBanner;

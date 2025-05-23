import intl from 'react-intl-universal';
import { useLocation } from 'react-router';
import { useKeycloak } from '@react-keycloak/web';
import { Button, Space } from 'antd';

import { HASH_DATASET_KEY, REDIRECT_URI_KEY } from 'common/constants';
import IncludeIconLogin from 'components/Icons/IncludeIconLogin';
import useQueryParams from 'hooks/useQueryParams';
import { STATIC_ROUTES } from 'utils/routes';

import styles from './index.module.css';

const LoginForm = () => {
  const { keycloak } = useKeycloak();
  const query = useQueryParams();
  const location = useLocation();
  const params = new URLSearchParams(location.hash.substring(1));
  const dataset_id = params.get(HASH_DATASET_KEY);

  const handleSignin = async () => {
    const url = keycloak.createLoginUrl({
      redirectUri: `${window.location.origin}/${
        query.get(REDIRECT_URI_KEY) || STATIC_ROUTES.STUDIES
      }${dataset_id ? `#${HASH_DATASET_KEY}=${dataset_id}` : ''}`,
      locale: intl.getInitOptions().currentLocale,
    });
    window.location.assign(url);
  };

  return (
    <div className={styles.form}>
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
  );
};

export default LoginForm;

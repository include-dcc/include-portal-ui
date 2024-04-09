import intl from 'react-intl-universal';
import { useKeycloak } from '@react-keycloak/web';
import { Button, Divider, Space, Typography } from 'antd';

import { REDIRECT_URI_KEY } from 'common/constants';
import IncludeIconLogin from 'components/Icons/IncludeIconLogin';
import DataRelease from 'components/uiKit/DataRelease';
import useQueryParams from 'hooks/useQueryParams';
import { STATIC_ROUTES } from 'utils/routes';

import styles from './index.module.scss';

const { Title } = Typography;

const Login = (): React.ReactElement => {
  const { keycloak } = useKeycloak();
  const query = useQueryParams();

  const handleSignin = async () => {
    const url = keycloak.createLoginUrl({
      redirectUri: `${window.location.origin}/${
        query.get(REDIRECT_URI_KEY) || STATIC_ROUTES.DASHBOARD
      }`,
    });
    window.location.assign(url);
  };

  return (
    <div className={styles.loginPageContent}>
      <div className={styles.loginContainer}>
        <Space size={48} direction="vertical">
          <div className={styles.logoTitleContainer}>
            <IncludeIconLogin />
            <Title level={4} className={styles.logotTitle}>
              {intl.get('screen.loginPage.title')}
            </Title>
          </div>
          <div className={styles.loginStats}>
            <Title level={4} className={styles.statsTitle}>
              {intl.get('screen.loginPage.datarelease.title')}
            </Title>
            <Divider className={styles.statsDivider} />
            <DataRelease className={styles.dataRelease} />
          </div>
          <div className={styles.loginDescription}>
            <Title level={2} className={styles.loginDescTitle}>
              {intl.getHTML('screen.loginPage.message')}
            </Title>
            <span className={styles.loginDescText}>
              {intl.get('screen.loginPage.accessLargeScale')}
            </span>
          </div>
          <Space className={styles.loginButtons} size={16}>
            <Button type={'primary'} onClick={handleSignin} size={'large'}>
              {intl.get('screen.loginPage.login')}
            </Button>
            <Button onClick={handleSignin} ghost size={'large'}>
              {intl.get('screen.loginPage.signup')}
            </Button>
          </Space>
        </Space>
      </div>
    </div>
  );
};
export default Login;

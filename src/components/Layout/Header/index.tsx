import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  DownOutlined,
  FileSearchOutlined,
  HomeOutlined,
  LogoutOutlined,
  ReadOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { useKeycloak } from '@react-keycloak/web';
import { Button, Dropdown, PageHeader, Space, Typography } from 'antd';
import { getFTEnvVarByKey } from 'helpers/EnvVariables';

import { IncludeKeycloakTokenParsed } from 'common/tokenTypes';
import { AlterTypes } from 'common/types';
import NotificationBanner from 'components/featureToggle/NotificationBanner';
import ExternalLinkIcon from 'components/Icons/ExternalLinkIcon';
import IncludeIcon from 'components/Icons/IncludeIcon';
import LineStyleIcon from 'components/Icons/LineStyleIcon';
import HeaderLink from 'components/Layout/Header/HeaderLink';
import style from 'components/Layout/Header/index.module.scss';
import UserAvatar from 'components/UserAvatar';
import { useUser } from 'store/user';
import { userActions } from 'store/user/slice';
import { STATIC_ROUTES } from 'utils/routes';

const iconSize = { width: 14, height: 14 };
const FT_FLAG_KEY = 'SITE_WIDE_BANNER';
const BANNER_TYPE_KEY = FT_FLAG_KEY + '_TYPE';
const BANNER_MSG_KEY = FT_FLAG_KEY + '_MSG';

const Header = () => {
  const { userInfo } = useUser();
  const dispatch = useDispatch();
  const { keycloak } = useKeycloak();
  const history = useHistory();
  const currentPathName = history.location.pathname;
  const tokenParsed = keycloak.tokenParsed as IncludeKeycloakTokenParsed;

  return (
    <>
      <NotificationBanner
        className={style.siteWideBanner}
        featureToggleKey={FT_FLAG_KEY}
        type={getFTEnvVarByKey<AlterTypes>(BANNER_TYPE_KEY, 'warning')}
        message={getFTEnvVarByKey(BANNER_MSG_KEY)}
        banner
        closable
      />
      <PageHeader
        title={<IncludeIcon className={style.logo} />}
        subTitle={
          <nav className={style.headerList}>
            <HeaderLink
              key="dashboard"
              currentPathName={currentPathName}
              to={STATIC_ROUTES.DASHBOARD}
              icon={<HomeOutlined />}
              title={intl.get('layout.main.menu.dashboard')}
            />
            <HeaderLink
              key="studies"
              currentPathName={currentPathName}
              to={STATIC_ROUTES.STUDIES}
              icon={<ReadOutlined />}
              title={intl.get('layout.main.menu.studies')}
            />
            <HeaderLink
              key="explore-data"
              currentPathName={currentPathName}
              to={[
                STATIC_ROUTES.DATA_EXPLORATION,
                STATIC_ROUTES.DATA_EXPLORATION_SUMMARY,
                STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS,
                STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS,
                STATIC_ROUTES.DATA_EXPLORATION_DATAFILES,
              ]}
              icon={<FileSearchOutlined />}
              title={intl.get('layout.main.menu.explore')}
            />
            <HeaderLink
              key="variant-data"
              currentPathName={currentPathName}
              to={[STATIC_ROUTES.VARIANTS]}
              icon={<LineStyleIcon />}
              title={intl.get('layout.main.menu.variants')}
            />
          </nav>
        }
        extra={[
          <HeaderLink
            key="community"
            currentPathName={currentPathName}
            to={STATIC_ROUTES.COMMUNITY}
            icon={<TeamOutlined />}
            title={intl.get('layout.main.menu.community')}
          />,
          <ExternalLink key="include-website" href="https://includedcc.org">
            <Button key="external-website" className={style.headerBtn}>
              {intl.get('layout.main.menu.website')}{' '}
              <ExternalLinkIcon className={style.icon} {...iconSize} />
            </Button>
          </ExternalLink>,
          <ExternalLink key="include-help" href="https://help.includedcc.org">
            <Button key="external-help" className={style.headerBtn}>
              {intl.get('layout.main.menu.help')}{' '}
              <ExternalLinkIcon className={style.icon} {...iconSize} />
            </Button>
          </ExternalLink>,
          <Dropdown
            key="user-menu"
            trigger={['click']}
            menu={{
              items: [
                {
                  key: 'email',
                  disabled: true,
                  label: (
                    <Space size={4} className={style.userMenuEmail}>
                      <Typography.Text>Signed in with</Typography.Text>
                      <Typography.Text strong>
                        {tokenParsed.email || tokenParsed.identity_provider_identity}
                      </Typography.Text>
                    </Space>
                  ),
                },
                {
                  type: 'divider',
                },
                {
                  key: 'profile_settings',
                  label: (
                    <Link to={STATIC_ROUTES.PROFILE_SETTINGS}>
                      <Space>
                        <UserOutlined />
                        {intl.get('layout.user.menu.settings')}
                      </Space>
                    </Link>
                  ),
                },
                {
                  key: 'logout',
                  label: (
                    <Space>
                      <LogoutOutlined />
                      {intl.get('layout.user.menu.logout')}
                    </Space>
                  ),
                  onClick: () => dispatch(userActions.cleanLogout()),
                },
              ],
            }}
          >
            <a className={style.userMenuTrigger} onClick={(e) => e.preventDefault()} href="">
              <UserAvatar
                imageKey={userInfo?.profile_image_key}
                size={24}
                className={style.userGravatar}
              />
              <span className={style.userName}>{userInfo?.first_name}</span>
              <DownOutlined />
            </a>
          </Dropdown>,
        ]}
        className={style.mainHeader}
      />
    </>
  );
};

export default Header;

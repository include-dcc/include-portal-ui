import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {
  DotChartOutlined,
  DownOutlined,
  FileSearchOutlined,
  HomeOutlined,
  LogoutOutlined,
  MailOutlined,
  ReadOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useKeycloak } from '@react-keycloak/web';
import { Button, Dropdown, PageHeader, Space, Typography } from 'antd';
import { getFTEnvVarByKey } from 'helpers/EnvVariables';

import { LANG } from 'common/constants';
import { IncludeKeycloakTokenParsed } from 'common/tokenTypes';
import { AlterTypes } from 'common/types';
import NotificationBanner from 'components/featureToggle/NotificationBanner';
import ExternalLinkIcon from 'components/Icons/ExternalLinkIcon';
import IncludeIcon from 'components/Icons/IncludeIcon';
import LineStyleIcon from 'components/Icons/LineStyleIcon';
import HeaderLink from 'components/Layout/Header/HeaderLink';
import style from 'components/Layout/Header/index.module.css';
import UserAvatar from 'components/UserAvatar';
import useFeatureToggle from 'hooks/useFeatureToggle';
import { trackLogout, trackVisitResources } from 'services/analytics';
import { globalActions, useLang } from 'store/global';
import { useUser } from 'store/user';
import { userActions } from 'store/user/slice';
import { STATIC_ROUTES } from 'utils/routes';

const FT_FLAG_SHOW_TRANSLATION_BTN = 'SHOW_TRANSLATION_BTN';

const iconSize = { width: 14, height: 14 };
const FT_FLAG_KEY = 'SITE_WIDE_BANNER';
const BANNER_TYPE_KEY = FT_FLAG_KEY + '_TYPE';
const BANNER_MSG_KEY = FT_FLAG_KEY + '_MSG';
const BANNER_PERSISTENT_KEY = FT_FLAG_KEY + '_PERSISTENT';

const { Text } = Typography;

const Header = () => {
  const { userInfo } = useUser();
  const dispatch = useDispatch();
  const { keycloak } = useKeycloak();
  const location = useLocation();
  const currentPathName = location.pathname;
  const tokenParsed = keycloak.tokenParsed as IncludeKeycloakTokenParsed;
  const { isEnabled: isShowTranslationBtnEnabled } = useFeatureToggle(FT_FLAG_SHOW_TRANSLATION_BTN);
  const lang = useLang();
  const targetLang = lang === LANG.EN ? LANG.ES : LANG.EN;

  return (
    <>
      <NotificationBanner
        className={style.siteWideBanner}
        featureToggleKey={FT_FLAG_KEY}
        type={getFTEnvVarByKey<AlterTypes>(BANNER_TYPE_KEY, 'warning')}
        message={getFTEnvVarByKey(BANNER_MSG_KEY)}
        banner
        closable={getFTEnvVarByKey(BANNER_PERSISTENT_KEY) === 'false'}
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
            <HeaderLink
              key="analytics-data"
              currentPathName={currentPathName}
              to={[STATIC_ROUTES.ANALYTICS]}
              icon={<DotChartOutlined />}
              title={intl.get('layout.main.menu.analysis')}
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
          <Dropdown
            overlayClassName={style.dropdown}
            key="resources"
            trigger={['click']}
            menu={{
              items: [
                {
                  key: 'website',
                  disabled: false,
                  label: (
                    <a
                      href="#"
                      onClick={() => {
                        trackVisitResources('website');
                        window.open('https://includedcc.org/', '_blank');
                      }}
                    >
                      <ExternalLinkIcon {...iconSize} />
                      <Text className={style.linkText}>{intl.get('layout.main.menu.website')}</Text>
                    </a>
                  ),
                },
                {
                  key: 'help',
                  label: (
                    <a
                      href="#"
                      onClick={() => {
                        trackVisitResources('help');
                        window.open('https://help.includedcc.org/docs/quick-start-guide', '_blank');
                      }}
                    >
                      <ExternalLinkIcon {...iconSize} />
                      <Text className={style.linkText}>{intl.get('layout.main.menu.help')}</Text>
                    </a>
                  ),
                },
                {
                  key: 'forum',
                  label: (
                    <a
                      href="#"
                      onClick={() => {
                        trackVisitResources('forum');
                        window.open('https://help.includedcc.org/discuss', '_blank');
                      }}
                    >
                      <ExternalLinkIcon {...iconSize} />
                      <Text className={style.linkText}>{intl.get('layout.main.menu.forum')}</Text>
                    </a>
                  ),
                },
                {
                  type: 'divider',
                },
                {
                  key: 'contact',
                  label: (
                    <a
                      href="#"
                      onClick={() => {
                        trackVisitResources('contact');
                        window.open(
                          'https://app.smartsheet.com/b/form/514745159a004c2e987fff0aa16ceaac',
                          '_blank',
                        );
                      }}
                    >
                      <MailOutlined />
                      <Text className={style.linkText}>{intl.get('layout.main.menu.contact')}</Text>
                    </a>
                  ),
                },
              ],
            }}
          >
            <a className={style.resourcesMenuTrigger} onClick={(e) => e.preventDefault()} href="">
              <span className={style.resources}>{intl.get('layout.main.menu.resources')}</span>
              <DownOutlined />
            </a>
          </Dropdown>,
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
                      <Typography.Text>{intl.get('layout.user.menu.signInWith')}</Typography.Text>
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
                  onClick: () => {
                    trackLogout();
                    dispatch(userActions.cleanLogout());
                  },
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
          isShowTranslationBtnEnabled && (
            <Button
              size="small"
              type="text"
              onClick={() => dispatch(globalActions.changeLang(targetLang))}
            >
              {targetLang.toUpperCase()}
            </Button>
          ),
        ]}
        className={style.mainHeader}
      />
    </>
  );
};

export default Header;

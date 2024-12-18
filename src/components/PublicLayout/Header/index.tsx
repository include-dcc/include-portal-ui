import { useState } from 'react';
import intl from 'react-intl-universal';
import { useNavigate } from 'react-router';
import {
  DotChartOutlined,
  DownOutlined,
  FileSearchOutlined,
  HomeOutlined,
  LoginOutlined,
  MailOutlined,
  ReadOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { useKeycloak } from '@react-keycloak/web';
import { Button, Dropdown, PageHeader, Typography } from 'antd';

import { REDIRECT_URI_KEY } from 'common/constants';
import ExternalLinkIcon from 'components/Icons/ExternalLinkIcon';
import IncludeIcon from 'components/Icons/IncludeIcon';
import LineStyleIcon from 'components/Icons/LineStyleIcon';
import useQueryParams from 'hooks/useQueryParams';
import { trackPublicStudies, trackVisitResources } from 'services/analytics';
import { STATIC_ROUTES } from 'utils/routes';

import LoginModal from '../LoginModal';

import HeaderButton from './HeaderButton';

import style from './index.module.css';

const iconSize = { width: 14, height: 14 };

const { Text } = Typography;

const Header = () => {
  const { keycloak } = useKeycloak();
  const query = useQueryParams();
  const navigate = useNavigate();
  const [redirectUri, setRedirectUri] = useState<string>();
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const closeLoginModal = () => setOpenLoginModal(false);

  const handleSignin = async (btnName: string) => {
    trackPublicStudies(btnName);
    const url = keycloak.createLoginUrl({
      redirectUri: `${window.location.origin}/${
        query.get(REDIRECT_URI_KEY) || STATIC_ROUTES.STUDIES
      }`,
      locale: intl.getInitOptions().currentLocale,
    });
    window.location.assign(url);
  };

  return (
    <>
      <PageHeader
        title={
          <a
            onClick={() => {
              navigate(STATIC_ROUTES.LOGIN);
            }}
          >
            <IncludeIcon className={style.logo} />
          </a>
        }
        subTitle={
          <nav className={style.headerList}>
            <HeaderButton
              key="dashboard"
              icon={<HomeOutlined />}
              onClick={() => {
                setRedirectUri(STATIC_ROUTES.DASHBOARD);
                trackPublicStudies('Dashboard');
                setOpenLoginModal(true);
              }}
              title={intl.get('layout.main.menu.dashboard')}
            />
            <HeaderButton
              key="studies"
              icon={<ReadOutlined />}
              isActive={true}
              title={intl.get('layout.main.menu.studies')}
            />
            <HeaderButton
              key="explore-data"
              icon={<FileSearchOutlined />}
              onClick={() => {
                setRedirectUri(STATIC_ROUTES.DATA_EXPLORATION);
                trackPublicStudies('Data Exploration');
                setOpenLoginModal(true);
              }}
              title={intl.get('layout.main.menu.explore')}
            />
            <HeaderButton
              key="variant-data"
              icon={<LineStyleIcon />}
              onClick={() => {
                setRedirectUri(STATIC_ROUTES.VARIANTS);
                trackPublicStudies('Variants');
                setOpenLoginModal(true);
              }}
              title={intl.get('layout.main.menu.variants')}
            />
            <HeaderButton
              key="analytics-data"
              icon={<DotChartOutlined />}
              onClick={() => {
                setRedirectUri(STATIC_ROUTES.ANALYTICS);
                trackPublicStudies('Analysis');
                setOpenLoginModal(true);
              }}
              title={intl.get('layout.main.menu.analysis')}
            />
          </nav>
        }
        extra={[
          <HeaderButton
            key="community"
            icon={<TeamOutlined />}
            onClick={() => {
              setRedirectUri(STATIC_ROUTES.COMMUNITY);
              trackPublicStudies('Community');
              setOpenLoginModal(true);
            }}
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
          <div className={style.connectionWrapper}>
            <HeaderButton
              className={style.loginBtn}
              key="login"
              icon={<LoginOutlined />}
              onClick={() => handleSignin('Login')}
              title={intl.get('screen.loginPage.login')}
            />
            <Button
              className={style.signUpBtn}
              onClick={() => handleSignin('Sign Up')}
              type="primary"
            >
              {intl.get('screen.loginPage.signup')}
            </Button>
          </div>,
        ]}
        className={style.mainHeader}
      />
      {openLoginModal && (
        <LoginModal isOpen={openLoginModal} onClose={closeLoginModal} redirectUri={redirectUri} />
      )}
    </>
  );
};

export default Header;

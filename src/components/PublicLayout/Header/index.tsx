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
import { Button, Dropdown, PageHeader, Typography } from 'antd';
import { getFTEnvVarByKey } from 'helpers/EnvVariables';

import ExternalLinkIcon from 'components/Icons/ExternalLinkIcon';
import IncludeIcon from 'components/Icons/IncludeIcon';
import LineStyleIcon from 'components/Icons/LineStyleIcon';
import { trackVisitResources } from 'services/analytics';
import { STATIC_ROUTES } from 'utils/routes';

import HeaderButton from './HeaderButton';

import style from './index.module.css';

const iconSize = { width: 14, height: 14 };

const { Text } = Typography;

const Header = () => {
  const navigate = useNavigate();
  const ft_variant = getFTEnvVarByKey('VARIANT');
  const ft_analyticsPage = getFTEnvVarByKey('ANALYTICS_PAGE');

  return (
    <PageHeader
      title={<IncludeIcon className={style.logo} />}
      subTitle={
        <nav className={style.headerList}>
          <HeaderButton
            key="dashboard"
            icon={<HomeOutlined />}
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
            title={intl.get('layout.main.menu.explore')}
          />

          {ft_variant === 'true' && (
            <HeaderButton
              key="variant-data"
              icon={<LineStyleIcon />}
              title={intl.get('layout.main.menu.variants')}
            />
          )}
          {ft_analyticsPage === 'true' && (
            <HeaderButton
              key="analytics-data"
              icon={<DotChartOutlined />}
              title={intl.get('layout.main.menu.analysis')}
            />
          )}
        </nav>
      }
      extra={[
        <HeaderButton
          key="community"
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
        <div className={style.connectionWrapper}>
          <HeaderButton
            className={style.loginBtn}
            key="community"
            icon={<LoginOutlined />}
            onClick={() => navigate(STATIC_ROUTES.LOGIN)}
            title={intl.get('screen.loginPage.login')}
          />
          <Button
            className={style.signUpBtn}
            onClick={() => navigate(STATIC_ROUTES.LOGIN)}
            type="primary"
          >
            {intl.get('screen.loginPage.signup')}
          </Button>
        </div>,
      ]}
      className={style.mainHeader}
    />
  );
};

export default Header;

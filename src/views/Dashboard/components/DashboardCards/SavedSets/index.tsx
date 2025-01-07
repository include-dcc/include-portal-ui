import { ReactElement } from 'react';
import intl from 'react-intl-universal';
import { ExperimentOutlined, FileTextOutlined, UserOutlined } from '@ant-design/icons';
import Empty from '@ferlab/ui/core/components/Empty';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { List, Tabs, Typography } from 'antd';
import cx from 'classnames';
import CardErrorPlaceholder from 'views/Dashboard/components/CardErrorPlaceHolder';
import CardHeader from 'views/Dashboard/components/CardHeader';
import { DashboardCardProps } from 'views/Dashboard/components/DashboardCards';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';
import { VARIANT_REPO_QB_ID } from 'views/Variants/utils/constants';

import LineStyleIcon from 'components/Icons/LineStyleIcon';
import { IUserSetOutput, SetType } from 'services/api/savedSet/models';
import { SUPPORT_EMAIL } from 'store/report/thunks';
import { useSavedSet } from 'store/savedSet';
import { STATIC_ROUTES } from 'utils/routes';

import ListItem from './ListItem';

import styles from './index.module.css';

const { Text } = Typography;

const getItemList = (
  type: SetType,
  savedSets: IUserSetOutput[],
  fetchingError: boolean,
  isLoading: boolean,
  icon: ReactElement,
  queryBuilderId = DATA_EXPLORATION_QB_ID,
) => (
  <List<IUserSetOutput>
    className={styles.savedSetsList}
    bordered
    locale={{
      emptyText: fetchingError ? (
        <CardErrorPlaceholder
          title={intl.get('screen.dashboard.cards.savedSets.errorCard.failedToFetch')}
          subTitle={
            <Text>
              {intl.getHTML('screen.dashboard.cards.savedSets.errorCard.message', {
                href: `mailto:${SUPPORT_EMAIL}`,
              })}
            </Text>
          }
        />
      ) : (
        <Empty
          imageType="grid"
          description={intl.getHTML('screen.dashboard.cards.savedSets.noSavedSets', {
            dataExploHref: STATIC_ROUTES.DATA_EXPLORATION,
            variantsHref: STATIC_ROUTES.VARIANTS,
          })}
          noPadding
        />
      ),
    }}
    dataSource={fetchingError ? [] : savedSets.filter((s) => s.setType === type)}
    loading={isLoading}
    renderItem={(item) => <ListItem data={item} icon={icon} queryBuilderId={queryBuilderId} />}
  />
);

const SavedSets = ({ id, key, className = '' }: DashboardCardProps) => {
  const { savedSets, isLoading, fetchingError } = useSavedSet();

  return (
    <GridCard
      theme="shade"
      wrapperClassName={className}
      title={
        <CardHeader
          id={id}
          key={key}
          title={intl.get('screen.dashboard.cards.savedSets.title')}
          withHandle
          infoPopover={{
            title: 'Managing saved sets',
            content: (
              <Text>
                {intl.getHTML('screen.dashboard.cards.savedSets.infoPopover.content', {
                  dataExploHref: STATIC_ROUTES.DATA_EXPLORATION,
                  variantsHref: STATIC_ROUTES.VARIANTS,
                })}
              </Text>
            ),
          }}
        />
      }
      content={
        <Tabs
          className={cx(styles.setTabs, 'navNoMarginBtm')}
          defaultActiveKey="participants"
          items={[
            {
              key: 'participants',
              label: (
                <div>
                  <UserOutlined />
                  {intl.get('screen.dashboard.cards.savedSets.participantsTab', {
                    count: savedSets.filter((s) => s.setType === SetType.PARTICIPANT).length,
                  })}
                </div>
              ),
              children: getItemList(
                SetType.PARTICIPANT,
                savedSets,
                fetchingError,
                isLoading,
                <UserOutlined />,
              ),
            },
            {
              key: 'biospecimen',
              label: (
                <div>
                  <ExperimentOutlined />
                  {intl.get('screen.dashboard.cards.savedSets.biospecimensTab', {
                    count: savedSets.filter((s) => s.setType === SetType.BIOSPECIMEN).length,
                  })}
                </div>
              ),
              children: getItemList(
                SetType.BIOSPECIMEN,
                savedSets,
                fetchingError,
                isLoading,
                <ExperimentOutlined />,
              ),
            },
            {
              key: 'files',
              label: (
                <div>
                  <FileTextOutlined />
                  {intl.get('screen.dashboard.cards.savedSets.Filestab', {
                    count: savedSets.filter((s) => s.setType === SetType.FILE).length,
                  })}
                  Files ({savedSets.filter((s) => s.setType === SetType.FILE).length})
                </div>
              ),
              children: getItemList(
                SetType.FILE,
                savedSets,
                fetchingError,
                isLoading,
                <FileTextOutlined />,
              ),
            },
            {
              key: 'variants',
              label: (
                <div>
                  <LineStyleIcon />
                  {intl.get('screen.dashboard.cards.savedSets.variantsTab', {
                    count: savedSets.filter((s) => s.setType === SetType.VARIANT).length,
                  })}
                </div>
              ),
              children: getItemList(
                SetType.VARIANT,
                savedSets,
                fetchingError,
                isLoading,
                <LineStyleIcon />,
                VARIANT_REPO_QB_ID,
              ),
            },
          ]}
        />
      }
    />
  );
};

export default SavedSets;

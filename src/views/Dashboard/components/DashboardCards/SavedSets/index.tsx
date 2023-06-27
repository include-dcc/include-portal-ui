import { ReactElement } from 'react';
import intl from 'react-intl-universal';
import { ExperimentOutlined, FileTextOutlined, UserOutlined } from '@ant-design/icons';
import Empty from '@ferlab/ui/core/components/Empty';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { List, Tabs, Typography } from 'antd';
import cx from 'classnames';
import CardErrorPlaceholder from 'views/Dashboard/components/CardErrorPlaceHolder';
import CardHeader from 'views/Dashboard/components/CardHeader';
import { DashboardCardProps } from 'views/Dashboard/components/DashboardCards';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import PopoverContentLink from 'components/uiKit/PopoverContentLink';
import { IUserSetOutput, SetType } from 'services/api/savedSet/models';
import { SUPPORT_EMAIL } from 'store/report/thunks';
import { useSavedSet } from 'store/savedSet';
import { STATIC_ROUTES } from 'utils/routes';

import ListItem from './ListItem';

import styles from './index.module.scss';

const { Text } = Typography;
const { TabPane } = Tabs;

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
              {intl.get('screen.dashboard.cards.savedSets.errorCard.refresh')}{' '}
              <ExternalLink href={`mailto:${SUPPORT_EMAIL}`}>
                <Text>{intl.get('screen.dashboard.cards.savedSets.errorCard.contactSupport')}</Text>
              </ExternalLink>
              .
            </Text>
          }
        />
      ) : (
        <Empty
          imageType="grid"
          description={intl.get('screen.dashboard.cards.savedSets.noSavedFilters')}
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
                A saved set is a set of one or more entity IDs that can be saved and revisited for
                later use without having to manually reselect entity IDs. You can create
                Participant, Biospecimen, and File saved sets at the top of the table of results in
                the{' '}
                <PopoverContentLink
                  to={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
                  title="Data Exploration page"
                />
                .
              </Text>
            ),
          }}
        />
      }
      content={
        <Tabs className={cx(styles.setTabs, 'navNoMarginBtm')} defaultActiveKey="participants">
          <TabPane
            tab={
              <div>
                <UserOutlined />
                Participants ({savedSets.filter((s) => s.setType === SetType.PARTICIPANT).length})
              </div>
            }
            key="participants"
          >
            {getItemList(
              SetType.PARTICIPANT,
              savedSets,
              fetchingError,
              isLoading,
              <UserOutlined />,
            )}
          </TabPane>
          <TabPane
            tab={
              <div>
                <ExperimentOutlined />
                Biospecimen ({savedSets.filter((s) => s.setType === SetType.BIOSPECIMEN).length})
              </div>
            }
            key="biospecimen"
          >
            {getItemList(
              SetType.BIOSPECIMEN,
              savedSets,
              fetchingError,
              isLoading,
              <ExperimentOutlined />,
            )}
          </TabPane>
          <TabPane
            tab={
              <div>
                <FileTextOutlined />
                Files ({savedSets.filter((s) => s.setType === SetType.FILE).length})
              </div>
            }
            key="files"
          >
            {getItemList(SetType.FILE, savedSets, fetchingError, isLoading, <FileTextOutlined />)}
          </TabPane>
          {/* SJIP-507 mask save sets for deployment
          <TabPane
            tab={
              <div>
                <LineStyleIcon />
                Variants ({savedSets.filter((s) => s.setType === SetType.VARIANT).length})
              </div>
            }
            key="variants"
          >
            {getItemList(
              SetType.VARIANT,
              savedSets,
              fetchingError,
              isLoading,
              <LineStyleIcon />,
              VARIANT_REPO_QB_ID,
            )}
          </TabPane> */}
        </Tabs>
      }
    />
  );
};

export default SavedSets;

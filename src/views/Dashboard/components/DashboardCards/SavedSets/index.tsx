import { ReactElement, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { ExperimentOutlined, FileTextOutlined, UserOutlined } from '@ant-design/icons';
import Empty from '@ferlab/ui/core/components/Empty';
import AndOrIcon from '@ferlab/ui/core/components/Icons/AndOrIcon';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Button, Checkbox, List, Tabs, Tooltip, Typography } from 'antd';
import cx from 'classnames';
import CardErrorPlaceholder from 'views/Dashboard/components/CardErrorPlaceHolder';
import CardHeader from 'views/Dashboard/components/CardHeader';
import { DashboardCardProps } from 'views/Dashboard/components/DashboardCards';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';
import { VARIANT_REPO_QB_ID } from 'views/Variants/utils/constants';

import LineStyleIcon from 'components/Icons/LineStyleIcon';
import useFeatureToggle from 'hooks/useFeatureToggle';
import { IUserSetOutput, SetType } from 'services/api/savedSet/models';
import { SUPPORT_EMAIL } from 'store/report/thunks';
import { useSavedSet } from 'store/savedSet';
import { saveCompareSets } from 'store/savedSet/thunks';
import { STATIC_ROUTES } from 'utils/routes';

import ListItem from './ListItem';

import styles from './index.module.css';

export const FT_DASHBOARD_SET_COMPARE = 'DASHBOARD_SET_COMPARE';

const { Text } = Typography;

interface IGetItemList {
  type: SetType;
  savedSets: IUserSetOutput[];
  fetchingError: boolean;
  isLoading: boolean;
  icon: ReactElement;
  queryBuilderId?: string;
  setsChecked: string[];
  setSetsChecked: (checkedValues: string[]) => void;
  setEntityType: (type: SetType | undefined) => void;
}

const getItemList = ({
  type,
  savedSets,
  fetchingError,
  isLoading,
  icon,
  queryBuilderId = DATA_EXPLORATION_QB_ID,
  setsChecked,
  setSetsChecked,
  setEntityType,
}: IGetItemList) => (
  <Checkbox.Group
    onChange={(checkedValues) => {
      setSetsChecked(checkedValues as string[]);
      setEntityType(type);
    }}
    style={{ width: '100%' }}
    value={setsChecked}
  >
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
      dataSource={
        fetchingError ? [] : savedSets.filter((s) => s.setType === type && !s.is_invisible)
      }
      loading={isLoading}
      renderItem={(item) => <ListItem data={item} icon={icon} queryBuilderId={queryBuilderId} />}
    />
  </Checkbox.Group>
);

const SavedSets = ({ id, key, className = '' }: DashboardCardProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { savedSets, isLoading, fetchingError } = useSavedSet();
  const [setsChecked, setSetsChecked] = useState<string[]>([]);
  const [entityType, setEntityType] = useState<SetType | undefined>(undefined);

  const { isEnabled: isSetCompareEnabled } = useFeatureToggle(FT_DASHBOARD_SET_COMPARE);

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
      extra={
        isSetCompareEnabled ? (
          <Tooltip
            title={
              setsChecked.length < 2
                ? intl.get('screen.dashboard.cards.savedSets.compareLessTooltips')
                : setsChecked.length > 3
                ? intl.get('screen.dashboard.cards.savedSets.compareGreaterTooltips')
                : undefined
            }
          >
            <Button
              disabled={setsChecked.length < 2 || setsChecked.length > 3}
              onClick={async () => {
                await dispatch(saveCompareSets({ entityType: entityType, ids: setsChecked }));
                navigate(STATIC_ROUTES.ANALYTICS_SET_OPERATIONS);
              }}
              size="small"
            >
              <AndOrIcon />
              {intl.get('screen.dashboard.cards.savedSets.compare')}
            </Button>
          </Tooltip>
        ) : null
      }
      content={
        <Tabs
          className={cx(styles.setTabs, 'navNoMarginBtm')}
          defaultActiveKey="participants"
          onTabClick={() => {
            setSetsChecked([]);
          }}
          items={[
            {
              key: 'participants',
              label: (
                <div>
                  <UserOutlined />
                  {intl.get('screen.dashboard.cards.savedSets.participantsTab', {
                    count: savedSets.filter(
                      (s) => s.setType === SetType.PARTICIPANT && !s.is_invisible,
                    ).length,
                  })}
                </div>
              ),
              children: getItemList({
                type: SetType.PARTICIPANT,
                savedSets,
                fetchingError,
                isLoading,
                icon: <UserOutlined />,
                setsChecked,
                setSetsChecked,
                setEntityType,
              }),
            },
            {
              key: 'biospecimen',
              label: (
                <div>
                  <ExperimentOutlined />
                  {intl.get('screen.dashboard.cards.savedSets.biospecimensTab', {
                    count: savedSets.filter(
                      (s) => s.setType === SetType.BIOSPECIMEN && !s.is_invisible,
                    ).length,
                  })}
                </div>
              ),
              children: getItemList({
                type: SetType.BIOSPECIMEN,
                savedSets,
                fetchingError,
                isLoading,
                icon: <ExperimentOutlined />,
                setsChecked,
                setSetsChecked,
                setEntityType,
              }),
            },
            {
              key: 'files',
              label: (
                <div>
                  <FileTextOutlined />
                  {intl.get('screen.dashboard.cards.savedSets.Filestab', {
                    count: savedSets.filter((s) => s.setType === SetType.FILE && !s.is_invisible)
                      .length,
                  })}
                  Files (
                  {savedSets.filter((s) => s.setType === SetType.FILE && !s.is_invisible).length})
                </div>
              ),
              children: getItemList({
                type: SetType.FILE,
                savedSets,
                fetchingError,
                isLoading,
                icon: <FileTextOutlined />,
                setsChecked,
                setSetsChecked,
                setEntityType,
              }),
            },
            {
              key: 'variants',
              label: (
                <div>
                  <LineStyleIcon />
                  {intl.get('screen.dashboard.cards.savedSets.variantsTab', {
                    count: savedSets.filter((s) => s.setType === SetType.VARIANT && !s.is_invisible)
                      .length,
                  })}
                </div>
              ),
              children: getItemList({
                type: SetType.VARIANT,
                savedSets,
                fetchingError,
                isLoading,
                icon: <LineStyleIcon />,
                queryBuilderId: VARIANT_REPO_QB_ID,
                setsChecked,
                setSetsChecked,
                setEntityType,
              }),
            },
          ]}
        />
      }
    />
  );
};

export default SavedSets;

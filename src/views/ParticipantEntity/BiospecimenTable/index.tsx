import { useState } from 'react';
import intl from 'react-intl-universal';
import { useNavigate } from 'react-router';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { EntityCustomContent } from '@ferlab/ui/core/pages/EntityPage';
import { Button, Tabs } from 'antd';
import { INDEXES } from 'graphql/constants';
import { IParticipantEntity } from 'graphql/participants/models';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import DownloadDataButton from 'components/Biospecimens/DownloadDataButton';
import BiospecimenTree from 'components/Biospecimens/Tree';
import ExternalLinkIcon from 'components/Icons/ExternalLinkIcon';
import { STATIC_ROUTES } from 'utils/routes';

import { SectionId } from '../utils/anchorLinks';
import { getBiospecimensFromParticipant } from '../utils/biospecimens';

import TableView from './TableView';

import styles from './index.module.css';

interface OwnProps {
  participant?: IParticipantEntity;
  loading: boolean;
}

enum BiospecimenTabs {
  TreeView = 'tree',
  TableView = 'table',
}

const BiospecimenTable = ({ participant, loading }: OwnProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>(BiospecimenTabs.TreeView);

  const { biospecimens, total } = getBiospecimensFromParticipant(participant);

  return (
    <EntityCustomContent
      id={SectionId.BIOSPECIMEN}
      loading={loading}
      customContent={
        <Tabs
          className={styles.tabs}
          defaultActiveKey={BiospecimenTabs.TreeView}
          onChange={(activeKey) => setActiveTab(activeKey)}
          items={[
            {
              key: BiospecimenTabs.TreeView,
              label: intl.get('screen.hierarchicalBiospecimen.treeViewTab'),
              children: (
                <>
                  <BiospecimenTree />
                </>
              ),
            },
            {
              key: BiospecimenTabs.TableView,
              label: intl.get('screen.hierarchicalBiospecimen.tableViewTab'),
              children: <TableView data={biospecimens} loading={loading} />,
            },
          ]}
          tabBarExtraContent={
            <>
              <DownloadDataButton
                biospecimenIds={[...biospecimens.map((biospecimen) => biospecimen.sample_id)]}
                key="downloadSampleData"
                size="small"
              />
              {activeTab === BiospecimenTabs.TableView && <span> export</span>}
            </>
          }
        />
      }
      header={intl.get('entities.biospecimen.biospecimen')}
      title={intl.get('entities.biospecimen.biospecimen')}
      total={total}
      titleExtra={[
        <Button
          size="small"
          onClick={() => {
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'participant_id',
                    value: participant ? [participant.participant_id] : [],
                    index: INDEXES.PARTICIPANT,
                  }),
                ],
              }),
              setAsActive: true,
            });
            navigate(STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS);
          }}
        >
          {intl.get('global.viewInExploration')}
          <ExternalLinkIcon />
        </Button>,
      ]}
    />
  );
};

export default BiospecimenTable;

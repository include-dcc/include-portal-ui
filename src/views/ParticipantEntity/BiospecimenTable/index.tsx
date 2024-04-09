import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { EntityTable } from '@ferlab/ui/core/pages/EntityPage';
import { Button } from 'antd';
import { INDEXES } from 'graphql/constants';
import { IParticipantEntity } from 'graphql/participants/models';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import DownloadDataButton from 'components/Biospecimens/DownloadDataButton';
import ExternalLinkIcon from 'components/Icons/ExternalLinkIcon';
import { generateLocalTsvReport } from 'store/report/thunks';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { STATIC_ROUTES } from 'utils/routes';
import { userColsHaveSameKeyAsDefaultCols } from 'utils/tables';

import { SectionId } from '../utils/anchorLinks';
import {
  getBiospecimensDefaultColumns,
  getBiospecimensFromParticipant,
} from '../utils/biospecimens';

interface OwnProps {
  participant?: IParticipantEntity;
  loading: boolean;
}

const BiospecimenTable = ({ participant, loading }: OwnProps) => {
  const navigate = useNavigate();
  const { userInfo } = useUser();
  const dispatch = useDispatch();

  const { biospecimens, total } = getBiospecimensFromParticipant(participant);

  const biospecimensDefaultColumns = getBiospecimensDefaultColumns();

  const userColumnPreferences = userInfo?.config?.participants?.tables?.biospecimens?.columns || [];
  const userColumnPreferencesOrDefault = userColsHaveSameKeyAsDefaultCols(
    userColumnPreferences,
    biospecimensDefaultColumns,
  )
    ? [...userColumnPreferences]
    : biospecimensDefaultColumns.map((c, index) => ({
        visible: true,
        index,
        key: c.key,
      }));

  return (
    <EntityTable
      id={SectionId.BIOSPECIMEN}
      loading={loading}
      data={biospecimens}
      title={intl.get('entities.biospecimen.biospecimen')}
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
      total={total}
      header={intl.get('entities.biospecimen.biospecimen')}
      columns={biospecimensDefaultColumns}
      initialColumnState={userColumnPreferencesOrDefault}
      headerConfig={{
        extra: [
          <DownloadDataButton
            biospecimenIds={[...biospecimens.map((biospecimen) => biospecimen.sample_id)]}
            key="downloadSampleData"
          />,
        ],
        enableTableExport: true,
        enableColumnSort: true,
        onColumnSortChange: (newState) =>
          dispatch(
            updateUserConfig({
              participants: {
                tables: {
                  biospecimens: {
                    columns: newState,
                  },
                },
              },
            }),
          ),
        onTableExportClick: () =>
          dispatch(
            generateLocalTsvReport({
              index: INDEXES.PARTICIPANT,
              fileName: 'biospecimens',
              headers: biospecimensDefaultColumns,
              cols: userColumnPreferencesOrDefault.map((x) => ({
                visible: x.visible,
                key: x.key,
              })),
              rows: biospecimens,
            }),
          ),
      }}
    />
  );
};

export default BiospecimenTable;

import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import ExternalLinkIcon from '@ferlab/ui/core/components/ExternalLink/ExternalLinkIcon';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { EntityTable, EntityTableRedirectLink } from '@ferlab/ui/core/pages/EntityPage';
import { INDEXES } from 'graphql/constants';
import { IFileEntity } from 'graphql/files/models';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import { fetchTsvReport } from 'store/report/thunks';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { STATIC_ROUTES } from 'utils/routes';

import { SectionId } from '../utils/anchorLinks';
import { getBiospecimenColumns, getBiospecimensFromFile } from '../utils/biospecimens';

interface OwnProps {
  file?: IFileEntity;
  loading: boolean;
}

const COLUMNS_PREFIX = 'participants.biospecimens.';

const BiospecimenTable = ({ file, loading }: OwnProps) => {
  const { userInfo } = useUser();
  const dispatch = useDispatch();

  const biospecimens = getBiospecimensFromFile(file);

  const userColumnPreferences = userInfo?.config?.files?.tables?.biospecimens?.columns || [];
  const userColumnPreferencesOrDefault =
    userColumnPreferences.length > 0
      ? [...userColumnPreferences]
      : getBiospecimenColumns().map((c, index) => ({
          visible: true,
          index,
          key: `${COLUMNS_PREFIX}${c.key}`,
        }));

  const initialColumnState = userColumnPreferencesOrDefault.map((column) => ({
    ...column,
    key: column.key.replace(COLUMNS_PREFIX, ''),
  }));

  return (
    <EntityTable
      id={SectionId.PARTICIPANT_SAMPLE}
      loading={loading}
      data={biospecimens}
      total={biospecimens.length}
      title={intl.get('entities.file.participant_sample')}
      titleExtra={[
        <EntityTableRedirectLink
          key="1"
          to={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
          onClick={() =>
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'file_id',
                    value: file ? [file.file_id] : [],
                    index: INDEXES.FILE,
                  }),
                ],
              }),
              setAsActive: true,
            })
          }
          icon={<ExternalLinkIcon />}
        >
          {intl.get('global.viewInDataExploration')}
        </EntityTableRedirectLink>,
      ]}
      header={intl.get('entities.file.participant_sample')}
      columns={getBiospecimenColumns()}
      initialColumnState={initialColumnState}
      headerConfig={{
        enableTableExport: true,
        enableColumnSort: true,
        onColumnSortChange: (newState) =>
          dispatch(
            updateUserConfig({
              files: {
                tables: {
                  biospecimens: {
                    columns: newState.map((column) => ({
                      ...column,
                      key: `${COLUMNS_PREFIX}${column.key}`,
                    })),
                  },
                },
              },
            }),
          ),
        onTableExportClick: () =>
          dispatch(
            fetchTsvReport({
              columnStates: userColumnPreferencesOrDefault,
              columns: getBiospecimenColumns(),
              index: INDEXES.FILE,
              fileName: 'participants-samples',
              sqon: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'file_id',
                    index: INDEXES.FILE,
                    value: file?.file_id ? [file?.file_id] : [],
                  }),
                ],
              }),
            }),
          ),
      }}
    />
  );
};

export default BiospecimenTable;

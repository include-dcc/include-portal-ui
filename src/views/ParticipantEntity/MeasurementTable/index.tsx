import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { EntityTable } from '@ferlab/ui/core/pages/EntityPage';
import { INDEXES } from 'graphql/constants';
import { IMeasurement } from 'graphql/participants/models';

import { generateLocalTsvReport } from 'store/report/thunks';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';
import { userColsHaveSameKeyAsDefaultCols } from 'utils/tables';

import { SectionId } from '../utils/anchorLinks';
import getMeasurementColumns from '../utils/getMeasurementColumns';

interface OwnProps {
  measurements?: IMeasurement[];
  loading: boolean;
}

const MeasurementTable = ({ measurements = [], loading }: OwnProps) => {
  const { userInfo } = useUser();
  const dispatch = useDispatch();

  const measurementsDefaultColumns = getMeasurementColumns();

  const userColumnPreferences = userInfo?.config?.participants?.tables?.measurements?.columns || [];
  const userColumnPreferencesOrDefault = userColsHaveSameKeyAsDefaultCols(
    userColumnPreferences,
    measurementsDefaultColumns,
  )
    ? [...userColumnPreferences]
    : measurementsDefaultColumns.map((c, index) => ({
        visible: true,
        index,
        key: c.key,
      }));

  return (
    <EntityTable
      id={SectionId.MEASUREMENT}
      loading={loading}
      data={measurements}
      total={measurements.length}
      title={intl.get('entities.participant.measurement.title')}
      header={intl.get('entities.participant.measurement.title')}
      columns={measurementsDefaultColumns}
      initialColumnState={userColumnPreferencesOrDefault}
      headerConfig={{
        enableTableExport: true,
        enableColumnSort: true,
        onColumnSortChange: (newState) =>
          dispatch(
            updateUserConfig({
              participants: {
                tables: {
                  measurements: {
                    columns: newState,
                  },
                },
              },
            }),
          ),
        onTableExportClick: () =>
          dispatch(
            generateLocalTsvReport({
              fileName: 'measurements',
              index: INDEXES.PARTICIPANT,
              headers: measurementsDefaultColumns,
              cols: userColumnPreferencesOrDefault.map((x) => ({
                visible: x.visible,
                key: x.key,
              })),
              rows: measurements,
            }),
          ),
      }}
    />
  );
};

export default MeasurementTable;

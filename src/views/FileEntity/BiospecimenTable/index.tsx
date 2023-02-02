import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { EntityTable } from '@ferlab/ui/core/pages/EntityPage';
import { IBiospecimenEntity } from 'graphql/biospecimens/models';
import { IFileEntity } from 'graphql/files/models';

import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';

import { SectionId } from '../utils/anchorLinks';
import getBiospecimenColumns from '../utils/getBiospecimenColumns';

interface OwnProps {
  data?: IFileEntity;
  loading: boolean;
}

const BiospecimenTable = ({ data, loading }: OwnProps) => {
  const { userInfo } = useUser();
  const dispatch = useDispatch();

  const biospecimens: IBiospecimenEntity[] =
    data?.biospecimens?.hits?.edges?.map((e) => ({ key: e.node.sample_id, ...e.node })) || [];

  return (
    <EntityTable
      id={SectionId.PARTICIPANT_SAMPLE}
      loading={loading}
      data={biospecimens}
      title={intl.get('entities.file.participant_sample')}
      header={intl.get('entities.file.participant_sample')}
      columns={getBiospecimenColumns()}
      initialColumnState={userInfo?.config.files?.tables?.biospecimens?.columns}
      headerConfig={{
        enableTableExport: true,
        enableColumnSort: true,
        onColumnSortChange: (newState) =>
          dispatch(
            updateUserConfig({ files: { tables: { biospecimens: { columns: newState } } } }),
          ),
      }}
    />
  );
};

export default BiospecimenTable;

import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { EntityTable } from '@ferlab/ui/core/pages/EntityPage';
import { IParticipantEntity } from 'graphql/participants/models';

import DownloadDataButton from 'components/Biospecimens/DownloadDataButton';
import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';

import { SectionId } from '../utils/anchorLinks';
import { getBiospecimenColumns, getBiospecimensFromParticipant } from '../utils/biospecimens';

interface OwnProps {
  participant?: IParticipantEntity;
  loading: boolean;
}

const BiospecimenTable = ({ participant, loading }: OwnProps) => {
  const { userInfo } = useUser();
  const dispatch = useDispatch();

  const { biospecimens } = getBiospecimensFromParticipant(participant);

  return (
    <EntityTable
      id={SectionId.BIOSPECIMEN}
      loading={loading}
      data={biospecimens}
      title={intl.get('entities.biospecimen.biospecimen')}
      header={intl.get('entities.biospecimen.biospecimen')}
      columns={getBiospecimenColumns()}
      initialColumnState={userInfo?.config.participants?.tables?.biospecimens?.columns}
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
            updateUserConfig({ participants: { tables: { biospecimens: { columns: newState } } } }),
          ),
      }}
    />
  );
};

export default BiospecimenTable;

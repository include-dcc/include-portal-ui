import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { EntityTable } from '@ferlab/ui/core/pages/EntityPage';
import { IParticipantEntity, IParticipantPhenotype } from 'graphql/participants/models';

import { useUser } from 'store/user';
import { updateUserConfig } from 'store/user/thunks';

import { SectionId } from '../utils/anchorLinks';
import getPhenotypeColumns from '../utils/getPhenotypeColumns';

interface OwnProps {
  participant?: IParticipantEntity;
  loading: boolean;
}

const PhenotypeTable = ({ participant, loading }: OwnProps) => {
  const { userInfo } = useUser();
  const dispatch = useDispatch();

  const phenotype: IParticipantPhenotype[] =
    participant?.phenotype?.hits?.edges?.map((e) => ({ key: e.node.fhir_id, ...e.node })) || [];

  return (
    <EntityTable
      id={SectionId.PHENOTYPE}
      loading={loading}
      data={phenotype}
      title={intl.get('entities.participant.phenotype')}
      header={intl.get('entities.participant.phenotype')}
      columns={getPhenotypeColumns()}
      initialColumnState={userInfo?.config.participants?.tables?.phenotype?.columns}
      headerConfig={{
        enableTableExport: true,
        enableColumnSort: true,
        onColumnSortChange: (newState) =>
          dispatch(
            updateUserConfig({ participants: { tables: { phenotype: { columns: newState } } } }),
          ),
      }}
    />
  );
};

export default PhenotypeTable;

import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { IFileEntity } from 'graphql/files/models';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { STATIC_ROUTES } from 'utils/routes';

export const getBiospecimenColumns = (): ProColumnType[] => [
  {
    key: 'participant_id',
    dataIndex: 'participant_id',
    title: intl.get('entities.participant.participant_id'),
    render: (participant_id: string) =>
      participant_id ? (
        <Link to={`${STATIC_ROUTES.PARTICIPANTS}/${participant_id}`}>{participant_id}</Link>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
  },
  {
    key: 'study_code',
    dataIndex: ['study', 'study_code'],
    title: intl.get('entities.study.study'),
    render: (study_code: string) => study_code || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'down_syndrome_status',
    dataIndex: 'down_syndrome_status',
    tooltip: `${intl.get('entities.participant.trisomy')} \n${intl.get(
      'entities.participant.disomy',
    )}`,
    title: intl.get('entities.participant.down_syndrome_status'),
    render: (down_syndrome_status: string) => down_syndrome_status || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'sample_id',
    dataIndex: 'sample_id',
    title: intl.get('entities.biospecimen.sample_id'),
    render: (sample_id: string) => sample_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'sample_type',
    dataIndex: 'sample_type',
    title: intl.get('entities.biospecimen.sample_type'),
    render: (sample_type: string) => sample_type || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'collection_sample_id',
    dataIndex: 'collection_sample_id',
    title: intl.get('entities.biospecimen.collection_id'),
    render: (collection_id: string) => collection_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'collection_sample_type',
    dataIndex: 'collection_sample_type',
    title: intl.get('entities.biospecimen.collection_sample_type'),
    render: (collection_sample_type: string) => collection_sample_type || TABLE_EMPTY_PLACE_HOLDER,
  },
];

export const getBiospecimensFromFile = (file?: IFileEntity) => {
  const participantEdges =
    file?.participants?.hits?.edges?.map((e) => ({ key: e.node.participant_id, ...e.node })) || [];

  return participantEdges.flatMap((participant) =>
    participant.biospecimens.hits.edges.map((biospecimen) => ({
      ...participant,
      ...biospecimen.node,
    })),
  );
};

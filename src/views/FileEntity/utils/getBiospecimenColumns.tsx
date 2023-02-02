import intl from 'react-intl-universal';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

const getBiospecimenColumns = (): ProColumnType[] => [
  {
    key: 'participant.participant_id',
    dataIndex: 'participant.participant_id',
    title: intl.get('entities.participant.participant_id'),
    render: (participant_id: string) => participant_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'study.study_code',
    dataIndex: 'study.study_code',
    title: intl.get('entities.study.study'),
    render: (study_code: string) => study_code || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'participant.down_syndrome_status',
    dataIndex: 'participant.down_syndrome_status',
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
    key: 'collection_id',
    defaultHidden: true,
    dataIndex: 'collection_id',
    title: intl.get('entities.biospecimen.collection_id'),
    render: (collection_id: string) => collection_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'sample_type',
    dataIndex: 'sample_type',
    title: intl.get('entities.biospecimen.collection_sample_type'),
    render: (sample_type: string) => sample_type || TABLE_EMPTY_PLACE_HOLDER,
  },
];

export default getBiospecimenColumns;

import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { capitalize } from 'lodash';
import { extractMondoTitleAndCode } from 'views/DataExploration/utils/helper';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

import AgeCell from '../AgeCell';
import MondoParticipantCount from '../DiagnosisTable/MondoParticipantCount';

const getDiagnosisColumns = (): ProColumnType[] => [
  {
    key: 'mondo_id_diagnosis',
    dataIndex: 'mondo_id_diagnosis',
    title: intl.get('entities.participant.mondo_diagnosis'),
    render: (mondo_id_diagnosis: string) => {
      if (!mondo_id_diagnosis) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }

      const mondoInfo = extractMondoTitleAndCode(mondo_id_diagnosis);

      return (
        <>
          {capitalize(mondoInfo?.title)} (MONDO:{' '}
          <ExternalLink href={`http://purl.obolibrary.org/obo/MONDO_${mondoInfo?.code}`}>
            {mondoInfo?.code}
          </ExternalLink>
          )
        </>
      );
    },
  },
  {
    key: 'source_text',
    dataIndex: 'source_text',
    title: intl.get('entities.participant.source_text'),
    render: (source_text: string) => source_text || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'age_at_event_days',
    dataIndex: 'age_at_event_days',
    title: intl.get('entities.participant.age'),
    tooltip: intl.get('entities.participant.age_tooltip_diagnosis'),
    render: (age_at_event_days: number) => <AgeCell ageInDays={age_at_event_days} />,
  },
  {
    key: 'mondo_term',
    dataIndex: 'mondo_id_diagnosis',
    title: intl.get('entities.participant.mondo_term'),
    tooltip: intl.get('entities.participant.mondo_term_tooltip'),
    render: (mondo_id_diagnosis: string) => (
      <MondoParticipantCount diagnosis={mondo_id_diagnosis} />
    ),
  },
];

export default getDiagnosisColumns;

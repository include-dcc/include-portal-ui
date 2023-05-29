import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { extractPhenotypeTitleAndCode } from 'views/DataExploration/utils/helper';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

import AgeCell from '../AgeCell';
import HpoParticipantCount from '../PhenotypeTable/HpoParticipantCount';
const getPhenotypeColumns = (): ProColumnType[] => [
  {
    key: 'hpo_phenotype_observed',
    dataIndex: 'hpo_phenotype_observed',
    title: intl.get('entities.participant.phenotype_hpo'),
    render: (hpo_phenotype_observed: string) => {
      if (!hpo_phenotype_observed) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }
      const phenotypeInfo = extractPhenotypeTitleAndCode(hpo_phenotype_observed);

      return (
        <>
          {`${phenotypeInfo?.title}`} (HP:{' '}
          <ExternalLink href={`http://purl.obolibrary.org/obo/HP_${phenotypeInfo?.code}`}>
            {phenotypeInfo?.code}
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
  },
  {
    key: 'age_at_event_days',
    dataIndex: 'age_at_event_days',
    title: intl.get('entities.participant.age'),
    tooltip: intl.get('entities.participant.age_tooltip_phenotype'),
    render: (age_at_event_days: number) => <AgeCell ageInDays={age_at_event_days} />,
  },
  {
    key: 'hpo_term',
    dataIndex: 'hpo_phenotype_observed',
    title: intl.get('entities.participant.hpo_term'),
    tooltip: intl.get('entities.participant.hpo_term_tooltip'),
    render: (hpo_phenotype_observed: string) => (
      <HpoParticipantCount phenotype={hpo_phenotype_observed} />
    ),
  },
];

export default getPhenotypeColumns;

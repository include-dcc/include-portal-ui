import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { extractPhenotypeTitleAndCode } from 'views/DataExploration/utils/helper';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { readableDistanceByDays } from 'utils/dates';

import HpoParticipantCount from '../PhenotypeTable/HpoParticipantCount';
const getPhenotypeColumns = (): ProColumnType[] => [
  {
    key: 'hpo_phenotype_observed',
    dataIndex: 'hpo_phenotype_observed',
    title: intl.get('entities.participant.phenotype.phenotype_hpo'),
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
    dataIndex: 'hpo_phenotype_observed',
    title: intl.get('entities.participant.phenotype.source_text'),
    render: (hpo_phenotype_observed: string) => {
      const phenotypeInfo = extractPhenotypeTitleAndCode(hpo_phenotype_observed);

      return phenotypeInfo?.title || TABLE_EMPTY_PLACE_HOLDER;
    },
  },
  {
    key: 'age_at_event_days',
    dataIndex: 'age_at_event_days',
    title: intl.get('entities.participant.phenotype.age'),
    tooltip: intl.get('entities.participant.phenotype.age_tooltip'),
    render: (age_at_event_days: number) =>
      age_at_event_days ? readableDistanceByDays(age_at_event_days) : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'hpo_term',
    dataIndex: 'hpo_phenotype_observed',
    title: intl.get('entities.participant.phenotype.hpo_term'),
    tooltip: intl.get('entities.participant.phenotype.hpo_term_tooltip'),
    render: (hpo_phenotype_observed: string) => (
      <HpoParticipantCount phenotype={hpo_phenotype_observed} />
    ),
  },
];

export default getPhenotypeColumns;

import intl from 'react-intl-universal';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import ExpandableCell from '@ferlab/ui/core/components/tables/ExpandableCell';
import { IParticipantPhenotype } from 'graphql/participants/models';
import { capitalize } from 'lodash';
import { extractPhenotypeTitleAndCode } from 'views/DataExploration/utils/helper';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

import AgeCell from '../AgeCell';
import HpoParticipantCount from '../PhenotypeTable/HpoParticipantCount';
const getPhenotypeDefaultColumns = (): ProColumnType[] => [
  {
    key: 'hpo_phenotype_observed',
    title: intl.get('entities.participant.phenotype_hpo'),
    render: (phenotype: IParticipantPhenotype) => {
      const phenotypeNames = phenotype?.hpo_phenotype_observed;
      if (!phenotypeNames || phenotypeNames.length === 0) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }
      return (
        <ExpandableCell
          nOfElementsWhenCollapsed={1}
          dataSource={[phenotypeNames]}
          renderItem={(hpo_id_phenotype, index): React.ReactNode => {
            const phenotypeInfo = extractPhenotypeTitleAndCode(hpo_id_phenotype);

            return phenotypeInfo ? (
              <div key={index}>
                {capitalize(phenotypeInfo.title)} (HP:
                <ExternalLink href={`http://purl.obolibrary.org/obo/HP_${phenotypeInfo.code}`}>
                  {phenotypeInfo.code}
                </ExternalLink>
                )
              </div>
            ) : (
              TABLE_EMPTY_PLACE_HOLDER
            );
          }}
        />
      );
    },
  },
  {
    key: 'source_text',
    title: intl.get('entities.participant.source_text'),
    render: (phenotype: IParticipantPhenotype) =>
      phenotype?.source_text ? phenotype.source_text : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'age_at_event_days',
    title: intl.get('entities.participant.age'),
    tooltip: intl.get('entities.participant.age_tooltip_phenotype'),
    render: (diagnosis: IParticipantPhenotype) =>
      diagnosis.age_at_event_days ? (
        <AgeCell ageInDays={diagnosis.age_at_event_days} />
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
  },
  {
    key: 'hpo_term',
    title: intl.get('entities.participant.hpo_term'),
    tooltip: intl.get('entities.participant.hpo_term_tooltip'),
    render: (diagnosis: IParticipantPhenotype) =>
      diagnosis?.hpo_phenotype_observed ? (
        <HpoParticipantCount phenotype={diagnosis.hpo_phenotype_observed} />
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
  },
];

export default getPhenotypeDefaultColumns;

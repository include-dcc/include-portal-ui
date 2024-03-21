import intl from 'react-intl-universal';
import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import ExpandableCell from '@ferlab/ui/core/components/tables/ExpandableCell';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { Tag } from 'antd';
import { IStudyEntity } from 'graphql/studies/models';

import styles from '../index.module.scss';

// eslint-disable-next-line complexity
const getSummaryDescriptions = (study?: IStudyEntity): IEntityDescriptionsItem[] => [
  {
    label: intl.get('entities.study.study_code'),
    value: study?.study_code || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.study.study_name'),
    value: study?.study_name || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.study.program'),
    value: study?.program || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.study.dbGaP'),
    value: study?.external_id ? (
      <ExternalLink
        href={`https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${study.external_id}`}
      >
        {study.external_id}
      </ExternalLink>
    ) : (
      TABLE_EMPTY_PLACE_HOLDER
    ),
  },
  {
    label: intl.get('entities.study.participant_life_span'),
    value: study?.part_lifespan_stage
      ? study?.part_lifespan_stage.map((lifespan) => <Tag color="cyan">{lifespan}</Tag>)
      : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.study.description'),
    value: study?.description || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.study.domain'),
    value: study?.domain || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.study.data_source'),
    value: study?.data_source || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.study.date_collection_start'),
    value: study?.date_collection_start_year || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.study.date_collection_end'),
    value: study?.date_collection_end_year || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.study.selection_criteria'),
    value: study?.selection_criteria || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.study.study_design'),
    value: study?.study_design ? study.study_design.join(', ') : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.study.study_website'),
    value: study?.website ? (
      <ExternalLink href={study.website}>{study.website}</ExternalLink>
    ) : (
      TABLE_EMPTY_PLACE_HOLDER
    ),
  },
  {
    label: intl.get('entities.study.publication'),
    value: study?.publication ? (
      <ExpandableCell
        nOfElementsWhenCollapsed={3}
        dataSource={study.publication}
        renderItem={(sourceText) => (
          <ExternalLink
            className={styles.externalLink}
            href={`https://pubmed.ncbi.nlm.nih.gov/${sourceText.replace('PMID: ', '')}`}
          >
            {sourceText}
          </ExternalLink>
        )}
      />
    ) : (
      TABLE_EMPTY_PLACE_HOLDER
    ),
  },
  {
    label: intl.get('entities.study.principal_investigator'),
    value: study?.investigator_name || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.study.institution'),
    value: study?.institution || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.study.virtual_biorepository_email'),
    value: study?.biorepo_email ? (
      <ExternalLink href={`mailto:${study.biorepo_email}`}>{study.biorepo_email}</ExternalLink>
    ) : (
      TABLE_EMPTY_PLACE_HOLDER
    ),
  },
  {
    label: intl.get('entities.study.virtual_biorepository_url'),
    value: study?.biorepo_url ? (
      <ExternalLink href={study.biorepo_url}>{study.biorepo_url}</ExternalLink>
    ) : (
      TABLE_EMPTY_PLACE_HOLDER
    ),
  },
];

export default getSummaryDescriptions;

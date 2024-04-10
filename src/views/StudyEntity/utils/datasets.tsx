import intl from 'react-intl-universal';
import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import ExpandableCell from '@ferlab/ui/core/components/tables/ExpandableCell';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { Tag } from 'antd';
import { IStudyDataset } from 'graphql/studies/models';

import styles from '../index.module.scss';

const getDatasetDescription = (dataset: IStudyDataset): IEntityDescriptionsItem[] => [
  {
    label: intl.get('entities.study.dataset.dataset_id'),
    value: dataset.dataset_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.study.dataset.data_type'),
    value: dataset.data_types?.length
      ? dataset.data_types.map((dataType, index) => <Tag key={index}>{dataType}</Tag>)
      : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.study.dataset.experimental_strategy'),
    value: dataset.experimental_strategy ? (
      <Tag>{dataset.experimental_strategy}</Tag>
    ) : (
      TABLE_EMPTY_PLACE_HOLDER
    ),
  },
  {
    label: intl.get('entities.study.dataset.experimental_platform'),
    value: dataset.experimental_platform || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.study.dataset.publication'),
    value: dataset.publications?.length ? (
      <ExpandableCell
        nOfElementsWhenCollapsed={2}
        dataSource={dataset.publications}
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
    label: intl.get('entities.study.dataset.repository'),
    value:
      dataset.repository && dataset.repository_url ? (
        <ExternalLink href={dataset.repository_url}>{dataset.repository}</ExternalLink>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
  },
];

export default getDatasetDescription;

import intl from 'react-intl-universal';
import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { Tag } from 'antd';
import { IStudyDataset } from 'graphql/studies/models';

const getDatasetDescription = (dataset: IStudyDataset): IEntityDescriptionsItem[] => [
  {
    label: intl.get('entities.study.dataset.dataset_id'),
    value: dataset.dataset_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.study.dataset.data_type'),
    value: dataset.data_type ? <Tag>{dataset.data_type}</Tag> : TABLE_EMPTY_PLACE_HOLDER,
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
    value: dataset.experimental_platform,
  },
  {
    label: intl.get('entities.study.dataset.publication'),
    value: dataset.publication?.length ? (
      <>
        {dataset.publication.map((pub: string) => (
          <div>{pub}</div>
        ))}
      </>
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

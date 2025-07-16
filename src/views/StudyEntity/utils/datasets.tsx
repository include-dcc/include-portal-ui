/* eslint-disable complexity */
import intl from 'react-intl-universal';
import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { Tag } from 'antd';
import { ArrangerResultsTree } from 'graphql/models';
import { IPublicationDetails, IStudyDataset } from 'graphql/studies/models';
import { PublicPublicationDetails, PublicStudyDataset } from 'views/PublicStudyEntity/types';

import Publication from 'components/Publication';
import PublicPublication from 'components/Publication/PublicPublication';

const getDatasetDescription = (
  dataset: IStudyDataset | PublicStudyDataset,
  isPublic = false,
): IEntityDescriptionsItem[] => {
  const items: IEntityDescriptionsItem[] = [];

  if (dataset.external_dataset_id)
    items.push({
      label: intl.get('entities.study.dataset.external_dataset_id'),
      value: dataset.external_dataset_id || TABLE_EMPTY_PLACE_HOLDER,
    });

  if (dataset.description)
    items.push({
      label: intl.get('entities.study.dataset.description'),
      value: dataset.description || TABLE_EMPTY_PLACE_HOLDER,
    });

  if (dataset.data_collection_start_year)
    items.push({
      label: intl.get('entities.study.dataset.data_collection_start_year'),
      value: dataset.data_collection_start_year || TABLE_EMPTY_PLACE_HOLDER,
    });

  if (dataset.data_collection_end_year)
    items.push({
      label: intl.get('entities.study.dataset.data_collection_end_year'),
      value: dataset.data_collection_end_year || TABLE_EMPTY_PLACE_HOLDER,
    });

  if (dataset.data_categories?.length)
    items.push({
      label: intl.get('entities.study.dataset.data_categories'),
      value: dataset.data_categories?.join(', ') || TABLE_EMPTY_PLACE_HOLDER,
    });

  if (dataset.data_types?.length)
    items.push({
      label: intl.get('entities.study.dataset.data_type'),
      value: dataset.data_types?.length
        ? dataset.data_types.map((dataType, index) => <Tag key={index}>{dataType}</Tag>)
        : TABLE_EMPTY_PLACE_HOLDER,
    });

  if (dataset.experimental_strategy)
    items.push({
      label: intl.get('entities.study.dataset.experimental_strategy'),
      value: dataset.experimental_strategy ? (
        <Tag>{dataset.experimental_strategy}</Tag>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
    });

  if (dataset.experimental_platform)
    items.push({
      label: intl.get('entities.study.dataset.experimental_platform'),
      value: dataset.experimental_platform || TABLE_EMPTY_PLACE_HOLDER,
    });

  if (
    !isPublic &&
    (dataset.publications?.length ||
      (dataset.publications_details as ArrangerResultsTree<IPublicationDetails>)?.hits?.edges
        ?.length)
  ) {
    items.push({
      label: intl.get('entities.study.dataset.publication'),
      value: (
        <Publication
          modalTitle={dataset?.dataset_name}
          publications={dataset?.publications}
          publications_details={
            dataset?.publications_details as ArrangerResultsTree<IPublicationDetails>
          }
        />
      ),
    });
  } else if (
    isPublic &&
    (dataset.publications?.length ||
      (dataset.publications_details as PublicPublicationDetails[])?.length)
  ) {
    items.push({
      label: intl.get('entities.study.dataset.publication'),
      value: (
        <PublicPublication
          modalTitle={dataset?.dataset_name}
          publications={dataset?.publications}
          publications_details={dataset?.publications_details as PublicPublicationDetails[]}
        />
      ),
    });
  }

  if (dataset.access_limitations?.length)
    items.push({
      label: intl.get('entities.study.dataset.access_limitations'),
      value: dataset.access_limitations?.join(', ') || TABLE_EMPTY_PLACE_HOLDER,
    });

  if (dataset.access_requirements?.length)
    items.push({
      label: intl.get('entities.study.dataset.access_requirements'),
      value: dataset.access_requirements?.join(', ') || TABLE_EMPTY_PLACE_HOLDER,
    });

  if (dataset.dbgap)
    items.push({
      label: intl.get('entities.study.dataset.dbgap'),
      value: dataset.dbgap ? (
        <ExternalLink
          href={`https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${dataset.dbgap}`}
          key={dataset.dbgap}
        >
          {dataset.dbgap}
        </ExternalLink>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
    });

  return items;
};

export default getDatasetDescription;

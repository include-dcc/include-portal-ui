import intl from 'react-intl-universal';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { IBiospecimenEntity } from 'graphql/biospecimens/models';
import { ArrangerEdge } from 'graphql/models';
import { IParticipantEntity } from 'graphql/participants/models';
import { capitalize } from 'lodash';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { readableDistanceByDays } from 'utils/dates';

import CollectionIdLink from '../BiospecimenTable/CollectionIdLink';

export const getBiospecimenColumns = (): ProColumnType[] => [
  {
    key: 'sample_id',
    dataIndex: 'sample_id',
    title: intl.get('entities.participant.biospecimen.sample_id'),
    render: (sample_id: string) => sample_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'collection_sample_id',
    dataIndex: 'collection_sample_id',
    title: intl.get('entities.participant.biospecimen.collection_id'),
    render: (collection_sample_id: string) =>
      collection_sample_id ? (
        <CollectionIdLink collectionId={collection_sample_id} />
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
  },
  {
    key: 'sample_type',
    dataIndex: 'sample_type',
    title: intl.get('entities.participant.biospecimen.sample_type'),
    render: (sample_type: string) => sample_type || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'collection_sample_type',
    dataIndex: 'collection_sample_type',
    title: intl.get('entities.participant.biospecimen.collection_sample_type'),
    render: (collection_sample_type: string) => collection_sample_type || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'age_at_biospecimen_collection',
    dataIndex: 'age_at_biospecimen_collection',
    title: intl.get('entities.participant.biospecimen.age'),
    tooltip: intl.get('entities.participant.biospecimen.age_tooltip'),
    render: (age_at_biospecimen_collection: number) =>
      age_at_biospecimen_collection
        ? readableDistanceByDays(age_at_biospecimen_collection)
        : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'container_id',
    dataIndex: 'container_id',
    title: intl.get('entities.participant.biospecimen.container_id'),
    render: (container_id: string) => container_id || TABLE_EMPTY_PLACE_HOLDER,
    defaultHidden: true,
  },
  {
    key: 'volume_ul',
    dataIndex: 'volume_ul',
    title: intl.get('entities.participant.biospecimen.volume'),
    render: (volume_ul: number) => volume_ul || TABLE_EMPTY_PLACE_HOLDER,
    defaultHidden: true,
  },
  {
    key: 'volume_unit',
    dataIndex: 'volume_unit',
    title: intl.get('entities.participant.biospecimen.volume_unit'),
    render: (volume_unit: string) => volume_unit || TABLE_EMPTY_PLACE_HOLDER,
    defaultHidden: true,
  },
  {
    key: 'status',
    dataIndex: 'status',
    title: intl.get('entities.participant.biospecimen.sample_availabilty'),
    render: (status: string) => capitalize(status) || TABLE_EMPTY_PLACE_HOLDER,
    defaultHidden: true,
  },
  {
    key: 'laboratory_procedure',
    dataIndex: 'laboratory_procedure',
    title: intl.get('entities.participant.biospecimen.laboratory_procedure'),
    render: (laboratory_procedure: string) => laboratory_procedure || TABLE_EMPTY_PLACE_HOLDER,
    defaultHidden: true,
  },
  {
    key: 'biospecimen_storage',
    dataIndex: 'biospecimen_storage',
    title: intl.get('entities.participant.biospecimen.biospecimen_storage'),
    render: (biospecimen_storage: string) => biospecimen_storage || TABLE_EMPTY_PLACE_HOLDER,
    defaultHidden: true,
  },
  {
    key: 'parent_sample_id',
    dataIndex: 'parent_sample_id',
    title: intl.get('entities.participant.biospecimen.parent_sample_id'),
    render: (parent_sample_id: string) => parent_sample_id || TABLE_EMPTY_PLACE_HOLDER,
    defaultHidden: true,
  },
  {
    key: 'parent_sample_type',
    dataIndex: 'parent_sample_type',
    title: intl.get('entities.participant.biospecimen.parent_sample_type'),
    render: (parent_sample_type: string) => parent_sample_type || TABLE_EMPTY_PLACE_HOLDER,
    defaultHidden: true,
  },
];

const filterDuplicateBiospecimens = (
  currentBiospecimen: ArrangerEdge<IBiospecimenEntity>,
  index: number,
  biospecimenArray: ArrangerEdge<IBiospecimenEntity>[],
) =>
  biospecimenArray.findIndex((biospecimen) => {
    if (biospecimen.node.container_id) {
      return (
        biospecimen.node.container_id === currentBiospecimen.node.container_id &&
        biospecimen.node.sample_id === currentBiospecimen.node.sample_id
      );
    }
    return biospecimen.node.sample_id === currentBiospecimen.node.sample_id;
  }) === index;

export const getBiospecimensFromParticipant = (
  participant?: IParticipantEntity,
): { biospecimens: IBiospecimenEntity[]; total: number } => {
  const files =
    participant?.files?.hits?.edges?.map((e) => ({ key: e.node.file_id, ...e.node })) || [];

  const biospecimens = files
    .flatMap((file) => file.biospecimens?.hits?.edges)
    .filter(filterDuplicateBiospecimens)
    .map((bio) => ({ key: bio.node.container_id || bio.node.sample_id, ...bio.node }));

  return { biospecimens: biospecimens || [], total: biospecimens.length || 0 };
};

import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import AgeCell from 'views/ParticipantEntity/AgeCell';

import { STATIC_ROUTES } from 'utils/routes';

import { INode } from '.';

export interface IDescriptionsItem {
  label: React.ReactNode;
  value?: React.ReactNode | string;
}

export const getCollectionDetails = (node: INode): IDescriptionsItem[] => [
  {
    label: intl.get('screen.hierarchicalBiospecimen.details.collection.collectionSampleId'),
    value: node.collection_sample_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('screen.hierarchicalBiospecimen.details.collection.externalCollectionSampleId'),
    value: node.external_collection_sample_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('screen.hierarchicalBiospecimen.details.collection.collectionSampleType'),
    value: node.collection_sample_type || TABLE_EMPTY_PLACE_HOLDER,
  },
];

const renderParticipantFhirId = (participantFhirId?: string, hasParticipantLink?: boolean) => {
  if (participantFhirId && hasParticipantLink) {
    return (
      <Link to={`${STATIC_ROUTES.PARTICIPANTS}/${participantFhirId}`}>{participantFhirId}</Link>
    );
  }
  return participantFhirId || TABLE_EMPTY_PLACE_HOLDER;
};

export const getSampleDetails = (
  node: INode,
  hasParticipantLink?: boolean,
): IDescriptionsItem[] => [
  {
    label: intl.get('screen.hierarchicalBiospecimen.details.sample.sampleId'),
    value: node.sample_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('screen.hierarchicalBiospecimen.details.sample.externalSampleId'),
    value: node.external_sample_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('screen.hierarchicalBiospecimen.details.sample.sampleType'),
    value: node.sample_type || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('screen.hierarchicalBiospecimen.details.sample.parentSampleType'),
    value: node.parent_sample_type || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('screen.hierarchicalBiospecimen.details.sample.ageAtBiospecimenCollection'),
    value: node.age_at_biospecimen_collection ? (
      <AgeCell ageInDays={node.age_at_biospecimen_collection} />
    ) : (
      TABLE_EMPTY_PLACE_HOLDER
    ),
  },
  {
    label: intl.get('screen.hierarchicalBiospecimen.details.sample.status'),
    value: node.status || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('screen.hierarchicalBiospecimen.details.sample.laboratoryProcedure'),
    value: node.laboratory_procedure || TABLE_EMPTY_PLACE_HOLDER,
  },
  // {
  //   label: intl.get('screen.hierarchicalBiospecimen.details.sample.nbFiles'),
  //   value: node.nb_files ? (
  //     <Link to={STATIC_ROUTES.DATA_EXPLORATION_DATAFILES}>{node.nb_files}</Link>
  //   ) : (
  //     TABLE_EMPTY_PLACE_HOLDER
  //   ),
  // },
  {
    label: intl.get('screen.hierarchicalBiospecimen.details.sample.participantFhirId'),
    value: renderParticipantFhirId(node.participant_fhir_id, hasParticipantLink),
  },
];

export const getContainerDetails = (node: INode): IDescriptionsItem[] => [
  {
    label: intl.get('screen.hierarchicalBiospecimen.details.container.containerId'),
    value: node.container_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('screen.hierarchicalBiospecimen.details.container.volume'),
    value: node.volume || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('screen.hierarchicalBiospecimen.details.container.volumeUnit'),
    value: node.volume_unit || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('screen.hierarchicalBiospecimen.details.container.biospecimenStorage'),
    value: node.biospecimen_storage || TABLE_EMPTY_PLACE_HOLDER,
  },
];

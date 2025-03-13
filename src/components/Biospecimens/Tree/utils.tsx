import intl from 'react-intl-universal';

import { INode } from '.';

export interface IDescriptionsItem {
  label: React.ReactNode;
  value?: React.ReactNode | string;
}

export const getCollectionDetails = (node: INode): IDescriptionsItem[] => [
  {
    label: intl.get('screen.hierarchicalBiospecimen.details.collection.collectionSampleId'),
    value: node.key,
  },
  {
    label: intl.get('screen.hierarchicalBiospecimen.details.collection.externalCollectionSampleId'),
    value: '',
  },
  {
    label: intl.get('screen.hierarchicalBiospecimen.details.collection.collectionSampleType'),
    value: '',
  },
];

export const getSampleDetails = (node: INode): IDescriptionsItem[] => [
  {
    label: intl.get('screen.hierarchicalBiospecimen.details.sample.sampleId'),
    value: node.key,
  },
  {
    label: intl.get('screen.hierarchicalBiospecimen.details.sample.externalSampleId'),
    value: '',
  },
  {
    label: intl.get('screen.hierarchicalBiospecimen.details.sample.sampleType'),
    value: '',
  },
  {
    label: intl.get('screen.hierarchicalBiospecimen.details.sample.parentSampleType'),
    value: '',
  },
  {
    label: intl.get('screen.hierarchicalBiospecimen.details.sample.ageAtBiospecimenCollection'),
    value: '',
  },
  {
    label: intl.get('screen.hierarchicalBiospecimen.details.sample.status'),
    value: '',
  },
  {
    label: intl.get('screen.hierarchicalBiospecimen.details.sample.laboratoryProcedure'),
    value: '',
  },
  {
    label: intl.get('screen.hierarchicalBiospecimen.details.sample.nbFiles'),
    value: '',
  },
  {
    label: intl.get('screen.hierarchicalBiospecimen.details.sample.participantFhirId'),
    value: '',
  },
];

export const getContainerDetails = (node: INode): IDescriptionsItem[] => [
  {
    label: intl.get('screen.hierarchicalBiospecimen.details.container.containerId'),
    value: node.key,
  },
  {
    label: intl.get('screen.hierarchicalBiospecimen.details.container.volume'),
    value: '',
  },
  {
    label: intl.get('screen.hierarchicalBiospecimen.details.container.volumeUnit'),
    value: '',
  },
  {
    label: intl.get('screen.hierarchicalBiospecimen.details.container.biospecimenStorage'),
    value: '',
  },
];

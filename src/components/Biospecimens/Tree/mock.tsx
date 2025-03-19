import { Status } from 'graphql/biospecimens/models';

import { INode } from '.';

export const data: INode[] = [
  {
    key: 'bs-6yhjxh2z2w',
    type: 'collectedSample',
    hasFiles: false,
    isSampleAvailable: false,
    count: 2,
    collection_sample_id: 'collection sample id 1',
    external_collection_sample_id: 'external collection sample id 1',
    collection_sample_type: 'collection sample type 1',
    children: [
      {
        key: 'bs-f64m32egpc',
        type: 'sample',
        hasFiles: false,
        isSampleAvailable: false,
        count: 1,
        sample_id: 'sample id 1',
        external_sample_id: 'external sample id 1',
        sample_type: 'sample type 1',
        parent_sample_type: 'parent sample type 1',
        age_at_biospecimen_collection: 1234,
        status: Status.UNAVAILABLE,
        laboratory_procedure: 'laboratory procedure 1',
        participant_fhir_id: 'pt-d6mf7rks',
        children: [
          {
            key: 'bs-zr9gxhngdm',
            type: 'sample',
            hasFiles: true,
            isSampleAvailable: false,
            count: 1,
            sample_id: 'sample id 2',
            external_sample_id: 'external sample id 2',
            sample_type: 'sample type 2',
            parent_sample_type: 'parent sample type 2',
            age_at_biospecimen_collection: 375,
            status: Status.UNAVAILABLE,
            laboratory_procedure: 'laboratory procedure 2',
            participant_fhir_id: 'participant fhir id 2',
            children: [
              {
                key: 'bs-tkdy3rdgn9',
                type: 'container',
                hasFiles: false,
                isSampleAvailable: false,
                count: 0,
                container_id: 'container id 1',
                volume: 1,
                volume_unit: 'mL',
                biospecimen_storage: 'biospecimen storage 1',
                children: [],
              },
            ],
          },
        ],
      },
      {
        key: 'bs-cwg4gaawzc',
        type: 'sample',
        hasFiles: false,
        isSampleAvailable: false,
        count: 1,
        sample_id: 'sample id 3',
        external_sample_id: 'external sample id 3',
        sample_type: 'sample type 3',
        parent_sample_type: 'parent sample type 3',
        age_at_biospecimen_collection: 8735,
        status: Status.UNAVAILABLE,
        laboratory_procedure: 'laboratory procedure 3',
        participant_fhir_id: 'participant fhir id 3',
        children: [
          {
            key: 'bs-022kaezw',
            type: 'sample',
            hasFiles: true,
            isSampleAvailable: true,
            count: 1,
            sample_id: 'sample id 4',
            external_sample_id: 'external sample id 4',
            sample_type: 'sample type 4',
            parent_sample_type: 'parent sample type 4',
            age_at_biospecimen_collection: 431,
            status: Status.AVAILABLE,
            laboratory_procedure: 'laboratory procedure 4',
            participant_fhir_id: 'participant fhir id 4',
            children: [
              {
                key: 'bs-48btn8eg4w',
                type: 'container',
                hasFiles: false,
                isSampleAvailable: false,
                count: 0,
                container_id: 'container id 2',
                volume: 3,
                volume_unit: 'fiole',
                biospecimen_storage: 'biospecimen storage 2',
                children: [],
              },
            ],
          },
        ],
      },
    ],
    hasCollectionAvailability: true,
  },
  {
    key: '2bs-6yhjxh2z2w',
    type: 'collectedSample',
    hasFiles: false,
    isSampleAvailable: false,
    count: 2,
    collection_sample_id: 'collection sample id 2',
    external_collection_sample_id: 'external collection sample id 2',
    collection_sample_type: 'collection sample type 2',
    children: [
      {
        key: '2bs-f64m32egpc',
        type: 'sample',
        hasFiles: false,
        isSampleAvailable: false,
        count: 1,
        sample_id: 'sample id 5',
        external_sample_id: 'external sample id 5',
        sample_type: 'sample type 5',
        parent_sample_type: 'parent sample type 5',
        age_at_biospecimen_collection: 5,
        status: Status.UNAVAILABLE,
        laboratory_procedure: 'laboratory procedure 5',
        participant_fhir_id: 'participant fhir id 5',
        children: [
          {
            key: '2bs-zr9gxhngdm',
            type: 'sample',
            hasFiles: true,
            isSampleAvailable: false,
            count: 1,
            sample_id: 'sample id 6',
            external_sample_id: 'external sample id 6',
            sample_type: 'sample type 6',
            parent_sample_type: 'parent sample type 6',
            age_at_biospecimen_collection: 6,
            status: Status.UNAVAILABLE,
            laboratory_procedure: 'laboratory procedure 6',
            participant_fhir_id: 'participant fhir id 6',
            children: [
              {
                key: '2bs-tkdy3rdgn9',
                type: 'container',
                hasFiles: false,
                isSampleAvailable: false,
                count: 0,
                container_id: 'container id 3',
                volume: 6,
                volume_unit: 'cm',
                biospecimen_storage: 'biospecimen storage 3',
                children: [],
              },
            ],
          },
        ],
      },
      {
        key: '2bs-cwg4gaawzc',
        type: 'sample',
        hasFiles: false,
        isSampleAvailable: false,
        count: 1,
        sample_id: 'sample id 7',
        external_sample_id: 'external sample id 7',
        sample_type: 'sample type 7',
        parent_sample_type: 'parent sample type 7',
        age_at_biospecimen_collection: 7,
        status: Status.UNAVAILABLE,
        laboratory_procedure: 'laboratory procedure 7',
        participant_fhir_id: 'participant fhir id 7',
        children: [
          {
            key: '2bs-022kaezw',
            type: 'sample',
            hasFiles: true,
            isSampleAvailable: true,
            count: 1,
            sample_id: 'sample id 8',
            external_sample_id: 'external sample id 8',
            sample_type: 'sample type 8',
            parent_sample_type: 'parent sample type 8',
            age_at_biospecimen_collection: 8,
            status: Status.AVAILABLE,
            laboratory_procedure: 'laboratory procedure 8',
            participant_fhir_id: 'participant fhir id 8',
            children: [
              {
                key: '2bs-48btn8eg4w',
                type: 'container',
                hasFiles: false,
                isSampleAvailable: false,
                count: 0,
                container_id: 'container id 4',
                volume: 4,
                volume_unit: 'gouttes',
                biospecimen_storage: 'biospecimen storage 4',
                children: [],
              },
            ],
          },
        ],
      },
    ],
    hasCollectionAvailability: true,
  },
];

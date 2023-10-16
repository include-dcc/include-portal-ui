import { gql } from '@apollo/client';

export const SEARCH_BIOSPECIMEN_QUERY = gql`
  query searchBiospecimen(
    $sqon: JSON
    $first: Int
    $offset: Int
    $sort: [Sort]
    $searchAfter: JSON
  ) {
    biospecimen {
      hits(filters: $sqon, first: $first, offset: $offset, sort: $sort, searchAfter: $searchAfter) {
        total
        edges {
          searchAfter
          node {
            id
            container_id
            status
            sample_id
            external_sample_id
            sample_type
            parent_sample_id
            parent_sample_type
            collection_sample_id
            collection_sample_type
            age_at_biospecimen_collection
            laboratory_procedure
            volume
            volume_unit
            biospecimen_storage
            study_id
            study {
              study_code
              study_id
            }
            nb_files

            participant {
              participant_id
            }

            files {
              hits {
                total
              }
            }
          }
        }
      }
    }
  }
`;

export const CHECK_BIOSPECIMEN_MATCH = gql`
  query fetchMatchBiospecimen($sqon: JSON, $first: Int, $offset: Int) {
    biospecimen {
      hits(filters: $sqon, first: $first, offset: $offset) {
        edges {
          node {
            fhir_id
            sample_id
            study_id
            container_id
          }
        }
      }
    }
  }
`;

export const GET_BIOSPECIMEN_COUNT = gql`
  query getBiospecimenCount($sqon: JSON) {
    biospecimen {
      hits(filters: $sqon) {
        total
      }
    }
  }
`;

export const BIOSPECIMEN_SEARCH_BY_ID_QUERY = gql`
  query searchBiospecimenById($sqon: JSON) {
    biospecimen {
      hits(filters: $sqon) {
        edges {
          node {
            sample_id
            collection_sample_id
          }
        }
      }
    }
  }
`;

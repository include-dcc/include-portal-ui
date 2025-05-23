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
            fhir_id
            container_id
            status
            sample_id
            external_sample_id
            sample_type
            parent_sample_id
            parent_sample_type
            collection_sample_id
            collection_sample_type
            collection_fhir_id
            age_at_biospecimen_collection
            laboratory_procedure
            volume
            volume_unit
            biospecimen_storage
            study_id
            study {
              study_code
              study_id
              study_name
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
            external_sample_id
            sample_id
            study {
              study_code
            }
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
            external_sample_id
            collection_sample_id
          }
        }
      }
    }
  }
`;

export const GET_HIERARCHY_BIOSPECIMEN = gql`
  query getHierarchicalBiospecimen($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort]) {
    biospecimen_trees {
      hits(filters: $sqon, first: $first, offset: $offset, sort: $sort) {
        total
        edges {
          node {
            fhir_id
            tree_str
            sample_id
            collection_fhir_id
          }
        }
      }
    }
  }
`;

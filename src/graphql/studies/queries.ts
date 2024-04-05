import { gql } from '@apollo/client';

export const GET_STUDIES = gql`
  query getStudy($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort]) {
    study {
      hits(filters: $sqon, first: $first, offset: $offset, sort: $sort) {
        total
        edges {
          node {
            id
            study_id
            study_code
            study_name
            biobank_contact
            biobank_request_link
            biospecimen_count
            contacts {
              hits {
                total
                edges {
                  node {
                    email
                    name
                  }
                }
              }
            }
            controlled_access
            part_lifespan_stages
            data_category
            data_source
            date_collection_start_year
            date_collection_end_year
            description
            domain
            external_id
            family_count
            institutions
            investigator_names
            program
            publications
            participant_count
            study_designs
            selection_criteria
            website
          }
        }
      }
    }
  }
`;

export const GET_STUDY = gql`
  query getStudies($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort]) {
    study {
      hits(offset: $offset, sort: $sort, first: $first, filters: $sqon) {
        total
        edges {
          node {
            id
            study_id
            study_code
            study_name
            biobank_contact
            biobank_request_link
            biospecimen_count
            contacts {
              hits {
                total
                edges {
                  node {
                    email
                    name
                  }
                }
              }
            }
            controlled_access
            data_types {
              hits {
                total
                edges {
                  node {
                    data_type
                    file_count
                  }
                }
              }
            }
            date_collection_end_year
            date_collection_start_year
            description
            domain
            expected_data_categories
            expected_number_participants
            experimental_strategies {
              hits {
                total
                edges {
                  node {
                    experimental_strategy
                    file_count
                  }
                }
              }
            }
            external_id
            file_count
            institutions
            investigator_names
            part_lifespan_stages
            participant_count
            program
            publications
            selection_criteria
            study_code
            study_designs
            study_name
            website
            data_category
            data_source
            dataset {
              hits {
                total
                edges {
                  node {
                    dataset_id
                    dataset_name
                    date_collection_start_year
                    date_collection_end_year
                    data_category
                    data_types
                    expected_data_categories
                    experimental_strategy
                    experimental_platform
                    publications
                    access_limitations
                    access_requirements
                    repository
                    repository_url
                    participant_count
                    biospecimen_count
                    file_count
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const SEARCH_STUDIES_QUERY = gql`
  query searchStudy($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort]) {
    study {
      hits(filters: $sqon, first: $first, offset: $offset, sort: $sort) {
        total
        edges {
          node {
            id
            domain
            study_id
            study_code
            study_name
            program
            external_id
            participant_count
            family_count
            biospecimen_count
            attribution
            data_category
            website
          }
        }
      }
    }
  }
`;

export const SEARCH_STUDIES_BY_ID_AND_NAME_QUERY = gql`
  query searchStudyById($sqon: JSON) {
    study {
      hits(filters: $sqon) {
        edges {
          node {
            study_id
            study_code
            study_name
            external_id
          }
        }
      }
    }
  }
`;

export const GET_STUDY_COUNT = gql`
  query getStudiesCount($sqon: JSON) {
    study {
      hits(filters: $sqon) {
        total
      }
    }
  }
`;

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
            description
            domains
            part_lifespan_stages
            data_category
            data_sources
            date_collection_start_year
            date_collection_end_year
            description
            external_id
            external_ids
            family_count
            file_count
            guid
            institutions
            investigator_names
            is_harmonized
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
            acknowledgement
            biobank_contact
            biobank_request_link
            biospecimen_count
            citation_statement
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
            domains
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
            external_ids
            file_count
            guid
            institutions
            investigator_names
            is_harmonized
            part_lifespan_stages
            participant_count
            program
            publications
            selection_criteria
            study_code
            study_designs
            study_meta_categories
            study_name
            website
            data_category
            data_sources
            dataset {
              hits {
                total
                edges {
                  node {
                    access_limitations
                    access_requirements
                    biospecimen_count
                    data_category
                    data_types
                    dataset_id
                    dataset_name
                    date_collection_start_year
                    date_collection_end_year
                    expected_data_categories
                    experimental_platform
                    experimental_strategy
                    file_count
                    is_harmonized
                    participant_count
                    publications
                    repository
                    repository_url
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

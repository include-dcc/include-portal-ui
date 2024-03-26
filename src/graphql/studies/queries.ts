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
            biorepo_email
            biorepo_url
            biospecimen_count
            contact_email
            contact_name
            controlled_access
            part_lifespan_stage
            data_category
            data_source
            date_collection_start_year
            date_collection_end_year
            description
            domain
            external_id
            family_count
            institution
            investigator_name
            program
            publication
            participant_count
            study_design
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
            biorepo_email
            biorepo_url
            biospecimen_count
            contact_email
            contact_name
            controlled_access
            date_collection_end_year
            date_collection_start_year
            description
            domain
            expected_data_categories
            expected_number_participants
            external_id
            file_count
            institution
            investigator_name
            part_lifespan_stage
            participant_count
            program
            publication
            selection_criteria
            study_code
            study_design
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
                    data_type
                    expected_data_categories
                    experimental_strategy
                    experimental_platform
                    publication
                    access_limitation
                    access_requirement
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

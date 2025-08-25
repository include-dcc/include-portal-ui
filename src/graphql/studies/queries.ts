import { gql } from '@apollo/client';

export const GET_STUDIES = gql`
  query getStudies($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort]) {
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
            is_guid_mapped
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
  query getStudy($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort]) {
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
                    institution
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
            doi {
              citation
              url
            }
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
            is_guid_mapped
            is_harmonized
            part_lifespan_stages
            participant_count
            program
            publications
            publications_details {
              hits {
                edges {
                  node {
                    authors {
                      hits {
                        edges {
                          node {
                            family
                            given
                          }
                        }
                      }
                    }
                    DOI
                    ISSN
                    PMCID
                    PMID
                    accessed_date_parts
                    container_title
                    container_title_short
                    issue
                    issued_date_parts
                    page
                    pubmed_id
                    source
                    title
                    volume
                  }
                }
              }
            }
            selection_criteria
            study_code
            study_designs
            study_meta_categories
            study_name
            website
            data_category
            data_sources
            datasets {
              hits {
                total
                edges {
                  node {
                    access_limitations
                    access_requirements
                    data_categories
                    data_types
                    dataset_id
                    dataset_name
                    data_collection_start_year
                    data_collection_end_year
                    dbgap
                    description
                    doi_url
                    expected_data_categories
                    expected_number_of_files
                    expected_number_participants
                    experimental_platform
                    experimental_strategy
                    external_dataset_id
                    is_harmonized
                    publications
                    publications_details {
                      hits {
                        edges {
                          node {
                            authors {
                              hits {
                                edges {
                                  node {
                                    family
                                    given
                                  }
                                }
                              }
                            }
                            DOI
                            ISSN
                            PMCID
                            PMID
                            accessed_date_parts
                            container_title
                            container_title_short
                            issue
                            issued_date_parts
                            page
                            pubmed_id
                            source
                            title
                            volume
                          }
                        }
                      }
                    }
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

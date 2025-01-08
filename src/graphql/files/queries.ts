import { gql } from '@apollo/client';

export const SEARCH_FILES_QUERY = gql`
  query searchFiles($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort], $searchAfter: JSON) {
    file {
      hits(filters: $sqon, first: $first, offset: $offset, sort: $sort, searchAfter: $searchAfter) {
        total
        edges {
          searchAfter
          node {
            id
            fhir_id
            file_id
            external_id
            data_category
            data_type
            dataset_names
            file_format
            size
            controlled_access
            access_urls
            acl
            file_name
            repository
            nb_participants
            nb_biospecimens
            fhir_document_reference
            index {
              urls
              file_name
            }
            study {
              study_id
              study_code
              study_name
              program
            }
            sequencing_experiment {
              hits {
                edges {
                  node {
                    experiment_strategy
                  }
                }
              }
            }
            participants {
              hits {
                edges {
                  node {
                    participant_id
                    down_syndrome_status
                    external_id
                    ethnicity
                    sex
                    race
                    families_id
                    family_type
                    family {
                      relations_to_proband {
                        hits {
                          edges {
                            node {
                              role
                            }
                          }
                        }
                      }
                    }
                    diagnosis {
                      hits {
                        total
                        edges {
                          node {
                            mondo_display_term
                            source_text
                            age_at_event_days
                          }
                        }
                      }
                    }
                    outcomes {
                      hits {
                        total
                        edges {
                          node {
                            vital_status
                            age_at_event_days {
                              value
                            }
                          }
                        }
                      }
                    }
                    phenotype {
                      hits {
                        total
                        edges {
                          node {
                            age_at_event_days
                            hpo_phenotype_observed
                          }
                        }
                      }
                    }
                    biospecimens {
                      hits {
                        edges {
                          node {
                            external_parent_sample_id
                            external_collection_sample_id
                            external_container_id
                            sample_id
                            sample_type
                            external_sample_id
                            collection_sample_type
                            age_at_biospecimen_collection
                            collection_sample_id
                            parent_sample_id
                            parent_sample_type
                            biospecimen_storage
                            container_id
                            volume
                            volume_unit
                            laboratory_procedure
                            status
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

export const GET_FILE_ENTITY = gql`
  query getFileEntity($sqon: JSON) {
    file {
      hits(filters: $sqon) {
        edges {
          node {
            id
            access_urls

            participants {
              hits {
                total
                edges {
                  node {
                    biospecimens {
                      hits {
                        total
                        edges {
                          node {
                            sample_id
                            sample_type
                            collection_sample_id
                            collection_sample_type
                          }
                        }
                      }
                    }
                    down_syndrome_status
                    participant_id
                    study {
                      study_code
                      external_id
                    }
                    study_id
                  }
                }
              }
            }

            controlled_access
            data_category
            data_type
            dataset_names
            file_id
            file_name
            file_format
            hashes {
              etag
            }
            nb_biospecimens
            nb_participants
            sequencing_experiment {
              hits {
                edges {
                  node {
                    experiment_strategy
                  }
                }
              }
            }
            size
            study {
              external_id
              study_code
              study_id
              study_name
            }
          }
        }
      }
    }
  }
`;

export const GET_FILE_COUNT = gql`
  query getFileCount($sqon: JSON) {
    file {
      hits(filters: $sqon) {
        total
      }
    }
  }
`;

export const CHECK_FILE_MATCH = gql`
  query fetchMatchFile($sqon: JSON, $first: Int, $offset: Int) {
    file {
      hits(filters: $sqon, first: $first, offset: $offset) {
        edges {
          node {
            fhir_id
            file_id
            study {
              study_code
            }
          }
        }
      }
    }
  }
`;

export const FILE_SEARCH_BY_ID_QUERY = gql`
  query searchFileById($sqon: JSON) {
    file {
      hits(filters: $sqon) {
        edges {
          node {
            file_id
          }
        }
      }
    }
  }
`;

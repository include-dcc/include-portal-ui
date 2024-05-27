import { gql } from '@apollo/client';

export const SEARCH_PARTICIPANT_QUERY = gql`
  query searchParticipant(
    $sqon: JSON
    $first: Int
    $offset: Int
    $sort: [Sort]
    $searchAfter: JSON
  ) {
    participant {
      hits(filters: $sqon, first: $first, offset: $offset, sort: $sort, searchAfter: $searchAfter) {
        total
        edges {
          searchAfter
          node {
            id
            down_syndrome_diagnosis
            participant_id
            external_id
            study_id
            study {
              study_code
              study_id
              study_name
            }
            study_external_id
            down_syndrome_status
            sex
            family_type
            is_proband
            age_at_data_collection
            ethnicity
            race
            nb_files
            nb_biospecimens

            files {
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
                          }
                        }
                      }
                    }
                  }
                }
              }
            }

            diagnosis {
              hits {
                edges {
                  node {
                    mondo_display_term
                    source_text
                  }
                }
              }
            }

            observed_phenotype {
              hits {
                edges {
                  node {
                    name
                    is_tagged
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

export const GET_PARTICIPANT_COUNT = gql`
  query getParticipantCount($sqon: JSON) {
    participant {
      hits(filters: $sqon) {
        total
      }
    }
  }
`;

export const GET_PARTICIPANT_ENTITY = gql`
  query getParticipantEntity($sqon: JSON) {
    participant {
      hits(filters: $sqon) {
        edges {
          node {
            id
            diagnosis {
              hits {
                edges {
                  node {
                    mondo_display_term
                    source_text
                    age_at_event_days
                    diagnosis_id
                  }
                }
              }
            }
            down_syndrome_status
            ethnicity
            external_id
            family {
              family_id
              relations_to_proband {
                hits {
                  edges {
                    node {
                      role
                      participant_id
                    }
                  }
                }
              }
            }
            family_type
            files {
              hits {
                total
                edges {
                  node {
                    data_category
                    sequencing_experiment {
                      hits {
                        edges {
                          node {
                            experiment_strategy
                          }
                        }
                      }
                    }
                    biospecimens {
                      hits {
                        total
                        edges {
                          node {
                            age_at_biospecimen_collection
                            sample_id
                            sample_type
                            parent_sample_id
                            parent_sample_type
                            collection_sample_id
                            collection_sample_type
                            container_id
                            volume
                            volume_unit
                            laboratory_procedure
                            biospecimen_storage
                            fhir_id
                            status
                          }
                        }
                      }
                    }
                  }
                }
              }
            }

            nb_biospecimens
            nb_files
            participant_id
            phenotype {
              hits {
                edges {
                  node {
                    age_at_event_days
                    fhir_id
                    hpo_phenotype_observed
                    observed
                    source_text
                  }
                }
              }
            }
            race
            study {
              study_name
              external_id
              study_code
            }
            study_id
            sex
          }
        }
      }
    }
  }
`;

export const CHECK_PARTICIPANT_MATCH = gql`
  query fetchMatchParticipant($sqon: JSON, $first: Int, $offset: Int) {
    participant {
      hits(filters: $sqon, first: $first, offset: $offset) {
        edges {
          node {
            fhir_id
            participant_id
            external_id
            study {
              study_code
            }
          }
        }
      }
    }
  }
`;

export const PARTICIPANT_SEARCH_BY_ID_QUERY = gql`
  query searchParticipantById($sqon: JSON) {
    participant {
      hits(filters: $sqon) {
        edges {
          node {
            participant_id
            external_id
          }
        }
      }
    }
  }
`;

export const GET_PARTICIPANT_DOWN_SYNDROME_STATUS = gql`
  query getParticipantDownSyndromeStatus($sqon: JSON) {
    participant {
      hits(filters: $sqon) {
        edges {
          node {
            participant_id
            down_syndrome_status
          }
        }
      }
    }
  }
`;

export const GET_DATA_FILE_AGG = gql`
  query getDataFileAgg($sqon: JSON) {
    file {
      aggregations(filters: $sqon, include_missing: false) {
        exp_strategies: sequencing_experiment__experiment_strategy {
          buckets {
            key
          }
        }
        data_category {
          buckets {
            key
          }
        }
      }
    }
  }
`;

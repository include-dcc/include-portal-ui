import { gql } from '@apollo/client';

export const SEARCH_PARTICIPANT_QUERY = gql`
  query searchParticipant($sqon: JSON, $first: Int, $offset: Int, $sort: [Sort]) {
    participant {
      hits(filters: $sqon, first: $first, offset: $offset, sort: $sort) {
        total
        edges {
          node {
            id
            down_syndrome_diagnosis
            participant_id
            external_id
            study_id
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
                    mondo_id_diagnosis
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
                    mondo_id_diagnosis
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
              family_relations {
                hits {
                  edges {
                    node {
                      relation
                      related_participant_id
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
                      experiment_strategy
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
                            volume_ul
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
                  }
                }
              }
            }
            race
            study {
              study_code
              study_name
              external_id
            }
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
            study_id
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
            down_syndrome_status
          }
        }
      }
    }
  }
`;

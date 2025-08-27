import { gql } from '@apollo/client';

export const GET_QUICK_FILTER_EXPLO = gql`
  query getQuickFilterExploFacets($sqon: JSON) {
    participant {
      aggregations(filters: $sqon, include_missing: false) {
        # Participant
        study__study_code {
          buckets {
            key
            doc_count
          }
        }
        down_syndrome_status {
          buckets {
            key
            doc_count
          }
        }
        mondo__name {
          buckets {
            key
            doc_count
          }
        }
        maxo__code {
          buckets {
            key
            doc_count
          }
        }
        family_type {
          buckets {
            key
            doc_count
          }
        }
        sex {
          buckets {
            key
            doc_count
          }
        }
        race {
          buckets {
            key
            doc_count
          }
        }
        ethnicity {
          buckets {
            key
            doc_count
          }
        }
        # Observed Phenotype
        observed_phenotype__name {
          buckets {
            key
            doc_count
          }
        }
        # range
        observed_phenotype__age_at_event_days {
          stats {
            count
          }
        }
        # Outcomes
        outcomes__vital_status {
          buckets {
            key
            doc_count
          }
        }
        # range
        outcomes__age_at_event_days__value {
          stats {
            count
          }
        } # range
        age_at_first_patient_engagement__value {
          stats {
            count
          }
        }
        # Biospecimen
        files__biospecimens__sample_type {
          buckets {
            key
            doc_count
          }
        }
        files__biospecimens__parent_sample_type {
          buckets {
            key
            doc_count
          }
        }
        files__biospecimens__collection_sample_type {
          buckets {
            key
            doc_count
          }
        }
        # Range
        files__biospecimens__age_at_biospecimen_collection {
          stats {
            count
          }
        }
        files__biospecimens__status {
          buckets {
            key
            doc_count
          }
        }
        files__biospecimens__laboratory_procedure {
          buckets {
            key
            doc_count
          }
        }
        files__biospecimens__biospecimen_storage {
          buckets {
            key
            doc_count
          }
        }
        # Data File
        files__acl {
          buckets {
            key
            doc_count
          }
        }
        files__controlled_access {
          buckets {
            key
            doc_count
          }
        }
        files__dataset_names {
          buckets {
            key
            doc_count
          }
        }
        files__data_category {
          buckets {
            key
            doc_count
          }
        }
        files__data_type {
          buckets {
            key
            doc_count
          }
        }
        files__sequencing_experiment__experiment_strategy {
          buckets {
            key
            doc_count
          }
        }
        files__file_format {
          buckets {
            key
            doc_count
          }
        }
        # Diagnosis
        diagnosis__source_text {
          buckets {
            key
            doc_count
          }
        }
        diagnosis__age_at_event_days {
          stats {
            count
          }
        }
      }
    }
  }
`;

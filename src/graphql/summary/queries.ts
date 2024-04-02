export const DEMOGRAPHIC_QUERY = `
  query AggregationDemographicInfo($sqon: JSON) {
    participant {
      hits(filters: $sqon) {
        total
      }
      aggregations(filters: $sqon, aggregations_filter_themselves: true) {
        sex {
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
        race {
          buckets {
            key
            doc_count
          }
        }
      }
    }
  }
`;

export const DATATYPE_QUERY = `
  query($sqon: JSON) {
    participant {
      hits(filters: $sqon) {
        total
      }
      aggregations(filters: $sqon, aggregations_filter_themselves: true, include_missing: false) {
        files__data_type {
          buckets {
            key
            doc_count
          }
        }
      }
    }
  }
`;

export const PARTICIPANT_BY_STUDIES_QUERY = `
  query($sqon: JSON) {
    participant {
      hits(filters: $sqon) {
        total
      }
      aggregations(filters: $sqon, aggregations_filter_themselves: true, include_missing: false) {
        study__study_code {
          buckets {
            key
            doc_count
          }
        }
      }
    }
  }
`;

export const PARTICIPANT_DOWN_SYNDROME_STATUS_QUERY = `
  query($sqon: JSON) {
    participant {
      hits(filters: $sqon) {
        total
      }
      aggregations(filters: $sqon, aggregations_filter_themselves: true, include_missing: false) {
        down_syndrome_status {
          buckets {
            key
            doc_count
          }
        }
      }
    }
  }
`;

export const SAMPLES_QUERY = `
  query($sqon: JSON) {
    biospecimen {
      hits(filters: $sqon) {
        total
      }
      aggregations(filters: $sqon, aggregations_filter_themselves: true, include_missing: false) {
        sample_type {
          buckets {
            key
            doc_count
          }
        }
        status {
          buckets {
            key
            doc_count
          }
        }
      }
    }
  }
`;

export const DATA_CATEGORY_QUERY = `
  query($sqon: JSON) {
    participant {
      hits(filters: $sqon) {
        total
      }
      aggregations(filters: $sqon, aggregations_filter_themselves: true, include_missing: false) {
        files__data_category {
          buckets {
            key
            doc_count
          }
        }
      }
    }
  }
`;

export const SAMPLE_TYPE_QUERY = `
  query($sqon: JSON) {
    participant {
      hits(filters: $sqon) {
        total
      }
      aggregations(filters: $sqon, aggregations_filter_themselves: true, include_missing: false) {
        files__biospecimens__sample_type {
          buckets {
            key
            doc_count
          }
        }
      }
    }
  }
`;

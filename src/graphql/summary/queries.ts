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

export const AGE_QUERY = `
  query($sqon: JSON) {
    participant {
      _0to9T21: hits(
        filters: {
          op: "and"
          content: [
            $sqon
            { op: "<=", content: { field: "age_at_first_patient_engagement.value", value: [3650] } }
            { op: "in", content: { field: "down_syndrome_status", value: ["T21"] } }
          ]
        }
      ) {
        total
      }
      _0to9D21: hits(
        filters: {
          op: "and"
          content: [
            $sqon
            { op: "<=", content: { field: "age_at_first_patient_engagement.value", value: [3650] } }
            { op: "in", content: { field: "down_syndrome_status", value: ["D21"] } }
          ]
        }
      ) {
        total
      }
      _10to19T21: hits(
        filters: {
          op: "and"
          content: [
            $sqon
            { op: "between", content: { field: "age_at_first_patient_engagement.value", value: [3651, 7300] } }
            { op: "in", content: { field: "down_syndrome_status", value: ["T21"] } }
          ]
        }
      ) {
        total
      }
      _10to19D21: hits(
        filters: {
          op: "and"
          content: [
            $sqon
            { op: "between", content: { field: "age_at_first_patient_engagement.value", value: [3651, 7300] } }
            { op: "in", content: { field: "down_syndrome_status", value: ["D21"] } }
          ]
        }
      ) {
        total
      }
      _20to29T21: hits(
        filters: {
          op: "and"
          content: [
            $sqon
            { op: "between", content: { field: "age_at_first_patient_engagement.value", value: [7301, 10950] } }
            { op: "in", content: { field: "down_syndrome_status", value: ["T21"] } }
          ]
        }
      ) {
        total
      }
      _20to29D21: hits(
        filters: {
          op: "and"
          content: [
            $sqon
            { op: "between", content: { field: "age_at_first_patient_engagement.value", value: [7301, 10950] } }
            { op: "in", content: { field: "down_syndrome_status", value: ["D21"] } }
          ]
        }
      ) {
        total
      }
      _30to39T21: hits(
        filters: {
          op: "and"
          content: [
            $sqon
            { op: "between", content: { field: "age_at_first_patient_engagement.value", value: [10951, 14600] } }
            { op: "in", content: { field: "down_syndrome_status", value: ["T21"] } }
          ]
        }
      ) {
        total
      }
      _30to39D21: hits(
        filters: {
          op: "and"
          content: [
            $sqon
            { op: "between", content: { field: "age_at_first_patient_engagement.value", value: [10951, 14600] } }
            { op: "in", content: { field: "down_syndrome_status", value: ["D21"] } }
          ]
        }
      ) {
        total
      }
      _40to49T21: hits(
        filters: {
          op: "and"
          content: [
            $sqon
            { op: "between", content: { field: "age_at_first_patient_engagement.value", value: [14601, 18250] } }
            { op: "in", content: { field: "down_syndrome_status", value: ["T21"] } }
          ]
        }
      ) {
        total
      }
      _40to49D21: hits(
        filters: {
          op: "and"
          content: [
            $sqon
            { op: "between", content: { field: "age_at_first_patient_engagement.value", value: [14601, 18250] } }
            { op: "in", content: { field: "down_syndrome_status", value: ["D21"] } }
          ]
        }
      ) {
        total
      }
      _50to59T21: hits(
        filters: {
          op: "and"
          content: [
            $sqon
            { op: "between", content: { field: "age_at_first_patient_engagement.value", value: [18251, 21900] } }
            { op: "in", content: { field: "down_syndrome_status", value: ["T21"] } }
          ]
        }
      ) {
        total
      }
      _50to59D21: hits(
        filters: {
          op: "and"
          content: [
            $sqon
            { op: "between", content: { field: "age_at_first_patient_engagement.value", value: [18251, 21900] } }
            { op: "in", content: { field: "down_syndrome_status", value: ["D21"] } }
          ]
        }
      ) {
        total
      }
      _60plusT21: hits(
        filters: {
          op: "and"
          content: [
            $sqon
            { op: ">", content: { field: "age_at_first_patient_engagement.value", value: [21900] } }
            { op: "in", content: { field: "down_syndrome_status", value: ["T21"] } }
          ]
        }
      ) {
        total
      }
      _60plusD21: hits(
        filters: {
          op: "and"
          content: [
            $sqon
            { op: ">", content: { field: "age_at_first_patient_engagement.value", value: [21900] } }
            { op: "in", content: { field: "down_syndrome_status", value: ["D21"] } }
          ]
        }
      ) {
        total
      }
    }
  }
`;

export const DATATYPE_QUERY = `
  query AggregationDataTypeInfo($sqon: JSON) {
    file {
      hits(filters: $sqon) {
        total
      }
      aggregations(filters: $sqon, aggregations_filter_themselves: true, include_missing: false) {
        data_type {
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
  query AggregationDownSyndromeInfo($sqon: JSON) {
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
  query AggregationSampleInfo($sqon: JSON) {
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
  query AggregationDataCategoryInfo($sqon: JSON) {
    file {
      hits(filters: $sqon) {
        total
      }
      aggregations(filters: $sqon, aggregations_filter_themselves: true, include_missing: false) {
        data_category {
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
      }
    }
  }
`;

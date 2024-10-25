import { gql } from '@apollo/client';

export const CHECK_SAMPLE_MATCH_QUERY = gql`
  query CheckSamplesMatch($sqon: JSON, $first: Int, $offset: Int) {
    sample {
      hits(filters: $sqon, first: $first, offset: $offset) {
        edges {
          node {
            ensembl_gene_id
          }
        }
      }
    }
  }
`;

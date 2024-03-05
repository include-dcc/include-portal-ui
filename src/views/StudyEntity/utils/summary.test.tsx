import { EntityDescriptions } from '@ferlab/ui/core/pages/EntityPage';
import { render, screen } from '@testing-library/react';
import { IStudyEntity } from 'graphql/studies/models';

import getSummaryDescriptions from './summary';

const mock1 = {
  id: 'id',
  study_id: 'study_id',
  study_code: 'study_code',
  study_name: 'study_name',
  biorepo_email: 'biorepo_email',
  biorepo_url: 'biorepo_url',
  biospecimen_count: 39203,
  contact_email: 'contact_email',
  contact_name: 'contact_name',
  controlled_access: ['Controlled', 'Registered'],
  date_collection_end_year: '2020',
  date_collection_start_year: '2016',
  description: 'description',
  domain: 'domain',
  expected_data_categories: [
    'Genomics',
    'Demographic',
    'Transcriptomics',
    'Proteomics',
    'Metabolomics',
    'Immune maps',
    'Microbiome',
    'Imaging',
    'Clinical',
  ],
  expected_number_participants: 2500,
  external_id: 'external_id',
  file_count: 9367,
  institution: 'institution',
  investigator_name: 'investigator_name',
  part_lifespan_stage: ['Pediatric (birth-17 years)', 'Adult (18+ years)'],
  participant_count: 1055,
  program: 'INCLUDE',
  publication: [
    'PMID: 1',
    'PMID: 2',
    'PMID: 3',
    'PMID: 4',
    'PMID: 5',
    'PMID: 6',
    'PMID: 7',
    'PMID: 8',
    'PMID: 9',
    'PMID: 10',
  ],
  selection_criteria: 'selection_criteria',
  study_design: ['study_design_1', 'study_design_2'],
  website: 'website',
  data_category: ['Genomics', 'Proteomics', 'Metabolomics', 'Transcriptomics'],
  data_source: [
    'Investigator assessment (examination, interview, etc.)',
    'Medical record',
    'Patient or caregiver report (survey, questionnaire, etc.)',
  ],
  dataset: {
    hits: {
      total: 3,
      edges: [
        {
          node: {
            dataset_id: 'dataset_id',
            dataset_name: 'HTP Whole Blood RNAseq ',
            date_collection_start_year: '2016',
            date_collection_end_year: '2020',
            data_category: 'Transcriptomics',
            data_type: 'Normalized relative expression (FPKM)',
            experimental_strategy: 'Bulk polyA+ RNAseq',
            experimental_platform: 'Illumina Novaseq',
            publication: ['PMID: 1'],
            access_limitation: 'General research use (DUO:0000042)',
            access_requirement: 'Not for profit, non commercial use only (DUO:0000018)',
            repository: 'Gene Expression Omnibus',
            repository_url: 'repository_url',
            participant_count: '402',
            biospecimen_count: '402',
            file_count: '3200',
          },
        },
        {
          node: {
            dataset_id: 'dataset_id',
            dataset_name: 'HTP Plasma Metabolomics',
            date_collection_start_year: '2016',
            date_collection_end_year: '2020',
            data_category: 'Metabolomics',
            data_type: 'Preprocessed metabolite relative abundance',
            experimental_strategy: 'Mass spec metabolomics',
            experimental_platform: 'UHPLC-MS',
            publication: ['PMID: 2'],
            access_limitation: 'General research use (DUO:0000042)',
            access_requirement: 'Not for profit, non commercial use only (DUO:0000018)',
            repository: null,
            repository_url: null,
            participant_count: '479',
            biospecimen_count: '479',
            file_count: '477',
          },
        },
        {
          node: {
            dataset_id: 'dataset_id',
            dataset_name: 'HTP Plasma Inflammatory Markers',
            date_collection_start_year: '2016',
            date_collection_end_year: '2020',
            data_category: 'Proteomics',
            data_type: 'Protein abundance (absolute protein concentration)',
            experimental_strategy: 'Multiplex immunoassay',
            experimental_platform: 'Meso Scale Discovery Assays (MSD)',
            publication: ['PMID: 3'],
            access_limitation: 'General research use (DUO:0000042)',
            access_requirement: 'Not for profit, non commercial use only (DUO:0000018)',
            repository: null,
            repository_url: null,
            participant_count: '479',
            biospecimen_count: '479',
            file_count: '477',
          },
        },
      ],
    },
  },
};

describe('Summary', () => {
  test('make sure Summary render correctly', () => {
    render(
      <EntityDescriptions
        id={'Summary'}
        title={'Summary'}
        header={'Header'}
        descriptions={getSummaryDescriptions(mock1 as IStudyEntity)}
        loading={false}
      />,
    );
    expect(screen.getByText('study_code')).toBeTruthy();
    expect(screen.getByText('study_name')).toBeTruthy();
    expect(screen.getByText('program')).toBeTruthy();
  });
});

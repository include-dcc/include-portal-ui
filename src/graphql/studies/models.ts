import { ArrangerResultsTree } from 'graphql/models';

export interface IStudyResultTree {
  study: ArrangerResultsTree<IStudyEntity>;
}

export interface IStudyDataset {
  id: string;
  dataset_id?: string;
  dataset_name?: string;
  date_collection_start_year?: string;
  date_collection_end_year?: string;
  data_category?: string;
  data_type?: string;
  expected_data_categories?: string[];
  experimental_strategy?: string;
  experimental_platform?: string;
  publication?: string;
  access_limitation?: string[];
  access_requirement?: string[];
  repository?: string;
  repository_url?: string;
  participant_count?: string;
  biospecimen_count?: string;
  file_count?: string;
}

export interface IStudyEntity {
  id: string;
  study_id: string;
  study_code: string;
  study_name: string;
  biorepo_email?: string;
  biorepo_url?: string;
  biospecimen_count: number;
  contact_email?: string;
  contact_name?: string;
  controlled_access?: string[];
  part_lifespan_stage?: string[];
  data_category: string[];
  data_source?: string[];
  dataset?: ArrangerResultsTree<IStudyDataset>;
  date_collection_start_year?: string;
  date_collection_end_year?: string;
  description?: string;
  domain?: string;
  external_id: string;
  family_count?: number;
  institution?: string;
  investigator_name?: string;
  program: string;
  publication?: string[];
  participant_count: number;
  study_design?: string[];
  selection_criteria?: string;
  website: string;
}

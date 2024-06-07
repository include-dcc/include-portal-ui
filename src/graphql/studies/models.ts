import { ArrangerResultsTree } from 'graphql/models';

export interface IStudyResultTree {
  study: ArrangerResultsTree<IStudyEntity>;
}

export interface IStudyDataset {
  id: string;
  access_limitations?: string[];
  access_requirements?: string[];
  biospecimen_count?: number;
  data_category?: string;
  data_types?: string[];
  dataset_id?: string;
  dataset_name?: string;
  date_collection_end_year?: string;
  date_collection_start_year?: string;
  expected_data_categories?: string[];
  experimental_platform?: string;
  experimental_strategy?: string;
  file_count?: number;
  is_harmonized?: boolean;
  participant_count?: number;
  publications?: string[];
  repository?: string;
  repository_url?: string;
}

export interface IDataType {
  id: string;
  data_type: string;
  file_count: number;
}

export interface IExperimentalStrategy {
  id: string;
  experimental_strategy: string;
  file_count: number;
}

export interface IContact {
  id: string;
  email?: string;
  name?: string;
}

export interface IStudyEntity {
  id: string;
  study_id: string;
  study_code: string;
  study_name: string;
  biobank_contact?: string;
  biobank_request_link?: string;
  biospecimen_count: number;
  contacts?: ArrangerResultsTree<IContact>;
  controlled_access?: string[];
  data_category: string[];
  data_sources?: string[];
  data_types?: ArrangerResultsTree<IDataType>;
  dataset?: ArrangerResultsTree<IStudyDataset>;
  date_collection_end_year?: string;
  date_collection_start_year?: string;
  description?: string;
  domains?: string[];
  expected_data_categories?: string[];
  expected_number_participants?: number;
  experimental_strategies?: ArrangerResultsTree<IExperimentalStrategy>;
  external_id: string;
  external_ids?: string[];
  family_count?: number;
  file_count?: number;
  institutions?: string[];
  investigator_names?: string[];
  is_harmonized?: boolean;
  part_lifespan_stages?: string[];
  participant_count: number;
  program: string;
  publications?: string[];
  selection_criteria?: string;
  study_designs?: string[];
  website: string;
}

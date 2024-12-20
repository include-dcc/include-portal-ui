import { ArrangerResultsTree } from 'graphql/models';

export interface IStudyResultTree {
  study: ArrangerResultsTree<IStudyEntity>;
}

export interface IStudyDataset {
  id: string;
  access_limitations?: string[];
  access_requirements?: string[];
  data_categories?: string[];
  data_types?: string[];
  dataset_id?: string;
  dataset_name?: string;
  data_collection_end_year?: string;
  data_collection_start_year?: string;
  dbgap?: string;
  description?: string;
  expected_data_categories?: string[];
  expected_number_of_files?: number;
  expected_number_participants?: number;
  experimental_platform?: string;
  experimental_strategy?: string;
  external_dataset_id?: string;
  is_harmonized?: boolean;
  publications?: string[];
}

export interface IAuthor {
  id: string;
  family: string;
  given: string;
}

export interface IPublicationDetails {
  id: string;
  authors: ArrangerResultsTree<IAuthor>;
  DOI?: string;
  ISSN?: string;
  PMCID?: string;
  PMID: string;
  accessed_date_parts?: number[];
  container_title?: string;
  container_title_short?: string;
  issue?: string;
  issued_date_parts: number[];
  page?: string;
  pubmed_id?: string;
  source?: string;
  title: string;
  volume?: string;
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
  acknowledgement?: string;
  biobank_contact?: string;
  biobank_request_link?: string;
  biospecimen_count: number;
  citation_statement?: string;
  contacts?: ArrangerResultsTree<IContact>;
  controlled_access?: string[];
  data_category: string[];
  data_sources?: string[];
  data_types?: ArrangerResultsTree<IDataType>;
  datasets?: ArrangerResultsTree<IStudyDataset>;
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
  guid?: string;
  institutions?: string[];
  investigator_names?: string[];
  is_harmonized?: boolean;
  part_lifespan_stages?: string[];
  participant_count: number;
  program: string;
  publications?: string[];
  publications_details?: ArrangerResultsTree<IPublicationDetails>;
  selection_criteria?: string[];
  study_designs?: string[];
  study_meta_categories?: string[];
  website: string;
}

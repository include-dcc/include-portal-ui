import { ArrangerResultsTree } from 'graphql/models';

export interface IStudyResultTree {
  study: ArrangerResultsTree<IStudyEntity>;
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

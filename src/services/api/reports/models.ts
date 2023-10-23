import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';

export type ReportConfig = {
  sqon: ISyntheticSqon;
  name: string;
  fileName?: string;
  projectId?: string;
  biospecimenRequestName?: string;
};

export enum ReportType {
  CLINICAL_DATA = 'clinicalData',
  CLINICAL_DATA_FAM = 'familyClinicalData',
  BIOSEPCIMEN_DATA = 'biospecimenData',
  BIOSEPCIMEN_REQUEST = 'biospecimenRequest',
}

export interface IDownloadTranslation {
  errorMessage?: string;
  successMessage?: string;
}

import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';

export type ReportConfig = {
  sqon: ISyntheticSqon;
  name: string;
  fileName?: string;
};

export enum ReportType {
  CLINICAL_DATA = 'clinicalData',
  CLINICAL_DATA_FAM = 'familyClinicalData',
  BIOSEPCIMEN_DATA = 'biospecimenData',
}

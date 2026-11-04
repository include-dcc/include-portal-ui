import { FileAccessType, IFileEntity } from 'graphql/files/models';

const STUDIES_CONTROLLED_AS_REGISTERED_RULES = ['X01-Hakonarson', 'X01-deSmith'];

// UI hint only: Cavatica enforces the real access
export const isFileUnlocked = (file: IFileEntity, isConnectedToCavatica: boolean = false) => {
  if (!isConnectedToCavatica) {
    return false;
  }

  // Remapped to Registered, @see https://d3b.atlassian.net/browse/SJIP-932
  if (
    STUDIES_CONTROLLED_AS_REGISTERED_RULES.includes(file.study.study_code) ||
    file.access_urls?.startsWith('drs://cavatica-ga4gh-api.sbgenomics.com/') ||
    file.access_urls?.startsWith('drs://nci-crdc.datacommons.io/')
  ) {
    return true;
  }

  return file.controlled_access === FileAccessType.REGISTERED;
};

import { FileAccessType, IFileEntity } from 'graphql/files/models';
import { cloneDeep, intersection } from 'lodash';

const STUDIES_CONTROLLED_AS_REGISTERED_RULES = ['X01-Hakonarson', 'X01-deSmith'];

export const userHasAccessToFile = (
  file: IFileEntity,
  userAcls: string[],
  isConnectedToCavatica: boolean = false,
  isConnectedToDcf: boolean = false,
) => {
  if (!isConnectedToDcf && !isConnectedToCavatica) {
    return false;
  }

  // @see https://d3b.atlassian.net/browse/SJIP-932
  const fileAccess = cloneDeep(file);
  if (STUDIES_CONTROLLED_AS_REGISTERED_RULES.includes(fileAccess.study.study_code)) {
    fileAccess.controlled_access = FileAccessType.REGISTERED;
  }

  if (fileAccess.controlled_access === FileAccessType.CONTROLLED && !isConnectedToDcf) {
    return false;
  }

  if (fileAccess.controlled_access === FileAccessType.REGISTERED && !isConnectedToCavatica) {
    return false;
  }

  return (
    !fileAccess.acl ||
    fileAccess.acl.length === 0 ||
    intersection(userAcls, fileAccess.acl).length > 0 ||
    fileAccess.controlled_access === FileAccessType.REGISTERED
  );
};

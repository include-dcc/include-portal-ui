import { FileAccessType, IFileEntity } from 'graphql/files/models';

import { OPEN_ACCESS_ACL } from 'utils/cavatica';

// UI hint only: Cavatica enforces the real access
export const isFileUnlocked = (
  file: IFileEntity,
  isConnectedToCavatica: boolean,
  consentCodes: string[],
): boolean => {
  if (!isConnectedToCavatica) {
    return false;
  }

  // Any connected user can access Registered files, whatever their acl
  if (file.controlled_access === FileAccessType.REGISTERED) {
    return true;
  }

  const acl = file.acl ?? [];
  return acl.includes(OPEN_ACCESS_ACL) || acl.some((value) => consentCodes.includes(value));
};

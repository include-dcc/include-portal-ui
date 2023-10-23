import { IUserSetOutput, SetType } from 'services/api/savedSet/models';

export const BIOSPECIMEN_REQUEST_KEY = 'BIOSPECIMEN_REQUEST';
export const SHARED_BIOSPECIMEN_REQUEST_ID_QUERY_PARAM_KEY = 'biospecimenRequestId';

export const isNameExists = (newSetName: string, savedSets: IUserSetOutput[]): boolean => {
  const requestBioNamesExisting = savedSets
    .filter((set) => set.setType === SetType.BIOSPECIMEN_REQUEST)
    .map((s) => s.tag);

  return requestBioNamesExisting.includes(newSetName);
};

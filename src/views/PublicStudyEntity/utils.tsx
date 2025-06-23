import { TFlatDataset } from 'views/StudyEntity/utils/dataAccess';

import { PublicStudyDataset } from './types';

export const getFlatDataset = (dataset?: PublicStudyDataset[]): TFlatDataset | undefined => {
  if (!dataset?.length) return undefined;

  const accessLimitations: string[] = [];
  const accessRequirements: string[] = [];
  dataset.forEach((dataset) => {
    if (dataset.access_limitations && dataset.access_limitations.length > 0)
      accessLimitations.push(...dataset.access_limitations);
    if (dataset.access_requirements && dataset.access_requirements.length > 0)
      accessRequirements.push(...dataset.access_requirements);
  });

  return {
    accessLimitations: new Set(accessLimitations),
    accessRequirements: new Set(accessRequirements),
  };
};

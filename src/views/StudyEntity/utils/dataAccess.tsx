import { ReactNode } from 'react';
import intl from 'react-intl-universal';
import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { IArrangerResultsTree } from '@ferlab/ui/core/graphql/types';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { IStudyDataset } from 'graphql/studies/models';
import { extractDuoTitleAndCode } from 'views/DataExploration/utils/helper';

export type TFlatDataset = {
  accessLimitations: Set<string>;
  accessRequirements: Set<string>;
};

export const getFlatDataset = (
  dataset?: IArrangerResultsTree<IStudyDataset>,
): TFlatDataset | undefined => {
  if (!dataset?.hits?.edges?.length) return undefined;

  const accessLimitations: string[] = [];
  const accessRequirements: string[] = [];
  dataset.hits.edges.forEach((edge) => {
    if (edge.node.access_limitations && edge.node.access_limitations.length > 0)
      accessLimitations.push(...edge.node.access_limitations);
    if (edge.node.access_requirements && edge.node.access_requirements.length > 0)
      accessRequirements.push(...edge.node.access_requirements);
  });

  return {
    accessLimitations: new Set(accessLimitations),
    accessRequirements: new Set(accessRequirements),
  };
};

const renderAccess = (data?: Set<string>): ReactNode => {
  if (!data) return TABLE_EMPTY_PLACE_HOLDER;

  const formattedData = Array.from(data).map((value: string, index: number) => {
    const titleCodeValue = extractDuoTitleAndCode(value);
    if (titleCodeValue) {
      return (
        <div key={index}>
          {titleCodeValue?.title} (
          <ExternalLink href={`http://purl.obolibrary.org/obo/DUO_${titleCodeValue.code}`}>
            DUO: {titleCodeValue.code}
          </ExternalLink>
          )
        </div>
      );
    }
  });
  return <>{formattedData}</>;
};

const getDataAccessDescriptions = (flatDataset?: TFlatDataset): IEntityDescriptionsItem[] => [
  {
    label: intl.get('entities.study.access_limitation'),
    value: flatDataset?.accessLimitations.size
      ? renderAccess(flatDataset?.accessLimitations)
      : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.study.access_requirement'),
    value: flatDataset?.accessRequirements.size
      ? renderAccess(flatDataset.accessRequirements)
      : TABLE_EMPTY_PLACE_HOLDER,
  },
];

export default getDataAccessDescriptions;

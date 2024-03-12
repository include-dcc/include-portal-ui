import { ReactNode } from 'react';
import intl from 'react-intl-universal';
import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { IArrangerResultsTree } from '@ferlab/ui/core/graphql/types';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { Typography } from 'antd';
import { IStudyDataset, IStudyEntity } from 'graphql/studies/models';
import { extractDuoTitleAndCode } from 'views/DataExploration/utils/helper';

const { Text } = Typography;

const getFlatDataset = (dataset?: IArrangerResultsTree<IStudyDataset>) => {
  if (!dataset?.hits?.edges?.length) return undefined;

  const accessLimitation: string[] = [];
  const accessRequirement: string[] = [];
  dataset.hits.edges.forEach((edge) => {
    if (edge.node.access_limitation && edge.node.access_limitation.length > 0)
      accessLimitation.push(...edge.node.access_limitation);
    if (edge.node.access_requirement && edge.node.access_requirement.length > 0)
      accessRequirement.push(...edge.node.access_requirement);
  });

  return {
    accessLimitation: new Set(accessLimitation),
    accessRequirement: new Set(accessRequirement),
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

const getDataAccessDescriptions = (study?: IStudyEntity): IEntityDescriptionsItem[] => {
  const flatDataset = getFlatDataset(study?.dataset);

  return [
    {
      label: intl.get('entities.study.access_limitation'),
      value: flatDataset?.accessLimitation.size
        ? renderAccess(flatDataset?.accessLimitation)
        : TABLE_EMPTY_PLACE_HOLDER,
    },
    {
      label: intl.get('entities.study.access_requirement'),
      value: flatDataset?.accessRequirement.size
        ? renderAccess(flatDataset.accessRequirement)
        : TABLE_EMPTY_PLACE_HOLDER,
    },
    {
      label: intl.get('entities.study.study_contact'),
      value:
        study?.contact_name || study?.institution || study?.contact_email ? (
          <>
            {study.contact_name && <Text>{study.contact_name}; </Text>}
            {study.institution && <Text>{study.institution}; </Text>}
            {study.contact_email && <Text>{study.contact_email}</Text>}
          </>
        ) : (
          TABLE_EMPTY_PLACE_HOLDER
        ),
    },
  ];
};

export default getDataAccessDescriptions;

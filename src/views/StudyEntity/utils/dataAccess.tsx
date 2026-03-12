import { ReactNode } from 'react';
import intl from 'react-intl-universal';
import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { IArrangerResultsTree } from '@ferlab/ui/core/graphql/types';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { Typography } from 'antd';
import { IStudyDataset, IStudyEntity } from 'graphql/studies/models';
import { extractDuoTitleAndCode } from 'views/DataExploration/utils/helper';
import { IPublicStudyEntity } from 'views/PublicStudyEntity/types';

const { Text } = Typography;

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

interface IGetDataAccessDescriptions {
  flatDataset?: TFlatDataset;
  study?: IStudyEntity | IPublicStudyEntity;
  isPublic?: boolean;
}

const getDataAccessDescriptions = ({
  flatDataset,
  study,
  isPublic = false,
}: IGetDataAccessDescriptions): IEntityDescriptionsItem[] => {
  const result: IEntityDescriptionsItem[] = [];
  result.push({
    label: intl.get('entities.study.access_limitation'),
    value: flatDataset?.accessLimitations.size
      ? renderAccess(flatDataset?.accessLimitations)
      : TABLE_EMPTY_PLACE_HOLDER,
  });
  result.push({
    label: intl.get('entities.study.access_requirement'),
    value: flatDataset?.accessRequirements.size
      ? renderAccess(flatDataset.accessRequirements)
      : TABLE_EMPTY_PLACE_HOLDER,
  });

  if (!isPublic && study && (study as IStudyEntity).contacts?.hits?.edges?.length) {
    result.push({
      label: intl.get('entities.study.study_contact'),
      value: (study as IStudyEntity)?.contacts?.hits.edges.map((contact, index) => (
        <div key={index}>
          {contact.node.name && <Text>{contact.node.name}; </Text>}
          {contact.node.email && <Text>{contact.node.email}</Text>}
        </div>
      )),
    });
  }

  if (isPublic && study && (study as IPublicStudyEntity).contacts?.length) {
    result.push({
      label: intl.get('entities.study.study_contact'),
      value: (study as IPublicStudyEntity)?.contacts?.map((contact, index) => (
        <div key={index}>
          {contact.name && <Text>{contact.name}; </Text>}
          {contact.email && <Text>{contact.email}</Text>}
        </div>
      )),
    });
  }

  if (study?.study_websites?.length) {
    result.push({
      label: intl.get('entities.study.study_website'),
      value: study.study_websites.map((website, index) => (
        <div key={index}>
          <ExternalLink href={website}>{website}</ExternalLink>
        </div>
      )),
    });
  }

  if (study?.biobank_contact) {
    result.push({
      label: intl.get('entities.study.virtual_biorepository_email'),
      value: (
        <ExternalLink href={`mailto:${study.biobank_contact}`}>
          {study.biobank_contact}
        </ExternalLink>
      ),
    });
  }

  if (study?.biobank_request_link) {
    result.push({
      label: intl.get('entities.study.virtual_biorepository_url'),
      value: (
        <ExternalLink href={study.biobank_request_link}>{study.biobank_request_link}</ExternalLink>
      ),
    });
  }

  return result;
};

export default getDataAccessDescriptions;

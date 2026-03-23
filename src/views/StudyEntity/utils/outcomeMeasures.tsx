import intl from 'react-intl-universal';
import ExpandableCell from '@ferlab/ui/core/components/tables/ExpandableCell';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { IStudyEntity } from 'graphql/studies/models';
import { IPublicStudyEntity } from 'views/PublicStudyEntity/types';

interface IGetOutcomeMeasuresDescriptions {
  isPublic?: boolean;
  study?: IStudyEntity | IPublicStudyEntity;
}

const getOutcomeMeasuresDescriptions = ({
  isPublic = false,
  study,
}: IGetOutcomeMeasuresDescriptions): IEntityDescriptionsItem[] => {
  const result: IEntityDescriptionsItem[] = [];

  const clinicalTrial = isPublic
    ? (study as IPublicStudyEntity)?.clinical_trials?.[0]
    : (study as IStudyEntity)?.clinical_trials?.hits?.edges?.[0]?.node;

  if (clinicalTrial?.primary_outcome_measures?.length) {
    result.push({
      label: intl.get('entities.study.primary_outcome_measures'),
      value: (
        <ExpandableCell
          nOfElementsWhenCollapsed={2}
          dataSource={clinicalTrial.primary_outcome_measures}
          renderItem={(sourceText, index): React.ReactNode => <div key={index}>{sourceText}</div>}
        />
      ),
    });
  }

  if (clinicalTrial?.secondary_outcome_measures?.length) {
    result.push({
      label: intl.get('entities.study.secondary_outcome_measures'),
      value: (
        <ExpandableCell
          nOfElementsWhenCollapsed={2}
          dataSource={clinicalTrial.secondary_outcome_measures}
          renderItem={(sourceText, index): React.ReactNode => <div key={index}>{sourceText}</div>}
        />
      ),
    });
  }

  return result;
};

export default getOutcomeMeasuresDescriptions;

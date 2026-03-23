/* eslint-disable complexity */
import intl from 'react-intl-universal';
import ExpandableCell from '@ferlab/ui/core/components/tables/ExpandableCell';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { Tag } from 'antd';
import { IStudyEntity } from 'graphql/studies/models';
import { IPublicStudyEntity } from 'views/PublicStudyEntity/types';

import brainpower_diagram from '../../../components/assets/study/brainpower_schedule_diagram.svg';
import jakids_diagram from '../../../components/assets/study/jakids_schedule_diagram.svg';

import { StudyClinicalTrials } from './constants';

import styles from '../index.module.css';

interface IGetDesignDescriptions {
  hasScheduleDiagram?: boolean;
  setOpenDiagramModal?: React.Dispatch<React.SetStateAction<boolean>>;
  study?: IStudyEntity | IPublicStudyEntity;
  isClinicalTrials?: boolean;
  isPublic?: boolean;
}

const getDesignDescriptions = ({
  study,
  isClinicalTrials = false,
  isPublic = false,
  hasScheduleDiagram = false,
  setOpenDiagramModal,
}: IGetDesignDescriptions): IEntityDescriptionsItem[] => {
  const result: IEntityDescriptionsItem[] = [];

  const clinicalTrial = isPublic
    ? (study as IPublicStudyEntity)?.clinical_trials?.[0]
    : (study as IStudyEntity)?.clinical_trials?.hits?.edges?.[0]?.node;

  if (study?.study_designs?.length) {
    result.push({
      label: intl.get('entities.study.study_design'),
      value: study?.study_designs?.join(', '),
    });
  }

  if (isClinicalTrials && clinicalTrial?.trial_phase) {
    result.push({
      label: intl.get('entities.study.clinical_trials.trial_phase'),
      value: clinicalTrial.trial_phase,
    });
  }

  if (isClinicalTrials && clinicalTrial?.primary_purpose) {
    result.push({
      label: intl.get('entities.study.clinical_trials.primary_purpose'),
      value: clinicalTrial.primary_purpose,
    });
  }

  if (study?.part_lifespan_stages?.length) {
    result.push({
      label: intl.get('entities.study.participant_life_span'),
      value: study.part_lifespan_stages.map((lifespan, index) => (
        <Tag color="cyan" key={index}>
          {lifespan}
        </Tag>
      )),
    });
  }

  if (study?.selection_criteria?.length) {
    result.push({
      label: intl.get('entities.study.selection_criteria'),
      value: study?.selection_criteria?.join(', '),
    });
  }

  if (isClinicalTrials && clinicalTrial?.intervention_types?.length) {
    result.push({
      label: intl.get('entities.study.clinical_trials.intervention_types'),
      value: clinicalTrial.intervention_types.map((intervention, index) => (
        <Tag key={index}>{intervention}</Tag>
      )),
    });
  }

  if (isClinicalTrials && clinicalTrial?.interventions?.length) {
    result.push({
      label: intl.get('entities.study.clinical_trials.intervention'),
      value: (
        <ExpandableCell
          nOfElementsWhenCollapsed={1}
          dataSource={clinicalTrial.interventions}
          renderItem={(sourceText, index): React.ReactNode => <div key={index}>{sourceText}</div>}
        />
      ),
    });
  }

  if (isClinicalTrials && clinicalTrial?.arm_information) {
    result.push({
      label: intl.get('entities.study.clinical_trials.arm_information'),
      value: clinicalTrial.arm_information,
    });
  }

  if (isClinicalTrials && clinicalTrial?.arm_allocation) {
    result.push({
      label: intl.get('entities.study.clinical_trials.arm_allocation'),
      value: clinicalTrial.arm_allocation,
    });
  }

  if (isClinicalTrials && clinicalTrial?.intervention_assignment_strategy) {
    result.push({
      label: intl.get('entities.study.clinical_trials.intervention_assignment_strategy'),
      value: clinicalTrial.intervention_assignment_strategy,
    });
  }

  if (hasScheduleDiagram && study?.study_code && setOpenDiagramModal) {
    result.push({
      label: intl.get('entities.study.clinical_trials.schedule_title'),
      value: getScheduleDiagram(study?.study_code, setOpenDiagramModal),
    });
  }

  return result;
};

export const getScheduleDiagramProps = (studyCode: string) => {
  let diagramAlt = '';
  let diagramSrc = '';
  if (studyCode === StudyClinicalTrials.BRAIN_POWER) {
    diagramAlt = 'BrainPower Schedule Diagram';
    diagramSrc = brainpower_diagram;
  } else if (studyCode === StudyClinicalTrials.JAKI_DS) {
    diagramAlt = 'JAKIDS Schedule Diagram';
    diagramSrc = jakids_diagram;
  }
  return { diagramAlt, diagramSrc };
};

export const getScheduleDiagram = (
  studyCode: string,
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const { diagramAlt, diagramSrc } = getScheduleDiagramProps(studyCode);

  return (
    <img
      src={diagramSrc}
      alt={diagramAlt}
      className={styles.scheduleDiagram}
      onClick={() => setOpenModal(true)}
    />
  );
};

export default getDesignDescriptions;

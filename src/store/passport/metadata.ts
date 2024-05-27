import { IFileEntity, IFileStudyEntity } from 'graphql/files/models';
import { toNodes } from 'graphql/utils/helpers';
import { makeUniqueWords as unique } from 'helpers';

import { keepOnly } from 'utils/helper';

const joinUniquely = (l: string[]) => unique(l).join(',');

const extractFileMetaData = (file: IFileEntity) => ({
  fhir_document_reference: file.fhir_document_reference,
  file_id: file.file_id,
  external_file_id: file.external_id,
  file_name: file.file_name,
  data_category: file.data_category,
  data_type: file.data_type,
  file_format: file.file_format,
  repository: file.repository,
  acl: joinUniquely(file.acl),
  access_url: file.access_urls,
});

const extractParticipantMetaData = (participants: any[]) => {
  const diagnosis = participants.flatMap((participant) => toNodes(participant.diagnosis));
  const outcomes = participants.flatMap((participant) => toNodes(participant.outcomes));
  const phenotype = participants.flatMap((participant) => toNodes(participant.phenotype));
  const relation = participants.flatMap((participant) =>
    participant.family ? toNodes(participant.family.relations_to_proband) : '',
  );

  return {
    // Removed temporarily due to bug
    // case_id: joinUniquely(participants.map((x) => x.participant_id)),
    external_participant_id: joinUniquely(participants.map((x) => x.external_id)),
    down_syndrome_status: joinUniquely(participants.map((x) => x.down_syndrome_status)),
    // Removed temporarily due to bug
    // ethnicity: joinUniquely(participants.map((x) => x.ethnicity)),
    // gender: joinUniquely(participants.map((x) => x.sex)),
    // race: joinUniquely(participants.map((x) => x.race)),
    age_at_participant_diagnosis: joinUniquely(diagnosis.map((d) => d.age_at_event_days)),
    age_at_vital_status: joinUniquely(outcomes.map((o) => o.age_at_event_days.value)),
    age_at_phenotype_assignment: joinUniquely(phenotype.map((p) => p.age_at_event_days)),
    diagnosis_mondo: joinUniquely(diagnosis.map((d) => d.mondo_display_term)),
    condition_source_text: joinUniquely(diagnosis.map((d) => d.source_text)),
    family_id: joinUniquely(participants.map((x) => x.families_id)),
    family_unit: joinUniquely(participants.map((x) => x.family_type)),
    family_role: joinUniquely(relation.map((r) => r.role)),
    observed_phenotype_hpo: joinUniquely(phenotype.map((p) => p.hpo_phenotype_observed)),
    vital_status: joinUniquely(outcomes.map((o) => o.vital_status)),
  };
};

const extractBioSpecimenMetaData = (biospecimens: any[]) => ({
  sample_id: joinUniquely(biospecimens.map((x) => x.sample_id)),
  sample_type: joinUniquely(biospecimens.map((x) => x.sample_type)),
  collection_id: joinUniquely(biospecimens.map((x) => x.collection_sample_id)),
  collection_sample_type: joinUniquely(biospecimens.map((x) => x.collection_sample_type)),
  external_sample_id: joinUniquely(biospecimens.map((x) => x.external_sample_id)),
  parent_sample_id: joinUniquely(biospecimens.map((x) => x.parent_sample_id)),
  parent_sample_type: joinUniquely(biospecimens.map((x) => x.parent_sample_type)),
  biospecimen_storage: joinUniquely(biospecimens.map((x) => x.biospecimen_storage)),
  container_id: joinUniquely(biospecimens.map((x) => x.container_id)),
  laboratory_procedure: joinUniquely(biospecimens.map((x) => x.laboratory_procedure)),
  volume_unit: joinUniquely(biospecimens.map((x) => x.volume_unit)),
  volume: joinUniquely(biospecimens.map((x) => x.volume)),
  age_at_biospecimen_collection: joinUniquely(
    biospecimens.map((x) => x.age_at_biospecimen_collection),
  ),
  sample_availability: joinUniquely(biospecimens.map((x) => x.status)),
  external_parent_sample_id: joinUniquely(biospecimens.map((x) => x.external_parent_sample_id)),
  external_collection_id: joinUniquely(biospecimens.map((x) => x.external_collection_sample_id)),
  external_container_id: joinUniquely(biospecimens.map((x) => x.external_container_id)),
});

const extractSequentialExperimentMetaData = (sequentialExperiments: any[]) => ({
  experimental_strategy: joinUniquely(sequentialExperiments.map((x) => x.experiment_strategy)),
});

const extractStudyMetaData = (study: IFileStudyEntity) => ({
  investigation: study.study_code,
  study_name: study.study_name,
  study_program: study.program,
});

export const extractMetadata = (file: IFileEntity) => {
  if (!file || !Object.keys(file).length) {
    return {};
  }

  const sequentialExperiments = toNodes(file.sequencing_experiment);
  const participants = toNodes(file.participants);
  const biospecimens = participants.flatMap((participant) => toNodes(participant.biospecimens));

  const fileMetaData = extractFileMetaData(file);
  const participantsMetaData = extractParticipantMetaData(participants);
  const biospecimensMetaData = extractBioSpecimenMetaData(biospecimens);
  const sequentialExperimentsMetaData = extractSequentialExperimentMetaData(sequentialExperiments);
  const studyMetaData = extractStudyMetaData(file.study);

  return keepOnly({
    ...fileMetaData,
    ...participantsMetaData,
    ...biospecimensMetaData,
    ...sequentialExperimentsMetaData,
    ...studyMetaData,
    reference_genome: null,
  });
};

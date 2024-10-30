import intl from 'react-intl-universal';
import {
  CAVATICA_TYPE,
  ICavaticaTreeNode,
} from '@ferlab/ui/core/components/Widgets/Cavatica/CavaticaAnalyzeModal';
import EnvironmentVariables from 'helpers/EnvVariables';

import { ICavaticaDRSImportItem } from 'services/api/cavatica/models';
import { SUPPORT_EMAIL } from 'store/report/thunks';

export const cavaticaCreateProjectDictionary = {
  title: intl.get('screen.dashboard.cards.cavatica.newProject'),
  requiredField: intl.get('global.forms.errors.requiredField'),
  projectName: {
    label: 'Project name',
    placeholder: 'e.g. KF-NBL Neuroblastoma Aligned Reads',
  },
  billingGroup: {
    label: intl.get('screen.dashboard.cards.cavatica.billingGroups.label'),
    empty: intl.get('screen.dashboard.cards.cavatica.billingGroups.empty'),
  },
  okText: intl.get('screen.dashboard.cards.cavatica.createProject'),
  cancelText: intl.get('screen.dashboard.cards.cavatica.cancelText'),
  error: {
    billingGroups: {
      title: intl.get('screen.dashboard.cards.error.title'),
      subtitle: intl.get('api.cavatica.error.billingGroups.fetch'),
    },
    create: {
      title: intl.get('screen.dashboard.cards.cavatica.error.create.title'),
      subtitle: intl.get('screen.dashboard.cards.cavatica.error.create.subtitle'),
    },
    email: SUPPORT_EMAIL,
    contactSupport: intl.get('screen.dashboard.cards.error.contactSupport'),
  },
};

export const getGuidDrsItem = (value: ICavaticaTreeNode): ICavaticaDRSImportItem => {
  const accessUrl = EnvironmentVariables.configFor('CAVATICA_GUID_ACCESS_URL');
  const type = value.type === CAVATICA_TYPE.PROJECT ? 'project' : 'parent';
  return {
    drs_uri: accessUrl,
    name: 'include_guid_mapping_file_2024-08-30.csv',
    [type]: value.id,
    metadata: {
      dbgap_consent_code: 'phs002276.c1',
      name: 'include_guid_mapping_file_2024-08-30.csv',
      file_format: 'csv',
      study_name: 'INCLUDE Data Hub: NDA GUIDs for Down Syndrome Research',
    },
  };
};

export const getDSConnectDrsItems = (value: ICavaticaTreeNode): ICavaticaDRSImportItem[] => {
  const demographicAccessUrl = EnvironmentVariables.configFor(
    'CAVATICA_DSC_DEMOGRAPHIC_ACCESS_URL',
  );
  const ihqAccessUrl = EnvironmentVariables.configFor('CAVATICA_DSC_IHQ_ACCESS_URL');
  const dictionaryAccessUrl = EnvironmentVariables.configFor('CAVATICA_DSC_DICTIONARY_ACCESS_URL');
  const type = value.type === CAVATICA_TYPE.PROJECT ? 'project' : 'parent';
  return [
    {
      drs_uri: demographicAccessUrl,
      name: 'dsc_demographic_unharmonized_2024-02-26.csv',
      [type]: value.id,
      metadata: {
        name: 'dsc_demographic_unharmonized_2024-02-26.csv',
        study_name: 'DS-Connect: The Down Syndrome Registry',
        file_format: 'csv',
      },
    },
    {
      drs_uri: ihqAccessUrl,
      name: 'dsc_ihq_unharmonized_2024-02-26.csv',
      [type]: value.id,
      metadata: {
        name: 'dsc_ihq_unharmonized_2024-02-26.csv',
        study_name: 'DS-Connect: The Down Syndrome Registry',
        file_format: 'csv',
      },
    },
    {
      drs_uri: dictionaryAccessUrl,
      name: 'dsconnect_unharmonized_data_dictionary_20240424.xlsx',
      [type]: value.id,
      metadata: {
        name: 'dsconnect_unharmonized_data_dictionary_20240424.xlsx',
        study_name: 'DS-Connect: The Down Syndrome Registry',
        file_format: 'csv',
      },
    },
  ];
};

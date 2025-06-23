import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { numberFormat } from '@ferlab/ui/core/utils/numberUtils';
import { Progress } from 'antd';
import { INDEXES } from 'graphql/constants';
import { IDataType, IExperimentalStrategy, IStudyEntity } from 'graphql/studies/models';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';
import { IPublicStudyEntity } from 'views/PublicStudyEntity/types';

import { STATIC_ROUTES } from 'utils/routes';

const addDataTypeQuery = (studyCode: string, dataType: string) =>
  addQuery({
    queryBuilderId: DATA_EXPLORATION_QB_ID,
    query: generateQuery({
      newFilters: [
        generateValueFilter({
          field: 'study.study_code',
          value: [studyCode],
          index: INDEXES.STUDY,
        }),
        generateValueFilter({
          field: 'data_type',
          value: [dataType],
          index: INDEXES.FILE,
        }),
      ],
    }),
    setAsActive: true,
  });

const addExperimentalStrategyQuery = (studyCode: string, experimentalStrategy: string) =>
  addQuery({
    queryBuilderId: DATA_EXPLORATION_QB_ID,
    query: generateQuery({
      newFilters: [
        generateValueFilter({
          field: 'study.study_code',
          value: [studyCode],
          index: INDEXES.STUDY,
        }),
        generateValueFilter({
          field: 'sequencing_experiment.experiment_strategy',
          value: [experimentalStrategy],
          index: INDEXES.FILE,
        }),
      ],
    }),
    setAsActive: true,
  });

type GetColumnsProps = {
  files_nb: number;
  study_code: string;
  manageLoginModal?: (isOpen: boolean) => void;
  manageRedirectUri?: (uri: string) => void;
  isPublicStudyEnabled?: boolean;
};

export const getDataTypeColumns = ({
  files_nb,
  study_code,
  manageLoginModal,
  manageRedirectUri,
  isPublicStudyEnabled = false,
}: GetColumnsProps): ProColumnType<any>[] => [
  {
    key: 'data_type',
    dataIndex: 'data_type',
    title: intl.get('entities.file.data_type'),
    render: (dataType: string) => dataType || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    align: 'right',
    key: 'nb_files',
    title: intl.get('entities.file.files'),
    render: (dataType: IDataType) => {
      if (!dataType.file_count) return TABLE_EMPTY_PLACE_HOLDER;

      return isPublicStudyEnabled ? (
        <a
          onClick={() => {
            manageRedirectUri && manageRedirectUri(STATIC_ROUTES.DATA_EXPLORATION_DATAFILES);
            manageLoginModal && manageLoginModal(true);
            addDataTypeQuery(study_code, dataType.data_type);
          }}
        >
          {numberFormat(dataType.file_count)}
        </a>
      ) : (
        <Link
          to={STATIC_ROUTES.DATA_EXPLORATION_DATAFILES}
          onClick={() => addDataTypeQuery(study_code, dataType.data_type)}
        >
          {numberFormat(dataType.file_count)}
        </Link>
      );
    },
    width: '100px',
  },
  {
    key: 'proportion_of_files',
    dataIndex: 'file_count',
    title: intl.get('entities.file.n=2', { count: numberFormat(files_nb) }),
    tooltip: intl.get('entities.file.nTooltipFile'),
    render: (file_count: number) => (
      <Progress percent={(file_count / (files_nb || 1)) * 100} showInfo={false} />
    ),
    width: '100px',
  },
];

const getExperimentalStrategyColumns = ({
  files_nb,
  study_code,
  manageLoginModal,
  manageRedirectUri,
  isPublicStudyEnabled = false,
}: GetColumnsProps): ProColumnType<any>[] => [
  {
    key: 'experimental_strategy',
    dataIndex: 'experimental_strategy',
    title: intl.get('entities.file.experimental_strategy'),
    render: (experimentalStrategy: string) => experimentalStrategy || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    align: 'right',
    key: 'nb_files',
    title: intl.get('entities.file.files'),
    render: (experimentalStrategy: IExperimentalStrategy) => {
      if (!experimentalStrategy.file_count) return TABLE_EMPTY_PLACE_HOLDER;
      return isPublicStudyEnabled ? (
        <a
          onClick={() => {
            manageRedirectUri && manageRedirectUri(STATIC_ROUTES.DATA_EXPLORATION_DATAFILES);
            manageLoginModal && manageLoginModal(true);
            addExperimentalStrategyQuery(study_code, experimentalStrategy.experimental_strategy);
          }}
        >
          {numberFormat(experimentalStrategy.file_count)}
        </a>
      ) : (
        <Link
          to={STATIC_ROUTES.DATA_EXPLORATION_DATAFILES}
          onClick={() =>
            addExperimentalStrategyQuery(study_code, experimentalStrategy.experimental_strategy)
          }
        >
          {numberFormat(experimentalStrategy.file_count)}
        </Link>
      );
    },
    width: '100px',
  },
  {
    key: 'proportion_of_files',
    dataIndex: 'file_count',
    title: intl.get('entities.file.n=2', { count: numberFormat(files_nb) }),
    tooltip: intl.get('entities.file.nTooltipFile'),
    render: (file_count: number) => (
      <Progress percent={(file_count / (files_nb || 1)) * 100} showInfo={false} />
    ),
    width: '100px',
  },
];

type GetFileTableProps = {
  dataTypes: IDataType[];
  experimentStrategies: IExperimentalStrategy[];
  study?: IStudyEntity | IPublicStudyEntity;
  manageLoginModal?: (isOpen: boolean) => void;
  manageRedirectUri?: (uri: string) => void;
  isPublicStudyEnabled?: boolean;
};

const getFileTable = ({
  dataTypes,
  experimentStrategies,
  study,
  manageLoginModal,
  manageRedirectUri,
  isPublicStudyEnabled = false,
}: GetFileTableProps) => {
  const total = study?.file_count || 0;

  return [
    {
      columns: study
        ? getDataTypeColumns({
            files_nb: total,
            study_code: study.study_code!,
            manageLoginModal,
            manageRedirectUri,
            isPublicStudyEnabled,
          })
        : [],
      data: dataTypes,
      subTitle: intl.get('entities.study.numberByDataTypes'),
    },
    {
      columns: study
        ? getExperimentalStrategyColumns({
            files_nb: total,
            study_code: study.study_code!,
            manageLoginModal,
            manageRedirectUri,
            isPublicStudyEnabled,
          })
        : [],
      data: experimentStrategies,
      subTitle: intl.get('entities.study.numberByExperimentalStrategy'),
    },
  ];
};

export default getFileTable;

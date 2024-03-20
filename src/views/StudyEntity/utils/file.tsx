import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { Progress } from 'antd';
import { INDEXES } from 'graphql/constants';
import { IDataType, IExperimentalStrategy, IStudyEntity } from 'graphql/studies/models';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import { STATIC_ROUTES } from 'utils/routes';

const getDataTypeColumns = (files_nb: number, study_code: string): ProColumnType<any>[] => [
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
    render: (dataType: IDataType) =>
      (
        <Link
          to={STATIC_ROUTES.DATA_EXPLORATION_DATAFILES}
          onClick={() =>
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'study.study_code',
                    value: [study_code],
                    index: INDEXES.STUDY,
                  }),
                  generateValueFilter({
                    field: 'data_type',
                    value: [dataType.data_type],
                    index: INDEXES.FILE,
                  }),
                ],
              }),
              setAsActive: true,
            })
          }
        >
          {dataType.file_count}
        </Link>
      ) || TABLE_EMPTY_PLACE_HOLDER,
    width: '100px',
  },
  {
    key: 'proportion_of_files',
    dataIndex: 'file_count',
    title: intl.get('entities.file.n=2', { count: files_nb }),
    tooltip: intl.get('entities.file.nTooltipFile'),
    render: (file_count: number) => (
      <Progress percent={(file_count / (files_nb || 1)) * 100} showInfo={false} />
    ),
    width: '100px',
  },
];

const getExperimentalStrategyColumns = (
  files_nb: number,
  study_code: string,
): ProColumnType<any>[] => [
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
    render: (experimentalStrategy: IExperimentalStrategy) =>
      (
        <Link
          to={STATIC_ROUTES.DATA_EXPLORATION_DATAFILES}
          onClick={() =>
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'study.study_code',
                    value: [study_code],
                    index: INDEXES.STUDY,
                  }),
                  generateValueFilter({
                    field: 'sequencing_experiment.experiment_strategy',
                    value: [experimentalStrategy.experimental_strategy],
                    index: INDEXES.FILE,
                  }),
                ],
              }),
              setAsActive: true,
            })
          }
        >
          {experimentalStrategy.file_count}
        </Link>
      ) || TABLE_EMPTY_PLACE_HOLDER,
    width: '100px',
  },
  {
    key: 'proportion_of_files',
    dataIndex: 'file_count',
    title: intl.get('entities.file.n=2', { count: files_nb }),
    tooltip: intl.get('entities.file.nTooltipFile'),
    render: (file_count: number) => (
      <Progress percent={(file_count / (files_nb || 1)) * 100} showInfo={false} />
    ),
    width: '100px',
  },
];

const getFileTable = (study?: IStudyEntity) => {
  const total = study?.file_count || 0;

  // TODO replace hardcoded arrays when back mock or real data will be received
  const data_types = [
    {
      file_count: 1200,
      data_type: 'Gene Fusions',
    },
    {
      file_count: 477,
      data_type: 'Protein abundance (absolute protein concentration)',
    },
    {
      file_count: 433,
      data_type: 'Aligned Reads',
    },
    {
      file_count: 433,
      data_type: 'gVCF',
    },
    {
      file_count: 418,
      data_type: 'Preprocessed metabolite relative abundance',
    },
    {
      file_count: 7,
      data_type: 'Other',
    },
    {
      file_count: 7,
      data_type: 'Variant Calls',
    },
  ];

  const experimental_strategies = [
    {
      file_count: 3200,
      experimental_strategy: 'RNA-Seq',
    },
    {
      file_count: 880,
      experimental_strategy: 'Whole Genome Sequencing',
    },
    {
      file_count: 447,
      experimental_strategy: 'Multiplex Immunoassay',
    },
    {
      file_count: 418,
      experimental_strategy: 'LCMS Metabolomics',
    },
  ];

  return [
    {
      columns: study ? getDataTypeColumns(total, study.study_code) : [],
      data: data_types,
      subTitle: intl.get('entities.study.numberByDataTypes'),
    },
    {
      columns: study ? getExperimentalStrategyColumns(total, study.study_code) : [],
      data: experimental_strategies,
      subTitle: intl.get('entities.study.numberByExperimentalStrategy'),
    },
  ];
};

export default getFileTable;

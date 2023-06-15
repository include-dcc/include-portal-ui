import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { Progress } from 'antd';
import { INDEXES } from 'graphql/constants';
import { IFileEntity } from 'graphql/files/models';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { STATIC_ROUTES } from 'utils/routes';

interface IFileInfoByType {
  key: string;
  value: string;
  nb_files: number;
  proportion_of_files: number;
  participant_id: string;
}

interface IDataCategory {
  category: string;
  nb_files: number;
  percentage: number;
}

export const getDataCategoryInfo = (
  files: IFileEntity[],
  dataCategories?: [{ key: string }],
  participant_id?: string,
) => {
  const filesFiltered = files.filter((file) => file?.data_category);
  if (!filesFiltered?.length) {
    return [];
  }

  const allDataCategories = dataCategories?.map((dataCategory) => dataCategory.key);
  const filesInfoData = allDataCategories?.reduce(
    (dataCategories: IFileInfoByType[], dataCategory: string) => {
      const filesWithGivenCategory = filesFiltered.filter(
        (file) => file.data_category === dataCategory,
      );
      return [
        ...dataCategories,
        {
          key: dataCategory,
          value: dataCategory,
          nb_files: filesWithGivenCategory.length,
          proportion_of_files: (filesWithGivenCategory.length / filesFiltered.length) * 100,
          participant_id: participant_id || '',
        },
      ];
    },
    [],
  );
  return filesInfoData || [];
};

export const getFileCountByExperimentalStrategy = (
  files: IFileEntity[],
  expStrategies?: [{ key: string }],
  participant_id?: string,
) => {
  const filesFiltered = files.filter((file) => file?.sequencing_experiment);
  if (!filesFiltered?.length) {
    return [];
  }

  const strategies = expStrategies?.map((x) => x.key);

  const filesInfoData = strategies?.reduce((ss: IFileInfoByType[], s: string) => {
    const filesWithGivenStrategy = filesFiltered.filter((file) =>
      file.sequencing_experiment.hits.edges.some((e) => e.node.experiment_strategy === s),
    );
    return [
      ...ss,
      {
        key: s,
        value: s,
        nb_files: filesWithGivenStrategy.length,
        proportion_of_files: (filesWithGivenStrategy.length / filesFiltered.length) * 100,
        participant_id: participant_id || '',
      },
    ];
  }, []);
  return filesInfoData || [];
};

export const getExperimentalStrategyColumns = (fileCount: number): ProColumnType<any>[] => [
  {
    key: 'value',
    dataIndex: 'value',
    title: intl.get('entities.file.experimental_strategy'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'nb_files',
    title: intl.get('entities.file.files'),
    render: (filesInfo: IFileInfoByType) =>
      filesInfo?.nb_files > 0 ? (
        <Link
          to={STATIC_ROUTES.DATA_EXPLORATION_DATAFILES}
          onClick={() =>
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'participant_id',
                    value: [filesInfo.participant_id],
                    index: INDEXES.PARTICIPANT,
                  }),
                  generateValueFilter({
                    field: 'sequencing_experiment.experiment_strategy',
                    value: [filesInfo.value],
                    index: INDEXES.FILE,
                  }),
                ],
              }),
              setAsActive: true,
            })
          }
        >
          {filesInfo.nb_files}
        </Link>
      ) : (
        filesInfo?.nb_files ?? TABLE_EMPTY_PLACE_HOLDER
      ),
  },
  {
    key: 'percentage',
    dataIndex: 'proportion_of_files',
    tooltip: 'Total number of files associated with the participant',
    title: `(n=${fileCount})`,
    render: (percentage: number) => <Progress percent={percentage} showInfo={false} />,
  },
];

export const getDataCategoryColumns = (
  fileCount: number,
  participantId: string,
): ProColumnType<IDataCategory>[] => [
  {
    key: 'value',
    dataIndex: 'value',
    title: intl.get('entities.file.data_category'),
    render: (value: string) => value || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'nb_files',
    title: intl.get('entities.file.files'),
    render: (file: IFileInfoByType) =>
      file?.nb_files > 0 ? (
        <Link
          to={STATIC_ROUTES.DATA_EXPLORATION_DATAFILES}
          onClick={() =>
            addQuery({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              query: generateQuery({
                newFilters: [
                  generateValueFilter({
                    field: 'participant_id',
                    value: [participantId],
                    index: INDEXES.PARTICIPANT,
                  }),
                  generateValueFilter({
                    field: 'data_category',
                    value: [file.value],
                    index: INDEXES.FILE,
                  }),
                ],
              }),
              setAsActive: true,
            })
          }
        >
          {file.nb_files}
        </Link>
      ) : (
        file?.nb_files ?? TABLE_EMPTY_PLACE_HOLDER
      ),
  },
  {
    key: 'proportion_of_files',
    dataIndex: 'proportion_of_files',
    tooltip: 'Total number of files associated with the participant',
    title: `(n=${fileCount})`,
    render: (percentage: number) => <Progress percent={percentage} showInfo={false} />,
  },
];

import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { hydrateResults } from '@ferlab/ui/core/graphql/utils';
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

export const getDataCategoryInfo = (files: IFileEntity[], participant_id?: string) => {
  const filesInfosData: IFileInfoByType[] = [];
  for (const file of files) {
    const filesFound = files.filter(({ data_category }) => data_category === file.data_category);
    if (!filesInfosData.find((f) => f.value === file.data_category)) {
      filesInfosData.push({
        key: file.data_category,
        value: file.data_category,
        nb_files: filesFound.length,
        proportion_of_files: (filesFound.length / files.length) * 100,
        participant_id: participant_id || '',
      });
    }
  }
  return filesInfosData;
};

export const getFileCountByExperimentalStrategy = (
  files: IFileEntity[],
  participant_id?: string,
) => {
  const experimentalStrategyFilteredResult: { [key: string]: number } = {
    'Whole Genome Sequencing': 0,
    'RNA-Seq': 0,
    'Multiplex Immunoassay': 0,
    'LCMS Metabolomics': 0,
  };

  // Create a list of all experiment strategy available
  for (const file of files) {
    const filters: string[] = [];
    hydrateResults(file.sequencing_experiment?.hits?.edges || []).forEach((node) => {
      if (filters.includes(node.experiment_strategy)) {
        return;
      }
      filters.push(node.experiment_strategy);
    });

    filters.forEach((se) => {
      if (!experimentalStrategyFilteredResult[se]) {
        experimentalStrategyFilteredResult[se] = 0;
      }
      experimentalStrategyFilteredResult[se] += 1;
    });
  }

  return Object.keys(experimentalStrategyFilteredResult).map((key) => ({
    key,
    value: key,
    nb_files: experimentalStrategyFilteredResult[key],
    proportion_of_files: (experimentalStrategyFilteredResult[key] / files.length) * 100,
    participant_id: participant_id || '',
  }));
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
      (
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
      ) || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'percentage',
    dataIndex: 'percentage',
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
    render: (file: IDataCategory) =>
      file && file?.nb_files > 0 ? (
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
                    value: [file.category],
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
    key: 'percentage',
    dataIndex: 'percentage',
    tooltip: 'Total number of files associated with the participant',
    title: `(n=${fileCount})`,
    render: (percentage: number) => <Progress percent={percentage} showInfo={false} />,
  },
];

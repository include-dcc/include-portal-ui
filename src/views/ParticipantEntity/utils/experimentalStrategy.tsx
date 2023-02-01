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

enum ExperimentalStrategy {
  RNA_SEQ = 'RNA-Seq',
  WGS = 'Whole Genome Sequencing',
  MULTITPLEX_IMMUNOASSAY = 'Multiplex Immunoassay',
  LCMS_METABOLOMICS = 'LCMS_Metabolomics',
}

interface IExperimentalStrategy {
  strategy: string;
  nb_files: number;
  percentage: number;
}

export const getExperimentalStrategyInfo = (files: IFileEntity[], fileCount: number) => {
  const experimentalStrategyInfo: IExperimentalStrategy[] = [];
  const fileCountByExperimentalStrategy = getFileCountByExperimentalStrategy(files);

  for (const [key, value] of Object.entries(fileCountByExperimentalStrategy)) {
    experimentalStrategyInfo.push({
      strategy: key,
      nb_files: value,
      percentage: (value / fileCount) * 100,
    });
  }

  return experimentalStrategyInfo;
};

export const getFileCountByExperimentalStrategy = (files: IFileEntity[]) => {
  const fileCountByExperimentalStrategy: { [key: string]: number } = {
    [ExperimentalStrategy.RNA_SEQ]: 0,
    [ExperimentalStrategy.WGS]: 0,
    [ExperimentalStrategy.MULTITPLEX_IMMUNOASSAY]: 0,
    [ExperimentalStrategy.LCMS_METABOLOMICS]: 0,
  };

  for (const file of files) {
    const experimentalStrategy = file.sequencing_experiment?.experiment_strategy;

    if (
      Object.values(ExperimentalStrategy).includes(experimentalStrategy as ExperimentalStrategy)
    ) {
      fileCountByExperimentalStrategy[experimentalStrategy] += 1;
    }
  }

  return fileCountByExperimentalStrategy;
};

export const getExperimentalStrategyColumns = (
  fileCount: number,
  participantId: string,
): ProColumnType<any>[] => [
  {
    key: 'strategy',
    dataIndex: 'strategy',
    title: intl.get('entities.participant.files.experimental_strategy'),
    render: (label: string) => label || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'nb_files',
    title: intl.get('entities.participant.files.files'),
    render: (file: IExperimentalStrategy) =>
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
                    value: [participantId],
                    index: INDEXES.PARTICIPANT,
                  }),
                  generateValueFilter({
                    field: 'sequencing_experiment.experiment_strategy',
                    value: [file.strategy],
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
      ) || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'percentage',
    dataIndex: 'percentage',
    title: `(n=${fileCount})`,
    render: (percentage: number) => <Progress percent={percentage} showInfo={false} />,
  },
];

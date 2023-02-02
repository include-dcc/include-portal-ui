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

enum DataCategory {
  GENOMICS = 'Genomics',
  TRANSCRIPTOMICS = 'Transcriptomics',
  PROTEOMICS = 'Proteomics',
  METABOLOMICS = 'Metabolomics',
}

interface IDataCategory {
  category: string;
  nb_files: number;
  percentage: number;
}

export const getDataCategoryInfo = (files: IFileEntity[], fileCount: number) => {
  const dataCategoryInfo: IDataCategory[] = [];
  const fileCountByDataCategory = getFileCountByDataCategory(files);

  for (const [key, value] of Object.entries(fileCountByDataCategory)) {
    dataCategoryInfo.push({
      category: key,
      nb_files: value,
      percentage: (value / fileCount || 0) * 100,
    });
  }

  return dataCategoryInfo;
};

export const getFileCountByDataCategory = (files: IFileEntity[]) => {
  const fileCountByDataCategory: { [key: string]: number } = {
    [DataCategory.GENOMICS]: 0,
    [DataCategory.TRANSCRIPTOMICS]: 0,
    [DataCategory.PROTEOMICS]: 0,
    [DataCategory.METABOLOMICS]: 0,
  };

  for (const file of files) {
    const dataCategory = file.data_category;

    if (Object.values(DataCategory).includes(dataCategory as DataCategory)) {
      fileCountByDataCategory[dataCategory] += 1;
    }
  }

  return fileCountByDataCategory;
};

export const getDataCategoryColumns = (
  fileCount: number,
  participantId: string,
): ProColumnType<IDataCategory>[] => [
  {
    key: 'category',
    dataIndex: 'category',
    title: intl.get('entities.file.data_category'),
    render: (category: string) => category,
  },
  {
    key: 'nb_files',
    title: intl.get('entities.file.files'),
    render: (file: IDataCategory) =>
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
      ) || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'percentage',
    dataIndex: 'percentage',
    title: `(n=${fileCount})`,
    render: (percentage: number) => <Progress percent={percentage} showInfo={false} />,
  },
];

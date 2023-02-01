import intl from 'react-intl-universal';
import { EntityTableMultiple } from '@ferlab/ui/core/pages/EntityPage';
import { IFileEntity } from 'graphql/files/models';
import { IParticipantEntity } from 'graphql/participants/models';

import { SectionId } from '../utils/anchorLinks';
import { getDataCategoryColumns, getDataCategoryInfo } from '../utils/dataCategory';
import {
  getExperimentalStrategyColumns,
  getExperimentalStrategyInfo,
} from '../utils/experimentalStrategy';

interface IFilesTableProps {
  participant?: IParticipantEntity;
  loading: boolean;
}

const FileTable = ({ participant, loading }: IFilesTableProps) => {
  const participantId = participant?.participant_id || '';

  const files: IFileEntity[] = participant?.files?.hits.edges.map(({ node }) => node) || [];
  const fileCount = participant?.nb_files || 0;

  const dataCategoryInfo = getDataCategoryInfo(files, fileCount);
  const experimentalStrategyInfo = getExperimentalStrategyInfo(files, fileCount);

  return (
    <div>
      <EntityTableMultiple
        id={SectionId.FILES}
        loading={loading}
        title={intl.get('entities.participant.files.title')}
        header={intl.get('entities.participant.files.title')}
        tables={[
          {
            columns: getDataCategoryColumns(fileCount, participantId),
            data: dataCategoryInfo,
            subTitle: intl.get('entities.participant.files.data_category_count'),
          },
          {
            columns: getExperimentalStrategyColumns(fileCount, participantId),
            data: experimentalStrategyInfo,
            subTitle: intl.get('entities.participant.files.experimental_strategy_count'),
          },
        ]}
      />
    </div>
  );
};
export default FileTable;

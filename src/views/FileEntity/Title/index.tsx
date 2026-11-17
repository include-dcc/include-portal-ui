import { FileImageOutlined } from '@ant-design/icons';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { EntityTitle } from '@ferlab/ui/core/pages/EntityPage';
import { Space } from 'antd';
import { INDEXES } from 'graphql/constants';
import { IFileEntity } from 'graphql/files/models';
import { DATA_FILES_SAVED_SETS_FIELD } from 'views/DataExploration/utils/constant';

import CavaticaAnalyzeButton from 'components/Cavatica/AnalyzeButton';
import FileAuthorization from 'components/FileAuthorization';
import DownloadFileManifestModal from 'components/uiKit/reports/DownloadFileManifestModal';

interface OwnProps {
  file?: IFileEntity;
  loading?: boolean;
}

const FileEntityTitle: React.FC<OwnProps> = ({ file, loading }) => {
  const generateSqonForFile = (): ISyntheticSqon =>
    generateQuery({
      newFilters: [
        generateValueFilter({
          field: DATA_FILES_SAVED_SETS_FIELD,
          index: INDEXES.FILE,
          value: file ? [file?.file_id] : [],
        }),
      ],
    });

  const title = {
    text: file?.file_id,
    icon: <FileImageOutlined />,
    tag: file && <FileAuthorization file={file} placement="bottom" />,
    extra: (
      <Space>
        <DownloadFileManifestModal
          key="file-entity-manifest"
          sqon={generateSqonForFile()}
          isDisabled={false}
          hasTooManyFiles={false}
        />
        {file && (
          <CavaticaAnalyzeButton type="primary" fileIds={[file.file_id]} index={INDEXES.FILE} />
        )}
      </Space>
    ),
  };

  return <EntityTitle {...title} loading={loading} />;
};

export default FileEntityTitle;

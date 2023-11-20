import intl from 'react-intl-universal';
import { FileImageOutlined, LockOutlined, UnlockFilled } from '@ant-design/icons';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { EntityTitle } from '@ferlab/ui/core/pages/EntityPage';
import { Popover, Space } from 'antd';
import { INDEXES } from 'graphql/constants';
import { IFileEntity } from 'graphql/files/models';
import { DATA_FILES_SAVED_SETS_FIELD } from 'views/DataExploration/utils/constant';

import { FENCE_CONNECTION_STATUSES } from 'common/fenceTypes';
import CavaticaAnalyzeButton from 'components/Cavatica/AnalyzeButton';
import PopoverContentLink from 'components/uiKit/PopoverContentLink';
import DownloadFileManifestModal from 'components/uiKit/reports/DownloadFileManifestModal';
import { useFenceConnection } from 'store/fenceConnection';
import { userHasAccessToFile } from 'utils/dataFiles';

import styles from './index.module.scss';

interface OwnProps {
  file?: IFileEntity;
  loading?: boolean;
}

const FileEntityTitle: React.FC<OwnProps> = ({ file, loading }) => {
  const { fencesAllAcls, connectionStatus } = useFenceConnection();

  const hasAccess = file
    ? userHasAccessToFile(
        file,
        fencesAllAcls,
        connectionStatus.cavatica === FENCE_CONNECTION_STATUSES.connected,
        connectionStatus.gen3 === FENCE_CONNECTION_STATUSES.connected,
      )
    : false;

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
    tag: hasAccess ? (
      <Popover
        placement="bottom"
        overlayClassName={styles.popOverContent}
        title={intl.get('entities.file.fileAuthorization')}
        content={intl.get('entities.file.unlocked')}
      >
        <UnlockFilled className={styles.unlocked} />
      </Popover>
    ) : (
      <Popover
        overlayClassName={styles.popOverContent}
        title={intl.get('entities.file.fileAuthorization')}
        content={
          <span>
            {intl.get('entities.file.locked')}
            <PopoverContentLink
              className={styles.contentLink}
              externalHref="https://help.includedcc.org/docs/applying-for-access"
              title={intl.get('entities.file.apply_data_access')}
            />
            .
          </span>
        }
      >
        <LockOutlined className={styles.locked} />
      </Popover>
    ),
    extra: (
      <Space>
        <DownloadFileManifestModal
          key="file-entity-manifest"
          sqon={generateSqonForFile()}
          isDisabled={false}
          hasTooManyFiles={false}
        />
        {file && <CavaticaAnalyzeButton type="primary" fileIds={[file.file_id]} />}
      </Space>
    ),
  };

  return <EntityTitle {...title} loading={loading} />;
};

export default FileEntityTitle;

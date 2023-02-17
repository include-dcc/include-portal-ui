import intl from 'react-intl-universal';
import { FileImageOutlined, LockOutlined, UnlockFilled } from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { EntityTitle } from '@ferlab/ui/core/pages/EntityPage';
import { Button, Space, Tooltip } from 'antd';
import { IFileEntity } from 'graphql/files/models';

import { FENCE_CONNECTION_STATUSES } from 'common/fenceTypes';
import CavaticaAnalyzeButton from 'components/Cavatica/AnalyzeButton';
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

  const title = {
    text: file?.file_id,
    icon: <FileImageOutlined />,
    tag: hasAccess ? (
      <Tooltip title={intl.get('entities.file.unlocked')}>
        <UnlockFilled className={styles.unlocked} />
      </Tooltip>
    ) : (
      <Tooltip
        title={
          <>
            <>{intl.get('entities.file.locked')}</>
            <ExternalLink
              className={styles.link}
              href="https://help.includedcc.org/docs/applying-for-access"
            >
              {intl.get('entities.file.apply_data_access')}
            </ExternalLink>
            <>.</>
          </>
        }
      >
        <LockOutlined className={styles.locked} />
      </Tooltip>
    ),
    extra: (
      <Space>
        <Button type="primary">{intl.get('entities.file.manifest')}</Button>
        {file && <CavaticaAnalyzeButton fileIds={[file.file_id]} />}
      </Space>
    ),
  };

  return <EntityTitle {...title} loading={loading} />;
};

export default FileEntityTitle;

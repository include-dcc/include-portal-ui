import intl from 'react-intl-universal';
import { FileImageOutlined, LockOutlined, UnlockFilled, WarningOutlined } from '@ant-design/icons';
import { FENCE_AUTHENTIFICATION_STATUS } from '@ferlab/ui/core/components/Widgets/AuthorizedStudies';
import { PASSPORT_AUTHENTIFICATION_STATUS } from '@ferlab/ui/core/components/Widgets/Cavatica/type';
import { ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { EntityTitle } from '@ferlab/ui/core/pages/EntityPage';
import { Popover, Space } from 'antd';
import { INDEXES } from 'graphql/constants';
import { FileAccessType, IFileEntity } from 'graphql/files/models';
import { DATA_FILES_SAVED_SETS_FIELD } from 'views/DataExploration/utils/constant';

import { FENCE_NAMES } from 'common/fenceTypes';
import CavaticaAnalyzeButton from 'components/Cavatica/AnalyzeButton';
import PopoverContentLink from 'components/uiKit/PopoverContentLink';
import DownloadFileManifestModal from 'components/uiKit/reports/DownloadFileManifestModal';
import { useAllFencesAcl, useFenceAuthentification } from 'store/fences';
import { useCavaticaPassport } from 'store/passport';
import { userHasAccessToFile } from 'utils/dataFiles';

import styles from './index.module.css';

interface OwnProps {
  file?: IFileEntity;
  loading?: boolean;
}

const FileEntityTitle: React.FC<OwnProps> = ({ file, loading }) => {
  const fencesAllAcls = useAllFencesAcl();
  const cavatica = useCavaticaPassport();
  const dcf = useFenceAuthentification(FENCE_NAMES.dcf);

  const hasAccess = file
    ? userHasAccessToFile(
        file,
        fencesAllAcls,
        cavatica.authentification.status === PASSPORT_AUTHENTIFICATION_STATUS.connected,
        dcf.status === FENCE_AUTHENTIFICATION_STATUS.connected,
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

  const renderTag = () => {
    if (
      file?.controlled_access.toLowerCase() === FileAccessType.CONTROLLED.toLowerCase() &&
      (file?.access_urls?.startsWith('drs://cavatica-ga4gh-api.sbgenomics.com/') ||
        file?.access_urls?.startsWith('drs://nci-crdc.datacommons.io/'))
    ) {
      return (
        <Popover
          placement="bottom"
          overlayStyle={{ maxWidth: '420px' }}
          title={intl.get(
            'screen.dataExploration.tabs.datafiles.undeterminedAuthorization.popoverTitle',
          )}
          content={intl.getHTML(
            'screen.dataExploration.tabs.datafiles.undeterminedAuthorization.popoverContent',
            {
              href: 'https://help.includedcc.org/docs/applying-for-access',
            },
          )}
        >
          <WarningOutlined className={styles.authorizedUndetermined} />
        </Popover>
      );
    } else if (hasAccess) {
      return (
        <Popover
          placement="bottom"
          overlayClassName={styles.popOverContent}
          title={intl.get('entities.file.fileAuthorization')}
          content={intl.get('entities.file.unlocked')}
        >
          <UnlockFilled className={styles.unlocked} />
        </Popover>
      );
    } else {
      return (
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
      );
    }
  };

  const title = {
    text: file?.file_id,
    icon: <FileImageOutlined />,
    tag: renderTag(),
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

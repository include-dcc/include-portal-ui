import intl from 'react-intl-universal';
import { useSelector } from 'react-redux';
import { LockOutlined, UnlockFilled } from '@ant-design/icons';
import { Popover } from 'antd';
import { TooltipPlacement } from 'antd/es/tooltip';
import { IFileEntity } from 'graphql/files/models';

import PopoverContentLink from 'components/uiKit/PopoverContentLink';
import {
  passportCavaticaConnectedSelector,
  passportCavaticaConsentCodesSelector,
} from 'store/passport/selector';
import { isFileUnlocked } from 'utils/dataFiles';

import styles from './index.module.css';

const APPLYING_FOR_ACCESS_URL = 'https://help.includedcc.org/docs/applying-for-access';

interface OwnProps {
  file: IFileEntity;
  placement?: TooltipPlacement;
}

// Read only: useCavaticaPassport would refetch the connection status for every table row.
// Narrow selectors: one per row, so other Cavatica state changes don't re-render them all.
const FileAuthorization = ({ file, placement = 'top' }: OwnProps) => {
  const isConnected = useSelector(passportCavaticaConnectedSelector);
  const consentCodes = useSelector(passportCavaticaConsentCodesSelector);

  if (isFileUnlocked(file, isConnected, consentCodes)) {
    return (
      <Popover
        placement={placement}
        overlayClassName={styles.popoverContent}
        title={intl.get('entities.file.fileAuthorization')}
        content={intl.get('entities.file.unlocked')}
      >
        <UnlockFilled className={styles.unlocked} />
      </Popover>
    );
  }

  return (
    <Popover
      placement={placement}
      overlayClassName={styles.popoverContent}
      title={intl.get('entities.file.fileAuthorization')}
      content={
        <span>
          {intl.get('entities.file.locked')}
          <PopoverContentLink
            className={styles.contentLink}
            externalHref={APPLYING_FOR_ACCESS_URL}
            title={intl.get('entities.file.apply_data_access')}
          />
          .
        </span>
      }
    >
      <LockOutlined className={styles.locked} />
    </Popover>
  );
};

export default FileAuthorization;

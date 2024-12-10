import { useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { BaseButtonProps } from 'antd/lib/button/button';
import axios from 'axios';
import saveAs from 'file-saver';

import { getBlobFromResponse } from 'common/downloader';
import { ApiResponse } from 'services/api';
import { globalActions } from 'store/global';

import styles from './index.module.css';

type TDownloadTranscriptomics = BaseButtonProps & {
  handleUrl: () => Promise<ApiResponse<{ url: string }>>;
  filename: string;
  displayNotification?: boolean;
  tooltip: string;
};

const DownloadTranscriptomics = ({
  handleUrl,
  filename,
  displayNotification = false,
  tooltip,
  ...props
}: TDownloadTranscriptomics) => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  return (
    <Tooltip
      title={tooltip}
      overlayClassName={styles.overlayTooltip}
      overlayInnerStyle={{ textAlign: 'center' }}
    >
      <Button
        loading={loading}
        icon={<DownloadOutlined />}
        onClick={async () => {
          setLoading(true);
          const response = await handleUrl();

          if (displayNotification) {
            dispatch(
              globalActions.displayMessage({
                type: 'loading',
                key: filename,
                content: intl.get('screen.analytics.transcriptomic.footer.notification'),
                duration: 0,
              }),
            );
          }

          await axios({
            url: response.data?.url ?? '',
            method: 'GET',
            responseType: 'blob',
            headers: {
              'Content-Type': 'application/json',
              Accept: '*/*',
            },
          }).then((response) => {
            const blob = getBlobFromResponse(response, 'blob');
            saveAs(blob, filename);
            setLoading(false);
            dispatch(globalActions.destroyMessages([filename]));
          });
        }}
        {...props}
      >
        {intl.get('screen.analytics.transcriptomic.footer.download')}
      </Button>
    </Tooltip>
  );
};

export default DownloadTranscriptomics;

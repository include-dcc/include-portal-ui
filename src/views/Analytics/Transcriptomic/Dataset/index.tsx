import intl from 'react-intl-universal';
import { Button, Select } from 'antd';

import styles from './index.module.css';

const TranscriptomicDataset = () => (
  <div className={styles.transcriptomicDataset}>
    <span className={styles.datasetLabel}>
      {intl.get('screen.analytics.transcriptomic.dataset.label')}
    </span>
    <Select value="dataset_whole_blood">
      <Select.Option value="dataset_whole_blood">TODO</Select.Option>
    </Select>
    <Button type="link" onClick={() => {}}>
      {intl.get('screen.analytics.transcriptomic.dataset.about')}
    </Button>
  </div>
);

export default TranscriptomicDataset;

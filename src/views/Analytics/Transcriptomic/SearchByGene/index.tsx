import { FilterOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
import GenesUploadIds from 'views/Variants/components/GeneUploadIds';

import styles from './index.module.css';

const TranscriptomicSearchByGene = () => (
  <div className={styles.transcriptomicSearchByGene}>
    <Select className={styles.select} value="search_by_gene">
      <Select.Option value="search_by_gene">TODO</Select.Option>
    </Select>
    <GenesUploadIds
      handleUpload={(uniqueMatches) => {
        // TODO: handle upload
      }}
    />
    <Button icon={<FilterOutlined />} />
  </div>
);

export default TranscriptomicSearchByGene;

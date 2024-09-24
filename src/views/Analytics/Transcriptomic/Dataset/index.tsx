import React, { useState } from 'react';
import intl from 'react-intl-universal';
import { Button, Select } from 'antd';

import AboutModal from './AboutModal';

import styles from './index.module.css';

const TranscriptomicDataset = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.transcriptomicDataset}>
      <span className={styles.datasetLabel}>{intl.get('screen.analytics.transcriptomic.dataset.label')}</span>
      <Select value="dataset_whole_blood" className={styles.datasetSelect}>
        <Select.Option value="dataset_whole_blood">
          {intl.get('screen.analytics.transcriptomic.dataset.datasetValue')}
        </Select.Option>
      </Select>
      <Button type="link" className={styles.aboutButton} onClick={handleOpenModal}>
        {intl.get('screen.analytics.transcriptomic.dataset.about')}
      </Button>

      <AboutModal
        open={isModalOpen}
        onClose={handleCloseModal}
        content={intl.get('screen.analytics.transcriptomic.dataset.aboutContent')}
        title={intl.get('screen.analytics.transcriptomic.dataset.datasetValue')}
      />
    </div>
  );
};

export default TranscriptomicDataset;

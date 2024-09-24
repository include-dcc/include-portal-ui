import { useState } from 'react';
import intl from 'react-intl-universal';
import { Button, Select, Typography } from 'antd';

const { Paragraph, Title } = Typography;

import BasicDescription from '@ferlab/ui/core/components/BasicDescription';

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
      <span className={styles.datasetLabel}>
        {intl.get('screen.analytics.transcriptomic.dataset.label')}
      </span>
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
        title={intl.get('screen.analytics.transcriptomic.dataset.datasetValue')}
      >
        <Paragraph className={styles.description}>
          {intl.get('screen.analytics.transcriptomic.about.description')}
        </Paragraph>
        <Title className={styles.contentTitle} level={5}>
          {intl.get('screen.analytics.transcriptomic.about.subtitle')}
        </Title>
        {/* TODO: should be dynamic in a near futur */}
        <BasicDescription label={'Tissue Type:'} text={'Whole blood'} bordered />
        <BasicDescription label={'Sample Type:'} text={'PAXGeneWholeBloodRNA'} bordered />
        <BasicDescription label={'Experimental Strategy:'} text={'Bulk RNAseq'} bordered />
        <BasicDescription label={'Selection:'} text={'polyA+'} bordered />
        <BasicDescription label={'Depletion:'} text={'globin'} bordered />
        <BasicDescription label={'Library Type:'} text={'Strand-specific paired-end'} bordered />
        <BasicDescription label={'Platform:'} text={'Illumina Novaseq'} bordered />
        <BasicDescription label={'Genome Reference:'} text={'GRCh38'} bordered />
        <BasicDescription label={'Annotation:'} text={'Gencode v33'} bordered />
      </AboutModal>
    </div>
  );
};

export default TranscriptomicDataset;

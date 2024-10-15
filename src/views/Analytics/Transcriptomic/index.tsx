import React, { useMemo, useState } from 'react';
import intl from 'react-intl-universal';
import Empty from '@ferlab/ui/core/components/Empty';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Divider, Select, Space, Typography } from 'antd';
import TranscriptomicDataset from 'views/Analytics/Transcriptomic/Dataset';
import TranscriptomicFooter from 'views/Analytics/Transcriptomic/Footer';
import TranscriptomicSearchByGene from 'views/Analytics/Transcriptomic/SearchByGene';
import TranscriptomicSearchBySample from 'views/Analytics/Transcriptomic/SearchBySample';
import { SCROLL_WRAPPER_ID } from 'views/DataExploration/utils/constant';

import { useTranscriptomicsDiffGeneExp, useTranscriptomicsSampleGeneExp } from 'store/analytics';

import { TTranscriptomicsDiffGeneExp } from '../../../services/api/transcriptomics/models';

import ScatterPlot from './ScatterPlot';
import SideBar, { TTranscriptomicSideBarItem } from './SideBar';
import SwarmPlot from './SwarmPlot';

import styles from './index.module.css';

const { Title } = Typography;

const menuItems: () => TTranscriptomicSideBarItem[] = () => [
  {
    key: '1',
    title: intl.get('screen.analytics.transcriptomic.sidebar.statisticalCorrection'),
    content: (
      <Select value="bh_fdr" className={styles.sidebarSelect}>
        <Select.Option value="bh_fdr">
          {intl.get('screen.analytics.transcriptomic.sidebar.bhfdr')}
        </Select.Option>
      </Select>
    ),
  },
  {
    key: '2',
    title: intl.get('screen.analytics.transcriptomic.sidebar.statisticalTest'),
    content: (
      <Select value="linear_regression_model" className={styles.sidebarSelect}>
        <Select.Option value="linear_regression_model">
          {intl.get('screen.analytics.transcriptomic.sidebar.deseq2')}
        </Select.Option>
      </Select>
    ),
  },
];

const getSelectedGeneSymbol = (diffGeneExp: TTranscriptomicsDiffGeneExp[], id: string) => {
  for (const diffGene of diffGeneExp) {
    const gene = diffGene.data.find((gene) => gene.ensembl_gene_id === id);
    if (gene) return gene.gene_symbol;
  }
  return '';
};

export const Transcriptomic = () => {
  const diffGeneExp = useTranscriptomicsDiffGeneExp();
  const [selectedGeneIds, setSelectedGeneIds] = useState<string[]>([]);
  const [selectedSampleIds, setSelectedSampleIds] = useState<string[]>([]);
  const sampleGeneExp = useTranscriptomicsSampleGeneExp(selectedGeneIds[0]);

  const selectedGeneSymbol = useMemo(
    () => (diffGeneExp.data ? getSelectedGeneSymbol(diffGeneExp.data, selectedGeneIds[0]) : ''),
    [diffGeneExp, selectedGeneIds],
  );

  const handleGeneSelection = (ensemble_ids: string[]) => {
    setSelectedGeneIds(ensemble_ids);
    setSelectedSampleIds([]);
  };

  const handleSampleSelection = (sample_ids: string[]) => {
    setSelectedSampleIds(sample_ids);
  };

  return (
    <div className={styles.transcriptomicPage}>
      <SideBar className={styles.sideMenu} menuItems={menuItems()} />
      <ScrollContent id={SCROLL_WRAPPER_ID} className={styles.scrollContent}>
        <Space direction="vertical" size={16} className={styles.pageContent}>
          <div>
            <Title className={styles.title} level={4}>
              {intl.get('screen.analytics.transcriptomic.title')}
            </Title>
          </div>
          <TranscriptomicDataset />
          <GridCard
            className={styles.gridCard}
            contentClassName={styles.gridCardContent}
            footer={
              <TranscriptomicFooter
                selectedGeneIds={selectedGeneIds}
                sampleGeneExpData={sampleGeneExp.data?.data}
              />
            }
            content={
              <div>
                <div className={styles.header}>
                  <div className={styles.container}>
                    <TranscriptomicSearchByGene
                      options={diffGeneExp.data}
                      onSelectOptions={setSelectedGeneIds}
                      selectedOptionsIds={selectedGeneIds}
                    />
                  </div>
                  <div className={styles.vDivider} />
                  <div className={styles.container}>
                    <TranscriptomicSearchBySample
                      options={sampleGeneExp.data}
                      onSelectOptions={setSelectedSampleIds}
                      selectedOptionsIds={selectedSampleIds}
                      disabled={selectedGeneIds.length !== 1}
                    />
                  </div>
                </div>
                <Divider className={styles.hDivider} />
                <div className={styles.content}>
                  <div className={styles.chartContainer}>
                    <ScatterPlot
                      loading={diffGeneExp.loading}
                      data={diffGeneExp.data}
                      handleGeneSelection={handleGeneSelection}
                      selectedGeneIds={selectedGeneIds}
                    />
                  </div>
                  <div className={styles.vDivider} />
                  <div className={styles.chartContainer}>
                    {selectedGeneIds.length !== 1 ? (
                      <Empty
                        size="large"
                        imageType="grid"
                        description={intl.get('screen.analytics.transcriptomic.empty')}
                      />
                    ) : (
                      <SwarmPlot
                        selectedGeneSymbol={selectedGeneSymbol}
                        selectedSampleIds={selectedSampleIds}
                        handleSampleSelection={handleSampleSelection}
                        loading={sampleGeneExp.loading}
                        sampleGeneExp={sampleGeneExp.data}
                      />
                    )}
                  </div>
                </div>
              </div>
            }
          />
        </Space>
      </ScrollContent>
    </div>
  );
};

export default Transcriptomic;

import { useState } from 'react';
import intl from 'react-intl-universal';
import Empty from '@ferlab/ui/core/components/Empty';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Divider, Select, Space, Typography } from 'antd';
import TranscriptomicDataset from 'views/Analytics/Transcriptomic/Dataset';
import TranscriptomicFooter from 'views/Analytics/Transcriptomic/Footer';
import Heatmaps from 'views/Analytics/Transcriptomic/Heatmaps';
import TranscriptomicSearchByGene from 'views/Analytics/Transcriptomic/SearchByGene';
import TranscriptomicSearchBySample from 'views/Analytics/Transcriptomic/SearchBySample';
import { SCROLL_WRAPPER_ID } from 'views/DataExploration/utils/constant';

import {
  TTranscriptomicsDatum,
  TTranscriptomicsSwarmPlotData,
} from 'services/api/transcriptomics/models';
import { useTranscriptomicsDiffGeneExp, useTranscriptomicsSampleGeneExp } from 'store/analytics';

import ScatterPlot from './ScatterPlot';
import SideBar, { TTranscriptomicSideBarItem } from './SideBar';
import SwarmPlot from './SwarmPlot';

import styles from './index.module.css';

const { Title } = Typography;

const menuItems: () => TTranscriptomicSideBarItem[] = () => [
  {
    key: '1',
    title: intl.get('screen.analytics.transcriptomic.sidebar.statisticalTest'),
    content: (
      <Select value="linear_regression_model" className={styles.sidebarSelect}>
        <Select.Option value="linear_regression_model">
          {intl.get('screen.analytics.transcriptomic.sidebar.deseq2')}
        </Select.Option>
      </Select>
    ),
  },
  {
    key: '2',
    title: intl.get('screen.analytics.transcriptomic.sidebar.statisticalCorrection'),
    content: (
      <Select value="bh_fdr" className={styles.sidebarSelect}>
        <Select.Option value="bh_fdr">
          {intl.get('screen.analytics.transcriptomic.sidebar.bhfdr')}
        </Select.Option>
      </Select>
    ),
  },
];

export const Transcriptomic = () => {
  const diffGeneExp = useTranscriptomicsDiffGeneExp();
  const [selectedGenes, setSelectedGenes] = useState<TTranscriptomicsDatum[]>([]);
  const [selectedSamples, setSelectedSamples] = useState<TTranscriptomicsSwarmPlotData[]>([]);
  const sampleGeneExp = useTranscriptomicsSampleGeneExp(selectedGenes[0]?.ensembl_gene_id ?? '');

  const handleSearchByGeneSelection = (genes: TTranscriptomicsDatum[]) => {
    setSelectedGenes(genes);
    setSelectedSamples([]);
  };

  const handleSearchBySampleSelection = (samples: TTranscriptomicsSwarmPlotData[]) => {
    setSelectedSamples(samples);
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
                selectedGenes={selectedGenes}
                sampleGeneExpData={sampleGeneExp.data?.data}
              />
            }
            content={
              <div>
                <div className={styles.header}>
                  <div className={styles.container}>
                    <TranscriptomicSearchByGene
                      options={diffGeneExp.data}
                      onSelectOptions={handleSearchByGeneSelection}
                      selectedGenes={selectedGenes}
                    />
                  </div>
                  <div className={styles.vDivider} />
                  <div className={styles.container}>
                    <TranscriptomicSearchBySample
                      options={sampleGeneExp.data}
                      onSelectOptions={handleSearchBySampleSelection}
                      selectedSamples={selectedSamples}
                      disabled={selectedGenes.length !== 1}
                    />
                  </div>
                </div>
                <Divider className={styles.hDivider} />
                <div className={styles.content}>
                  <div className={styles.chartContainer}>
                    <ScatterPlot
                      loading={diffGeneExp.loading}
                      data={diffGeneExp.data}
                      handleGenesSelection={setSelectedGenes}
                      selectedGenes={selectedGenes}
                    />
                  </div>
                  <div className={styles.vDivider} />
                  <div className={styles.chartContainer}>
                    {selectedGenes.length === 0 && (
                      <Empty
                        size="large"
                        imageType="grid"
                        description={intl.get('screen.analytics.transcriptomic.empty')}
                      />
                    )}
                    {selectedGenes.length === 1 && (
                      <SwarmPlot
                        selectedGene={selectedGenes[0]}
                        selectedSamples={selectedSamples}
                        handleSampleSelection={handleSearchBySampleSelection}
                        loading={sampleGeneExp.loading}
                        sampleGeneExp={sampleGeneExp.data}
                      />
                    )}
                    {selectedGenes.length > 1 && <Heatmaps selectedGenes={selectedGenes} />}
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

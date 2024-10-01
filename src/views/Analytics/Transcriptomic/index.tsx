import React, { useState } from 'react';
import intl from 'react-intl-universal';
import { useSelector } from 'react-redux';
import Empty from '@ferlab/ui/core/components/Empty';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Divider, Select, Space, Typography } from 'antd';
import TranscriptomicDataset from 'views/Analytics/Transcriptomic/Dataset';
import TranscriptomicFooter from 'views/Analytics/Transcriptomic/Footer';
import TranscriptomicSearchByGene from 'views/Analytics/Transcriptomic/SearchByGene';
import TranscriptomicSearchBySample from 'views/Analytics/Transcriptomic/SearchBySample';
import { SCROLL_WRAPPER_ID } from 'views/DataExploration/utils/constant';

import { useTranscriptomicsDiffGeneExp } from 'store/analytics';

import { transcriptomicsSampleGeneExpSelector } from '../../../store/analytics/selector';

import ScatterPlotly from './ScatterPlotly';
import SideBar, { TTranscriptomicSideBarItem } from './SideBar';
import SwarmPlotly from './SwarmPlotly';

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
          {intl.get('screen.analytics.transcriptomic.sidebar.linearProgression')}
        </Select.Option>
      </Select>
    ),
  },
];

export const Transcriptomic = () => {
  const diffGeneExp = useTranscriptomicsDiffGeneExp();
  const sampleGeneExp = useSelector(transcriptomicsSampleGeneExpSelector);
  const [selectedGeneIds, setSelectedGeneIds] = useState<string[]>([]);
  const [selectedSampleIds, setSelectedSampleIds] = useState<string[]>([]);

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
                    <ScatterPlotly //TODO ref: TranscriptomicsScatterPlot
                      loading={diffGeneExp.loading}
                      data={diffGeneExp.data ?? []}
                      selectGeneIdsCb={setSelectedGeneIds}
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
                      <SwarmPlotly //TODO ref: TranscriptomicsSwarmPlot
                        diffGeneExpId={selectedGeneIds[0]}
                        sampleIds={selectedSampleIds}
                        setSampleIdsCb={setSelectedSampleIds}
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

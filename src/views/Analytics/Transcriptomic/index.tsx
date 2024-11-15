import { useState } from 'react';
import intl from 'react-intl-universal';
import Empty from '@ferlab/ui/core/components/Empty';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Divider, Select, Space, Tag, Typography } from 'antd';
import cx from 'classnames';
import TranscriptomicDataset from 'views/Analytics/Transcriptomic/Dataset';
import TranscriptomicFooter from 'views/Analytics/Transcriptomic/Footer';
import Heatmaps from 'views/Analytics/Transcriptomic/Heatmaps';
import TranscriptomicSearchByGene, { TFDRValue } from 'views/Analytics/Transcriptomic/SearchByGene';
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

const chromosomesIndex = new Array(21).fill(0);

type TMenuItems = {
  handleChromosomes: (value: string[]) => void;
};

const menuItems = ({ handleChromosomes }: TMenuItems): TTranscriptomicSideBarItem[] => [
  {
    key: '0',
    title: intl.get('screen.analytics.transcriptomic.sidebar.statisticalParameters'),
  },
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
  {
    key: '3',
    title: intl.get('screen.analytics.transcriptomic.sidebar.location'),
  },
  {
    key: '4',
    title: intl.get('screen.analytics.transcriptomic.sidebar.chromosome'),
    content: (
      <Select
        mode="multiple"
        allowClear
        className={styles.sidebarSelect}
        onChange={(value) => handleChromosomes(value)}
        tagRender={({ onClose, label }) => (
          <Tag className={styles.tag} closable onClose={onClose} style={{ marginRight: 3 }}>
            {label}
          </Tag>
        )}
        notFoundContent={
          <Empty
            size="mini"
            showImage={false}
            description={intl.get('screen.analytics.transcriptomic.filter.genes.emptyText')}
          />
        }
      >
        {chromosomesIndex.map((_, index) => (
          <Select.Option value={`chr${index + 1}`}>{`chr${index + 1}`}</Select.Option>
        ))}
        <Select.Option value={`chrX`}>{`chrX`}</Select.Option>
        <Select.Option value={`chrY`}>{`chrY`}</Select.Option>
      </Select>
    ),
  },
];

export const Transcriptomic = () => {
  const diffGeneExp = useTranscriptomicsDiffGeneExp();
  const [isHeaderGeneFilterToggled, setIsHeaderGeneFilterToggled] = useState<boolean>(false);
  const [isHeaderSampleFilterToggled, setIsHeaderSampleFilterToggled] = useState<boolean>(false);
  const [selectedGenes, setSelectedGenes] = useState<TTranscriptomicsDatum[]>([]);
  const [selectedSamples, setSelectedSamples] = useState<TTranscriptomicsSwarmPlotData[]>([]);
  const [filteredSamples, setFilteredSamples] = useState<TTranscriptomicsSwarmPlotData[]>([]);
  const [chromosomes, setChromosomes] = useState<string[]>([]);
  const sampleGeneExp = useTranscriptomicsSampleGeneExp(selectedGenes[0]?.ensembl_gene_id ?? '');
  const [fdrThresholdFilter, setFdrThresholdFilter] = useState<TFDRValue | undefined>(undefined);
  const [fpkm, setFpkm] = useState<number[]>([]);
  const [ages, setAges] = useState<number[]>([]);
  const [sex, setSex] = useState<string[]>([]);

  const handleSearchByGeneSelection = (genes: TTranscriptomicsDatum[]) => {
    setSelectedGenes(genes);
    setSelectedSamples([]);
  };

  const handleSearchBySampleSelection = (samples: TTranscriptomicsSwarmPlotData[]) => {
    setSelectedSamples(samples);
  };
  const handleFilteredSamples = (samples: TTranscriptomicsSwarmPlotData[]) => {
    setFilteredSamples(samples);
  };

  return (
    <div className={styles.transcriptomicPage}>
      <SideBar
        className={styles.sideMenu}
        menuItems={menuItems({ handleChromosomes: setChromosomes })}
      />
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
                selectedSamples={selectedSamples}
                filteredSamples={filteredSamples}
              />
            }
            content={
              <div>
                <div className={styles.header}>
                  <div className={styles.container}>
                    <TranscriptomicSearchByGene
                      handleFdrThreshold={setFdrThresholdFilter}
                      options={diffGeneExp.data}
                      onSelectOptions={handleSearchByGeneSelection}
                      selectedGenes={selectedGenes}
                      onToggle={(isToggled) => {
                        setIsHeaderGeneFilterToggled(isToggled);
                      }}
                    />
                  </div>
                  <div
                    className={cx(styles.vDivider, styles.containerDivider, {
                      [styles.toggled]: isHeaderGeneFilterToggled || isHeaderSampleFilterToggled,
                    })}
                  />
                  <div className={styles.container}>
                    <TranscriptomicSearchBySample
                      handleFPKM={setFpkm}
                      handleAges={setAges}
                      handleSex={setSex}
                      selectedGene={selectedGenes[0]}
                      options={sampleGeneExp.data}
                      onSelectOptions={handleSearchBySampleSelection}
                      selectedSamples={selectedSamples}
                      disabled={selectedGenes.length !== 1}
                      onToggle={(isToggled) => {
                        setIsHeaderSampleFilterToggled(isToggled);
                      }}
                    />
                  </div>
                </div>
                <Divider className={styles.hDivider} />
                <div className={styles.content}>
                  <div className={styles.chartContainer}>
                    <ScatterPlot
                      fdrThreshold={fdrThresholdFilter}
                      loading={diffGeneExp.loading}
                      data={diffGeneExp.data}
                      handleGenesSelection={handleSearchByGeneSelection}
                      selectedGenes={selectedGenes}
                      chromosomes={chromosomes}
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
                        fpkm={fpkm}
                        ages={ages}
                        sex={sex}
                        selectedGene={selectedGenes[0]}
                        selectedSamples={selectedSamples}
                        handleSampleSelection={handleSearchBySampleSelection}
                        handleFilteredSamples={handleFilteredSamples}
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

import { useState } from 'react';
import intl from 'react-intl-universal';
import { useSelector } from 'react-redux';
import { ScatterPlotNodeData } from '@ferlab/ui/core/components/Charts/ScatterPlot/type';
import Empty from '@ferlab/ui/core/components/Empty';
import SidebarMenu, { ISidebarMenuItem } from '@ferlab/ui/core/components/SidebarMenu';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Divider, Space, Typography } from 'antd';
import TranscriptomicDataset from 'views/Analytics/Transcriptomic/Dataset';
import TranscriptomicsScatterPlotCanvas from 'views/Analytics/Transcriptomic/ScatterPlotCanvas';
import TranscriptomicSearchByGene from 'views/Analytics/Transcriptomic/SearchByGene';
import TranscriptomicSearchBySample from 'views/Analytics/Transcriptomic/SearchBySample';
import TranscriptomicsSwarmPlot from 'views/Analytics/Transcriptomic/SwarmPlot';
import { SCROLL_WRAPPER_ID } from 'views/DataExploration/utils/constant';

import { TTranscriptomicsDatum } from 'services/api/transcriptomics/models';
import { useTranscriptomicsDiffGeneExp } from 'store/analytics';

import { transcriptomicsSampleGeneExpSelector } from '../../../store/analytics/selector';

import styles from './index.module.css';

const { Title } = Typography;

export type TNode = ScatterPlotNodeData<TTranscriptomicsDatum>;

// TODO: will be used for the dynamic layer system

// enum Layers {
//   interactive,
//   select,
// }

const menuItems: ISidebarMenuItem[] = [];

export const Transcriptomic = () => {
  // const facets = useTranscriptomicsFacets();
  const diffGeneExp = useTranscriptomicsDiffGeneExp();
  const sampleGeneExp = useSelector(transcriptomicsSampleGeneExpSelector);
  const [selectedNodes, setSelectedNodes] = useState<TNode[]>([]);
  const [selectedGeneIds, setSelectedGeneIds] = useState<string[]>([]);
  const [selectedSampleIds, setSelectedSampleIds] = useState<string[]>([]);

  // TODO: add activeLayer={activeLayer} to ScatterPlotCanvasChart, will be used for selectboxlayer
  // const [activeLayer, setActiveLayer] = useState<Layers>(Layers.interactive);

  return (
    <div className={styles.transcriptomicPage}>
      <SidebarMenu ghost className={styles.sideMenu} menuItems={menuItems} />
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
                    <TranscriptomicsScatterPlotCanvas
                      selectedNodes={selectedNodes}
                      setSelectedNodes={setSelectedNodes}
                      data={diffGeneExp.data}
                      loading={diffGeneExp.loading}
                    />
                  </div>
                  <div className={styles.vDivider} />
                  <div className={styles.chartContainer}>
                    {selectedNodes.length !== 1 ? (
                      <Empty />
                    ) : (
                      <TranscriptomicsSwarmPlot diffGeneExp={selectedNodes[0]} />
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

import { useState } from 'react';
import intl from 'react-intl-universal';
import SwarmPlotChart from '@ferlab/ui/core/components/Charts/SwarmPlot';
import SwarmPlotLimitLineSvgLayer from '@ferlab/ui/core/components/Charts/SwarmPlot/Layers/LimitLineSvgLayer';
import SwarmPlotMedianBoxSvgLayer from '@ferlab/ui/core/components/Charts/SwarmPlot/Layers/MedianBoxSvgLayer';
import { ComputedDatum, SwarmRawDatum } from '@ferlab/ui/core/components/Charts/SwarmPlot/type';
import { Typography } from 'antd';
import { TNode } from 'views/Analytics/Transcriptomic';

import { useTranscriptomicsSampleGeneExp } from 'store/analytics';

import styles from './index.module.css';

const { Title } = Typography;

export type TTranscriptomicsSwarmPlot = {
  diffGeneExp: TNode;
};

export type TranscriptomicsSwarmRawDatum = SwarmRawDatum & {
  group: string;
  sample_id: string;
};

const TranscriptomicsSwarmPlot = ({ diffGeneExp }: TTranscriptomicsSwarmPlot) => {
  const sampleGeneExp = useTranscriptomicsSampleGeneExp(diffGeneExp.id);
  const [selectedNode, setSelectedNode] = useState<ComputedDatum<TranscriptomicsSwarmRawDatum>>();
  const t21GroupName = `T21 (${sampleGeneExp.data?.nT21})`;
  const controlGroupName = `Control (${sampleGeneExp.data?.nControl})`;
  const groups = [t21GroupName, controlGroupName];

  const t21Group: TranscriptomicsSwarmRawDatum[] = [];
  const controlGroup: TranscriptomicsSwarmRawDatum[] = [];
  const data = sampleGeneExp?.data?.data ?? [];

  // To keep color scheme, data must be added by groups t21 and after control
  data.forEach((node) => {
    if (node.x == 1) {
      t21Group.push({
        ...node,
        id: node.sample_id,
        group: t21GroupName,
      });
      return;
    }
    controlGroup.push({
      ...node,
      id: node.sample_id,
      group: controlGroupName,
    });
  });

  return (
    <SwarmPlotChart
      title={
        <Title level={4}>
          {intl.get('screen.analytics.transcriptomic.swarmPlot.title')}
          <span className={styles.geneSymbol}>{diffGeneExp.data.gene_symbol}</span>
        </Title>
      }
      selectedNode={selectedNode}
      loading={sampleGeneExp.loading}
      data={[...t21Group, ...controlGroup]}
      groups={groups}
      spacing={4}
      enableGridY={true}
      colors={['#92a7c3', '#0284c7']}
      colorBy={'group'}
      layers={[
        'grid',
        'axes',
        ({ nodes }) => (
          <SwarmPlotLimitLineSvgLayer
            nodes={nodes}
            active={data.length > 0}
            groups={groups}
            theme={{
              [groups[0]]: {
                line: styles.limitLineT21,
              },
              [groups[1]]: {
                line: styles.limitLineControl,
              },
            }}
          />
        ),
        ({ nodes }) => (
          <SwarmPlotMedianBoxSvgLayer
            nodes={nodes}
            active={data.length > 0}
            groups={groups}
            theme={{
              [groups[0]]: {
                rect: styles.medianBoxT21,
                line: styles.medianBoxT21,
              },
              [groups[1]]: {
                rect: styles.medianBoxControl,
                line: styles.medianBoxControl,
              },
            }}
          />
        ),
        'circles',
        'annotations',
        'mesh',
      ]}
      value={'y'}
      size={9}
      margin={{ bottom: 64, left: 48, right: 0, top: 48 }}
      onClick={(node: ComputedDatum<SwarmRawDatum>) => {
        setSelectedNode(node as ComputedDatum<TranscriptomicsSwarmRawDatum>);
      }}
      axisTop={null}
      annotations={[
        {
          type: 'circle',
          match: {
            index: selectedNode?.index ?? -1,
          },
          noteX: 30,
          noteY: -30,
          offset: 4,
          note: `${selectedNode?.data?.sample_id ?? -1}`,
        },
      ]}
      controls={{
        zoom: {
          step: 1.0,
          max: 4.0,
        },
      }}
    />
  );
};

export default TranscriptomicsSwarmPlot;

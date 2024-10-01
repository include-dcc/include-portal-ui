import { useEffect, useMemo } from 'react';
import intl from 'react-intl-universal';
import { useSelector } from 'react-redux';
import BasicDescription from '@ferlab/ui/core/components/BasicDescription';
import SwarmPlotChart from '@ferlab/ui/core/components/Charts/SwarmPlot';
import SwarmPlotBoxPlotSvgLayer from '@ferlab/ui/core/components/Charts/SwarmPlot/Layers/MedianBoxSvgLayer';
import { ComputedDatum, SwarmRawDatum } from '@ferlab/ui/core/components/Charts/SwarmPlot/type';
import { Typography } from 'antd';

import { TTranscriptomicsDiffGeneExp } from 'services/api/transcriptomics/models';
import { useTranscriptomicsSampleGeneExp } from 'store/analytics';
import { transcriptomicsDiffGeneExpSelector } from 'store/analytics/selector';

import styles from './index.module.css';

const { Title } = Typography;
const CIRCLE_RADIUS = 9;

export type TTranscriptomicsSwarmPlot = {
  diffGeneExpId: string;
  sampleIds: string[];
  setSampleIdsCb: (sampleIds: string[]) => void;
};

export type TranscriptomicsSwarmRawDatum = SwarmRawDatum & {
  group: string;
  sample_id: string;
  isSelected: boolean;
};

const getGeneSymbol = (diffGenes: TTranscriptomicsDiffGeneExp[], id: string) => {
  let result = '';
  diffGenes.forEach((diffGene) => {
    diffGene.data.forEach((gene) => {
      if (gene.ensembl_gene_id == id) {
        result = gene.gene_symbol;
        return;
      }
    });
  });

  return result;
};

const TranscriptomicsSwarmPlot = ({
  diffGeneExpId,
  setSampleIdsCb,
  sampleIds,
}: TTranscriptomicsSwarmPlot) => {
  const diffGeneExp = useSelector(transcriptomicsDiffGeneExpSelector);
  const sampleGeneExp = useTranscriptomicsSampleGeneExp(diffGeneExpId);
  const t21GroupName = `T21 (${sampleGeneExp.data?.nT21})`;
  const controlGroupName = `Control (${sampleGeneExp.data?.nControl})`;
  const groups = [t21GroupName, controlGroupName];
  const geneSymbol = useMemo(
    () => getGeneSymbol(diffGeneExp.data ?? [], diffGeneExpId),
    [diffGeneExp.data, diffGeneExpId],
  );

  const t21Group: TranscriptomicsSwarmRawDatum[] = [];
  const controlGroup: TranscriptomicsSwarmRawDatum[] = [];
  const data = sampleGeneExp?.data?.data ?? [];

  // To keep color scheme, data must be added by groups t21 and after control
  data.forEach((node) => {
    if (node.x == 1) {
      t21Group.push({
        ...node,
        id: `t21-${node.sample_id}${Math.random()}`,
        group: t21GroupName,
        isSelected: node.sample_id == sampleIds[0],
      });
      return;
    }
    controlGroup.push({
      ...node,
      id: `control-${node.sample_id}${Math.random()}`,
      group: controlGroupName,
      isSelected: node.sample_id == sampleIds[0],
    });
  });

  const groupedData = [...t21Group, ...controlGroup];

  useEffect(() => {
    setSampleIdsCb([]);
  }, [diffGeneExpId, setSampleIdsCb]);

  return (
    <SwarmPlotChart
      title={
        <Title level={4} className={styles.title}>
          {intl.get('screen.analytics.transcriptomic.swarmPlot.title')}
          <span className={styles.geneSymbol}>{geneSymbol}</span>
        </Title>
      }
      loading={sampleGeneExp.loading}
      data={groupedData}
      groups={groups}
      spacing={8}
      enableGridY={true}
      enableGridX={false}
      colors={['#0284c7', '#92a7c3']}
      colorBy={'group'}
      layers={[
        'grid',
        'axes',
        ({ nodes }) => (
          <SwarmPlotBoxPlotSvgLayer
            nodes={nodes}
            active={data.length > 0 && data.length === nodes.length}
            groups={groups}
            theme={{
              [groups[0]]: {
                rect: styles.medianBoxT21,
                median: styles.medianBoxT21,
                limit: styles.limitLineT21,
              },
              [groups[1]]: {
                rect: styles.medianBoxControl,
                median: styles.medianBoxControl,
                limit: styles.limitLineControl,
              },
            }}
          />
        ),
        'circles',
        'annotations',
        'mesh',
      ]}
      value={'y'}
      size={CIRCLE_RADIUS}
      margin={{ bottom: 32, left: 48, right: 0, top: 0 }}
      onClick={(node: ComputedDatum<SwarmRawDatum>) => {
        const sample = node as ComputedDatum<TranscriptomicsSwarmRawDatum>;
        if (sample.data.sample_id === sampleIds[0]) {
          setSampleIdsCb([]);
          return;
        }
        setSampleIdsCb([sample.data.sample_id]);
      }}
      axisTop={null}
      tooltip={(props) => {
        const tooltipValue = props as ComputedDatum<TranscriptomicsSwarmRawDatum>;
        return (
          <div>
            <BasicDescription
              label={intl.get('screen.analytics.transcriptomic.swarmPlot.sample_id')}
              text={tooltipValue.data.sample_id}
            />
            <BasicDescription
              label={intl.get('screen.analytics.transcriptomic.swarmPlot.fpkm')}
              text={`${tooltipValue.data.y.toFixed(2)}`}
            />
          </div>
        );
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'FPKM',
        legendPosition: 'middle',
        legendOffset: -32,
      }}
      annotations={[
        {
          type: 'circle',
          match: {
            data: {
              sample_id: sampleIds[0] ?? -1,
            },
          },
          noteX: 30,
          noteY: -30,
          offset: 4,
          note: `${sampleIds[0] ?? -1}`,
        },
      ]}
    />
  );
};

export default TranscriptomicsSwarmPlot;

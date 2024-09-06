import { useState } from 'react';
import ScatterPlot, {
  ScatterPlotDatum,
  ScatterPlotNodeData,
} from '@ferlab/ui/core/components/Charts/ScatterPlot';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Space } from 'antd';
import { SCROLL_WRAPPER_ID } from 'views/DataExploration/utils/constant';

import { TTranscriptomicsDatum } from 'services/api/transcriptomics/models';
import { useTranscriptomicsDiffGeneExp, useTranscriptomicsFacets } from 'store/analytics';

import styles from './index.module.css';

export const Transcriptomic = () => {
  const facets = useTranscriptomicsFacets();
  const diffGeneExp = useTranscriptomicsDiffGeneExp();
  console.log('facets', facets); //TODO: to remove
  console.log('diffGeneExp', diffGeneExp.data); //TODO: to remove
  const [selectedNodes, setSelectedNodes] = useState<ScatterPlotNodeData<ScatterPlotDatum>[]>([]);
  return (
    <div className={styles.transcriptomic}>
      <ScrollContent id={SCROLL_WRAPPER_ID} className={styles.scrollContent}>
        <Space direction="vertical" size={16} className={styles.pageContent}>
          <GridCard
            loading={diffGeneExp.loading}
            content={
              <div>
                <ScatterPlot
                  data={diffGeneExp.data ?? []}
                  height={400}
                  width={400}
                  layers={['grid', 'axes', 'nodes', 'markers', 'mesh', 'legends', 'annotations']}
                  nodeId={(d) => `${(d.data as TTranscriptomicsDatum).gene_symbol}`}
                  onBoxSelectNodes={(nodes) => {
                    setSelectedNodes(nodes);
                  }}
                  onClick={(node) => {
                    setSelectedNodes([node]);
                  }}
                  theme={{
                    annotations: {
                      symbol: {
                        color: '#d63031',
                        fill: '#d63031',
                      },
                    },
                  }}
                  tooltip={({ node: { id, xValue, yValue } }) => (
                    <div style={{ backgroundColor: '#ddd', padding: '8px' }}>
                      <div>Analyte: {id}</div>
                      <div>Fold Change {xValue as number}</div>
                      <div>q-value {yValue as number}</div>
                      <div>
                        {xValue as number} {yValue as number}
                      </div>
                    </div>
                  )}
                  xFormat=">.2f"
                  yFormat=">.2f"
                  legends={[
                    {
                      anchor: 'bottom',
                      direction: 'row',
                      effects: [
                        {
                          on: 'hover',
                          style: {
                            itemOpacity: 1,
                          },
                        },
                      ],
                      itemDirection: 'left-to-right',
                      itemHeight: 12,
                      itemsSpacing: 8,
                      itemWidth: 100,
                      justify: false,
                      symbolShape: 'circle',
                      symbolSize: 12,
                      translateX: 0,
                      translateY: 64,
                    },
                  ]}
                />
              </div>
            }
          />
        </Space>
      </ScrollContent>
    </div>
  );
};

export default Transcriptomic;

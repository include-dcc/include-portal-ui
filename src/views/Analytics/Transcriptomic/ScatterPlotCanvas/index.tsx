import intl from 'react-intl-universal';
import { CameraOutlined } from '@ant-design/icons';
import ScatterPlotCanvasChart from '@ferlab/ui/core/components/Charts/ScatterPlot/Canvas';
import MarkerCanvasLayer from '@ferlab/ui/core/components/Charts/ScatterPlot/Canvas/Layers/MarkerCanvasLayer';
import { Button, Typography } from 'antd';
import { TNode } from 'views/Analytics/Transcriptomic';

import {
  TTranscriptomicsDatum,
  TTranscriptomicsDiffGeneExp,
} from 'services/api/transcriptomics/models';

const { Title } = Typography;

type TTranscriptomicsScatterPlotCanvas = {
  loading: boolean;
  data?: TTranscriptomicsDiffGeneExp[];
  selectedNodes: TNode[];
  setSelectedNodes: (nodes: TNode[]) => void;
};

export const TranscriptomicsScatterPlotCanvas = ({
  loading,
  data,
  selectedNodes,
  setSelectedNodes,
}: TTranscriptomicsScatterPlotCanvas) => (
  <ScatterPlotCanvasChart
    loading={loading}
    title={<Title level={4}>{intl.get('screen.analytics.transcriptomic.scatterPlot.title')}</Title>}
    enableGridX={false}
    enableGridY={false}
    controls={{
      zoom: {
        max: 10.0,
        step: 1.0,
      },
    }}
    extraControls={[
      <Button
        type="text"
        icon={<CameraOutlined />}
        onClick={() => {
          // TODO: Add download svg feature
        }}
      />,
    ]}
    data={data ?? []}
    layers={[
      'grid',
      'axes',
      'nodes',
      'mesh',
      'legends',
      'annotations',
      (ctx) => {
        MarkerCanvasLayer({
          ctx,
          markedNode: selectedNodes[0],
          highlightColor: '#1c3863',
          sizeMultiplier: 1.5,
        });
      },
    ]}
    nodeId={(d) => `${(d.data as TTranscriptomicsDatum).ensembl_gene_id}`}
    onClick={(node) => {
      setSelectedNodes([node as TNode]);
    }}
    colors={['#6697ea', '#bebebe', '#b02428']}
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
);

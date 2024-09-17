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

const TranscriptomicsScatterPlotCanvas = ({
  loading,
  data,
  selectedNodes,
  setSelectedNodes,
}: TTranscriptomicsScatterPlotCanvas) => (
  <ScatterPlotCanvasChart
    loading={loading}
    title={<Title level={4}>{intl.get('screen.analytics.transcriptomic.scatterPlot.title')}</Title>}
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
          text: selectedNodes[0]?.data?.gene_symbol ?? '',
          highlightColor: '#1c3863',
          sizeMultiplier: 1.1,
          font: '600 14px Serif',
        });
      },
    ]}
    nodeId={(d) => `${(d.data as TTranscriptomicsDatum).ensembl_gene_id}`}
    onClick={(node) => {
      setSelectedNodes([node as TNode]);
    }}
    colors={['#6697ea', '#bebebe', '#b02428']}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: '-log10(Pvalue)',
      legendPosition: 'middle',
      legendOffset: -48,
    }}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'logFC',
      legendPosition: 'middle',
      legendOffset: 48,
    }}
    margin={{ bottom: 64, left: 64, right: 128, top: 48 }}
    legends={[
      {
        anchor: 'right',
        direction: 'column',
        itemHeight: 12,
        itemsSpacing: 8,
        itemWidth: 100,
        justify: false,
        translateX: 120,
        translateY: 0,
        symbolShape: 'circle',
      },
    ]}
  />
);

export default TranscriptomicsScatterPlotCanvas;

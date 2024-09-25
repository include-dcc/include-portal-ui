import intl from 'react-intl-universal';
import { CameraOutlined } from '@ant-design/icons';
import BasicDescription from '@ferlab/ui/core/components/BasicDescription';
import ScatterPlotCanvasChart from '@ferlab/ui/core/components/Charts/ScatterPlot/Canvas';
import MarkerCanvasLayer from '@ferlab/ui/core/components/Charts/ScatterPlot/Canvas/Layers/MarkerCanvasLayer';
import {
  ScatterPlotDatum,
  ScatterPlotNodeData,
  ScatterPlotTooltipProps,
} from '@ferlab/ui/core/components/Charts/ScatterPlot/type';
import { Button, Typography } from 'antd';

import {
  TTranscriptomicsDatum,
  TTranscriptomicsDiffGeneExp,
} from 'services/api/transcriptomics/models';

import styles from './index.module.css';

const { Title } = Typography;

type TTranscriptomicsScatterPlotCanvas = {
  loading: boolean;
  data?: TTranscriptomicsDiffGeneExp[];
  selectedNodesId: string[];
  setSelectedNodesId: (ids: string[]) => void;
};

const formatPadj = (value: number): string => {
  const valueString = value.toString();
  const exponentIndex = valueString.indexOf('e');
  if (exponentIndex != -1) {
    const splitString = valueString.split('e-');
    return `${splitString[0]}e-${splitString[1].substring(0, 2)}`;
  }
  return value.toFixed(3);
};

const TranscriptomicsScatterPlotCanvas = ({
  loading,
  data,
  selectedNodesId = [],
  setSelectedNodesId,
}: TTranscriptomicsScatterPlotCanvas) => (
  <ScatterPlotCanvasChart
    loading={loading}
    title={
      <Title className={styles.title} level={4}>
        {intl.get('screen.analytics.transcriptomic.scatterPlot.title')}
      </Title>
    }
    controls={{
      zoom: {
        max: 30.0,
        step: 10.0,
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
    data={(data ?? []).map((d) => ({
      ...d,
      id: intl.get(`screen.analytics.transcriptomic.scatterPlot.${d.id}`),
    }))}
    layers={[
      'grid',
      'axes',
      'nodes',
      'mesh',
      'legends',
      'annotations',
      (ctx, props) => {
        MarkerCanvasLayer({
          props,
          ctx,
          selectedNodeId: selectedNodesId[0],
          text:
            (
              (props.nodes ?? []).find(
                (n) =>
                  (n as ScatterPlotNodeData<TTranscriptomicsDatum>).data.ensembl_gene_id ===
                  selectedNodesId[0],
              ) as ScatterPlotNodeData<TTranscriptomicsDatum>
            )?.data?.gene_symbol ?? '',
          highlightColor: '#1c3863',
          radius: 12,
          font: '600 14px Serif',
        });
      },
    ]}
    nodeId={(d) => `${(d.data as TTranscriptomicsDatum).ensembl_gene_id}`}
    onClick={(node) => {
      const existingNodeIndex = selectedNodesId.find((id) => id === node.id);
      if (existingNodeIndex) {
        setSelectedNodesId(selectedNodesId.filter((id) => id !== node.id));
        return;
      }

      setSelectedNodesId([
        (node as ScatterPlotNodeData<TTranscriptomicsDatum>).data.ensembl_gene_id,
      ]);
    }}
    colors={['#bebebe', '#b02428', '#6697ea']}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: '-log10 (q-value)',
      legendPosition: 'middle',
      legendOffset: -48,
    }}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'log2 (Fold change)',
      legendPosition: 'middle',
      legendOffset: 48,
    }}
    margin={{ bottom: 64, left: 64, right: 158, top: 12 }}
    legends={[
      {
        anchor: 'right',
        direction: 'column',
        itemHeight: 12,
        itemsSpacing: 8,
        itemWidth: 128,
        justify: false,
        translateX: 140,
        translateY: 0,
        symbolShape: 'circle',
      },
    ]}
    tooltip={(value: ScatterPlotTooltipProps<ScatterPlotDatum>): React.ReactNode => {
      const tooltipValue = value as ScatterPlotTooltipProps<TTranscriptomicsDatum>;
      return (
        <div className={styles.tooltipContent}>
          <BasicDescription
            label={intl.get('screen.analytics.transcriptomic.scatterPlot.gene_symbol')}
            text={tooltipValue.node.data.gene_symbol}
          />
          <BasicDescription
            label={intl.get('screen.analytics.transcriptomic.scatterPlot.ensembl_gene_id')}
            text={tooltipValue.node.data.ensembl_gene_id}
          />
          <BasicDescription
            label={intl.get('screen.analytics.transcriptomic.scatterPlot.fold_change')}
            text={`${tooltipValue.node.data.fold_change.toFixed(2)}`}
          />
          <BasicDescription
            label={intl.get('screen.analytics.transcriptomic.scatterPlot.qvalue')}
            text={`${formatPadj(tooltipValue.node.data.padj)}`}
          />
        </div>
      );
    }}
  />
);

export default TranscriptomicsScatterPlotCanvas;

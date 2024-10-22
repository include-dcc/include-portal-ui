import intl from 'react-intl-universal';
import Plot from 'react-plotly.js';
import ChartSkeleton from '@ferlab/ui/core/components/Charts/Skeleton';
import { Annotations, PlotData, PlotMouseEvent } from 'plotly.js';

import {
  ITranscriptomicsSampleGeneExp,
  TTranscriptomicsDatum,
  TTranscriptomicsSwarmPlotData,
} from 'services/api/transcriptomics/models';

import styles from './index.module.css';

export type TTranscriptomicsSwarmPlot = {
  selectedGene: TTranscriptomicsDatum;
  selectedSamples: TTranscriptomicsSwarmPlotData[];
  handleSampleSelection: (samples: TTranscriptomicsSwarmPlotData[]) => void;
  sampleGeneExp?: ITranscriptomicsSampleGeneExp;
  loading: boolean;
};

const SwarmPlotly = ({
  selectedGene: gene,
  handleSampleSelection,
  selectedSamples,
  sampleGeneExp,
  loading,
}: TTranscriptomicsSwarmPlot) => {
  const data = sampleGeneExp?.data ?? [];

  const plotGroups = [
    {
      group: data.filter((e) => e.x === 1),
      xValue: 1,
      color: '#0284c7',
      name: intl.get('screen.analytics.transcriptomic.swarmPlot.t21', {
        nT21: sampleGeneExp?.nT21,
      }),
    },
    {
      group: data.filter((e) => e.x !== 1),
      xValue: 2,
      color: '#92a7c3',
      name: intl.get('screen.analytics.transcriptomic.swarmPlot.control', {
        nControl: sampleGeneExp?.nControl,
      }),
    },
  ];

  const plotData: PlotData[] = plotGroups.map(({ group, color, name, xValue }) => ({
    y: group.map((e) => e.y),
    x: Array(group.length).fill(xValue),
    boxpoints: 'all',
    name: name,
    jitter: 1,
    pointpos: 0,
    type: 'box',
    marker: {
      color,
      size: 7,
      line: {
        color: 'white',
        width: 0.5,
      },
    },
    hoverlabel: {
      namelength: 0,
    },
    hovertemplate:
      `${intl.get(
        'screen.analytics.transcriptomic.swarmPlot.sample_id',
      )}: %{customdata.sample_id} <br>` +
      `${intl.get('screen.analytics.transcriptomic.swarmPlot.fpkm')}: %{y:.2f}`,
    customdata: group.map((e) => e),
  })) as unknown as PlotData[];

  const annotations: Partial<Annotations>[] = data
    .filter((sample) => selectedSamples.includes(sample))
    .map((sample) => {
      const xValue = sample.x === 1 ? 1 : 2;
      return {
        x: xValue,
        y: sample.y,
        arrowhead: 6,
        ax: 100,
        ay: 0,
        bgcolor: 'rgba(255, 255, 255, 0.9)',
        font: { size: 12 },
        bordercolor: 'black',
        borderwidth: 1,
        text: `${sample.sample_id}: ${sample.y.toFixed(2)} ${intl.get(
          'screen.analytics.transcriptomic.swarmPlot.fpkm',
        )}`,
      };
    });

  if (loading) {
    return <ChartSkeleton />;
  }

  const handlePlotClick = (data: Readonly<PlotMouseEvent>) => {
    const target = data.points.map(
      (p) => p.customdata,
    )[0] as unknown as TTranscriptomicsSwarmPlotData;
    if (selectedSamples.includes(target)) {
      handleSampleSelection([]);
      return;
    }
    handleSampleSelection([target]);
  };

  return (
    <Plot
      className={styles.swarmPlot}
      data={plotData}
      layout={{
        annotations,
        autosize: true,
        title: {
          text: intl.get('screen.analytics.transcriptomic.swarmPlot.title', {
            symbol: gene.gene_symbol,
          }),
          x: 0.05,
          font: {
            size: 16,
            weight: 600,
          },
        },
        margin: { l: 40, r: 10, t: 60, b: 40 },
        legend: {
          borderwidth: 1,
          yanchor: 'top',
          y: 0.99,
          xanchor: 'right',
          x: 0.99,
        },
        yaxis: {
          title: intl.get('screen.analytics.transcriptomic.swarmPlot.fpkm'),
        },
        xaxis: {
          tickvals: [1, 2],
          ticktext: [
            intl.get('screen.analytics.transcriptomic.swarmPlot.t21', {
              nT21: sampleGeneExp?.nT21,
            }),
            intl.get('screen.analytics.transcriptomic.swarmPlot.control', {
              nControl: sampleGeneExp?.nControl,
            }),
          ],
        },
      }}
      useResizeHandler
      config={{
        modeBarButtonsToRemove: [
          'toImage',
          'resetGeo',
          'lasso2d',
          'sendDataToCloud',
          'zoomIn2d',
          'zoomOut2d',
          'pan2d',
          'select2d',
        ],
        displaylogo: false,
      }}
      onClick={handlePlotClick}
    />
  );
};

export default SwarmPlotly;

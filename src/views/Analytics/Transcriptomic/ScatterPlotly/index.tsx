import React from 'react';
import intl from 'react-intl-universal';
import Plot from 'react-plotly.js';
import ChartSkeleton from '@ferlab/ui/core/components/Charts/Skeleton/index';

import { TTranscriptomicsDiffGeneExp } from 'services/api/transcriptomics/models';

type TTranscriptomicsScatterPlotCanvas = {
  loading: boolean;
  data?: TTranscriptomicsDiffGeneExp[];
  selectGeneIdsCb: (value: React.SetStateAction<string[]>) => void;
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

const ScatterPlotly = ({
  loading,
  data,
  selectGeneIdsCb = () => [],
}: TTranscriptomicsScatterPlotCanvas) => {
  if (loading) {
    return <ChartSkeleton />;
  }

  return (
    <Plot
      data={data!.map((group, index) => {
        const markerColours = ['#bebebe', '#b02428', '#6697ea'];
        return {
          x: group.data.map((e) => e.x) || [],
          y: group.data.map((e) => e.y) || [],
          type: 'scatter',
          mode: 'markers',
          marker: { color: markerColours[index] },
          name: intl.get(`screen.analytics.transcriptomic.scatterPlot.${group.id}`),
          text: group.data.map((e) =>
            [
              `${intl.get('screen.analytics.transcriptomic.scatterPlot.gene_symbol')} ${
                e.gene_symbol
              } <br>`,
              `${intl.get('screen.analytics.transcriptomic.scatterPlot.ensembl_gene_id')} ${
                e.ensembl_gene_id
              } <br>`,
              `${intl.get(
                'screen.analytics.transcriptomic.scatterPlot.fold_change',
              )} ${e.fold_change.toFixed(2)} <br>`,
              `${intl.get('screen.analytics.transcriptomic.scatterPlot.qvalue')} ${formatPadj(
                e.padj,
              )}`,
            ].join(''),
          ),
          customdata: group.data.map((e) => e.ensembl_gene_id),
        };
      })}
      layout={{
        xaxis: { title: 'log2 (Fold change)' },
        yaxis: { title: '-log10 (q-value)' },
        title: {
          text: intl.get('screen.analytics.transcriptomic.scatterPlot.title'),
          x: 0.05,
          font: {
            size: 16,
            weight: 600,
          },
        },
        width: 680,
        height: 700,
      }}
      onClick={(data) => selectGeneIdsCb(data.points.map((p) => p.customdata) as string[])}
      config={{
        modeBarButtonsToRemove: ['toImage', 'resetGeo', 'lasso2d', 'sendDataToCloud'],
        displaylogo: false,
      }}
    />
  );
};

export default ScatterPlotly;

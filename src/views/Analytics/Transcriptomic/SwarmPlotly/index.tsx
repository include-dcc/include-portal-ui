import { useEffect } from 'react';
import intl from 'react-intl-universal';
import Plot from 'react-plotly.js';
import ChartSkeleton from '@ferlab/ui/core/components/Charts/Skeleton/index';

import { useTranscriptomicsSampleGeneExp } from 'store/analytics';

export type TTranscriptomicsSwarmPlot = {
  diffGeneExpId: string;
  sampleIds: string[];
  setSampleIdsCb: (sampleIds: string[]) => void;
};

const SwarmPlotly = ({ diffGeneExpId, setSampleIdsCb, sampleIds }: TTranscriptomicsSwarmPlot) => {
  const sampleGeneExp = useTranscriptomicsSampleGeneExp(diffGeneExpId);
  const data = sampleGeneExp?.data?.data ?? [];

  useEffect(() => {
    setSampleIdsCb([]);
  }, [diffGeneExpId, setSampleIdsCb]);

  return sampleGeneExp.loading ? (
    <ChartSkeleton />
  ) : (
    <Plot
      data={[data.filter((e) => e.x === 1), data.filter((e) => e.x !== 1)].map((group, index) => {
        const markersColours = ['#0284c7', '#92a7c3'];
        const names = [
          `T21 (${sampleGeneExp.data?.nT21})`,
          `Control (${sampleGeneExp.data?.nControl})`,
        ];

        return {
          y: group.map((e) => e.y),
          boxpoints: 'all',
          name: names[index],
          type: 'box',
          marker: { color: markersColours[index] },
          text: group.map((e) =>
            [
              `${intl.get('screen.analytics.transcriptomic.swarmPlot.sample_id')} ${
                e.sample_id
              } <br>`,
              `${intl.get('screen.analytics.transcriptomic.swarmPlot.fpkm')} ${e.y.toFixed(2)}`,
            ].join(''),
          ),
          customdata: group.map((e) => e.sample_id),
        };
      })}
      layout={{
        width: 680,
        height: 700,
        title: {
          text: intl.get('screen.analytics.transcriptomic.swarmPlot.title'),
          x: 0.05,
          font: {
            size: 16,
            weight: 600,
          },
        },
        yaxis: {
          title: 'FPKM',
        },
      }}
      config={{
        modeBarButtonsToRemove: ['toImage', 'resetGeo', 'lasso2d', 'sendDataToCloud'],
        displaylogo: false,
      }}
      onClick={(data) => setSampleIdsCb(data.points.map((p) => p.customdata) as string[])}
    />
  );
};

export default SwarmPlotly;

import { useEffect, useMemo } from 'react';
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

type SwarmPlotData = PlotData & { customdata: TTranscriptomicsSwarmPlotData[] };

export type TTranscriptomicsSwarmPlot = {
  fpkm: number[];
  ages: number[];
  sex: string[];
  selectedGene: TTranscriptomicsDatum;
  selectedSamples: TTranscriptomicsSwarmPlotData[];
  handleSamplesSelection: (samples: TTranscriptomicsSwarmPlotData[]) => void;
  handleFilteredSamples: (samples: TTranscriptomicsSwarmPlotData[]) => void;
  sampleGeneExp?: ITranscriptomicsSampleGeneExp;
  loading: boolean;
};

const getIsFilterEnabled = (
  fpkm: number[],
  ages: number[],
  sex: string[],
  sampleGeneExp?: ITranscriptomicsSampleGeneExp,
) => {
  if (!sampleGeneExp) {
    return false;
  }

  const minFpkm = sampleGeneExp.min_fpkm_value;
  const maxFpkm = sampleGeneExp.max_fpkm_value;
  const minAges = sampleGeneExp.min_age_at_biospecimen_collection_years;
  const maxAges = sampleGeneExp.max_age_at_biospecimen_collection_years;

  if (fpkm[0] != minFpkm || fpkm[1] != maxFpkm) {
    return true;
  }

  if (ages[0] != minAges || ages[1] != maxAges) {
    return true;
  }

  if (sex.length > 0) {
    return true;
  }

  return false;
};

const getIsValidSamplesFunc =
  (fpkm: number[], ages: number[], sex: string[]) =>
  (e: TTranscriptomicsSwarmPlotData): boolean => {
    if (fpkm.length > 0 && (e.y < fpkm[0] || e.y > fpkm[1])) {
      return false;
    }

    if (
      ages.length > 0 &&
      (e.age_at_biospecimen_collection_years < ages[0] ||
        e.age_at_biospecimen_collection_years > ages[1])
    ) {
      return false;
    }

    if (sex.length > 0 && !sex.includes(e.sex)) {
      return false;
    }

    return true;
  };

const SwarmPlotly = ({
  selectedGene: gene,
  fpkm,
  ages,
  sex,
  handleSamplesSelection,
  handleFilteredSamples,
  selectedSamples,
  sampleGeneExp,
  loading,
}: TTranscriptomicsSwarmPlot) => {
  const memoizedData = useMemo<SwarmPlotData[]>(() => {
    const data = sampleGeneExp?.data ?? [];
    const isValidSampleFunc = getIsValidSamplesFunc(fpkm, ages, sex);
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

    return plotGroups.map(({ group, color, name, xValue }) => {
      const selectedpoints: number[] = [];
      group.forEach((e, index) => {
        if (isValidSampleFunc(e)) {
          selectedpoints.push(index);
        }
      });

      return {
        y: group.map((e) => e.y),
        x: Array(group.length).fill(xValue),
        boxpoints: 'all',
        name: name,
        jitter: 1,
        pointpos: 0,
        type: 'box',
        selectedpoints,
        selected: {
          markers: {
            color,
          },
        },
        unselected: {
          markers: {
            color,
            opacity: 0.1,
          },
        },
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
      };
    }) as unknown as SwarmPlotData[];
  }, [sampleGeneExp, fpkm, ages, sex]);

  const annotations: Partial<Annotations>[] = (sampleGeneExp?.data ?? [])
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

  useEffect(() => {
    if (!getIsFilterEnabled(fpkm, ages, sex, sampleGeneExp)) {
      handleFilteredSamples([]);
      return;
    }
    const filteredSamples: TTranscriptomicsSwarmPlotData[] = [];
    memoizedData.forEach((group) => {
      group.selectedpoints.forEach((index) => {
        filteredSamples.push(group.customdata[index as number]);
      });
    });

    handleFilteredSamples(filteredSamples);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fpkm, ages, sex]);

  if (loading) {
    return <ChartSkeleton />;
  }

  const handlePlotClick = (data: Readonly<PlotMouseEvent>) => {
    const target = data.points.map(
      (p) => p.customdata,
    )[0] as unknown as TTranscriptomicsSwarmPlotData;
    if (selectedSamples.includes(target)) {
      handleSamplesSelection([]);
      return;
    }
    handleSamplesSelection([target]);
  };

  const handleOnSelect = (event: Readonly<Plotly.PlotSelectionEvent>) => {
    const samples: TTranscriptomicsSwarmPlotData[] = [];
    event.points.forEach((point) => {
      if (point?.customdata) {
        samples.push(point.customdata as unknown as TTranscriptomicsSwarmPlotData);
      }
    });
    handleSamplesSelection(samples);
  };

  return (
    <Plot
      className={styles.swarmPlot}
      data={memoizedData}
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
          title: {
            text: intl.get('screen.analytics.transcriptomic.swarmPlot.fpkm'),
          },
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
        ],
        displaylogo: false,
      }}
      onClick={handlePlotClick}
      onSelecting={handleOnSelect}
    />
  );
};

export default SwarmPlotly;

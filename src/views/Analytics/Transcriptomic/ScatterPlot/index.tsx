import { useEffect, useMemo, useState } from 'react';
import intl from 'react-intl-universal';
import Plot from 'react-plotly.js';
import ChartSkeleton from '@ferlab/ui/core/components/Charts/Skeleton/index';
import { Annotations, PlotMouseEvent, ScatterData } from 'plotly.js';
import { TFDRValue } from 'views/Analytics/Transcriptomic/SearchByGene';
import { formatPadj } from 'views/Analytics/Transcriptomic/utils';

import {
  TTranscriptomicsDatum,
  TTranscriptomicsDiffGeneExp,
} from 'services/api/transcriptomics/models';

import styles from './index.module.css';

type TTranscriptomicsScatterPlotCanvas = {
  fdrThreshold?: TFDRValue;
  data?: TTranscriptomicsDiffGeneExp[];
  handleGenesSelection: (gene: TTranscriptomicsDatum[]) => void;
  selectedGenes: TTranscriptomicsDatum[];
  loading: boolean;
  chromosomes: string[];
};

const markerColours = ['#bebebe', '#b02428', '#6697ea'];

const getMarkerColorByFdrThreshold = (
  fdr?: TFDRValue,
): ((e: TTranscriptomicsDatum, index: number) => string) => {
  if (fdr === undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return (_, index: number) => markerColours[index];
  }

  return (e: TTranscriptomicsDatum, index: number) =>
    e.padj > fdr.value ? markerColours[0] : markerColours[index];
};

const filterMarkerOpacityBySelectedGenes = (selectedGenes: TTranscriptomicsDatum[]) => {
  const ensemblGeneIds = selectedGenes.map((gene) => gene.ensembl_gene_id);
  return (e: TTranscriptomicsDatum) => ensemblGeneIds.includes(e.ensembl_gene_id);
};

const filterMarkerOpacityByChromosomes = (chromosomes: string[]) => (e: TTranscriptomicsDatum) =>
  chromosomes.includes(e.chromosome);

const ScatterPlotly = ({
  fdrThreshold,
  data,
  handleGenesSelection,
  selectedGenes,
  loading,
  chromosomes,
}: TTranscriptomicsScatterPlotCanvas) => {
  const [annotations, setAnnotations] = useState<Partial<Annotations>[]>([]);
  const [plotKey, setPlotKey] = useState(0);
  const [isSelectionZoom, setIsSelectionZoom] = useState(false);
  const [layout, setLayout] = useState<any>({
    autosize: true,
    title: {
      text: intl.get('screen.analytics.transcriptomic.scatterPlot.title'),
      x: 0.05,
      font: { size: 16, weight: 600 },
    },
    margin: { l: 40, r: 10, t: 60, b: 40 },
    legend: {
      borderwidth: 1,
      yanchor: 'top',
      y: 0.99,
      xanchor: 'right',
      x: 0.99,
    },
    xaxis: {
      title: {
        text: intl.get('screen.analytics.transcriptomic.scatterPlot.xAxisTitle'),
        font: { size: 14 },
      },
      tickfont: { size: 12 },
    },
    yaxis: {
      title: {
        text: intl.get('screen.analytics.transcriptomic.scatterPlot.yAxisTitle'),
        font: { size: 14 },
      },
      tickfont: { size: 12 },
      automargin: true,
    },
  });
  const memoizedData = useMemo<ScatterData[]>(
    () =>
      data?.map((group, index) => {
        const fdrThresholdFunc = getMarkerColorByFdrThreshold(fdrThreshold);
        let filterSelectedGenes: TTranscriptomicsDatum[] = [];
        let filterChromosomes: TTranscriptomicsDatum[] = [];

        if (selectedGenes.length > 1) {
          filterSelectedGenes = group.data.filter(
            filterMarkerOpacityBySelectedGenes(selectedGenes),
          );
        }
        if (chromosomes.length > 0) {
          filterChromosomes = group.data.filter(filterMarkerOpacityByChromosomes(chromosomes));
        }

        const filterOpacity = (e: TTranscriptomicsDatum) =>
          filterSelectedGenes.includes(e) || filterChromosomes.includes(e) ? 1.0 : 0.4;

        return {
          x: group.data.map((e) => e.x) || [],
          y: group.data.map((e) => e.y) || [],
          type: 'scattergl',
          mode: 'markers',
          marker: {
            color: group.data.map((e) => fdrThresholdFunc(e, index)),
            opacity:
              selectedGenes.length > 1 || chromosomes.length > 0
                ? group.data.map(filterOpacity)
                : 1.0,
            size: 7,
            line: {
              color: 'white',
              width: 0.8,
            },
          },
          name: intl.get(`screen.analytics.transcriptomic.scatterPlot.${group.id}`, {
            threshold: fdrThreshold?.text ?? 'q ≤ 0.1',
          }),
          hoverlabel: {
            namelength: 0,
          },
          hovertemplate:
            `${intl.get(
              'screen.analytics.transcriptomic.scatterPlot.gene_symbol',
            )}: %{customdata.gene_symbol} <br>` +
            `${intl.get(
              'screen.analytics.transcriptomic.scatterPlot.ensembl_gene_id',
            )}: %{customdata.ensembl_gene_id} <br>` +
            `${intl.get(
              'screen.analytics.transcriptomic.scatterPlot.fold_change',
            )}: %{customdata.fold_change:.2f} <br>` +
            `${intl.get('screen.analytics.transcriptomic.scatterPlot.qvalue')}: %{text}`,
          customdata: group.data.map((e) => e),
          text: group.data.map((e) => formatPadj(e.padj)),
        } as unknown as ScatterData;
      }) || [],
    [data, fdrThreshold, selectedGenes, chromosomes],
  );

  useEffect(() => {
    if (selectedGenes.length === 1) {
      const newAnnotations: Partial<Annotations>[] = selectedGenes.map(
        (gene) =>
          ({
            x: gene.x,
            y: gene.y,
            arrowhead: 6,
            ax: 30,
            ay: -50,
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            font: { size: 12 },
            bordercolor: 'black',
            borderwidth: 2,
            borderpad: 4,
            text: gene.gene_symbol,
          } as Partial<Annotations>),
      );
      setAnnotations(newAnnotations);
      setPlotKey((prevKey) => prevKey + 1);
      return;
    }
    setAnnotations([]);
    setPlotKey(0);
  }, [selectedGenes]);

  if (loading) {
    return <ChartSkeleton />;
  }

  const handleClick = (data: Readonly<PlotMouseEvent>) => {
    const target = data.points[0].customdata as unknown as TTranscriptomicsDatum;
    if (selectedGenes.includes(target)) {
      handleGenesSelection([]);
      return;
    }

    handleGenesSelection([target]);
  };

  const handleRelayout = (eventData: any) => {
    setLayout((prevLayout: any) => {
      if (!isSelectionZoom && (eventData['xaxis.range[0]'] || eventData['yaxis.range[0]'])) {
        if (prevLayout.annotations.length > 0) {
          const firstAnnotation = prevLayout.annotations[0];
          const variationx = (eventData['xaxis.range[1]'] - eventData['xaxis.range[0]']) / 2;
          const variationy = (eventData['yaxis.range[1]'] - eventData['yaxis.range[0]']) / 2;
          setIsSelectionZoom(false);

          return {
            ...prevLayout,
            xaxis: {
              ...layout.xaxis,
              range: [firstAnnotation.x - variationx, firstAnnotation.x + variationx],
            },
            yaxis: {
              ...layout.yaxis,
              range: [firstAnnotation.y - variationy, firstAnnotation.y + variationy],
            },
            annotations,
          };
        }
      }

      setIsSelectionZoom(false);
      return {
        ...prevLayout,
        annotations,
      };
    });
  };

  const handleRelayouting = () => {
    setIsSelectionZoom(true);
  };

  const handleOnSelect = (event: Readonly<Plotly.PlotSelectionEvent>) => {
    const genes: TTranscriptomicsDatum[] = [];
    event.points.forEach((point) => {
      if (point?.customdata) {
        genes.push(point.customdata as unknown as TTranscriptomicsDatum);
      }
    });
    handleGenesSelection(genes);
  };

  return (
    <Plot
      key={plotKey}
      data={memoizedData}
      className={styles.scatterPlot}
      useResizeHandler
      layout={layout}
      onClick={handleClick}
      config={{
        modeBarButtonsToRemove: ['toImage', 'resetGeo', 'sendDataToCloud', 'pan2d'],
        displaylogo: false,
      }}
      onRelayout={(event) => {
        handleRelayout(event);
      }}
      onSelected={handleOnSelect}
      // @ts-ignore
      onRelayouting={handleRelayouting}
    />
  );
};

export default ScatterPlotly;

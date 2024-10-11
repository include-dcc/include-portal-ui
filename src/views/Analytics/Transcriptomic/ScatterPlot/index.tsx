import React, { useEffect, useMemo, useState } from 'react';
import intl from 'react-intl-universal';
import Plot from 'react-plotly.js';
import ChartSkeleton from '@ferlab/ui/core/components/Charts/Skeleton/index';
import { Annotations, PlotMouseEvent, ScatterData } from 'plotly.js';

import { TTranscriptomicsDiffGeneExp } from '../../../../services/api/transcriptomics/models';

import styles from './index.module.css';

type TTranscriptomicsScatterPlotCanvas = {
  data?: TTranscriptomicsDiffGeneExp[];
  handleGeneSelection: (ensembl_ids: string[]) => void;
  selectedGeneIds: string[];
  loading: boolean;
};

const formatPadj = (value: number): string => {
  const valueString = value.toString();
  const exponentIndex = valueString.indexOf('e');
  if (exponentIndex != -1) {
    const splitString = valueString.split('e-');
    return `${splitString[0]}e-${splitString[1].substring(0, 2)}`;
  }
  return value?.toFixed(3);
};

const ScatterPlotly = ({
  data,
  handleGeneSelection,
  selectedGeneIds,
  loading,
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
      title: intl.get('screen.analytics.transcriptomic.scatterPlot.xAxisTitle'),
      titlefont: { size: 14 },
      tickfont: { size: 12 },
    },
    yaxis: {
      title: intl.get('screen.analytics.transcriptomic.scatterPlot.yAxisTitle'),
      titlefont: { size: 14 },
      tickfont: { size: 12 },
      automargin: true,
    },
  });

  useEffect(() => {
    if (data) {
      const newAnnotations: Partial<Annotations>[] = data.flatMap((group) =>
        group.data
          .filter((gene) => selectedGeneIds.includes(gene.ensembl_gene_id))
          .map(
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
          ),
      );
      setAnnotations(newAnnotations);
    }

    setPlotKey((prevKey) => prevKey + 1);
  }, [selectedGeneIds, data]);

  const memoizedData = useMemo<ScatterData[]>(
    () =>
      data?.map((group, index) => {
        const markerColours = ['#bebebe', '#b02428', '#6697ea'];
        return {
          x: group.data.map((e) => e.x) || [],
          y: group.data.map((e) => e.y) || [],
          type: 'scattergl',
          mode: 'markers',
          marker: {
            color: markerColours[index],
            size: 7,
            line: {
              color: 'white',
              width: 0.8,
            },
          },
          name: intl.get(`screen.analytics.transcriptomic.scatterPlot.${group.id}`),
          hoverlabel: {
            namelength: 0,
          },
          hovertemplate: group.data.map((e) =>
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
          customdata: group.data.map((e) => [e.ensembl_gene_id, e.gene_symbol]),
        } as ScatterData;
      }) || [],
    [data],
  );

  if (loading) {
    return <ChartSkeleton />;
  }

  const handleClick = (data: Readonly<PlotMouseEvent>) => {
    const clickedGene = (data.points[0].customdata as unknown as string[])[0];

    if (selectedGeneIds.includes(clickedGene)) {
      handleGeneSelection([]);
    } else {
      handleGeneSelection([clickedGene]);
    }
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

  return (
    <Plot
      key={plotKey}
      data={memoizedData}
      className={styles.scatterPlot}
      useResizeHandler
      layout={layout}
      onClick={handleClick}
      config={{
        modeBarButtonsToRemove: [
          'toImage',
          'resetGeo',
          'lasso2d',
          'sendDataToCloud',
          'pan2d',
          'select2d',
        ],
        displaylogo: false,
      }}
      onRelayout={(event) => {
        handleRelayout(event);
      }}
      // @ts-ignore
      onRelayouting={handleRelayouting}
    />
  );
};

export default ScatterPlotly;

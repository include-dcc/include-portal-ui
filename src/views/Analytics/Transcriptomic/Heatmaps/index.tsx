import intl from 'react-intl-universal';
import Plot from 'react-plotly.js';
import { formatPadj } from 'views/Analytics/Transcriptomic/utils';

import { TTranscriptomicsDatum } from 'services/api/transcriptomics/models';

import styles from './index.module.css';

const MAX_LABEL_THRESHOLD = 40;

export type TTranscriptomicHeatmaps = {
  selectedGenes: TTranscriptomicsDatum[];
  handleGenesSelection: (gene: TTranscriptomicsDatum[]) => void;
};

/**
 * Heatmaps use third dimensional data; x, y, z.
 * We only change y and z value to keep them in the same row.
 *
 * y = label
 * z = data
 */
const Heatmaps = ({ selectedGenes, handleGenesSelection }: TTranscriptomicHeatmaps) => {
  const padj: any = [];
  const label: string[] = [];
  const data: any = [];
  const sortedGenes = selectedGenes.sort((a, b) => {
    if (a?.fold_change < b?.fold_change) return -1;
    if (a?.fold_change > b?.fold_change) return 1;
    return 0;
  });
  sortedGenes.map((gene) => {
    label.push(gene.gene_symbol);
    data.push([gene?.fold_change ?? 0]);
    padj.push([formatPadj(gene.padj)]);
  });

  return (
    <Plot
      className={styles.heatmaps}
      data={[
        {
          type: 'heatmap',
          y: label,
          z: data,
          hoverlabel: {
            namelength: 0,
          },
          hovertemplate: `${intl.get(
            'screen.analytics.transcriptomic.heatmap.gene_symbol',
          )} : %{y}<br>${intl.get('screen.analytics.transcriptomic.heatmap.fold_change')} : %{z}
          <br>${intl.get('screen.analytics.transcriptomic.heatmap.qvalue')} : %{customdata}`,
          colorbar: {
            title: 'log<sub>2</sub>(Fold Change)', // using intl.getHTML will make plotty crash
          },
          customdata: padj,
        } as Partial<Plotly.PlotData> & { customdata: string[] },
      ]}
      config={{
        displaylogo: false,
        modeBarButtonsToRemove: [
          'resetGeo',
          'lasso2d',
          'sendDataToCloud',
          'zoom2d',
          'autoScale2d',
          'resetScale2d',
          'zoomIn2d',
          'zoomOut2d',
          'pan2d',
          'select2d',
        ],
      }}
      onClick={(event: Readonly<Plotly.PlotMouseEvent>) => {
        if (event.points.length > 0) {
          const gene = selectedGenes.find((gene) => gene.gene_symbol === event.points[0].y);
          if (gene) {
            handleGenesSelection([gene]);
          }
        }
      }}
      layout={{
        title: {
          text: intl.get('screen.analytics.transcriptomic.heatmap.title'),
          x: 0.0,
          y: 100.0,
          font: { size: 16, weight: 600 },
        },
        margin: { l: 82, r: 10, t: 60, b: 40 },
        autosize: true,
        xaxis: {
          visible: false,
        },
        yaxis:
          label.length < MAX_LABEL_THRESHOLD
            ? {
                tickvals: label,
                ticktext: label,
              }
            : { visible: false },
      }}
    />
  );
};

export default Heatmaps;

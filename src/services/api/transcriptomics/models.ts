import {
  ScatterPlotDatum,
  ScatterPlotRawSerie,
} from '@ferlab/ui/core/components/Charts/ScatterPlot';

export type TTranscriptomicsSwarmPlotData = {
  sample_id: string;
  x: number;
  y: number;
};

export type TTranscriptomicsDatum = ScatterPlotDatum & {
  gene_symbol: string;
  chromosome: string;
};

export type TTranscriptomicsDiffGeneExp = ScatterPlotRawSerie<TTranscriptomicsDatum>;

export interface ITranscriptomicsSampleGeneExp {
  data: TTranscriptomicsSwarmPlotData[];
  gene_symbol: string;
  nControl: number;
  nT21: number;
}

export interface ITranscriptomicsFacets {
  chromose: {
    key: string;
    doc_count: number;
  }[];
}

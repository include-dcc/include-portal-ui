export type TTranscriptomicsSwarmPlotData = {
  sample_id: string;
  x: number;
  y: number;
};

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

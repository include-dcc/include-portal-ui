export type ScatterPlotValue = number | string | Date;

export interface ScatterPlotDatum {
  x: ScatterPlotValue;
  y: ScatterPlotValue;
}
export type ScatterPlotRawSerie<RawDatum extends ScatterPlotDatum> = {
  id: string | number;
  data: RawDatum[];
};

export type TTranscriptomicsSwarmPlotData = {
  sample_id: string;
  x: number;
  y: number;
  age_at_biospecimen_collection_years: number;
  sex: string;
};

export type TTranscriptomicsDatum = ScatterPlotDatum & {
  gene_symbol: string;
  chromosome: string;
  ensembl_gene_id: string;
  fold_change: number;
  padj: number;
};

export type TTranscriptomicsDiffGeneExp = ScatterPlotRawSerie<TTranscriptomicsDatum>;

export interface ITranscriptomicsSampleGeneExp {
  data: TTranscriptomicsSwarmPlotData[];
  ensembl_gene_id: string;
  nControl: number;
  nT21: number;
  max_age_at_biospecimen_collection_years: number;
  max_fpkm_value: number;
  min_age_at_biospecimen_collection_years: number;
  min_fpkm_value: number;
}

export interface ITranscriptomicsFacets {
  chromose: {
    key: string;
    doc_count: number;
  }[];
}

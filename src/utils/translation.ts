import intl from 'react-intl-universal';
import { IDictionary as FiltersDict } from '@ferlab/ui/core/components/filters/types';
import { IProTableDictionary } from '@ferlab/ui/core/components/ProTable/types';
import { IDictionary as QueryBuilderDict } from '@ferlab/ui/core/components/QueryBuilder/types';
import { SET_ID_PREFIX } from '@ferlab/ui/core/data/sqon/types';

import { IUserSetOutput, IUserSetOutputAlias } from 'services/api/savedSet/models';

import { numberWithCommas } from './string';

export const getEntityExpandableTableMultiple = () => ({
  hideTranscript: intl.get('screen.variants.consequences.hideTranscript'),
  showTranscript: (count: number) =>
    intl.get('screen.variants.consequences.showTranscript', { count }),
  seeLess: intl.get('see.less'),
  seeMore: intl.get('see.more'),
  noDataAvailable: intl.get('no.data.available'),
});

export const getEntityConsequenceDictionary = () => ({
  consequence: intl.get('screen.variants.consequences.consequence'),
  impactTag: {
    modifier: intl.get('screen.variants.consequences.impactTag.modifier'),
    low: intl.get('screen.variants.consequences.impactTag.low'),
    moderate: intl.get('screen.variants.consequences.impactTag.moderate'),
    high: intl.get('screen.variants.consequences.impactTag.high'),
  },
  aaColumnTooltip: intl.get('screen.variants.consequences.aaColumnTooltip'),
  aaColumn: intl.get('screen.variants.consequences.aaColumn'),
  cdnaChangeColumn: intl.get('screen.variants.consequences.cdnaChangeColumn'),
  strand: intl.get('screen.variants.consequences.strand'),
  vep: intl.get('screen.variants.consequences.vep'),
  predictions: {
    predictions: intl.get('screen.variants.consequences.predictions.predictions'),
    sift: intl.get('screen.variants.consequences.predictions.sift'),
    polyphen2: intl.get('screen.variants.consequences.predictions.polyphen2'),
    fathmm: intl.get('screen.variants.consequences.predictions.fathmm'),
    cadd: intl.get('screen.variants.consequences.predictions.cadd'),
    caddRaw: intl.get('screen.variants.consequences.predictions.caddRaw'),
    caddPhred: intl.get('screen.variants.consequences.predictions.caddPhred'),
    dann: intl.get('screen.variants.consequences.predictions.dann'),
    lrt: intl.get('screen.variants.consequences.predictions.lrt'),
    revel: intl.get('screen.variants.consequences.predictions.revel'),
  },
  conservationColumn: intl.get('screen.variants.consequences.conservationColumn'),
  transcript: intl.get('screen.variants.consequences.transcript'),
  canonical: intl.get('screen.variants.consequences.canonical'),
  refSeq: intl.get('screen.variants.consequences.refSeq'),
  geneConsequence: intl.get('screen.variants.consequences.geneConsequence'),
  gene: intl.get('screen.variants.consequences.gene'),
  omim: intl.get('screen.variants.consequences.omim'),
});

export const getProTableDictionary = (): IProTableDictionary => ({
  itemCount: {
    result: intl.get('global.proTable.result'),
    results: intl.get('global.proTable.results'),
    noResults: intl.get('global.proTable.noResults'),
    of: intl.get('global.proTable.of'),
    selected: intl.get('global.proTable.selected'),
    selectedPlural: intl.get('global.proTable.selectedPlural'),
    selectAllResults: intl.get('global.proTable.selectAll'),
    clear: intl.get('global.proTable.clear'),
    clearFilters: intl.get('global.proTable.clearFilters'),
  },
  columnSelector: {
    tooltips: {
      columns: intl.get('global.proTable.columnSelector.tooltips.columns'),
    },
    reset: intl.get('global.proTable.columnSelector.reset'),
  },
  tooltips: {
    tableExport: intl.get('global.proTable.tooltips.tableExport'),
  },
  numberFormat: numberWithCommas,
});

export const getFiltersDictionary = (): FiltersDict => ({
  actions: {
    all: intl.get('global.filters.actions.all'),
    apply: intl.get('global.filters.actions.apply'),
    clear: intl.get('global.filters.actions.clear'),
    less: intl.get('global.filters.actions.less'),
    more: intl.get('global.filters.actions.more'),
    none: intl.get('global.filters.actions.none'),
    dictionary: intl.get('global.filters.actions.dictionary'),
  },
  operators: {
    between: intl.get('global.filters.operators.between'),
    lessThan: intl.get('global.filters.operators.lessthan'),
    lessThanOfEqual: intl.get('global.filters.operators.lessthanorequal'),
    greaterThan: intl.get('global.filters.operators.greaterthan'),
    greaterThanOrEqual: intl.get('global.filters.operators.greaterthanorequal'),
  },
  range: {
    actualInterval: 'Actual Interval',
    noData: 'No Data',
    from: 'from',
    to: 'to',
    is: intl.get('global.filters.range.is'),
    unit: 'unit',
    min: 'min',
    max: 'max',
  },
  checkBox: {
    noData: intl.get('api.noData'),
    searchPlaceholder: intl.get('global.filters.checkbox.placeholder'),
  },
  messages: {
    errorNoData: intl.get('global.filters.messages.empty'),
  },
  quickFilter: {
    emptyMessage: intl.get('global.filters.quickfilter.emptyMessage'),
    placeholder: intl.get('global.filters.quickfilter.placeholder'),
    placeholderError: intl.get('global.filters.quickfilter.placeholderError'),
  },
});

export const getQueryBuilderDictionary = (
  facetResolver: (key: string) => React.ReactNode,
  savedSets?: IUserSetOutput[],
  alias?: IUserSetOutputAlias[],
): QueryBuilderDict => ({
  queryBuilderHeader: {
    manageFilters: {
      modalTitle: intl.get('components.querybuilder.header.myFiltersDropdown.manageMyFilter'),
      okText: intl.get('components.querybuilder.header.myFiltersDropdown.okText'),
      lastSavedAt: intl.get('components.querybuilder.header.myFiltersDropdown.lastSavedAt'),
    },
    modal: {
      edit: {
        title: intl.get('components.querybuilder.header.modal.edit.title'),
        okText: intl.get('components.querybuilder.header.modal.edit.okText'),
        cancelText: intl.get('components.querybuilder.header.modal.edit.cancelText'),
        content: '',
        input: {
          label: intl.get('components.querybuilder.header.modal.edit.input.label'),
          placeholder: intl.get('components.querybuilder.header.modal.edit.input.placeholder'),
          maximumLength: intl.get('components.querybuilder.header.modal.edit.input.maximumLength'),
        },
      },
      saveThisFilter: intl.get('components.querybuilder.header.modal.saveThisFilter'),
      confirmUnsaved: {
        title: intl.get('components.querybuilder.header.modal.confirmUnsaved.title'),
        openSavedFilter: {
          okText: intl.get(
            'components.querybuilder.header.modal.confirmUnsaved.openSavedFilter.okText',
          ),
          cancelText: intl.get(
            'components.querybuilder.header.modal.confirmUnsaved.openSavedFilter.cancelText',
          ),
          content: intl.get(
            'components.querybuilder.header.modal.confirmUnsaved.openSavedFilter.content',
          ),
        },
        createNewFilter: {
          okText: intl.get(
            'components.querybuilder.header.modal.confirmUnsaved.createNewFilter.okText',
          ),
          cancelText: intl.get(
            'components.querybuilder.header.modal.confirmUnsaved.createNewFilter.cancelText',
          ),
          content: intl.get(
            'components.querybuilder.header.modal.confirmUnsaved.createNewFilter.content',
          ),
        },
      },
    },
    popupConfirm: {
      delete: {
        title: intl.get('components.querybuilder.header.popupConfirm.delete.title'),
        okText: intl.get('components.querybuilder.header.popupConfirm.delete.okText'),
        cancelText: intl.get('components.querybuilder.header.popupConfirm.delete.cancelText'),
        content: intl.get('components.querybuilder.header.popupConfirm.delete.content'),
      },
    },
    tooltips: {
      newQueryBuilder: intl.get('components.querybuilder.header.tooltips.newQueryBuilder'),
      save: intl.get('components.querybuilder.header.tooltips.save'),
      saveChanges: intl.get('components.querybuilder.header.tooltips.saveChanges'),
      saveDisabled: intl.get('components.querybuilder.header.tooltips.saveDisabled'),
      delete: intl.get('components.querybuilder.header.tooltips.delete'),
      duplicateQueryBuilder: intl.get(
        'components.querybuilder.header.tooltips.duplicateQueryBuilder',
      ),
      share: intl.get('components.querybuilder.header.tooltips.share'),
      shareDisabled: intl.get('components.querybuilder.header.tooltips.shareDisabled'),
      setAsDefaultFilter: intl.get('components.querybuilder.header.tooltips.setAsDefaultFilter'),
      unsetDefaultFilter: intl.get('components.querybuilder.header.tooltips.unsetDefaultFilter'),
      undoChanges: intl.get('components.querybuilder.header.tooltips.undoChanges'),
      noSavedFilters: intl.get('components.querybuilder.header.tooltips.noSavedFilters'),
    },
    myFiltersDropdown: {
      title: intl.get('components.querybuilder.header.myFiltersDropdown.title'),
      manageMyFilter: intl.get('components.querybuilder.header.myFiltersDropdown.manageMyFilter'),
    },
    duplicateFilterTitleSuffix: intl.get(
      'components.querybuilder.header.duplicateFilterTitleSuffix',
    ),
  },
  query: {
    combine: {
      and: intl.get('components.querybuilder.query.combine.and'),
      or: intl.get('components.querybuilder.query.combine.or'),
    },
    noQuery: intl.get('components.querybuilder.query.noQuery'),
    facet: facetResolver,
    setNameResolver: (setId: string) => {
      const set = savedSets?.find((set) => set.id === setId.replace(SET_ID_PREFIX, ''));
      if (set && set.tag) {
        return set.tag;
      }
      const aliasSetId = alias?.find((a) => a.setId === setId);
      if (aliasSetId) {
        return aliasSetId?.alias;
      }

      return setId;
    },
    facetValueMapping: {
      variant_external_reference: {
        DBSNP: intl.get('screen.variants.table.dbsnp'),
        Clinvar: intl.get('filters.group.clinvar.clin_sig'),
      },
      'genes.consequences.predictions.sift_pred': {
        T: intl.get('facets.options.genes__consequences__predictions__sift_pred.T'),
        D: intl.get('facets.options.genes__consequences__predictions__sift_pred.D'),
      },
      'genes.consequences.predictions.polyphen2_hvar_pred': {
        B: intl.get('facets.options.genes__consequences__predictions__polyphen2_hvar_pred.B'),
        D: intl.get('facets.options.genes__consequences__predictions__polyphen2_hvar_pred.D'),
        P: intl.get('facets.options.genes__consequences__predictions__polyphen2_hvar_pred.P'),
      },
      'genes.consequences.predictions.fathmm_pred': {
        T: intl.get('facets.options.genes__consequences__predictions__fathmm_pred.T'),
        D: intl.get('facets.options.genes__consequences__predictions__fathmm_pred.D'),
      },
      'genes.consequences.predictions.lrt_pred': {
        N: intl.get('facets.options.genes__consequences__predictions__lrt_pred.N'),
        D: intl.get('facets.options.genes__consequences__predictions__lrt_pred.D'),
        U: intl.get('facets.options.genes__consequences__predictions__lrt_pred.U'),
      },
      down_syndrome_status: {
        D21: intl.get('facets.options.D21'),
        T21: intl.get('facets.options.T21'),
      },
      'studies.zygosity': {
        HET: intl.get('facets.options.studies__zygosity.HET'),
        WT: intl.get('facets.options.studies__zygosity.WT'),
        HOM: intl.get('facets.options.studies__zygosity.HOM'),
        UNK: intl.get('facets.options.studies__zygosity.UNK'),
      },
    },
  },
  actions: {
    new: intl.get('components.querybuilder.actions.new'),
    addQuery: intl.get('components.querybuilder.actions.addQuery'),
    combine: intl.get('components.querybuilder.actions.combine'),
    compare: intl.get('components.querybuilder.actions.compare'),
    compareLessTooltips: intl.get('components.querybuilder.actions.compareLessTooltips'),
    compareGreaterTooltips: intl.get('components.querybuilder.actions.compareGreaterTooltips'),
    labels: intl.get('components.querybuilder.actions.labels'),
    changeOperatorTo: intl.get('components.querybuilder.actions.changeOperatorTo'),
    delete: {
      title: intl.get('components.querybuilder.actions.delete.title'),
      cancel: intl.get('components.querybuilder.actions.delete.cancel'),
      confirm: intl.get('components.querybuilder.actions.delete.confirm'),
    },
    clear: {
      title: intl.get('components.querybuilder.actions.clear.title'),
      cancel: intl.get('components.querybuilder.actions.clear.cancel'),
      confirm: intl.get('components.querybuilder.actions.clear.confirm'),
      buttonTitle: intl.get('components.querybuilder.actions.clear.buttonTitle'),
      description: intl.get('components.querybuilder.actions.clear.description'),
    },
  },
});

export const getFacetsDictionary = () => ({
  chromosome: intl.get('chromosome'),
  program: intl.get('facets.program'),
  data_category: intl.get('facets.data_category'),
  data_type: intl.get('facets.data_type'),
  file_format: intl.get('facets.file_format'),
  down_syndrome_status: intl.get('facets.down_syndrome_status'),
  sex: intl.get('facets.sex'),
  race: intl.get('facets.race'),
  ethnicity: intl.get('facets.ethnicity'),
  maxo: {
    code: intl.get('facets.maxo.code'),
    formatted: intl.get('facets.maxo.formatted')
  },
  status: intl.get('facets.status'),
  parent_sample_type: intl.get('facets.parent_sample_type'),
  family_type: intl.get('facets.family_type'),
  family_data: intl.get('facets.family_data'),
  sample_type: intl.get('facets.sample_type'),
  collection_sample_type: intl.get('facets.collection_sample_type'),
  laboratory_procedure: intl.get('facets.laboratory_procedure'),
  biospecimen_storage: intl.get('facets.biospecimen_storage'),
  study_id: intl.get('facets.study.study_code'),
  study: {
    study_name: intl.get('facets.study.study_name'),
    study_code: intl.get('facets.study.study_code'),
    external_id: intl.get('facets.study.external_id'),
  },
  studies: {
    study_code: intl.get('facets.studies.study_code'),
    zygosity: intl.get('facets.studies.zygosity'),
    transmission: intl.get('facets.studies.transmission'),
  },
  domains: intl.get('facets.domain'),
  study_designs: intl.get('facets.study_design'),
  part_lifespan_stages: intl.get('facets.part_lifespan_stages'),
  start: intl.get('facets.start'),
  acl: intl.get('facets.acl'),
  variant_external_reference: intl.get('facets.variant_external_reference'),
  gene_external_reference: intl.get('facets.gene_external_reference'),
  sequencing_experiment: {
    experiment_strategy: intl.get('facets.sequencing_experiment.experiment_strategy'),
  },
  transmissions: intl.get('facets.transmissions'),
  controlled_access: intl.get('facets.controlled_access'),
  is_harmonized: intl.get('facets.is_harmonized'),
  is_guid_mapped: intl.get('facets.is_guid_mapped'),
  data_sources: intl.get('facets.data_sources'),
  is_proband: intl.get('facets.is_proband'),
  variant_class: intl.get('facets.variant_class'),
  diagnosis: {
    affected_status: intl.get('facets.diagnosis.affected_status'),
    age_at_event_days: intl.get('facets.diagnosis.ncit_id_diagnosis'),
    mondo_display_term: intl.get('facets.diagnosis.mondo_display_term'),
    ncit_id_diagnosis: intl.get('facets.diagnosis.ncit_id_diagnosis'),
    source_text: intl.get('facets.diagnosis.source_text'),
    source_text_tumor_location: intl.get('facets.diagnosis.source_text_tumor_location'),
  },
  age_at_first_patient_engagement: {
    value: intl.get('facets.age_at_first_patient_engagement.value'),
  },
  condition_source_texts: intl.get('facets.condition_source_texts'),
  mondo: {
    name: intl.get('facets.mondo.name'),
  },
  outcomes: {
    vital_status: intl.get('facets.outcomes.vital_status'),
    age_at_event_days: {
      value: intl.get('facets.outcomes.age_at_event_days.value'),
    },
  },
  phenotype: {
    age_at_event_days: intl.get('facets.phenotype.age_at_event_days'),
    hpo_phenotype_observed: intl.get('facets.phenotype.hpo_phenotype_observed'),
    hpo_phenotype_not_observed: intl.get('facets.phenotype.hpo_phenotype_not_observed'),
  },
  observed_phenotype: {
    name: intl.get('facets.observed_phenotype.name'),
    age_at_event_days: intl.get('facets.observed_phenotype.age_at_event_days'),
  },
  clinvar: {
    clin_sig: intl.get('facets.clinvar.clin_sig'),
  },
  consequences: {
    consequences: intl.get('facets.consequences.consequences'),
    biotype: intl.get('facets.consequences.biotype'),
    vep_impact: intl.get('facets.consequences.vep_impact'),
    predictions: {
      sift_pred: intl.get('facets.consequences.predictions.sift_pred'),
      polyphen2_hvar_pred: intl.get('facets.consequences.predictions.polyphen2_hvar_pred'),
      fathmm_pred: intl.get('facets.consequences.predictions.fathmm_pred'),
      cadd_rankscore: intl.get('facets.consequences.predictions.cadd_rankscore'),
      lrt_pred: intl.get('facets.consequences.predictions.lrt_pred'),
      revel_rankscore: intl.get('facets.consequences.predictions.revel_rankscore'),
      dann_rankscore: intl.get('facets.consequences.predictions.dann_rankscore'),
    },
  },
  genes: {
    hpo: {
      hpo_term_label: intl.get('facets.genes.hpo.hpo_term_label'),
    },
    orphanet: {
      panel: intl.get('facets.genes.orphanet.panel'),
    },
    omim: {
      name: intl.get('facets.genes.omim.name'),
    },
    ddd: {
      disease_name: intl.get('facets.genes.ddd.disease_name'),
    },
    cosmic: {
      tumour_types_germline: intl.get('facets.genes.cosmic.tumour_types_germline'),
    },
    consequences: {
      consequence: intl.get('facets.genes.consequences.consequence'),
      vep_impact: intl.get('facets.genes.consequences.vep_impact'),
      predictions: {
        cadd_score: intl.get('facets.genes.consequences.predictions.cadd_score'),
        cadd_phred: intl.get('facets.genes.consequences.predictions.cadd_phred'),
        dann_score: intl.get('facets.genes.consequences.predictions.dann_score'),
        fathmm_pred: intl.get('facets.genes.consequences.predictions.fathmm_pred'),
        lrt_pred: intl.get('facets.genes.consequences.predictions.lrt_pred'),
        polyphen2_hvar_pred: intl.get('facets.genes.consequences.predictions.polyphen2_hvar_pred'),
        revel_score: intl.get('facets.genes.consequences.predictions.revel_score'),
        sift_pred: intl.get('facets.genes.consequences.predictions.sift_pred'),
      },
    },
    biotype: intl.get('facets.genes.biotype'),
    gnomad: {
      pli: intl.get('facets.genes.gnomad.pli'),
      loeuf: intl.get('facets.genes.gnomad.loeuf'),
    },
    spliceai: {
      ds: intl.get('facets.genes.spliceai.ds'),
    },
  },
  internal_frequencies: {
    total: {
      af: intl.get('facets.internal_frequencies.total.af'),
    },
  },
  external_frequencies: {
    gnomad_genomes_2_1_1: { af: intl.get('facets.external_frequencies.gnomad_genomes_2_1_1.af') },
    gnomad_genomes_3: { af: intl.get('facets.external_frequencies.gnomad_genomes_3.af') },
    gnomad_exomes_2_1_1: { af: intl.get('facets.external_frequencies.gnomad_exomes_2_1_1.af') },
    topmed_bravo: { af: intl.get('facets.external_frequencies.topmed_bravo.af') },
    thousand_genomes: { af: intl.get('facets.external_frequencies.thousand_genomes.af') },
  },
  frequencies: {
    internal: {
      upper_bound_kf: {
        af: intl.get('facets.frequencies.internal.upper_bound_kf.af'),
      },
    },
    gnomad_genomes_2_1: {
      af: intl.get('facets.frequencies.gnomad_genomes_2_1.af'),
    },
    gnomad_genomes_3_0: {
      af: intl.get('facets.frequencies.gnomad_genomes_3_0.af'),
    },
    gnomad_genomes_3_1_1: {
      af: intl.get('facets.frequencies.gnomad_genomes_3_1_1.af'),
    },
    gnomad_exomes_2_1: {
      af: intl.get('facets.frequencies.gnomad_exomes_2_1.af'),
    },
    topmed: {
      af: intl.get('facets.frequencies.topmed.af'),
    },
    one_thousand_genomes: {
      af: intl.get('facets.frequencies.one_thousand_genomes.af'),
    },
  },
  age_at_biospecimen_collection: intl.get('facets.age_at_biospecimen_collection'),
  tooltips: {
    genes: {
      consequences: {
        vep_impact: intl.get('facets.tooltips.genes.consequences.vep_impact'),
        predictions: {
          cadd_score: intl.get('facets.tooltips.genes.consequences.predictions.cadd_score'),
          cadd_phred: intl.get('facets.tooltips.genes.consequences.predictions.cadd_phred'),
          dann_score: intl.get('facets.tooltips.genes.consequences.predictions.dann_score'),
          fathmm_pred: intl.get('facets.tooltips.genes.consequences.predictions.fathmm_pred'),
          lrt_pred: intl.get('facets.tooltips.genes.consequences.predictions.lrt_pred'),
          polyphen2_hvar_pred: intl.get(
            'facets.tooltips.genes.consequences.predictions.polyphen2_hvar_pred',
          ),
          revel_score: intl.get('facets.tooltips.genes.consequences.predictions.revel_score'),
          sift_pred: intl.get('facets.tooltips.genes.consequences.predictions.sift_pred'),
        },
      },
      hpo: {
        hpo_term_label: intl.get('facets.tooltips.hpo.hpo_term_label'),
      },
      orphanet: {
        panel: intl.get('facets.tooltips.orphanet.panel'),
      },
      omim: {
        name: intl.get('facets.tooltips.omim.name'),
      },
      ddd: {
        disease_name: intl.get('facets.tooltips.ddd.disease_name'),
      },
      cosmic: {
        tumour_types_germline: intl.get('facets.tooltips.cosmic.tumour_types_germline'),
      },
      spliceai: {
        ds: intl.get('facets.tooltips.spliceai.ds'),
      },
      gnomad: {
        pli: intl.get('facets.tooltips.gnomal.pli'),
        loeuf: intl.get('facets.tooltips.gnomal.loeuf'),
      },
    },
  },
  dataset_names: intl.get('facets.dataset_names'),
});

export const getResizableGridDictionary = () => ({
  fileNameTemplate: intl.get('screen.dataExploration.tabs.summary.download.fileNameTemplate'),
  fileNameDateFormat: intl.get('screen.dataExploration.tabs.summary.download.fileNameDateFormat'),
  download: intl.get('screen.dataExploration.tabs.summary.download.download'),
  data: intl.get('screen.dataExploration.tabs.summary.download.data'),
  svg: intl.get('screen.dataExploration.tabs.summary.download.svg'),
  png: intl.get('screen.dataExploration.tabs.summary.download.png'),
});

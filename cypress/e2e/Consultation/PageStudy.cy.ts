/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitStudyEntity('HTP', 1);
});

describe('Page d\'une étude - Valider les redirections', () => {
  it('Participants', () => {
    cy.get('button[class*="SummaryHeader_item"]').eq(0).clickAndWait({force: true});
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('HTP').should('exist');
  });
  
  it('Biospecimens', () => {
    cy.get('button[class*="SummaryHeader_item"]').eq(1).clickAndWait({force: true});
    cy.get('[class*="Biospecimens_biospecimenTabWrapper"]').should('exist'); // data-cy="ProTable_Biospecimens"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('HTP').should('exist');
  });
  
  it('Files', () => {
    cy.get('button[class*="SummaryHeader_item"]').eq(2).clickAndWait({force: true});
    cy.get('[class*="DataFiles_dataFilesTabWrapper"]').should('exist'); // data-cy="ProTable_DataFiles"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('HTP').should('exist');
  });
});

describe('Page d\'une étude - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="EntityTitleLogo_logo"] [src*="study-logo-HTP"]').should('exist');
    cy.get('[class*="EntityTitleLogo_title"]').contains('The Human Trisome Project');
  });

  it('Panneau Summary [SJIP-1207]', () => {
    cy.get('button[class*="SummaryHeader_item"]').eq(0).contains(/\d{1}/);
    cy.get('button[class*="SummaryHeader_item"]').eq(0).contains('Participants');
    cy.get('button[class*="SummaryHeader_item"]').eq(1).contains(/\d{1}/);
    cy.get('button[class*="SummaryHeader_item"]').eq(1).contains('Biospecimens');
    cy.get('button[class*="SummaryHeader_item"]').eq(2).contains(/\d{1}/);
    cy.get('button[class*="SummaryHeader_item"]').eq(2).contains('Files');
    cy.get('[id="summary"] [class="ant-collapse-header"]').contains('Summary').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(0).contains('Study Code').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(0).contains('HTP').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(1).contains('Study Name').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(1).contains('The Human Trisome Project').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(1).find('[class*="ant-tag-green"]').contains('Harmonized').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(2).contains('Program').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(2).contains('INCLUDE').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(3).contains('dbGaP Accession Number').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(3).contains(/(phs002330|phs002981|-)/).should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(4).contains('GUID Available').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(4).find('[class*="ant-tag-green"]').contains('True').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(5).contains('Participant Lifespan').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(5).find('[class*="ant-tag-cyan"]').contains('Pediatric').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(5).find('[class*="ant-tag-cyan"]').contains('Adult').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(6).contains('Description').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(6).contains('The Human Trisome Project (HTP) is a large and comprehensive natural history study of Down syndrome involving collection of deep clinical data, multimodal phenotyping, a multi-dimensional biobank, generation of pan-omics datasets, and rapid release of data. The HTP has enabled many discoveries about the pathophysiology of Down syndrome, leading to new clinical trials testing therapies to improve diverse health outcomes in this population.').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(7).contains('Research Domain').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(7).contains('All Co-occurring Conditions').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(8).contains('Clinical Data Source Type').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(8).contains('Investigator Assessment, Medical Record, Participant or Caregiver Report').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(9).contains('Data Category').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(9).contains('Imaging, Harmonized Demographic/Clinical Data, Genomics, Proteomics, Metabolomics, Transcriptomics, Immune Maps, Unharmonized Demographic/Clinical Data, Microbiome').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(10).contains('Selection Criteria').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(10).contains('Ages 6 months to 89 years old, with or without Down syndrome').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(11).contains('Study Design').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(11).contains('longitudinal').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(12).contains('Study Website').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(12).contains('https://www.trisome.org').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(13).contains('Publication').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(13).find('[class="ant-typography"]').eq(0).contains('Donovan');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(13).find('[class="ant-typography"]').eq(0).contains(',');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(13).find('[class="ant-typography"]').eq(0).contains('Micah G');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(13).find('[class="ant-typography"]').eq(1).contains('et al.');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(13).find('[class="ant-typography"]').eq(2).contains(' "');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(13).find('[class="ant-typography"]').eq(2).contains('Variegated overexpression of chromosome 21 genes reveals molecular and immune subtypes of Down syndrome');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(13).find('[class="ant-typography"]').eq(2).contains('"');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(13).find('[class="ant-typography"]').eq(3).find('i').contains('Nat Commun');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(13).find('[class="ant-typography"]').eq(4).contains('vol.');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(13).find('[class="ant-typography"]').eq(4).contains('15');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(13).find('[class="ant-typography"]').eq(5).contains(',');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(13).find('[class="ant-typography"]').eq(5).contains('1');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(13).find('[class="ant-typography"]').eq(6).contains('(');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(13).find('[class="ant-typography"]').eq(6).contains('2024');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(13).find('[class="ant-typography"]').eq(6).contains('):');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(13).find('[class="ant-typography"]').eq(7).contains('5473');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(13).find('[class="ant-typography"]').eq(7).contains('.');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(13).find('[class="ant-typography"]').eq(8).contains('doi:');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(13).find('[class="ant-typography"]').eq(8).contains('10.1038/s41467-024-49781-1');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(13).find('[class="ant-typography"]').eq(8).contains('.');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(13).find('[class="ant-typography"]').eq(9).contains('PMID:');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(13).find('[class="ant-typography"]').eq(9).contains('38942750');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(13).find('[class="ant-typography"]').eq(9).contains('.');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(13).find('[data-icon="copy"]').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(13).find('[data-icon="copy"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});
    cy.get('div[class="ant-tooltip-inner"]').contains('Copy citation').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(13).contains('See more').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(14).contains('Principal Investigator').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(14).contains('Joaquin M. Espinosa').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(15).contains('Institution').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(15).contains('Linda Crnic Institute for Down Syndrome').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(16).contains('Study Contact').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(16).contains('Angela Rachubinski; dsresearch@cuanschutz.edu').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(17).contains('Virtual Biorepository Email').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(17).contains('dsresearch@cuanschutz.edu').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(18).contains('Virtual Biorepository URL').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(18).contains('https://redcap.link/HTPVBRrequest').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(19).contains('Citation Statement').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(19).contains('-').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-label"]').eq(20).contains('Acknowledgement').should('exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(20).contains('-').should('exist');
  });

  it('Panneau Statistic', () => {
    cy.get('[id="statistic"] [class*="EntityStatistics_title"]').contains('Statistic').should('exist');
    cy.get('[id="statistic"] [class="ant-collapse-header"]').contains('Summary Statistics').should('exist');
    cy.get('[id="statistic"] [id="phenotypes"]').contains('Most Frequent Phenotypes (HPO)').should('exist');
    cy.get('[id="statistic"] [id="mondo"]').contains('Most Frequent Diagnoses (MONDO)').should('exist');
    cy.get('[id="statistic"] [id="demography"]').contains('Demographics').should('exist');
    cy.get('[id="statistic"] [id="down_syndrome"]').contains('Down Syndrome Status').should('exist');
    cy.get('[id="statistic"] [id="sample_type"]').contains('Sample Type').should('exist');
    cy.get('[id="statistic"] [id="sample_availability"]').contains('Sample Availability').should('exist');
    cy.get('[id="statistic"] [id="data-category"]').contains('Participants by Data Category').should('exist');
    cy.get('[id="statistic"] [id="data-type"]').contains('Participants by Data Type').should('exist');
  });

  it('Panneau Data Access', () => {
    cy.get('[id="data_access"] [class*="EntityDescriptions_title"]').contains('Data Access').should('exist');
    cy.get('[id="data_access"] [class="ant-collapse-header"]').contains('Data Access').should('exist');
    cy.get('[id="data_access"] [class="ant-descriptions-item-label"]').eq(0).contains('Access Limitation').should('exist');
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(0).contains('general research use').should('exist');
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(0).contains('DUO:').should('exist');
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(0).contains('0000042').should('exist');
    cy.get('[id="data_access"] [class="ant-descriptions-item-label"]').eq(1).contains('Access Requirement').should('exist');
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(1).contains('-').should('exist');
  });

  it('Panneau HTP Whole Blood RNAseq (2020)', () => {
    cy.get('[class*="EntityDataset_panel"]').each(($el: JQuery<HTMLElement>) => {
      if ($el.text().includes('HTP Whole Blood RNAseq (2020)')) {
        cy.wrap($el).as('datasetPanel');
      }
    });

    cy.get('[class*="StudyEntity_datasetTitle"]').contains('Dataset').should('exist');
    cy.get('[class*="StudyEntity_datasetTitle"] [class*="StudyEntity_datasetInfo"]').should('exist');
    cy.get('@datasetPanel').find('[class="ant-collapse-header"]').contains('HTP Whole Blood RNAseq (2020)').should('exist');
    cy.get('@datasetPanel').find('[class="ant-collapse-header"] [class*="ant-tag-green"]').contains('Harmonized').should('exist');
    cy.get('@datasetPanel').find('[class="ant-collapse-header"]').contains('View in exploration').should('exist');
    cy.get('@datasetPanel').find('[class="ant-collapse-header"]').contains('Manifest').should('exist');
    cy.get('@datasetPanel').find('[class="ant-collapse-header"]').contains('Analysis').should('exist');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-label"]').eq(0).contains('Dataset ID').should('exist');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(0).contains('HTP-RNAseq-WholeBlood-2020').should('exist');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-label"]').eq(1).contains('Description').should('exist');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(1).contains('Analysis of steady-state mRNA levels in whole blood of euploid controls and participants with trisomy 21').should('exist');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-label"]').eq(2).contains('Data Collection Start (Year)').should('exist');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(2).contains('2016').should('exist');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-label"]').eq(3).contains('Data Collection End (Year)').should('exist');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(3).contains('2020').should('exist');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-label"]').eq(4).contains('Data Category').should('exist');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(4).contains('Transcriptomics').should('exist');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-label"]').eq(5).contains('Data Type').should('exist');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(5).find('[class="ant-tag"]').contains('Alternative Splicing').should('exist');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(5).find('[class="ant-tag"]').contains('Chimeric Aligned Reads').should('exist');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(5).find('[class="ant-tag"]').contains('Gene Expression Count').should('exist');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(5).find('[class="ant-tag"]').contains('Aligned Reads').should('exist');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(5).find('[class="ant-tag"]').contains('Raw Gene').should('exist');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(5).find('[class="ant-tag"]').contains('RNAseq Alignment Metrics Fusion').should('exist');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(5).find('[class="ant-tag"]').contains('Splice Junction').should('exist');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-label"]').eq(6).contains('Experimental Strategy').should('exist');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(6).find('[class="ant-tag"]').contains('Bulk RNA-Seq').should('exist');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-label"]').eq(7).contains('Experimental Platform').should('exist');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(7).contains('Illumina NovaSeq 6000').should('exist');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-label"]').eq(8).contains('Publication').should('exist');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(8).find('[class="ant-typography"]').eq(0).contains('Galbraith');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(8).find('[class="ant-typography"]').eq(0).contains(',');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(8).find('[class="ant-typography"]').eq(0).contains('Matthew D');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(8).find('[class="ant-typography"]').eq(1).contains('et al.');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(8).find('[class="ant-typography"]').eq(2).contains(' "');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(8).find('[class="ant-typography"]').eq(2).contains('Multidimensional definition of the interferonopathy of Down syndrome and its response to JAK inhibition');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(8).find('[class="ant-typography"]').eq(2).contains('"');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(8).find('[class="ant-typography"]').eq(3).find('i').contains('Sci Adv');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(8).find('[class="ant-typography"]').eq(4).contains('vol.');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(8).find('[class="ant-typography"]').eq(4).contains('9');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(8).find('[class="ant-typography"]').eq(5).contains(',');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(8).find('[class="ant-typography"]').eq(5).contains('26');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(8).find('[class="ant-typography"]').eq(6).contains('(');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(8).find('[class="ant-typography"]').eq(6).contains('2023');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(8).find('[class="ant-typography"]').eq(6).contains('):');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(8).find('[class="ant-typography"]').eq(7).contains('eadg6218');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(8).find('[class="ant-typography"]').eq(7).contains('.');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(8).find('[class="ant-typography"]').eq(8).contains('doi:');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(8).find('[class="ant-typography"]').eq(8).contains('10.1126/sciadv.adg6218');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(8).find('[class="ant-typography"]').eq(8).contains('.');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(8).find('[class="ant-typography"]').eq(9).contains('PMID:');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(8).find('[class="ant-typography"]').eq(9).contains('37379383');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(8).find('[class="ant-typography"]').eq(9).contains('.');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(8).find('[data-icon="copy"]').should('exist');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(8).find('[data-icon="copy"]').trigger('mouseover', {eventConstructor: 'MouseEvent', force: true});
    cy.get('div[class="ant-tooltip-inner"]').contains('Copy citation').should('exist');
    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(8).contains('See more').should('not.exist');
    cy.get('@datasetPanel').find('[class*="EntityDataset_rowCountCard"]').eq(0).find('g[id="family"]').should('exist');
    cy.get('@datasetPanel').find('[class*="EntityDataset_rowCountCard"]').eq(0).contains(/^400$/).should('exist');
    cy.get('@datasetPanel').find('[class*="EntityDataset_rowCountCard"]').eq(0).contains('Participants').should('exist');
    cy.get('@datasetPanel').find('[class*="EntityDataset_rowCountCard"]').eq(1).find('g[id="file"]').should('exist');
    cy.get('@datasetPanel').find('[class*="EntityDataset_rowCountCard"]').eq(1).contains(/^11.2K$/).should('exist');
    cy.get('@datasetPanel').find('[class*="EntityDataset_rowCountCard"]').eq(1).contains('Files').should('exist');
  });
  
  it('Panneau Files', () => {
    cy.get('[id="data_file"] [class*="EntityTable_title"]').contains('File').should('exist');
    cy.get('[id="data_file"] [class="ant-collapse-header"]').contains('Files').should('exist');
    cy.get('[id="data_file"] [class="ant-collapse-header"]').contains('(9,367)').should('exist');
    cy.get('[id="data_file"] [class*="EntityTable_subTitle"]').eq(0).contains('File counts by Data Type').should('exist');
    cy.get('[id="data_file"] [class*="EntityTable_contentTable"]').eq(0).find('thead th[class="ant-table-cell"]').eq(0).contains('Data Type').should('exist');
    cy.get('[id="data_file"] [class*="EntityTable_contentTable"]').eq(0).find('thead th[class="ant-table-cell"]').eq(1).contains('Files').should('exist');
    cy.get('[id="data_file"] [class*="EntityTable_contentTable"]').eq(0).find('thead th[class="ant-table-cell"]').eq(2).contains('(n=9,367)').should('exist');
    cy.get('[id="data_file"] [data-row-key="1"] td[class="ant-table-cell"]').eq(1).contains(/^2,865$/).should('exist');
    cy.get('[id="data_file"] [data-row-key="1"] td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
    cy.get('[id="data_file"] [data-row-key="5"] td[class="ant-table-cell"]').eq(1).contains(/^2,865$/).should('exist');
    cy.get('[id="data_file"] [data-row-key="5"] td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
    cy.get('[id="data_file"] [data-row-key="3"] td[class="ant-table-cell"]').eq(1).contains(/^1,033$/).should('exist');
    cy.get('[id="data_file"] [data-row-key="3"] td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
    cy.get('[id="data_file"] [data-row-key="4"] td[class="ant-table-cell"]').eq(1).contains(/^438$/).should('exist');
    cy.get('[id="data_file"] [data-row-key="4"] td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
    cy.get('[id="data_file"] [data-row-key="8"] td[class="ant-table-cell"]').eq(1).contains(/^464$/).should('exist');
    cy.get('[id="data_file"] [data-row-key="8"] td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
    cy.get('[id="data_file"] [data-row-key="6"] td[class="ant-table-cell"]').eq(1).contains(/^800$/).should('exist');
    cy.get('[id="data_file"] [data-row-key="6"] td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
    cy.get('[id="data_file"] [data-row-key="2"] td[class="ant-table-cell"]').eq(1).contains(/^477$/).should('exist');
    cy.get('[id="data_file"] [data-row-key="2"] td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
    cy.get('[id="data_file"] [data-row-key="0"] td[class="ant-table-cell"]').eq(1).contains(/^418$/).should('exist');
    cy.get('[id="data_file"] [data-row-key="0"] td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
    cy.get('[id="data_file"] [data-row-key="7"] td[class="ant-table-cell"]').eq(1).contains(/^7$/).should('exist');
    cy.get('[id="data_file"] [data-row-key="7"] td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');

    cy.get('[id="data_file"] [class*="EntityTable_subTitle"]').eq(1).contains('File counts by Experimental Strategy').should('exist');
    cy.get('[id="data_file"] [class*="EntityTable_contentTable"]').eq(1).find('thead th[class="ant-table-cell"]').eq(0).contains('Strategy').should('exist');
    cy.get('[id="data_file"] [class*="EntityTable_contentTable"]').eq(1).find('thead th[class="ant-table-cell"]').eq(1).contains('Files').should('exist');
    cy.get('[id="data_file"] [class*="EntityTable_contentTable"]').eq(1).find('thead th[class="ant-table-cell"]').eq(2).contains('(n=9,367)').should('exist');
    cy.get('[id="data_file"] [data-row-key="0"]').eq(1).find('td[class="ant-table-cell"]').eq(1).contains(/^7,099$/).should('exist');
    cy.get('[id="data_file"] [data-row-key="0"]').eq(1).find('td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
    cy.get('[id="data_file"] [data-row-key="1"]').eq(1).find('td[class="ant-table-cell"]').eq(1).contains(/^1,373$/).should('exist');
    cy.get('[id="data_file"] [data-row-key="1"]').eq(1).find('td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
    cy.get('[id="data_file"] [data-row-key="2"]').eq(1).find('td[class="ant-table-cell"]').eq(1).contains(/^477$/).should('exist');
    cy.get('[id="data_file"] [data-row-key="2"]').eq(1).find('td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
    cy.get('[id="data_file"] [data-row-key="3"]').eq(1).find('td[class="ant-table-cell"]').eq(1).contains(/^418$/).should('exist');
    cy.get('[id="data_file"] [data-row-key="3"]').eq(1).find('td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
  });
});

describe('Page d\'une étude - Valider les liens disponibles', () => {
  it('Lien dbGaP du panneau Summary', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(3).invoke('text').then((invokeText) => {
      if (!invokeText.includes('-')) {
        cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(3).find('[href]')
        .should('have.attr', 'href').and('match', /https:\/\/www\.ncbi\.nlm\.nih\.gov\/projects\/gap\/cgi-bin\/study\.cgi\?study_id\=(phs002330|phs002981)/);
      };
    });
  });

  it('Lien Study Website du panneau Summary', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(12).find('[href]')
      .should('have.attr', 'href').and('match', /https:\/\/www.trisome.org/);
  });

  it('Lien Publication du panneau Summary', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(13).find('[href]')
      .should('have.attr', 'href').and('match', /https:\/\/pubmed.ncbi.nlm.nih.gov\/38942750(|\/)/);
  });

  it('Lien \'See more\' de Publication du panneau Summary', () => {
    cy.get('[class*="PubModal_modalWrapper"]').should('not.exist');
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(13).contains('See more').clickAndWait({force: true});
    cy.get('[class*="PubModal_modalWrapper"]').should('exist');
  });

  it('Lien Virtual Biorepository Email du panneau Summary', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(17).find('[href]')
      .should('have.attr', 'href', 'mailto:dsresearch@cuanschutz.edu');
  });

  it('Lien Virtual Biorepository URL du panneau Summary', () => {
    cy.get('[id="summary"] [class="ant-descriptions-item-content"]').eq(18).find('[href]')
      .should('have.attr', 'href', 'https://redcap.link/HTPVBRrequest');
  });

  it('Lien DataExploration du panneau Summary Statistics', () => {
    cy.get('[id="statistic"] [class="ant-collapse-header"] button').clickAndWait({force: true});
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('HTP').should('exist');
  });

  it('Lien Duo de l\'Access Limitation du panneau Data Access', () => {
    cy.get('[id="data_access"] [class="ant-descriptions-item-content"]').eq(0).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/DUO_0000042');
  });

  it('Lien DataExploration du panneau HTP Whole Blood RNAseq (2020)', () => {
    cy.get('[class*="EntityDataset_panel"]').each(($el: JQuery<HTMLElement>) => {
      if ($el.text().includes('HTP Whole Blood RNAseq (2020)')) {
        cy.wrap($el).as('datasetPanel');
      }
    });

    cy.get('@datasetPanel').find('[class="ant-collapse-header"] button').eq(0).clickAndWait({force: true});
    cy.get('[class*="DataFiles_dataFilesTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Dataset').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('HTP Whole Blood RNAseq (2020)').should('exist');
  });

  it('Lien Publication du panneau HTP Whole Blood RNAseq (2020)', () => {
    cy.get('[class*="EntityDataset_panel"]').each(($el: JQuery<HTMLElement>) => {
      if ($el.text().includes('HTP Whole Blood RNAseq (2020)')) {
        cy.wrap($el).as('datasetPanel');
      }
    });

    cy.get('@datasetPanel').find('[class="ant-descriptions-item-content"]').eq(8).find('[href]')
      .should('have.attr', 'href').and('match', /https:\/\/pubmed.ncbi.nlm.nih.gov\/37379383(|\/)/);
  });

  it('Lien Files de Gene Expression Quantifications du panneau Files', () => {
    cy.get('[id="data_file"] [data-row-key="1"] td[class="ant-table-cell"]').eq(1).find('[href]').clickAndWait({force: true});
    cy.get('[class*="DataFiles_dataFilesTabWrapper"]').should('exist'); // data-cy="ProTable_DataFiles"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Data Type').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('HTP').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Gene Expression Quantifications').should('exist');
  });

  it('Lien Files de RNA-Seq du panneau Files', () => {
    cy.get('[id="data_file"] [data-row-key="0"]').eq(1).find('td[class="ant-table-cell"]').eq(1).find('[href]').clickAndWait({force: true});
    cy.get('[class*="DataFiles_dataFilesTabWrapper"]').should('exist'); // data-cy="ProTable_DataFiles"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Experimental Strategy').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('HTP').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('RNA-Seq').should('exist');
  });
});

describe('Page d\'une étude - Valider les panneaux masquables', () => {
  it('Panneau Summary', () => {
    cy.get('[id="summary"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="summary"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="summary"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="summary"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="summary"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Statistic', () => {
    cy.get('[id="statistic"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="statistic"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="statistic"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="statistic"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="statistic"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Data Access', () => {
    cy.get('[id="data_access"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="data_access"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="data_access"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="data_access"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="data_access"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau HTP Whole Blood RNAseq (2020)', () => {
    cy.get('[class*="EntityDataset_panel"]').each(($el: JQuery<HTMLElement>) => {
      if ($el.text().includes('HTP Whole Blood RNAseq (2020)')) {
        cy.wrap($el).as('datasetPanel');
      }
    });

    cy.get('@datasetPanel').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('@datasetPanel').find('span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('@datasetPanel').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('@datasetPanel').find('span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('@datasetPanel').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Files', () => {
    cy.get('[id="data_file"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="data_file"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="data_file"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="data_file"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="data_file"] div[class*="ant-collapse-content-active"]').should('exist');
  });
});

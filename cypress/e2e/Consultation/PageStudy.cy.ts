/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitStudyEntity('HTP', 1);
});

describe('Page d\'une étude - Valider les redirections', () => {
  it('Participants', () => {
    cy.get('button[class*="SummaryHeader_item"]').eq(0).click({force: true});
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('HTP').should('exist');
  });
  
  it('Biospecimens', () => {
    cy.get('button[class*="SummaryHeader_item"]').eq(1).click({force: true});
    cy.get('[class*="Biospecimens_biospecimenTabWrapper"]').should('exist'); // data-cy="ProTable_Biospecimens"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('HTP').should('exist');
  });
  
  it('Files', () => {
    cy.get('button[class*="SummaryHeader_item"]').eq(2).click({force: true});
    cy.get('[class*="DataFiles_dataFilesTabWrapper"]').should('exist'); // data-cy="ProTable_DataFiles"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('HTP').should('exist');
  });
});

describe('Page d\'une étude - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="EntityTitleLogo_logo"]').find('[src*="study-logo-HTP"]').should('exist');
    cy.get('[class*="EntityTitleLogo_title"]').contains('The Human Trisome Project');
  });

  it('Panneau Summary', () => {
    cy.get('button[class*="SummaryHeader_item"]').eq(0).contains(/\d{1}/);
    cy.get('button[class*="SummaryHeader_item"]').eq(0).contains('Participants');
    cy.get('button[class*="SummaryHeader_item"]').eq(1).contains(/\d{1}/);
    cy.get('button[class*="SummaryHeader_item"]').eq(1).contains('Biospecimens');
    cy.get('button[class*="SummaryHeader_item"]').eq(2).contains(/\d{1}/);
    cy.get('button[class*="SummaryHeader_item"]').eq(2).contains('Files');
    cy.get('[id="summary"]').find('[class="ant-collapse-header"]').contains('Summary').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(0).contains('Study Code').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(0).contains('HTP').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(1).contains('Study Name').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('The Human Trisome Project').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(1).find('[class*="ant-tag-green"]').contains('Harmonized').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(2).contains('Program').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(2).contains('INCLUDE').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(3).contains('dbGaP Accession Number').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(3).contains('phs002330').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(3).contains('phs002981').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(4).contains('Participant Lifespan').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(4).find('[class*="ant-tag-cyan"]').contains('Pediatric').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(4).find('[class*="ant-tag-cyan"]').contains('Adult').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(5).contains('Description').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(5).contains('The Human Trisome Project (HTP) is a large and comprehensive natural history study of Down syndrome involving collection of deep clinical data, multimodal phenotyping, a multi-dimensional biobank, generation of pan-omics datasets, and rapid release of data. The HTP has enabled many discoveries about the pathophysiology of Down syndrome, leading to new clinical trials testing therapies to improve diverse health outcomes in this population.').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(6).contains('Research Domain').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(6).contains('All Co-occurring Conditions').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(7).contains('Clinical Data Source Type').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(7).contains('Investigator Assessment, Medical Record, Participant or Caregiver Report').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(8).contains('Date Collection Start (Year)').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(8).contains('2016').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(9).contains('Date Collection End (Year)').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(9).contains('-').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(10).contains('Selection Criteria').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(10).contains('Ages 6 months to 89 years old, with or without Down syndrome').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(11).contains('Study Design').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(11).contains('Case-control, longitudinal').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(12).contains('Study Website').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(12).contains('https://www.trisome.org').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(13).contains('Publication').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(13).contains('https://pubmed.ncbi.nlm.nih.gov/37379383/').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(13).contains('https://pubmed.ncbi.nlm.nih.gov/37360690').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(13).contains('https://pubmed.ncbi.nlm.nih.gov/37277650').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(13).contains('See more').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(14).contains('Principal Investigator').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(14).contains('Joaquin M. Espinosa').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(15).contains('Institution').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(15).contains('Linda Crnic Institute for Down Syndrome').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(16).contains('Virtual Biorepository Email').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(16).contains('dsresearch@cuanschutz.edu').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-label"]').eq(17).contains('Virtual Biorepository URL').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(17).contains('https://redcap.link/HTPVBRrequest').should('exist');
  });

  it('Panneau Statistic', () => {
    cy.get('[id="statistic"]').find('[class*="EntityStatistics_title"]').contains('Statistic').should('exist');
    cy.get('[id="statistic"]').find('[class="ant-collapse-header"]').contains('Summary Statistics').should('exist');
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
    cy.get('[id="data_access"]').find('[class*="EntityDescriptions_title"]').contains('Data Access').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-collapse-header"]').contains('Data Access').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-label"]').eq(0).contains('Access Limitation').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(0).contains('general research use').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(0).contains('DUO:').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(0).contains('0000042').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-label"]').eq(1).contains('Access Requirement').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(1).contains('-').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-label"]').eq(2).contains('Study Contact').should('exist');
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(2).contains('Angela Rachubinski; dsresearch@cuanschutz.edu').should('exist');
  });

  it('Panneau HTP Whole Blood RNAseq (v1)', () => {
    cy.get('[class*="StudyEntity_datasetTitle"]').contains('Dataset').should('exist');
    cy.get('[class*="StudyEntity_datasetTitle"]').find('[class*="StudyEntity_datasetInfo"]').should('exist');
    cy.get('[class*="EntityDataset_panel"]').eq(0).find('[class="ant-collapse-header"]').contains('HTP Whole Blood RNAseq (v1)').should('exist');
    cy.get('[class*="EntityDataset_panel"]').eq(0).find('[class="ant-collapse-header"]').find('[class*="ant-tag-green"]').contains('Harmonized').should('exist');
    cy.get('[class*="EntityDataset_card"]').eq(0).find('[class="ant-descriptions-item-label"]').eq(0).contains('Dataset ID').should('exist');
    cy.get('[class*="EntityDataset_card"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(0).contains('HTP-TR').should('exist');
    cy.get('[class*="EntityDataset_card"]').eq(0).find('[class="ant-descriptions-item-label"]').eq(1).contains('Data Type').should('exist');
    cy.get('[class*="EntityDataset_card"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(1).find('[class="ant-tag"]').contains('Normalized relative expression (FPKM)').should('exist');
    cy.get('[class*="EntityDataset_card"]').eq(0).find('[class="ant-descriptions-item-label"]').eq(2).contains('Experimental Strategy').should('exist');
    cy.get('[class*="EntityDataset_card"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(2).find('[class="ant-tag"]').contains('Bulk polyA+ RNAseq').should('exist');
    cy.get('[class*="EntityDataset_card"]').eq(0).find('[class="ant-descriptions-item-label"]').eq(3).contains('Experimental Platform').should('exist');
    cy.get('[class*="EntityDataset_card"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(3).contains('Illumina Novaseq').should('exist');
    cy.get('[class*="EntityDataset_card"]').eq(0).find('[class="ant-descriptions-item-label"]').eq(4).contains('Publication').should('exist');
    cy.get('[class*="EntityDataset_card"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(4).contains('PMID: 37379383').should('exist');
    cy.get('[class*="EntityDataset_card"]').eq(0).find('[class="ant-descriptions-item-label"]').eq(5).contains('Repository').should('exist');
    cy.get('[class*="EntityDataset_card"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(5).contains('Gene Expression Omnibus').should('exist');
    cy.get('[class*="EntityDataset_card"]').eq(0).find('[class*="EntityDataset_rowCountCard"]').eq(0).find('g[id="family"]').should('exist');
    cy.get('[class*="EntityDataset_card"]').eq(0).find('[class*="EntityDataset_rowCountCard"]').eq(0).contains(/^402$/).should('exist');
    cy.get('[class*="EntityDataset_card"]').eq(0).find('[class*="EntityDataset_rowCountCard"]').eq(0).contains('Participants').should('exist');
    cy.get('[class*="EntityDataset_card"]').eq(0).find('[class*="EntityDataset_rowCountCard"]').eq(1).find('g[id="file"]').should('exist');
    cy.get('[class*="EntityDataset_card"]').eq(0).find('[class*="EntityDataset_rowCountCard"]').eq(1).contains(/^3200$/).should('exist');
    cy.get('[class*="EntityDataset_card"]').eq(0).find('[class*="EntityDataset_rowCountCard"]').eq(1).contains('Files').should('exist');
  });

  it('Panneau Files', () => {
    cy.get('[id="data_file"]').find('[class*="EntityTable_title"]').contains('File').should('exist');
    cy.get('[id="data_file"]').find('[class="ant-collapse-header"]').contains('Files').should('exist');
    cy.get('[id="data_file"]').find('[class="ant-collapse-header"]').contains('(8,305)').should('exist');
    cy.get('[id="data_file"]').find('[class*="EntityTable_subTitle"]').eq(0).contains('File counts by Data Type').should('exist');
    cy.get('[id="data_file"]').find('[class*="EntityTable_contentTable"]').eq(0).find('thead').find('th[class="ant-table-cell"]').eq(0).contains('Data Type').should('exist');
    cy.get('[id="data_file"]').find('[class*="EntityTable_contentTable"]').eq(0).find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Files').should('exist');
    cy.get('[id="data_file"]').find('[class*="EntityTable_contentTable"]').eq(0).find('thead').find('th[class="ant-table-cell"]').eq(2).contains('(n=8,305)').should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="2"]').find('td[class="ant-table-cell"]').eq(1).contains(/^2,865$/).should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="2"]').find('td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="5"]').find('td[class="ant-table-cell"]').eq(1).contains(/^2,865$/).should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="5"]').find('td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="1"]').find('td[class="ant-table-cell"]').eq(1).contains(/^433$/).should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="1"]').find('td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="8"]').find('td[class="ant-table-cell"]').eq(1).contains(/^433$/).should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="8"]').find('td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="4"]').find('td[class="ant-table-cell"]').eq(1).contains(/^7$/).should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="4"]').find('td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="6"]').find('td[class="ant-table-cell"]').eq(1).contains(/^800$/).should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="6"]').find('td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="3"]').find('td[class="ant-table-cell"]').eq(1).contains(/^477$/).should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="3"]').find('td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="0"]').find('td[class="ant-table-cell"]').eq(1).contains(/^418$/).should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="0"]').find('td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="7"]').find('td[class="ant-table-cell"]').eq(1).contains(/^7$/).should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="7"]').find('td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');

    cy.get('[id="data_file"]').find('[class*="EntityTable_subTitle"]').eq(1).contains('File counts by Experimental Strategy').should('exist');
    cy.get('[id="data_file"]').find('[class*="EntityTable_contentTable"]').eq(1).find('thead').find('th[class="ant-table-cell"]').eq(0).contains('Strategy').should('exist');
    cy.get('[id="data_file"]').find('[class*="EntityTable_contentTable"]').eq(1).find('thead').find('th[class="ant-table-cell"]').eq(1).contains('Files').should('exist');
    cy.get('[id="data_file"]').find('[class*="EntityTable_contentTable"]').eq(1).find('thead').find('th[class="ant-table-cell"]').eq(2).contains('(n=8,305)').should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="1"]').eq(1).find('td[class="ant-table-cell"]').eq(1).contains(/^6,530$/).should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="1"]').eq(1).find('td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="0"]').eq(1).find('td[class="ant-table-cell"]').eq(1).contains(/^880$/).should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="0"]').eq(1).find('td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="2"]').eq(1).find('td[class="ant-table-cell"]').eq(1).contains(/^477$/).should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="2"]').eq(1).find('td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="3"]').eq(1).find('td[class="ant-table-cell"]').eq(1).contains(/^418$/).should('exist');
    cy.get('[id="data_file"]').find('[data-row-key="3"]').eq(1).find('td[class="ant-table-cell"]').eq(2).find('[style*="width: "]').should('exist');
  });
});

describe('Page d\'une étude - Valider les liens disponibles', () => {
  it('Lien dbGaP du panneau Summary', () => {
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(3).find('[href]')
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs002330');
  });

  it('Lien Study Website du panneau Summary', () => {
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(12).find('[href]')
      .should('have.attr', 'href').and('match', /https:\/\/www.trisome.org/);
  });

  it('Lien Publication du panneau Summary', () => {
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(13).find('[href]')
      .should('have.attr', 'href', 'https://pubmed.ncbi.nlm.nih.gov/37379383/');
  });

  it('Lien \'See more\' de Publication du panneau Summary', () => {
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(13).contains('See more').click({force: true});
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(13).contains('https://pubmed.ncbi.nlm.nih.gov/36577365').should('exist');
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(13).contains('See less').click({force: true});
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(13).contains('https://pubmed.ncbi.nlm.nih.gov/36577365').should('not.exist');
  });

  it('Lien Virtual Biorepository Email du panneau Summary', () => {
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(16).find('[href]')
      .should('have.attr', 'href', 'mailto:dsresearch@cuanschutz.edu');
  });

  it('Lien Virtual Biorepository URL du panneau Summary', () => {
    cy.get('[id="summary"]').find('[class="ant-descriptions-item-content"]').eq(17).find('[href]')
      .should('have.attr', 'href', 'https://redcap.link/HTPVBRrequest');
  });

  it('Lien DataExploration du panneau Summary Statistics', () => {
    cy.get('[id="statistic"] [class="ant-collapse-header"] button').click({force: true});
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('HTP').should('exist');
  });

  it('Lien Duo de l\'Access Limitation du panneau Data Access', () => {
    cy.get('[id="data_access"]').find('[class="ant-descriptions-item-content"]').eq(0).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/DUO_0000042');
  });

  it('Lien Publication du panneau HTP Whole Blood RNAseq (v1)', () => {
    cy.get('[class*="EntityDataset_card"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(4).find('[href]')
      .should('have.attr', 'href', 'https://pubmed.ncbi.nlm.nih.gov/37379383');
  });

  it('Lien Repository du panneau HTP Whole Blood RNAseq (v1)', () => {
    cy.get('[class*="EntityDataset_card"]').eq(0).find('[class="ant-descriptions-item-content"]').eq(5).find('[href]')
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE190125');
  });

  it('Lien Files de Gene Expression Quantifications du panneau Files', () => {
    cy.get('[id="data_file"]').find('[data-row-key="2"]').find('td[class="ant-table-cell"]').eq(1).find('[href]').click({force: true});
    cy.get('[class*="DataFiles_dataFilesTabWrapper"]').should('exist'); // data-cy="ProTable_DataFiles"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Data Type').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('HTP').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Gene Expression Quantifications').should('exist');
  });

  it('Lien Files de RNA-Seq du panneau Files', () => {
    cy.get('[id="data_file"]').find('[data-row-key="1"]').eq(1).find('td[class="ant-table-cell"]').eq(1).find('[href]').click({force: true});
    cy.get('[class*="DataFiles_dataFilesTabWrapper"]').should('exist'); // data-cy="ProTable_DataFiles"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Experimental Strategy').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('HTP').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('RNA-Seq').should('exist');
  });
});

describe('Page d\'une étude - Valider les panneaux masquables', () => {
  it('Panneau Summary', () => {
    cy.get('[id="summary"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="summary"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="summary"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="summary"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="summary"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Statistic', () => {
    cy.get('[id="statistic"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="statistic"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="statistic"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="statistic"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="statistic"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Data Access', () => {
    cy.get('[id="data_access"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="data_access"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="data_access"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="data_access"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="data_access"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau HTP Whole Blood RNAseq (v1)', () => {
    cy.get('[class*="EntityDataset_panel"]').eq(0).find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[class*="EntityDataset_panel"]').eq(0).find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[class*="EntityDataset_panel"]').eq(0).find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[class*="EntityDataset_panel"]').eq(0).find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[class*="EntityDataset_panel"]').eq(0).find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Files', () => {
    cy.get('[id="data_file"]').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="data_file"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="data_file"]').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="data_file"]').find('span[class*="ant-collapse-arrow"]').click({force: true});
    cy.get('[id="data_file"]').find('div[class*="ant-collapse-content-active"]').should('exist');
  });
});

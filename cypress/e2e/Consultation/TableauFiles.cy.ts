/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Data Exploration (Data Files) - Vérifier les informations affichées', () => {
  beforeEach(() => {
    cy.visitDataExploration('datafiles', '?sharedFilterId=75272e84-9a2d-4e0b-b69e-fb9e5df63762');
    cy.showColumn('File Name');
    cy.showColumn('Access Url');
  });

  it('Titre', () => {
    cy.get('[class*="DataExploration_title"]').contains('Data Exploration'); // data-cy="Title_DataExploration"
  });

  it('Tableau', () => {
    cy.get('tr[data-row-key="HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_1.fq.gz"] [class*="ant-table-cell"]').eq(1).find('svg[data-icon="lock"]').should('exist');
    cy.get('tr[data-row-key="HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_1.fq.gz"] [class*="ant-table-cell"]').eq(2).contains('C').should('exist');
    cy.get('tr[data-row-key="HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_1.fq.gz"] [class*="ant-table-cell"]').eq(2).find('[class*="ant-tag-geekblue"]').should('exist');
    cy.get('tr[data-row-key="HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_1.fq.gz"] [class*="ant-table-cell"]').eq(3).contains('HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_1.fq.gz').should('exist');
    cy.get('tr[data-row-key="HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_1.fq.gz"] [class*="ant-table-cell"]').eq(4).contains('HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_1.fq.gz').should('exist');
    cy.get('tr[data-row-key="HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_1.fq.gz"] [class*="ant-table-cell"]').eq(5).contains('HTP').should('exist');
    cy.get('tr[data-row-key="HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_1.fq.gz"] [class*="ant-table-cell"]').eq(6).contains('Transcriptomics').should('exist');
    cy.get('tr[data-row-key="HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_1.fq.gz"] [class*="ant-table-cell"]').eq(7).contains('Unaligned Reads').should('exist');
    cy.get('tr[data-row-key="HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_1.fq.gz"] [class*="ant-table-cell"]').eq(8).contains('RNA-Seq').should('exist');
    cy.get('tr[data-row-key="HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_1.fq.gz"] [class*="ant-table-cell"]').eq(9).contains('drs://data.kidsfirstdrc.org/1cd34bd9-d780-47f4-907e-0f04be67ef68').should('exist');
    cy.get('tr[data-row-key="HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_1.fq.gz"] [class*="ant-table-cell"]').eq(10).contains('fastq').should('exist');
    cy.get('tr[data-row-key="HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_1.fq.gz"] [class*="ant-table-cell"]').eq(11).contains('3.13 GB').should('exist');
    cy.get('tr[data-row-key="HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_1.fq.gz"] [class*="ant-table-cell"]').eq(12).contains(/\d{1}/).should('exist');
    cy.get('tr[data-row-key="HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_1.fq.gz"] [class*="ant-table-cell"]').eq(13).contains(/\d{1}/).should('exist');
  });
});

describe('Page Data Exploration (Data Files) - Valider les liens disponibles', () => {
  beforeEach(() => {
    cy.visitDataExploration('datafiles', '?sharedFilterId=75272e84-9a2d-4e0b-b69e-fb9e5df63762');
    cy.showColumn('File Name');
    cy.showColumn('Access Url');
  });

  it('Lien File ID du tableau', () => {
    cy.get('tr[data-row-key="HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_1.fq.gz"] [class*="ant-table-cell"]').eq(3).find('[href]').clickAndWait({force: true});
    cy.get('[id="file-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_1.fq.gz');
  });

  it('Lien Participants du tableau', () => {
    cy.get('tr[data-row-key="HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_1.fq.gz"] [class*="ant-table-cell"]').eq(12).find('[href]').clickAndWait({force: true});
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('HTP.HTP0577A FRRB192320222-1a HWHKMDSXX L1 1.fq.gz').should('exist');
    cy.validateTableResultsCount(/\d{1}/);
  });

  it('Lien Biospecimens du tableau', () => {
    cy.get('tr[data-row-key="HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_1.fq.gz"] [class*="ant-table-cell"]').eq(13).find('[href]').clickAndWait({force: true});
    cy.get('[class*="Biospecimens_biospecimenTabWrapper"]').should('exist'); // data-cy="ProTable_Biospecimens"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('HTP.HTP0577A FRRB192320222-1a HWHKMDSXX L1 1.fq.gz').should('exist');
    cy.validateTableResultsCount(/\d{1}/);
  });
});

describe('Page Data Exploration (Data Files) - Valider les fonctionnalités du tableau', () => {
  beforeEach(() => {
    cy.visitDataExploration('datafiles');
    cy.showColumn('File Name');
    cy.showColumn('Access Url');
  });

  it('Valider les fonctionnalités du tableau - Tri File ID', () => {
    cy.sortTableAndWait('File ID',);
    cy.validateTableFirstRow(/^(?!-).*$/, 3, true);
    cy.sortTableAndIntercept('File ID', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 3, true);
  });

  it('Valider les fonctionnalités du tableau - Tri File Name', () => {
    cy.sortTableAndIntercept('File Name', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 4, true);
    cy.sortTableAndIntercept('File Name', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 4, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Study', () => {
    cy.sortTableAndIntercept('Study', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 5, true);
    cy.sortTableAndIntercept('Study', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 5, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Data Category', () => {
    cy.sortTableAndIntercept('Data Category', 1);
    cy.validateTableFirstRow('Genomics', 6, true);
    cy.sortTableAndIntercept('Data Category', 1);
    cy.validateTableFirstRow('Transcriptomics', 6, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Data Type', () => {
    cy.sortTableAndIntercept('Data Type', 1);
    cy.validateTableFirstRow('-', 7, true);
    cy.sortTableAndIntercept('Data Type', 1);
    cy.validateTableFirstRow('gVCF', 7, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Experimental Strategy', () => {
    cy.sortTableAndIntercept('Experimental Strategy', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 8, true);
    cy.sortTableAndIntercept('Experimental Strategy', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 8, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Access Url', () => {
    cy.sortTableAndIntercept('Access Url', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 9, true);
    cy.sortTableAndIntercept('Access Url', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 9, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Format', () => {
    cy.sortTableAndIntercept('Format', 1);
    cy.validateTableFirstRow('bam', 10, true);
    cy.sortTableAndIntercept('Format', 1);
    cy.validateTableFirstRow('vcf', 10, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Size', () => {
    cy.sortTableAndIntercept('Size', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 11, true);
    cy.sortTableAndIntercept('Size', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 11, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Participants', () => {
    cy.sortTableAndIntercept('Participants', 1);
    cy.validateTableFirstRow(/\d{1}/, 12, true);
    cy.sortTableAndIntercept('Participants', 1);
    cy.validateTableFirstRow(/\d{1}/, 12, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Biospecimens', () => {
    cy.sortTableAndIntercept('Biospecimens', 1);
    cy.validateTableFirstRow(/\d{1}/, 13, true);
    cy.sortTableAndIntercept('Biospecimens', 1);
    cy.validateTableFirstRow(/\d{1}/, 13, true);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndWait('Format');
    cy.sortTableAndWait('Size');
    cy.validateTableFirstRow(/^(?!-).*$/, 11, true);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.get('span[class*="ant-select-selection-item"]').clickAndWait({force: true});
    cy.get('div[class*="ant-select-item-option-content"]').contains('20').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^1$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^20$/).should('exist');
    cy.get('button[type="button"]').contains('Prev.').parent('button').should('be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('be.disabled');

    cy.get('button[type="button"]').contains('Next').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^21$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^40$/).should('exist');
    cy.get('button[type="button"]').contains('Prev.').parent('button').should('not.be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('button[type="button"]').contains('Next').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^41$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^60$/).should('exist');
    cy.get('button[type="button"]').contains('Prev.').parent('button').should('not.be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('button[type="button"]').contains('Prev.').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^21$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^40$/).should('exist');
    cy.get('button[type="button"]').contains('Prev.').parent('button').should('not.be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('button[type="button"]').contains('First').clickAndWait({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^1$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^20$/).should('exist');
    cy.get('button[type="button"]').contains('Prev.').parent('button').should('be.disabled');
    cy.get('button[type="button"]').contains('First').parent('button').should('be.disabled');
  });
});
  
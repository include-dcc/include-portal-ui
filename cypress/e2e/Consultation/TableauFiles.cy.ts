/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Data Exploration (Data Files) - Vérifier les informations affichées', () => {
  beforeEach(() => {
    cy.visitDataExploration('datafiles', '?sharedFilterId=6e01f0aa-b4ac-4769-978a-6d675084fbec');
    cy.showColumn('File Name');
    cy.showColumn('Access Url');
  });

  it('Titre', () => {
    cy.get('[class*="DataExploration_title"]').contains('Data Exploration'); // data-cy="Title_DataExploration"
  });

  it('Tableau', () => {
    cy.get('tr[data-row-key="GF_0A0S5FSA"]').find('[class*="ant-table-cell"]').eq(1).find('svg[data-icon="lock"]').should('exist');
    cy.get('tr[data-row-key="GF_0A0S5FSA"]').find('[class*="ant-table-cell"]').eq(2).contains('C').should('exist');
    cy.get('tr[data-row-key="GF_0A0S5FSA"]').find('[class*="ant-table-cell"]').eq(2).find('[class*="ant-tag-geekblue"]').should('exist');
    cy.get('tr[data-row-key="GF_0A0S5FSA"]').find('[class*="ant-table-cell"]').eq(3).contains('GF_0A0S5FSA').should('exist');
    cy.get('tr[data-row-key="GF_0A0S5FSA"]').find('[class*="ant-table-cell"]').eq(4).contains('47df08f9-1ff7-41e1-ad72-de4acc9db9ef.CGP.filtered.deNovo.vep.vcf.gz').should('exist');
    cy.get('tr[data-row-key="GF_0A0S5FSA"]').find('[class*="ant-table-cell"]').eq(5).contains('DS360-CHD').should('exist');
    cy.get('tr[data-row-key="GF_0A0S5FSA"]').find('[class*="ant-table-cell"]').eq(6).contains('Genomics').should('exist');
    cy.get('tr[data-row-key="GF_0A0S5FSA"]').find('[class*="ant-table-cell"]').eq(7).contains('Variant Calls').should('exist');
    cy.get('tr[data-row-key="GF_0A0S5FSA"]').find('[class*="ant-table-cell"]').eq(8).contains('Whole Genome Sequencing').should('exist');
    cy.get('tr[data-row-key="GF_0A0S5FSA"]').find('[class*="ant-table-cell"]').eq(9).contains('drs://data.kidsfirstdrc.org/aab35c81-391a-46d7-bdf7-a3a9e3c5e512').should('exist');
    cy.get('tr[data-row-key="GF_0A0S5FSA"]').find('[class*="ant-table-cell"]').eq(10).contains(/^vcf$/).should('exist');
    cy.get('tr[data-row-key="GF_0A0S5FSA"]').find('[class*="ant-table-cell"]').eq(11).contains('1.05 GB').should('exist');
    cy.get('tr[data-row-key="GF_0A0S5FSA"]').find('[class*="ant-table-cell"]').eq(12).contains(/^3$/).should('exist');
    cy.get('tr[data-row-key="GF_0A0S5FSA"]').find('[class*="ant-table-cell"]').eq(13).contains(/^3$/).should('exist');
  });
});

describe('Page Data Exploration (Data Files) - Valider les liens disponibles', () => {
  beforeEach(() => {
    cy.visitDataExploration('datafiles', '?sharedFilterId=6e01f0aa-b4ac-4769-978a-6d675084fbec');
    cy.showColumn('File Name');
    cy.showColumn('Access Url');
  });

  it('Lien File ID du tableau', () => {
    cy.get('tr[data-row-key="GF_0A0S5FSA"]').find('[class*="ant-table-cell"]').eq(3).find('[href]').click({force: true});
    cy.get('[id="file-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('GF_0A0S5FSA');
  });

  it('Lien Participants du tableau', () => {
    cy.get('tr[data-row-key="GF_0A0S5FSA"]').find('[class*="ant-table-cell"]').eq(12).find('[href]').click({force: true});
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('GF 0A0S5FSA').should('exist');
    cy.validateTableResultsCount(/^3$/);
  });

  it('Lien Biospecimens du tableau', () => {
    cy.get('tr[data-row-key="GF_0A0S5FSA"]').find('[class*="ant-table-cell"]').eq(13).find('[href]').click({force: true});
    cy.get('[class*="Biospecimens_biospecimenTabWrapper"]').should('exist'); // data-cy="ProTable_Biospecimens"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('File ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('GF 0A0S5FSA').should('exist');
    cy.validateTableResultsCount(/^3$/);
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
    cy.validateTableFirstRow('GF_001CSF26', 3);
    cy.sortTableAndIntercept('File ID', 1);
    cy.validateTableFirstRow('X01-Hakonarson.ff1ffbfc-5677-4f97-a0ec-a3bfeb4af9e4.STAR-1.10.1.fusion_predictions.abridged.coding_effect.tsv', 3);
  });

  it('Valider les fonctionnalités du tableau - Tri File Name', () => {
    cy.sortTableAndIntercept('File Name', 1);
    cy.validateTableFirstRow('0012022d-c855-4087-9dde-c522f0632024.STAR.fusion_predictions.abridged.coding_effect.tsv', 4);
    cy.sortTableAndIntercept('File Name', 1);
    cy.validateTableFirstRow('ffe980c5-245f-4c53-904c-0b7f4ac67e92.g.vcf.gz', 4);
  });

  it('Valider les fonctionnalités du tableau - Tri Study [SJIP-548]', () => {
    cy.sortTableAndIntercept('Study', 1);
    cy.validateTableFirstRow('DS360-CHD', 5);
    cy.sortTableAndIntercept('Study', 1);
    cy.validateTableFirstRow('X01-Hakonarson', 5);
  });

  it('Valider les fonctionnalités du tableau - Tri Data Category', () => {
    cy.sortTableAndIntercept('Data Category', 1);
    cy.validateTableFirstRow('Genomics', 6);
    cy.sortTableAndIntercept('Data Category', 1);
    cy.validateTableFirstRow('Transcriptomics', 6);
  });

  it('Valider les fonctionnalités du tableau - Tri Data Type', () => {
    cy.sortTableAndIntercept('Data Type', 1);
    cy.validateTableFirstRow('-', 7);
    cy.sortTableAndIntercept('Data Type', 1);
    cy.validateTableFirstRow('gVCF', 7);
  });

  it('Valider les fonctionnalités du tableau - Tri Experimental Strategy', () => {
    cy.sortTableAndIntercept('Experimental Strategy', 1);
    cy.validateTableFirstRow('LCMS_Metabolomics', 8);
    cy.sortTableAndIntercept('Experimental Strategy', 1);
    cy.validateTableFirstRow('Whole Genome Sequencing', 8);
  });

  it('Valider les fonctionnalités du tableau - Tri Access Url', () => {
    cy.sortTableAndIntercept('Access Url', 1);
    cy.validateTableFirstRow('drs://cavatica-ga4gh-api.sbgenomics.com/00035407-43f4-45f9-879b-a18e188d5fb1', 9);
    cy.sortTableAndIntercept('Access Url', 1);
    cy.validateTableFirstRow('drs://data.kidsfirstdrc.org/fff6ff01-6bd3-4042-b22f-a340634f71e1', 9);
  });

  it('Valider les fonctionnalités du tableau - Tri Format', () => {
    cy.sortTableAndIntercept('Format', 1);
    cy.validateTableFirstRow('cns', 10);
    cy.sortTableAndIntercept('Format', 1);
    cy.validateTableFirstRow('vcf', 10);
  });

  it('Valider les fonctionnalités du tableau - Tri Size', () => {
    cy.sortTableAndIntercept('Size', 1);
    cy.validateTableFirstRow('105 B', 11);
    cy.sortTableAndIntercept('Size', 1);
    cy.validateTableFirstRow('73.49 GB', 11);
  });

  it('Valider les fonctionnalités du tableau - Tri Participants', () => {
    cy.sortTableAndIntercept('Participants', 1);
    cy.validateTableFirstRow(/^1$/, 12);
    cy.sortTableAndIntercept('Participants', 1);
    cy.validateTableFirstRow(/^3$/, 12);
  });

  it('Valider les fonctionnalités du tableau - Tri Biospecimens', () => {
    cy.sortTableAndIntercept('Biospecimens', 1);
    cy.validateTableFirstRow(/^1$/, 13);
    cy.sortTableAndIntercept('Biospecimens', 1);
    cy.validateTableFirstRow('28', 13);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndWait('Format');
    cy.sortTableAndWait('Size');
    cy.validateTableFirstRow('344.66 KB', 11);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.get('body').find('span[class*="ant-select-selection-item"]').click({force: true});
    cy.get('body').find('div[class*="ant-select-item-option-content"]').contains('20').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^1$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^20$/).should('exist');
    cy.get('body').find('button[type="button"]').contains('Prev.').parent('button').should('be.disabled');
    cy.get('body').find('button[type="button"]').contains('First').parent('button').should('be.disabled');

    cy.get('body').find('button[type="button"]').contains('Next').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^21$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^40$/).should('exist');
    cy.get('body').find('button[type="button"]').contains('Prev.').parent('button').should('not.be.disabled');
    cy.get('body').find('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('body').find('button[type="button"]').contains('Next').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^41$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^60$/).should('exist');
    cy.get('body').find('button[type="button"]').contains('Prev.').parent('button').should('not.be.disabled');
    cy.get('body').find('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('body').find('button[type="button"]').contains('Prev.').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^21$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^40$/).should('exist');
    cy.get('body').find('button[type="button"]').contains('Prev.').parent('button').should('not.be.disabled');
    cy.get('body').find('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('body').find('button[type="button"]').contains('First').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^1$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^20$/).should('exist');
    cy.get('body').find('button[type="button"]').contains('Prev.').parent('button').should('be.disabled');
    cy.get('body').find('button[type="button"]').contains('First').parent('button').should('be.disabled');
  });
});
  
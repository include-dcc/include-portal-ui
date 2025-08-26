/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitDataExplorationFileMock();
  cy.showColumn('File Name');
  cy.showColumn('Dataset');
  cy.showColumn('Access Url');
});

describe('Page Data Exploration (Data Files) - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="DataExploration_title"]').contains('Data Exploration'); // data-cy="Title_DataExploration"
  });

  it('Tableau', () => {
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(1).find('svg[data-icon="lock"]').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(2).contains('R').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(2).find('[class*="ant-tag-green"]').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(3).contains('HTP.HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_1.fq.gz').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(4).contains('HTP0577A_FRRB192320222-1a_HWHKMDSXX_L1_1.fq.gz').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(5).contains('HTP').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(6).contains('HTP Whole Blood RNAseq (2020)').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(7).contains('Transcriptomics').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(8).contains('Unaligned Reads').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(9).contains('RNA-Seq').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(10).contains('drs://data.kidsfirstdrc.org/1cd34bd9-d780-47f4-907e-0f04be67ef68').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(11).contains('fastq').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(12).contains('3.13 GB').should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(13).contains(/\d{1}/).should('exist');
    cy.get('tr[class*="ant-table-row"] [class*="ant-table-cell"]').eq(14).contains(/\d{1}/).should('exist');
  });
});

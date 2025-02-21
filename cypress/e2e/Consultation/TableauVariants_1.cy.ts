/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitVariantsPage('?sharedFilterId=821e14bc-acf4-4566-a89f-5456ffef2032');
  cy.showColumn('CADD');
  cy.showColumn('REVEL');
  cy.showColumn(/^ALT$/);
  cy.showColumn('Homo.');
});

describe('Page des variants - Consultation du tableau', () => {
  it('Vérifier les informations affichées', () => {
    cy.get('tr[data-row-key]').eq(0).find('[class*="ant-table-cell"]').eq(1).contains('chr1:g.108192590T>C').should('exist');
    cy.get('tr[data-row-key]').eq(0).find('[class*="ant-table-cell"]').eq(2).contains('SNV').should('exist');
    cy.get('tr[data-row-key]').eq(0).find('[class*="ant-table-cell"]').eq(3).find('[class*="anticon"]').should('exist');
    cy.get('tr[data-row-key]').eq(0).find('[class*="ant-table-cell"]').eq(4).contains('SLC25A24').should('exist');
    cy.get('tr[data-row-key]').eq(0).find('[class*="ant-table-cell"]').eq(5).find('[class*="moderateImpact"]').should('exist');
    cy.get('tr[data-row-key]').eq(0).find('[class*="ant-table-cell"]').eq(5).contains('Missense').should('exist');
    cy.get('tr[data-row-key]').eq(0).find('[class*="ant-table-cell"]').eq(5).contains('p.Tyr11Cys').should('exist');
    cy.get('tr[data-row-key]').eq(0).find('[class*="ant-table-cell"]').eq(6).contains('-').should('exist');
    cy.get('tr[data-row-key]').eq(0).find('[class*="ant-table-cell"]').eq(7).contains('AD').should('exist');
    cy.get('tr[data-row-key]').eq(0).find('[class*="ant-table-cell"]').eq(7).find('[class*="ant-tag-blue"]').should('exist');
    cy.get('tr[data-row-key]').eq(0).find('[class*="ant-table-cell"]').eq(8).contains(/^B$/).should('exist');
    cy.get('tr[data-row-key]').eq(0).find('[class*="ant-table-cell"]').eq(8).find('[class*="ant-tag-green"]').should('exist');
    cy.get('tr[data-row-key]').eq(0).find('[class*="ant-table-cell"]').eq(9).find('[class*="gnomadIndicatorDefault"]').should('exist');
    cy.get('tr[data-row-key]').eq(0).find('[class*="ant-table-cell"]').eq(9).contains('1.57e-2').should('exist');
    cy.get('tr[data-row-key]').eq(0).find('[class*="ant-table-cell"]').eq(10).contains('2,195').should('exist');
    cy.get('tr[data-row-key]').eq(0).find('[class*="ant-table-cell"]').eq(11).contains('12').should('exist');
    cy.get('tr[data-row-key]').eq(0).find('[class*="ant-table-cell"]').eq(11).contains(/(1.\d{2}e-2)/).should('exist');
    cy.get('tr[data-row-key]').eq(0).find('[class*="ant-table-cell"]').eq(12).contains('2').should('exist');
    cy.get('tr[data-row-key]').eq(0).find('[class*="ant-table-cell"]').eq(13).contains('9.294').should('exist');
    cy.get('tr[data-row-key]').eq(0).find('[class*="ant-table-cell"]').eq(14).contains('0.068').should('exist');
    cy.get('tr[data-row-key]').eq(0).find('[class*="ant-table-cell"]').eq(15).contains('13').should('exist');
    cy.get('tr[data-row-key]').eq(0).find('[class*="ant-table-cell"]').eq(16).contains('1').should('exist');
  });
 
  it('Valider l\'icône de sauvegarde des requêtes personnalisées', () => {
    cy.get('[class*="QueryBar_selected"] [class*="anticon-save"]').should('not.exist');
    cy.get('[class*="QueryBar_selected"] [class*="anticon-copy"]').should('exist');
  });
 
  it('Valider les liens disponibles Lien Variant', () => {
    cy.get('tr[data-row-key]').eq(0).contains('chr1:g.108192590T>C').clickAndWait({force: true});
    cy.get('[class*="EntityTitle"]').contains('chr1:g.108192590T>C');
  });
 
  it('Valider les liens disponibles Lien dbSNP', () => {
    cy.get('tr[data-row-key]').eq(0).find('td').eq(3).find('a[href]')
    .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/snp/rs79735952');
  });
 
  it('Valider les liens disponibles Lien Gène', () => {
    cy.get('tr[data-row-key]').eq(0).find('td').eq(4).find('a[href]')
    .should('have.attr', 'href', 'https://www.omim.org/entry/608744');
  });
 
  it('Valider les liens disponibles Lien Gene Plus', () => {
    cy.get('tr[data-row-key]').eq(0).find('td').eq(4).find('[data-icon="plus"]').clickAndWait({force: true});
    cy.validatePillSelectedQuery('Genes Symbol', ['SLC25A24']);
  });
 
  it('Valider les liens disponibles Lien OMIM', () => {
    cy.get('tr[data-row-key]').eq(0).find('td').eq(7).find('a[href]')
      .should('have.attr', 'href', 'https://www.omim.org/entry/608744');
  });
 
  it('Valider les liens disponibles Lien ClinVar', () => {
    cy.get('tr[data-row-key]').eq(0).find('td').eq(8).find('a[href]')
    .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/clinvar/variation/1267873');
  });
 
  it('Valider les liens disponibles Lien Part.', () => {
    cy.get('[id="query-builder-header-tools"] [data-icon="plus"]').clickAndWait({force: true});
    cy.sortTableAndIntercept('Part.', 1);
    cy.sortTableAndIntercept('Part.', 1);
    cy.get('tr[data-row-key]').eq(0).find('td').eq(11).find('a[href]').clickAndWait({force: true});
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('PT').should('exist');
  });
 
  it('Valider les liens disponibles Lien Studies', () => {
    cy.get('tr[data-row-key]').eq(0).find('td').eq(12).find('a[href]').clickAndWait({force: true});
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('DS360-CHD').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('DS-COG-ALL').should('exist');
  });
});

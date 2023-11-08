/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitStudiesPage();
});

describe('Page des études - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="Studies_title"]').contains('Studies'); // data-cy="Title_Studies"
  });

  it('Tableau', () => {
    cy.get('tr[data-row-key="JbW7XYsBRqsooo59rXHs"]').find('[class="ant-table-cell"]').eq(0).contains('DS360-CHD').should('exist');
    cy.get('tr[data-row-key="JbW7XYsBRqsooo59rXHs"]').find('[class="ant-table-cell"]').eq(1).contains('INCLUDE: (Sherman) Genomic Analysis of Congenital Heart Defects and Acute Lymphoblastic Leukemia in Children with Down Syndrome').should('exist');
    cy.get('tr[data-row-key="JbW7XYsBRqsooo59rXHs"]').find('[class="ant-table-cell"]').eq(2).contains('INCLUDE/KF').should('exist');
    cy.get('tr[data-row-key="JbW7XYsBRqsooo59rXHs"]').find('[class="ant-table-cell"]').eq(3).contains('phs002330').should('exist');
    cy.get('tr[data-row-key="JbW7XYsBRqsooo59rXHs"]').find('[class="ant-table-cell"]').eq(4).contains('1,332').should('exist');
    cy.get('tr[data-row-key="JbW7XYsBRqsooo59rXHs"]').find('[class="ant-table-cell"]').eq(5).contains('271').should('exist');
    cy.get('tr[data-row-key="JbW7XYsBRqsooo59rXHs"]').find('[class="ant-table-cell"]').eq(6).contains('1,351').should('exist');
    cy.get('tr[data-row-key="JbW7XYsBRqsooo59rXHs"]').find('[class="ant-table-cell"]').eq(7).find('[data-icon="check"]').should('exist');
    cy.get('tr[data-row-key="JbW7XYsBRqsooo59rXHs"]').find('[class="ant-table-cell"]').eq(8).contains('-').should('exist');
    cy.get('tr[data-row-key="JbW7XYsBRqsooo59rXHs"]').find('[class="ant-table-cell"]').eq(9).contains('-').should('exist');
    cy.get('tr[data-row-key="JbW7XYsBRqsooo59rXHs"]').find('[class="ant-table-cell"]').eq(9).contains('-').should('exist');
    cy.get('tr[data-row-key="JbW7XYsBRqsooo59rXHs"]').find('[class="ant-table-cell"]').eq(10).contains('-').should('exist');
  });
});

describe('Page des études - Valider les liens disponibles', () => {
  it('Lien Code du tableau', () => {
    cy.get('tr[data-row-key="JbW7XYsBRqsooo59rXHs"]').find('[class="ant-table-cell"]').eq(0).find('[href]')
      .should('have.attr', 'href', 'https://includedcc.org/studies/gmkf-ds-x01');
  });

  it('Lien dbGap du tableau', () => {
    cy.get('tr[data-row-key="JbW7XYsBRqsooo59rXHs"]').find('[class="ant-table-cell"]').eq(3).find('[href]')
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs002330');
  });

  it('Lien Participants du tableau', () => {
    cy.get('tr[data-row-key="JbW7XYsBRqsooo59rXHs"]').find('[class="ant-table-cell"]').eq(4).find('[href]').click({force: true});
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('DS360-CHD').should('exist');
  });

  it('Lien Biospecimens du tableau', () => {
    cy.get('tr[data-row-key="JbW7XYsBRqsooo59rXHs"]').find('[class="ant-table-cell"]').eq(6).find('[href]').click({force: true});
    cy.get('[class*="Biospecimens_biospecimenTabWrapper"]').should('exist'); // data-cy="ProTable_Biospecimens"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('DS360-CHD').should('exist');
  });
});

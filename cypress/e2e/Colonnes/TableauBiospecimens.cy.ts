/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitDataExplorationBiospecimenMock();
});

describe('Page Data Exploration (Biospecimens) - Colonnes du tableau', () => {
  it('Valider l\'affichage (par défaut/optionnel) et l\'ordre des colonnes', () => {
    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(1)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Sample ID').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(2)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Study').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(3)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Sample Type').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(4)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Parent Sample ID').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(5)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Parent Sample Type').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(6)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Participant ID').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(7)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Collection ID').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(8)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Collection Sample Type').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(9)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Container ID').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(10)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Age').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('External Sample ID').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(11)
      .contains('External Sample ID').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('Volume').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(12)
      .contains('Volume').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('Volume Unit').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(13)
      .contains('Volume Unit').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(11)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Sample Availability').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('Laboratory Procedure').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(15)
      .contains('Laboratory Procedure').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('Biospecimen Storage').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(16)
      .contains('Biospecimen Storage').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(12)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Files').should('exist');
  });

  it('Masquer une colonne affichée', () => {
    cy.get('thead[class="ant-table-thead"]')
      .contains('Parent Sample ID').should('exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Parent Sample ID')
      .find('[type="checkbox"]').uncheck({force: true});

    cy.get('thead[class="ant-table-thead"]')
      .contains('Parent Sample ID').should('not.exist');
  });

  it('Afficher une colonne masquée', () => {
    cy.get('thead[class="ant-table-thead"]')
      .contains('External Sample ID').should('not.exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('External Sample ID')
      .find('[type="checkbox"]').check({force: true});

    cy.get('thead[class="ant-table-thead"]')
      .contains('External Sample ID').should('exist');
  });
});
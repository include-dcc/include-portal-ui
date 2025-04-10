/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitParticipantEntity('pt-0dxdyebh');
  cy.get('[id="biospecimen"] [data-node-key="table"]').clickAndWait({force: true});
  cy.resetColumns('biospecimen');
});

describe('Page d\'un participant - Colonnes du tableau Biospecimens', () => {
  it('Valider l\'affichage (par défaut/optionnel) et l\'ordre des colonnes', () => {
    cy.get('[id="biospecimen"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(0)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Sample ID').should('exist');
    
    cy.get('[id="biospecimen"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(1)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Collection ID').should('exist');
  
    cy.get('[id="biospecimen"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(2)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Container ID').should('exist');

    cy.get('[id="biospecimen"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(3)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Sample Type').should('exist');

    cy.get('[id="biospecimen"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(4)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Collection Sample Type').should('exist');

    cy.get('[id="biospecimen"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(5)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Age').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('Volume').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(7)
      .contains('Volume').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('Volume Unit').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(8)
      .contains('Volume Unit').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('Sample Availability').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(9)
      .contains('Sample Availability').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('Laboratory Procedure').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(10)
      .contains('Laboratory Procedure').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('Biospecimen Storage').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(11)
      .contains('Biospecimen Storage').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('Parent Sample ID').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(12)
      .contains('Parent Sample ID').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('Parent Sample Type').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(13)
      .contains('Parent Sample Type').should('exist');
  });

  it('Masquer une colonne affichée', () => {
    cy.get('thead[class="ant-table-thead"]')
      .contains('Collection ID').should('exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Collection ID')
      .find('[type="checkbox"]').uncheck({force: true});

    cy.get('thead[class="ant-table-thead"]')
      .contains('Collection ID').should('not.exist');
  });

  it('Afficher une colonne masquée', () => {
    cy.get('thead[class="ant-table-thead"]')
      .contains('Volume Unit').should('not.exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Volume Unit')
      .find('[type="checkbox"]').check({force: true});

    cy.get('thead[class="ant-table-thead"]')
      .contains('Volume Unit').should('exist');
  });
});

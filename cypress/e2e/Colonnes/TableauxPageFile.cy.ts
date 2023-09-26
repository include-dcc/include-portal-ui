/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page d\'un fichier - Colonnes du tableau Participants-Samples', () => {
  beforeEach(() => {
    cy.visitFileEntity('GF_0A0S5FSA');
    cy.resetColumns('participant-sample');
  });

  it('Valider l\'affichage (par défaut/optionnel) et l\'ordre des colonnes', () => {
    cy.get('[id="participant-sample"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(0)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Participant ID').should('exist');
    
    cy.get('[id="participant-sample"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(1)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Study').should('exist');

    cy.get('[id="participant-sample"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(2)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Down Syndrome Status').should('exist');
  
    cy.get('[id="participant-sample"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(3)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Sample ID').should('exist');

    cy.get('[id="participant-sample"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(4)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Sample Type').should('exist');

    cy.get('[id="participant-sample"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(5)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Collection ID').should('exist');

    cy.get('[id="participant-sample"]')
      .find('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(6)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Collection Sample Type').should('exist');
  });

  it('Masquer/Afficher une colonne affichée', () => {
    cy.get('[id="participant-sample"]')
      .find('thead[class="ant-table-thead"]')
      .contains('Participant ID').should('exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Participant ID')
      .find('[type="checkbox"]').uncheck({force: true});

    cy.get('[id="participant-sample"]')
      .find('thead[class="ant-table-thead"]')
      .contains('Participant ID').should('not.exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Participant ID')
      .find('[type="checkbox"]').check({force: true});

    cy.get('[id="participant-sample"]')
      .find('thead[class="ant-table-thead"]')
      .contains('Participant ID').should('exist');
  });
});
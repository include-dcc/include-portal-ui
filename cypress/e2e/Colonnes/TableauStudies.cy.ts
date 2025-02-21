/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitStudiesPage();
});

describe('Page des études - Colonnes du tableau', () => {
  it('Valider l\'affichage (par défaut/optionnel) et l\'ordre des colonnes', () => {
    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(0)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .find('[role="img"]')
      .should('have.class', 'anticon-audit');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(1)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Code').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(2)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Name').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(3)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Program').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(4)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Domain').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(5)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('dbGaP').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(6)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Participants').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(7)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Families').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(8)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Biospecimen').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(9)
      .should('have.class', 'ant-table-column-has-sorters')
      .contains('Files').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(10)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Gen.').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(11)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Trans.').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(12)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Prot.').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(13)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Imm. Map').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .find('th[class*="ant-table-cell"]').eq(14)
      .should('not.have.class', 'ant-table-column-has-sorters')
      .contains('Meta.').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('Description').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(16)
      .contains('Description').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('Participant Lifespan').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(17)
      .contains('Participant Lifespan').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('Data Source').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(18)
      .contains('Data Source').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('Design').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(19)
      .contains('Design').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('Principal Investigator').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(20)
      .contains('Principal Investigator').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('Start').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(21)
      .contains('Start').should('exist');

    cy.get('thead[class="ant-table-thead"]')
      .contains('End').should('not.exist');
    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').eq(22)
      .contains('End').should('exist');
  });

  it('Masquer une colonne affichée', () => {
    cy.get('thead[class="ant-table-thead"]')
      .contains('Code').should('exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Code')
      .find('[type="checkbox"]').uncheck({force: true});

    cy.get('thead[class="ant-table-thead"]')
      .contains('Code').should('not.exist');
  });

  it('Afficher une colonne masquée', () => {
    cy.get('thead[class="ant-table-thead"]')
      .contains('Description').should('not.exist');

    cy.get('div[class="ant-popover-inner"]')
      .find('div[class="ant-space-item"]').contains('Description')
      .find('[type="checkbox"]').check({force: true});

    cy.get('thead[class="ant-table-thead"]')
      .contains('Description').should('exist');
  });
});
/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitStudyEntity('HTP', 1);
});

describe('Page d\'une étude - Valider les panneaux masquables', () => {
  it('Panneau Summary', () => {
    cy.get('[id="summary"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="summary"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="summary"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="summary"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="summary"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Statistic', () => {
    cy.get('[id="statistic"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="statistic"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="statistic"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="statistic"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="statistic"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Data Access', () => {
    cy.get('[id="data_access"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="data_access"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="data_access"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="data_access"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="data_access"] div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau HTP Whole Blood RNAseq (2020)', () => {
    cy.get('[class*="EntityDataset_panel"]').each(($el: JQuery<HTMLElement>) => {
      if ($el.text().includes('HTP Whole Blood RNAseq (2020)')) {
        cy.wrap($el).as('datasetPanel');
      }
    });

    cy.get('@datasetPanel').find('div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('@datasetPanel').find('span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('@datasetPanel').find('div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('@datasetPanel').find('span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('@datasetPanel').find('div[class*="ant-collapse-content-active"]').should('exist');
  });

  it('Panneau Files', () => {
    cy.get('[id="data_file"] div[class*="ant-collapse-content-active"]').should('exist');
    cy.get('[id="data_file"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="data_file"] div[class*="ant-collapse-content-inactive ant-collapse-content-hidden"]').should('exist');
    cy.get('[id="data_file"] span[class*="ant-collapse-arrow"]').clickAndWait({force: true});
    cy.get('[id="data_file"] div[class*="ant-collapse-content-active"]').should('exist');
  });
});

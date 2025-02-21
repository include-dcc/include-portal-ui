/// <reference types="cypress"/>
import '../../support/commands';
import { getDateTime } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitStudyEntity('HTP', 1);
  cy.get('[class*="EntityDataset_panel"]').each(($el: JQuery<HTMLElement>) => {
    if ($el.text().includes('HTP WGS (2021 X01)')) {
      cy.wrap($el).as('datasetPanel');
    }
  });
});

describe('Dataset Unharmonized d\'une étude - Bouton Manifest', () => {
  it('Vérifier les informations affichées - Modal', () => {
    cy.get('[class*="EntityDataset_panel"]').each(($el: JQuery<HTMLElement>) => {
      if ($el.text().includes('HTP Mass Cytometry (2020)')) {
        cy.wrap($el).as('datasetPanel');
      }
    });

    cy.get('@datasetPanel').find('[class="ant-collapse-header"]').contains('Manifest').should('not.exist');
  });
});

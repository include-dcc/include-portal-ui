/// <reference types="cypress"/>
import '../../support/commands';
import { getDateTime } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitStudyEntity('HTP', 1);
});

describe('Dataset Unharmonized d\'une étude - Bouton Manifest', () => {
  it('Vérifier les informations affichées - Modal [SJIP-1291]', () => {
    cy.get('[id="HTP-WGS-2021-X01"] [class="ant-collapse-header"]').contains('Manifest').should('not.exist');
  });
});

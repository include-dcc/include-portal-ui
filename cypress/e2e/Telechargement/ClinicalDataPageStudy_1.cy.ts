/// <reference types="cypress"/>
import '../../support/commands';
import { getDateTime, oneMinute } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitStudyEntity('DS-NEXUS', 1);
  cy.get('[class*="EntityTitle"] button[class*="ant-dropdown-trigger"]').click({force: true});
  cy.clickAndIntercept('[data-menu-id*="-clinicalData"]', 'POST', '**/file-manifest', 1);
  cy.waitUntilFile(oneMinute);
});

describe('Page d\'une étude - Télécharger le clinical data', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName(`include_clinicalData_${strDate.slice(0, 4)}${strDate.slice(4, 6)}${strDate.slice(6, 8)}T*.xlsx`);
  });

  it('Valider le contenu du fichier', () => {
    cy.validateXlsxFileContent('DownloadClinicalDataStudy.json');
  });
});

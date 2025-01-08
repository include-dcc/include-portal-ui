/// <reference types="cypress"/>
import '../../support/commands';
import { getDateTime, oneMinute } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitParticipantEntity('pt-as0aepqm');
  cy.get('[class*="EntityTitle"] button[class*="ant-dropdown-trigger"]').click({force: true});
});

describe('Page d\'un participant - Télécharger le clinical data', () => {
  beforeEach(() => {
    cy.clickAndIntercept('[data-menu-id*="-clinicalData"]', 'POST', '**/file-manifest', 1);
    cy.waitUntilFile(oneMinute);
  });

  it('Valider le nom du fichier', () => {
    cy.validateFileName(`include_clinicalData_${strDate.slice(0, 4)}${strDate.slice(4, 6)}${strDate.slice(6, 8)}T*.xlsx`);
  });

  it('Valider le contenu du fichier [SJIP-1164]', () => {
    cy.validateXlsxFileContent('DownloadClinicalData.json');
  });
});

describe('Page d\'un participant - Télécharger le clinical data (family)', () => {
  beforeEach(() => {
    cy.clickAndIntercept('[data-menu-id*="-familyClinicalData"]', 'POST', '**/file-manifest', 1);
    cy.waitUntilFile(oneMinute);
  });

  it('Valider le nom du fichier', () => {
    cy.validateFileName(`include_familyClinicalData_${strDate.slice(0, 4)}${strDate.slice(4, 6)}${strDate.slice(6, 8)}T*.xlsx`);
  });

  it('Valider le contenu du fichier [SJIP-1164]', () => {
    cy.validateXlsxFileContent('DownloadClinicalDataFamily.json');
  });
});

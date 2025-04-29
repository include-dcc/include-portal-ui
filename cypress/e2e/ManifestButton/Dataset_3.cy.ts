/// <reference types="cypress"/>
import '../../support/commands';
import { getDateTime, oneMinute } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitStudyEntity('HTP', 1);
  cy.get('[id="HTP-WGS-2021-X01"] [class="ant-collapse-header"] button[class*="ant-btn-default "]').eq(1).click({force: true});
  cy.clickAndIntercept('[class="ant-modal-footer"] button[class*="ant-btn-primary"]', 'POST', '**/file-manifest', 1);
  cy.waitUntilFile(oneMinute);
});

describe('Dataset d\'une étude - Télécharger le manifest', {retries: {runMode: 0}}, () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName('include_HTP-WGS-2021-X01_manifest_'+`${strDate.slice(0, 4)}${strDate.slice(4, 6)}${strDate.slice(6, 8)}`+'T*.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('DownloadManifestDataset.json');
  });

  it('Valider le contenu du fichier [SJIP-967]', () => {
    cy.validateFileContent('DownloadManifestDataset.json');
  });
});

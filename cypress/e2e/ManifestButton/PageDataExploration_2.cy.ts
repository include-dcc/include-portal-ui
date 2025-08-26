/// <reference types="cypress"/>
import '../../support/commands';
import { oneMinute } from '../../support/utils';

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitDataExplorationFileMock();
  cy.get('div[role="tabpanel"] [class*="ant-table-row"] [type="checkbox"]').check({force: true});

  cy.fixture('ResponseBody/FileManifestStats.json').then((mockResponseBody) => {
    cy.intercept('POST', '**/reports/file-manifest/stats', (req) => {
      req.alias = 'postStats';
      req.reply(mockResponseBody);
    });
    cy.get('[class*="Header_ProTableHeader"] button[class*="ant-btn-default"]').eq(1).click({force: true});
    cy.wait('@postStats');
  });

  cy.fixture('ResponseBody/FileManifestDownload.tsv').then((mockResponseBody) => {
    cy.intercept('POST', '**/reports/file-manifest', (req) => {
      req.alias = 'postManifest';
      req.reply({
        statusCode: 200,
        headers: {
          'content-type': 'text/tab-separated-values',
          'content-disposition': 'attachment; filename="include_manifest_mock.tsv"'
        },
        body: mockResponseBody
      });
    });
    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-primary"]').click({force: true});
    cy.wait('@postManifest');
  });

  cy.waitUntilFile(oneMinute);
});

describe('Page Data Exploration (Data Files) - Télécharger le manifest', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName('include_manifest_mock.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('DownloadManifestMock.json');
  });

  it('Valider le contenu du fichier', () => {
    cy.validateFileContent('DownloadManifestMock.json');
  });
});

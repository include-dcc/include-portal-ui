/// <reference types="cypress"/>
import '../../support/commands';
import { getDateTime, oneMinute } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitStudyEntityMock();

  cy.fixture('ResponseBody/FileManifestStats.json').then((mockResponseBody) => {
    cy.intercept('POST', '**/reports/file-manifest/stats', (req) => {
      req.alias = 'postStats';
      req.reply(mockResponseBody);
    });
    cy.get('[id="HTP-WGS-2021-X01"] [class="ant-collapse-header"] button[class*="ant-btn-default "]').eq(1).click({force: true});
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

describe('Dataset d\'une étude - Télécharger le manifest', () => {
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

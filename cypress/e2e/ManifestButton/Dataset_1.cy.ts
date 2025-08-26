/// <reference types="cypress"/>
import '../../support/commands';
import { oneMinute } from '../../support/utils';

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
});

describe('Dataset d\'une étude - Bouton Manifest', () => {
  it('Vérifier les informations affichées - Modal', () => {
    cy.get('[class="ant-modal-title"]').contains('File manifest').should('exist');
    cy.get('[class="ant-modal-body"]').contains('Download a manifest of the selected files which can be used for bulk downloading using Cavatica’s ').should('exist');
    cy.get('[class="ant-modal-body"]').contains('Import from an GA4GH Data Repository Service (DRS)').should('exist');
    cy.get('[class="ant-modal-body"]').contains('. This manifest also includes additional information, including the participant and samples associated with these files.').should('exist');
    cy.get('[class="ant-modal-body"]').contains('related family members').should('not.exist');
    cy.get('[class*="DownloadFileManifestModal_table"] thead th').eq(0).contains('Data Type').should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] thead th').eq(1).contains('Participants').should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] thead th').eq(2).contains('Files').should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] thead th').eq(3).contains('Size').should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Unaligned Reads"] td').eq(0).contains('Unaligned Reads').should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Unaligned Reads"] td').eq(1).contains(/^1$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Unaligned Reads"] td').eq(2).contains(/^1$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Unaligned Reads"] td').eq(3).contains(/^3.13 GB$/).should('exist');

    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-default"]').contains('Cancel').should('exist');
    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-primary"]').contains('Download').should('exist');
  });

  it('Valider les liens disponibles - Lien Documentation', () => {
    cy.get('[class="ant-modal-body"] a').should('have.attr', 'href', 'https://docs.cavatica.org/docs/import-from-a-drs-server');
  });

  it('Valider les fonctionnalités - Bouton Cancel', () => {
    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-default"]').click({force: true});
    cy.get('[class*="DownloadFileManifestModal_modal"]').should('have.css', 'display', 'none');
    cy.wait(5000);
    cy.task('fileExists', `${Cypress.config('downloadsFolder')}`).then((exists) => {
      assert.isTrue(!exists);
    });
  });

  it('Valider les fonctionnalités - Bouton Download', () => {
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

    cy.get('[class*="DownloadFileManifestModal_modal"]').should('have.css', 'display', 'none');
    cy.waitUntilFile(oneMinute);
    cy.validateFileName('*.tsv');
  });
});

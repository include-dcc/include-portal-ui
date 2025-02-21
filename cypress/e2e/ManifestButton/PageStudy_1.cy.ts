/// <reference types="cypress"/>
import '../../support/commands';
import { getDateTime, oneMinute } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitStudyEntity('DS-NEXUS', 1);
  cy.get('[class*="EntityTitleLogo"] button[class*="ant-btn-primary"]').click({force: true});
});

describe('Page d\'une étude - Bouton Manifest', {retries: {runMode: 0}}, () => {
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
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="gVCF"] td').eq(0).contains('gVCF').should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="gVCF"] td').eq(1).contains(/^41$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="gVCF"] td').eq(2).contains(/^41$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="gVCF"] td').eq(3).contains(/^196.08 GB$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Simple Nucleotide Variations"] td').eq(0).contains('Simple Nucleotide Variations').should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Simple Nucleotide Variations"] td').eq(1).contains(/^82$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Simple Nucleotide Variations"] td').eq(2).contains(/^82$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Simple Nucleotide Variations"] td').eq(3).contains(/^99.11 GB$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Aligned Reads"] td').eq(0).contains('Aligned Reads').should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Aligned Reads"] td').eq(1).contains(/^41$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Aligned Reads"] td').eq(2).contains(/^41$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Aligned Reads"] td').eq(3).contains(/^705.31 GB$/).should('exist');

    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-default"]').contains('Cancel').should('exist');
    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-primary"]').contains('Download').should('exist');
  });

  it('Valider les liens disponibles - Lien Documentation', () => {
    cy.get('[class="ant-modal-body"] a').should('have.attr', 'href', 'https://docs.cavatica.org/docs/import-from-a-drs-server');
  });

  it('Valider les fonctionnalités - Bouton Cancel', () => {
    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-default"]').click({force: true});
    cy.get('[class*="DownloadFileManifestModal_modal"]').should('have.css', 'display', 'none');
    cy.task('fileExists', `${Cypress.config('downloadsFolder')}`).then((exists) => {
      assert.isTrue(!exists);
    });
  });

  it('Valider les fonctionnalités - Bouton Download', () => {
    cy.clickAndIntercept('[class="ant-modal-footer"] button[class*="ant-btn-primary"]', 'POST', '**/file-manifest', 1);
    cy.get('[class*="DownloadFileManifestModal_modal"]').should('have.css', 'display', 'none');
    cy.waitUntilFile(oneMinute);
    cy.validateFileName('*.tsv');
  });
});

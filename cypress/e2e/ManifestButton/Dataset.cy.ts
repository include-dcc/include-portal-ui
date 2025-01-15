/// <reference types="cypress"/>
import '../../support/commands';
import { getDateTime, oneMinute } from '../../support/utils';

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

describe('Dataset d\'une étude - Bouton Manifest', {retries: {runMode: 0}}, () => {
  beforeEach(() => {
    cy.get('@datasetPanel').find('[class="ant-collapse-header"] button[class*="ant-btn-default "]').eq(1).click({force: true});
  });

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
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="gVCF"] td').eq(1).contains(/^19$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="gVCF"] td').eq(2).contains(/^19$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="gVCF"] td').eq(3).contains(/^117.64 GB$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Variant Calls"] td').eq(0).contains('Variant Calls').should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Variant Calls"] td').eq(1).contains(/^19$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Variant Calls"] td').eq(2).contains(/^19$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Variant Calls"] td').eq(3).contains(/^31.11 GB$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Aligned Reads"] td').eq(0).contains('Aligned Reads').should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Aligned Reads"] td').eq(1).contains(/^19$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Aligned Reads"] td').eq(2).contains(/^19$/).should('exist');
    cy.get('[class*="DownloadFileManifestModal_table"] [data-row-key="Aligned Reads"] td').eq(3).contains(/^322.68 GB$/).should('exist');

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

describe('Dataset d\'une étude - Télécharger le manifest', {retries: {runMode: 0}}, () => {
  beforeEach(() => {
    cy.get('@datasetPanel').find('[class="ant-collapse-header"] button[class*="ant-btn-default "]').eq(1).click({force: true});
    cy.clickAndIntercept('[class="ant-modal-footer"] button[class*="ant-btn-primary"]', 'POST', '**/file-manifest', 1);
    cy.waitUntilFile(oneMinute);
  });

  it('Valider le nom du fichier [SJIP-1186]', () => {
    cy.validateFileName('include_HTP WGS (2021 X01)_manifest_'+`${strDate.slice(0, 4)}${strDate.slice(4, 6)}${strDate.slice(6, 8)}`+'T*.tsv');
  });

  it('Valider les en-têtes du fichier', () => {
    cy.validateFileHeaders('DownloadManifestDataset.json');
  });

  it('Valider le contenu du fichier [SJIP-967]', () => {
    cy.validateFileContent('DownloadManifestDataset.json');
  });
});

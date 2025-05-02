/// <reference types="cypress"/>
import '../../support/commands';
import { getDateTime, oneMinute } from '../../support/utils';

const { strDate } = getDateTime();

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitDataExploration('participants', '?sharedFilterId=75272e84-9a2d-4e0b-b69e-fb9e5df63762');
  cy.get('div[role="tabpanel"] [class*="ant-table-row"]').eq(0).find('[type="checkbox"]').check({force: true});
  cy.get('[class*="Header_ProTableHeader"] button[class*="ant-dropdown-trigger"]').eq(1).click({force: true});
  cy.clickAndIntercept('[data-menu-id*="-clinicalData"]', 'POST', '**/file-manifest', 1);
  cy.waitUntilFile(oneMinute);
});

describe('Page Data Exploration (Participants) - Télécharger le clinical data', () => {
  it('Valider le nom du fichier', () => {
    cy.validateFileName(`include_clinicalData_${strDate.slice(0, 4)}${strDate.slice(4, 6)}${strDate.slice(6, 8)}T*.xlsx`);
  });

  it('Valider le contenu du fichier', () => {
    cy.validateXlsxFileContent('DownloadClinicalData.json');
  });
});

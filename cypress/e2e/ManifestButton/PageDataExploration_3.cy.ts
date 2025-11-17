/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.removeFilesFromFolder(Cypress.config('downloadsFolder'));

  cy.login();
  cy.visitDataExplorationFileMock();
  cy.get('div[role="tabpanel"] [class*="ant-table-row"] [type="checkbox"]').check({force: true});
});

describe('Page Data Exploration (Data Files) - Api', () => {
  it('Valider la demande envoyée - Bouton Manifest', () => {
    cy.intercept('POST', '**/reports/file-manifest/stats', (req) => {
      req.alias = 'postStats';
    });
    cy.get('[class*="Header_ProTableHeader"] button[class*="ant-btn-default"]').eq(1).click({force: true});
    cy.wait('@postStats').then((interception) => {
      cy.fixture('RequestBody/FileManifestStats.json').then((expectedRequestBody) => {
        const actualBody = { ...interception.request.body };
        const expectedBody = { ...expectedRequestBody };

        actualBody.sqon.id = 'IGNORED_ID';
        expectedBody.sqon.id = 'IGNORED_ID';

        expect(actualBody).to.deep.equal(expectedBody);
      });
    });
  });

  it('Valider la réponse reçue - Bouton Manifest', () => {
    cy.fixture('RequestBody/FileManifestStats.json').then((mockRequestBody) => {
      cy.intercept('POST', '**/reports/file-manifest/stats', (req) => {
        req.alias = 'postStats';
        req.body = mockRequestBody;
      });
      cy.fixture('ResponseBody/FileManifestStats.json').then((expectedResponseBody) => {
        cy.get('[class*="Header_ProTableHeader"] button[class*="ant-btn-default"]').eq(1).click({force: true});
        cy.wait('@postStats').then((interception) => {
          expect(interception.response?.body).to.deep.equal(expectedResponseBody);
        });
      });
    });
  });

  it('Valider la demande envoyée - Bouton Download', () => {
    cy.fixture('ResponseBody/FileManifestStats.json').then((mockResponseBody) => {
      cy.intercept('POST', '**/reports/file-manifest/stats', (req) => {
        req.alias = 'postStats';
        req.reply(mockResponseBody);
      });
      cy.get('[class*="Header_ProTableHeader"] button[class*="ant-btn-default"]').eq(1).click({force: true});
      cy.wait('@postStats');
    });

    cy.intercept('POST', '**/reports/file-manifest', (req) => {
      req.alias = 'postManifest';
    });
    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-primary"]').click({force: true});
    cy.wait('@postManifest').then((interception) => {
      cy.fixture('RequestBody/FileManifestDownload.json').then((expectedRequestBody) => {
        const actualBody = { ...interception.request.body };
        const expectedBody = { ...expectedRequestBody };

        actualBody.sqon.id = 'IGNORED_ID';
        expectedBody.sqon.id = 'IGNORED_ID';
        actualBody.filename = actualBody.filename.replace(/_\d{8}T\d{6}Z$/, '_TIMESTAMP');

        expect(actualBody).to.deep.equal(expectedBody);
      });
    });
  });

  it('Valider la réponse reçue - Bouton Download', () => {
    cy.fixture('ResponseBody/FileManifestStats.json').then((mockResponseBody) => {
      cy.intercept('POST', '**/reports/file-manifest/stats', (req) => {
        req.alias = 'postStats';
        req.reply(mockResponseBody);
      });
      cy.get('[class*="Header_ProTableHeader"] button[class*="ant-btn-default"]').eq(1).click({force: true});
      cy.wait('@postStats');
    });

    cy.fixture('RequestBody/FileManifestDownload.json').then((mockRequestBody) => {
      cy.intercept('POST', '**/reports/file-manifest', (req) => {
        req.alias = 'postManifest';
        req.body = mockRequestBody;
      });
      cy.fixture('ResponseBody/FileManifestDownload.tsv').then((expectedResponseBody) => {
        cy.get('[class="ant-modal-footer"] button[class*="ant-btn-primary"]').click({force: true});
        cy.wait('@postManifest').then((interception) => {
          expect(interception.response?.body).to.deep.equal(expectedResponseBody);
        });
      });
    });
  });

  it('Valider la demande envoyée - Bouton Download (checkbox)', () => {
    cy.fixture('ResponseBody/FileManifestStats.json').then((mockResponseBody) => {
      cy.intercept('POST', '**/reports/file-manifest/stats', (req) => {
        req.alias = 'postStats';
        req.reply(mockResponseBody);
      });
      cy.get('[class*="Header_ProTableHeader"] button[class*="ant-btn-default"]').eq(1).click({force: true});
      cy.wait('@postStats');
    });

    cy.intercept('POST', '**/reports/file-manifest', (req) => {
      req.alias = 'postManifest';
    });
    cy.get('[class="ant-modal-body"] input[type="checkbox"]').check({force: true});
    cy.get('[class="ant-modal-footer"] button[class*="ant-btn-primary"]').click({force: true});
    cy.wait('@postManifest').then((interception) => {
      cy.fixture('RequestBody/FileManifestDownload.json').then((expectedRequestBody) => {
        const actualBody = { ...interception.request.body };
        const expectedBody = { ...expectedRequestBody };

        actualBody.sqon.id = 'IGNORED_ID';
        expectedBody.sqon.id = 'IGNORED_ID';
        actualBody.filename = actualBody.filename.replace(/_\d{8}T\d{6}Z$/, '_TIMESTAMP');
        expectedBody.filename = 'include_familyManifest_TIMESTAMP';
        expectedBody.withFamily = true;

        expect(actualBody).to.deep.equal(expectedBody);
      });
    });
  });

  it('Valider la réponse reçue - Bouton Download (checkbox)', () => {
    cy.fixture('ResponseBody/FileManifestStats.json').then((mockResponseBody) => {
      cy.intercept('POST', '**/reports/file-manifest/stats', (req) => {
        req.alias = 'postStats';
        req.reply(mockResponseBody);
      });
      cy.get('[class*="Header_ProTableHeader"] button[class*="ant-btn-default"]').eq(1).click({force: true});
      cy.wait('@postStats');
    });

    cy.fixture('RequestBody/FileManifestDownload.json').then((mockRequestBody) => {
      cy.intercept('POST', '**/reports/file-manifest', (req) => {
        const mockBody = { ...mockRequestBody };
        mockBody.withFamily = true;
        req.alias = 'postManifest';
        req.body = mockBody;
      });
      cy.get('[class="ant-modal-body"] input[type="checkbox"]').check({force: true});
      cy.get('[class="ant-modal-footer"] button[class*="ant-btn-primary"]').click({force: true});
      cy.wait('@postManifest').then((interception) => {
        const nbLines = interception.response?.body.split('\n').filter((line: string) => line.trim() !== '');
        expect(nbLines).to.have.length(2);
      });
    });
  });
});

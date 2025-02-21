/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitDataExploration('participants', '?sharedFilterId=75272e84-9a2d-4e0b-b69e-fb9e5df63762');
  cy.showColumn('Race');
  cy.showColumn('Ethnicity');
  cy.showColumn('Age');
  cy.showColumn('External Participant ID');
  cy.showColumn('Family Unit');
  cy.showColumn('Condition (Source Text)');
});

describe('Page Data Exploration (Participants) - Valider les liens disponibles', () => {
  it('Lien Participant du tableau', () => {
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(1).find('[href]').clickAndWait({force: true});
    cy.get('[id="participant-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('pt-as0aepqm');
  });

  it('Lien dbGap du tableau', () => {
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(3).find('[href]')
      .should('have.attr', 'href').and('match', /https:\/\/www\.ncbi\.nlm\.nih\.gov\/projects\/gap\/cgi-bin\/study\.cgi\?study_id\=(phs002330|phs002981)/);
  });

  it('Lien \'See more\' de Condition (Source Text) du tableau', () => {
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(11).contains('See more').clickAndWait({force: true});
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(11).contains('Complete trisomy 21').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(11).contains('See less').clickAndWait({force: true});
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(11).contains('Complete trisomy 21').should('not.exist');
  });

  it('Lien Mondo de Diagnosis (MONDO) du tableau', () => {
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(12).find('[href]')
      .should('have.attr', 'href').and('match', /http:\/\/purl\.obolibrary\.org\/obo\/MONDO_(0005420|0005453|0006664|0006559|0700030|0005083)/);
  });

  it('Lien \'See more\' de Diagnosis (MONDO) du tableau', () => {
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(12).contains('See more').clickAndWait({force: true});
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(12).contains('Complete trisomy 21').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(12).contains('See less').clickAndWait({force: true});
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(12).contains('Complete trisomy 21').should('not.exist');
  });

  it('Lien HP de Phenotype (HPO) du tableau', () => {
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(13).find('[href]')
      .should(($element) => {
        const hrefValue = $element.attr('href');
        const strHrefValue : string = hrefValue !== undefined ? hrefValue : "";
        const regex = /http:\/\/purl\.obolibrary\.org\/obo\/HP_00/;
        assert.match(strHrefValue, regex);
      });
  });
  
  it('Lien \'See more\' de Phenotype (HPO) du tableau', () => {
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(13).contains('See more').clickAndWait({force: true});
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(13).contains('Acne inversa').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(13).contains('See less').clickAndWait({force: true});
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(13).contains('Acne inversa').should('not.exist');
  });

  it('Lien Biospecimens du tableau', () => {
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(14).find('[href]').clickAndWait({force: true});
    cy.get('[class*="Biospecimens_biospecimenTabWrapper"]').should('exist'); // data-cy="ProTable_Biospecimens"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Pt-as0aepqm').should('exist');
    cy.validateTableResultsCount(/\d{1}/);
  });

  it('Lien Files du tableau', () => {
    cy.get('tr[data-row-key="pt-as0aepqm"] [class*="ant-table-cell"]').eq(15).find('[href]').clickAndWait({force: true});
    cy.get('[class*="DataFiles_dataFilesTabWrapper"]').should('exist'); // data-cy="ProTable_DataFiles"
    cy.get('[class*="QueryBar_selected"] [class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"] [class*="QueryValues_value"]').contains('Pt-as0aepqm').should('exist');
    cy.validateTableResultsCount(/\d{1}/);
  });
});

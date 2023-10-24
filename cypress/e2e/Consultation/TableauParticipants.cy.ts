/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Data Exploration (Participants) - Vérifier les informations affichées', () => {
  beforeEach(() => {
    cy.visitDataExploration('participants', '?sharedFilterId=6e01f0aa-b4ac-4769-978a-6d675084fbec');
    cy.showColumn('Race');
    cy.showColumn('Ethnicity');
    cy.showColumn('External Participant ID');
    cy.showColumn('Family Unit');
    cy.showColumn('Condition (Source Text)');
  });

  it('Titre', () => {
    cy.get('[class*="DataExploration_title"]').contains('Data Exploration'); // data-cy="Title_DataExploration"
  });

  it('Tableau', () => {
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(1).contains('PT_QWWDKAXP').should('exist');
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(2).contains('DS360-CHD').should('exist');
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(3).contains('phs002330').should('exist');
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(4).contains('T21').should('exist');
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(5).contains('Female').should('exist');
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(5).find('[class*="ant-tag-magenta"]').should('exist');
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(6).contains('White').should('exist');
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(7).contains('Not Hispanic or Latino').should('exist');
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(8).contains('SSHCC10038_00').should('exist');
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(9).contains('Trio').should('exist');
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(10).contains('complete atrioventricular canal').should('exist');
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(10).contains('See more').should('exist');
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(11).contains('Complete atrioventricular canal').should('exist');
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(11).contains('MONDO:').should('exist');
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(11).contains('0015273').should('exist');
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(11).contains('See more').should('exist');
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(12).contains('Complete atrioventricular canal defect').should('exist');
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(12).contains('HP:').should('exist');
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(12).contains('0001674').should('exist');
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(12).contains('See more').should('exist');
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(13).contains(/^1$/).should('exist');
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(14).contains(/^5$/).should('exist');
  });
});

describe('Page Data Exploration (Participants) - Valider les liens disponibles', () => {
  beforeEach(() => {
    cy.visitDataExploration('participants', '?sharedFilterId=6e01f0aa-b4ac-4769-978a-6d675084fbec');
    cy.showColumn('Race');
    cy.showColumn('Ethnicity');
    cy.showColumn('External Participant ID');
    cy.showColumn('Family Unit');
    cy.showColumn('Condition (Source Text)');
  });

  it('Lien Participant du tableau', () => {
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(1).find('[href]').click({force: true});
    cy.get('[id="participant-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('PT_QWWDKAXP');
  });

  it.skip('Lien dbGap du tableau', () => {
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class="ant-table-cell"]').eq(3).find('[href]')
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs002330');
  });

  it('Lien \'See more\' de Condition (Source Text) du tableau', () => {
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(10).contains('See more').click({force: true});
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(10).contains('Down syndrome').should('exist');
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(10).contains('See less').click({force: true});
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(10).contains('Down syndrome').should('not.exist');
  });

  it('Lien Mondo de Diagnosis (MONDO) du tableau', () => {
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(11).find('[href]')
      .should('have.attr', 'href', 'http://purl.obolibrary.org/obo/MONDO_0015273');
  });

  it('Lien \'See more\' de Diagnosis (MONDO) du tableau', () => {
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(11).contains('See more').click({force: true});
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(11).contains('Down syndrome').should('exist');
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(11).contains('See less').click({force: true});
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(11).contains('Down syndrome').should('not.exist');
  });

  it('Lien HP de Phenotype (HPO) du tableau', () => {
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(12).find('[href]')
      .should(($element) => {
        const hrefValue = $element.attr('href');
        const regex = /http:\/\/purl\.obolibrary\.org\/obo\/HP_00/;
        expect(hrefValue).to.match(regex);
      });
  });
  
  it('Lien \'See more\' de Phenotype (HPO) du tableau', () => {
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(12).contains('See more').click({force: true});
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(12).contains('Atrioventricular canal defect').should('exist');
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(12).contains('See less').click({force: true});
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(12).contains('Atrioventricular canal defect').should('not.exist');
  });

  it('Lien Biospecimens du tableau', () => {
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(13).find('[href]').click({force: true});
    cy.get('[class*="Biospecimens_biospecimenTabWrapper"]').should('exist'); // data-cy="ProTable_Biospecimens"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('PT QWWDKAXP').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^1$/).should('exist');
  });

  it('Lien Files du tableau', () => {
    cy.get('tr[data-row-key="PT_QWWDKAXP"]').find('[class*="ant-table-cell"]').eq(14).find('[href]').click({force: true});
    cy.get('[class*="DataFiles_dataFilesTabWrapper"]').should('exist'); // data-cy="ProTable_DataFiles"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('PT QWWDKAXP').should('exist');
    cy.get('div[class*="Header_ProTableHeader"]').contains(/^5$/).should('exist');
  });
});

describe('Page Data Exploration (Participants) - Valider les fonctionnalités du tableau', () => {
  beforeEach(() => {
    cy.visitDataExploration('participants');
    cy.showColumn('Race');
    cy.showColumn('Ethnicity');
    cy.showColumn('External Participant ID');
    cy.showColumn('Family Unit');
    cy.showColumn('Condition (Source Text)');
  });

  it('Valider les fonctionnalités du tableau - Tri Participant ID', () => {
    cy.sortTableAndWait('Participant ID');
    cy.validateTableFirstRow('pt-005x8br9', 1);
    cy.sortTableAndIntercept('Participant ID', 1);
    cy.validateTableFirstRow('PT_ZZWHYVYD', 1);
  });

  it('Valider les fonctionnalités du tableau - Tri Study [SJIP-548]', () => {
    cy.sortTableAndIntercept('Study', 1);
    cy.validateTableFirstRow('DS360-CHD', 2);
    cy.sortTableAndIntercept('Study', 1);
    cy.validateTableFirstRow('X01-deSmith', 2);
  });

  it('Valider les fonctionnalités du tableau - Tri DS Status', () => {
    cy.sortTableAndIntercept('DS Status', 1);
    cy.validateTableFirstRow('D21', 4);
    cy.sortTableAndIntercept('DS Status', 1);
    cy.validateTableFirstRow('T21', 4);
  });

  it('Valider les fonctionnalités du tableau - Tri Sex', () => {
    cy.sortTableAndIntercept('Sex', 1);
    cy.validateTableFirstRow('Female', 5);
    cy.sortTableAndIntercept('Sex', 1);
    cy.validateTableFirstRow('Unknown', 5);
  });

  it('Valider les fonctionnalités du tableau - Tri Race', () => {
    cy.sortTableAndIntercept('Race', 1);
    cy.validateTableFirstRow('-', 6);
    cy.sortTableAndIntercept('Race', 1);
    cy.validateTableFirstRow('other', 6);
  });

  it('Valider les fonctionnalités du tableau - Tri Ethnicity', () => {
    cy.sortTableAndIntercept('Ethnicity', 1);
    cy.validateTableFirstRow('-', 7);
    cy.sortTableAndIntercept('Ethnicity', 1);
    cy.validateTableFirstRow('Not Hispanic or Latino', 7);
  });

  it('Valider les fonctionnalités du tableau - Tri External Participant ID', () => {
    cy.sortTableAndIntercept('External Participant ID', 1);
    cy.validateTableFirstRow('1030', 8);
    cy.sortTableAndIntercept('External Participant ID', 1);
    cy.validateTableFirstRow('SSHYY10031_20', 8);
  });

  it('Valider les fonctionnalités du tableau - Tri Family Unit', () => {
    cy.sortTableAndIntercept('Family Unit', 1);
    cy.validateTableFirstRow('-', 9);
    cy.sortTableAndIntercept('Family Unit', 1);
    cy.validateTableFirstRow('Trio+', 9);
  });

  it('Valider les fonctionnalités du tableau - Tri Biospecimens', () => {
    cy.sortTableAndIntercept('Biospecimens', 1);
    cy.validateTableFirstRow(/^0$/, 13);
    cy.sortTableAndIntercept('Biospecimens', 1);
    cy.validateTableFirstRow('319', 13);
  });

  it('Valider les fonctionnalités du tableau - Tri Files', () => {
    cy.sortTableAndIntercept('Files', 1);
    cy.validateTableFirstRow(/^0$/, 14);
    cy.sortTableAndIntercept('Files', 1);
    cy.validateTableFirstRow('39', 14);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndIntercept('Sex', 1);
    cy.sortTableAndWait('Participant ID');
    cy.sortTableAndIntercept('Participant ID', 1);
    cy.validateTableFirstRow('PT_ZYMJG2MH', 1);
  });

  it('Valider les fonctionnalités du tableau - Pagination', () => {
    cy.get('body').find('span[class*="ant-select-selection-item"]').click({force: true});
    cy.get('body').find('div[class*="ant-select-item-option-content"]').contains('20').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^1$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^20$/).should('exist');
    cy.get('body').find('button[type="button"]').contains('Prev.').parent('button').should('be.disabled');
    cy.get('body').find('button[type="button"]').contains('First').parent('button').should('be.disabled');

    cy.get('body').find('button[type="button"]').contains('Next').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^21$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^40$/).should('exist');
    cy.get('body').find('button[type="button"]').contains('Prev.').parent('button').should('not.be.disabled');
    cy.get('body').find('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('body').find('button[type="button"]').contains('Next').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^41$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^60$/).should('exist');
    cy.get('body').find('button[type="button"]').contains('Prev.').parent('button').should('not.be.disabled');
    cy.get('body').find('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('body').find('button[type="button"]').contains('Prev.').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^21$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^40$/).should('exist');
    cy.get('body').find('button[type="button"]').contains('Prev.').parent('button').should('not.be.disabled');
    cy.get('body').find('button[type="button"]').contains('First').parent('button').should('not.be.disabled');

    cy.get('body').find('button[type="button"]').contains('First').click({force: true});
    cy.get('div[class*="ProTableHeader"]').contains(/^1$/).should('exist');
    cy.get('div[class*="ProTableHeader"]').contains(/^20$/).should('exist');
    cy.get('body').find('button[type="button"]').contains('Prev.').parent('button').should('be.disabled');
    cy.get('body').find('button[type="button"]').contains('First').parent('button').should('be.disabled');
  });
});
  
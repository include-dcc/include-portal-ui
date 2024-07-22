/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
});

describe('Page Data Exploration (Participants) - Vérifier les informations affichées', () => {
  beforeEach(() => {
    cy.visitDataExploration('participants', '?sharedFilterId=75272e84-9a2d-4e0b-b69e-fb9e5df63762');
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
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(1).contains('pt-as0aepqm').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(2).contains('HTP').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(3).contains(/(phs002330|-)/).should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(4).contains('T21').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(5).contains('Female').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(5).find('[class*="ant-tag-magenta"]').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(6).contains('White').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(7).contains('Not Hispanic or Latino').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(8).contains('HTP0577').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(9).contains('Proband-only').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(10).contains(/(Hypothyroidism|Atrial septal defect \(ASD\)|Congenital heart defect \(CHD\) - any|Hidradenitis suppurativa|Psoriasis|Complete trisomy 21)/).should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(10).contains('See more').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(11).contains(/(Hypothyroidism|Atrial septal defect|Congenital heart disease|Hidradenitis suppurativa|Psoriasis|Complete trisomy 21)/).should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(11).contains('MONDO:').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(11).contains(/(0005420|0006664|0005453|0006559|0005083|0700030)/).should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(11).contains('See more').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(12).contains(/(Abnormal heart morphology|Acne inversa|Atrial septal defect|Hypothyroidism|Psoriasiform dermatitis)/).should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(12).contains('HP:').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(12).contains(/(0001627|0040154|0001631|0000821|0003765)/).should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(12).contains('See more').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(13).contains(/\d{1}/).should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(14).contains(/\d{1}/).should('exist');
  });
});

describe('Page Data Exploration (Participants) - Valider les liens disponibles', () => {
  beforeEach(() => {
    cy.visitDataExploration('participants', '?sharedFilterId=75272e84-9a2d-4e0b-b69e-fb9e5df63762');
    cy.showColumn('Race');
    cy.showColumn('Ethnicity');
    cy.showColumn('External Participant ID');
    cy.showColumn('Family Unit');
    cy.showColumn('Condition (Source Text)');
  });

  it('Lien Participant du tableau', () => {
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(1).find('[href]').click({force: true});
    cy.get('[id="participant-entity-page"]').should('exist');
    cy.get('[class*="EntityTitle"]').contains('pt-as0aepqm');
  });

  // Ne fonctionne pas pour une raison inconnue
  it.skip('Lien dbGap du tableau', () => {
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class="ant-table-cell"]').eq(3).invoke('text').then((invokeText) => {
      if (!invokeText.includes('-')) {
        cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class="ant-table-cell"]').eq(3).find('[href]')
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs002330');
      };
    });
  });

  it('Lien \'See more\' de Condition (Source Text) du tableau', () => {
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(10).contains('See more').click({force: true});
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(10).contains('Complete trisomy 21').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(10).contains('See less').click({force: true});
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(10).contains('Complete trisomy 21').should('not.exist');
  });

  it('Lien Mondo de Diagnosis (MONDO) du tableau', () => {
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(11).find('[href]')
      .should('have.attr', 'href').and('match', /http:\/\/purl\.obolibrary\.org\/obo\/MONDO_(0005420|0005453|0006664|0006559|0700030|0005083)/);
  });

  it('Lien \'See more\' de Diagnosis (MONDO) du tableau', () => {
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(11).contains('See more').click({force: true});
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(11).contains('Complete trisomy 21').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(11).contains('See less').click({force: true});
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(11).contains('Complete trisomy 21').should('not.exist');
  });

  it('Lien HP de Phenotype (HPO) du tableau', () => {
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(12).find('[href]')
      .should(($element) => {
        const hrefValue = $element.attr('href');
        const regex = /http:\/\/purl\.obolibrary\.org\/obo\/HP_00/;
        expect(hrefValue).to.match(regex);
      });
  });
  
  it('Lien \'See more\' de Phenotype (HPO) du tableau', () => {
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(12).contains('See more').click({force: true});
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(12).contains('Acne inversa').should('exist');
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(12).contains('See less').click({force: true});
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(12).contains('Acne inversa').should('not.exist');
  });

  it('Lien Biospecimens du tableau', () => {
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(13).find('[href]').click({force: true});
    cy.get('[class*="Biospecimens_biospecimenTabWrapper"]').should('exist'); // data-cy="ProTable_Biospecimens"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Pt-as0aepqm').should('exist');
    cy.validateTableResultsCount(/\d{1}/);
  });

  it('Lien Files du tableau', () => {
    cy.get('tr[data-row-key="pt-as0aepqm"]').find('[class*="ant-table-cell"]').eq(14).find('[href]').click({force: true});
    cy.get('[class*="DataFiles_dataFilesTabWrapper"]').should('exist'); // data-cy="ProTable_DataFiles"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Participant ID').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('Pt-as0aepqm').should('exist');
    cy.validateTableResultsCount(/\d{1}/);
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
    cy.validateTableFirstRow(/^(?!-).*$/, 1, true);
    cy.sortTableAndIntercept('Participant ID', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 1, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Study', () => {
    cy.sortTableAndIntercept('Study', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 2, true);
    cy.sortTableAndIntercept('Study', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 2, true);
  });

  it('Valider les fonctionnalités du tableau - Tri DS Status', () => {
    cy.sortTableAndIntercept('DS Status', 1);
    cy.validateTableFirstRow('D21', 4, true);
    cy.sortTableAndIntercept('DS Status', 1);
    cy.validateTableFirstRow('T21', 4, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Sex', () => {
    cy.sortTableAndIntercept('Sex', 1);
    cy.validateTableFirstRow('Female', 5, true);
    cy.sortTableAndIntercept('Sex', 1);
    cy.validateTableFirstRow('Unknown', 5, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Race', () => {
    cy.sortTableAndIntercept('Race', 1);
    cy.validateTableFirstRow('American Indian or Alaska Native', 6, true);
    cy.sortTableAndIntercept('Race', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 6, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Ethnicity', () => {
    cy.sortTableAndIntercept('Ethnicity', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 7, true);
    cy.sortTableAndIntercept('Ethnicity', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 7, true);
  });

  it('Valider les fonctionnalités du tableau - Tri External Participant ID', () => {
    cy.sortTableAndIntercept('External Participant ID', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 8, true);
    cy.sortTableAndIntercept('External Participant ID', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 8, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Family Unit', () => {
    cy.sortTableAndIntercept('Family Unit', 1);
    cy.validateTableFirstRow('-', 9, true);
    cy.sortTableAndIntercept('Family Unit', 1);
    cy.validateTableFirstRow('Trio+', 9, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Biospecimens', () => {
    cy.sortTableAndIntercept('Biospecimens', 1);
    cy.validateTableFirstRow(/\d{1}/, 13, true);
    cy.sortTableAndIntercept('Biospecimens', 1);
    cy.validateTableFirstRow(/\d{1}/, 13, true);
  });

  it('Valider les fonctionnalités du tableau - Tri Files', () => {
    cy.sortTableAndWait('Files');
    cy.validateTableFirstRow(/\d{1}/, 14, true);
    cy.sortTableAndWait('Files');
    cy.validateTableFirstRow(/\d{1}/, 14, true);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.sortTableAndIntercept('Sex', 1);
    cy.sortTableAndWait('Participant ID');
    cy.sortTableAndIntercept('Participant ID', 1);
    cy.validateTableFirstRow(/^(?!-).*$/, 1, true);
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
  
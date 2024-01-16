/// <reference types="Cypress" />
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.visitStudiesPage();
});

describe('Page des études - Vérifier les informations affichées', () => {
  it('Titre', () => {
    cy.get('[class*="Studies_title"]').contains('Studies'); // data-cy="Title_Studies"
  });

  it('Tableau', () => {
    cy.get('tr[data-row-key="HTP"]').find('[class="ant-table-cell"]').eq(0).contains('HTP').should('exist');
    cy.get('tr[data-row-key="HTP"]').find('[class="ant-table-cell"]').eq(1).contains('Crnic Institute Human Trisome Project').should('exist');
    cy.get('tr[data-row-key="HTP"]').find('[class="ant-table-cell"]').eq(2).contains('INCLUDE').should('exist');
    cy.get('tr[data-row-key="HTP"]').find('[class="ant-table-cell"]').eq(3).contains('phs002330').should('exist');
    cy.get('tr[data-row-key="HTP"]').find('[class="ant-table-cell"]').eq(4).contains('1,055').should('exist');
    cy.get('tr[data-row-key="HTP"]').find('[class="ant-table-cell"]').eq(5).contains('164').should('exist');
    cy.get('tr[data-row-key="HTP"]').find('[class="ant-table-cell"]').eq(6).contains('39,203').should('exist');
    cy.get('tr[data-row-key="HTP"]').find('[class="ant-table-cell"]').eq(7).find('[data-icon="check"]').should('exist');
    cy.get('tr[data-row-key="HTP"]').find('[class="ant-table-cell"]').eq(8).find('[data-icon="check"]').should('exist');
    cy.get('tr[data-row-key="HTP"]').find('[class="ant-table-cell"]').eq(9).find('[data-icon="check"]').should('exist');
    cy.get('tr[data-row-key="HTP"]').find('[class="ant-table-cell"]').eq(10).contains('-').should('exist');
    cy.get('tr[data-row-key="HTP"]').find('[class="ant-table-cell"]').eq(11).find('[data-icon="check"]').should('exist');
  });
});

describe('Page des études - Valider les liens disponibles', () => {
  it('Lien Code du tableau', () => {
    cy.get('tr[data-row-key="HTP"]').find('[class="ant-table-cell"]').eq(0).find('[href]')
      .should('have.attr', 'href', 'https://includedcc.org/studies/human-trisome-project');
  });

  it('Lien dbGap du tableau', () => {
    cy.get('tr[data-row-key="HTP"]').find('[class="ant-table-cell"]').eq(3).find('[href]')
      .should('have.attr', 'href', 'https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs002330');
  });

  it('Lien Participants du tableau', () => {
    cy.get('tr[data-row-key="HTP"]').find('[class="ant-table-cell"]').eq(4).find('[href]').click({force: true});
    cy.get('[class*="Participants_participantTabWrapper"]').should('exist'); // data-cy="ProTable_Participants"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('HTP').should('exist');
  });

  it('Lien Biospecimens du tableau', () => {
    cy.get('tr[data-row-key="HTP"]').find('[class="ant-table-cell"]').eq(6).find('[href]').click({force: true});
    cy.get('[class*="Biospecimens_biospecimenTabWrapper"]').should('exist'); // data-cy="ProTable_Biospecimens"
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryPill_field"]').contains('Study Code').should('exist');
    cy.get('[class*="QueryBar_selected"]').find('[class*="QueryValues_value"]').contains('HTP').should('exist');
  });
});


describe('Page des études - Consultation du tableau', () => {
  it('Valider les fonctionnalités du tableau - Tri Code', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndWait('Code');
    cy.validateTableFirstRow('ABC-DS', 0);
    cy.sortTableAndIntercept('Code', 1);
    cy.validateTableFirstRow('X01-deSmith', 0);
  });

  it('Valider les fonctionnalités du tableau - Tri Name', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('Name', 1);
    cy.validateTableFirstRow('Alzheimer\'s Biomarker Consortium - Down Syndrome', 1);
    cy.sortTableAndIntercept('Name', 1);
    cy.validateTableFirstRow('The epidemiology of transient leukemia in newborns with Down syndrome', 1);
  });

  it('Valider les fonctionnalités du tableau - Tri dbGaP', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('dbGaP', 1);
    cy.validateTableFirstRow('-', 3);
    cy.sortTableAndIntercept('dbGaP', 1);
    cy.validateTableFirstRow('phs002983', 3);
  });

  it('Valider les fonctionnalités du tableau - Tri Participants', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('Participants', 1);
    cy.validateTableFirstRow(/^41$/, 4);
    cy.sortTableAndIntercept('Participants', 1);
    cy.validateTableFirstRow('3,484', 4);
  });

  it('Valider les fonctionnalités du tableau - Tri Families', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('Families', 1);
    cy.validateTableFirstRow('-', 5);
    cy.sortTableAndIntercept('Families', 1);
    cy.validateTableFirstRow('312', 5);
  });

  it('Valider les fonctionnalités du tableau - Tri Biospecimens', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('Biospecimens', 1);
    cy.validateTableFirstRow(/^0$/, 6);
    cy.sortTableAndIntercept('Biospecimens', 1);
    cy.validateTableFirstRow('39,203', 6);
  });

  it('Valider les fonctionnalités du tableau - Tri multiple', () => {
    cy.waitWhileSpin(2000);

    cy.sortTableAndIntercept('Families', 1);
    cy.sortTableAndIntercept('Biospecimens', 1);
    cy.sortTableAndIntercept('Biospecimens', 1);
    cy.validateTableFirstRow('DS-COG-ALL', 0);
  });
});
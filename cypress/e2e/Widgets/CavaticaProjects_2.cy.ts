/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.login();
  cy.intercept('GET', '**/cavatica/authenticated', {
    statusCode: 200,
    body: {
      "authenticated": true,
      "expiration": 1722180513
    },
  }).as('cavaticaAuthenticated');
  cy.intercept('GET', '**/cavatica2/v2/projects', {
    statusCode: 200,
    body: {
      "href": "https://cavatica-api.sbgenomics.com/v2/projects?offset=0&limit=50",
      "items": [
          {
              "href": "https://cavatica-api.sbgenomics.com/v2/projects/mock/cypress-project",
              "id": "mock/cypress-project",
              "name": "Cypress-Project",
              "category": "PRIVATE",
              "created_by": "mock",
              "created_on": "2024-07-05T00:00:00Z",
              "modified_on": "2024-07-05T00:00:00Z"
          }
      ],
      "links": []
  },
  }).as('cavaticaProjects');

  cy.visitDashboard();
  cy.wait('@cavaticaAuthenticated');
  cy.wait('@cavaticaProjects');
});

describe('Page Dashboard - Widget Cavatica Projects (connecté)', () => {
  it('Vérifier les informations affichées - Header', () => {
    cy.get('[class*="DashboardCards_dashboardCard"]').each(($el: JQuery<HTMLElement>) => {
      if ($el.text().includes('Cavatica Projects')) {
        cy.wrap($el).find('[class*="widget_authenticatedHeader"]').as('authenticatedHeader');
      }
    });
    cy.get('@authenticatedHeader').contains('You are connected to the Cavatica cloud environment.').should('exist');
    cy.get('@authenticatedHeader').find('button').contains('Disconnect').should('exist');
  });

  it('Vérifier les informations affichées - Projet', () => {
      cy.get('[class*="DashboardCards_dashboardCard"]').each(($el: JQuery<HTMLElement>) => {
        if ($el.text().includes('Cavatica Projects')) {
          cy.wrap($el).as('cavaticaCard');
        }
      });
  
      cy.get('@cavaticaCard').find('[class*="widget_list"] [href="https://cavatica.sbgenomics.com/u/mock/cypress-project"]').contains('Cypress-Project').should('exist');
      cy.get('@cavaticaCard').find('[class*="widget_list"] [class="anticon"]').should('exist');
      cy.get('@cavaticaCard').find('[class*="widget_list"] [data-icon="team"]').should('exist');
      cy.get('@cavaticaCard').find('[class*="widget_list"]').contains('member').should('exist');
    });

  it('Vérifier les informations affichées - Footer', () => {
    cy.get('[class*="DashboardCards_dashboardCard"]').each(($el: JQuery<HTMLElement>) => {
      if ($el.text().includes('Cavatica Projects')) {
        cy.wrap($el).find('[class*="widget_contentFooter"]').as('cavaticaFooter');
      }
    });

    cy.get('@cavaticaFooter').find('button').contains('New project').should('exist');
  });

  it('Valider les liens disponibles - Bouton New project', () => {
    cy.intercept('GET', '**/cavatica2/v2/billing/groups', {
      statusCode: 200,
      body: {
        "href": "https://cavatica-api.sbgenomics.com/v2/billing/groups?offset=0&limit=50",
        "items": [
            {
                "id": "project_billing_group_id",
                "href": "https://cavatica-api.sbgenomics.com/v2/billing/groups/project_billing_group_id",
                "name": "Pilot Funds (mock)"
            }
        ],
        "links": []
    },
    }).as('cavaticaAuthenticated');

    cy.get('[class*="DashboardCards_dashboardCard"]').each(($el: JQuery<HTMLElement>) => {
      if ($el.text().includes('Cavatica Projects')) {
        cy.wrap($el).find('[class*="widget_contentFooter"]').as('cavaticaFooter');
      }
    });

    cy.get('@cavaticaFooter').find('button').clickAndWait({force: true});
    cy.get('[class*="CavaticaCreateProjectModal"] [class="ant-modal-title"]').contains('New project').should('exist');
    cy.get('[class*="CavaticaCreateProjectModal"] label[for="project_name"]').contains('Project name').should('exist');
    cy.get('[class*="CavaticaCreateProjectModal"] input').should('have.attr', 'placeholder', 'e.g. KF-NBL Neuroblastoma Aligned Reads');
    cy.get('[class*="CavaticaCreateProjectModal"] label[for="project_billing_group"]').contains('Project billing group').should('exist');
    cy.get('[class*="CavaticaCreateProjectModal"] [class="ant-select-selection-item"]').contains('Pilot Funds (mock)').should('exist');
  });
});

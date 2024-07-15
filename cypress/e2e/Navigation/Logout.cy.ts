/// <reference types="cypress"/>
import '../../support/commands';

describe('Page Logout', () => {

  beforeEach(() => {
    cy.login();
    cy.visit('/');
  });

  it('Vérifier les informations affichées', () => {
    cy.logout();

    cy.get('[class*="LoginForm_title"]').contains('INCLUDE Data Hub').should('exist');
    cy.get('[class*="MondoChart_wrapper"] h4').contains('Most Frequent Co-occurring Conditions (MONDO)').should('exist');
    cy.get('[class*="Studies_container"] [class*="Summary"] [id="study"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_dots"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [src*="/static/media/study-logo-HTP"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [src*="/static/media/study-logo-DSC"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [src*="/static/media/study-logo-KF"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [src*="/static/media/study-logo-default"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [src*="/static/media/study-logo-KF"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [src*="/static/media/study-logo-BRI"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [src*="/static/media/study-logo-ABC-DS"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [src*="/static/media/study-logo-KF"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [src*="/static/media/study-logo-default"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [src*="/static/media/study-logo-DS-Sleep"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [src*="/static/media/study-logo-DS-NEXUS"]').should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-head"]').contains('Data Release').should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(0).find('[id="study"]').should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(1).find('[id="participant"]').should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(2).find('[id="biospecimen"]').should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(3).find('[id="file"]').should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(4).find('[id="gene"]').should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(5).find('[id="exomes"]').should('exist');
    cy.get('[class*="VariantCard_container"] [id="gene"]').should('exist');
    cy.get('[class*="CavaticaCard_container"] [src*="cavatica-logo"]').should('exist');
    cy.get('[class*="BannerItem_container"]').eq(0).find('[id="information"]').should('exist');
    cy.get('[class*="BannerItem_container"]').eq(1).find('[id="cloud-architecture"]').should('exist');
    cy.get('[src*="/static/media/linda-logo."]').should('exist');
    cy.get('[src*="/static/media/chop-logo."]').should('exist');
    cy.get('[src*="/static/media/vanderbilt-logo."]').should('exist');
    cy.get('[src*="/static/media/chusj-logo."]').should('exist');
    cy.get('[src*="image/png"]').should('exist');
  });
});

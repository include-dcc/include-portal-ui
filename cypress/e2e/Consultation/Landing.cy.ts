/// <reference types="cypress"/>
import '../../support/commands';

beforeEach(() => {
  cy.visit('/');
});

describe('Page Landing - Vérifier les informations affichées', () => {
  it('Section Upper banner', () => {
    cy.get('[class*="LoginForm_title"] [xmlns="http://www.w3.org/2000/svg"]').should('exist');
    cy.get('[class*="LoginForm_title"]').contains('INCLUDE Data Hub').should('exist');
    cy.get('[class*="LoginForm_subtitle"]').contains('Uncover ').should('exist');
    cy.get('[class*="LoginForm_subtitle"]').contains('new insights').should('exist');
    cy.get('[class*="LoginForm_subtitle"]').contains(' into the biology of Down Syndrome and co-occurring conditions.').should('exist');
    cy.get('[class*="LoginForm_description"]').contains('Access large-scale integrated data resources and analyze custom built cohort datasets based on participants, biospecimens, clinical, and genomic data.').should('exist');
    cy.get('[data-cy="Login"]').contains('Login').should('exist');
    cy.get('[data-cy="Signup"]').contains('Sign up').should('exist');
  });

  it('Section Charts 1', () => {
    cy.get('[class*="MondoChart_wrapper"] h4').contains('Most Frequent Co-occurring Conditions (MONDO)').should('exist');
    cy.get('[class*="MondoChart_contentCard"] text[style*="dominant-baseline"]').contains('Diagnoses (MONDO)').should('exist');
    cy.get('[class*="MondoChart_contentCard"] text[style*="dominant-baseline"]').contains('# of participants').should('exist');
    cy.get('[class*="MondoChart_contentCard"] text[dominant-baseline="central"]').contains('Speech Disorder').should('exist');
    cy.get('[class*="MondoChart_contentCard"] text[dominant-baseline="central"]').contains(/\d{1}/).should('exist');
  });

  it('Section Studies Side Panel Tile', () => {
    cy.get('[class*="Studies_container"] [class*="Summary"] [id="study"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="Summary"] [class*="TextIcon_layout"]').contains(/\d{1}/).should('exist');
    cy.get('[class*="Studies_container"] [class*="Summary"] [class*="TextIcon_layout"]').contains('Studies').should('exist');
    cy.get('[class*="Studies_container"] [class*="Summary"]').contains('Explore a curated collection of harmonized studies, ranging from participant-reported programs, INCLUDE-funded cohorts, institutional initiatives, and dedicated consortia focused on Down Syndrome research.').should('exist');
    cy.get('[class*="Studies_container"] [class*="Summary"] button[class*="ant-btn-primary"]').contains('View all studies').should('exist');
  });

  it('Section Studies Right Panel Tile', () => {
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_dots"]').should('exist');

    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [src*="/static/media/study-logo-HTP"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_subtitle"]').contains('The Human Trisome Project').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_description"]').contains('The Human Trisome Project (HTP) is a large and comprehensive natural history study of Down syndrome involving collection of deep clinical data, multimodal phenotyping, a multi-dimensional biobank, generation of pan-omics datasets, and rapid release of data. The HTP has enabled many discoveries about the pathophysiology of Down syndrome, leading to new clinical trials testing therapies to improve diverse health outcomes in this population.').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="TextIcon_icon"] [id="participant"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="TextIcon_title"]').contains(/\d{1}/).should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="TextIcon_subtitle"]').contains('Participants').should('exist');

    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [src*="/static/media/study-logo-DSC"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_subtitle"]').contains('DS-Connect: The Down Syndrome Registry').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_description"]').contains('DS-Connect is an online survey tool designed to collect demographic data and basic health information from individuals with DS. The purposes of DS-Connect: The Down Syndrome Registry are to better understand the health of people with Down syndrome and to inform eligible participants who, based on their health history, may be a match for research studies or new clinical trials.').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="TextIcon_icon"] [id="participant"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="TextIcon_title"]').contains(/\d{1}/).should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="TextIcon_subtitle"]').contains('Participants').should('exist');

    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [src*="/static/media/study-logo-KF"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_subtitle"]').contains('INCLUDE: (Sherman) Genomic Analysis of Congenital Heart Defects and Acute Lymphoblastic Leukemia in Children with Down Syndrome').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_description"]').contains('Down syndrome is one of the strongest risk factors for acute myeloid leukemia in children, which is preceded by a transient leukemia driven by somatic mutations in the GATA1 gene. This study was funded by the Kids First and INCLUDE programs to generate whole-genome sequencing data from a long-standing and well-phenotyped collection of newborn blood samples from 436 individuals with DS from the Oxford Down Syndrome Cohort Study, to advance our understanding of biological factors associated with transient leukemia in DS.').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="TextIcon_icon"] [id="participant"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="TextIcon_title"]').contains(/\d{1}/).should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="TextIcon_subtitle"]').contains('Participants').should('exist');

    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [src*="/static/media/study-logo-default"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_subtitle"]').contains('Genetic underpinnings of the multifactorial phenotype of Trisomy 21 patients unveiled by multi-omics approaches').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_description"]').contains('To better understand the pathophysiology of Down syndrome (DS), this proposal will generate and analyze sequence data on 777 pediatric DS patients from the Children\'s Hospital of Philadelphia (CHOP), as well as 321 mothers and 148 fathers. We anticipate that the information derived from this deeply phenotyped cohort will allow for improved understanding of the pathophysiology and molecular mechanisms underlying DS-associated comorbidities, which may inform on new practices for treatment or innovative future therapies.').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="TextIcon_icon"] [id="participant"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="TextIcon_title"]').contains(/\d{1}/).should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="TextIcon_subtitle"]').contains('Participants').should('exist');

    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [src*="/static/media/study-logo-KF"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_subtitle"]').contains('INCLUDE: (PCGC) Genomic Analysis of Congenital Heart Defects and Acute Lymphoblastic Leukemia in Children with Down Syndrome').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_description"]').contains('Since a key aspect of Kids First is to help uncover connections between structural birth defects and childhood cancers, the program will partner with INCLUDE and TOPMed to advance our understanding the biological factors that may lead to both heart disease and leukemia in individuals with DS.').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="TextIcon_icon"] [id="participant"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="TextIcon_title"]').contains(/\d{1}/).should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="TextIcon_subtitle"]').contains('Participants').should('exist');

    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [src*="/static/media/study-logo-BRI"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_subtitle"]').contains('Benaroya Research Institute Down Syndrome Registry').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_description"]').contains('The Down syndrome registry at Benaroya Research Institute (BRI) builds on institutional expertise to collect and analyze longitudinal biological samples and concomitant clinical metadata across the lifespan of people with Down syndrome. The goal is to help advance therapeutic approaches to predict, prevent and cure co-occurring conditions of Down syndrome.').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="TextIcon_icon"] [id="participant"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="TextIcon_title"]').contains(/\d{1}/).should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="TextIcon_subtitle"]').contains('Participants').should('exist');

    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [src*="/static/media/study-logo-ABC-DS"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_subtitle"]').contains('Alzheimer Biomarker Consortium - Down Syndrome').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_description"]').contains('The goal of the Alzheimer Biomarker Consortium-Down Syndrome (ABC-DS) is to study a group of adults with Down syndrome over their lives to single out early biomarkers of the onset of Alzheimer\'s disease.').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="TextIcon_icon"] [id="participant"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="TextIcon_title"]').contains(/\d{1}/).should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="TextIcon_subtitle"]').contains('Participants').should('exist');

    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [src*="/static/media/study-logo-KF"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_subtitle"]').contains('INCLUDE: (Lupo) Genomic Analysis of Congenital Heart Defects and Acute Lymphoblastic Leukemia in Children with Down Syndrome').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_description"]').contains('Down syndrome is one of the strongest risk factors for acute myeloid leukemia in children, which is preceded by a transient leukemia driven by somatic mutations in the GATA1 gene. This study was funded by the Kids First and INCLUDE programs to generate whole-genome sequencing data from a long-standing and well-phenotyped collection of newborn blood samples from 436 individuals with DS from the Oxford Down Syndrome Cohort Study, to advance our understanding of biological factors associated with transient leukemia in DS.').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="TextIcon_icon"] [id="participant"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="TextIcon_title"]').contains(/\d{1}/).should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="TextIcon_subtitle"]').contains('Participants').should('exist');

    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [src*="/static/media/study-logo-default"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_subtitle"]').contains('The epidemiology of transient leukemia in newborns with Down syndrome').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_description"]').contains('Children with Down syndrome (DS) have an extremely high risk of developing acute myeloid leukemia, and this is preceded by a transient myeloid leukemia that presents in up to 30% of newborns with DS and can lead to early death. In this study, we will investigate the role of germline genetic risk factors in modifying the risk of transient myeloid leukemia in DS. ').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="TextIcon_icon"] [id="participant"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="TextIcon_title"]').contains(/\d{1}/).should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="TextIcon_subtitle"]').contains('Participants').should('exist');

    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [src*="/static/media/study-logo-DS-Sleep"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_subtitle"]').contains('Dimensional, Sleep, and Genomic Analyses of Down Syndrome to Elucidate Phenotypic Variability').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_description"]').contains('The present work falls under an administrative supplement to study Down syndrome (DS) within the existing grant, "Dimensional Analysis of Developmental Brain Disorders using an Online, Genome First Approach" (R01-MH107431). The study aims to build validated, quantitative measures of psychopathology for DS.').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="TextIcon_icon"] [id="participant"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="TextIcon_title"]').contains(/\d{1}/).should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="TextIcon_subtitle"]').contains('Participants').should('exist');

    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [src*="/static/media/study-logo-DS-NEXUS"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_subtitle"]').contains('Nexus Translational Biobank').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="Carousel_description"]').contains('The Nexus is a patient registry, clinical database, and biological sample bank focused on developmental disorders. Its major goal is to advance research by (i) linking human cognitive, behavioral, neurological and other clinical phenotypes to biological samples, including DNA, plasma, and lymphoblastoid cell lines, and (ii) facilitating access to appropriate patient cohorts for research purposes. The Nexus is unique among biorepositories in that it combines extensive clinical data and biosamples, and emphasizes the inclusion of quantitative cognitive and behavioral data.').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="TextIcon_icon"] [id="participant"]').should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="TextIcon_title"]').contains(/\d{1}/).should('exist');
    cy.get('[class*="Studies_container"] [class*="ant-carousel"] [class*="TextIcon_subtitle"]').contains('Participants').should('exist');
  });

  it('Section Released Data Stats', () => {
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-head"]').contains('Data Release').should('exist');

    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(0).find('[id="study"]').should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(0).contains(/\d{1}/).should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(0).contains('Studies').should('exist');
    
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(1).find('[id="participant"]').should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(1).contains(/\d{1}/).should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(1).contains('Participants').should('exist');
    
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(2).find('[id="biospecimen"]').should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(2).contains(/\d{1}/).should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(2).contains('Biospecimens').should('exist');
    
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(3).find('[id="file"]').should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(3).contains(/\d{1} (T|G)B/).should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(3).contains('Files').should('exist');
    
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(4).find('[id="gene"]').should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(4).contains(/\d{1}/).should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(4).contains('Genomes').should('exist');
    
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(5).find('[id="exomes"]').should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(5).contains(/\d{1}/).should('exist');
    cy.get('[class*="Stats_wrapper"] [class*="ant-card-body"] [class*="TextIcon_layout"]').eq(5).contains('Transcriptomes').should('exist');
  });

  it('Section Variant Tile', () => {
    cy.get('[class*="VariantCard_container"] [id="gene"]').should('exist');
    cy.get('[class*="VariantCard_container"] [class*="TextIcon_title"]').contains(/\d{1}K/).should('exist');
    cy.get('[class*="VariantCard_container"] [class*="TextIcon_subtitle"]').contains('Germline Variants').should('exist');
    cy.get('[class*="VariantCard_container"] [class*="VariantCard_description"]').contains('Our variant explorer offers advanced searching capabilities. With just a few clicks, you can explore millions of annotated germline variants from genomes of INCLUDE Data Hub participants.').should('exist');
    cy.get('[class*="VariantCard_container"] [type="button"]').contains('Explore variant data').should('exist');
  });

  it('Section Cavatica Tile', () => {
    cy.get('[class*="CavaticaCard_container"] [src*="cavatica-logo"]').should('exist');
    cy.get('[class*="CavaticaCard_container"] [class*="CavaticaCard_description"]').contains('The portal integrates with Cavatica, a data analysis and sharing platform designed to accelerate discovery in a scalable, cloud-based compute environment where data, results, and workflows are shared among the world’s research community. Researchers and bioinformaticians can create or use existing workflows, to analyze INCLUDE datasets.').should('exist');
    cy.get('[class*="CavaticaCard_container"] [href="https://www.cavatica.org/"]').contains('Learn more').should('exist');
    cy.get('[class*="CavaticaCard_container"] [href="https://cavatica.sbgenomics.com/"]').contains('Login').should('exist');
  });

  it('Section Documentation Tiles', () => {
    cy.get('[class*="BannerItem_container"]').eq(0).find('[id="information"]').should('exist');
    cy.get('[class*="BannerItem_container"]').eq(0).find('[class*="TextIcon_title"]').contains('INCLUDE Documentation Center').should('exist');
    cy.get('[class*="BannerItem_container"]').eq(0).contains('For information on accessing, submitting and uploading data, visit our Documentation Center.').should('exist');
    cy.get('[class*="BannerItem_container"]').eq(0).find('[href="https://help.includedcc.org/docs/quick-start-guide"]').contains('Documentation').should('exist');

    cy.get('[class*="BannerItem_container"]').eq(1).find('[id="cloud-architecture"]').should('exist');
    cy.get('[class*="BannerItem_container"]').eq(1).find('[class*="TextIcon_title"]').contains('Participate in the INCLUDE Project').should('exist');
    cy.get('[class*="BannerItem_container"]').eq(1).contains('Visit the NIH INCLUDE project page to learn more about the initiative, funding opportunities, or other resources.').should('exist');
    cy.get('[class*="BannerItem_container"]').eq(1).find('[href="https://www.nih.gov/include-project"]').contains('Learn more').should('exist');
  });

  it('Section Lower banner', () => {
    cy.get('[src*="/static/media/linda-logo."]').should('exist');
    cy.get('[src*="/static/media/chop-logo."]').should('exist');
    cy.get('[src*="/static/media/vanderbilt-logo."]').should('exist');
    cy.get('[src*="/static/media/chusj-logo."]').should('exist');
    cy.get('[src*="image/png"]').should('exist');
    cy.get('[class*="Footer_policiesText"]').contains('The INCLUDE Data Coordinating Center (DCC) is supported by the National Institutes of Health INCLUDE Project under Project Number U2CHL156291 administered by the National Heart, Lung and Blood Institute. All content, terms and conditions and policies associated with the INCLUDE DCC content and website (the "Services") are produced by the INCLUDE DCC. The views and opinions of authors expressed on the Services do not necessarily state or reflect those of the National Institutes of Health ("NIH") or the U.S. government. Furthermore, the NIH does not endorse or promote any INCLUDE DCC entity or any of its products or services nor guarantees the products, services, or information provided by the INCLUDE DCC.').should('exist');
  });
});

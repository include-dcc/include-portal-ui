# Release notes for include-portal-ui

<!--
## 2020-01-?? include-portal-ui 1.??.??

### Features

### Technical / Other changes
-->
## 2025-10-08 include-portal-ui 1.22.1
### Technical/ Other changes:
- [SJIP-1450](https://d3b.atlassian.net/browse/SJIP-1450) Issue: [Data Exploration] Fixed missing Genomics Data Category values
- [SJIP-1452](https://d3b.atlassian.net/browse/SJIP-1452) Issue: [File Entity] Fixed error 500 when accessing certain files
- [SJIP-1463](https://d3b.atlassian.net/browse/SJIP-1463) Issue: [Data Exploration] Fixed error 500 when sorting certain columns in the Data Files tab

## 2025-10-02 include-portal-ui 1.22.0
### Features:
- [SJIP-1420](https://d3b.atlassian.net/browse/SJIP-1420) Feature: [Landing & Studies] Added button for information about INCLUDE Citation Statements
- [SJIP-1422](https://d3b.atlassian.net/browse/SJIP-1422) Feature: [Landing page] Added policies as a footer
### Technical/ Other changes:
- [SJIP-656](https://d3b.atlassian.net/browse/SJIP-656) Fix: [Data Exploration] Fixed missing display of the value control-only in the Family Unit field
- [SJIP-1341](https://d3b.atlassian.net/browse/SJIP-1341) Refactor: [Saved Set] Transformed all sets to public
- [SJIP-1419](https://d3b.atlassian.net/browse/SJIP-1419) Fix: [Quick Filter] Fixed the search for values on the MAxO Code
- [SJIP-1433](https://d3b.atlassian.net/browse/SJIP-1433) Refactor: [Analytics] Removed underline from hyperlink upon mouse hover
- [SJIP-1434](https://d3b.atlassian.net/browse/SJIP-1434) Refactor: [Data Exploration] Formatted the MAxO display in the facet to include the term and MAxO code

## 2025-09-03 include-portal-ui 1.21.0
### Features:
- [SJIP-1402](https://d3b.atlassian.net/browse/SJIP-1402) Feature: [Data Exploration] Added New Condition & Measurement Fields
- [SJIP-1405](https://d3b.atlassian.net/browse/SJIP-1405) Feature: [Data Exploration] Added Participant descendant term count to the tooltip of Most Frequent Diagnoses
- [SJIP-1409](https://d3b.atlassian.net/browse/SJIP-1409) Feature: [Study Entity] Added Analyze in Cavatica button across different datasets
- [SJIP-1417](https://d3b.atlassian.net/browse/SJIP-1417) Feature: [Study Entity] Added DOI to the Summary section and Dataset Section
- [SJIP-1418](https://d3b.atlassian.net/browse/SJIP-1418) Feature: [Data Exploration] Added MaxO facet and column
### Technical/ Other changes:
- [SJIP-937](https://d3b.atlassian.net/browse/SJIP-937) Refactor: [Data Exploration] Combined phenotype source text and diagnosis source text into one condition source text in the table
- [SJIP-1401](https://d3b.atlassian.net/browse/SJIP-1401) Refactor: [Security] Upgraded axios from 0.24.0 to 1.8.3
- [SJIP-1408](https://d3b.atlassian.net/browse/SJIP-1408) Refactor: [Public study] Updated header to back to studies page

## 2025-07-17 include-portal-ui 1.20.0
### Features:
- [SJIP-1275](https://d3b.atlassian.net/browse/SJIP-1275) Feature: [Upset Plot] Added clickable bar to filter the query by phenotype co-occurrence
- [SJIP-1343](https://d3b.atlassian.net/browse/SJIP-1343) Feature: [Transcriptomics] Added Box select to box plot for sample gene expression
- [SJIP-1365](https://d3b.atlassian.net/browse/SJIP-1365) Feature: [Data Exploration] Added the concept of linked participants between research studies such as DS-Connect & DS-DETERMINED
- [SJIP-1371](https://d3b.atlassian.net/browse/SJIP-1371) Feature: [Landing Page] Implemented Public Study Entity Pages
- [SJIP-1389](https://d3b.atlassian.net/browse/SJIP-1389) Feature: [Participant Entity] Added column sorting to the biospecimen table
### Technical/ Other changes:
- [SJIP-1177](https://d3b.atlassian.net/browse/SJIP-1177) Refactor: [Transcriptomic] Fixed dataset name in the transcriptomics app
- [SJIP-1317](https://d3b.atlassian.net/browse/SJIP-1317) Issue: [Analytics] Fixed minor issues in the set operations app
- [SJIP-1327](https://d3b.atlassian.net/browse/SJIP-1327) Issue: [Data Exploration] Fixed the results in the Age at First Patient Engagement chart after an applied filter on biospecimen and data files
- [SJIP-1330](https://d3b.atlassian.net/browse/SJIP-1330) Refactor: [Data Exploration] Updated hierarchical biospecimen view to automatically select a sample by default
- [SJIP-1332](https://d3b.atlassian.net/browse/SJIP-1332) Refactor: [Analytics] Hid Reset button when no adjustment has was applied to the input
- [SJIP-1333](https://d3b.atlassian.net/browse/SJIP-1333) Refactor: [Venn Diagram] Updated icons when applying the compare of a specific entity type
- [SJIP-1335](https://d3b.atlassian.net/browse/SJIP-1335) Refactor: [Data Exploration] Add Participant descendant term count to the tooltip of Most Frequent Diagnoses/Phenotypes
- [SJIP-1339](https://d3b.atlassian.net/browse/SJIP-1339) Refactor: [Summary View] Fixed graphs that were no longer responsive to screen resizing
- [SJIP-1345](https://d3b.atlassian.net/browse/SJIP-1345) Issue: [Summary View] Fixed the sample type counts of the chart
- [SJIP-1344](https://d3b.atlassian.net/browse/SJIP-1344) Refactor: [Dataset] Added an anchor for a specific dataset in the study entity page
- [SJIP-1347](https://d3b.atlassian.net/browse/SJIP-1347) Refactor: [Biospecimen Hierarchy] Fixed the Container ID tree not matching the container ID in the metadata table
- [SJIP-1350](https://d3b.atlassian.net/browse/SJIP-1350) Issue: [Summary] Fixed graphs not displaying the correct result when applying No data filter in the numerical facets
- [SJIP-1368](https://d3b.atlassian.net/browse/SJIP-1368) Refactor: [Sitewide] Update Browser Tab Titles for INCLUDE Data Hub instead of "Portal"
- [SJIP-1370](https://d3b.atlassian.net/browse/SJIP-1370) Issue: [Study Entity] Fixed truncated legend in the Demographics chart
- [SJIP-1379](https://d3b.atlassian.net/browse/SJIP-1379) Refactor: [Summary View & Study entity Statistics] Modified to download data representation
- [SJIP-1386](https://d3b.atlassian.net/browse/SJIP-1386) Refactor: [Studies] Added a total files entry in the studies table

## 2025-04-15 include-portal-ui 1.18.0

### Features:

- [SJIP-731](https://d3b.atlassian.net/browse/SJIP-731) Feature:[Variant Entity] Add picked symbol to associated consequence
- [SJIP-1157](https://d3b.atlassian.net/browse/SJIP-1157) Feature:[Data Exploration] Add Age at First Patient Engagement to reports
- [SJIP-1210](https://d3b.atlassian.net/browse/SJIP-1210) Feature:[Data Exploration] Implement hierarchical Biospecimen tree visualization across samples
- [SJIP-1235](https://d3b.atlassian.net/browse/SJIP-1235) Feature:[Entity] Implement hierarchical Biospecimen tree visualization in Participant Entity page
- [SJIP-1251](https://d3b.atlassian.net/browse/SJIP-1251) Feature:[Analytics] Generate a Venn Diagram from Saved set inputs

### Technical/ Other changes:

- [SJIP-1276](https://d3b.atlassian.net/browse/SJIP-1276) Issue:[Data Exploration] Fixed issue on the upset plot when a saved set is inputted into the query
- [SJIP-1315](https://d3b.atlassian.net/browse/SJIP-1315) Refactor:[Study Entity] Hide file section for files without data type and experimental strategy

## 2025-03-26 include-portal-ui 1.17.2

### Technical/ Other changes:

- [SJIP-1274](https://d3b.atlassian.net/browse/SJIP-1274) Issue:[Sentry] Fixed regex error when searching in the QuickFilter using special characters
- [SJIP-1276](https://d3b.atlassian.net/browse/SJIP-1276) Issue:[QuickFilter] Fixed regex error when searching in the QuickFilter using special characters *, +, ?
- [SJIP-1277](https://d3b.atlassian.net/browse/SJIP-1277) [Sentry] Fixed error for UnhandledRejection: Non-Error promise rejection captured with value: true

## 2025-03-19 include-portal-ui 1.17.1

### Technical/ Other changes:

- [SJIP-1262](https://d3b.atlassian.net/browse/SJIP-1262) Issue: [Study Entity] Missing Analyze in Cavatica button for DS-Connect dataset
- [SJIP-1248](https://d3b.atlassian.net/browse/SJIP-1248) Issue: [Data Exploration] Venn diagram error 500 when comparing combined queries
- [SJIP-1267](https://d3b.atlassian.net/browse/SJIP-1267) Refactor: [Study Entity] Hide rows without values in the Study summary section
- [SJIP-1273](https://d3b.atlassian.net/browse/SJIP-1273) Refactor: [Study Entity & Landing] Update the DS-Connect logo

## 2025-03-11 include-portal-ui 1.17.0

### Features:

- [SJIP-1000](https://d3b.atlassian.net/browse/SJIP-1000) Feature: [Study Entity] Add new fields to Dataset Section
- [SJIP-1001](https://d3b.atlassian.net/browse/SJIP-1001) Feature: [Data Exploration] Add Dataset Facet and Column to the Data Files tab
- [SJIP-1002](https://d3b.atlassian.net/browse/SJIP-1002) Feature: [File Entity] Add Dataset Name in the File Entity Summary section
- [SJIP-1003](https://d3b.atlassian.net/browse/SJIP-1003) Feature: [Study Entity] Add a View in Exploration button
- [SJIP-1004](https://d3b.atlassian.net/browse/SJIP-1004) Feature: [Study Entity] Add a Manifest button to the Dataset block
- [SJIP-1080](https://d3b.atlassian.net/browse/SJIP-1080) Feature: [Study Entity] Implement Pubmed API citation format to the Publication field
- [SJIP-1081](https://d3b.atlassian.net/browse/SJIP-1081) Feature: [Study Entity] Create modal to display citations when study over 2 publications
- [SJIP-1115](https://d3b.atlassian.net/browse/SJIP-1115) Feature: [Summary View] Implement Upset Plot to Summary View
- [SJIP-1116](https://d3b.atlassian.net/browse/SJIP-1116) Feature: [Query Builder] Implement Venn diagram when comparing 2 or 3 queries
- [SJIP-1131](https://d3b.atlassian.net/browse/SJIP-1131) Feature: [Transcriptomics] Open boxplot from gradient chart
- [SJIP-1155](https://d3b.atlassian.net/browse/SJIP-1155) Feature: [Data Exploration] Add new age field to Data Exploration
- [SJIP-1183](https://d3b.atlassian.net/browse/SJIP-1183) Feature: [Study Entity] Implement the Pubmed API citation format for dataset publication url

### Technical/ Other changes:

- [SJIP-898](https://d3b.atlassian.net/browse/SJIP-898) Refactor: [Study Entity] Move the Study contact up to the summary table
- [SJIP-906](https://d3b.atlassian.net/browse/SJIP-906) Issue: [Authorized Studies] Fixed typos on the Authorized Studies widget
- [SJIP-1083](https://d3b.atlassian.net/browse/SJIP-1083) Refactor: [Package] Update package and dependancies (December)
- [SJIP-1153](https://d3b.atlassian.net/browse/SJIP-1153) Refactor: [Variant exploration] Remove export as TSV feature
- [SJIP-1154](https://d3b.atlassian.net/browse/SJIP-1154) Refactor: [Facet] Set default operators across facets
- [SJIP-1160](https://d3b.atlassian.net/browse/SJIP-1160) Issue: [Transcriptomics] Update the Tooltip for Fold change value
- [SJIP-1161](https://d3b.atlassian.net/browse/SJIP-1161) Issue: [Transcriptomics] Adjusted y-axis values to properly reflect (-log10\(q-value))
- [SJIP-1166](https://d3b.atlassian.net/browse/SJIP-1166) Issue: [Sentry] Fixed issues reported by Sentry
- [SJIP-1167](https://d3b.atlassian.net/browse/SJIP-1167) Refactor: [Study Entity] Update field from GUID Type to GUID Mapped
- [SJIP-1200](https://d3b.atlassian.net/browse/SJIP-1200) Issue: [Transcriptomics] Fixed box plot not always appearing when selecting a gene
- [SJIP-1204](https://d3b.atlassian.net/browse/SJIP-1204) Issue: [Analytics] Fix error 400 bad request in the transcriptomics analytics page 
- [SJIP-1215](https://d3b.atlassian.net/browse/SJIP-1215) Refactor: [Study Entity] Hide the rows or sections that do not have values 

## 2024-12-11 include-portal-ui 1.16.0

### Features:

- [SJIP-281](https://d3b.atlassian.net/browse/SJIP-281) Feature: [Data exploration] Add Category icon above each facet and in Quick Filter
- [SJIP-666](https://d3b.atlassian.net/browse/SJIP-666) Feature: [Variant Exploration] Add export as TSV
- [SJIP-935](https://d3b.atlassian.net/browse/SJIP-935) Feature: [Saved Set] Update the feedback message to respect given special characters
- [SJIP-963](https://d3b.atlassian.net/browse/SJIP-963) Feature: [Transcriptomics] Add Download data to the volcano plot and box plot
- [SJIP-984](https://d3b.atlassian.net/browse/SJIP-984) Feature: [Transcriptomics] Add Save as biospecimen set to the box plot
- [SJIP-1032](https://d3b.atlassian.net/browse/SJIP-1032) Feature: [Studies] Show more than one dbGaP accession number
- [SJIP-1035](https://d3b.atlassian.net/browse/SJIP-1035) Feature: [Transcriptomics] Add Multi-select to the plots
- [SJIP-1067](https://d3b.atlassian.net/browse/SJIP-1067) Feature: [Transcriptomics] Add new facets
- [SJIP-1094](https://d3b.atlassian.net/browse/SJIP-1094) Feature: [Public Studies] Add Public Studies page
- [SJIP-1095](https://d3b.atlassian.net/browse/SJIP-1095) Feature: [Data Exploration] Add Maximum 10,000 limit modal prior to Analyze in Cavatica modal
- [SJIP-1114](https://d3b.atlassian.net/browse/SJIP-1114) Feature: [Data Exploration] Across all horizontal bar charts set the max bars to 10

### Technical/ Other changes:

- [SJIP-427](https://d3b.atlassian.net/browse/SJIP-427) Task: [ETL] Added Age at First Patient Engagement and First Patient Engagement Type
- [SJIP-860](https://d3b.atlassian.net/browse/SJIP-860) Fix: [Upload List] Corrected typos
- [SJIP-913](https://d3b.atlassian.net/browse/SJIP-913) Fix: [Variant Exploration] Misalignment of a button
- [SJIP-915](https://d3b.atlassian.net/browse/SJIP-915) Fix: [Summary View] Alignment of "No data" to center it
- [SJIP-1058](https://d3b.atlassian.net/browse/SJIP-1058) Fix: [Community] Issue with filters when on pages > 1
- [SJIP-1066](https://d3b.atlassian.net/browse/SJIP-1066) Fix: [Studies] Search by dbGaP when more than one dbGaP per study
- [SJIP-1068](https://d3b.atlassian.net/browse/SJIP-1068) Fix: [Data Exploration] Search by facets auto suggestion loses highlight if there is a - in search
- [SJIP-1069](https://d3b.atlassian.net/browse/SJIP-1069) Fix: [Data Exploration] Search by Suggestion List remains visible when input field loses focus
- [SJIP-1073](https://d3b.atlassian.net/browse/SJIP-1073) Task: [ETL] Enrich the ETL by adding fields returned by the PubMed API
- [SJIP-1082](https://d3b.atlassian.net/browse/SJIP-1082) Refactor: [UI] Update package and dependencies
- [SJIP-1091](https://d3b.atlassian.net/browse/SJIP-1091) Fix: [Transcriptomics] The gene upload list search should be case insensitive
- [SJIP-1096](https://d3b.atlassian.net/browse/SJIP-1096) Task: [Monitoring] Add Sentry

## 2024-11-04 include-portal-ui 1.15.0

### Features:

- [SJIP-983](https://d3b.atlassian.net/browse/SJIP-983) Feature: [Data Exploration] Add fields to Quick Filter
- [SJIP-1043](https://d3b.atlassian.net/browse/SJIP-1043) Feature: [Data Exploration] Add facets to the Data Exploration in the Participant and File category
- [SJIP-1063](https://d3b.atlassian.net/browse/SJIP-1063) Feature: [Study Entity] Add Analyze in Cavatica button on DS-Connect -- unharmonized clinical dataset

### Technical/ Other changes:

- [SJIP-353](https://d3b.atlassian.net/browse/SJIP-353) Refactor: [ETL] Automate the retrieval of the obo files for both HPO and MONDO ontologies
- [SJIP-947](https://d3b.atlassian.net/browse/SJIP-947) Fix: [Variant Exploration] Adjust the participant frequency tooltip
- [SJIP-959](https://d3b.atlassian.net/browse/SJIP-959) Fix: [Quick Filter] Adjusted the apply button to correspond to the style for numerical range type facets
- [SJIP-973](https://d3b.atlassian.net/browse/SJIP-973) Refactor: [Analytics] Add the Differential gene expression plot into the cache to reduce loading time
- [SJIP-992](https://d3b.atlassian.net/browse/SJIP-992) Fix: [Analytics] Adjusted typo in the Transcriptomics app for the facet title "Search by sample"
- [SJIP-1036](https://d3b.atlassian.net/browse/SJIP-1036) Refactor: [Data Exploration] Remove both Sunburst MONDO & HPO as charts in the summary view

## 2024-10-15 include-portal-ui 1.14.0

### Features:

- [SJIP-990](https://d3b.atlassian.net/browse/SJIP-990) Feature: [Analytics] Build out the Analytics page

## 2024-10-15 include-portal-ui 1.13.0

### Features:

- [SJIP-867](https://d3b.atlassian.net/browse/SJIP-867) Feature: [Analytics] Implement the differential gene expression analytics 
- [SJIP-981](https://d3b.atlassian.net/browse/SJIP-981) Feature: [Entity] Add Analysis button to study HTP's RNASeq dataset redirecting to the differential gene expression analytics
- [SJIP-1013](https://d3b.atlassian.net/browse/SJIP-1013) Feature: [Studies] Add GUID button & modal to Studies page
- [SJIP-1014](https://d3b.atlassian.net/browse/SJIP-1014) Feature: [Studies] Add an Analyze in Cavatica modal for the GUID mapping file
- [SJIP-1021](https://d3b.atlassian.net/browse/SJIP-1021) Feature: [Studies & Entity] Add new metadata to the Study Entity page & Studies page

### Technical/ Other changes:

- [SJIP-989](https://d3b.atlassian.net/browse/SJIP-989) Refactor: [Study Entity] Hide the Statistics section if all plots are empty

## 2024-09-18 include-portal-ui 1.12.2

### Features:

- [SJIP-828](https://d3b.atlassian.net/browse/SJIP-828) Feature: [Data Exploration] Make Most Frequent Diagnoses/Phenotypes adjustable in size like the other graphs
- [SJIP-952](https://d3b.atlassian.net/browse/SJIP-952) Feature: [Data Exploration] Implement the QuickFilter based on INCLUDE data fields

## 2024-08-08 include-portal-ui 1.12.1

### Technical/ Other changes:
- [SJIP-932](https://d3b.atlassian.net/browse/SJIP-932) Fix: [Cavatica] Cannot push to Cavatica controlled files for X01-Hakonarson & X01-deSmith

## 2024-08-06 include-portal-ui 1.12.0

### Features:

- [SJIP-807](https://d3b.atlassian.net/browse/SJIP-807) Feature: [Landing] Add Demographic Charts
- [SJIP-768](https://d3b.atlassian.net/browse/SJIP-768) Feature: [Landing] Add Co-occurring Charts
- [SJIP-808](https://d3b.atlassian.net/browse/SJIP-808) Feature: [Studies] Search by study description
- [SJIP-805](https://d3b.atlassian.net/browse/SJIP-805) Feature: [Summary View] Add Most Frequent Diagnoses/Phenotype graphs
- [SJIP-803](https://d3b.atlassian.net/browse/SJIP-803) Feature: [Study Entity] Add Download data, svg, png functionality to Statistic charts

### Technical/ Other changes:

- [SJIP-829](https://d3b.atlassian.net/browse/SJIP-829) Fix: [Data exploration & Entity] Adjust authorization icon and flow for controlled files governed by the Cavatica DRS
- [SJIP-838](https://d3b.atlassian.net/browse/SJIP-838) Fix: [Landing] Improve distribution of Y-axis and X-axis label
- [SJIP-908](https://d3b.atlassian.net/browse/SJIP-908) Task: [ETL] Remove Harmonize Tag & field in Studies page
- [SJIP-907](https://d3b.atlassian.net/browse/SJIP-907) Task: [ETL] Ingest Family Role from INCLUDE FHIR
- [SJIP-916](https://d3b.atlassian.net/browse/SJIP-916) Fix: [Data] Many regressions
- [SJIP-920](https://d3b.atlassian.net/browse/SJIP-920) Update: [Authentication] Upgrade Keycloak Server to 23
- [SJIP-902](https://d3b.atlassian.net/browse/SJIP-902) Fix: [Summary View] Adjust the parameter to not auto-adjust the width of the Bar charts
- [SJIP-897](https://d3b.atlassian.net/browse/SJIP-897) Refactor: [Biospecimen Request] Use ferlab ui component
- [SJIP-890](https://d3b.atlassian.net/browse/SJIP-890) Fix: [Share] Manage share link if you are not login
- [SJIP-886](https://d3b.atlassian.net/browse/SJIP-886) Fix: [Studies page] Study_centric, dynamise data_types vs using Mock
- [SJIP-884](https://d3b.atlassian.net/browse/SJIP-884) Fix: [Profile] Typo in title
- [SJIP-879](https://d3b.atlassian.net/browse/SJIP-879) Fix: [Biospecimen Request] Share should not update the request
- [SJIP-865](https://d3b.atlassian.net/browse/SJIP-865) Fix: [Data] Fixes to do after new data load
- [SJIP-854](https://d3b.atlassian.net/browse/SJIP-854) Fix: [Cavatica] Remove metadata sent via Analyze in Cavatica/Bulk import api
- [SJIP-850](https://d3b.atlassian.net/browse/SJIP-850) Fix: [Cavatica] Remove metadata sent to cavatica
- [SJIP-848](https://d3b.atlassian.net/browse/SJIP-848) Fix: [Data Exploration] MONDO are not displayed
- [SJIP-833](https://d3b.atlassian.net/browse/SJIP-833) Fix: [Summary View] Demographics chart cannot be moved
- [SJIP-831](https://d3b.atlassian.net/browse/SJIP-831) Fix: [Summary View] Charts can't be resized
- [SJIP-826](https://d3b.atlassian.net/browse/SJIP-826) Task: [Google Analytics] Add analytics on Sunburst
- [SJIP-806](https://d3b.atlassian.net/browse/SJIP-806) Task: [Google Analytics] Add tag to GA4 for Cavatica
- [SJIP-824](https://d3b.atlassian.net/browse/SJIP-824) Fix: [Dashboard] Typo in widgets error message
- [SJIP-822](https://d3b.atlassian.net/browse/SJIP-822) Refactor: [Phenotypes] Move ontology tree in ferlab ui
- [SJIP-819](https://d3b.atlassian.net/browse/SJIP-819) Fix: [Data Exploration & Variants] Wrong icon state after duplicate saved query
- [SJIP-818](https://d3b.atlassian.net/browse/SJIP-818) Fix: [Summary View] SVG are corrupted when opening them in Google Chrome
- [SJIP-816](https://d3b.atlassian.net/browse/SJIP-816) Fix: [Variant Entity] Adjust table ligne hover
- [SJIP-815](https://d3b.atlassian.net/browse/SJIP-815) Fix: [Summary View] Download SVG is missing for Studies graph
- [SJIP-814](https://d3b.atlassian.net/browse/SJIP-814) Fix: [Dashboard] Error in widgets on specific usages
- [SJIP-813](https://d3b.atlassian.net/browse/SJIP-813) Fix: [Landing] Add an "of" in the Variant tile description
- [SJIP-812](https://d3b.atlassian.net/browse/SJIP-812) Task: [Data] Add Demographic chart data to public route
- [SJIP-809](https://d3b.atlassian.net/browse/SJIP-809) Fix: [Variants] Update NO GENE variant display
- [SJIP-802](https://d3b.atlassian.net/browse/SJIP-802) Fix: [Summary View] No data message doesn't scale with the resize
- [SJIP-800](https://d3b.atlassian.net/browse/SJIP-800) Fix: [Studies] Add thousands separator
- [SJIP-794](https://d3b.atlassian.net/browse/SJIP-794) Fix: [Studies] Show "-" if no value
- [SJIP-792](https://d3b.atlassian.net/browse/SJIP-792) Fix: [Studies] Can't custom columns with Search by...
- [SJIP-777](https://d3b.atlassian.net/browse/SJIP-777) Fix: [Variant Entity] Align Functional Scores
- [SJIP-760](https://d3b.atlassian.net/browse/SJIP-760) Task: [ETL] Add new fields in Study entities
- [SJIP-759](https://d3b.atlassian.net/browse/SJIP-759) Fix: [Variant Entity] Adjust colors
- [SJIP-758](https://d3b.atlassian.net/browse/SJIP-758) Fix: [Cavatica] Add a loader when copying files to Cavatica
- [SJIP-540](https://d3b.atlassian.net/browse/SJIP-540) Fix: [Data Exploration] Incorrect number of items and string matches in ontology tree
- [SJIP-408](https://d3b.atlassian.net/browse/SJIP-408) Fix: [HPO & MONDO tree] Deselection of a lineage
- [SJIP-406](https://d3b.atlassian.net/browse/SJIP-406) Fix: [HPO & MONDO tree] Update the child selection state

## 2024-04-12 include-portal-ui 1.11.0
## Features:
[SJIP-708](https://d3b.atlassian.net/browse/SJIP-708) Feature: [Study Entity] Implement Study Entity pages
[SJIP-709](https://d3b.atlassian.net/browse/SJIP-735) Feature: [Variant Entity] Implement new version of the Variant Entity page focused on the most deleterious consequence
[SJIP-725](https://d3b.atlassian.net/browse/SJIP-725) Feature: [Registration] Add subscription to newsletter in the Registration process
[SJIP-727](https://d3b.atlassian.net/browse/SJIP-727) Feature: [Header] Create Resources header dropdown
[SJIP-746](https://d3b.atlassian.net/browse/SJIP-746) Feature: [Landing] Implement new landing page
[SJIP-748](https://d3b.atlassian.net/browse/SJIP-748) Feature: [Profile] Add newsletter sign up section to Profile page
[SJIP-749](https://d3b.atlassian.net/browse/SJIP-749) Feature: [Data Exploration] Add a Sample Type horizontal bar chart
[SJIP-753](https://d3b.atlassian.net/browse/SJIP-753) Feature: [Studies page] Implement new search bar, new facets, and column headers to Studies page
## Technical/ Other changes:
[SJIP-754](https://d3b.atlassian.net/browse/SJIP-754) Refactor: [Entity] Adjust Section titles to be singular and table titles to be plural
[SJIP-763](https://d3b.atlassian.net/browse/SJIP-763) Fix: [UI] Adjustment to boutons of type=hyperlink
[SJIP-780](https://d3b.atlassian.net/browse/SJIP-780) Fix: [Data exploration] Unauthorized file despite being connected to Fence and Cavatica
[SJIP-783](https://d3b.atlassian.net/browse/SJIP-783) Refactor: [Dashboard] Add disconnect bouton CAVATICA connection error

## 2024-03-21 include-portal-ui 1.10.0
### Features:
- [SJIP-221](https://d3b.atlassian.net/browse/SJIP-221) Feature: [Data Exploration] Added Studies Pie chart to Summary View
- [SJIP-653](https://d3b.atlassian.net/browse/SJIP-653) Feature: [Data Exploration & Variants] Added tooltip for the study name on the study code values in the table of results
- [SJIP-662](https://d3b.atlassian.net/browse/SJIP-662) Feature: [Variant Exploration] Updated the UI of the variant table
- [SJIP-677](https://d3b.atlassian.net/browse/SJIP-677) Feature: [Data Exploration] Added Parent Sample Type as a facet
- [SJIP-683](https://d3b.atlassian.net/browse/SJIP-683) Feature: [Data Exploration] Added Search by external IDs to facets
- [SJIP-702](https://d3b.atlassian.net/browse/SJIP-702) Feature: [Studies] Added sort to fields in Study Page
- [SJIP-706](https://d3b.atlassian.net/browse/SJIP-706) Feature: [Data Exploration] Added tooltip to disabled state buttons to guide action for user
### Technical/ Other changes:
- [SJIP-380](https://d3b.atlassian.net/browse/SJIP-380) Fix: [UI Theme] Updated tag colors
- [SJIP-561](https://d3b.atlassian.net/browse/SJIP-561) Fix: [Query] Updated operator tooltip colors
- [SJIP-581](https://d3b.atlassian.net/browse/SJIP-581) Fix: [Data Exploration] Updated Data Access column header and added sort
- [SJIP-600](https://d3b.atlassian.net/browse/SJIP-600) Fix: [Data Exploration] Added the Study column to TSV reports
- [SJIP-601](https://d3b.atlassian.net/browse/SJIP-601) Fix: [Data Exploration & Variant Exploration] Fixed typo in facets and query builder
- [SJIP-613](https://d3b.atlassian.net/browse/SJIP-613) Fix: [Data Exploration] Fixed mouseover cutoff in the Summary view charts
- [SJIP-631](https://d3b.atlassian.net/browse/SJIP-631) Refactor:[UI] Upgraded to React 18 library
- [SJIP-649](https://d3b.atlassian.net/browse/SJIP-649) Fix: [Profile] Updated the font weight for the top message of profile page
- [SJIP-651](https://d3b.atlassian.net/browse/SJIP-651) Fix: [Variant Entity] Fixed absent dashes for empty values in the tables 
- [SJIP-652](https://d3b.atlassian.net/browse/SJIP-652) Fix: [Variant Entity] Standardized display of No data available values
- [SJIP-658](https://d3b.atlassian.net/browse/SJIP-658) Refactor: [ETL] Add Unknown values to Race and Ethnicity field
- [SJIP-665](https://d3b.atlassian.net/browse/SJIP-665) Fix: [Saved Sets] Fixed typo on Saved Set widget for Biospecimens
- [SJIP-676](https://d3b.atlassian.net/browse/SJIP-676) Fix: [Report] Fixed the inclusion of all selected participants and associated family member in the download clinical data report 
- [SJIP-680](https://d3b.atlassian.net/browse/SJIP-680) Fix: [Data Exploration] Fixed a resize window glitch
- [SJIP-681](https://d3b.atlassian.net/browse/SJIP-681) Fix: [Upload ID] Fixed empty results when submitting participants ID from KF studies
- [SJIP-688](https://d3b.atlassian.net/browse/SJIP-688) Fix: [UI Theme] Fixed the color text change for links within tags
- [SJIP-693](https://d3b.atlassian.net/browse/SJIP-693) Fix: [Variant Exploration] Fixed the alternating row colors in the variant table
- [SJIP-694](https://d3b.atlassian.net/browse/SJIP-694) Fix: [Data Exploration] Fixed the loss of column selection personalization for a user
- [SJIP-696](https://d3b.atlassian.net/browse/SJIP-696) Fix: [Profile] Fixed a sudden flash for a 404 page when navigating to a user's profile page
- [SJIP-700](https://d3b.atlassian.net/browse/SJIP-700) Refactor:[Variant Exploration] Updated CADD score from the raw score to the phred scored
- [SJIP-715](https://d3b.atlassian.net/browse/SJIP-715)Fix:[Data Exploration] Fixed hidden graphic icons glitch upon window resize
- [SJIP-716](https://d3b.atlassian.net/browse/SJIP-716) Fix:[Data Exploration] Fixed the label display overlapping in the chart download preview
- [SJIP-717](https://d3b.atlassian.net/browse/SJIP-717) Fix:[Data Exploration] Fixed the reset button that was not repositioning the charts in the Summary view
- [SJIP-722](https://d3b.atlassian.net/browse/SJIP-722) Fix:[Landing] Fixed missing text spaces
- [SJIP-728](https://d3b.atlassian.net/browse/SJIP-728) Refactor:[Data Exploration] Reworked the default chart positioning
- [SJIP-733](https://d3b.atlassian.net/browse/SJIP-733) Refactor:[UI] Updated color palette for hex values
- [SJIP-734](https://d3b.atlassian.net/browse/SJIP-734) Refactor:[UI] Updated color palette for tags

## 2023-12-05 include-portal-ui 1.9.1
### Technical / Other changes
- [SJIP-638](https://d3b.atlassian.net/browse/SJIP-638) Fix: [Variant Entity] Error 500 on update after redirect

## 2023-11-28 include-portal-ui 1.9.0
### Features:
- [SJIP-109](https://d3b.atlassian.net/browse/SJIP-109) Feature: [Data Exploration] Added Download file manifest button to generate a file metadata report
- [SJIP-594](https://d3b.atlassian.net/browse/SJIP-594) Feature: [QA] Addition of automated quality assurance testing of the portal using Cypress
- [SJIP-556](https://d3b.atlassian.net/browse/SJIP-556) Feature: [Biospecimen Request] Implemented request for a generation of a biospecimen report and Biospecimen Request history dashboard widget 
### Technical/ Other changes:
- [SJIP-545](https://d3b.atlassian.net/browse/SJIP-545) Fix: [Variant Exploration] Masked NO GENE label on intergenic type of consequences causing a 500 error
- [SJIP-582](https://d3b.atlassian.net/browse/SJIP-582) Fix: [Upload list] Modified the upload list to accept case insensitive entries
- [SJIP-598](https://d3b.atlassian.net/browse/SJIP-598) Fix: [Variant Entity] Aligned the values for participant count in the Studies table
- [SJIP-605](https://d3b.atlassian.net/browse/SJIP-605) Fix: [Saved Sets] Fixed issue with creation of a saved set
- [SJIP-612](https://d3b.atlassian.net/browse/SJIP-612) Fix: [Variant Exploration] Masked the No data checkbox in the numerical facets
- [SJIP-617](https://d3b.atlassian.net/browse/SJIP-617) Refactor: [Saved Sets] Set unique values based on container ID and sample ID when applicable
- [SJIP-622](https://d3b.atlassian.net/browse/SJIP-622) Fix: [Profile Page] Fixed an error 500 when users save an email, remove it, and save another email
- [SJIP-630](https://d3b.atlassian.net/browse/SJIP-635) Refactor: [Dashboard] Updated Saved Filters and Saved Sets empty states and tooltips

## 2023-10-19 include-portal-ui 1.8.1
### Technical / Other changes
- [SJIP-484](https://d3b.atlassian.net/browse/SJIP-484) Refactor: [Registration] Updated text to Terms and Condition and prompt for existing users
- [SJIP-595](https://d3b.atlassian.net/browse/SJIP-595) Fix: [Variant Exploration] Fixed double tooltip in Safari browser
- [SJIP-603](https://d3b.atlassian.net/browse/SJIP-603) Fix: [Community] Fixed filters applied on the second page of table results in the community page
- [SJIP-607](https://d3b.atlassian.net/browse/SJIP-607) Refactor: [ETL] Run ETL on PRD studies
- [SJIP-609](https://d3b.atlassian.net/browse/SJIP-609) Refactor: [ETL] Update ETL to use volume instead of volume_ul
- [SJIP-615](https://d3b.atlassian.net/browse/SJIP-615) Refactor: [User-API] Update new version of User-API

## 2023-09-06 include-portal-ui 1.8.0
### Features:
- [SJIP-531](https://d3b.atlassian.net/browse/SJIP-531) Feature: [Variant Exploration] Added Saved Sets for the Variant Exploration page
- [SJIP-537](https://d3b.atlassian.net/browse/SJIP-537) Feature: [Variant Exploration] Added sort on columns of the table
- [SJIP-539](https://d3b.atlassian.net/browse/SJIP-539) Feature: [Data Exploration] Implemented download png, svg, tsv to summary view graphs
- [SJIP-557](https://d3b.atlassian.net/browse/SJIP-557) Feature: (Entity page] Added Family table to Participant entity page
### Technical/ Other changes:
- [SJIP-366](https://d3b.atlassian.net/browse/SJIP-366) Refactor: [User-API] Merge the Ferlab User-API to address Penetration Test issues
- [SJIP-379](https://d3b.atlassian.net/browse/SJIP-379) Fix:[UI Theme] Adjusted the table of results colors and states for table actions
- [SJIP-381](https://d3b.atlassian.net/browse/SJIP-381) Fix: [Profile page] Fixed typos
- [SJIP-388](https://d3b.atlassian.net/browse/SJIP-388) Fix: [Entity page] Adjusted the query pill for Study Code in the Querybuilder returning empty results
- [SJIP-424](https://d3b.atlassian.net/browse/SJIP-424) Refactor:[ETL] Adjusted ETL to pull Family unit values directly from FHIR
- [SJIP-458](https://d3b.atlassian.net/browse/SJIP-458) Refactor:[ETL] Updated the Family data representation in ElasticSearch
- [SJIP-511](https://d3b.atlassian.net/browse/SJIP-511) Fix: [Entity] Fixed anchor menu that was static through the section navigation
- [SJIP-522](https://d3b.atlassian.net/browse/SJIP-522) Refactor:[Variant Exploration] Remove the decimals for Variant Position Numerical range facet
- [SJIP-530](https://d3b.atlassian.net/browse/SJIP-530) Fix: [Variant Exploration] Remove NEW Tooltip to Pathogenicity facets
- [SJIP-532](https://d3b.atlassian.net/browse/SJIP-532) Fix: [Variant Exploration] Adjusted the query pill for Study Code in the Querybuilder returning empty results
- [SJIP-535](https://d3b.atlassian.net/browse/SJIP-535) Refactor: [Data Exploration] Set the Container ID column as a default column
- [SJIP-538](https://d3b.atlassian.net/browse/SJIP-538) Fix: [Entity page] Fixed empty export as TSV tables
- [SJIP-541](https://d3b.atlassian.net/browse/SJIP-541) Fix: [Dashboard & Studies] Adjusted Study Code from the internal operational study codes
- [SJIP-546](https://d3b.atlassian.net/browse/SJIP-546) Fix: [ETL] Run ETL to fix the file size results for HTP study
- [SJIP-558](https://d3b.atlassian.net/browse/SJIP-558) Refactor: [Report] Updated the family data representation in clinical data report
- [SJIP-564](https://d3b.atlassian.net/browse/SJIP-564) Refactor: [User-API] Merged to Ferlab User-API to address NIST Penetration testing vulnerabilities (UserCreate)
- [SJIP-565](https://d3b.atlassian.net/browse/SJIP-565) Refactor: [User-API] Merged to Ferlab User-API to address NIST Penetration testing vulnerabilities (Email address)
- [SJIP-567](https://d3b.atlassian.net/browse/SJIP-567) Fix: [Dashboard] Adjusted the query pill for Study Code in the Querybuilder returning empty results when clicking for authorized files

## 2023-06-27 include-portal-ui 1.7.1
### Technical/ Other changes:
- [SJIP-500](https://d3b.atlassian.net/browse/SJIP-500) Fix:[Entity variant] Multiple minor fixes in Variant Entity page
- [SJIP-521](https://d3b.atlassian.net/browse/SJIP-521) Refactor: [Data Exploration, Variants] Disabled No Data in numerical range facets
- [SJIP-526](https://d3b.atlassian.net/browse/SJIP-526) Refactor: [Studies] Updated parameter to display more than 10 studies
- [SJIP-527](https://d3b.atlassian.net/browse/SJIP-527) Refactor: [UI] Updated to use the Study Code field instead of Study ID
- [SJIP-528](https://d3b.atlassian.net/browse/SJIP-528) Fix: [Variants] Updated the Search by Gene to the new ETL model
- [SJIP-529](https://d3b.atlassian.net/browse/SJIP-529) Fix: [Authorized Studies] Fix auth studies sqon

## 2023-06-27 include-portal-ui 1.7.0
### Features:
- [SJIP-342](https://d3b.atlassian.net/browse/SJIP-342) Feature:[Data Exploration & Variant Exploration] Implemented the new SearchAfter table of results 
- [SJIP-350](https://d3b.atlassian.net/browse/SJIP-350) Feature: [Entity] Implemented Participant Entity Page
- [SJIP-351](https://d3b.atlassian.net/browse/SJIP-351) Feature: [Entity] Implemented File Entity Page
- [SJIP-372](https://d3b.atlassian.net/browse/SJIP-372) Feature: [Variant Exploration] Implemented Variant Exploration page
- [SJIP-377](https://d3b.atlassian.net/browse/SJIP-377) Feature: [Entity] Implemented Variant Entity page
- [SJIP-378](https://d3b.atlassian.net/browse/SJIP-378) Feature:[Data & Variant exploration] Updated the version of SearchAfter for pagination
- [SJIP-392](https://d3b.atlassian.net/browse/SJIP-392) Feature:[Dashboard & Variant exploration] Added Variants to Saved Sets and Saved Filters
- [SJIP-400](https://d3b.atlassian.net/browse/SJIP-400) Feature:[Data Exploration] Added a system grid to the summary view
- [SJIP-460](https://d3b.atlassian.net/browse/SJIP-460) Feature:[Data Exploration] Added the External IDs to table 
- [SJIP-448](https://d3b.atlassian.net/browse/SJIP-448) Feature:[UI]Updated the Age illustration to have years and days
- [SJIP-505](https://d3b.atlassian.net/browse/SJIP-505) Feature:[UI]Added maintenance page 
### Technical/ Other changes:
- [SJIP-265](https://d3b.atlassian.net/browse/SJIP-265) Fix:[Registration]Fixed the cancel redirect in registration to redirect to the landing page
- [SJIP-299](https://d3b.atlassian.net/browse/SJIP-299) Refactor:[Upload list] Updated Duplicate IDs messaging
- [SJIP-294](https://d3b.atlassian.net/browse/SJIP-294) Fix:[Data Exploration]Fixed HPO/MONDO tree Window resize overlap 
- [SJIP-295](https://d3b.atlassian.net/browse/SJIP-295) Refactor:[Saved Set] Inactivated button state when there is no selection
- [SJIP-316](https://d3b.atlassian.net/browse/SJIP-316) Refactor: [Data Exploration] Adjusted "Study Code" to "Study" column header in Participant tab
- [SJIP-317](https://d3b.atlassian.net/browse/SJIP-317) Refactor:[Data exploration] Removed the “S” to Data Files category
- [SJIP-321](https://d3b.atlassian.net/browse/SJIP-321) Refactor:[Header] Added focus state to top menu header items
- [SJIP-322](https://d3b.atlassian.net/browse/SJIP-322) Refactor:[Dashboard] Changed the biospecimen icon
- [SJIP-324](https://d3b.atlassian.net/browse/SJIP-324) Fix:[Landing page] Fixed incorrect icons for Biospecimens et Data Files
- [SJIP-340](https://d3b.atlassian.net/browse/SJIP-340) Fix:[Community] Fixed filter by Data use that returned no results
- [SJIP-343](https://d3b.atlassian.net/browse/SJIP-343) Refactor:[Dashboard] Added missing notification when adding or deleting saved filter
- [SJIP-344](https://d3b.atlassian.net/browse/SJIP-344) Refactor: [Cavatica] Updated placeholder for new Cavatica project modal
- [SJIP-345](https://d3b.atlassian.net/browse/SJIP-345) Refactor: [Saved Set] Changed icon for adding and removing existing  saved set
- [SJIP-348](https://d3b.atlassian.net/browse/SJIP-348) Refactor:[Studies] Added dashes to empty cells
- [SJIP-352](https://d3b.atlassian.net/browse/SJIP-352) Fix: [HPO & MONDO tree] Updated the input search box to work with character "/"
- [SJIP-370](https://d3b.atlassian.net/browse/SJIP-370) Refactor: [UI] Updated to Ferlab UI kit 5.0
- [SJIP-397](https://d3b.atlassian.net/browse/SJIP-397) Refactor: [UI] Added commas to all applicable numbers over 1000
- [SJIP-402](https://d3b.atlassian.net/browse/SJIP-402) Fix: [HPO & MONDO tree] Triggered HPO/Mondo tree modal search for strings of 3 characters
- [SJIP-407](https://d3b.atlassian.net/browse/SJIP-407) Refactor: [Data Exploration] Added dashes to empty cells
- [SJIP-418](https://d3b.atlassian.net/browse/SJIP-418) Refactor:[Community Page] Removed the Upload photo
- [SJIP-420](https://d3b.atlassian.net/browse/SJIP-420) Refactor: [Studies] Sorted studies by alphabetical study code order
- [SJIP-426](https://d3b.atlassian.net/browse/SJIP-426) Refactor:[ETL] Configured the ETL to pull from KF FHIR server and INCLUDE FHIR server for their respective studies
- [SJIP-429](https://d3b.atlassian.net/browse/SJIP-429) Fix:[UI] Adjusted color for modal labels
- [SJIP-438](https://d3b.atlassian.net/browse/SJIP-438) Refactor: [ETL] Updated the logic for the Family count
- [SJIP-436](https://d3b.atlassian.net/browse/SJIP-436) Refactor: [Reports] Renamed columns in download reports
- [SJIP-446](https://d3b.atlassian.net/browse/SJIP-446) Refactor:[Data Exploration] Enlarged the ID columns to avoid the ID from wrapping
- [SJIP-465](https://d3b.atlassian.net/browse/SJIP-465) Refactor:[Data Exploration] Changed the placeholders for Search by __ and Upload facets
- [SJIP-472](https://d3b.atlassian.net/browse/SJIP-472) Refactor:[Data Exploration] Added  the title  " Data Exploration" to the page
- [SJIP-470](https://d3b.atlassian.net/browse/SJIP-470) Refactor: [Data Exploration] Set the Container ID as a default column in Biospecimens tab
- [SJIP-477](https://d3b.atlassian.net/browse/SJIP-477) Fix: [Report] Added Condition (Source Text)field in reports
- [SJIP-482](https://d3b.atlassian.net/browse/SJIP-482) Refactor:[Data Exploration] Added a dash to cells where Family Unit = Null
- [SJIP-486](https://d3b.atlassian.net/browse/SJIP-486) Refactor: [Data Exploration] Adjusted query pills for Collection ID

## 2022-10-06 include-portal-ui 1.6.1
### Technical/ Other changes:
- [SJIP-337](https://d3b.atlassian.net/browse/SJIP-337) Adjust the choice of operator to include "All of" under the first "Any of"
- [SJIP-338](https://d3b.atlassian.net/browse/SJIP-338) Adjust the MONDO & HPO external URL from Monarch and HPO Jax to OLS

## 2022-10-06 include-portal-ui 1.6.0
### Features
- [SJIP-333](https://d3b.atlassian.net/browse/SJIP-333) [Studies & Data exploration] Add a popover for ABC-DS study
- [SJIP-332](https://d3b.atlassian.net/browse/SJIP-332) [Data Exploration] Update mondo terms to latest version
### Technical/ Other changes:
- [SJIP-328](https://d3b.atlassian.net/browse/SJIP-328) Add Data Category checkmarks for various studies - due because of fhir update
- [SJIP-329](https://d3b.atlassian.net/browse/SJIP-329) DS Status incorrectly labeled in the Column selection tool
- [SJIP-330](https://d3b.atlassian.net/browse/SJIP-330) Adjust the Column name Diagnosis (Source Text) to Condition (Source Text)

## 2022-09-16 include-portal-ui 1.5.0
### Features
- [SJIP-267](https://d3b.atlassian.net/browse/SJIP-267) Feature: Connected portal to Google Analytics
- [SJIP-304](https://d3b.atlassian.net/browse/SJIP-304) Feature (Community Page): Add a search by name or affiliation & Filters
- [SJIP-305](https://d3b.atlassian.net/browse/SJIP-305) Feature (Community Page): Refactor the members list to a grid style
- [SJIP-306](https://d3b.atlassian.net/browse/SJIP-306) Feature (Profile Page): Implemented a Profile Page that can be viewed and edited
### Technical/ Other changes:
- [SJIP-318](https://d3b.atlassian.net/browse/SJIP-318) Refactor: Removed Beta Tag across the portal

## 2022-07-11 include-portal-ui 1.4.0
### Features
- [SJIP-302](https://d3b.atlassian.net/browse/SJIP-302) Feature (Explore Data): Saved Filter Name Ellipsis in Query Management bar to be more dynamic
- [SJIP-282](https://d3b.atlassian.net/browse/SJIP-282) Feature (Explore Data): Integrate UploadIds Component (ferlab) for each Category
### Technical / Other changes
- [SJIP-296](https://d3b.atlassian.net/browse/SJIP-296) Fix (Saved Set, Filter): Remove Character Limit
- [SJIP-284](https://d3b.atlassian.net/browse/SJIP-284) Fix (HPO/MONDO Tree): Search results should still display the drill down options
- [SJIP-279](https://d3b.atlassian.net/browse/SJIP-279) Fix (Data Exploration): Download Participant & Family data - missing some data rows

## 2022-05-31 include-portal-ui 1.3.0
### Features
- [SJIP-257](https://d3b.atlassian.net/browse/SJIP-257) Feature (Dashboard): Added information icon and popover to Saved Filters and Saved Sets widget
### Technical / Other changes
- [SJIP-275](https://d3b.atlassian.net/browse/SJIP-275) Fix (Mobile, Login): Fixed the login button visibility on the mobile website
- [SJIP-283](https://d3b.atlassian.net/browse/SJIP-283)Refactor (Explore Data, Facet): Adjusted facet name to Age at Biospec. Collection (days)
- [SJIP-288](https://d3b.atlassian.net/browse/SJIP-288) Refactor (Explore Data, Facet): Refactored the number of participants associated to terms in the HPO and MONDO explorer to remain in place when a wrap occurred
- [SJIP-292](https://d3b.atlassian.net/browse/SJIP-292) Fix (Explore Data, QueryBuilder): Fixed an error that would appear when selecting a saved query in the QueryBuilder
- [SJIP-293](https://d3b.atlassian.net/browse/SJIP-293) Fix (Support): Corrected the contact support email to support@includedcc.org

## 2022-05-03 include-portal-ui 1.2.0
### Features
- [SJIP-220](https://d3b.atlassian.net/browse/SJIP-220) Feature (Dashboard): Implemented Saved Sets widget to dashboard
- [SJIP-226](https://d3b.atlassian.net/browse/SJIP-226) Feature (Explore Data, Table): Implemented Saved Set buttons for the tables of each entity tab
- [SJIP-227](https://d3b.atlassian.net/browse/SJIP-227) Feature (Explore Data, QueryBuilder): Added a Share button to the QueryBuilder to share the queries of a Saved Filter
- [SJIP-268](https://d3b.atlassian.net/browse/SJIP-268) Feature (Explore Data, QueryBuilder): Added an Undo button to return to the Saved Filters original state after adding or removing unsaved filters
### Technical / Other changes
- [SJIP-256](https://d3b.atlassian.net/browse/SJIP-256) Fix (Explore Data, Table): Fixed Export TSV loading indefinitely for Biospecimen and Data Files tables
- [SJIP-259](https://d3b.atlassian.net/browse/SJIP-259) Refactor (Explore Data, Summary View): Display the Observed Phenotype and the Diagnosis sunbursts based on the active participants in a query
- [SJIP-261](https://d3b.atlassian.net/browse/SJIP-261) Refactor (Explore Data, QueryBuilder): Refactored the query count of combined queries to dynamically update when the subquery is modified
- [SJIP-269](https://d3b.atlassian.net/browse/SJIP-269) Fix (Explore Data, Table):  Fixed the Download report error on larger requests

## 2022-04-04 include-portal-ui 1.1.0
### Features:
- [SJIP-178](https://d3b.atlassian.net/browse/SJIP-178) Feature: Added a Participant ID search box for the Participant Facets
- [SJIP-179](https://d3b.atlassian.net/browse/SJIP-179) Feature: Added a Biospecimen ID search box in the Biospecimen Facets
- [SJIP-180](https://d3b.atlassian.net/browse/SJIP-180) Feature: Added a File ID search box in the Data File Facets
- [SJIP-217](https://d3b.atlassian.net/browse/SJIP-217) Feature: Added Operators (Any of, All of, None of) to facets and query pills in the query builder
- [SJIP-218](https://d3b.atlassian.net/browse/SJIP-218) Feature: Implemented the Diagnosis (MONDO) tree as a facet and added the sunburst in the Summary page
- [SJIP-236](https://d3b.atlassian.net/browse/SJIP-236) Feature: Added Operators to both Observed phenotype (HPO) and Diagnosis (MONDO) tree
### Technical/ Other changes:
- [SJIP-185](https://d3b.atlassian.net/browse/SJIP-185) Refactor (Data Exploration, Facets): Adjusted the facet name from "DS Status" to "Down Syndrome Status"
- [SJIP-209](https://d3b.atlassian.net/browse/SJIP-209) Refactor (Data Exploration, Query Builder): Selecting the number of participants, biospecimens, or data files in the table of results will now create a new query instead of replacing the current active query
- [SJIP-219](https://d3b.atlassian.net/browse/SJIP-219) Refactor (Data Exploration, Data Files): Added "URL" as a non-default column in the Data Files table
- [SJIP-225](https://d3b.atlassian.net/browse/SJIP-225) Refactor (Study page): Adjusted the list of study rows to be static
- [SJIP-240](https://d3b.atlassian.net/browse/SJIP-240) Fix (Dashboard, Saved Filters widget): Fixed the incorrect elapsed time from the moment a filter being saved

# Release notes for include-portal-ui

<!--
## 2020-01-?? include-portal-ui 1.??.??

### Features

### Technical / Other changes
-->

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

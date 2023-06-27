# Release notes for include-portal-ui

<!--
## 2020-01-?? include-portal-ui 1.??.??

### Features

### Technical / Other changes
-->
## 2023-06-27 include-portal-ui 1.7.0
### Features:
[SJIP-342](https://d3b.atlassian.net/browse/SJIP-342) Feature:[Data Exploration & Variant Exploration] Implemented the new SearchAfter table of results 
[SJIP-350](https://d3b.atlassian.net/browse/SJIP-350) Feature: [Entity] Implemented Participant Entity Page
[SJIP-351](https://d3b.atlassian.net/browse/SJIP-351) Feature: [Entity] Implemented File Entity Page
[SJIP-372](https://d3b.atlassian.net/browse/SJIP-372) Feature: [Variant Exploration] Implemented Variant Exploration page
[SJIP-377](https://d3b.atlassian.net/browse/SJIP-377) Feature: [Entity] Implemented Variant Entity page
[SJIP-378](https://d3b.atlassian.net/browse/SJIP-378) Feature:[Data & Variant exploration] Updated the version of SearchAfter for pagination
[SJIP-392](https://d3b.atlassian.net/browse/SJIP-392) Feature:[Dashboard & Variant exploration] Added Variants to Saved Sets and Saved Filters
[SJIP-400](https://d3b.atlassian.net/browse/SJIP-400) Feature:[Data Exploration] Added a system grid to the summary view
[SJIP-460](https://d3b.atlassian.net/browse/SJIP-460) Feature:[Data Exploration] Added the External IDs to table 
[SJIP-448](https://d3b.atlassian.net/browse/SJIP-448) Feature:[UI]Updated the Age illustration to have years and days
[SJIP-505](https://d3b.atlassian.net/browse/SJIP-505) Feature:[UI]Added maintenance page 

### Technical/ Other changes:
[SJIP-265](https://d3b.atlassian.net/browse/SJIP-265) Fix:[Registration]Fixed the cancel redirect in registration to redirect to the landing page
[SJIP-299](https://d3b.atlassian.net/browse/SJIP-299) Refactor:[Upload list] Updated Duplicate IDs messaging
[SJIP-294](https://d3b.atlassian.net/browse/SJIP-294) Fix:[Data Exploration]Fixed HPO/MONDO tree Window resize overlap 
[SJIP-295](https://d3b.atlassian.net/browse/SJIP-295) Refactor:[Saved Set] Inactivated button state when there is no selection
[SJIP-316](https://d3b.atlassian.net/browse/SJIP-316) Refactor: [Data Exploration] Adjusted "Study Code" to "Study" column header in Participant tab
[SJIP-317](https://d3b.atlassian.net/browse/SJIP-317) Refactor:[Data exploration] Removed the “S” to Data Files category
[SJIP-321](https://d3b.atlassian.net/browse/SJIP-321) Refactor:[Header] Added focus state to top menu header items
[SJIP-322](https://d3b.atlassian.net/browse/SJIP-322) Refactor:[Dashboard] Changed the biospecimen icon
[SJIP-324](https://d3b.atlassian.net/browse/SJIP-324) Fix:[Landing page] Fixed incorrect icons for Biospecimens et Data Files
[SJIP-340](https://d3b.atlassian.net/browse/SJIP-340) Fix:[Community] Fixed filter by Data use that returned no results
[SJIP-343](https://d3b.atlassian.net/browse/SJIP-343) Refactor:[Dashboard] Added missing notification when adding or deleting saved filter
[SJIP-344](https://d3b.atlassian.net/browse/SJIP-344) Refactor: [Cavatica] Updated placeholder for new Cavatica project modal
[SJIP-345](https://d3b.atlassian.net/browse/SJIP-345) Refactor: [Saved Set] Changed icon for adding and removing existing  saved set
[SJIP-348](https://d3b.atlassian.net/browse/SJIP-348) Refactor:[Studies] Added dashes to empty cells
[SJIP-352](https://d3b.atlassian.net/browse/SJIP-352) Fix: [HPO & MONDO tree] Updated the input search box to work with character "/"
[SJIP-370](https://d3b.atlassian.net/browse/SJIP-370) Refactor: [UI] Updated to Ferlab UI kit 5.0
[SJIP-397](https://d3b.atlassian.net/browse/SJIP-397) Refactor: [UI] Added commas to all applicable numbers over 1000
[SJIP-402](https://d3b.atlassian.net/browse/SJIP-402) Fix: [HPO & MONDO tree] Triggered HPO/Mondo tree modal search for strings of 3 characters
[SJIP-407](https://d3b.atlassian.net/browse/SJIP-407) Refactor: [Data Exploration] Added dashes to empty cells
[SJIP-418](https://d3b.atlassian.net/browse/SJIP-418) Refactor:[Community Page] Removed the Upload photo
[SJIP-420](https://d3b.atlassian.net/browse/SJIP-420) Refactor: [Studies] Sorted studies by alphabetical study code order
[SJIP-426](https://d3b.atlassian.net/browse/SJIP-426) Refactor:[ETL] Configured the ETL to pull from KF FHIR server and INCLUDE FHIR server for their respective studies
[SJIP-429](https://d3b.atlassian.net/browse/SJIP-429) Fix:[UI] Adjusted color for modal labels
[SJIP-438](https://d3b.atlassian.net/browse/SJIP-438) Refactor: [ETL] Updated the logic for the Family count
[SJIP-436](https://d3b.atlassian.net/browse/SJIP-436) Refactor: [Reports] Renamed columns in download reports
[SJIP-446](https://d3b.atlassian.net/browse/SJIP-446) Refactor:[Data Exploration] Enlarged the ID columns to avoid the ID from wrapping
[SJIP-465](https://d3b.atlassian.net/browse/SJIP-465) Refactor:[Data Exploration] Changed the placeholders for Search by __ and Upload facets
[SJIP-472](https://d3b.atlassian.net/browse/SJIP-472) Refactor:[Data Exploration] Added  the title  " Data Exploration" to the page
[SJIP-470](https://d3b.atlassian.net/browse/SJIP-470) Refactor: [Data Exploration] Set the Container ID as a default column in Biospecimens tab
[SJIP-477](https://d3b.atlassian.net/browse/SJIP-477) Fix: [Report] Added Condition (Source Text)field in reports
[SJIP-482](https://d3b.atlassian.net/browse/SJIP-482) Refactor:[Data Exploration] Added a dash to cells where Family Unit = Null
[SJIP-486](https://d3b.atlassian.net/browse/SJIP-486) Refactor: [Data Exploration] Adjusted query pills for Collection ID

### 2022-10-06 include-portal-ui 1.6.1
### Technical/ Other changes:
[SJIP-337](https://d3b.atlassian.net/browse/SJIP-337) Adjust the choice of operator to include "All of" under the first "Any of"
[SJIP-338](https://d3b.atlassian.net/browse/SJIP-338) Adjust the MONDO & HPO external URL from Monarch and HPO Jax to OLS

### 2022-10-06 include-portal-ui 1.6.0
### Features
[SJIP-333](https://d3b.atlassian.net/browse/SJIP-333) [Studies & Data exploration] Add a popover for ABC-DS study
[SJIP-332](https://d3b.atlassian.net/browse/SJIP-332) [Data Exploration] Update mondo terms to latest version
### Technical/ Other changes:
[SJIP-328](https://d3b.atlassian.net/browse/SJIP-328) Add Data Category checkmarks for various studies - due because of fhir update
[SJIP-329](https://d3b.atlassian.net/browse/SJIP-329) DS Status incorrectly labeled in the Column selection tool
[SJIP-330](https://d3b.atlassian.net/browse/SJIP-330) Adjust the Column name Diagnosis (Source Text) to Condition (Source Text)

### 2022-09-16 include-portal-ui 1.5.0
### Features
[SJIP-267](https://d3b.atlassian.net/browse/SJIP-267) Feature: Connected portal to Google Analytics
[SJIP-304](https://d3b.atlassian.net/browse/SJIP-304) Feature (Community Page): Add a search by name or affiliation & Filters
[SJIP-305] (https://d3b.atlassian.net/browse/SJIP-305) Feature (Community Page): Refactor the members list to a grid style
[SJIP-306] (https://d3b.atlassian.net/browse/SJIP-306) Feature (Profile Page): Implemented a Profile Page that can be viewed and edited
### Technical/ Other changes:
[SJIP-318](https://d3b.atlassian.net/browse/SJIP-318) Refactor: Removed Beta Tag across the portal

## 2022-07-11 include-portal-ui 1.4.0
### Features
- [SJIP-302](https://d3b.atlassian.net/browse/SJIP-302) Feature (Explore Data): Saved Filter Name Ellipsis in Query Management bar to be more dynamic
- [SJIP-282](https://d3b.atlassian.net/browse/SJIP-282) Feature (Explore Data): Integrate UploadIds Component (ferlab) for each Category
## Technical / Other changes
- [SJIP-296](https://d3b.atlassian.net/browse/SJIP-296) Fix (Saved Set, Filter): Remove Character Limit
- [SJIP-284](https://d3b.atlassian.net/browse/SJIP-284) Fix (HPO/MONDO Tree): Search results should still display the drill down options
- [SJIP-279](https://d3b.atlassian.net/browse/SJIP-279) Fix (Data Exploration): Download Participant & Family data - missing some data rows

## 2022-05-31 include-portal-ui 1.3.0
### Features
- [SJIP-257](https://d3b.atlassian.net/browse/SJIP-257) Feature (Dashboard): Added information icon and popover to Saved Filters and Saved Sets widget
## Technical / Other changes
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
## Technical / Other changes
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

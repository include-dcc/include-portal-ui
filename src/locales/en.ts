/* eslint-disable max-len */
import translations from './en.json'; /* eslint-disable max-len */

const filesFacets = {
  data_category: 'Data Category',
  controlled_access: 'Access',
  data_type: 'Data Type',
  file_format: 'File Format',
  file_id: 'File ID',
  size: 'Size',
  access: 'Access',
  sequencing_experiment: {
    experiment_strategy: 'Experimental Strategy',
  },
  acl: 'ACL',
};

const en = {
  ...translations,
  date: {
    years: '{years, plural, =0 {} =1 {year} other {years}}',
    days: '{days, plural, =0 {} =1 {day} other {days}}',
  },
  // Global
  global: {
    yes: 'Yes',
    no: 'No',
    other: 'Other',
    delete: 'Delete',
    cancel: 'Cancel',
    analyse: 'Analysis',
    save: 'Save',
    total: 'Total',
    pleaseDescribe: 'Please describe',
    connect: 'Connect',
    viewInExploration: 'View in exploration',
    search: {
      genes: {
        emptyText: 'No gene found',
        placeholder: 'e.g. BRAF, ENSG00000157764',
        title: 'Search by gene',
        tooltip: 'Enter a Gene Symbol, Gene Alias or Ensembl ID',
      },
      samples: {
        emptyText: 'No sample found',
        placeholder: 'e.g. bs-z8p7wjm7',
        title: 'Search by sample ID',
        tooltip: 'Enter a sample ID',
      },
      variants: {
        emptyText: 'No variant found',
        placeholder: 'e.g. 10-100063679-C-T, rs341',
        title: 'Search by variant',
        tooltip:
          'Enter Variant Locus, Gene Symbol, Gene Alias, Gene AA Change, dbSNP ID, Clinvar ID, Ensembl ID, refseq ID',
      },
      study: {
        emptyText: 'No study found',
        placeholder: 'e.g. KF DSD, Neuroblastoma',
        title: 'Search by study',
        tooltip: 'Search by Study Code, Study Name, dbGaP Accession Number',
      },
      participant: {
        emptyText: 'No participants found',
        placeholder: 'e.g. pt-005X8BR9, HTP0001',
        title: 'Search by Participant ID',
        tooltip: 'Search by Participant ID or External Participant ID',
      },
      participantSet: {
        emptyText: 'No participant sets found',
        placeholder: 'Select a saved set',
        title: 'Saved Participant Sets',
      },
      biospecimen: {
        emptyText: 'No samples found',
        placeholder: 'e.g. bs-019260B4, SSH3953290',
        title: 'Search by Sample ID',
        tooltip: 'Search by Sample ID or External Sample ID',
        collection: {
          emptyText: 'No collection ID found',
          placeholder: 'e.g. bs-022KAEZW',
          title: 'Search by Collection ID',
        },
      },
      biospecimenSet: {
        title: 'Saved Biospecimen Sets',
        emptyText: 'No sample sets found',
      },
      file: {
        emptyText: 'No files found',
        placeholder: 'e.g. GF_001CSF26',
        title: 'Search by File ID',
      },
      fileSet: {
        title: 'Saved File Sets',
        emptyText: 'No file sets found',
      },
    },
    filters: {
      actions: {
        all: 'All',
        none: 'None',
        clear: 'Clear',
        less: 'Less',
        more: 'More',
        apply: 'Apply',
      },
      operators: {
        between: 'Between',
        lessthan: 'Less than',
        lessthanorequal: 'Less than or equal',
        greaterthan: 'Greater than',
        greaterthanorequal: 'Greater than or equal',
      },
      range: {
        is: 'Is',
      },
      messages: {
        empty: 'No values found',
      },
      checkbox: {
        placeholder: 'Search...',
      },
      quickfilter: {
        placeholder: 'Search...',
        emptyMessage: 'Min. 3 characters',
        placeholderError: 'Forbidden characters  ( ) [ ] | \\ * + ?',
      },
    },
    forms: {
      errors: {
        minCharacters: 'characters minimum',
        requiredField: 'This field is required',
        enterValidEmail: 'Enter a valid email',
        enterValidUrl: 'Enter a valid URL',
      },
    },
    errors: {
      403: 'Sorry, you are not authorized to access this page.',
      404: 'Sorry, the page you visited does not exist.',
      500: 'Sorry, something went wrong.',
      backHome: 'Back home',
      query: {
        notFound: {
          title: 'Query not found',
          content:
            'We were unable to load your query. Please try again or <a href="{href}" style="text-decoration: underline;" target="_blank">contact support</a>.',
          okText: 'Close',
        },
      },
    },
    notification: {
      genericError: 'An error occured',
    },
    proTable: {
      clear: 'Clear',
      clearFilters: 'Clear filters',
      result: 'Result',
      results: 'Results',
      noResults: 'No Results',
      of: 'of',
      selected: 'item selected',
      selectedPlural: 'items selected',
      selectAll: 'Select all results',
      tooltips: {
        tableExport: 'Export as TSV',
      },
      columnSelector: {
        tooltips: {
          columns: 'Columns',
        },
        reset: 'Reset',
      },
    },
    viewInDataExploration: 'View in data exploration',
  },
  maintenance: {
    title: 'We are currently down for maintenance',
    subtitle:
      'We apologize for any inconvenience and appreciate your understanding while we work to bring the portal back online.',
  },
  // API
  api: {
    savedFilter: {
      error: {
        title: 'Error',
        messageUpdate: 'Unable to update filter',
        messageDelete: 'Unable to delete filter',
        nameAlreadyExists: 'A filter with this name already exists',
      },
      success: {
        messageSaved: 'Filter saved',
        messageDeleted: 'Filter deleted',
      },
    },
    savedSet: {
      modal: {
        okText: 'Save',
        name: 'Name',
        placeholder: 'Enter the name of your new set',
      },
      error: {
        duplicate: 'A set with this name already exists',
        title: 'Error',
        temporary: 'Unable to add set to data exploration',
        messageUpdate: 'Unable to update set',
        messageDelete: 'Unable to delete set',
        messageCreate: 'Unable to create set',
      },
      success: {
        titleCreate: 'Your set has been saved.',
        temporary: 'Set added to data exploration.',
        messageCreate: 'You can add your sets to a query from the sidebar or the dashboard.',
        titleUpdate: 'Success',
        messageUpdate: 'Your set has been updated.',
      },
    },
    biospecimenRequest: {
      error: {
        messageUpdate: 'Unable to update biospecimen request',
        messageDelete: 'Unable to delete biospecimen request',
        manifestReport:
          'An error occurred and we were unable to download your file. Please try again.',
      },
      success: {
        messageUpdate: 'Your biospecimen request has been updated.',
        manifestReport: 'Manifest downloaded successfully.',
      },
    },
    cavatica: {
      error: {
        title: 'Error',
        projects: {
          fetch: 'Unable to fetch your cavatica projects.',
          create: 'Unable to create your cavatica project.',
        },
        billingGroups: {
          fetch: 'Unable to fetch your cavatica billing groups.',
        },
        bulk: {
          import: 'Unable to copy files to your project',
          fetchFiles: 'Unable to fetch selected files',
        },
        fileAuth: {
          title: 'Unauthorized files',
          description:
            'You are not authorized to analyze the files you have selected. Learn more about data access.',
        },
      },
      success: {
        title: 'Success',
        description: `<div><p>Your files have been copied to: <strong>{destination}</strong></p>
          <p>If you have uploaded more than 10000 files in the last 5 minutes, the import may take a little longer.</p>
          <a href="{userBaseUrl}" rel="noreferrer" style="color:unset;text-decoration:underline;" target="_blank">Open project in Cavatica</a><div>`,
        projects: {
          create: 'Project created successfully',
        },
        bulk: {
          import: {
            copySuccess: 'Your files have been copied to: <strong>{destination}</strong>',
            possibleDelays:
              'If you have uploaded more than 10000 files in the last 5 minutes, the import may take a little longer.',
            openProject: 'Open project in Cavatica',
          },
        },
      },
    },
    report: {
      biospecimenData: {
        download: 'Download sample data',
      },
      clinicalData: {
        download: 'Download clinical data',
        family:
          '{count, plural, =0 {Selected participant & family} =1 {Selected participant & family} other {Selected participants & families}}',
        participant:
          '{count, plural, =0 {Selected participant} =1 {Selected participant} other {Selected participants}}',
      },
      loading: {
        message: 'Your download is being prepared. This process may take several minutes.',
      },
      error: {
        title: 'Error',
        message:
          'An error has occurred. Your download could not be processed. Please try again or <a target="_blank" href="{mailto}" style="color: unset; text-decoration: underline;">contact support</a>.',
        tooMuchFilesTitle: 'Maximum number exceeded',
        tooMuchFiles:
          'A maximum of 10,000 files can be inlcuded at a time. Please narrow your selection and try again.',
      },
      inProgress: {
        title: 'Processing',
        fetchReport: 'Fetching Report, please wait',
      },
      onSuccess: {
        title: 'Success',
        fetchReport: 'Report downloaded successfully',
      },
      fileManifest: {
        button: 'Manifest',
        title: 'File manifest',
        okText: 'Download',
        cancel: 'Cancel',
        text: `Download a manifest of the selected files which can be used for bulk downloading using Cavatica’s <a target="_blank" href="https://docs.cavatica.org/docs/import-from-a-drs-server" style="text-decoration: underline;">Import from an GA4GH Data Repository Service (DRS)</a>. This manifest also includes additional information, including the participant and samples associated with these files.`,
        subText: 'In development and will be available soon.',
        textCheckbox: `Include data files of the same type for the participants' related family members for this selection.`,
        summary: 'Summary',
        dataType: 'Data Type',
        participants: 'Participants',
        files: 'Files',
        size: 'Size',
      },
    },
    noData: 'No data',
  },
  // COMPONENTS
  components: {
    filterList: {
      collapseAll: 'Collapse all',
      expandAll: 'Expand all',
    },
    table: {
      itemCount: {
        singlePage: '{count, plural, =0 {No result} other {<strong>#</strong> results}}',
        multiplePages:
          'Results <strong>{from}</strong> - <strong>{to}</strong> of <strong>{total}</strong>',
      },
    },
    suggester: {
      error: {
        title: 'Error',
        description: 'An error occurred while fetching suggestions',
      },
      noResultsFound: 'No results found',
    },
    querybuilder: {
      defaultTitle: 'Untitled Filter',
      header: {
        modal: {
          edit: {
            title: 'Edit filter',
            okText: 'Save',
            cancelText: 'Cancel',
            input: {
              label: 'Filter name',
              placeholder: 'Untitled filter',
              maximumLength: 'characters maximum',
            },
          },
          confirmUnsaved: {
            title: 'Unsaved changes',
            openSavedFilter: {
              okText: 'Continue',
              cancelText: 'Cancel',
              content: 'You are about to open a saved filter; all modifications will be lost.',
            },
            createNewFilter: {
              okText: 'Create',
              cancelText: 'Cancel',
              content: 'You are about to create a new filter; all modifications will be lost.',
            },
          },
        },
        popupConfirm: {
          delete: {
            title: 'Permanently delete this filter?',
            okText: 'Delete filter',
            cancelText: 'Cancel',
            content: 'You are about to permanently delete this filter and all of its queries.',
          },
        },
        tooltips: {
          newQueryBuilder: 'New filter',
          save: 'Save filter',
          saveChanges: 'Save changes',
          saveDisabled: 'Add a query to save',
          delete: 'Delete filter',
          duplicateQueryBuilder: 'Duplicate filter',
          share: 'Share (Copy url)',
          shareDisabled: 'Save filter to share',
          setAsDefaultFilter: 'Set as default filter',
          unsetDefaultFilter: 'Unset default filter',
          undoChanges: 'Discard unsaved changes',
          noSavedFilters: 'You have no saved filters',
        },
        myFiltersDropdown: {
          title: 'My Filters',
          manageMyFilters: 'Manage filters',
          okText: 'Close',
          lastSavedAt: 'Last saved : {date} ago',
        },
        duplicateFilterTitleSuffix: 'COPY',
      },
      query: {
        combine: {
          and: 'and',
          or: 'or',
        },
        noQuery: 'Use the search tools & facets on the left to build a query',
      },
      actions: {
        new: 'New',
        changeOperatorTo: 'Change operator to',
        addQuery: 'New query',
        combine: 'Combine',
        compare: 'Compare',
        compareLessTooltips: 'Select 2 or 3 queries to generate a Venn diagram comparison',
        compareGreaterTooltips: 'Only available with 2 or 3 queries selected',
        labels: 'Labels',
        delete: {
          title: 'Delete this query?',
          titleSelected: 'Delete this query?',
          cancel: 'Cancel',
          confirm: 'Delete',
        },
        clear: {
          title: 'Delete all queries?',
          cancel: 'Cancel',
          confirm: 'Delete',
          buttonTitle: 'Clear all',
          description: 'You are about to delete all your queries. They will be lost forever.',
        },
      },
    },
    savedSets: {
      modal: {
        edit: {
          title: 'Save this Set',
          okText: 'Save',
          cancelText: 'Cancel',
          input: {
            label: 'Set name',
            placeholder: 'Untitled Set',
            maximumLength: 'characters maximum',
          },
        },
        saveThisFilter: 'Save this filter',
        add: {
          title: 'Add to a {type} set',
          okText: 'Add to set',
          cancelText: 'Cancel',
        },
        remove: {
          title: 'Remove from a {type} set',
          okText: 'Remove from set',
          cancelText: 'Cancel',
        },
        errors: {
          permittedCharacters: 'Permitted characters: A-Z a-z 0-9 ()[]-_:|.,',
        },
      },
      popupConfirm: {
        delete: {
          title: 'Permanently delete this set?',
          okText: 'Delete set',
          cancelText: 'Cancel',
          content: 'You are about to permanently delete this set.',
        },
      },
    },
    dataRelease: {
      studies: 'Studies',
      participants: 'Participants',
      biospecimens: 'Biospecimens',
      datafiles: 'Data Files',
    },
    uploadIds: {
      modal: {
        title: 'Upload a {entity} list',
        submittedColTitle: 'Submitted {entity} identifiers',
        uploadBtnText: 'Upload a {entity} list',
        mappedTo: 'Mapped to',
        collapseTitle: 'Summary Table  ({matchCount} matched, {unMatchCount} unmatched)',
        inputLabel: 'Copy-paste a list of identifiers or upload a file',
        match: 'Matched ({count})',
        unmatch: 'Unmatched ({count})',
        identifiers: {
          participant: 'Participant ID, External Participant ID',
          biospecimen: 'Sample ID, External Sample ID',
          file: 'File ID',
        },
        placeholders: {
          participant: 'e.g. pt-005X8BR9, HTP0001',
          biospecimen: 'e.g. bs-022KAEZW, SSH3953290',
          file: 'e.g. GF_001CSF26, HTP.007855d5-e22e-405f-91f4-d54b4b8a9136.g.vcf.gz',
          sample: 'e.g. bs-022KAEZW',
        },
        tableMessage:
          '{submittedCount} submitted identifiers mapped to {mappedCount} unique system identifiers',
        matchTable: {
          idcol: '{entity} ID',
          participant: {
            matchcol: 'Participant ID',
            mappedcol: 'Study',
          },
          file: {
            matchcol: 'File ID',
            mappedcol: 'Study',
          },
          biospecimen: {
            matchcol: 'Sample ID',
            mappedcol: 'Study',
          },
        },
        pillTitle: 'Uploaded List',
        upload: {
          fileBtn: 'Upload a file',
          btn: 'Upload',
        },
        clearBtn: 'Clear',
        cancelBtn: 'Cancel',
        emptyTable: 'No data',
        popover: {
          title: 'Identifiers and File Formats',
          identifiers: 'Identifiers',
          separatedBy: {
            title: 'Separated by',
            values: 'comma, space, new line',
          },
          uploadFileFormats: 'Upload file formats',
        },
      },
    },
  },
  // LAYOUT
  layout: {
    main: {
      menu: {
        analysis: 'Analysis',
        biospecimen: 'Biospecimen',
        community: 'Community',
        contact: 'Contact',
        dashboard: 'Dashboard',
        datafiles: 'Data Files',
        explore: 'Data Exploration',
        forum: 'Forum',
        help: 'Help',
        participants: 'Participants',
        resources: 'Resources',
        studies: 'Studies',
        variants: 'Variants',
        website: 'Website',
      },
    },
    user: {
      menu: {
        logout: 'Sign out',
        myprofile: 'My Profile',
        settings: 'Profile settings',
        signInWith: 'Signed in with',
      },
    },
  },
  // SCREENS
  screen: {
    memberProfile: {
      notFound: 'User not found',
      rolesTitle: 'Role',
      researchAreaTitle: 'Research area or area of interest',
      noRoles: 'No role',
      usageTitle: 'Intended use of the INCLUDE Portal Data',
      noUsage: 'No intended usages',
      editProfileBtn: 'Edit Profile',
      communityBtn: 'Community',
    },
    community: {
      title: 'INCLUDE Community',
      resultMember: 'Member',
      resultsMember: 'Members',
      noResults: 'No members',
      search: {
        filters: 'Filters',
        selectPlaceholder: 'Select',
        role: 'Role',
        dataUse: 'Data use',
        clearFilters: 'Clear filters',
        barPlaceholder: 'Search by member name or affiliation',
        sorter: {
          newest: 'Newest first',
          oldest: 'Oldest first',
          lastnameAlpha: 'Alphabetical (last name)',
        },
      },
      roleOptions: {
        researcher: 'Researcher at an Academic or not-for-profit Institution',
        representative: 'Representative from a for-profit or Commercial Entity',
        developer: 'tool or algorithm developer',
        clinician: 'Clinician',
        community_member: 'Community Member',
        federal_employee: 'Federal Employee',
      },
      usage: {
        learn_more_about_down_syndrome:
          'Learning more about Down syndrome and its health outcomes, management, and/or treatment',
        help_design_new_research_study: 'Helping me design a new research study',
        identifying_dataset: 'Identifying datasets that I want to analyze',
        commercial_purpose: 'Commercial purposes',
      },
    },
    profileSettings: {
      title: 'Profile Settings',
      viewProfile: 'View profile',
      cards: {
        deleteAccount: {
          title: 'Delete Account',
          button: 'Delete my account',
          notice:
            'You will no longer be able to sign into the INCLUDE data portal. All of your saved sets and queries will be lost. You can create a new account at any time.',
          confirm: {
            content: 'Are you sure you want to permanently delete this account?',
          },
        },
        identification: {
          title: 'Identification',
          alert:
            'You are authenticated with <strong>{provider}</strong> using <strong>{email}</strong>. This email is never shown to the public and cannot be changed.',
          firstName: 'First Name',
          yourFirstName: 'Your First Name',
          lastName: 'Last Name',
          yourLastName: 'Your Last Name',
          publicEmail: 'Public Email',
          publicEmailNotice:
            'This email will be displayed on your profile page and accessible to all logged-in users of the portal.',
          editPhotoModalTitle: 'Edit photo',
          uploadImageError: 'Unable to upload your image at the moment',
          removePhotoModalTitle: 'Remove profile photo?',
          removePhotoModalButton: 'Yes remove photo',
          removePhotoModalMessage:
            'Are you sure you want to remove your photo? We will replace it with a default avatar.',
          uploadPhotoButton: 'Upload photo',
          removePhotoButton: 'Remove photo',
        },
        roleAffiliation: {
          title: 'Role & Affiliation',
          iama: 'I am a',
          checkAllThatApply: 'Check all that apply',
          provideAffiliation: 'Provide institutional or organizational affiliation',
          affiliatedWith: 'I am affiliated with',
          dontHaveAffiliation: 'I do not have an institutional affiliation',
          describeResearchArea: 'My research area or area of interest may best be described as',
          provideABriefLink:
            'Provide a brief description and a link to your professional biography or organization website, if available',
        },
        newsletter: {
          title: 'Newsletter',
          consent:
            'By subscribing to our newsletter, you agree to be added to our email list, through which you will receive periodic portal updates, important announcements, promotions, and relevant information. You can unsubscribe anytime by clicking the \'unsubscribe\' link in our emails. You can review our <a href="{policyLinkHref}" target="_blank" style="text-decoration: underline;">{policyLink}</a>.',
          checkbox:
            'I agree to receive the INCLUDE Data Hub quarterly newsletter to get the latest news.',
          policyLink: 'INCLUDE DCC privacy policy',
          warning: 'Your subscription status could not be confirmed. Please try again.',
          placeholder: 'email@domain.com',
          error: {
            title: 'Newsletter Subscription',
            subscribeMessage:
              'We encountered an issue while trying to subscribe you to our newsletter. Please try again later from your profile page or contact support for assistance.',
            unsubscribeMessage:
              'We encountered an issue while trying to subscribe you to our newsletter. Please try again later from your profile page or contact support for assistance.',
          },
        },
        saveChanges: 'Save changes',
        discardChanges: 'Discard changes',
      },
    },
    loginPage: {
      title: 'INCLUDE Data Hub',
      subtitle:
        'Uncover <span style="color: #7dd3fc;">new insights</span> into the biology of Down Syndrome and co-occurring conditions.',
      resume:
        'Access large-scale integrated data resources and analyze custom built cohort datasets based on participants, biospecimens, clinical, and genomic data.',
      login: 'Login',
      signup: 'Sign up',
      viewAllBtn: 'View all studies',
      mondoChart: {
        title: 'Most Frequent Co-occurring Conditions (MONDO)',
        bottomAxis: '# of participants',
        leftAxis: 'Diagnoses (MONDO)',
      },
      studies: {
        title: 'Studies',
        summary:
          'Explore a curated collection of harmonized studies, ranging from participant-reported programs, INCLUDE-funded cohorts, institutional initiatives, and dedicated consortia focused on Down Syndrome research.',
        htp: {
          name: 'The Human Trisome Project',
          description:
            '<p>The Human Trisome Project (HTP) is a large and comprehensive natural history study of Down syndrome involving collection of deep clinical data, multimodal phenotyping, a multi-dimensional biobank, generation of pan-omics datasets, and rapid release of data. The HTP has enabled many discoveries about the pathophysiology of Down syndrome, leading to new clinical trials testing therapies to improve diverse health outcomes in this population.</p>',
        },
        dsc: {
          name: 'DS-Connect: The Down Syndrome Registry',
          description:
            '<p>DS-Connect is an online survey tool designed to collect demographic data and basic health information from individuals with DS. The purposes of DS-Connect: The Down Syndrome Registry are to better understand the health of people with Down syndrome and to inform eligible participants who, based on their health history, may be a match for research studies or new clinical trials.</p>',
        },
        ds360hd: {
          name: 'INCLUDE: (Sherman) Genomic Analysis of Congenital Heart Defects and Acute Lymphoblastic Leukemia in Children with Down Syndrome',
          description:
            '<p>Down syndrome is one of the strongest risk factors for acute myeloid leukemia in children, which is preceded by a transient leukemia driven by somatic mutations in the GATA1 gene. This study was funded by the Kids First and INCLUDE programs to generate whole-genome sequencing data from a long-standing and well-phenotyped collection of newborn blood samples from 436 individuals with DS from the Oxford Down Syndrome Cohort Study, to advance our understanding of biological factors associated with transient leukemia in DS.</p>',
        },
        x01hakonarson: {
          name: 'Genetic underpinnings of the multifactorial phenotype of Trisomy 21 patients unveiled by multi-omics approaches',
          description:
            "<p>To better understand the pathophysiology of Down syndrome (DS), this proposal will generate and analyze sequence data on 777 pediatric DS patients from the Children's Hospital of Philadelphia (CHOP), as well as 321 mothers and 148 fathers. We anticipate that the information derived from this deeply phenotyped cohort will allow for improved understanding of the pathophysiology and molecular mechanisms underlying DS-associated comorbidities, which may inform on new practices for treatment or innovative future therapies.</p>",
        },
        dspcgc: {
          name: 'INCLUDE: (PCGC) Genomic Analysis of Congenital Heart Defects and Acute Lymphoblastic Leukemia in Children with Down Syndrome',
          description:
            '<p>Since a key aspect of Kids First is to help uncover connections between structural birth defects and childhood cancers, the program will partner with INCLUDE and TOPMed to advance our understanding the biological factors that may lead to both heart disease and leukemia in individuals with DS.</p>',
        },
        bridsr: {
          name: 'Benaroya Research Institute Down Syndrome Registry',
          description:
            '<p>The Down syndrome registry at Benaroya Research Institute (BRI) builds on institutional expertise to collect and analyze longitudinal biological samples and concomitant clinical metadata across the lifespan of people with Down syndrome. The goal is to help advance therapeutic approaches to predict, prevent and cure co-occurring conditions of Down syndrome.</p>',
        },
        abcds: {
          name: 'Alzheimer Biomarker Consortium - Down Syndrome',
          description:
            "<p>The goal of the Alzheimer Biomarker Consortium-Down Syndrome (ABC-DS) is to study a group of adults with Down syndrome over their lives to single out early biomarkers of the onset of Alzheimer's disease.</p>",
        },
        dscogall: {
          name: 'INCLUDE: (Lupo) Genomic Analysis of Congenital Heart Defects and Acute Lymphoblastic Leukemia in Children with Down Syndrome',
          description:
            '<p>Down syndrome is one of the strongest risk factors for acute myeloid leukemia in children, which is preceded by a transient leukemia driven by somatic mutations in the GATA1 gene. This study was funded by the Kids First and INCLUDE programs to generate whole-genome sequencing data from a long-standing and well-phenotyped collection of newborn blood samples from 436 individuals with DS from the Oxford Down Syndrome Cohort Study, to advance our understanding of biological factors associated with transient leukemia in DS.</p>',
        },
        x01desmith: {
          name: 'The epidemiology of transient leukemia in newborns with Down syndrome',
          description:
            '<p>Children with Down syndrome (DS) have an extremely high risk of developing acute myeloid leukemia, and this is preceded by a transient myeloid leukemia that presents in up to 30% of newborns with DS and can lead to early death. In this study, we will investigate the role of germline genetic risk factors in modifying the risk of transient myeloid leukemia in DS. </p>',
        },
        dssleep: {
          name: 'Dimensional, Sleep, and Genomic Analyses of Down Syndrome to Elucidate Phenotypic Variability',
          description:
            '<p>The present work falls under an administrative supplement to study Down syndrome (DS) within the existing grant, "Dimensional Analysis of Developmental Brain Disorders using an Online, Genome First Approach" (R01-MH107431). The study aims to build validated, quantitative measures of psychopathology for DS.</p>',
        },
        dsnexus: {
          name: 'Nexus Translational Biobank',
          description:
            '<p>The Nexus is a patient registry, clinical database, and biological sample bank focused on developmental disorders. Its major goal is to advance research by (i) linking human cognitive, behavioral, neurological and other clinical phenotypes to biological samples, including DNA, plasma, and lymphoblastoid cell lines, and (ii) facilitating access to appropriate patient cohorts for research purposes. The Nexus is unique among biorepositories in that it combines extensive clinical data and biosamples, and emphasizes the inclusion of quantitative cognitive and behavioral data.</p>',
        },
      },
      cards: {
        stats: {
          title: 'Data Release',
          genomes: 'Genomes',
          transcriptomes: 'Transcriptomes',
        },
        variants: {
          title: 'Germline Variants',
          description:
            'Our variant explorer offers advanced searching capabilities. With just a few clicks, you can explore millions of annotated germline variants from genomes of INCLUDE Data Hub participants.',
          explore: 'Explore variant data',
        },
        cavatica: {
          description:
            'The portal integrates with Cavatica, a data analysis and sharing platform designed to accelerate discovery in a scalable, cloud-based compute environment where data, results, and workflows are shared among the world’s research community. Researchers and bioinformaticians can create or use existing workflows, to analyze INCLUDE datasets.',
          learnMore: 'Learn more',
        },
      },
      documentation: {
        title: 'INCLUDE Documentation Center',
        description:
          'For information on accessing, submitting and uploading data, visit our Documentation Center.',
        button: 'Documentation',
      },
      participation: {
        title: 'Participate in the INCLUDE Project',
        description:
          'Visit the NIH INCLUDE project page to learn more about the initiative, funding opportunities, or other resources.',
        button: 'Learn more',
      },
      demographic: {
        cardTitle: 'Demographics',
        downSyndromeStatusTitle: 'T21 Status',
        raceTitle: 'Race',
        sexTitle: 'Sex',
      },
    },
    dashboard: {
      hello: 'Hello',
      links: {
        studies: 'Studies',
        participants: 'Participants',
        biospecimens: 'Biospecimens',
        datafiles: 'Data Files',
        variantSearch: 'Variant Search',
      },
      cards: {
        error: {
          title: 'Connection error',
          disconnect: {
            start: 'We are currently unable to connect to this service. Please refresh the page or',
            end: 'your account and try again. If the problem persists, please',
          },
          subtitle:
            'We are currently unable to connect to this service. Please refresh the page and try again. If the problem persists, please',
          contactSupport: 'contact support',
        },
        datarelease: {
          title: 'Data release {version}',
        },
        authorizedStudies: {
          title: 'Authorized Studies {count, plural, =0 {} other {(#)}}',
          connectedNotice:
            'You have access to the following INCLUDE controlled data through your NIH credentials.',
          disconnectedNotice:
            'Access INCLUDE controlled-access data by connecting your account using your NIH Credentials.',
          disconnect: 'Disconnect',
          noAvailableStudies: 'No available studies',
          authorization: 'Authorization',
          of: 'of',
          files: 'files',
          dataGroups: 'Data use groups:',
          infoPopover: {
            title: 'Accessing Data',
            content:
              'Users requesting access to controlled data are required to have an eRA Commons account. Read more on',
            applyingForDataAccess: 'applying for data access',
          },
        },
        cavatica: {
          title: 'Cavatica Projects',
          connectedNotice: 'You are connected to the Cavatica cloud environment.',
          disconnectedNotice: 'To analyze INCLUDE data on the cloud, connect to Cavatica.',
          disconnect: 'Disconnect',
          noProjects: 'You do not have any Cavatica projects.',
          createNewProject: 'Create your first project',
          membersCount: '{count, plural, =0 {member} =1 {# member} other {# members}}',
          infoPopover: {
            title: 'CAVATICA Compute Cloud Platform',
            content:
              'CAVATICA is a cloud-based data analysis platform where data, results, and workflows are shared among the world’s research community.',
            readMore: 'Read more',
          },
          newProject: 'New project',
          billingGroups: {
            label: 'Project billing group',
            empty: 'You have no project billing group',
          },
          createProject: 'Create project',
          cancelText: 'Cancel',
          error: {
            create: {
              title: 'Unable to create project',
              subtitle:
                'An error has occurred and we were unable to create your project. Please try again or',
            },
          },
        },
        savedFilters: {
          title: 'Saved Filters',
          noSavedFilters:
            'A saved filter is a virtual query created by applying one or more filters to a data set. Save your first filter from the query builder at the top of the <a href="{dataExploHref}" style="text-decoration: underline;">Data Exploration</a> and <a href="{variantsHref}" style="text-decoration: underline;">Variants Exploration</a> pages.',
          lastSaved: 'Last saved: {date} ago',
          infoPopover: {
            content:
              'A saved filter is a virtual query created by applying one or more filters to a data set. They can be saved and revisited for later use. You can create and manage saved filters from the query builder at the top of the <a href="{dataExploHref}" style="text-decoration: underline;">Data Exploration</a> and <a href="{variantsHref}" style="text-decoration: underline;">Variants Exploration</a> pages.',
            title: 'Managing Saved Filters',
          },
          errorCard: {
            failedToFetch: 'Failed to Fetch Saved Filters',
            message:
              'Please refresh and try again or <a href="{href}" style="color:inherit;text-decoration: underline;">contact our support</a>.',
          },
        },
        savedSets: {
          title: 'Saved Sets',
          noSavedSets:
            'A saved set is a collection of one or more entity IDs which can be saved and revisited for later use. Save your first set at the top of the table of results in <a href="{dataExploHref}" style="text-decoration: underline;">Data Exploration</a> and <a href="{variantsHref}" style="text-decoration: underline;">Variants Exploration</a> pages.',
          lastSaved: 'Last saved: {date} ago',
          infoPopover: {
            content:
              'A saved set is a collection of one or more entity IDs which can be saved and revisited for later use. You can create saved sets at the top of the table of results in the <a href="{dataExploHref}" style="text-decoration: underline;">Data Exploration</a> and <a href="{variantsHref}" style="text-decoration: underline;">Variants Exploration</a> pages.',
            title: 'Managing Saved Sets',
          },
          participantsTab: 'Participants ({count})',
          biospecimensTab: 'Biospecimens ({count})',
          filesTab: 'Files ({count})',
          variantsTab: 'Variants ({count})',
          errorCard: {
            failedToFetch: 'Failed to fetch Saved Sets',
            message:
              'Please refresh and try again or <a href="{href}" style="color:inherit;text-decoration: underline;">contact our support</a>.',
          },
          compare: 'Compare',
          compareLessTooltips: 'Select 2 or 3 sets to generate a Venn diagram comparison',
          compareGreaterTooltips: 'Only available with 2 or 3 sets selected',
        },
        biospecimenRequest: {
          title: 'Biospecimen Requests',
          titleInfo: {
            title: 'Your Request History',
            text: 'This card holds the history of your biospecimen requests. You can reload them in the <a href="{href}" style="text-decoration: underline;">Data Exploration</a> or share the link.',
          },
          noBiospecimenRequests:
            '<p style="margin-bottom: 0;">A history of your biospecimen requests will be listed here.</p><p style="margin-bottom: 0;">You can make your first request from <a href="{href}" style="text-decoration: underline;">Data Exploration</a>.</p>',
          error: {
            title: 'Error',
            text: 'We are currently unable to load this content. Please refresh the page and try again. If the problem persists, please <a href="{href}" style="text-decoration: underline;" target="_blank">contact support</a>.',
          },
          lastSaved: 'Last saved: {date} ago',
          popupConfirm: {
            delete: {
              title: 'Permanently delete this biospecimen request?',
              content: 'You are about to delete this request from your history.',
              okText: 'Delete',
              cancelText: 'Cancel',
            },
          },
          editModal: {
            title: 'Save this bisopecimen request',
            cancelText: 'Cancel',
            okText: 'Save',
            inputLabel: 'Name',
            placeholder: 'Biospecimen request name',
            requiredError: 'You must provide a name for this request.',
            existingNameError: 'A biospecimen request with this name already exists',
            maximumLength: 'characters maximum',
          },
          shareModal: {
            title: 'Share link to biospecimen request?',
            cancelText: 'Cancel',
            okText: 'Copy link',
            content: 'Note that anyone with this link will have access to:',
            firstPoint: 'The biospecimen request title',
            secondPoint: 'The list of biospecimens in the request',
          },
          shareLink: {
            success: { title: 'Success', description: 'Link copied to clipboard' },
            error: { title: 'Error', description: 'Unable to copy link to clipboard' },
          },
        },
      },
    },
    variants: {
      sidemenu: {
        participant: 'Participant',
        variant: 'Variant',
        gene: 'Gene',
        frequency: 'Frequency',
        pathogenicity: 'Pathogenicity',
      },
      title: 'Variants Exploration',
      variant: 'Variants',
      table: {
        alt: {
          title: 'ALT',
          tooltip: '# of alternative alleles',
        },
        CADD: {
          title: 'CADD',
          tooltip: 'CADD (Phred score)',
        },
        canonical: 'Ensembl Canonical',
        clinvar: 'ClinVar',
        clinvarAbrv: {
          conflicting_interpretations_of_pathogenicity: 'CI',
          benign: 'B',
          likely_benign: 'LB',
          uncertain_significance: 'VUS',
          pathogenic: 'P',
          not_provided: 'NP',
          drug_response: 'DR',
          risk_factor: 'RF',
          likely_pathogenic: 'LP',
          association: 'AS',
          other: 'O',
          affects: 'AF',
          protective: 'PV',
          confers_sensitivity: 'CS',
          uncertain_risk_allele: 'URA',
          association_not_found: 'ANF',
          likely_risk_allele: 'LRA',
          low_penetrance: 'LPN',
        },
        consequences: {
          title: 'Most Deleterious Consequence',
          tooltip: 'Functional consequences of genetic variations annotated using VEP',
        },
        dbsnp: 'dbSNP',
        gene: 'Gene',
        genome_build: 'Genome build',
        gnomAD: {
          title: 'gnomAD',
          tooltip: 'gnomAD Genome 3.1.2 (allele frequency)',
        },
        gnomADAlt: {
          title: 'gnomAD ALT',
          tooltip: 'gnomAD Genome 3.1.2 (alternative allele count)',
        },
        gnomAd: 'GnomAD',
        homozygotes: {
          title: 'Homo.',
          tooltip: '# of homozygotes for alternative alleles',
        },
        inheritant: {
          code: {
            AD: 'Autosomal Dominant',
            AR: 'Autosomal Recessive',
            DD: 'Digenic Dominant',
            DR: 'Digenic Recessive',
            IC: 'Isolated Cases',
            Mi: 'Mitochondrial',
            Mu: 'Multifactorial',
            NRT: 'No Reported Transmission',
            SMo: 'Somatic Mosaicism',
            Smu: 'Somatic Mutation',
            XL: 'X-Linked',
            XLD: 'X-Linked Dominant',
            XLR: 'X-Linked Recessive',
            YL: 'Y-Linked',
          },
        },
        mane: 'MANE',
        manePlus: 'MANE Plus',
        maneSelect: 'MANE Select',
        mostDeleteriousConsequence: {
          title: 'Most Deleterious Consequence',
          tooltip: 'Functional consequences of genetic variations annotated using VEP',
        },
        omim: {
          title: 'OMIM',
          tooltip: 'MIM inheritance modes',
        },
        participant: {
          title: 'Part.',
          tooltip: '# of affected participants and frequency across INCLUDE cohorts',
        },
        revel: 'REVEL',
        studies: {
          title: 'Studies',
          tooltip: '# of studies with affected participants',
        },
        type: 'Type',
        variant: 'Variant',
        variant_class: 'Variant class',
        variant_id: 'Variant ID',
      },
      summary: {
        summary: 'Summary',
        variant: 'Variant',
        type: 'Type',
        cytoband: 'Cytoband',
        referenceGenome: 'Reference Genome',
        studies: 'Studies',
        participants: 'Participants',
        participantsTooltip:
          'Due to participant confidentiality, redirect to the Data Exploration page if the number of affected participants across INCLUDE cohorts ≥ 10',
        participantTooltip:
          '# of affected participants and frequency across INCLUDE cohorts</br></br>Due to participant confidentiality, redirect to the Data Exploration page is only permitted if the number of affected participants is ≥ 10 for a given cohort',
        genes: 'Genes',
        omim: 'OMIM',
        clinVar: 'ClinVar',
        gnomadGenome311: 'gnomAD Genome (v3.1.1)',
        gnomadGenome3: 'gnomAD Genome (v3.1.2)',
        dbSNP: 'dbSNP',
        germline: 'Germline',
        ensembl: 'Ensembl',
        consequence: 'Consequence',
        gnomAD: 'gnomAD',
        gnomADTooltip: 'gnomAD Genome 3.1.2 (allele frequency)',
        clinVarLabel: {
          affects: 'Affects',
          association: 'Association',
          association_not_found: 'Association Not Found',
          benign: 'Benign',
          confers_sensitivity: 'Confers Sensitivity',
          conflicting_interpretations_of_pathogenicity:
            'Conflicting Interpretations Of Pathogenicity',
          drug_response: 'Drug Response',
          likely_benign: 'Likely Benign',
          likely_pathogenic: 'Likely Pathogenic',
          likely_risk_allele: 'Likely Risk Allele',
          low_penetrance: 'Low Penetrance',
          not_provided: 'Not Provided',
          null: 'No Data',
          other: 'Other',
          pathogenic: 'Pathogenic',
          protective: 'Protective',
          risk_factor: 'Risk Factor',
          uncertain_risk_allele: 'Uncertain Risk Allele',
          uncertain_significance: 'Uncertain Significance',
        },
        canonicalTooltip: 'Canonical transcript',
        seeMore: 'See more',
        seeMorePopover: {
          title: 'RefSeq - {ensemblTranscriptId}',
        },
        details: {
          functionalScores: 'Functional Scores',
          geneConstraints: 'Gene Constraints',
          spliceAltering: 'Splice Altering',
          associatedConditions: 'Associated Conditions (OMIM)',
          sift: 'SIFT',
          fathmm: 'FATHMM',
          caddPhred: 'CADD (Phred)',
          caddRaw: 'CADD (Raw)',
          dann: 'DANN',
          lrt: 'LRT',
          revel: 'REVEL',
          polyphen2: 'PolyPhen-2 HVAR',
          polyphen2hvar: 'PolyPhen-2 HVAR',
          phyloP17Way: 'PhyloP17Way',
          spliceAi: 'SpliceAI',
          pli: 'pLI',
          loeuf: 'LOEUF',
          spliceAiType: {
            AG: 'Acceptor gain',
            AL: 'Acceptor loss',
            DG: 'Donor gain',
            DL: 'Donor loss',
          },
          predictions: {
            fathmm_pred: {
              D: 'Deletrious',
              T: 'Tolerated',
            },
            lrt_pred: {
              D: 'Deleterious',
              N: 'Neutral',
              U: 'Unknown',
            },
            polyphen2_hvar_pred: {
              B: 'Benign',
              D: 'Probably Damaging',
              P: 'Possibly Damaging',
            },
            sift_pred: {
              D: 'Deleterious',
              T: 'Tolerated',
            },
          },
        },
      },
      consequences: {
        consequence: 'Consequence',
        impactTag: {
          modifier: 'MODIFIER',
          low: 'LOW',
          moderate: 'MODERATE',
          high: 'HIGH',
        },
        impactTooltip: {
          HIGH: 'High',
          LOW: 'Low',
          MODERATE: 'Moderate',
          MODIFIER: 'Modifier',
        },
        aaColumn: 'AA',
        aaColumnTooltip: 'Amino acid substitution',
        cdnaChangeColumn: 'Coding DNA',
        conservationColumn: 'Conservation',
        strand: 'Strand',
        vep: 'VEP',
        predictions: {
          prediction: 'Prediction',
          predictions: 'Predictions',
          sift: 'Sift',
          polyphen2: 'Polyphen2',
          fathmm: 'Fathmm',
          cadd: 'Cadd',
          caddRaw: 'CaddRaw',
          caddPhred: 'CaddPhred',
          dann: 'Dann',
          lrt: 'Lrt',
          revel: 'Revel',
        },
        transcript: 'Transcript',
        transcripts: 'Transcripts',
        refSeq: 'RefSeq',
        geneConsequence: 'Gene Consequence',
        gene: 'Gene',
        geneType: 'Gene Type',
        omim: 'OMIM',
        hideTranscript: 'Show less',
        showTranscript: '{count, plural, =1 {# other transcript} other {# other transcripts}}',
        canonical: 'Canonical transcript',
        gnomad: {
          pli: 'pLI',
          loeuf: 'LOEUF',
        },
        spliceAi: 'SpliceAI',
        conservation: 'Conservation',
        phyloP17Way: 'PhyloP17Way',
        pickedTooltip: 'Gene with most deleterious consequence',
        pickedConsequenceTooltip: 'Most deleterious consequence',
      },
      frequencies: {
        includeStudies: 'INCLUDE Studies',
        publicCohorts: 'Public Cohorts',
        studies: 'Studies',
        domain: 'Domain',
        participants: 'Participants',
        participantsTooltip:
          '# of affected participants across INCLUDE cohorts.\n\n Due to participant confidentiality, redirect to the Data Exploration page is only permitted if the number of affected participants is ≥ 10 for a given cohort',
        participantsInfoIconTooltip:
          'Due to participant confidentiality, links may return a smaller number than displayed',
        frequencyTooltip: 'Frequency of the variant across INCLUDE studies',
        frequency: 'Frequency',
        altAlleles: '# ALT Alleles',
        altAllelesTooltip: 'Number of alternative alleles',
        homozygotes: '# Homozygotes',
        homozygotesTooltip: 'Number of homozygote variants',
        total: 'TOTAL',
        cohort: 'Cohort',
        altRef: '# Alleles (ALT + REF)',
        altRefTooltip: 'Number of alternative alleles + Reference alleles',
      },
      pathogenicity: {
        pathogenicity: 'Pathogenicity',
        clinVar: 'ClinVar',
        genePhenotype: 'Gene - Phenotype',
        source: 'Source',
        gene: 'Gene',
        condition: 'Condition',
        inheritance: 'Inheritance',
        inheritances: 'Inheritances',
        interpretation: 'Interpretation',
        germlineAbvr: 'GER',
        somaticAbvr: 'SOM',
        germline: 'Germline',
        somatic: 'Somatic',
      },
      conditions: {
        title: 'Condition',
        tableTitle: 'Gene - Phenotype Association',
      },
    },
    dataExploration: {
      title: 'Data Exploration',
      sidemenu: {
        participant: 'Participant',
        biospecimen: 'Biospecimen',
        datafiles: 'Data File',
      },
      venn: {
        download: {
          png: 'Download PNG',
          fileNameTemplate: 'include-%name-%type-%date%extension',
          fileNameDateFormat: 'yyyy-MM-dd',
        },
        query: {
          title: 'Selected Queries',
          column: 'Query definition',
        },
        set: {
          title: 'Set Definitions',
          column: 'Set definition',
          footer: 'Union of selected sets:',
          tooltips: 'View in data exploration',
          max: 'Max 10,000 at a time',
        },
        save: {
          nameTemplate: 'Combined set',
          cancel: 'Cancel',
          checkbox: {
            label: 'Save this set for future reference',
            tooltips:
              'A saved set is a collection of one or more entity IDs which can be saved and revisited for later use',
          },
          label: 'Set name',
          alreadyExist: 'A set with this name already exists',
          ok: 'View set',
          entity: {
            participants:
              'You have selected {count, plural, =0 {# participant} =1 {# participant} other {# participants}}',
            biospecimens:
              'You have selected {count, plural, =0 {# biospecimen} =1 {# biospecimen} other {# biospecimens}}',
            files:
              'You have selected {count, plural, =0 {# data file} =1 {# data file} other {# data files}}',
          },
          title: 'View in data exploration',
        },
        count: 'Count :',
        biospecimens: 'Biospecimens',
        files: 'Data Files',
        participants: 'Participants',
        title: 'Set operations',
        ok: 'Close',
      },
      itemSelectionTooltip: 'You must select at least 1 item',
      buttonDisabledTooltip: 'This participant does not have available samples for request',
      setsManagementDropdown: {
        newTitle: 'Save {filter} set',
        editTitle: 'Edit {filter} set',
        create: 'Save as new set',
        add: 'Add to existing set',
        remove: 'Remove from existing set',
        selected: '{count, plural, =0 {# {type}} =1 {# {type}} other {# {type}s}} selected',
        selectedTooltip:
          'Max. {selectedLimit} items at a time. The first 10,000 will be processed.',
        saveSet: 'Save {type} set',
      },
      allOf: 'All of',
      anyOf: 'Any of',
      noneOf: 'None of',
      hpoTree: {
        modal: {
          title: 'Observed Phenotype (HPO) Browser',
          okText: 'Apply',
        },
        searchPlaceholder: 'Search for ontology term - min 3 characters',
        emptySelection: 'Select items from the left-hand pane in order to add to your query.',
        tags: {
          exact: 'Participants with this exact term',
          all: 'Participants including descendant terms',
        },
        selectedCount:
          '{count, plural, =0 {# unique phenotype} =1 {# unique phenotype} other {# unique phenotypes}}',
      },
      mondoTree: {
        modal: {
          title: 'Diagnosis (MONDO) Browser',
          okText: 'Apply',
        },
        searchPlaceholder: 'Search for ontology term - min 3 characters',
        emptySelection: 'Select items from the left-hand pane in order to add to your query.',
        tags: {
          exact: 'Participants with this exact term',
          all: 'Participants including descendant terms',
        },
        selectedCount:
          '{count, plural, =0 {# unique diagnosis} =1 {# unique diagnosis} other {# unique diagnoses}}',
      },
      tabs: {
        summary: {
          title: 'Summary',
          graphs: {
            dataCategory: {
              legendAxisLeft: 'Data Categories',
              legendAxisBottom: '# of participants',
            },
            dataTypeGraph: {
              legendAxisLeft: 'Data Types',
              legendAxisBottom: '# of participants',
            },
            participantsByAgeGraph: {
              tooltips: 'Participants',
              T21: 'Trisomy 21',
              D21: 'Disomy 21',
              legendAxisLeft: 'Age at First Patient Engagement (years)',
              legendAxisBottom: '# of participants',
            },
            sampleTypeGraph: {
              legendAxisLeft: 'Sample Types',
              legendAxisBottom: '# of participants',
            },
            mostFrequentDiagnoses: {
              cardTitle: 'Most Frequent Diagnoses (MONDO)',
              legendAxisLeft: 'Diagnoses (MONDO)',
              legendAxisBottom: '# of participants',
            },
            mostFrequentPhenotypes: {
              cardTitle: 'Most Frequent Phenotypes (HPO)',
              legendAxisLeft: 'Phenotypes (HPO)',
              legendAxisBottom: '# of participants',
            },
          },
          download: {
            fileNameTemplate: 'include-%name-%type-%date%extension',
            fileNameDateFormat: 'yyyy-MM-dd',
            download: 'Download',
            preview: 'Download Preview - ',
            data: 'Download data',
            svg: 'Download SVG',
            png: 'Download PNG',
          },
          demographic: {
            cardTitle: 'Demographics',
            sexTitle: 'Sex',
            raceTitle: 'Race',
            ethnicityTitle: 'Ethnicity',
          },
          availableData: {
            dataCategoryTitle: 'Participants by Data Category',
            participantsByAge: 'Participants by Age at First Patient Engagement',
            dataTypeTitle: 'Participants by Data Type',
            studiesTitle: 'Participants by Study',
            sampleTypeTitle: 'Participants by Sample Type',
            mostFrequentPhenotypes: 'Most Frequent Phenotypes (HPO)',
            mostFrequentDiagnoses: 'Most Frequent Diagnoses (MONDO)',
          },
          coOccuringConditions: {
            title: 'Co-occurrence of Top 10 Conditions',
            label: '# of participants',
            empty: 'No co-occurring conditions for this query',
          },
          participantsByAge: {
            cardTitle: 'Participants by Age at First Patient Engagement',
          },
          sampleType: {
            cardTitle: 'Sample Type',
          },
          sampleAvailability: {
            cardTitle: 'Sample Availability',
          },
          downSyndromeStatus: {
            cardTitle: 'Down Syndrome Status',
          },
          observed_phenotype: {
            cardTitle: 'Observed Phenotypes (HPO)',
            legendAxisLeft: 'Phenotypes (HPO)',
            legendAxisBottom: '# of participants',
            phenotypeTree: {
              nbParticipant: '{count} participants (including descendant terms on this path)',
              addTermToQuery: 'Add term to active query',
              currentPath: 'Current Path',
            },
            empty: 'No observed phenotypes reported for these participants',
          },
          mondo: {
            cardTitle: ' Diagnosis (MONDO)',
            legendAxisLeft: 'Diagnoses (MONDO)',
            legendAxisBottom: '# of participants',
            phenotypeTree: {
              nbParticipant: '{count} participants (including descendant terms on this path)',
              addTermToQuery: 'Add term to active query',
              currentPath: 'Current Path',
            },
            empty: 'No diagnoses reported for these participants',
          },
          studies: {
            cardTitle: 'Studies',
          },
        },
        participants: {
          title: 'Participants ({count})',
        },
        biospecimens: {
          title: 'Biospecimens ({count})',
          request: {
            buttonLabel: 'Request biospecimen',
            modal: {
              title: 'Request biospecimen',
              okText: 'Download manifest',
              cancelText: 'Cancel',
              closeText: 'Close',
              description:
                'You are about to download the manifest and supporting documents needed to request the selected biospecimen. The report will include information on available samples from your selection.',
              nameForm: {
                title: 'Provide a name for your request',
                note: 'This request will be saved to your dashboard for future reference.',
                placeholder: 'Biospecimen request name',
                requiredError: 'You must provide a name for this request.',
                existingNameError: 'A biospecimen request with this name already exists',
                maximumLength: 'characters maximum',
              },
              table: {
                studyCode: 'Study Name',
                nbParticipants: 'Participants',
                nbAvailableSamples: 'Available Samples',
                nbAvailableSamplesTooltip:
                  'Biobank samples available for sharing through the Virtual Biorepository based on your biospecimen selection.',
                nbContainers: 'Containers',
              },
              alert: {
                errorMessage: 'Unable to process your request',
                errorDescription:
                  'An error had occurred and we were unable to retrieve the data for your request. Please cancel and try again.',
                infoMessage: 'No available samples',
                infoDescription:
                  'There are no biospecimen samples available for your selection. Please make different selection and try again.',
                limitMessage: 'Maximum number exceeded',
                limitDescription:
                  'A maximum of 10,000 biospecimens can be included at once. Please narrow down your selection and try again.',
              },
            },
          },
          hierarchicalBiospecime: {
            modal: {
              title: 'Sample hierarchy - {participantId}',
            },
          },
        },
        datafiles: {
          title: 'Data Files ({count})',
          cavatica: {
            analyseInCavatica: 'Analyze in Cavatica',
            maxFileReached: {
              title: 'Maximum number exceeded',
              description:
                'A maximum of 10,000 items can be copied at a time. Please narrow your selection and try again.',
              okText: 'Close',
            },
            bulkImportLimit: {
              title: 'Maximum file count exceeded',
              description:
                'You can copy a maximum of <strong>{limit} files</strong> at a time. Please select fewer files and try again.',
            },
            authWarning: {
              title: 'Connect to Cavatica',
              description:
                'In order to analyze your files you must first connect your Cavatica account. Once you are connected, you will be redirected back to this page.',
              connect: 'Connect',
              cancel: 'Cancel',
            },
            analyseModal: {
              title: 'Analyze in Cavatica',
              newProject: 'New project',
              copyFiles: 'Copy files',
              copyFilesTo: 'Copy files to...',
              createProjectToPushFileTo: 'Create a project to push your files to.',
              youAreAuthorizedToCopy: 'You are authorized to copy',
              disabledButtonTooltip: 'You must select at least 1 item',
            },
          },
          undeterminedAuthorization: {
            popoverTitle: 'Undetermined Authorization',
            popoverContent:
              'We are unable to determine the authorization status of these files. Depending on your dbGaP authorization status, the files in this dataset may or may not be accessible in your Cavatica project. Read more on <a href="{href}" style="color:#0369a1;text-decoration-line:underline;" target="_blank">applying for data access</a>.',
          },
        },
      },
    },
    studies: {
      end: 'End',
      harmonizedPopover: {
        title: 'Harmonized Data',
        content:
          "<p>Study data harmonized with INCLUDE Data Hub clinical standards for facilitating integration and cross-study comparison.</p><p>Studies labeled with a '<strong>G</strong>' are using NDAR GUIDs, some of which have been submitted to the INCLUDE DCC and included in the INCLUDE GUID mapping file.</p>",
      },
      ndaGuids: {
        button: 'NDA GUIDs for Down syndrome research',
        buttonTooltip:
          'Access the INCLUDE GUID mapping file to link participant data that may overlap across INCLUDE studies.',
        modal: {
          title: 'NDA GUIDs for Down syndrome research',
          close: 'Close',
          firstText:
            'The INCLUDE DCC and the NIH have implemented <a target="_blank" href="https://nda.nih.gov/nda/using-the-nda-guid" style="text-decoration: underline;">NIMH Data Archive Global Unique Identifiers</a> (NDA GUIDs) in the INCLUDE Data Hub. NDA GUIDs allows approved researchers to link together data on a single participant, without revealing personally identifiable information, even if the data were collected through different INCLUDE studies.',
          secondText:
            'The dbGaP <a target="_blank" href="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs003678.v1.p1" style="text-decoration: underline;">INCLUDE Data Hub: NDA GUIDs for Down Syndrome Research</a> study enables researchers to access an <strong>INCLUDE GUID mapping file</strong> that includes all available NDA GUIDs and their associations to study-specific Participant IDs across studies in the INCLUDE Data Hub.',
          thirdTextStart:
            'Only studies that provide NDA GUIDs to the INCLUDE DCC are included in the INCLUDE GUID mapping file. INCLUDE studies with participant GUIDs are identified with the <strong>G</strong> tag on the ',
          thirdTextLink: 'Study Repository',
          steps: 'There are two steps to access the GUID mapping file:',
          step1: {
            title: 'Step 1:',
            message: 'Submit a data access request to this dbGaP study.',
            buttonLabel: 'Request access to GUID mapping file',
          },
          step2: {
            title: 'Step 2:',
            message:
              'Once permissions have been granted, return to this modal and copy the GUID mapping file into your Cavatica project. If you do you have dbGaP approval, you will not be able to access the file in Cavatica. Learn more about <a target="_blank" href="https://help.includedcc.org/docs/connecting-platforms-1#connecting-to-cavatica" style="text-decoration: underline;">connecting to Cavatica</a>.',
            buttonLabel: 'Copy GUID mapping file',
          },
        },
        cavaticaModal: {
          title: 'Cavatica - INCLUDE GUID mapping file',
          okText: 'Copy file',
          message:
            'Copy the INCLUDE GUID mapping file into your Cavatica project. Once it is in your project, you can download the file or include it into your workflows.',
          selectFooterButton: 'New project',
          selectPlaceholder: 'Select a project',
          createProjectToPushFileTo: 'Create a project to push your files to.',
        },
      },
      searchLabel: {
        title: 'Search by study code, study name, dbGaP',
        placeholder: 'HTP, The Human Trisome Project, phs001138',
      },
      start: 'Start',
      title: 'Studies',
    },
    publicStudies: {
      title: 'Studies',
      search: {
        title: 'Search by study name',
        placeholder: 'The Human Trisome Project',
      },
      loginModal: {
        title: 'INCLUDE Data Hub',
        subtitleStart: 'Uncover ',
        subtitleBlue: 'new insights',
        subtitleEnd: ' into the biology of Down Syndrome and co-occurring conditions.',
        text: 'Access large-scale integrated data resources and analyze custom built cohort datasets based on participants, biospecimens, clinical, and genomic data.',
        login: 'Login',
        signup: 'Sign up',
        close: 'Close',
      },
    },
    analytics: {
      title: 'Data Analysis',
      subtitle: 'Quickly visualize and interpret INCLUDE Data with our user-friendly tools.',
      widget: {
        demo: 'Demo',
        launch: 'Launch',
      },
      newsletter: {
        title: 'New Analysis Tools Coming Soon!',
        description:
          'Join our mailing list to receive updates and be among the first to try our upcoming tools.',
        form: {
          placeholder: 'email@example.com',
          buttonLabel: 'Get updates',
        },
      },
      transcriptomic: {
        title: 'HTP Differential Gene Expression',
        description:
          'Visualize the differences in gene expression between samples with trisomy 21 and those without.',
        tags: {
          transcriptomics: 'Transcriptomics',
          gene: 'Gene',
        },
        empty: 'Select a gene to compare effects',
        subtitle:
          'Explore the impact of trisomy 21 on gene expression between people with and without Down syndrome. Generated via RNA sequencing PAXgene Whole Blood RNA.',
        scatterPlot: {
          title: 'Effect of Karyotype on all Genes',
          gene_symbol: 'Gene',
          ensembl_gene_id: 'Ensembl ID',
          fold_change: 'Fold change',
          qvalue: 'q-value',
          not_significant: 'Not significant',
          up_regulated: 'Up-regulated ({threshold})',
          down_regulated: 'Down-regulated ({threshold})',
          xAxisTitle: 'log2 (Fold change)',
          yAxisTitle: '-log10 (q-value)',
        },
        heatmap: {
          title: 'Fold Change with T21',
          fold_change: 'Fold change',
          qvalue: 'q-value',
          gene_symbol: 'Gene symbol',
        },
        filter: {
          genes: {
            emptyText: 'No gene found',
            placeholder: 'e.g. BRAF, ENSG00000157764',
            title: 'Search by gene',
            tooltip: 'Enter a Gene Symbol or Ensembl ID',
            fdr: 'FDR Threshold',
            identifiers: 'Gene Symbol, Ensembl ID',
            mappedCol: 'Gene Symbol',
          },
          samples: {
            emptyText: 'No sample found',
            placeholder: 'e.g. bs-z8p7wjm7',
            title: 'Search by sample',
            tooltip: 'Enter a sample ID',
            fpkm: 'FPKM',
            age_at_biospecimen: 'Age at Biospec. Collection',
            age_at_biospecimen_tooltips: 'Age at Biospecimen Collection (years)',
            sex: 'Sex',
            female: 'Female',
            male: 'Male',
            unknown: 'Unknown',
          },
        },
        footer: {
          download: 'Download data',
          notification:
            'Please wait while we generate your report. This process may take a few moments.',
          diffGeneTooltip: 'Download differential gene expression across all genes',
          sampleTooltip: 'Download gene expression data across all genes',
        },
        about: {
          title: 'About this dataset',
          description:
            'Explore the impact of trisomy 21 on gene expression between people with and without Down syndrome. Generated via RNA sequencing PAXgene Whole Blood RNA.',
          subtitle: 'Experimental Metadata',
          close: 'Close',
        },
        swarmPlot: {
          title: 'Effect of Karyotype on {symbol}',
          sample_id: 'Sample ID',
          fpkm: 'FPKM',
          t21: 'T21 ({nT21})',
          control: 'Control ({nControl})',
        },
        sidebar: {
          statisticalParameters: 'Statistical Parameters',
          statisticalCorrection: 'Statistical Correction',
          statisticalTest: 'Statistical Method',
          deseq2: 'DESeq2',
          bhfdr: 'BH FDR',
          location: 'Location',
          chromosome: 'Chromosome',
        },
        dataset: {
          label: 'Dataset',
          about: 'About this dataset',
          datasetValue: 'HTP Whole Blood RNAseq (v1)',
          aboutContent:
            'HTP Whole Blood RNAseq (v1) is a dataset generated as part of the Human Trisome Project (HTP), which focuses on the genetic and molecular characteristics of individuals with trisomy conditions, including Down syndrome. This dataset consists of RNA sequencing (RNAseq) data derived from whole blood samples, capturing transcriptomic profiles at high throughput (HTP). The first version (v1) includes baseline gene expression data, with a focus on understanding differential gene expression, alternative splicing, and pathway analysis across samples. It is used for comparative studies between trisomic and euploid populations to identify potential biomarkers and therapeutic targets.',
        },
      },
      setOperations: {
        title: 'Set Operations',
        description:
          'Visualize intersections between virtual cohorts saved as sets of the same type using an interactive Venn diagram.',
        tags: {
          clinical: 'Clinical',
          genomics: 'Genomics',
        },
        noSet: {
          title: 'No sets to compare',
          description:
            'You need at least two saved sets of entity IDs (e.g. two sets of participants) in order to use this tool. You can create saved sets at the top of the table of results in the <a href="{dataExploration}" style="text-decoration: underline;">Data Exploration</a> and <a href="{variantExploration}" style="text-decoration: underline;">Variants Exploration</a> pages.',
        },
        selectSet: {
          title: 'Select two or three sets to get started',
          descriptionVenn:
            'Visualize intersections between saved sets using an interactive Venn diagram.',
          descriptionSet:
            'View your saved sets in the <a href="{dashboard}" style="text-decoration: underline;">Dashboard</a>.',
          entityType: {
            label: 'Entity type',
            placeholder: 'Select',
            participants: 'Participants',
            biospecimens: 'Biospecimens',
            files: 'Data Files',
            variants: 'Variants',
            disabledTooltip: 'No set to compare',
          },
          sets: {
            label: 'Sets',
            placeholder: 'Select',
          },
          compare: 'Compare',
          compareDisabledTooltip: 'Available with 2 or 3 sets selected',
          resetTooltip: 'Reset',
        },
        venn: {
          query: {
            title: 'Selected Sets',
            column: 'Set definition',
          },
          set: {
            title: 'Set Definitions',
            column: 'Set definition',
            footer: 'Union of selected sets:',
            tooltipDataExplo: 'View in data exploration',
            tooltipVariantExplo: 'View in variant exploration',
            max: 'Max 10,000 at a time',
          },
          save: {
            nameTemplate: 'Combined set',
            cancel: 'Cancel',
            checkbox: {
              label: 'Save this set for future reference',
              tooltips:
                'A saved set is a collection of one or more entity IDs which can be saved and revisited for later use',
            },
            label: 'Set name',
            alreadyExist: 'A set with this name already exists',
            ok: 'View set',
            entity: {
              participants:
                'You have selected {count, plural, =0 {# participant} =1 {# participant} other {# participants}}',
              biospecimens:
                'You have selected {count, plural, =0 {# biospecimen} =1 {# biospecimen} other {# biospecimens}}',
              files:
                'You have selected {count, plural, =0 {# data file} =1 {# data file} other {# data files}}',
              variants:
                'You have selected {count, plural, =0 {# variant} =1 {# variant} other {# variants}}',
            },
            titleData: 'View in data exploration',
            titleVariant: 'View in variant exploration',
          },
          count: 'Count :',
          biospecimens: 'Biospecimens',
          files: 'Data Files',
          participants: 'Participants',
          variants: 'Variants',
          title: 'Set operations',
          ok: 'Close',
        },
      },
    },
    hierarchicalBiospecimen: {
      treeViewTab: 'Tree view',
      tableViewTab: 'Table view',
      searchPlaceholder: 'Search',
      collapseAll: 'Collapse all',
      expandAll: 'Expand all',
      legend: {
        title: 'Legend',
        collection: 'Collection sample',
        sample: 'Sample',
        container: 'Container',
        fileAvailable: 'File available',
        sampleAvailable: 'Sample available',
        oneSampleAvailable: 'At least one sample available',
      },
      details: {
        collection: {
          collectionSampleId: 'Collection Sample ID',
          externalCollectionSampleId: 'External Collection ID',
          collectionSampleType: 'Collection Sample Type',
        },
        sample: {
          sampleId: 'Sample ID',
          externalSampleId: 'External Sample ID',
          sampleType: 'Sample Type',
          parentSampleType: 'Parent Sample Type',
          ageAtBiospecimenCollection: 'Age At Biospecimen Collection',
          status: 'Sample Availability',
          laboratoryProcedure: 'Laboratory Procedure',
          nbFiles: 'Files',
          participantFhirId: 'Participant ID',
        },
        container: {
          containerId: 'Container ID',
          volume: 'Volume',
          volumeUnit: 'Volume Unit',
          biospecimenStorage: 'Biospecimen Storage',
        },
      },
      exportAsTsv: 'Export as TSV',
    },
  },
  facets: {
    program: 'Program',
    biospecimen_storage: 'Biospecimen Storage',
    laboratory_procedure: 'Laboratory Procedure',
    parent_sample_type: 'Parent Sample Type',
    // Participant
    participant_id: 'Participant ID',
    participant_facet_ids: {
      participant_fhir_id_1: 'Participant ID',
      participant_fhir_id_2: 'Participant ID',
    },
    file_facet_ids: {
      file_fhir_id_1: 'File ID',
      file_fhir_id_2: 'File ID',
    },
    biospecimen_facet_ids: {
      biospecimen_fhir_id_1: 'Sample ID',
      biospecimen_fhir_id_2: 'Sample ID',
    },
    biospecimen_id: 'Biospecimen',
    study: {
      study_code: 'Study Code',
      study_name: 'Study Name',
      external_id: 'dbGaP Accession Number',
    },
    studies: {
      study_code: 'Study Code',
      transmission: 'Transmission',
      zygosity: 'Zygosity',
    },
    is_proband: 'Proband',
    study_id: 'Study Code',
    down_syndrome_status: 'Down Syndrome Status',
    down_syndrome_diagnosis: 'Down Syndrome Diagnosis',
    mondo: {
      name: 'Diagnosis (MONDO)',
    },
    diagnosis: {
      affected_status: 'Clinical Status',
      mondo_display_term: 'Diagnosis (MONDO)',
      ncit_id_diagnosis: 'Age at Diagnosis (days)',
      age_at_event_days: 'Age at Diagnosis (days)',
      source_text: 'Condition (Source Text)',
      source_text_tumor_location: 'Tumor Location (Source Text)',
    },
    outcomes: {
      age_at_event_days: {
        value: 'Age at Vital Status (days)',
      },
      vital_status: 'Vital Status',
    },
    phenotype: {
      hpo_phenotype_observed: 'Observed Phenotype (HPO)',
      hpo_phenotype_not_observed: 'Not Observed Phenotype (HPO)',
      age_at_event_days: 'Age at Observed Phenotype (days)',
    },
    age_at_data_collection: 'Age at data collection',
    age_at_first_patient_engagement: { value: 'Age at First Patient Engagement (days)' },
    family_type: 'Family Unit',
    family_data: 'Family Data',
    family: {
      family_id: 'Family ID',
    },
    sex: 'Sex',
    ethnicity: 'Ethnicity',
    race: 'Race',
    observed_phenotype: {
      name: 'Phenotype (HPO)',
      age_at_event_days: 'Age at Observed Phenotype (days)',
    },
    options: {
      D21: 'Disomy 21, euploid',
      T21: 'Trisomy 21',
    },

    // Biospecimen
    biospecimen_type: 'Biospecimen Type',
    sample_type: 'Sample Type',
    derived_sample_type: 'Derived Sample Type',
    ncit_id_tissue_type: 'Tissue Type (NCIT)',
    status: 'Availability',
    age_at_biospecimen_collection: 'Age at Biospecimen Collection (days)',
    bio_repository: 'Biorepository',
    collection_sample_id: 'Collection ID',
    sample_id: 'Sample ID',

    // File
    files: filesFacets,
    ...filesFacets,
    dataset_names: 'Dataset',

    //Other
    collection_sample_type: 'Collection Sample Type',

    //Variants
    variant_class: 'Variant Type',
    type: 'Type',
    chromosome: 'Chromosome',
    position: 'Position',
    zygosity: 'Zygosity',
    transmissions: 'Transmission',
    genePanels: 'Gene Panels',
    start: 'Position',
    locus: 'Variant ID',
    variant_external_reference: 'Variant External Reference',
    gene_external_reference: 'Gene External Reference',
    consequences: {
      consequences: 'Consequence',
      biotype: 'Gene Type',
      vep_impact: 'VEP',
      symbol: 'Gene Symbol',
      symbol_id_1: 'Genes',
      predictions: {
        sift_pred: 'SIFT',
        polyphen2_hvar_pred: 'PolyPhen-2 HVAR',
        fathmm_pred: 'FATHMM',
        cadd_rankscore: 'CADD',
        lrt_pred: 'LRT',
        revel_rankscore: 'REVEL',
        dann_rankscore: 'DANN',
      },
    },
    genes: {
      consequences: {
        consequence: 'Consequence',
        vep_impact: 'VEP',
        predictions: {
          cadd_score: 'CADD (Raw)',
          cadd_phred: 'CADD (Phred)',
          dann_score: 'DANN',
          fathmm_pred: 'FATHMM',
          lrt_pred: 'LRT',
          polyphen2_hvar_pred: 'PolyPhen-2 HVAR',
          revel_score: 'REVEL',
          sift_pred: 'SIFT',
        },
      },
      biotype: 'Gene Type',
      gnomad: {
        pli: 'gnomAD pLI',
        loeuf: 'gnomAD LOEUF',
      },
      spliceai: {
        ds: 'SpliceAI',
      },
      hpo: {
        hpo_term_label: 'HPO',
      },
      orphanet: {
        panel: 'ORPHANET',
      },
      omim: {
        name: 'OMIM',
      },
      ddd: {
        disease_name: 'DDD',
      },
      cosmic: {
        tumour_types_germline: 'COSMIC',
      },
    },
    clinvar: {
      clin_sig: 'ClinVar',
    },
    external_frequencies: {
      gnomad_genomes_2_1_1: {
        af: 'gnomAD Genome 2.1.1',
      },
      gnomad_genomes_3: {
        af: 'gnomAD Genome 3.1.2',
      },
      gnomad_exomes_2_1_1: {
        af: 'gnomAD Exome 2.1.1',
      },
      topmed_bravo: {
        af: 'TopMed',
      },
      thousand_genomes: {
        af: '1000 Genomes',
      },
    },
    internal_frequencies: {
      total: {
        af: 'INCLUDE Allele Frequency',
      },
    },
    frequencies: {
      internal: {
        upper_bound_kf: { af: 'KF Allele Frequency' },
      },
      gnomad_genomes_2_1: {
        af: 'gnomAD Genome 2.1',
      },
      gnomad_genomes_3_0: {
        af: 'gnomAD Genome 3.0',
      },
      gnomad_genomes_3_1_1: {
        af: 'gnomAD Genome 3.1',
      },
      gnomad_exomes_2_1: {
        af: 'gnomAD Exome 2.1',
      },
      topmed: {
        af: 'TopMed',
      },
      one_thousand_genomes: {
        af: '1000 Genomes',
      },
    },

    // Studies
    domain: 'Domain',
    population: 'Population',
    donors: {
      diagnoses: {
        tagged_icd: {
          main_category: 'Disease Type (ICD-10)',
        },
        tagged_mondo: {
          main_category: 'Diagnosis (MONDO)',
        },
      },
      observed_phenotype_tagged: {
        main_category: 'Type of Phenotypic Abnormality (HPO)',
      },
    },
    study_design: 'Design',
    part_lifespan_stages: 'Participant Lifespan Stage',
    is_harmonized: 'Harmonized Data',
    is_guid_mapped: 'GUID Available',
    data_sources: 'Data Source',
    tooltips: {
      genes: {
        consequences: {
          vep_impact: 'Ensembl Variant Effect Predictor',
          predictions: {
            cadd_score: 'Combined Annotation Dependent Depletion',
            cadd_phred: 'Combined Annotation-Dependent Depletion PHRED',
            dann_score: 'Deleterious Annotation of genetic variants using Neural Networks',
            fathmm_pred: 'Functional Analysis Through Hidden Markov Models',
            lrt_pred: 'Likelihood Ratio Test',
            polyphen2_hvar_pred: 'Polymorphism Phenotyping v2 HumVar',
            revel_score: 'Rare Exome Variant Ensemble Learner',
            sift_pred: 'Sorting Intolerant From Tolerant',
          },
        },
        hpo: {
          hpo_term_label: 'Human Phenotype Ontology',
        },
        orphanet: {
          panel: 'ORPHANET',
        },
        omim: {
          name: 'Online Mendelian Inheritance in Man ',
        },
        ddd: {
          disease_name: 'Deciphering Developmental Disorders',
        },
        cosmic: {
          tumour_types_germline: 'Catalogue Of Somatic Mutations In Cancer',
        },
        spliceai: {
          ds: 'NEW',
        },
        gnomad: {
          pli: 'NEW',
          loeuf: 'NEW',
        },
      },
    },
  },
  entities: {
    global: {
      id: 'ID',
      summary: 'Summary',
    },
    biospecimen: {
      age: 'Age',
      age_tooltip: 'Age at Biospecimen Collection',
      biospecimen: 'Biospecimen',
      biospecimens: 'Biospecimens',
      biospecimen_storage: 'Biospecimen Storage',
      collection_id: 'Collection ID',
      collection_sample_type: 'Collection Sample Type',
      container_id: 'Container ID',
      count: '{count, plural, =0 {Biospecimen} =1 {Biospecimen} other {Biospecimens}}',
      external_sample_id: 'External Sample ID',
      laboratory_procedure: 'Laboratory Procedure',
      parent_sample_id: 'Parent Sample ID',
      parent_sample_type: 'Parent Sample Type',
      sample_availabilty: 'Sample Availability',
      sample_id: 'Sample ID',
      sample_type: 'Sample Type',
      volume: 'Volume',
      volume_unit: 'Volume Unit',
    },
    file: {
      controlled: 'Controlled',
      registered: 'Registered',
      fileAuthorization: 'File Authorization',
      access: 'Access',
      access_url: 'Access Url',
      apply_data_access: 'applying for data access',
      biospecimens: 'Biospecimens',
      category: 'Category',
      count: '{count, plural, =0 {File} =1 {File} other {Files}}',
      data_access: 'Data Access',
      data_category: 'Data Category',
      data_category_count: 'File counts by Data Category',
      data_type: 'Data Type',
      dbgap_accession_number: 'dbGaP Accession Number',
      experimental_strategy: 'Experimental Strategy',
      experimental_strategy_count: 'File counts by Experimental Strategy',
      file: 'Data File',
      file_id: 'ID',
      file_id_full: 'File ID',
      file_name: 'Name',
      file_name_full: 'File Name',
      files: 'Files',
      format: 'Format',
      hash: 'Hash',
      locked:
        'You are unauthorized to access this file. Users requesting access to controlled data require an eRA Commons account and permissions from an associated Data Access Committee. Read more on ',
      manifest: 'Manifest',
      'n=2': '(n={count})',
      nTooltipFile: 'Total number of files in the study',
      participants: 'Participants',
      participant_sample: 'Participant / Sample',
      size: 'Size',
      type: 'Type',
      unlocked: 'You are authorized to access and copy this file to your Cavatica workspace.',
      url: 'URL',
    },
    participant: {
      age: 'Age',
      age_at_first_patient_engagement: 'Age',
      age_at_first_patient_engagement_complete: 'Age at First Patient Engagement',
      age_at_first_patient_engagement_tooltip: 'Age at First Patient Engagement',
      age_tooltip_diagnosis: 'Age at Diagnosis',
      age_tooltip_phenotype: 'Age at Phenotype',
      biospecimens: 'Biospecimens',
      count: '{count, plural, =0 {Participant} =1 {Participant} other {Participants}}',
      dbgap: 'dbGaP',
      diagnosis: 'Diagnosis',
      disomy: 'D21: "Disomy 21, euploid"',
      down_syndrome_status: 'Down Syndrome Status',
      down_syndrome_status_abvr: 'DS Status',
      down_syndrome_status_tooltip: 'Down Syndrome Status',
      duo: 'Duo',
      ethnicity: 'Ethnicity',
      external_id: 'Ext. Participant ID',
      external_id_full: 'External Participant ID',
      external_id_tooltip: 'External Participant ID',
      families: 'Families',
      family: 'Family',
      family_id: 'Family ID',
      family_relationship: 'Family Relationship',
      family_unit: 'Family Unit',
      files: 'Files',
      hpo_term: 'HPO Term',
      hpo_term_tooltip: '# of participants with this exact HPO term',
      mondo_diagnosis: 'Diagnosis (MONDO)',
      mondo_term: 'MONDO Term',
      mondo_term_tooltip: '# of participants with this exact MONDO term',
      other: 'Other',
      participants: 'Participants',
      participant_id: 'Participant ID',
      phenotype: 'Phenotype',
      phenotype_hpo: 'Phenotype (HPO)',
      'proband-only': 'Proband-only',
      profile: 'Profile',
      race: 'Race',
      sex: 'Sex',
      source_text: 'Condition (Source Text)',
      trio: 'Trio',
      'trio+': ' Trio+',
      trisomy: 'T21: "Trisomy 21"',
    },
    study: {
      studies: 'Studies',
      access_limitation: 'Access Limitation',
      access_requirement: 'Access Requirement',
      affectedStudies: {
        message:
          'Access to the full ABC-DS dataset, including clinical, cognitive, neuroimaging, and genetic data, must be requested from ABC-DS using this <a href="{href}" style="color:inherit;text-decoration-line:underline;" target="_blank" rel="noopener noreferrer">data request form</a>.',
        title: 'Study Access',
      },
      acknowledgement: 'Acknowledgement',
      citation_statement: 'Citation Statement',
      code: 'Code',
      count: '{count, plural, =0 {Study} =1 {Study} other {Studies}}',
      dataset: {
        access_limitations: 'Access Limitations',
        access_requirements: 'Access Requirements',
        cavatica: {
          button: 'Analyze in Cavatica',
          modal: {
            title: 'Cavatica - DS-Connect unharmonized files',
            okText: 'Copy files',
            message:
              'Copy the DS-Connect’s unharmonized files into your Cavatica project. Once it is in your project, you can download the file or include it into your workflows.',
            selectFooterButton: 'New project',
            selectPlaceholder: 'Select a project',
            createProjectToPushFileTo: 'Create a project to push your files to.',
          },
        },
        data_categories: 'Data Category',
        data_collection_start_year: 'Data Collection Start (Year)',
        data_collection_end_year: 'Data Collection End (Year)',
        data_type: 'Data Type',
        dbgap: 'dbGaP Accession Number',
        description: 'Description',
        experimental_platform: 'Experimental Platform',
        experimental_strategy: 'Experimental Strategy',
        external_dataset_id: 'Dataset ID',
        infoTootlip:
          "Datasets are subsets of the study's data designated to capture specific information not applicable to the entire study data.",
        publication: 'Publication',
        title: 'Dataset',
      },
      data_access: 'Data Access',
      dataCategory: {
        genomic: 'Gen.',
        genomicTooltip: 'Genomic',
        immuneMap: 'Imm. Map',
        immuneMapTooltip: 'Immune Map',
        metabolomic: 'Meta.',
        metabolomicTooltip: 'Metabolomic',
        proteomic: 'Prot.',
        proteomicTooltip: 'Proteomic',
        transcriptomic: 'Trans.',
        transcriptomicTooltip: 'Transcriptomic',
      },
      data_sources: 'Clinical Data Source Type',
      data_source_table: 'Data Source',
      date_collection_end: 'Date Collection End (Year)',
      date_collection_end_year: 'Year of collection end',
      date_collection_start: 'Date Collection Start (Year)',
      date_collection_start_year: 'Year of collection start',
      dbGaP: 'dbGaP Accession Number',
      dbgap: 'dbGaP',
      description: 'Description',
      domain: 'Research Domain',
      domains: 'Domain',
      expected_data_categories: 'Data Category',
      file: 'File',
      files: 'Files',
      guid: 'GUID Available',
      guidAbrv: 'G',
      guidTooltip: 'NDA GUIDs',
      guidEntityTooltip1:
        'Studies providing NDA GUIDs to the INCLUDE DCC are included in the INCLUDE GUID mapping file. More information can be found in the ',
      guidEntityTooltip2: 'Study Repository',
      harmonized: 'Harmonized',
      harmonizedAbrv: 'H',
      harmonizedTooltip:
        'Harmonized data indicates that a subset of raw data provided by a study has been normalized to the INCLUDE data model so that a valid comparison can be made across these studies.',
      institution: 'Institution',
      name: 'Name',
      numberByDataTypes: 'File counts by Data Type',
      numberByExperimentalStrategy: 'File counts by Experimental Strategy',
      participant_life_span: 'Participant Lifespan',
      population: 'Population',
      principal_investigator: 'Principal Investigator',
      program: 'Program',
      publication: 'Publication',
      publicationDetails: {
        authors: 'et al.',
        copyMessage: 'Citation copied to clipboard',
        copyTooltip: 'Copy citation',
        doi: 'doi:',
        pmid: 'PMID:',
        volAbrv: 'vol.',
        seeMore: 'See more',
      },
      publicationModal: {
        close: 'Close',
        title: 'Publications',
      },
      publicationTooltip:
        'Publications generated by the research group associated with this study.',
      selection_criteria: 'Selection Criteria',
      study: 'Study',
      study_code: 'Study Code',
      study_contact: 'Study Contact',
      study_design: 'Study Design',
      study_designs_table: 'Design',
      study_name: 'Study Name',
      study_website: 'Study Website',
      statistic: {
        header: 'Summary Statistics',
        mondo: 'Most Frequent Diagnoses (MONDO)',
        phenotype: 'Most Frequent Phenotypes (HPO)',
        title: 'Statistic',
      },
      title: 'Data',
      unharmonized: 'Unharmonized',
      unharmonizedAbrv: 'U',
      unharmonizedTooltip:
        'Unharmonized data refers to raw data from a study that has not been standardized to the INCLUDE data model, limiting direct comparison with other studies.',
      unharmonizedWarningTooltip:
        'The data from this study has not been harmonized to the INCLUDE data model.',
      virtual_biorepository_email: 'Virtual Biorepository Email',
      virtual_biorepository_url: 'Virtual Biorepository URL',
    },
    variant: {
      no_gene: 'No Gene',
      participant: '{count, plural, =0 {Participant} =1 {Participant} other {Participants}}',
      type: {
        abrv: {
          insertion: 'Ins',
          deletion: 'Del',
          snv: 'SNV',
          null: 'ND',
          indel: 'Ind',
          substitution: 'Sub',
          sequence_alteration: ' SeqAlt',
        },
        tooltip: {
          insertion: 'Insertion',
          deletion: 'Deletion',
          snv: 'SNV',
          null: 'No Data',
          indel: 'Indel',
          substitution: 'Substitution',
          sequence_alteration: 'Sequence Alteration',
        },
      },
    },
  },
  upload: {
    gene: {
      ids: {
        modal: {
          title: 'Upload a gene list',
          placeholder: 'ex. ENSG00000157764, TP53',
          submittedColTitle: 'Submitted gene identifiers',
          uploadBtnText: 'Upload a gene list',
          mappedTo: 'Mapped to',
          collapseTitle: 'Summary Table  ({matchCount} matched, {unMatchCount} unmatched)',
          identifiers: 'Gene Symbol, Gene Alias, Ensembl ID',
          input: {
            label: 'Copy-paste a list of identifiers or upload a file',
          },
          match: 'Matched ({count})',
          unmatch: 'Unmatched ({count})',
          table: {
            message:
              '{submittedCount} submitted identifiers mapped to {mappedCount} unique system identifiers',
            match: {
              idcol: {
                title: 'Gene ID',
              },
              matchcol: {
                title: 'Ensembl ID',
              },
              mappedcol: {
                title: 'Symbol',
              },
            },
          },
          pill: {
            title: 'Uploaded List',
          },
          upload: {
            btn: 'Upload',
            file: {
              btn: 'Upload a file',
            },
          },
          clear: {
            btn: 'Clear',
          },
          cancel: {
            btn: 'Cancel',
          },
          empty: {
            table: 'No data',
          },
        },
      },
    },
    sample: {
      ids: {
        modal: {
          title: 'Upload a sample list',
          submittedColTitle: 'Submitted sample identifiers',
          uploadBtnText: 'Upload a sample list',
          mappedTo: 'Mapped to',
          collapseTitle: 'Summary Table  ({matchCount} matched, {unMatchCount} unmatched)',
          identifiers: 'Sample ID',
          input: {
            label: 'Copy-paste a list of identifiers or upload a file',
          },
          match: 'Matched ({count})',
          unmatch: 'Unmatched ({count})',
          table: {
            message:
              '{submittedCount} submitted identifiers mapped to {mappedCount} unique system identifiers',
            match: {
              idcol: {
                title: 'Sample ID',
              },
              matchcol: {
                title: 'Sample ID',
              },
              mappedcol: {
                title: 'Sample ID',
              },
            },
          },
          pill: {
            title: 'Uploaded List',
          },
          upload: {
            btn: 'Upload',
            file: {
              btn: 'Upload a file',
            },
          },
          clear: {
            btn: 'Clear',
          },
          cancel: {
            btn: 'Cancel',
          },
          empty: {
            table: 'No data',
          },
        },
      },
    },
  },
};

export default en;

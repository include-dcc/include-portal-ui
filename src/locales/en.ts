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
    save: 'Save',
    pleaseDescribe: 'Please describe',
    search: {
      genes: {
        emptyText: 'No gene found',
        placeholder: 'e.g. BRAF, ENSG00000157764',
        title: 'Search by gene',
        tooltip: 'Enter a Gene Symbol, Gene Alias ​​or Ensemble ID',
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
      file: {
        emptyText: 'No files found',
        placeholder: 'e.g. GF_001CSF26',
        title: 'Search by File ID',
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
    },
    notification: {
      genericError: 'An error occured',
    },
    proTable: {
      results: 'Results',
      noResults: 'No Results',
      of: 'of',
      selected: 'item selected',
      selectedPlural: 'items selected',
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
      error: {
        title: 'Error',
        messageUpdate: 'Unable to update set',
        messageDelete: 'Unable to delete set',
        messageCreate: 'Unable to create set',
      },
      success: {
        titleCreate: 'Your set has been saved.',
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
      error: {
        title: 'Error',
        message: 'We were unable to generate the report at this time. Please try again later or ',
        support: 'contact support',
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
          delete: 'Delete filter',
          duplicateQueryBuilder: 'Duplicate filter',
          share: 'Share (Copy url)',
          setAsDefaultFilter: 'Set as default filter',
          unsetDefaultFilter: 'Unset default filter',
          undoChanges: 'Discard unsaved changes',
          noSavedFilters: 'You have no saved filters',
        },
        myFiltersDropdown: {
          title: 'My Filters',
          manageMyFilter: 'Manage filters',
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
        mappedTo: 'Mapped To',
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
        dashboard: 'Dashboard',
        studies: 'Studies',
        explore: 'Data Exploration',
        participants: 'Participants',
        biospecimen: 'Biospecimen',
        datafiles: 'Data Files',
        website: 'Website',
        help: 'Help',
        community: 'Community',
        variants: 'Variants',
      },
    },
    user: {
      menu: {
        myprofile: 'My Profile',
        settings: 'Profile settings',
        logout: 'Sign out',
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
    },
    profileSettings: {
      title: 'Profile settings',
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
        saveChanges: 'Save changes',
        discardChanges: 'Discard changes',
      },
    },
    loginPage: {
      title: 'INCLUDE Data Hub',
      datarelease: {
        title: 'Available Data',
      },
      uncover: 'Uncover',
      newInsights: 'new insights',
      biologyConditions: 'into the biology of Down Syndrome and co-occurring conditions.',
      accessLargeScale:
        'Access large-scale data resources and explore custom built cohort datasets based on participant, biospecimen, clinical and omics data.',
      login: 'Login',
      signup: 'Sign up',
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
            'Access INCLUDE controlled-access data by connecting your account using your NIH Credentials',
          disconnect: 'Disconnect',
          noAvailableStudies: 'No available studies',
          authorization: 'Authorization',
          of: 'of',
          files: 'Files',
          dataGroups: 'Data use groups: {groups}',
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
      table: {
        alt: {
          title: 'ALT',
          tooltip: '# of alternative alleles',
        },
        CADD: {
          title: 'CADD',
          tooltip: 'CADD (Phred) score',
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
          tooltip: '# of affected participants and frequency across Kids First cohorts',
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
        genes: 'Genes',
        omim: 'OMIM',
        clinVar: 'ClinVar',
        gnomadGenome311: 'gnomAD Genome (v3.1.1)',
        gnomadGenome3: 'gnomAD Genome (v3.1.2)',
        dbSNP: 'dbSNP',
      },
      consequences: {
        consequence: 'Consequence',
        impactTag: {
          modifier: 'MODIFIER',
          low: 'LOW',
          moderate: 'MODERATE',
          high: 'HIGH',
        },
        aaColumn: 'AA',
        aaColumnTooltip: 'Amino acid substitution',
        cdnaChangeColumn: 'Coding DNA',
        conservationColumn: 'Conservation',
        strand: 'Strand',
        vep: 'VEP',
        predictions: {
          predictions: 'Predictions',
          sift: 'Sift',
          polyphen2: 'Polyphen2',
          fathmm: 'Fathmm',
          cadd: 'Cadd',
          dann: 'Dann',
          lrt: 'Lrt',
          revel: 'Revel',
        },
        transcript: 'Transcript',
        refSeq: 'RefSeq',
        geneConsequence: 'Gene Consequence',
        gene: 'Gene',
        omim: 'OMIM',
        hideTranscript: 'Show less',
        showTranscript: '{count, plural, =1 {# other transcript} other {# other transcripts}}',
        canonical: 'Canonical transcript',
      },
      frequencies: {
        includeStudies: 'INCLUDE Studies',
        publicCohorts: 'Public Cohorts',
        studies: 'Studies',
        domain: 'Domain',
        participants: 'Participants',
        participantsTooltip: '# of affected participants across INCLUDE studies',
        participantsInfoIconTooltip:
          'Due to participant confidentiality, links may return a smaller number than displayed',
        frequencyTooltip: 'Frequency of the variant across INCLUDE studies',
        frequency: 'Frequency',
        altAlleles: 'ALT Alleles',
        altAllelesTooltip: 'Number of alternative alleles',
        homozygotes: 'Homozygotes',
        homozygotesTooltip: 'Number of homozygote variants',
        total: 'TOTAL',
        cohort: 'Cohort',
        altRef: 'Alleles (ALT + REF)',
        altRefTooltip: 'Alternative alleles + Reference alleles',
        noDataAvailable: 'No data available',
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
      },
    },
    dataExploration: {
      title: 'Data Exploration',
      sidemenu: {
        participant: 'Participant',
        biospecimen: 'Biospecimen',
        datafiles: 'Data File',
      },
      itemSelectionTooltip: 'You must select at least 1 item',
      setsManagementDropdown: {
        newTitle: 'Save {filter} set',
        editTitle: 'Edit {filter} set',
        create: 'Save as new set',
        add: 'Add to existing set',
        remove: 'Remove from existing set',
        selected: '{count, plural, =0 {# {type}} =1 {# {type}} other {# {type}s}} selected',
      },
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
      },
      tabs: {
        summary: {
          title: 'Summary',
          graphs: {
            dataCategory: {
              legendAxisLeft: 'Data Category',
              legendAxisBottom: '# of participants',
            },
            dataTypeGraph: {
              legendAxisLeft: 'Data Types',
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
            dataTypeTitle: 'Participants by Data Type',
            studiesTitle: 'Participants by Study',
          },
          observed_phenotype: {
            cardTitle: 'Observed Phenotypes (HPO)',
            phenotypeTree: {
              nbParticipant: '{count} participants (including descendant terms on this path)',
              addTermToQuery: 'Add term to active query',
              currentPath: 'Current Path',
            },
            empty: 'No observed phenotypes reported for these participants',
          },
          mondo: {
            cardTitle: ' Diagnosis (MONDO)',
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
        },
        datafiles: {
          title: 'Data Files ({count})',
          cavatica: {
            analyseInCavatica: 'Analyze in Cavatica',
            bulkImportLimit: {
              title: 'Maximum file count exceeded',
              description:
                'You can copy a maximum of <strong>{limit} files</strong> at a time. Please select fewer files and try again.',
            },
            authWarning: {
              title: 'You are not connected to Cavatica',
              description:
                'In order to analyze your files you must first connect your Cavatica account. Once you are connected, you will be redirected back to this page.',
              connect: 'Connect',
            },
            analyseModal: {
              newProject: 'New project',
              copyFiles: 'Copy files',
              copyFilesTo: 'Copy files to...',
              createProjectToPushFileTo: 'Create a project to push your files to.',
              youAreAuthorizedToCopy: 'You are authorized to copy',
            },
          },
        },
      },
    },
  },
  facets: {
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
      mondo_id_diagnosis: 'Diagnosis (MONDO)',
      ncit_id_diagnosis: 'Diagnosis (NCIT)',
      age_at_event_days: 'Age at Diagnosis',
      source_text: 'Diagnosis (Source Text)',
      source_text_tumor_location: 'Tumor Location (Source Text)',
    },
    outcomes: {
      age_at_event_days: {
        value: 'Age at Outcome',
      },
      vital_status: 'Vital Status',
    },
    phenotype: {
      hpo_phenotype_observed: 'Observed Phenotype (HPO)',
      hpo_phenotype_not_observed: 'Not Observed Phenotype (HPO)',
      age_at_event_days: 'Age at Observed Phenotype',
    },
    age_at_data_collection: 'Age at data collection',
    family_type: 'Family Unit',
    family: {
      family_id: 'Family ID',
    },
    sex: 'Sex',
    ethnicity: 'Ethnicity',
    race: 'Race',
    observed_phenotype: {
      name: 'Phenotype (HPO)',
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
    domain: 'Study Domain',
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
  },
  entities: {
    global: {
      id: 'ID',
      summary: 'Summary',
    },
    biospecimen: {
      age_tooltip: 'Age at Biospecimen Collection',
      biospecimen: 'Biospecimen',
      biospecimen_storage: 'Biospecimen Storage',
      collection_id: 'Collection ID',
      collection_sample_type: 'Collection Sample Type',
      container_id: 'Container ID',
      count: '{count, plural, =0 {Biospecimen} =1 {Biospecimen} other {Biospecimens}}',
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
      fileAuthorization: 'File Authorization',
      access: 'Access',
      apply_data_access: 'applying for data access',
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
      file_name: 'Name',
      files: 'Files',
      format: 'Format',
      hash: 'Hash',
      locked:
        'You are unauthorized to access this file. Users requesting access to controlled data require an eRA Commons account and permissions from an associated Data Access Committee. Read more on ',
      manifest: 'Manifest',
      participant_sample: 'Participant / Sample',
      size: 'Size',
      type: 'Type',
      unlocked: 'You are authorized to access and copy this file to your Cavatica workspace.',
      url: 'URL',
    },
    participant: {
      age: 'Age',
      age_tooltip_diagnosis: 'Age at Diagnosis',
      age_tooltip_phenotype: 'Age at Phenotype',
      count: '{count, plural, =0 {Participant} =1 {Participant} other {Participants}}',
      dbgap: 'dbGaP',
      diagnosis: 'Diagnosis',
      disomy: 'D21: "Disomy 21, euploid"',
      down_syndrome_status: 'Down Syndrome Status',
      duo: 'Duo',
      ethnicity: 'Ethnicity',
      external_id: 'Ext. Participant ID',
      external_id_tooltip: 'External Participant ID',
      family: 'Family',
      family_id: 'Family ID',
      family_relationship: 'Family Relationship',
      family_unit: 'Family Unit',
      hpo_term: 'HPO Term',
      hpo_term_tooltip: '# of participants with this exact HPO term',
      mondo_diagnosis: 'Diagnosis (MONDO)',
      mondo_term: 'MONDO Term',
      mondo_term_tooltip: '# of participants with this exact MONDO term',
      other: 'Other',
      participant_id: 'Participant ID',
      phenotype: 'Phenotype',
      phenotype_hpo: 'Phenotype (HPO)',
      proband_only: 'Proband-only',
      profile: 'Profile',
      race: 'Race',
      sex: 'Sex',
      source_text: 'Condition (Source Text)',
      trio: 'Trio',
      trio_plus: ' Trio+',
      trisomy: 'T21: "Trisomy 21"',
    },
    study: {
      count: '{count, plural, =0 {Study} =1 {Study} other {Studies}}',
      study: 'Study',
    },
    variant: {
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
          submittedColTitle: 'Submitted gene identifiers',
          uploadBtnText: 'Upload a gene list',
          mappedTo: 'Mapped To',
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
  },
};

export default en;

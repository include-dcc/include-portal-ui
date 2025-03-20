import { useCallback, useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import {
  ExperimentOutlined,
  FileSearchOutlined,
  FileTextOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  IFilter,
  IFilterGroup,
  TExtendedMapping,
  VisualType,
} from '@ferlab/ui/core/components/filters/types';
import useQueryBuilderState, {
  updateActiveQueryField,
  updateActiveQueryFilters,
} from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import SidebarMenu, { ISidebarMenuItem } from '@ferlab/ui/core/components/SidebarMenu';
import {
  CheckboxQFOption,
  FacetOption,
  TitleQFOption,
} from '@ferlab/ui/core/components/SidebarMenu/QuickFilter';
import { underscoreToDot } from '@ferlab/ui/core/data/arranger/formatting';
import { getFilterGroup, getFilterType } from '@ferlab/ui/core/data/filters/utils';
import { TermOperators } from '@ferlab/ui/core/data/sqon/operators';
import { MERGE_VALUES_STRATEGIES } from '@ferlab/ui/core/data/sqon/types';
import { getSelectedFilters } from '@ferlab/ui/core/data/sqon/utils';
import { IExtendedMappingResults, TAggregationBuckets } from '@ferlab/ui/core/graphql/types';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import { removeUnderscoreAndCapitalize, titleCase } from '@ferlab/ui/core/utils/stringUtils';
import { Spin, Typography } from 'antd';
import { INDEXES } from 'graphql/constants';
import { ExtendedMappingResults } from 'graphql/models';
import { AGGREGATION_QUERY } from 'graphql/queries';
import { GET_QUICK_FILTER_EXPLO } from 'graphql/quickFilter/queries';
import { getFilters } from 'graphql/utils/Filters';
import { capitalize, get } from 'lodash';
import PageContent from 'views/DataExploration/components/PageContent';
import {
  DATA_EXPLORATION_QB_ID,
  SCROLL_WRAPPER_ID,
  TAB_IDS,
} from 'views/DataExploration/utils/constant';
import {
  getFieldCategoryIcon,
  getFieldWithoutPrefix,
  getIndexFromQFValueFacet,
  getSelectedOptionsByQuery,
  getSqonForQuickFilterFacetValue,
  getSqonForQuickFilterFacetView,
} from 'views/DataExploration/utils/quickFilter';

import FilterList, { TCustomFilterMapper } from 'components/uiKit/FilterList';
import { FilterInfo } from 'components/uiKit/FilterList/types';
import useGetExtendedMappings from 'hooks/graphql/useGetExtendedMappings';
import { ArrangerApi } from 'services/api/arranger';
import { remoteSliceActions } from 'store/remote/slice';
import { RemoteComponentList } from 'store/remote/types';
import {
  mapFilterForBiospecimen,
  mapFilterForFiles,
  mapFilterForParticipant,
} from 'utils/fieldMapper';
import {
  getFacetsDictionary,
  getFiltersDictionary,
  getQueryBuilderDictionary,
} from 'utils/translation';

import { BiospecimenCollectionSearch, BiospecimenSearch } from './components/BiospecimenSearch';
import BiospecimenSetSearch from './components/BiospecimenSetSearch';
import FileSearch from './components/FileSearch';
import FileSetSearch from './components/FileSetSearch';
import ParticipantSearch from './components/ParticipantSearch';
import ParticipantSetSearch from './components/ParticipantSetSearch';
import TreeFacet from './components/TreeFacet';
import TreeFacetModal from './components/TreeFacet/TreeFacetModal';
import BiospecimenUploadIds from './components/UploadIds/BiospecimenUploadIds';
import FileUploadIds from './components/UploadIds/FileUploadIds';
import ParticipantUploadIds from './components/UploadIds/ParticipantUploadIds';

import styles from './index.module.css';

enum FilterTypes {
  Participant,
  Biospecimen,
  Datafiles,
}

export const filterGroups: {
  [type: string]: FilterInfo;
} = {
  [FilterTypes.Participant]: {
    customSearches: [
      <ParticipantSearch key={0} queryBuilderId={DATA_EXPLORATION_QB_ID} />,
      <ParticipantSetSearch key={1} queryBuilderId={DATA_EXPLORATION_QB_ID} />,
      <ParticipantUploadIds key={2} queryBuilderId={DATA_EXPLORATION_QB_ID} />,
    ],
    groups: [
      {
        facets: [
          'study__study_code',
          'down_syndrome_status',
          <TreeFacet key="mondo" type={RemoteComponentList.MondoTree} field={'mondo'} />,
          <TreeFacet
            key="observed_phenotype"
            type={RemoteComponentList.HPOTree}
            field={'observed_phenotype'}
          />,
          'diagnosis__source_text',
          'diagnosis__age_at_event_days',
          'outcomes__age_at_event_days__value',
          'observed_phenotype__age_at_event_days',
          'age_at_first_patient_engagement__value',
          'family_type',
          'sex',
          'race',
          'ethnicity',
          'outcomes__vital_status',
        ],
        categoryIcon: <UserOutlined className={styles.categoryIcon} />,
      },
    ],
  },
  [FilterTypes.Biospecimen]: {
    customSearches: [
      <BiospecimenSearch key={0} queryBuilderId={DATA_EXPLORATION_QB_ID} />,
      <BiospecimenCollectionSearch key={1} queryBuilderId={DATA_EXPLORATION_QB_ID} />,
      <BiospecimenSetSearch key={2} queryBuilderId={DATA_EXPLORATION_QB_ID} />,
      <BiospecimenUploadIds key={3} queryBuilderId={DATA_EXPLORATION_QB_ID} />,
    ],
    groups: [
      {
        facets: [
          'sample_type',
          'parent_sample_type',
          'collection_sample_type',
          'age_at_biospecimen_collection',
          'status',
          'laboratory_procedure',
          'biospecimen_storage',
        ],
        noDataOption: ['age_at_biospecimen_collection'],
        categoryIcon: <ExperimentOutlined className={styles.categoryIcon} />,
      },
    ],
  },
  [FilterTypes.Datafiles]: {
    customSearches: [
      <FileSearch key={0} queryBuilderId={DATA_EXPLORATION_QB_ID} />,
      <FileSetSearch key={1} queryBuilderId={DATA_EXPLORATION_QB_ID} />,
      <FileUploadIds key={2} queryBuilderId={DATA_EXPLORATION_QB_ID} />,
    ],
    groups: [
      {
        facets: [
          'controlled_access',
          'dataset_names',
          'data_category',
          'data_type',
          'sequencing_experiment__experiment_strategy',
          'file_format',
          'acl',
        ],
        categoryIcon: <FileTextOutlined className={styles.categoryIcon} />,
      },
    ],
  },
};

const filtersContainer = (
  mappingResults: ExtendedMappingResults,
  type: FilterTypes,
  index: string,
  filterMapper: TCustomFilterMapper,
): React.ReactNode => {
  if (mappingResults.loading) {
    return <Spin className={styles.filterLoader} spinning />;
  }

  return (
    <FilterList
      key={index}
      index={index}
      queryBuilderId={DATA_EXPLORATION_QB_ID}
      extendedMappingResults={mappingResults}
      filterInfo={filterGroups[type]}
      filterMapper={filterMapper}
    />
  );
};

const DataExploration = () => {
  const dispatch = useDispatch();
  const { activeQuery } = useQueryBuilderState(DATA_EXPLORATION_QB_ID);
  const participantMappingResults = useGetExtendedMappings(INDEXES.PARTICIPANT);
  const fileMappingResults = useGetExtendedMappings(INDEXES.FILE);
  const biospecimenMappingResults = useGetExtendedMappings(INDEXES.BIOSPECIMEN);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [quickFilterData, setQuickFilterData] = useState<{ participant: { aggregations: any } }>();
  const [forceClose, setForceClose] = useState<boolean>(false);

  const quickfilterOpenRemote = (field: string): boolean => {
    if (field === 'observed_phenotype__name') {
      dispatch(
        remoteSliceActions.openRemoteComponent({
          id: RemoteComponentList.HPOTree,
          props: {
            visible: true,
          },
        }),
      );
      return true;
    }
    if (field === 'mondo__name') {
      dispatch(
        remoteSliceActions.openRemoteComponent({
          id: RemoteComponentList.MondoTree,
          props: {
            visible: true,
          },
        }),
      );

      return true;
    }

    return false;
  };

  const fetchFacets = useCallback(async () => {
    const { data } = await ArrangerApi.graphqlRequest<{
      data: { participant: { aggregations: any } };
    }>({
      query: GET_QUICK_FILTER_EXPLO.loc?.source.body,
      variables: {
        sqon: getSqonForQuickFilterFacetValue(activeQuery),
      },
    });
    if (data) setQuickFilterData(data?.data);
  }, [JSON.stringify(activeQuery)]);

  useEffect(() => {
    fetchFacets();
  }, [fetchFacets]);

  const getMappingByIndex = (index: string): IExtendedMappingResults => {
    switch (index) {
      case INDEXES.BIOSPECIMEN:
        return biospecimenMappingResults;
      case INDEXES.FILE:
        return fileMappingResults;
      case INDEXES.PARTICIPANT:
      default:
        return participantMappingResults;
    }
  };

  const getQFSuggestions = async (
    searchText: string,
    setOptions: React.Dispatch<React.SetStateAction<(TitleQFOption | CheckboxQFOption)[]>>,
    setTotal: React.Dispatch<React.SetStateAction<number>>,
    setSelectedOptions: React.Dispatch<React.SetStateAction<CheckboxQFOption[]>>,
  ) => {
    setIsLoading(true);
    let totalResult = 0;
    const regexp = new RegExp('(?:^|\\W)' + searchText, 'gi');
    const facetDictionary = getFacetsDictionary();
    const suggestions: (TitleQFOption | CheckboxQFOption)[] = [];

    Object.entries(quickFilterData?.participant.aggregations).forEach(([key, value]) => {
      const facetName: any = get(
        facetDictionary,
        underscoreToDot(getFieldWithoutPrefix(key)),
        removeUnderscoreAndCapitalize(getFieldWithoutPrefix(key)).replace('  ', ' '),
      );
      const facetType = participantMappingResults.data.find(
        (mapping) => mapping.field === underscoreToDot(key),
      )?.type;

      const facetValueMapping =
        getQueryBuilderDictionary(facetName).query?.facetValueMapping?.[underscoreToDot(key)];

      const bucketFiltered: (TitleQFOption | CheckboxQFOption)[] = [];

      (value as TAggregationBuckets)?.buckets?.map((bucket: { key: string; doc_count: number }) => {
        const label = capitalize(facetValueMapping?.[bucket.key]) || titleCase(bucket.key);
        const index = getIndexFromQFValueFacet(key);

        if (label.match(regexp)) {
          ++totalResult;

          bucketFiltered.push({
            key: bucket.key,
            label,
            docCount: bucket.doc_count,
            type: facetType ? getFilterType(facetType) : VisualType.Checkbox,
            facetKey: key,
            index: index,
          });
        }
      });

      const isFacetNameMatch = facetName.match(regexp);
      if (isFacetNameMatch || bucketFiltered.length > 0) {
        if (isFacetNameMatch) ++totalResult;

        suggestions.push({
          key: key,
          label: facetName,
          type: 'title',
          index: getIndexFromQFValueFacet(key),
          categoryIcon:
            bucketFiltered.length > 0 ? (
              <UserOutlined className={styles.categoryIcon} />
            ) : undefined,
        });
        suggestions.push(...bucketFiltered);
      }
    });

    setSelectedOptions(getSelectedOptionsByQuery(activeQuery));
    setTotal(totalResult);
    setOptions(suggestions);
    setIsLoading(false);
  };

  const handleFacetClick = async (
    setFacetOptions: React.Dispatch<React.SetStateAction<FacetOption | undefined>>,
    option: TitleQFOption,
  ) => {
    setIsLoading(true);

    if (quickfilterOpenRemote(option.key)) {
      setForceClose(true);
      return;
    }

    const { data } = await ArrangerApi.graphqlRequest<{
      data: any;
    }>({
      query: AGGREGATION_QUERY(
        option.index,
        [getFieldWithoutPrefix(option.key)],
        getMappingByIndex(option.index),
      ).loc?.source.body,

      variables: {
        sqon: getSqonForQuickFilterFacetView(activeQuery, option.index),
      },
    });

    const found = (getMappingByIndex(option.index)?.data || []).find(
      (f: TExtendedMapping) => f.field === underscoreToDot(getFieldWithoutPrefix(option.key)),
    );

    const getAgg = () => {
      switch (option.index) {
        case INDEXES.BIOSPECIMEN:
          return data?.data.biospecimen.aggregations[getFieldWithoutPrefix(option.key)];
        case INDEXES.FILE:
          return data?.data.file.aggregations[getFieldWithoutPrefix(option.key)];
        case INDEXES.PARTICIPANT:
        default:
          return data?.data.participant.aggregations[getFieldWithoutPrefix(option.key)];
      }
    };

    const aggregations = getAgg();

    const filterGroup = getFilterGroup({
      extendedMapping: found,
      aggregation: aggregations,
      rangeTypes: [],
      filterFooter: false,
      headerTooltip: false,
      dictionary: getFacetsDictionary(),
      noDataInputOption: false,
      categoryIcon: getFieldCategoryIcon(option.key, { className: styles.categoryIcon }),
    });

    const filters =
      getFilters({ [`${option.key}`]: aggregations as TAggregationBuckets }, option.key) || [];

    const onChange = (fg: IFilterGroup, f: IFilter[]) => {
      updateActiveQueryFilters({
        queryBuilderId: DATA_EXPLORATION_QB_ID,
        filterGroup: fg,
        selectedFilters: f,
        index: getIndexFromQFValueFacet(option.key),
      });
    };

    const selectedFilters = getSelectedFilters({
      queryBuilderId: DATA_EXPLORATION_QB_ID,
      filters,
      filterGroup,
    });

    setFacetOptions({
      filterGroup,
      filters,
      onChange,
      selectedFilters,
    });
    setIsLoading(false);
  };

  const menuItems: ISidebarMenuItem[] = [
    {
      key: TAB_IDS.PARTICIPANTS,
      title: intl.get('screen.dataExploration.sidemenu.participant'),
      icon: <UserOutlined className={styles.sideMenuIcon} />,
      panelContent: filtersContainer(
        participantMappingResults,
        FilterTypes.Participant,
        INDEXES.PARTICIPANT,
        mapFilterForParticipant,
      ),
    },
    {
      key: TAB_IDS.BIOSPECIMENS,
      title: intl.get('screen.dataExploration.sidemenu.biospecimen'),
      icon: <ExperimentOutlined className={styles.sideMenuIcon} />,
      panelContent: filtersContainer(
        biospecimenMappingResults,
        FilterTypes.Biospecimen,
        INDEXES.BIOSPECIMEN,
        mapFilterForBiospecimen,
      ),
    },
    {
      key: TAB_IDS.DATA_FILES,
      title: intl.get('screen.dataExploration.sidemenu.datafiles'),
      icon: <FileSearchOutlined className={styles.sideMenuIcon} />,
      panelContent: filtersContainer(
        fileMappingResults,
        FilterTypes.Datafiles,
        INDEXES.FILE,
        mapFilterForFiles,
      ),
    },
  ];

  const addQFOptionsToQB = (options: CheckboxQFOption[], operator: TermOperators) =>
    options.forEach((option: CheckboxQFOption) =>
      updateActiveQueryField({
        queryBuilderId: DATA_EXPLORATION_QB_ID,
        field: underscoreToDot(getFieldWithoutPrefix(option.facetKey)),
        value: [option.key],
        index: option.index,
        merge_strategy: MERGE_VALUES_STRATEGIES.APPEND_VALUES,
        operator,
      }),
    );

  return (
    <div className={styles.dataExplorationLayout}>
      <TreeFacetModal
        key="observed_phenotype"
        type={RemoteComponentList.HPOTree}
        field={'observed_phenotype'}
      />
      <TreeFacetModal key="mondo_tree" type={RemoteComponentList.MondoTree} field={'mondo'} />
      <SidebarMenu
        className={styles.sideMenu}
        menuItems={menuItems}
        quickFilter={{
          dictionary: getFiltersDictionary(),
          handleFacetClick,
          getSuggestionsList: getQFSuggestions,
          handleOnApply: addQFOptionsToQB,
          enableQuickFilter: true,
          inputSuffixIcon: <SearchOutlined />,
          isLoading,
          forceClose,
          handleClear: () => setForceClose(false),
          forbiddenChars: ['(', ')', '[', ']', '\\', '|'],
        }}
      />
      <ScrollContent id={SCROLL_WRAPPER_ID} className={styles.scrollContent}>
        <Typography.Title className={styles.title} level={4}>
          {intl.get('screen.dataExploration.title')}
        </Typography.Title>
        <PageContent
          fileMapping={fileMappingResults}
          biospecimenMapping={biospecimenMappingResults}
          participantMapping={participantMappingResults}
          filterGroups={filterGroups}
        />
      </ScrollContent>
    </div>
  );
};

export default DataExploration;

import React from 'react';
import { TFilterGroupDefaults } from '@ferlab/ui/core/components/filters/types';
import { DocumentNode } from 'graphql';
import { ExtendedMappingResults } from 'graphql/models';

export interface FilterGroup {
  title?: string;
  facets: string[] | React.ReactNode[];
  defaults?: {
    [key: string]: TFilterGroupDefaults;
  };
  tooltips?: string[];
  noDataOption?: string[];
  intervalDecimal?: { [key: string]: number };
}

export interface FilterInfo {
  customSearches?: React.ReactNode[];
  defaultOpenFacets?: string[];
  groups: FilterGroup[];
}

export type TAggregationFunction = (
  index: string,
  aggList: string[],
  mappingResults: ExtendedMappingResults,
) => DocumentNode;

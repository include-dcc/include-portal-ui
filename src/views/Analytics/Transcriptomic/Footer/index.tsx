import { useMemo } from 'react';
import intl from 'react-intl-universal';
import { useNavigate } from 'react-router';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { BooleanOperators, TermOperators } from '@ferlab/ui/core/data/sqon/operators';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { SortDirection } from '@ferlab/ui/core/graphql/constants';
import { Button } from 'antd';
import { useBiospecimen } from 'graphql/biospecimens/actions';
import { INDEXES } from 'graphql/constants';
import SetsManagementDropdown from 'views/DataExploration/components/SetsManagementDropdown';
import {
  BIOSPECIMENS_SAVED_SETS_FIELD,
  DATA_EXPLORATION_QB_ID,
  DEFAULT_PAGE_SIZE,
} from 'views/DataExploration/utils/constant';
import { DEFAULT_OFFSET } from 'views/Variants/utils/constants';

import ExternalLinkIcon from 'components/Icons/ExternalLinkIcon';
import { SetType } from 'services/api/savedSet/models';
import {
  TTranscriptomicsDatum,
  TTranscriptomicsSwarmPlotData,
} from 'services/api/transcriptomics/models';
import { STATIC_ROUTES } from 'utils/routes';

import styles from './index.module.css';

type TTranscriptomicFooter = {
  selectedGenes: TTranscriptomicsDatum[];
  sampleGeneExpData?: TTranscriptomicsSwarmPlotData[];
  selectedSamples: TTranscriptomicsSwarmPlotData[];
  filteredSamples: TTranscriptomicsSwarmPlotData[];
};

const TranscriptomicFooter = ({
  sampleGeneExpData,
  selectedGenes: selectedGeneIds,
  selectedSamples,
  filteredSamples,
}: TTranscriptomicFooter) => {
  const navigate = useNavigate();
  const samples = useMemo<TTranscriptomicsSwarmPlotData[]>(() => {
    if (filteredSamples.length > 0) {
      return filteredSamples;
    }
    if (selectedSamples.length > 0) {
      return selectedSamples;
    }

    if (selectedGeneIds.length > 0) {
      return sampleGeneExpData ?? [];
    }
    return [];
  }, [selectedSamples, filteredSamples, selectedGeneIds, sampleGeneExpData]);

  const sqon = {
    content: [
      {
        content: {
          field: 'sample_id',
          index: INDEXES.BIOSPECIMEN,
          value: samples.map((s) => s.sample_id),
        },
        op: TermOperators.in,
      },
    ],
    op: BooleanOperators.and,
  };

  const results = useBiospecimen({
    first: DEFAULT_PAGE_SIZE,
    offset: DEFAULT_OFFSET,
    sqon,
    sort: [
      {
        field: 'sample_id',
        order: SortDirection.Asc,
      },
    ],
  });

  const viewInExploration = () => {
    addQuery({
      queryBuilderId: DATA_EXPLORATION_QB_ID,
      query: generateQuery({
        newFilters: [
          generateValueFilter({
            field: 'sample_id',
            value: samples.map((s) => s.sample_id),
            index: INDEXES.BIOSPECIMEN,
          }),
        ],
      }),
      setAsActive: true,
    });
    navigate(STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS);
  };

  return (
    <div className={styles.footer}>
      <div className={styles.gene}>
        {/* <Button>{intl.get('screen.analytics.transcriptomic.footer.download')}</Button> */}
      </div>
      <div className={styles.sample}>
        {/* <Button>{intl.get('screen.analytics.transcriptomic.footer.download')}</Button> */}
        <SetsManagementDropdown
          idField={BIOSPECIMENS_SAVED_SETS_FIELD}
          key="setManagementDropdown"
          results={results}
          sqon={{
            content: [
              {
                content: {
                  field: 'sample_id',
                  index: INDEXES.BIOSPECIMEN,
                  value: samples.map((s) => s.sample_id),
                },
                op: TermOperators.in,
              },
            ],
            op: BooleanOperators.and,
          }}
          selectedAllResults={false}
          type={SetType.BIOSPECIMEN}
          selectedKeys={samples.map((e) => e.sample_id)}
        />
        <Button
          disabled={selectedGeneIds?.length === 0 || (sampleGeneExpData ?? []).length === 0}
          onClick={viewInExploration}
        >
          {intl.get('global.viewInExploration')}
          <ExternalLinkIcon />
        </Button>
      </div>
    </div>
  );
};

export default TranscriptomicFooter;

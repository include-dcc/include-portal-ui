import intl from 'react-intl-universal';
import { useNavigate } from 'react-router';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { Button } from 'antd';
import { INDEXES } from 'graphql/constants';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import ExternalLinkIcon from 'components/Icons/ExternalLinkIcon';
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

  const viewInExploration = () => {
    const newFilters = [];

    if (filteredSamples.length > 0) {
      newFilters.push(
        generateValueFilter({
          field: 'sample_id',
          value: filteredSamples.map((s) => s.sample_id),
          index: INDEXES.BIOSPECIMEN,
        }),
      );
    } else if (selectedSamples.length > 0) {
      newFilters.push(
        generateValueFilter({
          field: 'sample_id',
          value: selectedSamples.map((s) => s.sample_id),
          index: INDEXES.BIOSPECIMEN,
        }),
      );
    } else {
      newFilters.push(
        generateValueFilter({
          field: 'sample_id',
          value: (sampleGeneExpData ?? []).map((s) => s.sample_id),
          index: INDEXES.BIOSPECIMEN,
        }),
      );
    }

    addQuery({
      queryBuilderId: DATA_EXPLORATION_QB_ID,
      query: generateQuery({
        newFilters,
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
        {/* <SetsManagementDropdown
          idField={BIOSPECIMENS_SAVED_SETS_FIELD}
          key="setManagementDropdown"
          results={[]}
          // sqon={getCurrentSqon()}
          selectedAllResults={selectedSamples.length == 0}
          type={SetType.BIOSPECIMEN}
          selectedKeys={selectedSamples.map((e) => e.sample_id)}
        /> */}
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

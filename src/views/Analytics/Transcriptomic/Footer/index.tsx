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
};

const TranscriptomicFooter = ({
  sampleGeneExpData,
  selectedGenes: selectedGeneIds,
}: TTranscriptomicFooter) => {
  const navigate = useNavigate();

  const viewInExploration = () => {
    addQuery({
      queryBuilderId: DATA_EXPLORATION_QB_ID,
      query: generateQuery({
        newFilters: [
          generateValueFilter({
            field: 'sample_id',
            value: (sampleGeneExpData ?? []).map((x) => x.sample_id),
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

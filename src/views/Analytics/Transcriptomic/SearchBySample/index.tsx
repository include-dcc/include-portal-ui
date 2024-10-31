import { useState } from 'react';
import intl from 'react-intl-universal';
import { FilterOutlined } from '@ant-design/icons';
import Empty from '@ferlab/ui/core/components/Empty';
import { MatchTableItem } from '@ferlab/ui/core/components/UploadIds/types';
import { Button, Select, Slider, Tag } from 'antd';

import SearchLabel from 'components/uiKit/search/SearchLabel';
import SampleUploadIds from 'components/uiKit/Uploads/SampleUploadIds';
import {
  ITranscriptomicsSampleGeneExp,
  TTranscriptomicsDatum,
  TTranscriptomicsSwarmPlotData,
} from 'services/api/transcriptomics/models';

import TranscriptomicSearch from '../TranscriptomicSearch';

import styles from './index.module.css';

type OwnProps = {
  options?: ITranscriptomicsSampleGeneExp;
  selectedGene?: TTranscriptomicsDatum;
  selectedSamples: TTranscriptomicsSwarmPlotData[];
  onSelectOptions: (samples: TTranscriptomicsSwarmPlotData[]) => void;
  onToggle: (isToggled: boolean) => void;
  disabled?: boolean;
};

const TranscriptomicSearchBySample = ({
  options,
  selectedSamples,
  selectedGene,
  onSelectOptions,
  disabled = false,
  onToggle,
}: OwnProps) => {
  const [toggleFilterPanel, setToggleFilterPanel] = useState<boolean>(false);
  const parsedOptions = options?.data || [];
  const pkms = parsedOptions.flatMap((option) => option.y);
  return (
    <div className={styles.searchBySample}>
      <SearchLabel
        title={intl.get('screen.analytics.transcriptomic.filter.samples.title')}
        tooltipText={intl.get('screen.analytics.transcriptomic.filter.samples.tooltip')}
      />
      <div className={styles.container}>
        <div className={styles.selectContainer}>
          <TranscriptomicSearch<TTranscriptomicsSwarmPlotData>
            options={parsedOptions}
            selectedOptionsIds={selectedSamples.map((sample) => sample.sample_id)}
            onSelectOptions={onSelectOptions}
            disabled={disabled}
            placeholder={intl.get('screen.analytics.transcriptomic.filter.samples.placeholder')}
            emptyText={intl.get('screen.analytics.transcriptomic.filter.samples.emptyText')}
            optionLabelKey="sample_id"
            optionValueKey="sample_id"
          />
        </div>
        <div className={styles.uploadsContainer}>
          <SampleUploadIds
            ensemblGeneId={selectedGene?.ensembl_gene_id}
            buttonProps={{ type: 'default', disabled: disabled }}
            handleUpload={(uniqueMatches: MatchTableItem[]) => {
              const matches = uniqueMatches.map((uniqueMatch) => uniqueMatch.matchTo);
              const result = parsedOptions.filter((option) => matches.includes(option.sample_id));
              onSelectOptions(result);
            }}
          />
        </div>
        <div className={styles.filterContainer} style={{ display: 'none' }}>
          <Button
            icon={<FilterOutlined />}
            disabled={disabled}
            onClick={() => {
              if (onToggle) {
                onToggle(!toggleFilterPanel);
              }
              setToggleFilterPanel(!toggleFilterPanel);
            }}
          />
        </div>
      </div>
      {toggleFilterPanel && (
        <div className={styles.filters}>
          <div className={styles.filter}>
            <SearchLabel
              className={styles.searchLabel}
              title={intl.get('screen.analytics.transcriptomic.filter.samples.fpkm')}
              tooltipText={intl.get('screen.analytics.transcriptomic.filter.genes.tooltip')}
            />
            <Slider
              max={Math.max(...pkms)}
              min={Math.min(...pkms)}
              defaultValue={[20, 50]}
              range
              disabled={disabled}
            />
          </div>
          <div className={styles.filter}>
            <SearchLabel
              className={styles.searchLabel}
              title={intl.get('screen.analytics.transcriptomic.filter.samples.age_at_biospecimen')}
              tooltipText={intl.get('screen.analytics.transcriptomic.filter.genes.tooltip')}
            />
            <Slider defaultValue={[20, 50]} range disabled={disabled} />
          </div>
          <div className={styles.filter}>
            <SearchLabel
              className={styles.searchLabel}
              title={intl.get('screen.analytics.transcriptomic.filter.samples.sex')}
              tooltipText={intl.get('screen.analytics.transcriptomic.filter.genes.tooltip')}
            />
            <Select
              allowClear
              autoClearSearchValue
              maxTagCount="responsive"
              mode="multiple"
              disabled={disabled}
              notFoundContent={
                <Empty
                  size="mini"
                  showImage={false}
                  description={intl.get('screen.analytics.transcriptomic.filter.genes.emptyText')}
                />
              }
              className={styles.select}
              tagRender={({ onClose, label }) => (
                <Tag className={styles.tag} closable onClose={onClose} style={{ marginRight: 3 }}>
                  {label}
                </Tag>
              )}
              options={[
                {
                  label: 'Female',
                  value: 'female',
                },
                {
                  label: 'Male',
                  value: 'male',
                },
                {
                  label: 'Unknown',
                  value: 'unknow',
                },
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TranscriptomicSearchBySample;

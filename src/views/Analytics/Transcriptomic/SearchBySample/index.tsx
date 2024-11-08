import { useEffect, useState } from 'react';
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
  handleFPKM: (values: number[]) => void;
  handleAges: (values: number[]) => void;
  handleSex: (value: string[]) => void;
  selectedGene?: TTranscriptomicsDatum;
  selectedSamples: TTranscriptomicsSwarmPlotData[];
  onSelectOptions: (samples: TTranscriptomicsSwarmPlotData[]) => void;
  onToggle: (isToggled: boolean) => void;
  disabled?: boolean;
};

const TranscriptomicSearchBySample = ({
  options,
  handleFPKM,
  handleAges,
  handleSex,
  selectedSamples,
  selectedGene,
  onSelectOptions,
  disabled = false,
  onToggle,
}: OwnProps) => {
  const [toggleFilterPanel, setToggleFilterPanel] = useState<boolean>(false);
  const [fpkm, setFpkm] = useState<[number, number]>([
    options?.min_fpkm_value ?? 0,
    options?.max_fpkm_value ?? 1,
  ]);
  const [ages, setAges] = useState<[number, number]>([
    options?.min_age_at_biospecimen_collection_years ?? 0,
    options?.max_age_at_biospecimen_collection_years ?? 1,
  ]);
  const [sex, setSex] = useState<string[]>([]);

  useEffect(() => {
    if (options) {
      setFpkm([options.min_fpkm_value, options.max_fpkm_value]);
      setAges([
        options.min_age_at_biospecimen_collection_years,
        options.max_age_at_biospecimen_collection_years,
      ]);
      setSex([]);
    }
  }, [options]);

  useEffect(() => {
    handleFPKM(fpkm);
  }, [fpkm, handleFPKM]);

  useEffect(() => {
    handleAges(ages);
  }, [ages, handleAges]);

  useEffect(() => {
    handleSex(sex);
  }, [sex, handleSex]);

  const parsedOptions = options?.data || [];

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
            dictionary={{
              content: {
                placeholder: intl.get('screen.analytics.transcriptomic.filter.samples.placeholder'),
              },
            }}
          />
        </div>
        <div className={styles.filterContainer}>
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
              min={options?.min_fpkm_value ?? 0}
              max={options?.max_fpkm_value ?? 1}
              value={fpkm}
              range
              disabled={disabled}
              onChange={(value) => {
                setFpkm(value);
              }}
            />
          </div>
          <div className={styles.filter}>
            <SearchLabel
              className={styles.searchLabel}
              title={intl.get('screen.analytics.transcriptomic.filter.samples.age_at_biospecimen')}
              tooltipText={intl.get('screen.analytics.transcriptomic.filter.genes.tooltip')}
            />
            <Slider
              min={options?.min_age_at_biospecimen_collection_years}
              max={options?.max_age_at_biospecimen_collection_years}
              value={ages}
              range
              disabled={disabled}
              onChange={(value) => {
                setAges(value);
              }}
            />
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
              value={sex}
              onChange={(value) => {
                setSex(value);
              }}
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
                  label: intl.get('screen.analytics.transcriptomic.filter.samples.female'),
                  value: 'Female',
                },
                {
                  label: intl.get('screen.analytics.transcriptomic.filter.samples.male'),
                  value: 'Male',
                },
                {
                  label: intl.get('screen.analytics.transcriptomic.filter.samples.unknown'),
                  value: 'Unknow',
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

import { useState } from 'react';
import intl from 'react-intl-universal';
import { FilterOutlined } from '@ant-design/icons';
import Empty from '@ferlab/ui/core/components/Empty/index';
import { MatchTableItem } from '@ferlab/ui/core/components/UploadIds/types';
import { Button, Select, Tag } from 'antd';

import SearchLabel from 'components/uiKit/search/SearchLabel';
import GenesUploadIds from 'components/uiKit/Uploads/GeneUploadIds';
import { TranscriptomicsApi } from 'services/api/transcriptomics';
import {
  TTranscriptomicsDatum,
  TTranscriptomicsDiffGeneExp,
} from 'services/api/transcriptomics/models';

import TranscriptomicSearch from '../TranscriptomicSearch';

import styles from './index.module.css';

export enum FDROperators {
  lessThan,
  lessThanOrEqual,
}

const getFdrValue = (value: string): TFDRValue | undefined => {
  switch (value) {
    case 'q ≤ 0.1':
      return { value: 0.1, text: 'q ≤ 0.1' };
    case 'q ≤ 0.05':
      return { value: 0.05, text: 'q ≤ 0.05' };
    case 'q ≤ 0.01':
      return { value: 0.01, text: 'q ≤ 0.01' };
    default:
      return undefined;
  }
};

export type TFDRValue = {
  value: number;
  text: string;
};

type OwnProps = {
  options?: TTranscriptomicsDiffGeneExp[];
  handleFdrThreshold: (fdr?: TFDRValue) => void;
  selectedGenes: TTranscriptomicsDatum[];
  onSelectOptions: (genes: TTranscriptomicsDatum[]) => void;
  onToggle?: (isToggled: boolean) => void;
};

const TranscriptomicSearchByGene = ({
  options,
  selectedGenes,
  handleFdrThreshold,
  onSelectOptions,
  onToggle,
}: OwnProps) => {
  const [toggleFilterPanel, setToggleFilterPanel] = useState<boolean>(false);
  const parsedOptions: TTranscriptomicsDatum[] = options?.flatMap((option) => option.data) || [];

  return (
    <div className={styles.searchByGene}>
      <SearchLabel
        className={styles.searchLabel}
        title={intl.get('screen.analytics.transcriptomic.filter.genes.title')}
        tooltipText={intl.get('screen.analytics.transcriptomic.filter.genes.tooltip')}
      />
      <div className={styles.container}>
        <div className={styles.selectContainer}>
          <TranscriptomicSearch<TTranscriptomicsDatum>
            options={parsedOptions}
            selectedOptionsIds={selectedGenes.map((gene) => gene.ensembl_gene_id)}
            onSelectOptions={onSelectOptions}
            placeholder={intl.get('screen.analytics.transcriptomic.filter.genes.placeholder')}
            emptyText={intl.get('screen.analytics.transcriptomic.filter.genes.emptyText')}
            optionLabelKey="gene_symbol"
            optionValueKey="ensembl_gene_id"
          />
        </div>
        <div className={styles.uploadsContainer}>
          <GenesUploadIds
            dictionary={{
              content: {
                placeholder: intl.get('screen.analytics.transcriptomic.filter.genes.placeholder'),
                matchTable: {
                  mappedToFieldColTitle: intl.get(
                    'screen.analytics.transcriptomic.filter.genes.mappedCol',
                  ),
                },
              },
              popover: {
                idenfitifersValue: intl.get(
                  'screen.analytics.transcriptomic.filter.genes.identifiers',
                ),
              },
            }}
            buttonProps={{ type: 'default' }}
            handleUpload={(uniqueMatches: MatchTableItem[]) => {
              const matches = uniqueMatches.flatMap((uniqueMatch) => [
                uniqueMatch.mappedTo,
                uniqueMatch.matchTo,
              ]);
              const result = parsedOptions.filter(
                (option) =>
                  matches.includes(option.gene_symbol) || matches.includes(option.ensembl_gene_id),
              );
              onSelectOptions(result);
            }}
            fetchMatch={async (ids: string[]) => {
              const response = await TranscriptomicsApi.checkGenesExist(ids);
              return (response.response.data ?? []).map((gene: TTranscriptomicsDatum) => ({
                key: gene.gene_symbol,
                submittedId: ids.filter(
                  (id) => gene.ensembl_gene_id === id || gene.gene_symbol === id,
                )[0],
                mappedTo: gene.gene_symbol,
                matchTo: gene.ensembl_gene_id,
              }));
            }}
          />
        </div>
        <div className={styles.toggleFilterButton}>
          <Button
            icon={<FilterOutlined />}
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
          <SearchLabel
            className={styles.searchLabel}
            title={intl.get('screen.analytics.transcriptomic.filter.genes.fdr')}
            tooltipText={intl.get('screen.analytics.transcriptomic.filter.genes.tooltip')}
          />
          <Select
            allowClear
            autoClearSearchValue
            onChange={(value) => {
              handleFdrThreshold(getFdrValue(value));
            }}
            notFoundContent={
              <Empty
                size="mini"
                showImage={false}
                description={intl.get('screen.analytics.transcriptomic.filter.genes.emptyText')}
              />
            }
            tagRender={({ onClose, label }) => (
              <Tag className={styles.tag} closable onClose={onClose} style={{ marginRight: 3 }}>
                {label}
              </Tag>
            )}
            options={[
              {
                label: 'q ≤ 0.1',
                value: 'q ≤ 0.1',
              },
              {
                label: 'q ≤ 0.05',
                value: 'q ≤ 0.05',
              },
              {
                label: 'q ≤ 0.01',
                value: 'q ≤ 0.01',
              },
            ]}
          />
        </div>
      )}
    </div>
  );
};
export default TranscriptomicSearchByGene;

import intl from 'react-intl-universal';
import UploadIds from '@ferlab/ui/core/components/UploadIds';
import { MatchTableItem } from '@ferlab/ui/core/components/UploadIds/types';
import { numberWithCommas } from '@ferlab/ui/core/utils/numberUtils';
import { ButtonProps, Descriptions } from 'antd';

import { TranscriptomicsApi } from 'services/api/transcriptomics';

import styles from './index.module.css';

interface OwnProps {
  className?: string;
  buttonProps?: ButtonProps;
  handleUpload: (uniqueMatches: MatchTableItem[]) => void;
  ensemblGeneId?: string;
}

const SampleUploadIds = ({ className, ensemblGeneId, buttonProps, handleUpload }: OwnProps) => (
  <UploadIds
    className={className}
    dictionary={{
      modalTitle: intl.get('upload.sample.ids.modal.title'),
      submittedColTitle: intl.get('upload.sample.ids.modal.submittedColTitle'),
      uploadBtnText: intl.get('upload.sample.ids.modal.uploadBtnText'),
      modalUploadBtnText: intl.get('upload.sample.ids.modal.upload.file.btn'),
      mappedTo: intl.get('upload.sample.ids.modal.mappedTo'),
      clear: intl.get('upload.sample.ids.modal.clear.btn'),
      emptyTableDescription: intl.get('upload.sample.ids.modal.empty.table'),
      modalOkText: intl.get('upload.sample.ids.modal.upload.btn'),
      modalCancelText: intl.get('upload.sample.ids.modal.cancel.btn'),
      collapseTitle: (matchCount: number, unMatchCount: number) =>
        intl.get('upload.sample.ids.modal.collapseTitle', {
          matchCount: numberWithCommas(matchCount),
          unMatchCount: numberWithCommas(unMatchCount),
        }),
      matchTabTitle: (matchCount: number) =>
        intl.get('upload.sample.ids.modal.match', { count: numberWithCommas(matchCount) }),
      unmatchTabTitle: (unmatchcount: number) =>
        intl.get('upload.sample.ids.modal.unmatch', { count: numberWithCommas(unmatchcount) }),
      tablesMessage: (submittedCount: number, mappedCount: number) =>
        intl.get('upload.sample.ids.modal.table.message', {
          submittedCount: numberWithCommas(submittedCount),
          mappedCount: numberWithCommas(mappedCount),
        }),
      inputLabel: intl.get('upload.sample.ids.modal.input.label'),
      matchTable: {
        idColTitle: intl.get('upload.sample.ids.modal.match.table.idcol.title'),
        matchToFieldColTitle: intl.get('upload.sample.ids.modal.match.table.matchcol.title'),
        mappedToFieldColTitle: intl.get('upload.sample.ids.modal.match.table.mappedcol.title'),
      },
    }}
    popoverProps={{
      title: intl.get('components.uploadIds.modal.popover.title'),
      overlayClassName: styles.sampleIdsPopover,
      content: (
        <Descriptions column={1}>
          <Descriptions.Item label={intl.get('components.uploadIds.modal.popover.identifiers')}>
            {intl.get('upload.sample.ids.modal.identifiers')}
          </Descriptions.Item>
          <Descriptions.Item
            label={intl.get('components.uploadIds.modal.popover.separatedBy.title')}
          >
            {intl.get('components.uploadIds.modal.popover.separatedBy.values')}
          </Descriptions.Item>
          <Descriptions.Item
            label={intl.get('components.uploadIds.modal.popover.uploadFileFormats')}
          >
            {intl.get('components.uploadIds.modal.popover.fileFormats')}
          </Descriptions.Item>
        </Descriptions>
      ),
    }}
    placeHolder={intl.get('components.uploadIds.modal.placeholders.sample')}
    fetchMatch={async (ids: string[]) => {
      const response = await TranscriptomicsApi.checkSampleIdsAndGene({
        ensembl_gene_id: ensemblGeneId,
        sample_ids: ids,
      });

      return (response?.response?.data ?? []).map((id: string) => ({
        key: id,
        submittedId: id,
        mappedTo: id,
        matchTo: id,
      }));
    }}
    onUpload={(matches: MatchTableItem[]) => {
      const uniqueMatches = matches.filter(
        (match, index, currentMatch) =>
          index === currentMatch.findIndex((m) => m.mappedTo === match.mappedTo),
      );

      return handleUpload(uniqueMatches);
    }}
    buttonProps={buttonProps}
  />
);

export default SampleUploadIds;

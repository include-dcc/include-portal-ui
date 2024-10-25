import intl from 'react-intl-universal';
import UploadIds from '@ferlab/ui/core/components/UploadIds';
import { MatchTableItem, TFetchMatchFunc } from '@ferlab/ui/core/components/UploadIds/types';
import { numberWithCommas } from '@ferlab/ui/core/utils/numberUtils';
import { ButtonProps, Descriptions } from 'antd';

import styles from './index.module.css';

interface OwnProps {
  className?: string;
  buttonProps?: ButtonProps;
  handleUpload: (uniqueMatches: MatchTableItem[]) => void;
  identifiersText?: string;
  fetchMatch: TFetchMatchFunc;
}

const GenesUploadIds = ({
  className,
  identifiersText,
  buttonProps,
  handleUpload,
  fetchMatch,
}: OwnProps) => (
  <UploadIds
    className={className}
    dictionary={{
      modalTitle: intl.get('upload.gene.ids.modal.title'),
      submittedColTitle: intl.get('upload.gene.ids.modal.submittedColTitle'),
      uploadBtnText: intl.get('upload.gene.ids.modal.uploadBtnText'),
      modalUploadBtnText: intl.get('upload.gene.ids.modal.upload.file.btn'),
      mappedTo: intl.get('upload.gene.ids.modal.mappedTo'),
      clear: intl.get('upload.gene.ids.modal.clear.btn'),
      emptyTableDescription: intl.get('upload.gene.ids.modal.empty.table'),
      modalOkText: intl.get('upload.gene.ids.modal.upload.btn'),
      modalCancelText: intl.get('upload.gene.ids.modal.cancel.btn'),
      collapseTitle: (matchCount: number, unMatchCount: number) =>
        intl.get('upload.gene.ids.modal.collapseTitle', {
          matchCount: numberWithCommas(matchCount),
          unMatchCount: numberWithCommas(unMatchCount),
        }),
      matchTabTitle: (matchCount: number) =>
        intl.get('upload.gene.ids.modal.match', { count: numberWithCommas(matchCount) }),
      unmatchTabTitle: (unmatchcount: number) =>
        intl.get('upload.gene.ids.modal.unmatch', { count: numberWithCommas(unmatchcount) }),
      tablesMessage: (submittedCount: number, mappedCount: number) =>
        intl.get('upload.gene.ids.modal.table.message', {
          submittedCount: numberWithCommas(submittedCount),
          mappedCount: numberWithCommas(mappedCount),
        }),
      inputLabel: intl.get('upload.gene.ids.modal.input.label'),
      matchTable: {
        idColTitle: intl.get('upload.gene.ids.modal.match.table.idcol.title'),
        matchToFieldColTitle: intl.get('upload.gene.ids.modal.match.table.matchcol.title'),
        mappedToFieldColTitle: intl.get('upload.gene.ids.modal.match.table.mappedcol.title'),
      },
    }}
    popoverProps={{
      title: intl.get('components.uploadIds.modal.popover.title'),
      overlayClassName: styles.geneUploadIdsPopover,
      content: (
        <Descriptions column={1}>
          <Descriptions.Item label={intl.get('components.uploadIds.modal.popover.identifiers')}>
            {identifiersText ? identifiersText : intl.get('upload.gene.ids.modal.identifiers')}
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
    placeHolder="ex. ENSG00000157764, TP53"
    fetchMatch={fetchMatch}
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

export default GenesUploadIds;

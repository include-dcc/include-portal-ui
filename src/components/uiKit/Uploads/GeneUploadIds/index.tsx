import intl from 'react-intl-universal';
import UploadIds from '@ferlab/ui/core/components/UploadIds';
import { MatchTableItem, TFetchMatchFunc } from '@ferlab/ui/core/components/UploadIds/types';
import { TextTransformMode } from '@ferlab/ui/core/components/UploadIds/UploadModal';
import { numberWithCommas } from '@ferlab/ui/core/utils/numberUtils';
import { ButtonProps, Descriptions } from 'antd';

import styles from './index.module.css';

type TDictionary = {
  content?: {
    modalTitle?: string;
    placeholder?: string;
    submittedColTitle?: string;
    uploadBtnText?: string;
    modalUploadBtnText?: string;
    mappedTo?: string;
    clear?: string;
    emptyTableDescription?: string;
    modalOkText?: string;
    modalCancelText?: string;
    collapseTitle?: (matchCount: number, unMatchCount: number) => string;
    matchTabTitle?: (matchCount: number) => string;
    unmatchTabTitle?: (unmatchcount: number) => string;
    tablesMessage?: (submittedCount: number, mappedCount: number) => string;
    inputLabel?: string;
    matchTable?: {
      idColTitle?: string;
      matchToFieldColTitle?: string;
      mappedToFieldColTitle?: string;
    };
  };
  popover?: {
    title?: string;
    idenfitifersTitle?: string;
    idenfitifersValue?: string;
    separatedByTitle?: string;
    separatedByValue?: string;
    uploadFileFormats?: string;
    fileFormats?: string;
  };
};

interface OwnProps {
  className?: string;
  buttonProps?: ButtonProps;
  handleUpload: (uniqueMatches: MatchTableItem[]) => void;
  dictionary?: TDictionary;
  identifiersText?: string;
  fetchMatch: TFetchMatchFunc;
}

// eslint-disable-next-line complexity
const getDefaultDictionary = (dictionary: TDictionary = {}) => ({
  content: {
    modalTitle: dictionary?.content?.modalTitle ?? intl.get('upload.gene.ids.modal.title'),
    placeholder: dictionary?.content?.placeholder ?? intl.get('upload.gene.ids.modal.placeholder'),
    submittedColTitle:
      dictionary?.content?.submittedColTitle ?? intl.get('upload.gene.ids.modal.submittedColTitle'),
    uploadBtnText:
      dictionary?.content?.uploadBtnText ?? intl.get('upload.gene.ids.modal.uploadBtnText'),
    modalUploadBtnText:
      dictionary?.content?.modalUploadBtnText ?? intl.get('upload.gene.ids.modal.upload.file.btn'),
    mappedTo: dictionary?.content?.mappedTo ?? intl.get('upload.gene.ids.modal.mappedTo'),
    clear: dictionary?.content?.clear ?? intl.get('upload.gene.ids.modal.clear.btn'),
    emptyTableDescription:
      dictionary?.content?.emptyTableDescription ?? intl.get('upload.gene.ids.modal.empty.table'),
    modalOkText: dictionary?.content?.modalOkText ?? intl.get('upload.gene.ids.modal.upload.btn'),
    modalCancelText:
      dictionary?.content?.modalCancelText ?? intl.get('upload.gene.ids.modal.cancel.btn'),
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
    inputLabel: dictionary?.content?.inputLabel ?? intl.get('upload.gene.ids.modal.input.label'),
    matchTable: {
      idColTitle:
        dictionary?.content?.matchTable?.idColTitle ??
        intl.get('upload.gene.ids.modal.match.table.idcol.title'),
      matchToFieldColTitle:
        dictionary?.content?.matchTable?.matchToFieldColTitle ??
        intl.get('upload.gene.ids.modal.match.table.matchcol.title'),
      mappedToFieldColTitle:
        dictionary?.content?.matchTable?.mappedToFieldColTitle ??
        intl.get('upload.gene.ids.modal.match.table.mappedcol.title'),
    },
  },
  popover: {
    title: dictionary?.popover?.title ?? intl.get('components.uploadIds.modal.popover.title'),
    idenfitifersTitle:
      dictionary?.popover?.idenfitifersTitle ??
      intl.get('components.uploadIds.modal.popover.identifiers'),
    idenfitifersValue:
      dictionary?.popover?.idenfitifersValue ?? intl.get('upload.gene.ids.modal.identifiers'),
    separatedByTitle:
      dictionary?.popover?.separatedByTitle ??
      intl.get('components.uploadIds.modal.popover.separatedBy.title'),
    separatedByValue:
      dictionary?.popover?.separatedByValue ??
      intl.get('components.uploadIds.modal.popover.separatedBy.values'),
    uploadFileFormats:
      dictionary?.popover?.uploadFileFormats ??
      intl.get('components.uploadIds.modal.popover.uploadFileFormats'),
    fileFormats:
      dictionary.popover?.fileFormats ?? intl.get('components.uploadIds.modal.popover.fileFormats'),
  },
});

const GenesUploadIds = ({
  className,
  buttonProps,
  handleUpload,
  dictionary,
  fetchMatch,
}: OwnProps) => {
  const uploadDictionary = getDefaultDictionary(dictionary);

  return (
    <UploadIds
      className={className}
      dictionary={uploadDictionary.content}
      popoverProps={{
        title: uploadDictionary.popover.title,
        overlayClassName: styles.geneUploadIdsPopover,
        content: (
          <Descriptions column={1}>
            <Descriptions.Item label={uploadDictionary.popover.idenfitifersTitle}>
              {uploadDictionary.popover.idenfitifersValue}
            </Descriptions.Item>
            <Descriptions.Item label={uploadDictionary.popover.separatedByTitle}>
              {uploadDictionary.popover.separatedByValue}
            </Descriptions.Item>
            <Descriptions.Item label={uploadDictionary.popover.uploadFileFormats}>
              {uploadDictionary.popover.fileFormats}
            </Descriptions.Item>
          </Descriptions>
        ),
      }}
      textTransformMode={TextTransformMode.UPPER}
      placeHolder={uploadDictionary.content.placeholder}
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
};

export default GenesUploadIds;

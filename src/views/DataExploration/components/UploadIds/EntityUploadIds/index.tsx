import intl from 'react-intl-universal';
import UploadIds from '@ferlab/ui/core/components/UploadIds';
import { TFetchMatchFunc, TOnUpload } from '@ferlab/ui/core/components/UploadIds/types';
import { numberWithCommas } from '@ferlab/ui/core/utils/numberUtils';
import { Descriptions } from 'antd';

import styles from './index.module.css';

interface OwnProps {
  entityId: string;
  entityIdTrans: string;
  placeHolder: string;
  entityIdentifiers: string;
  fetchMatch: TFetchMatchFunc;
  onUpload: TOnUpload;
}

const EntityUploadIds = ({
  entityId,
  entityIdTrans,
  placeHolder,
  entityIdentifiers,
  fetchMatch,
  onUpload,
}: OwnProps) => (
  <UploadIds
    dictionary={{
      modalTitle: intl.get('components.uploadIds.modal.title', { entity: entityIdTrans }),
      submittedColTitle: intl.get('components.uploadIds.modal.submittedColTitle', {
        entity: entityIdTrans,
      }),
      uploadBtnText: intl.get('components.uploadIds.modal.uploadBtnText', {
        entity: entityIdTrans,
      }),
      modalUploadBtnText: intl.get('components.uploadIds.modal.upload.fileBtn'),
      mappedTo: intl.get('components.uploadIds.modal.mappedTo'),
      clear: intl.get('components.uploadIds.modal.clearBtn'),
      emptyTableDescription: intl.get('components.uploadIds.modal.emptyTable'),
      modalOkText: intl.get('components.uploadIds.modal.upload.btn'),
      modalCancelText: intl.get('components.uploadIds.modal.cancelBtn'),
      collapseTitle: (matchCount, unMatchCount) =>
        intl.get('components.uploadIds.modal.collapseTitle', {
          matchCount: numberWithCommas(matchCount),
          unMatchCount: numberWithCommas(unMatchCount),
        }),
      matchTabTitle: (matchCount) =>
        intl.get('components.uploadIds.modal.match', { count: numberWithCommas(matchCount) }),
      unmatchTabTitle: (unmatchcount) =>
        intl.get('components.uploadIds.modal.unmatch', { count: numberWithCommas(unmatchcount) }),
      tablesMessage: (submittedCount, mappedCount) =>
        intl.get('components.uploadIds.modal.tableMessage', {
          submittedCount: numberWithCommas(submittedCount),
          mappedCount: numberWithCommas(mappedCount),
        }),
      inputLabel: intl.get('components.uploadIds.modal.inputLabel'),
      matchTable: {
        idColTitle: intl.get('components.uploadIds.modal.matchTable.idcol', {
          entity: entityIdTrans,
        }),
        matchToFieldColTitle: intl.get(
          `components.uploadIds.modal.matchTable.${entityId}.matchcol`,
        ),
        mappedToFieldColTitle: intl.get(
          `components.uploadIds.modal.matchTable.${entityId}.mappedcol`,
        ),
      },
    }}
    popoverProps={{
      title: intl.get('components.uploadIds.modal.popover.title'),
      overlayClassName: styles.entityUploadIdsPopover,
      content: (
        <Descriptions column={1}>
          <Descriptions.Item label={intl.get('components.uploadIds.modal.popover.identifiers')}>
            {entityIdentifiers}
          </Descriptions.Item>
          <Descriptions.Item
            label={intl.get('components.uploadIds.modal.popover.separatedBy.title')}
          >
            {intl.get('components.uploadIds.modal.popover.separatedBy.values')}
          </Descriptions.Item>
          <Descriptions.Item
            label={intl.get('components.uploadIds.modal.popover.uploadFileFormats')}
          >
            .txt, .csv, .tsv
          </Descriptions.Item>
        </Descriptions>
      ),
    }}
    placeHolder={placeHolder}
    fetchMatch={fetchMatch}
    onUpload={onUpload}
  />
);

export default EntityUploadIds;

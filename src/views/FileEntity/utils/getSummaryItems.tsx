import intl from 'react-intl-universal';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { IFileEntity } from 'graphql/files/models';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { formatFileSize } from 'utils/formatFileSize';

const getSummaryItems = (file?: IFileEntity): IEntityDescriptionsItem[] => [
  {
    label: intl.get('entities.file.file_id'),
    value: file?.file_id || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.file.file_name'),
    value: file?.file_name || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.study.study'),
    value: file?.study
      ? `${file.study.study_name} (${file.study.study_code})`
      : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.file.format'),
    value: file?.file_format || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.file.size'),
    value: file ? formatFileSize(file?.size, { output: 'string' }) : TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.file.url'),
    value: file?.access_urls || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.file.hash'),
    value: file?.hashes.etag || TABLE_EMPTY_PLACE_HOLDER,
  },
];

export default getSummaryItems;

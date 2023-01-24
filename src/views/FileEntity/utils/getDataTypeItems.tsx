import intl from 'react-intl-universal';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { IFileEntity } from 'graphql/files/models';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

const getDataTypeItems = (file?: IFileEntity): IEntityDescriptionsItem[] => [
  {
    label: intl.get('entities.file.data_type.category'),
    value: file?.data_category || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.file.data_type.type'),
    value: file?.data_type || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    label: intl.get('entities.file.data_type.experimental_strategy'),
    value: file?.sequencing_experiment.experiment_strategy || TABLE_EMPTY_PLACE_HOLDER,
  },
];

export default getDataTypeItems;

import intl from 'react-intl-universal';
import { useParams } from 'react-router-dom';
import EntityPage, { EntityDescriptions } from '@ferlab/ui/core/pages/EntityPage';
import { useFileEntity } from 'graphql/files/actions';

import { getLinks, SectionId } from './utils/anchorLinks';
import getDataAccessItems from './utils/getDataAccessItems';
import getDataTypeItems from './utils/getDataTypeItems';
import getSummaryItems from './utils/getSummaryItems';
import BiospecimenTable from './BiospecimenTable';
import SummaryHeader from './SummaryHeader';
import FileEntityTitle from './Title';

export default function FileEntity() {
  const { file_id } = useParams<{ file_id: string }>();

  const { file, loading } = useFileEntity({
    field: 'file_id',
    value: file_id ?? '',
  });

  return (
    <EntityPage
      links={getLinks()}
      pageId={'file-entity-page'}
      data={file}
      loading={loading}
      emptyText={intl.get('no.data.available')}
    >
      <FileEntityTitle file={file} loading={loading} />

      <EntityDescriptions
        id={SectionId.SUMMARY}
        loading={loading}
        descriptions={getSummaryItems(file)}
        header={intl.get('entities.global.summary')}
        subheader={<SummaryHeader file={file} />}
      />
      <EntityDescriptions
        id={SectionId.DATA_ACCESS}
        loading={loading}
        descriptions={getDataAccessItems(file)}
        title={intl.get('entities.file.data_access')}
        header={intl.get('entities.file.data_access')}
      />
      <EntityDescriptions
        id={SectionId.DATA_TYPE}
        loading={loading}
        descriptions={getDataTypeItems(file)}
        title={intl.get('entities.file.data_type')}
        header={intl.get('entities.file.data_type')}
      />

      <BiospecimenTable file={file} loading={loading} />
    </EntityPage>
  );
}

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

  const { data, loading } = useFileEntity({
    field: 'file_id',
    value: file_id,
  });

  return (
    <EntityPage
      links={getLinks()}
      pageId={'file-entity-page'}
      data={data}
      loading={loading}
      emptyText={intl.get('no.data.available')}
    >
      <FileEntityTitle file={data} loading={loading} />

      <EntityDescriptions
        id={SectionId.SUMMARY}
        loading={loading}
        descriptions={getSummaryItems(data)}
        header={intl.get('entities.global.summary')}
        subheader={<SummaryHeader file={data} />}
      />
      <EntityDescriptions
        id={SectionId.DATA_ACCESS}
        loading={loading}
        descriptions={getDataAccessItems(data)}
        title={intl.get('entities.file.data_access')}
        header={intl.get('entities.file.data_access')}
      />
      <EntityDescriptions
        id={SectionId.DATA_TYPE}
        loading={loading}
        descriptions={getDataTypeItems(data)}
        title={intl.get('entities.file.data_type')}
        header={intl.get('entities.file.data_type')}
      />

      <BiospecimenTable data={data} loading={loading} />
    </EntityPage>
  );
}

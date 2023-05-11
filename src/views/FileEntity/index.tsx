import intl from 'react-intl-universal';
import { useParams } from 'react-router-dom';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import EntityPage, {
  EntityDescriptions,
  EntityTableRedirectLink,
} from '@ferlab/ui/core/pages/EntityPage';
import { INDEXES } from 'graphql/constants';
import { useFileEntity } from 'graphql/files/actions';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import ExternalLinkIcon from 'components/Icons/ExternalLinkIcon';
import { STATIC_ROUTES } from 'utils/routes';

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
    value: file_id,
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
        titleExtra={[
          <EntityTableRedirectLink
            key="1"
            to={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
            onClick={() =>
              addQuery({
                queryBuilderId: DATA_EXPLORATION_QB_ID,
                query: generateQuery({
                  newFilters: [
                    generateValueFilter({
                      field: 'file_id',
                      value: file ? [file.file_id] : [],
                      index: INDEXES.FILE,
                    }),
                  ],
                }),
                setAsActive: true,
              })
            }
            icon={<ExternalLinkIcon width={14} />}
          >
            {intl.get('global.viewInDataExploration')}
          </EntityTableRedirectLink>,
        ]}
        header={intl.get('entities.file.data_type')}
      />

      <BiospecimenTable file={file} loading={loading} />
    </EntityPage>
  );
}

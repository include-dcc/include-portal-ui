import intl from 'react-intl-universal';
import { useParams } from 'react-router';
import EntityPage, { EntityDescriptions } from '@ferlab/ui/core/pages/EntityPage';
import { useStudy } from 'graphql/studies/actions';

import getDataAccessDescriptions from './utils/dataAccess';
import getSummaryDescriptions from './utils/summary';

enum SectionId {
  SUMMARY = 'summary',
  DATA_ACCESS = 'data_access',
  DATA_FILE = 'data_file',
  DATASET = 'dataset',
}

const StudyEntity = () => {
  const { study_code } = useParams<{ study_code: string }>();
  const { data: study, loading } = useStudy({
    field: 'study_code',
    value: study_code ?? '',
  });

  const defaultLinks = [
    { href: `#${SectionId.SUMMARY}`, title: intl.get('entities.global.summary') },
  ];

  return (
    <EntityPage
      links={defaultLinks}
      data={study}
      loading={loading}
      pageId="study-entity-page"
      emptyText={intl.get('no.data.available')}
    >
      <>
        <EntityDescriptions
          id={SectionId.SUMMARY}
          title={intl.get('global.summary')}
          header={intl.get('entities.global.summary')}
          descriptions={getSummaryDescriptions(study)}
          loading={loading}
          noDataLabel={intl.get('no.data.available')}
        />

        {study?.dataset?.hits?.edges?.length && (
          <EntityDescriptions
            descriptions={getDataAccessDescriptions(study)}
            header={intl.get('entities.study.data_access')}
            id={SectionId.DATA_ACCESS}
            loading={loading}
            noDataLabel={intl.get('no.data.available')}
            title={intl.get('entities.study.data_access')}
          />
        )}
      </>
    </EntityPage>
  );
};

export default StudyEntity;

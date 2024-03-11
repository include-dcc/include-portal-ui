import intl from 'react-intl-universal';
import { useParams } from 'react-router';
import EntityPage, { EntityDataset, EntityDescriptions } from '@ferlab/ui/core/pages/EntityPage';
import { Typography } from 'antd';
import { useStudy } from 'graphql/studies/actions';

import getDataAccessDescriptions from './utils/dataAccess';
import getDatasetDescription from './utils/datasets';
import getSummaryDescriptions from './utils/summary';

import style from './index.module.scss';

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
    { href: `#${SectionId.DATA_ACCESS}`, title: intl.get('entities.study.data_access') },
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

        {study?.dataset?.hits?.edges?.length && (
          <>
            <Typography.Title level={4}>{intl.get('entities.study.datasets')}</Typography.Title>
            {study.dataset.hits.edges.map(({ node: dataset }) => (
              <EntityDataset
                containerClassName={style.datasetContainer}
                descriptions={getDatasetDescription(dataset)}
                dictionnary={{
                  participants: intl.get('entities.participant.participants'),
                  files: intl.get('entities.file.files'),
                }}
                file_count={dataset?.file_count || 0}
                header={dataset?.dataset_name || ''}
                id={SectionId.DATASET}
                key={dataset?.id}
                loading={loading}
                participant_count={dataset?.participant_count || 0}
              />
            ))}
          </>
        )}
      </>
    </EntityPage>
  );
};

export default StudyEntity;

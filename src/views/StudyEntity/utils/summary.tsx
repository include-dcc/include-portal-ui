import { Dispatch } from 'react';
import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { CopyOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { Space, Tag, Tooltip, Typography } from 'antd';
import copy from 'copy-to-clipboard';
import { IStudyEntity } from 'graphql/studies/models';
import { IPublicStudyEntity } from 'views/PublicStudyEntity/types';

import Publication from 'components/Publication';
import PublicPublication from 'components/Publication/PublicPublication';
import { globalActions } from 'store/global';
import { STATIC_ROUTES } from 'utils/routes';

import styles from '../index.module.css';

const { Text } = Typography;

interface IGetSummaryDescriptions {
  dispatch: Dispatch<any>;
  study?: IStudyEntity | IPublicStudyEntity;
  isPublic?: boolean;
}

const renderDoiCitation = (doi: { citation?: string; url?: string }, dispatch: Dispatch<any>) => {
  if (!doi.citation) return TABLE_EMPTY_PLACE_HOLDER;

  const citation = doi.citation;
  const doiUrlIndex = citation.indexOf('https://doi');
  const citationSliced = citation.slice(0, doiUrlIndex);

  return (
    <>
      <Text>
        {citationSliced}
        {doi.url && <ExternalLink href={doi.url}>{doi.url}.</ExternalLink>}
      </Text>
      <Tooltip title={intl.get('entities.study.doi.copyTooltip')}>
        <a
          onClick={() => {
            copy(doi.citation || '');
            dispatch(
              globalActions.displayMessage({
                content: intl.get('entities.study.doi.copyMessage'),
                type: 'success',
              }),
            );
          }}
          className={styles.copy}
        >
          <CopyOutlined />
        </a>
      </Tooltip>
    </>
  );
};

// eslint-disable-next-line complexity
const getSummaryDescriptions = ({
  study,
  isPublic = false,
  dispatch,
}: IGetSummaryDescriptions): IEntityDescriptionsItem[] => {
  const institutions = isPublic
    ? [
        ...new Set((study as IPublicStudyEntity)?.contacts?.map((contact) => contact.institution)),
      ].filter((institution) => institution)
    : [
        ...new Set(
          (study as IStudyEntity)?.contacts?.hits.edges.map((contact) => contact.node.institution),
        ),
      ].filter((institution) => institution);

  const clinicalTrial = isPublic
    ? (study?.clinical_trials as IPublicStudyEntity['clinical_trials'])?.[0]
    : (study as IStudyEntity)?.clinical_trials?.hits?.edges?.[0]?.node;

  const result: IEntityDescriptionsItem[] = [];

  if (study?.study_name) {
    result.push({
      label: intl.get('entities.study.study_name'),
      value: (
        <>
          <Text className={styles.studyNameSummary}>{study.study_name}</Text>
          <Tooltip title={intl.get('entities.study.study_code_tooltip')}>
            <Text>({study.study_code})</Text>
          </Tooltip>
          {study.is_harmonized ? (
            <Tooltip title={intl.get('entities.study.harmonizedTooltip')}>
              <Tag className={styles.studyNameTag}>{intl.get('entities.study.harmonized')}</Tag>
            </Tooltip>
          ) : (
            <Tooltip title={intl.get('entities.study.unharmonizedTooltip')}>
              <Tag className={styles.studyNameTag}>{intl.get('entities.study.unharmonized')}</Tag>
            </Tooltip>
          )}
        </>
      ),
    });
  }

  if (clinicalTrial) {
    result.push({
      label: intl.get('entities.study.clinical_trials.registry_id'),
      value: (
        <Space size={8}>
          <ExternalLink href={`http://clinicaltrials.gov/study/${clinicalTrial.registry_id}`}>
            {clinicalTrial.registry_id}
          </ExternalLink>
          {clinicalTrial.primary_purpose && (
            <Tooltip title={intl.get('entities.study.clinical_trials.primary_purpose')}>
              <Tag>{clinicalTrial.primary_purpose}</Tag>
            </Tooltip>
          )}
          {clinicalTrial.trial_phase && (
            <Tooltip title={intl.get('entities.study.clinical_trials.trial_phase')}>
              <Tag>{clinicalTrial.trial_phase}</Tag>
            </Tooltip>
          )}
        </Space>
      ),
    });
  }

  if (study?.program) {
    result.push({
      label: intl.get('entities.study.program'),
      value: study.program,
    });
  }

  if (study?.external_ids?.length) {
    result.push({
      label: intl.get('entities.study.dbGaP'),
      value: study.external_ids.map((id) => (
        <ExternalLink
          className={styles.dbgapLink}
          href={`https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${id}`}
          key={id}
        >
          {id}
        </ExternalLink>
      )),
    });
  }

  result.push({
    label: intl.get('entities.study.guid'),
    value: study?.is_guid_mapped ? (
      <Tooltip
        title={
          <>
            {intl.get('entities.study.guidEntityTooltip1')}
            <Link
              to={STATIC_ROUTES.STUDIES}
              style={{ textDecoration: 'underline' }}
              target="_blank"
            >
              {intl.get('entities.study.guidEntityTooltip2')}
            </Link>
            .
          </>
        }
      >
        <Tag color="green">True</Tag>
      </Tooltip>
    ) : (
      <Tag color="default">False</Tag>
    ),
  });

  // TODO SJIP-1519 - move to design section
  // if (study?.part_lifespan_stages) {
  //   result.push({
  //     label: intl.get('entities.study.participant_life_span'),
  //     value: study.part_lifespan_stages.map((lifespan, index) => (
  //       <Tag color="cyan" key={index}>
  //         {lifespan}
  //       </Tag>
  //     )),
  //   });
  // }

  if (study?.description) {
    result.push({
      label: intl.get('entities.study.description'),
      value: study.description,
    });
  }

  if (study?.domains?.length) {
    result.push({
      label: intl.get('entities.study.domain'),
      value: study.domains.join(', '),
    });
  }

  if (study?.data_sources?.length) {
    result.push({
      label: intl.get('entities.study.data_sources'),
      value: study.data_sources.join(', '),
    });
  }

  if (study?.expected_data_categories?.length) {
    result.push({
      label: intl.get('entities.study.expected_data_categories'),
      value: study.expected_data_categories.join(', '),
    });
  }

  // TODO SJIP-1519 - move to design section
  // if (study?.selection_criteria?.length) {
  //   result.push({
  //     label: intl.get('entities.study.selection_criteria'),
  //     value: study?.selection_criteria?.join(', '),
  //   });
  // }

  // TODO SJIP-1519 - move to design section
  // if (study?.study_designs?.length) {
  //   result.push({
  //     label: intl.get('entities.study.study_design'),
  //     value: study?.study_designs?.join(', '),
  //   });
  // }

  if (!isPublic && study?.publications?.length) {
    result.push({
      label: (
        <Space size={4}>
          <Text>{intl.get('entities.study.publication')}</Text>
          <Tooltip title={intl.get('entities.study.publicationTooltip')}>
            <InfoCircleOutlined className={styles.publicationIcon} />
          </Tooltip>
        </Space>
      ),
      value: (
        <Publication
          modalTitle={study?.study_name}
          publications={study?.publications}
          publications_details={(study as IStudyEntity)?.publications_details}
        />
      ),
    });
  }

  if (isPublic && study?.publications?.length) {
    result.push({
      label: (
        <Space size={4}>
          <Text>{intl.get('entities.study.publication')}</Text>
          <Tooltip title={intl.get('entities.study.publicationTooltip')}>
            <InfoCircleOutlined className={styles.publicationIcon} />
          </Tooltip>
        </Space>
      ),
      value: (
        <PublicPublication
          modalTitle={study?.study_name}
          publications={study?.publications}
          publications_details={(study as IPublicStudyEntity)?.publications_details}
        />
      ),
    });
  }

  if (study?.doi?.citation) {
    result.push({
      label: intl.get('entities.study.doi.citation'),
      value: renderDoiCitation(study.doi, dispatch),
    });
  }

  if (study?.investigator_names?.length) {
    result.push({
      label: intl.get('entities.study.principal_investigator'),
      value: study.investigator_names.join(', '),
    });
  }

  if (institutions.length) {
    result.push({
      label: intl.get('entities.study.institution'),
      value: institutions.join(', '),
    });
  }

  if (study?.citation_statement) {
    result.push({
      label: intl.get('entities.study.citation_statement'),
      value: study.citation_statement,
    });
  }

  if (study?.acknowledgement) {
    result.push({
      label: intl.get('entities.study.acknowledgement'),
      value: study.acknowledgement,
    });
  }

  return result;
};

export default getSummaryDescriptions;

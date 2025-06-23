import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { InfoCircleOutlined } from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { Space, Tag, Tooltip, Typography } from 'antd';
import { IStudyEntity } from 'graphql/studies/models';
import { IPublicStudyEntity } from 'views/PublicStudyEntity/types';

import Publication from 'components/Publication';
import PublicPublication from 'components/Publication/PublicPublication';
import { STATIC_ROUTES } from 'utils/routes';

import styles from '../index.module.css';

const { Text } = Typography;

// eslint-disable-next-line complexity
const getSummaryDescriptions = (
  study?: IStudyEntity | IPublicStudyEntity,
  isPublic = false,
): IEntityDescriptionsItem[] => {
  const institutions = isPublic
    ? [
        ...new Set((study as IPublicStudyEntity)?.contacts?.map((contact) => contact.institution)),
      ].filter((institution) => institution)
    : [
        ...new Set(
          (study as IStudyEntity)?.contacts?.hits.edges.map((contact) => contact.node.institution),
        ),
      ].filter((institution) => institution);

  const result: IEntityDescriptionsItem[] = [];

  if (study?.study_code) {
    result.push({
      label: intl.get('entities.study.study_code'),
      value: study.study_code,
    });
  }

  if (study?.study_name) {
    result.push({
      label: intl.get('entities.study.study_name'),
      value: (
        <Space size={8}>
          <Text>{study.study_name}</Text>
          {study.is_harmonized ? (
            <Tooltip title={intl.get('entities.study.harmonizedTooltip')}>
              <Tag color="green">{intl.get('entities.study.harmonized')}</Tag>
            </Tooltip>
          ) : (
            <Tooltip title={intl.get('entities.study.unharmonizedTooltip')}>
              <Tag>{intl.get('entities.study.unharmonized')}</Tag>
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

  if (study?.part_lifespan_stages) {
    result.push({
      label: intl.get('entities.study.participant_life_span'),
      value: study.part_lifespan_stages.map((lifespan, index) => (
        <Tag color="cyan" key={index}>
          {lifespan}
        </Tag>
      )),
    });
  }

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

  if (study?.selection_criteria?.length) {
    result.push({
      label: intl.get('entities.study.selection_criteria'),
      value: study?.selection_criteria?.join(', '),
    });
  }

  if (study?.study_designs?.length) {
    result.push({
      label: intl.get('entities.study.study_design'),
      value: study?.study_designs?.join(', '),
    });
  }

  if (study?.website) {
    result.push({
      label: intl.get('entities.study.study_website'),
      value: <ExternalLink href={study.website}>{study.website}</ExternalLink>,
    });
  }

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

  if (!isPublic && study && (study as IStudyEntity).contacts?.hits?.edges?.length) {
    result.push({
      label: intl.get('entities.study.study_contact'),
      value: (study as IStudyEntity)?.contacts?.hits.edges.map((contact, index) => (
        <div key={index}>
          {contact.node.name && <Text>{contact.node.name}; </Text>}
          {contact.node.email && <Text>{contact.node.email}</Text>}
        </div>
      )),
    });
  }

  if (isPublic && study && (study as IPublicStudyEntity).contacts?.length) {
    result.push({
      label: intl.get('entities.study.study_contact'),
      value: (study as IPublicStudyEntity)?.contacts?.map((contact, index) => (
        <div key={index}>
          {contact.name && <Text>{contact.name}; </Text>}
          {contact.email && <Text>{contact.email}</Text>}
        </div>
      )),
    });
  }

  if (study?.biobank_contact) {
    result.push({
      label: intl.get('entities.study.virtual_biorepository_email'),
      value: (
        <ExternalLink href={`mailto:${study.biobank_contact}`}>
          {study.biobank_contact}
        </ExternalLink>
      ),
    });
  }

  if (study?.biobank_request_link) {
    result.push({
      label: intl.get('entities.study.virtual_biorepository_url'),
      value: (
        <ExternalLink href={study.biobank_request_link}>{study.biobank_request_link}</ExternalLink>
      ),
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

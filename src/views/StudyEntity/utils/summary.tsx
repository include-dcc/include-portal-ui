import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { InfoCircleOutlined } from '@ant-design/icons';
import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { IEntityDescriptionsItem } from '@ferlab/ui/core/pages/EntityPage';
import { Space, Tag, Tooltip, Typography } from 'antd';
import { IStudyEntity } from 'graphql/studies/models';

import Publication from 'components/Publication';
import { STATIC_ROUTES } from 'utils/routes';

import styles from '../index.module.css';

const { Text } = Typography;

// eslint-disable-next-line complexity
const getSummaryDescriptions = (study?: IStudyEntity): IEntityDescriptionsItem[] => {
  const institutions = [
    ...new Set(study?.contacts?.hits.edges.map((contact) => contact.node.institution)),
  ].filter((institution) => institution);

  return [
    {
      label: intl.get('entities.study.study_code'),
      value: study?.study_code || TABLE_EMPTY_PLACE_HOLDER,
    },
    {
      label: intl.get('entities.study.study_name'),
      value: study?.study_name ? (
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
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
    },
    {
      label: intl.get('entities.study.program'),
      value: study?.program || TABLE_EMPTY_PLACE_HOLDER,
    },
    {
      label: intl.get('entities.study.dbGaP'),
      value: study?.external_ids?.length
        ? study.external_ids.map((id) => (
            <ExternalLink
              className={styles.dbgapLink}
              href={`https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${id}`}
              key={id}
            >
              {id}
            </ExternalLink>
          ))
        : TABLE_EMPTY_PLACE_HOLDER,
    },
    {
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
    },
    {
      label: intl.get('entities.study.participant_life_span'),
      value: study?.part_lifespan_stages
        ? study?.part_lifespan_stages.map((lifespan, index) => (
            <Tag color="cyan" key={index}>
              {lifespan}
            </Tag>
          ))
        : TABLE_EMPTY_PLACE_HOLDER,
    },
    {
      label: intl.get('entities.study.description'),
      value: study?.description || TABLE_EMPTY_PLACE_HOLDER,
    },
    {
      label: intl.get('entities.study.domain'),
      value: study?.domains?.join(', ') || TABLE_EMPTY_PLACE_HOLDER,
    },
    {
      label: intl.get('entities.study.data_sources'),
      value: study?.data_sources?.join(', ') || TABLE_EMPTY_PLACE_HOLDER,
    },
    {
      label: intl.get('entities.study.expected_data_categories'),
      value: study?.expected_data_categories?.join(', ') || TABLE_EMPTY_PLACE_HOLDER,
    },
    {
      label: intl.get('entities.study.selection_criteria'),
      value: study?.selection_criteria?.join(', ') || TABLE_EMPTY_PLACE_HOLDER,
    },
    {
      label: intl.get('entities.study.study_design'),
      value: study?.study_designs?.join(', ') || TABLE_EMPTY_PLACE_HOLDER,
    },
    {
      label: intl.get('entities.study.study_website'),
      value: study?.website ? (
        <ExternalLink href={study.website}>{study.website}</ExternalLink>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
    },
    {
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
          publications_details={study?.publications_details}
        />
      ),
    },
    {
      label: intl.get('entities.study.principal_investigator'),
      value: study?.investigator_names?.join(', ') || TABLE_EMPTY_PLACE_HOLDER,
    },
    {
      label: intl.get('entities.study.institution'),
      value: institutions.length ? institutions.join(', ') : TABLE_EMPTY_PLACE_HOLDER,
    },
    {
      label: intl.get('entities.study.study_contact'),
      value: study?.contacts?.hits?.edges?.length
        ? study?.contacts?.hits?.edges.map((contact, index) => (
            <div key={index}>
              {contact.node.name && <Text>{contact.node.name}; </Text>}
              {contact.node.email && <Text>{contact.node.email}</Text>}
            </div>
          ))
        : TABLE_EMPTY_PLACE_HOLDER,
    },
    {
      label: intl.get('entities.study.virtual_biorepository_email'),
      value: study?.biobank_contact ? (
        <ExternalLink href={`mailto:${study.biobank_contact}`}>
          {study.biobank_contact}
        </ExternalLink>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
    },
    {
      label: intl.get('entities.study.virtual_biorepository_url'),
      value: study?.biobank_request_link ? (
        <ExternalLink href={study.biobank_request_link}>{study.biobank_request_link}</ExternalLink>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
    },
    {
      label: intl.get('entities.study.citation_statement'),
      value: study?.citation_statement || TABLE_EMPTY_PLACE_HOLDER,
    },
    {
      label: intl.get('entities.study.acknowledgement'),
      value: study?.acknowledgement || TABLE_EMPTY_PLACE_HOLDER,
    },
  ];
};

export default getSummaryDescriptions;

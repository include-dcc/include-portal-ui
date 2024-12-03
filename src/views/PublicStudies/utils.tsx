import intl from 'react-intl-universal';
import { AuditOutlined } from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import ExpandableCell from '@ferlab/ui/core/components/tables/ExpandableCell';
import { numberWithCommas } from '@ferlab/ui/core/utils/numberUtils';
import { Space, Tag, Tooltip, Typography } from 'antd';
import StudyPopoverRedirect from 'views/DataExploration/components/StudyPopoverRedirect';
import { DataCategory, hasDataCategory } from 'views/Studies';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { IStudiesParticipants } from 'services/api/arranger/models';

import style from './index.module.css';

export const SCROLL_WRAPPER_ID = 'public-studies-scroll-wrapper';
export const TABLE_ID = 'public-studies';

export const getColumns = (): ProColumnType<any>[] => [
  {
    key: 'is_harmonized',
    iconTitle: <AuditOutlined />,
    title: intl.get('entities.study.harmonized'),
    popoverProps: {
      title: <b>{intl.get('screen.studies.harmonizedPopover.title')}</b>,
      overlayStyle: { maxWidth: '400px' },
      content: intl.getHTML('screen.studies.harmonizedPopover.content'),
    },
    align: 'center',
    render: (record: IStudiesParticipants) => {
      const harmonizedTag = record.is_harmonized ? (
        <Tooltip title={intl.get('entities.study.harmonized')}>
          <Tag color="green">{intl.get('entities.study.harmonizedAbrv')}</Tag>
        </Tooltip>
      ) : (
        <Tooltip title={intl.get('entities.study.unharmonized')}>
          <Tag>{intl.get('entities.study.unharmonizedAbrv')}</Tag>
        </Tooltip>
      );
      const guidTag = record.guid === 'NDAR' && (
        <Tooltip title={intl.get('entities.study.guidTooltip')}>
          <Tag color="volcano">{intl.get('entities.study.guidAbrv')}</Tag>
        </Tooltip>
      );
      return (
        <Space size={4}>
          {harmonizedTag}
          {guidTag}
        </Space>
      );
    },
  },
  {
    key: 'study_code',
    title: intl.get('entities.study.code'),
    dataIndex: 'study_code',
    // TODO Open modal
    render: (study_code: string) => <a>{study_code}</a>,
  },
  {
    key: 'study_name',
    title: intl.get('entities.study.name'),
    width: 400,
    render: (record: IStudiesParticipants) => (
      <StudyPopoverRedirect
        studyId={record?.study_id}
        studyName={record?.study_name}
        text={record?.study_name}
      />
    ),
  },
  {
    key: 'program',
    title: intl.get('entities.study.program'),
    dataIndex: 'program',
    render: (program: string) => program || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    key: 'domains',
    title: intl.get('entities.study.domains'),
    dataIndex: 'domains',
    render: (domains: string[]) => {
      if (!domains || domains.length === 0) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }
      return (
        <ExpandableCell
          nOfElementsWhenCollapsed={2}
          dataSource={domains}
          renderItem={(sourceText) => <div>{sourceText}</div>}
        />
      );
    },
    width: 300,
  },
  {
    key: 'external_ids',
    title: intl.get('entities.study.dbgap'),
    dataIndex: 'external_ids',
    render: (external_ids: string[]) => {
      if (!external_ids || external_ids.length === 0) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }

      return (
        <ExpandableCell
          nOfElementsWhenCollapsed={1}
          dataSource={external_ids}
          renderItem={(id, index) => (
            <div key={index}>
              <ExternalLink
                className={style.dbgapLink}
                href={`https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${id}`}
              >
                {id}
              </ExternalLink>
            </div>
          )}
        />
      );
    },
  },
  {
    key: 'description',
    title: intl.get('entities.study.description'),
    dataIndex: 'description',
    render: (description: string) =>
      description ? (
        <Typography.Text
          style={{ width: '200px' }}
          ellipsis={{ tooltip: description }}
          className={style.descriptionCell}
        >
          {description}
        </Typography.Text>
      ) : (
        TABLE_EMPTY_PLACE_HOLDER
      ),
  },
  {
    key: 'participant_count',
    title: intl.get('entities.participant.participants'),
    render: (record: IStudiesParticipants) => {
      const participantCount = record?.participant_count || 0;

      return participantCount ? (
        // TODO Open modal
        <a>{numberWithCommas(participantCount)}</a>
      ) : (
        participantCount || TABLE_EMPTY_PLACE_HOLDER
      );
    },
  },
  {
    key: 'file_count',
    title: intl.get('entities.file.files'),
    render: (record: IStudiesParticipants) => {
      const fileCount = record?.file_count || 0;

      return fileCount ? (
        // TODO Open modal
        <a>{numberWithCommas(fileCount)}</a>
      ) : (
        fileCount || TABLE_EMPTY_PLACE_HOLDER
      );
    },
  },
  {
    key: 'genomic',
    title: intl.get('entities.study.dataCategory.genomic'),
    tooltip: intl.get('entities.study.dataCategory.genomicTooltip'),
    align: 'center',
    render: (record: IStudiesParticipants) =>
      hasDataCategory(record.data_category, DataCategory.GENOMIC),
  },
  {
    key: 'transcriptomic',
    title: intl.get('entities.study.dataCategory.transcriptomic'),
    tooltip: intl.get('entities.study.dataCategory.transcriptomicTooltip'),
    align: 'center',
    render: (record: IStudiesParticipants) =>
      hasDataCategory(record.data_category, DataCategory.TRANSCRIPTOMIC),
  },
  {
    key: 'proteomic',
    title: intl.get('entities.study.dataCategory.proteomic'),
    tooltip: intl.get('entities.study.dataCategory.proteomicTooltip'),
    align: 'center',
    render: (record: IStudiesParticipants) =>
      hasDataCategory(record.data_category, DataCategory.PROTEOMIC),
  },
];

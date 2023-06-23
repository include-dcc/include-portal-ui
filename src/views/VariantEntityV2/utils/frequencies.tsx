import intl from 'react-intl-universal';
import { InfoCircleOutlined } from '@ant-design/icons';
import { ProColumnType, TProTableSummary } from '@ferlab/ui/core/components/ProTable/types';
import { updateActiveQueryField } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { IVariantFrequencies, IVariantStudyEntity } from '@ferlab/ui/core/pages//EntityPage/type';
import {
  formatQuotientOrElse,
  formatQuotientToExponentialOrElse,
  numberWithCommas,
} from '@ferlab/ui/core/utils/numberUtils';
import { Button, Space, Tooltip } from 'antd';
import { INDEXES } from 'graphql/constants';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';
import { STATIC_ROUTES } from 'utils/routes';

export const MIN_N_OF_PARTICIPANTS_FOR_LINK = 10;

import { IBoundType, IVariantEntity } from 'graphql/variantsv2/models';

import styles from '../index.module.scss';

type TInternalRow = {
  frequencies: IVariantFrequencies;
  key: string;
  participant_total_number: number;
  participant_ids: null | string[];
  participant_number: number;
  study_id: string;
};

export const getFrequenciesItems = (): ProColumnType[] => [
  {
    dataIndex: 'study_code',
    key: 'study_code',
    title: intl.get('screen.variants.frequencies.studies'),
  },
  {
    title: intl.get('screen.variants.frequencies.participants'),
    iconTitle: (
      <Space>
        <Tooltip
          className={styles.dotted}
          title={intl.get('screen.variants.frequencies.participantsTooltip')}
        >
          {intl.get('screen.variants.frequencies.participants')}
        </Tooltip>
        <Tooltip title={intl.get('screen.variants.frequencies.participantsInfoIconTooltip')}>
          <InfoCircleOutlined />
        </Tooltip>
      </Space>
    ),
    key: 'participants',
    render: (row: TInternalRow) =>
      row?.participant_number >= MIN_N_OF_PARTICIPANTS_FOR_LINK ? (
        <>
          <Button
            type="link"
            href={STATIC_ROUTES.DATA_EXPLORATION}
            onClick={() => {
              updateActiveQueryField({
                field: 'participant_id',
                index: INDEXES.PARTICIPANT,
                queryBuilderId: DATA_EXPLORATION_QB_ID,
                value: row.participant_ids || [],
              });
            }}
          >
            {numberWithCommas(row.participant_number)}
          </Button>
          {row.participant_total_number
            ? ` / ${numberWithCommas(row.participant_total_number)}`
            : ''}
        </>
      ) : (
        formatQuotientOrElse(row.participant_number, row.participant_total_number)
      ),
  },
  {
    title: intl.get('screen.variants.frequencies.frequency'),
    tooltip: intl.get('screen.variants.frequencies.frequencyTooltip'),
    key: 'frequency',
    render: (row: TInternalRow) =>
      formatQuotientToExponentialOrElse(row.participant_number, row.participant_total_number),
  },
  {
    title: intl.get('screen.variants.frequencies.altAlleles'),
    tooltip: intl.get('screen.variants.frequencies.altAllelesTooltip'),
    dataIndex: 'total',
    key: 'upper_bound_kf_ac',
    render: (total: IBoundType) => (total?.ac ? numberWithCommas(total.ac) : 0),
    width: '14%',
  },
  {
    title: intl.get('screen.variants.frequencies.homozygotes'),
    tooltip: intl.get('screen.variants.frequencies.homozygotesTooltip'),
    dataIndex: 'total',
    key: 'upper_bound_kf_homozygotes',
    render: (total: IBoundType) => (total?.hom ? numberWithCommas(total.hom) : 0),
    width: '14%',
  },
];

export const getFrequenciesTableSummaryColumns = (
  variant?: IVariantEntity,
  studies?: IVariantStudyEntity[],
): TProTableSummary[] => {
  const hasparticipantlink: boolean =
    studies?.some(
      (s: IVariantStudyEntity) => s.participant_number >= MIN_N_OF_PARTICIPANTS_FOR_LINK,
    ) || false;

  return [
    {
      index: 0,
      value: intl.get('screen.variants.frequencies.total'),
    },
    {
      index: 1,
      value: hasparticipantlink ? (
        <>
          <Button
            type="link"
            href={STATIC_ROUTES.DATA_EXPLORATION}
            onClick={() => {
              updateActiveQueryField({
                field: 'participant_id',
                index: INDEXES.PARTICIPANT,
                queryBuilderId: DATA_EXPLORATION_QB_ID,
                value: (studies || []).map((s) => s.participant_ids || []).flat(),
              });
            }}
          >
            {numberWithCommas(variant?.internal_frequencies?.total?.pc || 0)}
          </Button>
          {variant?.internal_frequencies?.total?.pn
            ? ` / ${numberWithCommas(variant.internal_frequencies?.total?.pn)}`
            : ''}
        </>
      ) : (
        formatQuotientOrElse(
          variant?.internal_frequencies?.total?.pc || 0,
          variant?.internal_frequencies?.total?.pn || 0,
          TABLE_EMPTY_PLACE_HOLDER,
        )
      ),
    },
    {
      index: 2,
      value: formatQuotientToExponentialOrElse(
        variant?.internal_frequencies?.total?.pc || 0,
        variant?.internal_frequencies?.total?.pn || 0,
        TABLE_EMPTY_PLACE_HOLDER,
      ),
    },
    {
      index: 3,
      value: variant?.internal_frequencies?.total?.ac
        ? numberWithCommas(variant.internal_frequencies.total.ac)
        : 0,
    },
    {
      index: 4,
      value: variant?.internal_frequencies?.total?.hom
        ? numberWithCommas(variant.internal_frequencies.total.hom)
        : 0,
    },
  ];
};

export const getPublicCohorts = (): ProColumnType[] => [
  {
    dataIndex: 'cohort',
    key: 'cohort',
    render: (cohort: { cohortName: string; link?: string }) =>
      cohort.link ? (
        <a href={cohort.link} rel="noopener noreferrer" target="_blank">
          {cohort.cohortName}
        </a>
      ) : (
        cohort.cohortName
      ),
    title: intl.get('screen.variants.frequencies.cohort'),
  },
  {
    dataIndex: 'alt',
    key: 'alt',
    render: (alt: string | number | null) => {
      if (!alt) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }
      return typeof alt === 'number' ? numberWithCommas(alt) : alt;
    },
    title: intl.get('screen.variants.frequencies.altAlleles'),
    tooltip: intl.get('screen.variants.frequencies.altAllelesTooltip'),
  },
  {
    dataIndex: 'altRef',
    key: 'altRef',
    render: (altRef: string | number | null) => {
      if (!altRef) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }
      return typeof altRef === 'number' ? numberWithCommas(altRef) : altRef;
    },
    title: intl.get('screen.variants.frequencies.altRef'),
    tooltip: intl.get('screen.variants.frequencies.altRefTooltip'),
  },
  {
    dataIndex: 'homozygotes',
    key: 'homozygotes',
    render: (homozygotes: string | number | null) => {
      if (!homozygotes) {
        return TABLE_EMPTY_PLACE_HOLDER;
      }
      return typeof homozygotes === 'number' ? numberWithCommas(homozygotes) : homozygotes;
    },
    title: intl.get('screen.variants.frequencies.homozygotes'),
    tooltip: intl.get('screen.variants.frequencies.homozygotesTooltip'),
  },
  {
    dataIndex: 'frequency',
    key: 'frequency',
    render: (frequency: string) => frequency || TABLE_EMPTY_PLACE_HOLDER,
    title: intl.get('screen.variants.frequencies.frequency'),
  },
];

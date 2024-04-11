import React from 'react';
import BarChart from '@ferlab/ui/core/components/Charts/Bar';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { BarDatum } from '@nivo/bar';
import { Typography } from 'antd';
import { uniqBy } from 'lodash';

import { mondo } from './data';

import styles from './index.module.scss';

const { Title } = Typography;

type TStatisticFilter = {
  total?: number;
  unique?: boolean;
  excludeZeroValue?: boolean;
  excludes?: string[];
};

type TStatisticBarChart = {
  loading: boolean;
  data: BarDatum[];
  filter?: TStatisticFilter;
};

const TopBanner = () => {
  const applyFilter = ({ data, filter }: TStatisticBarChart, key = 'id') => {
    if (!filter) {
      return data;
    }

    let result = data as any[];

    if (filter.excludeZeroValue) {
      result = result.filter((item) => item.value > 0);
    }

    if (filter.excludes) {
      result = result.filter((item) => !filter.excludes?.includes((item as any)[key]));
    }

    if (filter.unique) {
      result = uniqBy(result, key);
    }

    if (filter.total) {
      result = result.slice(0, filter.total);
    }

    return result.sort().reverse();
  };

  const data = {
    loading: false,
    data: mondo,
    filter: {
      total: 10,
      unique: true,
      excludeZeroValue: true,
      excludes: [
        'complete trisomy 21 (MONDO:0700030)',
        'Down syndrome (MONDO:0008608)',
        'mosaic translocation Down syndrome (MONDO:0700129)',
        'mosaic trisomy 21 (MONDO:0700127)',
        'partial segmental duplication (MONDO:0700130)',
        'translocation Down syndrome (MONDO:0700128)',
        'trisomy 21 (MONDO:0700126)',
      ],
    },
  };

  return (
    <GridCard
      wrapperClassName={styles.wrapper}
      contentClassName={styles.contentCard}
      theme="shade"
      title={<Title level={4}>Top 10 Co-occurring Conditions (MONDO)</Title>}
      content={
        <BarChart
          colors={{ scheme: 'paired' }}
          defs={undefined}
          axisBottom={{
            tickValues: [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000],
          }}
          axisLeft={{
            format: (label: string) =>
              label
                .replace(/\(MONDO:\d+\)/g, '')
                .split('-')
                .pop(),
          }}
          padding={0.5}
          data={applyFilter(data, 'label')}
          layout="horizontal"
          margin={{
            bottom: 24,
            left: 130,
            right: 12,
          }}
          tooltipLabel={(node: any) => node.data.label}
        />
      }
    />
  );
};

export default TopBanner;

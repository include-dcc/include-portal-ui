import intl from 'react-intl-universal';
import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { Typography } from 'antd';
import { IMeasurement } from 'graphql/participants/models';

import AgeCell from '../AgeCell';

const getMeasurementColumns = (): ProColumnType[] => [
  {
    title: intl.get('entities.participant.measurement.type'),
    dataIndex: 'measurement_type',
    key: 'measurement_type',
    render: (measurement_type: String) => measurement_type || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    title: intl.get('entities.participant.measurement.loinc'),
    key: 'code_text',
    render: (measurement: IMeasurement) => {
      if (!measurement.code_text) return TABLE_EMPTY_PLACE_HOLDER;
      const loincCodeIndex = 'LOINC:'.length;
      return (
        <Typography.Text>
          {measurement.code_text}{' '}
          {measurement.url && measurement.code && (
            <>
              ({measurement.code.slice(0, loincCodeIndex)}
              <ExternalLink href={measurement.url}>
                {measurement.code.slice(loincCodeIndex)}
              </ExternalLink>
              )
            </>
          )}
        </Typography.Text>
      );
    },
  },
  {
    title: intl.get('entities.participant.measurement.value'),
    key: 'quantity.value',
    render: (measurement: IMeasurement) => measurement.quantity?.value || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    title: intl.get('entities.participant.measurement.unit'),
    key: 'quantity.unit',
    render: (measurement: IMeasurement) => measurement.quantity?.unit || TABLE_EMPTY_PLACE_HOLDER,
  },
  {
    title: intl.get('entities.participant.measurement.age'),
    tooltip: intl.get('entities.participant.measurement.age_tooltip'),
    key: 'effective_date_time.value',
    render: (measurement: IMeasurement) => (
      <AgeCell ageInDays={measurement.effective_date_time?.value} />
    ),
  },
];

export default getMeasurementColumns;

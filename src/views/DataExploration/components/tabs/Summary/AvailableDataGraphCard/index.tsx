import { Col, Row, Typography } from 'antd';
import { RawAggregation } from 'graphql/models';
import { toChartData } from 'utils/charts';
import BarChart from 'components/uiKit/charts/Bar';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import intl from 'react-intl-universal';
import { truncateString } from 'utils/string';
import { addFieldToActiveQuery } from 'utils/sqons';
import { VisualType } from '@ferlab/ui/core/components/filters/types';
import { INDEXES } from 'graphql/constants';

interface OwnProps {
  className?: string;
  loading?: boolean;
  dataTypeData: RawAggregation;
  typeOfOmicsData: RawAggregation;
}

const transformDataType = (results: RawAggregation) =>
  (results?.data?.participant?.aggregations?.files__data_type.buckets || []).map(toChartData);

const transformTypeOfOmics = (results: RawAggregation) =>
  (results?.data?.participant?.aggregations?.files__type_of_omics.buckets || []).map(toChartData);

const graphSetting: any = {
  height: 300,
  margin: {
    bottom: 45,
    left: 125,
  },
  enableLabel: false,
  layout: 'horizontal',
};

const { Title } = Typography;

const addToQuery = (field: string, key: string) =>
  addFieldToActiveQuery(
    field,
    {
      count: 1,
      key,
    },
    VisualType.Checkbox,
    INDEXES.PARTICIPANT,
  );

const AvailableDataGraphCard = ({
  className = '',
  loading = false,
  dataTypeData,
  typeOfOmicsData,
}: OwnProps) => {
  return (
    <GridCard
      wrapperClassName={className}
      theme="shade"
      loading={loading}
      loadingType="spinner"
      title={
        <Title level={4}>
          {intl.get('screen.dataExploration.tabs.summary.availableData.cardTitle')}
        </Title>
      }
      content={
        <Row gutter={[48, 24]}>
          <Col span={12}>
            <BarChart
              title="Participants by Type of Omics"
              data={transformTypeOfOmics(typeOfOmicsData)}
              axisLeft={{
                legend: 'Type of Omics',
                legendPosition: 'middle',
                legendOffset: -120,
                format: (title: string) => truncateString(title, 15),
              }}
              tooltipLabel={(node) => node.data.id}
              axisBottom={{
                legend: '# of participants',
                legendPosition: 'middle',
                legendOffset: 35,
              }}
              {...graphSetting}
            />
          </Col>
          <Col span={12}>
            <BarChart
              title="Participants by Data Type"
              data={transformDataType(dataTypeData)}
              axisLeft={{
                legend: 'Data Types',
                legendPosition: 'middle',
                legendOffset: -120,
                format: (title: string) => truncateString(title, 15),
              }}
              tooltipLabel={(node) => node.data.id}
              axisBottom={{
                legend: '# of participants',
                legendPosition: 'middle',
                legendOffset: 35,
              }}
              onClick={(datum) => addToQuery('files.data_type', datum.indexValue as string)}
              {...graphSetting}
            />
          </Col>
        </Row>
      }
    />
  );
};

export default AvailableDataGraphCard;

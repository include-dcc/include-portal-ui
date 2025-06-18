import intl from 'react-intl-universal';
import BarChart from '@ferlab/ui/core/components/Charts/Bar';
import LegendSymbol from '@ferlab/ui/core/components/Charts/LegendSymbol';
import Empty from '@ferlab/ui/core/components/Empty';
import { updateActiveQueryField } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { ArrangerValues } from '@ferlab/ui/core/data/arranger/formatting';
import { RangeOperators } from '@ferlab/ui/core/data/sqon/operators';
import ResizableGridCard from '@ferlab/ui/core/layout/ResizableGridLayout/ResizableGridCard';
import { INDEXES } from 'graphql/constants';
import useParticipantResolvedSqon from 'graphql/participants/useParticipantResolvedSqon';
import { AGE_QUERY } from 'graphql/summary/queries';
import { ARRANGER_API_PROJECT_URL } from 'provider/ApolloProvider';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import useApi from 'hooks/useApi';
import { getResizableGridDictionary } from 'utils/translation';

import { PARTCIPANTS_BY_AGE_CARD_ID, UID } from '../utils/grid';

const AGE_RANGE = ['[0-9]', '[10-19]', '[20-29]', '[30-39]', '[40-49]', '[50-59]', '60+'];
const T21 = 'T21';
const D21 = 'D21';

type ParticipantsByAgeQueryResult = {
  data: {
    [key: string]: {
      [key: string]: {
        total: number;
      };
    };
  };
};

const addToQuery = (field: string, key: string) => {
  const sqon = buildSqonFromRange(key);
  return updateActiveQueryField({
    queryBuilderId: DATA_EXPLORATION_QB_ID,
    field,
    value: sqon.value,
    operator: sqon.op,
    index: INDEXES.PARTICIPANT,
  });
};

const transformParticipantsByAge = (results: ParticipantsByAgeQueryResult) => {
  const datum: any[] = [];
  const data = Object.keys(results?.data?.participant || {}).map((key) => ({
    id: buildLabelFromGraphQLKey(key),
    group: key.substring(key.length - 3),
    value: results?.data?.participant[key]?.total || 0,
  }));

  AGE_RANGE.forEach((key) => {
    const range = data.filter((d) => d.id === key);
    datum.push({
      id: key,
      label: key,
      T21: range.find((d) => d.group === T21)?.value ?? 0,
      D21: range.find((d) => d.group === D21)?.value ?? 0,
    });
  });

  return datum;
};

const buildLabelFromGraphQLKey = (key: string) => {
  switch (key) {
    case '_0to9T21':
    case '_0to9D21':
      return AGE_RANGE[0];
    case '_10to19T21':
    case '_10to19D21':
      return AGE_RANGE[1];
    case '_20to29T21':
    case '_20to29D21':
      return AGE_RANGE[2];
    case '_30to39T21':
    case '_30to39D21':
      return AGE_RANGE[3];
    case '_40to49T21':
    case '_40to49D21':
      return AGE_RANGE[4];
    case '_50to59T21':
    case '_50to59D21':
      return AGE_RANGE[5];
    case '_60plusT21':
    default:
      return AGE_RANGE[6];
  }
};

const buildSqonFromRange = (rangeValue: string) => {
  switch (rangeValue) {
    case '[0-9]':
      return {
        op: RangeOperators['<='],
        value: [3650],
      };

    case '[10-19]':
      return {
        op: RangeOperators['between'],
        value: [3651, 7300],
      };
    case '[20-29]':
      return {
        op: RangeOperators['between'],
        value: [7301, 10950],
      };

    case '[30-39]':
      return {
        op: RangeOperators['between'],
        value: [10951, 14600],
      };
    case '[40-49]':
      return {
        op: RangeOperators['between'],
        value: [14601, 18250],
      };
    case '[50-59]':
      return {
        op: RangeOperators['between'],
        value: [18251, 21900],
      };
    case '60+':
      return {
        op: RangeOperators['>'],
        value: [21900],
      };
    default:
      return {
        op: undefined,
        value: [ArrangerValues.missing],
      };
  }
};

const isParticipantByAgeEmpty = (result: any[]): boolean =>
  result.filter((r) => r.T21 > 0 || r.D21 > 0).length == 0;

const ParticipantsByAgeGraphCard = () => {
  const { sqon } = useParticipantResolvedSqon(DATA_EXPLORATION_QB_ID);
  const { loading, result } = useApi<any>({
    config: {
      url: ARRANGER_API_PROJECT_URL,
      method: 'POST',
      data: {
        query: AGE_QUERY,
        variables: { sqon },
      },
    },
  });

  const data = transformParticipantsByAge(result);
  const legendData = [{ id: T21 }, { id: D21 }];

  return (
    <ResizableGridCard
      gridUID={UID}
      id={PARTCIPANTS_BY_AGE_CARD_ID}
      dictionary={getResizableGridDictionary()}
      theme="shade"
      loading={loading}
      loadingType="spinner"
      headerTitle={intl.get('screen.dataExploration.tabs.summary.availableData.participantsByAge')}
      tsvSettings={{
        data: [data],
        headers: [
          'Age at First Patient Engagement',
          intl.get(`screen.dataExploration.tabs.summary.graphs.participantsByAgeGraph.${T21}`),
          intl.get(`screen.dataExploration.tabs.summary.graphs.participantsByAgeGraph.${D21}`),
        ],
        contentMap: ['label', 'T21', 'D21'],
      }}
      modalContent={
        <BarChart
          data={data}
          groupMode="grouped"
          axisLeft={{
            legend: intl.get(
              'screen.dataExploration.tabs.summary.graphs.participantsByAgeGraph.legendAxisLeft',
            ),
            legendPosition: 'middle',
            legendOffset: -64,
          }}
          tooltipLabel={() =>
            intl.get('screen.dataExploration.tabs.summary.graphs.participantsByAgeGraph.tooltips')
          }
          axisBottom={{
            legend: intl.get(
              'screen.dataExploration.tabs.summary.graphs.participantsByAgeGraph.legendAxisBottom',
            ),
            legendPosition: 'middle',
            legendOffset: 35,
          }}
          legends={[
            {
              data: [
                {
                  id: T21,
                  label: intl.get(
                    `screen.dataExploration.tabs.summary.graphs.participantsByAgeGraph.${T21}`,
                  ),
                  color: '#e8c1a0',
                },
                {
                  id: D21,
                  label: intl.get(
                    `screen.dataExploration.tabs.summary.graphs.participantsByAgeGraph.${D21}`,
                  ),
                  color: '#f47560',
                },
              ],
              dataFrom: 'keys',
              anchor: 'top',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: -16,
              itemsSpacing: 1,
              itemWidth: 100,
              itemHeight: 10,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 10,
              symbolShape: (props) => <LegendSymbol {...props} data={legendData} />,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          colorBy="id"
          keys={[T21, D21]}
          onClick={(datum: any) =>
            addToQuery('age_at_first_patient_engagement.value', datum.indexValue as string)
          }
          margin={{
            bottom: 48,
            left: 80,
            right: 12,
            top: 16,
          }}
          layout="vertical"
        />
      }
      modalSettings={{
        width: 800,
        height: 400,
      }}
      content={
        <>
          {isParticipantByAgeEmpty(data) ? (
            <Empty imageType="grid" size="large" noPadding />
          ) : (
            <BarChart
              data={data}
              groupMode="grouped"
              axisLeft={{
                legend: intl.get(
                  'screen.dataExploration.tabs.summary.graphs.participantsByAgeGraph.legendAxisLeft',
                ),
                legendPosition: 'middle',
                legendOffset: -64,
              }}
              tooltipLabel={() =>
                intl.get(
                  'screen.dataExploration.tabs.summary.graphs.participantsByAgeGraph.tooltips',
                )
              }
              axisBottom={{
                legend: intl.get(
                  'screen.dataExploration.tabs.summary.graphs.participantsByAgeGraph.legendAxisBottom',
                ),
                legendPosition: 'middle',
                legendOffset: 35,
              }}
              legends={[
                {
                  data: [
                    {
                      id: T21,
                      label: intl.get(
                        `screen.dataExploration.tabs.summary.graphs.participantsByAgeGraph.${T21}`,
                      ),
                      color: '#e8c1a0',
                    },
                    {
                      id: D21,
                      label: intl.get(
                        `screen.dataExploration.tabs.summary.graphs.participantsByAgeGraph.${D21}`,
                      ),
                      color: '#f47560',
                    },
                  ],
                  dataFrom: 'keys',
                  anchor: 'top',
                  direction: 'row',
                  justify: false,
                  translateX: 0,
                  translateY: -16,
                  itemsSpacing: 1,
                  itemWidth: 100,
                  itemHeight: 10,
                  itemDirection: 'left-to-right',
                  itemOpacity: 0.85,
                  symbolSize: 10,
                  symbolShape: (props) => <LegendSymbol {...props} data={legendData} />,
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
              colorBy="id"
              keys={[T21, D21]}
              onClick={(datum: any) =>
                addToQuery('age_at_first_patient_engagement.value', datum.indexValue as string)
              }
              margin={{
                bottom: 48,
                left: 80,
                right: 12,
                top: 16,
              }}
              layout="vertical"
            />
          )}
        </>
      }
    />
  );
};

export default ParticipantsByAgeGraphCard;

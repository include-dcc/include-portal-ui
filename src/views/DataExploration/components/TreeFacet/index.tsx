import { useState } from 'react';
import intl from 'react-intl-universal';
import OntologyTreeModal from '@ferlab/ui/core/components/OntologyTreeFilter';
import { IOntologyTreeData } from '@ferlab/ui/core/components/OntologyTreeFilter/type';
import { updateActiveQueryField } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { TermOperators } from '@ferlab/ui/core/data/sqon/operators';
import { MERGE_VALUES_STRATEGIES } from '@ferlab/ui/core/data/sqon/types';

import CollapseLikeFacet from 'components/uiKit/FilterList/CollapsePlaceHolderFacet';
import { RemoteComponentList } from 'store/remote/types';

import { INDEXES } from '../../../../graphql/constants';
import useParticipantResolvedSqon from '../../../../graphql/participants/useParticipantResolvedSqon';
import EnvironmentVariables from '../../../../helpers/EnvVariables';
import useApi from '../../../../hooks/useApi';
import { DATA_EXPLORATION_QB_ID } from '../../utils/constant';

const ARRANGER_API_URL = EnvironmentVariables.configFor('ARRANGER_API');

type Props = {
  type: RemoteComponentList;
  field: string;
};

const TreeFacet = ({ type, field }: Props) => {
  const { sqon } = useParticipantResolvedSqon(DATA_EXPLORATION_QB_ID);
  const [active, setActive] = useState<boolean>(false);

  const { loading, result } = useApi<any>({
    config: {
      url: `${ARRANGER_API_URL}/phenotypes`,
      method: 'POST',
      data: {
        type: field,
        project: 'include',
        aggregations_filter_themselves: false,
        sqon,
      },
    },
  });

  return (
    <>
      <CollapseLikeFacet
        key={field}
        title={intl.get(`facets.${field}.name`)}
        onClick={() => {
          setActive(!active);
        }}
      />
      <OntologyTreeModal
        handleCancel={() => {
          setActive(false);
        }}
        handleOnApply={(value: string[], operator: TermOperators = TermOperators.in) => {
          if (value?.length > 0) {
            updateActiveQueryField({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              field: `${field}.name`,
              value,
              operator,
              index: INDEXES.PARTICIPANT,
              merge_strategy: MERGE_VALUES_STRATEGIES.OVERRIDE_VALUES,
            });
          } else {
            updateActiveQueryField({
              queryBuilderId: DATA_EXPLORATION_QB_ID,
              field: `${field}.name`,
              value: [],
            });
          }

          setActive(false);
        }}
        data={(result?.data as IOntologyTreeData[]) ?? []}
        open={active}
        loading={loading}
        dictionary={{
          cancelText: intl.get('global.cancel'),
          okText: intl.get(`screen.dataExploration.${type}.modal.okText`),
          title: intl.get(`screen.dataExploration.${type}.modal.title`),
          allOf: intl.get('screen.dataExploration.allOf'),
          anyOf: intl.get('screen.dataExploration.anyOf'),
          noneOf: intl.get('screen.dataExploration.noneOf'),
          tree: {
            participantsWithExactTermTooltip: intl.get(`screen.dataExploration.${type}.tags.exact`),
            participantsCountTooltip: intl.get(`screen.dataExploration.${type}.tags.all`),
            searchPlaceholder: intl.get(`screen.dataExploration.${type}.searchPlaceholder`),
            emptySelection: intl.get(`screen.dataExploration.${type}.emptySelection`),
            selectedCount: (count: number) =>
              intl.get(`screen.dataExploration.${type}.selectedCount`, { count }),
          },
        }}
      />
    </>
  );
};

export default TreeFacet;

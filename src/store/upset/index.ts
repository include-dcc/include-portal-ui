export type { initialState as UpsetInitialState } from './types';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';

import { fetchUpsetCoOccuringConditions } from 'store/upset/thunks';

import { coOccuringConditionsSelector } from './selector';

export { default, UpsetState } from './slice';

export const useCoOccuringConditions = (sqon: ISqonGroupFilter, topN: number) => {
  const dispatch = useDispatch();
  const occuringConditions = useSelector(coOccuringConditionsSelector);
  const sqonJson = JSON.stringify(sqon);

  useEffect(() => {
    dispatch(fetchUpsetCoOccuringConditions({ sqon: JSON.parse(sqonJson), topN }));
  }, [dispatch, sqonJson, topN]);

  return occuringConditions;
};

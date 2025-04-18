import { ISetOperation, ISummaryData } from '@ferlab/ui/core/components/Charts/Venn/utils';
import { ISqonGroupFilter, ISyntheticSqon } from '@ferlab/ui/core/data/sqon/types';
import { resolveSyntheticSqon } from '@ferlab/ui/core/data/sqon/utils';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ES_INDEXES, INDEXES } from 'graphql/constants';

import { ArrangerApi } from 'services/api/arranger';
import { RootState } from 'store/types';
import { handleThunkApiResponse } from 'store/utils';
import {
  mapFilterForBiospecimen,
  mapFilterForFiles,
  mapFilterForParticipant,
} from 'utils/fieldMapper';

export const fetchVennData = createAsyncThunk<
  {
    summary: ISummaryData[];
    operations: ISetOperation[];
    index: INDEXES;
  },
  {
    qbSqons: ISyntheticSqon[];
    index?: INDEXES;
  },
  { rejectValue: string; state: RootState }
>('venn/fetch', async (args, thunkAPI) => {
  const index = args.index ?? INDEXES.PARTICIPANT;
  const entitySqons: ISqonGroupFilter[] = args.qbSqons.map((sqon) => {
    if (args.index === INDEXES.BIOSPECIMEN) {
      return mapFilterForBiospecimen(resolveSyntheticSqon(args.qbSqons, sqon));
    }
    if (args.index === INDEXES.FILE) {
      return mapFilterForFiles(resolveSyntheticSqon(args.qbSqons, sqon));
    }
    if (args.index === INDEXES.VARIANTS) {
      return resolveSyntheticSqon(args.qbSqons, sqon);
    }
    return mapFilterForParticipant(resolveSyntheticSqon(args.qbSqons, sqon));
  });

  const { data, error } = await ArrangerApi.fetchVenn(
    args.qbSqons,
    entitySqons,
    index === INDEXES.VARIANTS ? ES_INDEXES.VARIANT : index, //translate to ES index
  );
  return handleThunkApiResponse({
    error,
    data: {
      summary: data.data.summary,
      operations: data.data.operations,
      index,
    },
    reject: thunkAPI.rejectWithValue,
  });
});

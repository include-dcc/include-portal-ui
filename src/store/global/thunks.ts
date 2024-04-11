import { createAsyncThunk } from '@reduxjs/toolkit';

import { ArrangerApi } from 'services/api/arranger';
import { IStatistics } from 'services/api/arranger/models';
import { RootState } from 'store/types';

const fetchStats = createAsyncThunk<IStatistics, void, { rejectValue: string; state: RootState }>(
  'arranger/fetch/stats',
  async () => {
    const { data: statistics } = await ArrangerApi.fetchStatistics();
    const { data: studiesStatistics } = await ArrangerApi.fetchStudiesParticipants();

    const formattedStudiesStatistics = studiesStatistics?.reduce(
      (acc, { study_code, participant_count }) => {
        acc[study_code] = participant_count;
        return acc;
      },
      {} as Record<string, number>,
    );

    const data: IStatistics = {
      ...statistics!,
      studiesParticipants: formattedStudiesStatistics!,
    };

    return data;
  },
  {
    condition: (_, { getState }) => {
      const { global } = getState();

      return global.stats === undefined;
    },
  },
);

export { fetchStats };

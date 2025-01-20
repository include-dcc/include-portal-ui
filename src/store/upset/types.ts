import { IArrangerUpset } from 'services/api/arranger/models';

export type initialState = {
  cooccuringconditions: {
    data: IArrangerUpset[];
    loading?: boolean;
    error?: boolean;
  };
};

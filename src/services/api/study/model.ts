import { IStudyEntity } from 'graphql/studies/models';

export interface IStudyFetchParams {
  study_code: string;
}
export interface IStudyPayload {
  data: IStudyEntity | undefined;
  error: boolean;
}

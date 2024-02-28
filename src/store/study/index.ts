import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { studySelector } from './selector';
import { fetchStudy } from './thunks';

export type { InitialState as StudyInitialState } from './type';

export { default, studyState } from './slice';

export const useStudyEntity = (studyCode: string) => {
  const state = useSelector(studySelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudy({ study_code: studyCode }));
  }, []);

  return state.study;
};

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import PageContent from 'views/PublicStudies/components/PageContent';

import PublicLayout from 'components/PublicLayout';
import { fetchStats } from 'store/global/thunks';

import { getColumns, SCROLL_WRAPPER_ID } from './utils';

import style from './index.module.css';

const PublicStudies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  return (
    <PublicLayout>
      <div className={style.studiesPage}>
        <ScrollContent id={SCROLL_WRAPPER_ID} className={style.scrollContent}>
          <PageContent defaultColumns={getColumns()} />
        </ScrollContent>
      </div>
    </PublicLayout>
  );
};

export default PublicStudies;

import { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { useNavigate } from 'react-router';
import PageHeader from '@ferlab/ui/core/layout/PageHeader';

import { SetType } from 'services/api/savedSet/models';
import { useSavedSet } from 'store/savedSet';
import { STATIC_ROUTES } from 'utils/routes';

import NoSet from './NoSet';
import SelectSets from './SelectSets';

import styles from './index.module.css';

const SetOperations = () => {
  const navigate = useNavigate();
  const [hasSets, setHasSets] = useState<boolean>(false);
  const [compareSets, setCompareSets] = useState<boolean>(false);
  const { savedSets } = useSavedSet();

  useEffect(() => {
    const participantSets = savedSets.filter(
      (savedSet) => savedSet.setType === SetType.PARTICIPANT,
    );
    const biospecimenSets = savedSets.filter(
      (savedSet) => savedSet.setType === SetType.BIOSPECIMEN,
    );
    const fileSets = savedSets.filter((savedSet) => savedSet.setType === SetType.FILE);
    const variantSets = savedSets.filter((savedSet) => savedSet.setType === SetType.VARIANT);
    if (
      participantSets.length > 1 ||
      biospecimenSets.length > 1 ||
      fileSets.length > 1 ||
      variantSets.length > 1
    ) {
      setHasSets(true);
    }
  }, [savedSets]);

  return (
    <>
      <PageHeader
        onBackButton={() => navigate(STATIC_ROUTES.ANALYTICS)}
        title={<>{intl.get('screen.analytics.setOperations.title')}</>}
      />
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          {!hasSets && !compareSets && <NoSet />}
          {hasSets && !compareSets && (
            <SelectSets savedSets={savedSets} setCompareSets={setCompareSets} />
          )}
          {compareSets && <div>Compare</div>}
        </div>
      </div>
    </>
  );
};

export default SetOperations;

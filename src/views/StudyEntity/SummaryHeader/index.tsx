import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import BiospecimenIcon from '@ferlab/ui/core/components/Icons/Futuro/BiospecimenIcon';
import FamilyIcon from '@ferlab/ui/core/components/Icons/Futuro/FamilyIcon';
import FileIcon from '@ferlab/ui/core/components/Icons/Futuro/FileIcon';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import StatisticIcon from '@ferlab/ui/core/components/StatisticIcon';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { INDEXES } from 'graphql/constants';
import { IStudyEntity } from 'graphql/studies/models';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import { STATIC_ROUTES } from 'utils/routes';

import styles from './index.module.scss';

interface ISummaryHeaderProps {
  study?: IStudyEntity;
}

const SummaryHeader = ({ study }: ISummaryHeaderProps) => {
  const participantCount = study?.participant_count || 0;
  const fileCount = study?.file_count || 0;
  const biospecimenCount = study?.biospecimen_count || 0;

  return (
    <div className={styles.container}>
      <Link
        to={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
        className={styles.link}
        onClick={() =>
          addQuery({
            queryBuilderId: DATA_EXPLORATION_QB_ID,
            query: generateQuery({
              newFilters: [
                generateValueFilter({
                  field: 'study.study_code',
                  value: study ? [study.study_code] : [],
                  index: INDEXES.STUDY,
                }),
              ],
            }),
            setAsActive: true,
          })
        }
      >
        <StatisticIcon
          count={participantCount}
          icon={<FamilyIcon className={styles.icon} />}
          label={intl.get('entities.participant.participants')}
        />
      </Link>
      <Link
        to={STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS}
        className={styles.link}
        onClick={() =>
          addQuery({
            queryBuilderId: DATA_EXPLORATION_QB_ID,
            query: generateQuery({
              newFilters: [
                generateValueFilter({
                  field: 'study.study_code',
                  value: study ? [study.study_code] : [],
                  index: INDEXES.STUDY,
                }),
              ],
            }),
            setAsActive: true,
          })
        }
      >
        <StatisticIcon
          count={biospecimenCount}
          icon={<BiospecimenIcon className={styles.icon} />}
          label={intl.get('entities.biospecimen.biospecimens')}
        />
      </Link>
      <Link
        to={STATIC_ROUTES.DATA_EXPLORATION_DATAFILES}
        className={styles.link}
        onClick={() =>
          addQuery({
            queryBuilderId: DATA_EXPLORATION_QB_ID,
            query: generateQuery({
              newFilters: [
                generateValueFilter({
                  field: 'study.study_code',
                  value: study ? [study.study_code] : [],
                  index: INDEXES.STUDY,
                }),
              ],
            }),
            setAsActive: true,
          })
        }
      >
        <StatisticIcon
          count={fileCount}
          icon={<FileIcon className={styles.icon} />}
          label={intl.get('entities.file.files')}
        />
      </Link>
    </div>
  );
};

export default SummaryHeader;

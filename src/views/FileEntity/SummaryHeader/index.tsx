import intl from 'react-intl-universal';
import { Link } from 'react-router-dom';
import { ReadOutlined, UserOutlined } from '@ant-design/icons';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { INDEXES } from 'graphql/constants';
import { IFileEntity } from 'graphql/files/models';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import BiospecimenIcon from 'components/Icons/BiospecimenIcon';
import { STATIC_ROUTES } from 'utils/routes';

import styles from './index.module.scss';

interface OwnProps {
  file?: IFileEntity;
}

const SummaryHeader = ({ file }: OwnProps) => {
  const studyCount = 1;
  const participantCount = file?.nb_participants || 0;
  const biospecimenCount = file?.nb_biospecimens || 0;

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
                  value: file ? [file.study.study_code] : [],
                  index: INDEXES.PARTICIPANT,
                }),
              ],
            }),
            setAsActive: true,
          })
        }
      >
        <ReadOutlined className={styles.readOutlinedIcon} />
        <span className={styles.count}>{studyCount}</span>
        <span className={styles.text}>
          {intl.get('entities.study.count', { count: studyCount })}
        </span>
      </Link>
      <Link
        to={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
        className={styles.link}
        onClick={() =>
          addQuery({
            queryBuilderId: DATA_EXPLORATION_QB_ID,
            query: generateQuery({
              newFilters: [
                generateValueFilter({
                  field: 'file_id',
                  value: file ? [file.file_id] : [],
                  index: INDEXES.FILE,
                }),
              ],
            }),
            setAsActive: true,
          })
        }
      >
        <UserOutlined className={styles.icon} />
        <span className={styles.count}>{participantCount}</span>
        <span className={styles.text}>
          {intl.get('entities.participant.count', { count: participantCount })}
        </span>
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
                  field: 'file_id',
                  value: file ? [file.file_id] : [],
                  index: INDEXES.FILE,
                }),
              ],
            }),
            setAsActive: true,
          })
        }
      >
        <BiospecimenIcon className={styles.icon} />
        <span className={styles.count}>{biospecimenCount}</span>
        <span className={styles.text}>
          {intl.get('entities.biospecimen.count', { count: biospecimenCount })}
        </span>
      </Link>
    </div>
  );
};

export default SummaryHeader;

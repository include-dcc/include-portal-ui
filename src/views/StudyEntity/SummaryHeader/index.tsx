import intl from 'react-intl-universal';
import { useNavigate } from 'react-router-dom';
import BiospecimenIcon from '@ferlab/ui/core/components/Icons/Futuro/BiospecimenIcon';
import FamilyIcon from '@ferlab/ui/core/components/Icons/Futuro/FamilyIcon';
import FileIcon from '@ferlab/ui/core/components/Icons/Futuro/FileIcon';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import StatisticIcon from '@ferlab/ui/core/components/StatisticIcon';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { Button, Tooltip } from 'antd';
import { INDEXES } from 'graphql/constants';
import { IStudyEntity } from 'graphql/studies/models';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';
import { IPublicStudyEntity } from 'views/PublicStudyEntity/types';

import { STATIC_ROUTES } from 'utils/routes';

import styles from './index.module.css';

interface ISummaryHeaderProps {
  study?: IStudyEntity | IPublicStudyEntity;
  manageLoginModal?: (isOpen: boolean) => void;
  manageRedirectUri?: (uri: string) => void;
  isPublicStudyEnabled?: boolean;
}

const SummaryHeader = ({
  study,
  manageLoginModal,
  manageRedirectUri,
  isPublicStudyEnabled = false,
}: ISummaryHeaderProps) => {
  const navigate = useNavigate();
  const participantCount = study?.participant_count || 0;
  const fileCount = study?.file_count || 0;
  const biospecimenCount = study?.biospecimen_count || 0;

  const items = [
    {
      route: STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS,
      icon: <FamilyIcon />,
      label: intl.get('entities.participant.participants'),
      count: participantCount,
      id: 'participant_count',
    },
    {
      route: STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS,
      icon: <BiospecimenIcon />,
      label: intl.get('entities.biospecimen.biospecimens'),
      count: biospecimenCount,
      id: 'biospecimen_count',
    },
    {
      route: STATIC_ROUTES.DATA_EXPLORATION_DATAFILES,
      icon: <FileIcon />,
      label: intl.get('entities.file.files'),
      count: fileCount,
      id: 'file_count',
    },
  ];

  return (
    <div className={styles.container}>
      {items.map((item) => (
        <Tooltip
          key={item.id}
          title={
            study?.is_harmonized ? undefined : intl.get('entities.study.unharmonizedWarningTooltip')
          }
          className={styles.tooltip}
        >
          <div>
            <Button
              disabled={!study?.is_harmonized}
              className={styles.item}
              onClick={() => {
                if (isPublicStudyEnabled) {
                  manageRedirectUri && manageRedirectUri(item.route);
                  manageLoginModal && manageLoginModal(true);
                } else {
                  navigate(item.route);
                }

                addQuery({
                  queryBuilderId: DATA_EXPLORATION_QB_ID,
                  query: generateQuery({
                    newFilters: [
                      generateValueFilter({
                        field: 'study.study_code',
                        value: study?.study_code ? [study.study_code] : [],
                        index: INDEXES.STUDY,
                      }),
                    ],
                  }),
                  setAsActive: true,
                });
              }}
            >
              <StatisticIcon
                disabled={!study?.is_harmonized}
                count={item.count}
                icon={item.icon}
                label={item.label}
              />
            </Button>
          </div>
        </Tooltip>
      ))}
    </div>
  );
};

export default SummaryHeader;

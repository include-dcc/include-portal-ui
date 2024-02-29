import intl from 'react-intl-universal';
import { Popover, Tooltip } from 'antd';

import styles from './index.module.scss';

type Props = {
  text: string;
  studyId: string;
  studyName: string;
};

export const AFFECTED_STUDY = ['ABC-DS'];

const StudyPopoverRedirect = ({ text, studyId, studyName }: Props) => {
  if (AFFECTED_STUDY.includes(studyId)) {
    return (
      <Popover
        content={
          <div>
            {intl.getHTML('entities.study.affectedStudies.message', {
              href: 'https://pitt.co1.qualtrics.com/jfe/form/SV_cu0pNCZZlrdSxUN',
            })}
          </div>
        }
        title={intl.get('entities.study.affectedStudies.title')}
        trigger="hover"
        overlayStyle={{ maxWidth: 410 }}
      >
        <div className={styles.studyName}>{text}</div>
      </Popover>
    );
  } else
    return (
      <div>
        <Tooltip title={studyName}>{text}</Tooltip>
      </div>
    );
};

export default StudyPopoverRedirect;

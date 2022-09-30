import { Popover } from 'antd';

import styles from './index.module.scss';

type Props = {
  text: string;
  studyId: string;
};

export const AFFECTED_STUDY = ['ABC-DS'];

const StudyPopoverRedirect = ({ text, studyId }: Props) => {
  if (AFFECTED_STUDY.includes(studyId)) {
    return (
      <Popover
        content={
          <div>
            Access to the full ABC-DS dataset, including clinical, cognitive, neuroimaging, and
            genetic data, must be requested from ABC-DS using this{' '}
            <a
              className={styles.popoverText}
              href={'https://pitt.co1.qualtrics.com/jfe/form/SV_cu0pNCZZlrdSxUN'}
              target={'_blank'}
              rel="noopener noreferrer"
            >
              data request
            </a>{' '}
            form.
          </div>
        }
        title="Study Access"
        trigger="hover"
        overlayStyle={{ maxWidth: 410 }}
      >
        <div className={styles.studyName}>{text}</div>
      </Popover>
    );
  } else return <div>{text}</div>;
};

export default StudyPopoverRedirect;

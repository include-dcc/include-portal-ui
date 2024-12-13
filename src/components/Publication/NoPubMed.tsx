import { ReactElement } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { CopyOutlined } from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { Tooltip } from 'antd';
import copy from 'copy-to-clipboard';

import { globalActions } from 'store/global';

import style from './index.module.css';

interface NoPubMedProps {
  publication: string;
}

const NoPubMed = ({ publication }: NoPubMedProps): ReactElement => {
  const dispatch = useDispatch();
  return (
    <>
      <ExternalLink href={publication}>{publication}</ExternalLink>
      <Tooltip title={intl.get('entities.study.publicationDetails.copyTooltip')}>
        <a
          onClick={() => {
            copy(publication);
            dispatch(
              globalActions.displayMessage({
                content: intl.get('entities.study.publicationDetails.copyMessage'),
                type: 'success',
              }),
            );
          }}
          className={style.copy}
        >
          <CopyOutlined />
        </a>
      </Tooltip>
    </>
  );
};

export default NoPubMed;

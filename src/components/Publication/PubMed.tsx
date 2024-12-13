import { ReactElement } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { CopyOutlined } from '@ant-design/icons';
import ExternalLink from '@ferlab/ui/core/components/ExternalLink';
import { Tooltip, Typography } from 'antd';
import copy from 'copy-to-clipboard';
import { IPublicationDetails } from 'graphql/studies/models';

import { globalActions } from 'store/global';

import { getTextToCopy } from './utils';

import style from './index.module.css';

interface PubMedProps {
  publication: IPublicationDetails;
}

const PubMed = ({ publication }: PubMedProps): ReactElement => {
  const dispatch = useDispatch();
  return (
    <>
      <span id={publication.PMID}>
        {publication.authors.hits.edges.length > 0 && (
          <Typography.Text>
            {publication.authors.hits.edges[0].node.family},{' '}
            {publication.authors.hits.edges[0].node.given}
          </Typography.Text>
        )}
        {publication.authors.hits.edges.length > 1 && (
          <Typography.Text>
            {' '}
            {intl.get('entities.study.publicationDetails.authors')}
          </Typography.Text>
        )}
        {publication.title && <Typography.Text> "{publication.title}"</Typography.Text>}
        {publication.container_title_short && (
          <Typography.Text italic> {publication.container_title_short}</Typography.Text>
        )}
        {publication.volume && (
          <Typography.Text>
            {' '}
            {intl.get('entities.study.publicationDetails.volAbrv')} {publication.volume}
          </Typography.Text>
        )}
        {publication.issue && <Typography.Text>,{publication.issue}</Typography.Text>}
        {publication.issued_date_parts && (
          <Typography.Text> ({publication.issued_date_parts[0]}):</Typography.Text>
        )}
        {publication.page && <Typography.Text> {publication.page}.</Typography.Text>}
        {publication.DOI && (
          <Typography.Text>
            {' '}
            {intl.get('entities.study.publicationDetails.doi')}
            {publication.DOI}.
          </Typography.Text>
        )}
        {publication.PMID && (
          <Typography.Text>
            {' '}
            {intl.get('entities.study.publicationDetails.pmid')}{' '}
            <ExternalLink href={`https://pubmed.ncbi.nlm.nih.gov/${publication.PMID}`}>
              {publication.PMID}
            </ExternalLink>
            .
          </Typography.Text>
        )}
      </span>
      <Tooltip title={intl.get('entities.study.publicationDetails.copyTooltip')}>
        <a
          onClick={() => {
            copy(getTextToCopy({ publication }));
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

export default PubMed;

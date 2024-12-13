import intl from 'react-intl-universal';
import { IPublicationDetails } from 'graphql/studies/models';

export const getTextToCopy = ({ publication }: { publication: IPublicationDetails }): string => {
  let textToCopy = '';
  if (publication.authors.hits.edges.length > 0)
    textToCopy += `${publication.authors.hits.edges[0].node.family}, ${publication.authors.hits.edges[0].node.given}`;

  if (publication.authors.hits.edges.length > 1)
    textToCopy += ` ${intl.get('entities.study.publicationDetails.authors')}`;

  if (publication.title) textToCopy += ` "${publication.title}"`;

  if (publication.container_title_short) textToCopy += ` ${publication.container_title_short}`;

  if (publication.volume)
    textToCopy += ` ${intl.get('entities.study.publicationDetails.volAbrv')} ${publication.volume}`;

  if (publication.issue) textToCopy += `,${publication.issue}`;

  if (publication.issued_date_parts) textToCopy += ` (${publication.issued_date_parts[0]}):`;

  if (publication.page) textToCopy += ` ${publication.page}.`;

  if (publication.DOI)
    textToCopy += ` ${intl.get('entities.study.publicationDetails.doi')}${publication.DOI}.`;

  if (publication.PMID)
    textToCopy += ` ${intl.get('entities.study.publicationDetails.pmid')} ${publication.PMID}.`;

  return textToCopy;
};

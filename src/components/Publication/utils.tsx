/* eslint-disable complexity */
import intl from 'react-intl-universal';
import { ArrangerResultsTree } from 'graphql/models';
import { IAuthor, IPublicationDetails } from 'graphql/studies/models';
import { PublicPublicationDetails } from 'views/PublicStudyEntity/types';

export const getTextToCopy = ({
  publication,
  isPublic = false,
}: {
  publication: IPublicationDetails | PublicPublicationDetails;
  isPublic?: boolean;
}): string => {
  let textToCopy = '';
  if (!isPublic && (publication.authors as ArrangerResultsTree<IAuthor>).hits.edges.length > 0)
    textToCopy += `${
      (publication.authors as ArrangerResultsTree<IAuthor>).hits.edges[0].node.family
    }, ${(publication.authors as ArrangerResultsTree<IAuthor>).hits.edges[0].node.given}`;

  if (!isPublic && (publication.authors as ArrangerResultsTree<IAuthor>).hits.edges.length > 1)
    textToCopy += ` ${intl.get('entities.study.publicationDetails.authors')}`;

  if (isPublic && (publication.authors as IAuthor[]).length > 0)
    textToCopy += `${(publication.authors as IAuthor[])[0].family}, ${
      (publication.authors as IAuthor[])[0].given
    }`;

  if (isPublic && (publication.authors as IAuthor[]).length > 1)
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

import { ReactElement } from 'react';
import { ArrangerResultsTree } from 'graphql/models';
import { IPublicationDetails } from 'graphql/studies/models';
import { cloneDeep } from 'lodash';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

import NoPubMed from './NoPubMed';
import PubMed from './PubMed';

const PUBMED_URL = 'pubmed';

type PublicationProps = {
  publications?: string[];
  publications_details?: ArrangerResultsTree<IPublicationDetails>;
};

const getPublications = ({ publications, publications_details }: PublicationProps) => {
  const publicationsDetails = cloneDeep(publications_details?.hits?.edges);
  const noPubMed: string[] = [];
  if (publicationsDetails?.length) {
    publicationsDetails.sort((a, b) =>
      a.node.issued_date_parts[0] < b.node.issued_date_parts[0] ||
      a.node.PMID.localeCompare(b.node.PMID)
        ? 1
        : -1,
    );
  }

  if (publications?.length) {
    publications.forEach((pub) => {
      if (!pub.includes(PUBMED_URL)) noPubMed.push(pub);
    });
  }

  return { pubMed: publicationsDetails, noPubMed };
};

const Publication = ({ publications, publications_details }: PublicationProps): ReactElement => {
  const publicationsSorted = getPublications({
    publications: publications,
    publications_details: publications_details,
  });
  const { pubMed, noPubMed } = publicationsSorted;

  if (!pubMed?.length && !noPubMed.length) return <>{TABLE_EMPTY_PLACE_HOLDER}</>;

  if (pubMed?.length) return <PubMed publication={pubMed[0].node} />;

  return <NoPubMed publication={noPubMed[0]} />;
};

export default Publication;

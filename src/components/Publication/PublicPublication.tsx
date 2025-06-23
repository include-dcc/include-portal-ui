import { ReactElement, useState } from 'react';
import intl from 'react-intl-universal';
import { Button } from 'antd';
import { cloneDeep } from 'lodash';
import { PublicPublicationDetails } from 'views/PublicStudyEntity/types';

import { TABLE_EMPTY_PLACE_HOLDER } from 'common/constants';

import NoPubMed from './NoPubMed';
import PubMed from './PubMed';
import PubModal from './PubModal';

import style from './index.module.css';

const PUBMED_URL = 'pubmed';

type GetPublicationProps = {
  publications?: string[];
  publications_details?: PublicPublicationDetails[];
};

type PublicationProps = GetPublicationProps & {
  modalTitle?: string;
};

const getPublications = ({ publications, publications_details }: GetPublicationProps) => {
  const publicationsDetails = cloneDeep(publications_details);
  const noPubMed: string[] = [];
  if (publicationsDetails?.length) {
    publicationsDetails.sort((a, b) => {
      if (a.issued_date_parts[0] == b.issued_date_parts[0]) return a.PMID.localeCompare(b.PMID);
      return a.issued_date_parts[0] < b.issued_date_parts[0] ? 1 : -1;
    });
  }

  if (publications?.length) {
    publications.forEach((pub) => {
      if (!pub.includes(PUBMED_URL)) noPubMed.push(pub);
    });
  }

  return { pubMed: publicationsDetails, noPubMed };
};

const PublicPublication = ({
  modalTitle,
  publications,
  publications_details,
}: PublicationProps): ReactElement => {
  const [openModal, setOpenModal] = useState(false);
  const publicationsSorted = getPublications({
    publications: publications,
    publications_details: publications_details,
  });
  const { pubMed, noPubMed } = publicationsSorted;

  if (!pubMed?.length && !noPubMed.length) return <>{TABLE_EMPTY_PLACE_HOLDER}</>;

  return (
    <>
      {!!pubMed?.length && <PubMed publication={pubMed[0]} isPublic={true} />}
      {!pubMed?.length && <NoPubMed publication={noPubMed[0]} />}
      {((!!pubMed?.length && pubMed?.length > 1) ||
        (!!noPubMed?.length && noPubMed.length > 1)) && (
        <div>
          <Button className={style.seeMore} type="link" onClick={() => setOpenModal(true)}>
            {intl.get('entities.study.publicationDetails.seeMore')}
          </Button>
        </div>
      )}
      {openModal && (
        <PubModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          title={modalTitle}
          pubMed={pubMed}
          noPubMed={noPubMed}
          isPublic={true}
        />
      )}
    </>
  );
};

export default PublicPublication;

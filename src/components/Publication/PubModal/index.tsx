import intl from 'react-intl-universal';
import { Button, List, Modal } from 'antd';
import cx from 'classnames';
import { ArrangerEdge } from 'graphql/models';
import { IPublicationDetails } from 'graphql/studies/models';

import NoPubMed from '../NoPubMed';
import PubMed from '../PubMed';

import style from './index.module.css';

interface IPubModalProps {
  isOpen: boolean;
  noPubMed?: string[];
  onClose: () => void;
  pubMed?: ArrangerEdge<IPublicationDetails>[];
  title?: string;
}

const PubModal = ({ isOpen, noPubMed, onClose, pubMed, title }: IPubModalProps) => (
  <Modal
    closable
    footer={
      <Button type="primary" onClick={onClose}>
        {intl.get('entities.study.publicationModal.close')}
      </Button>
    }
    onCancel={onClose}
    open={isOpen}
    title={`${title} ${intl.get('entities.study.publicationModal.title')}`}
    className={style.modalWrapper}
  >
    {!!pubMed?.length && (
      <List
        dataSource={pubMed}
        renderItem={(pub) => (
          <div className={style.pubMedWrapper}>
            <PubMed publication={pub.node} />
          </div>
        )}
      />
    )}
    {!!noPubMed?.length && (
      <List
        dataSource={noPubMed}
        renderItem={(noPub) => (
          <div className={cx(style.pubMedWrapper, pubMed?.length ? style.pubAndNoPub : undefined)}>
            <NoPubMed publication={noPub} />
          </div>
        )}
      />
    )}
  </Modal>
);

export default PubModal;

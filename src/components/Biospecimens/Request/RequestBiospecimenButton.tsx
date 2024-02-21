import { useState } from 'react';
import intl from 'react-intl-universal';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { Button, Tooltip } from 'antd';

import RequestBiospecimenLimitModal from './RequestBiospecimenLimitModal';
import RequestBiospecimenModal from './RequestBiospecimenModal';

interface OwnProps {
  nbBiospecimenSelected: number;
  disabled?: boolean;
  sqon?: ISqonGroupFilter;
  type?: 'default' | 'primary';
}

const RequestBiospecimenButton = ({
  disabled = false,
  nbBiospecimenSelected,
  type = 'default',
  sqon,
}: OwnProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLimitOpen, setIsLimitOpen] = useState<boolean>(false);

  return (
    <>
      <Tooltip
        title={disabled ? intl.get('screen.dataExploration.itemSelectionTooltip') : undefined}
      >
        <Button
          type={type}
          disabled={disabled}
          onClick={() => (nbBiospecimenSelected <= 10000 ? setIsOpen(true) : setIsLimitOpen(true))}
        >
          {intl.get('screen.dataExploration.tabs.biospecimens.request.buttonLabel')}
        </Button>
      </Tooltip>
      {isOpen && (
        <RequestBiospecimenModal isOpen={isOpen} closeModal={() => setIsOpen(false)} sqon={sqon} />
      )}
      {isLimitOpen && (
        <RequestBiospecimenLimitModal
          isOpen={isLimitOpen}
          closeModal={() => setIsLimitOpen(false)}
        />
      )}
    </>
  );
};

export default RequestBiospecimenButton;

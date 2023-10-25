import { useState } from 'react';
import intl from 'react-intl-universal';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { Button } from 'antd';

import RequestBiospecimenModal from './RequestBiospecimenModal';

interface OwnProps {
  biospecimenIds: string[];
  disabled?: boolean;
  sqon?: ISqonGroupFilter;
  type?: 'default' | 'primary';
}

const RequestBiospecimenButton = ({
  biospecimenIds,
  disabled = false,
  type = 'default',
  sqon,
}: OwnProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button type={type} disabled={disabled} onClick={() => setIsOpen(true)}>
        {intl.get('screen.dataExploration.tabs.biospecimens.request.buttonLabel')}
      </Button>
      {isOpen && (
        <RequestBiospecimenModal
          biospecimenIds={biospecimenIds}
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          sqon={sqon}
        />
      )}
    </>
  );
};

export default RequestBiospecimenButton;

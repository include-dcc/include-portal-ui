import { useState } from 'react';
import intl from 'react-intl-universal';
import { Button } from 'antd';

import RequestBiospecimenModal from './RequestBiospecimenModal';

interface OwnProps {
  biospecimenIds: string[];
  type?: 'default' | 'primary';
  disabled?: boolean;
}

const RequestBiospecimenButton = ({
  biospecimenIds,
  type = 'default',
  disabled = false,
}: OwnProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button type={type} disabled={disabled} onClick={() => setIsOpen(true)}>
        {intl.get('screen.dataExploration.tabs.biospecimens.request.buttonLabel')}
      </Button>
      <RequestBiospecimenModal
        biospecimenIds={biospecimenIds}
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );
};

export default RequestBiospecimenButton;

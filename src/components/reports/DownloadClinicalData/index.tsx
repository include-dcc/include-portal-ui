import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { DownloadOutlined } from '@ant-design/icons';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { Button, Tooltip } from 'antd';
import { generateSelectionSqon } from 'views/DataExploration/utils/selectionSqon';

import { ReportType } from 'services/api/reports/models';
import { fetchReport } from 'store/report/thunks';

interface OwnProps {
  participantIds?: string[];
  sqon?: ISqonGroupFilter;
  type?: 'default' | 'primary';
  disabled?: boolean;
  disabledTooltip?: string;
}

const DownloadClinicalData = ({
  participantIds = [],
  sqon,
  type = 'default',
  disabled = false,
  disabledTooltip,
}: OwnProps) => {
  const dispatch = useDispatch();
  const getCurrentSqon = (): any => sqon || generateSelectionSqon('participant_id', participantIds);

  let tooltipText = undefined;
  let disabledButton = false;

  if (disabled) {
    disabledButton = true;
    tooltipText = disabledTooltip;
  } else if (sqon) {
    disabledButton = false;
  }

  const handleOnClick = () =>
    dispatch(
      fetchReport({
        data: {
          sqon: getCurrentSqon(),
          name: ReportType.CLINICAL_DATA,
        },
      }),
    );

  return (
    <Tooltip title={tooltipText}>
      <Button
        type={type}
        icon={<DownloadOutlined />}
        disabled={disabledButton}
        onClick={handleOnClick}
      >
        {intl.get('api.report.clinicalData.download')}
      </Button>
    </Tooltip>
  );
};

export default DownloadClinicalData;

import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { DownloadOutlined } from '@ant-design/icons';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import { Button, Tooltip } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { TAB_IDS } from 'views/DataExploration/utils/constant';
import { generateSelectionSqon } from 'views/DataExploration/utils/selectionSqon';

import { ReportType } from 'services/api/reports/models';
import { fetchReport } from 'store/report/thunks';

interface OwnProps {
  biospecimenIds: string[];
  sqon?: ISqonGroupFilter;
  type?: 'default' | 'primary';
  disabled?: boolean;
  size?: SizeType;
}

const DownloadDataButton = ({
  biospecimenIds,
  sqon,
  type = 'default',
  disabled = false,
  size = undefined,
}: OwnProps) => {
  const dispatch = useDispatch();

  return (
    <Tooltip title={disabled ? intl.get('screen.dataExploration.itemSelectionTooltip') : undefined}>
      <Button
        type={type}
        icon={<DownloadOutlined />}
        disabled={disabled}
        onClick={() =>
          dispatch(
            fetchReport({
              data: {
                sqon: sqon || generateSelectionSqon(TAB_IDS.BIOSPECIMENS, biospecimenIds),
                name: ReportType.BIOSEPCIMEN_DATA,
              },
            }),
          )
        }
        size={size}
      >
        {intl.get('api.report.biospecimenData.download')}
      </Button>
    </Tooltip>
  );
};

export default DownloadDataButton;

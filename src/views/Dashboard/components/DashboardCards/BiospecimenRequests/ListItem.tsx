import { useState } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ListItemWithActions from '@ferlab/ui/core/components/List/ListItemWithActions';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { SET_ID_PREFIX } from '@ferlab/ui/core/data/sqon/types';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import { Modal } from 'antd';
import copy from 'copy-to-clipboard';
import { formatDistance } from 'date-fns';

import { SHARED_BIOSPECIMEN_REQUEST_ID_QUERY_PARAM_KEY } from 'components/Biospecimens/Request/requestBiospecimen.utils';
import { IUserSetOutput, SetType } from 'services/api/savedSet/models';
import { globalActions } from 'store/global';
import { getSetFieldId } from 'store/savedSet';
import { deleteSavedSet } from 'store/savedSet/thunks';
import { STATIC_ROUTES } from 'utils/routes';

import EditBiospecimenRequestModal from './EditBiospecimenRequestModal';

import styles from './index.module.scss';

interface OwnProps {
  data: IUserSetOutput;
  queryBuilderId: string;
}

const ListItem = ({ data, queryBuilderId }: OwnProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      <ListItemWithActions
        key={data.id}
        className={styles.biospecimenRequestListItem}
        onEdit={() => setIsOpen(true)}
        onDelete={() =>
          Modal.confirm({
            title: intl.get('screen.dashboard.cards.biospecimenRequest.popupConfirm.delete.title'),
            icon: <ExclamationCircleOutlined />,
            okText: intl.get(
              'screen.dashboard.cards.biospecimenRequest.popupConfirm.delete.okText',
            ),
            content: intl.get(
              'screen.dashboard.cards.biospecimenRequest.popupConfirm.delete.content',
            ),
            cancelText: intl.get(
              'screen.dashboard.cards.biospecimenRequest.popupConfirm.delete.cancelText',
            ),
            okButtonProps: { danger: true },
            onOk: () => dispatch(deleteSavedSet(data.id)),
          })
        }
        onShare={() => {
          try {
            copy(
              `${window.location.protocol}//${window.location.host}` +
                `${STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS}?${SHARED_BIOSPECIMEN_REQUEST_ID_QUERY_PARAM_KEY}=${data.id}`,
            );
            dispatch(
              globalActions.displayMessage({
                content: intl.get('screen.dashboard.cards.biospecimenRequest.shareLink.success'),
                type: 'success',
              }),
            );
          } catch (error) {
            dispatch(
              globalActions.displayMessage({
                content: intl.get('screen.dashboard.cards.biospecimenRequest.shareLink.error'),
                type: 'error',
              }),
            );
          }
        }}
        onClick={() => {
          history.push(STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS);

          const setValue = `${SET_ID_PREFIX}${data.id}`;
          addQuery({
            queryBuilderId: queryBuilderId,
            query: generateQuery({
              newFilters: [
                generateValueFilter({
                  field: getSetFieldId(SetType.BIOSPECIMEN),
                  value: [setValue],
                  index: SetType.BIOSPECIMEN,
                }),
              ],
            }),
            setAsActive: true,
          });
        }}
        title={data.tag}
        description={
          data.updated_date
            ? intl.get('screen.dashboard.cards.biospecimenRequest.lastSaved', {
                date: formatDistance(new Date(), new Date(data.updated_date)),
              })
            : undefined
        }
      />
      {isOpen && (
        <EditBiospecimenRequestModal
          hideModal={() => setIsOpen(false)}
          isOpen={isOpen}
          biospecimenRequest={data}
        />
      )}
    </>
  );
};

export default ListItem;

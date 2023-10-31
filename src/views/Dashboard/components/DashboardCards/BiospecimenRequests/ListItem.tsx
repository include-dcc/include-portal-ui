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
import { SavedSetApi } from 'services/api/savedSet';
import { IUserSetOutput, SetType } from 'services/api/savedSet/models';
import { globalActions } from 'store/global';
import { getSetFieldId } from 'store/savedSet';
import { deleteSavedSet } from 'store/savedSet/thunks';
import { STATIC_ROUTES } from 'utils/routes';

import EditBiospecimenRequestModal from './EditBiospecimenRequestModal';

import styles from './listItem.module.scss';

interface OwnProps {
  set: IUserSetOutput;
  queryBuilderId: string;
}

const ListItem = ({ set, queryBuilderId }: OwnProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      <ListItemWithActions
        key={set.id}
        onEdit={() => setIsEditOpen(true)}
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
            onOk: () => dispatch(deleteSavedSet(set.id)),
          })
        }
        onShare={() =>
          Modal.confirm({
            title: intl.get('screen.dashboard.cards.biospecimenRequest.shareModal.title'),
            okText: intl.get('screen.dashboard.cards.biospecimenRequest.shareModal.okText'),
            content: intl.get('screen.dashboard.cards.biospecimenRequest.shareModal.content'),
            cancelText: intl.get('screen.dashboard.cards.biospecimenRequest.shareModal.cancelText'),
            onOk: async () => {
              // call back to change sharedpublicly boolean
              const { data } = await SavedSetApi.shareById(set.id);
              if (data) {
                copy(
                  `${window.location.protocol}//${window.location.host}` +
                    `${STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS}?${SHARED_BIOSPECIMEN_REQUEST_ID_QUERY_PARAM_KEY}=${set.id}`,
                );
                dispatch(
                  globalActions.displayNotification({
                    type: 'success',
                    message: intl.get(
                      'screen.dashboard.cards.biospecimenRequest.shareLink.success.title',
                    ),
                    description: intl.get(
                      'screen.dashboard.cards.biospecimenRequest.shareLink.success.description',
                    ),
                  }),
                );
              } else {
                dispatch(
                  globalActions.displayNotification({
                    type: 'error',
                    message: intl.get(
                      'screen.dashboard.cards.biospecimenRequest.shareLink.error.title',
                    ),
                    description: intl.get(
                      'screen.dashboard.cards.biospecimenRequest.shareLink.error.description',
                    ),
                  }),
                );
              }
            },
          })
        }
        onClick={() => {
          history.push(STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS);

          const setValue = `${SET_ID_PREFIX}${set.id}`;
          addQuery({
            queryBuilderId: queryBuilderId,
            query: generateQuery({
              newFilters: [
                generateValueFilter({
                  field: getSetFieldId(SetType.BIOSPECIMEN_REQUEST),
                  value: [setValue],
                  index: SetType.BIOSPECIMEN,
                }),
              ],
            }),
            setAsActive: true,
          });
        }}
        title={set.tag}
        titleClassName={styles.title}
        description={
          set.updated_date
            ? intl.get('screen.dashboard.cards.biospecimenRequest.lastSaved', {
                date: formatDistance(new Date(), new Date(set.updated_date)),
              })
            : undefined
        }
      />
      {isEditOpen && (
        <EditBiospecimenRequestModal
          hideModal={() => setIsEditOpen(false)}
          isOpen={isEditOpen}
          biospecimenRequest={set}
        />
      )}
    </>
  );
};

export default ListItem;

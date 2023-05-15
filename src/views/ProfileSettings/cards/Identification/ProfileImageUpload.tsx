import { Fragment, useState } from 'react';
import intl from 'react-intl-universal';
import { Button, Modal, Space, Typography, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

import UserAvatar from 'components/UserAvatar';
import { useAppDispatch } from 'store';
import { useUser } from 'store/user';
import { updateUser } from 'store/user/thunks';

import styles from './index.module.scss';

const ProfileImageUpload = () => {
  const { userInfo } = useUser();
  const dispatch = useAppDispatch();
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleDeleteImage = () => {
    setDeleteModalVisible(false);
    dispatch(
      updateUser({
        data: {
          profile_image_key: null,
        },
      }),
    );
  };

  return (
    <Fragment>
      <Space direction="vertical" align="center">
        <UserAvatar imageKey={userInfo?.profile_image_key} size={120} />
        <ImgCrop
          rotate
          modalOk={intl.get('global.save')}
          modalTitle={intl.get('screen.profileSettings.cards.identification.editPhotoModalTitle')}
        >
          <Upload showUploadList={false} maxCount={1}></Upload>
        </ImgCrop>
        {userInfo?.profile_image_key && (
          <Button
            size="small"
            type="text"
            className={styles.removeImageButton}
            onClick={() => setDeleteModalVisible(true)}
          >
            {intl.get('screen.profileSettings.cards.identification.removePhotoButton')}
          </Button>
        )}
      </Space>
      <Modal
        visible={isDeleteModalVisible}
        title={intl.get('screen.profileSettings.cards.identification.removePhotoModalTitle')}
        okText={intl.get('screen.profileSettings.cards.identification.removePhotoModalButton')}
        onCancel={() => setDeleteModalVisible(false)}
        onOk={handleDeleteImage}
        okButtonProps={{ danger: true }}
      >
        <Space direction="vertical" align="center">
          <UserAvatar imageKey={userInfo?.profile_image_key} shape="square" size={120} />
          <div className={styles.deleteMessage}>
            <Typography.Text>
              {intl.get('screen.profileSettings.cards.identification.removePhotoModalMessage')}
            </Typography.Text>
          </div>
        </Space>
      </Modal>
    </Fragment>
  );
};

export default ProfileImageUpload;

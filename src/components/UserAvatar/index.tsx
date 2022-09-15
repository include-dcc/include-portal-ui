import cx from 'classnames';
import EnvironmentVariables from 'helpers/EnvVariables';

import { DEFAULT_GRAVATAR_PLACEHOLDER } from 'common/constants';
import { useUser } from 'store/user';

import styles from './index.module.scss';

const profileImageBaseUrl = EnvironmentVariables.configFor('PROFILE_IMAGE_BASE_URL');

interface OwnProps {
  size?: number;
  className?: string;
}

const UserAvatar = ({ size = 24, className }: OwnProps) => {
  const { userInfo } = useUser();

  if (userInfo?.profile_image_key) {
    return (
      <img
        className={cx(styles.userAvatar, className)}
        width={size}
        height={size}
        src={`${profileImageBaseUrl}/${userInfo?.profile_image_key}?v=${userInfo.updated_date}`}
      />
    );
  }

  return <img src={DEFAULT_GRAVATAR_PLACEHOLDER} />;
};

export default UserAvatar;

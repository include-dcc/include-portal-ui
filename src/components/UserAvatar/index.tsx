import cx from 'classnames';
import EnvironmentVariables from 'helpers/EnvVariables';

import { DEFAULT_GRAVATAR_PLACEHOLDER } from 'common/constants';
import { useUser } from 'store/user';

import styles from './index.module.scss';

const profileImageBaseUrl = EnvironmentVariables.configFor('PROFILE_IMAGE_BASE_URL');

interface OwnProps {
  size?: number;
  shape?: 'square' | 'round';
  className?: string;
  overrideImageKey?: string;
}

const UserAvatar = ({ size = 24, shape = 'round', overrideImageKey, className }: OwnProps) => {
  const { userInfo } = useUser();

  return (
    <img
      className={cx(shape === 'round' && styles.userAvatarRound, className)}
      width={size}
      height={size}
      src={
        userInfo?.profile_image_key
          ? `${profileImageBaseUrl}/${overrideImageKey ?? userInfo?.profile_image_key}?v=${
              userInfo.updated_date
            }`
          : DEFAULT_GRAVATAR_PLACEHOLDER
      }
    />
  );
};

export default UserAvatar;

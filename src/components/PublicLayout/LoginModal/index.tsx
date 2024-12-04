import intl from 'react-intl-universal';
import { CloseOutlined } from '@ant-design/icons';
import { useKeycloak } from '@react-keycloak/web';
import { Button, Modal, Space, Typography } from 'antd';

import { REDIRECT_URI_KEY } from 'common/constants';
import IncludeIcon from 'components/Icons/IncludeIcon';
import useQueryParams from 'hooks/useQueryParams';
import { STATIC_ROUTES } from 'utils/routes';

import style from './index.module.css';

const { Title } = Typography;

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { keycloak } = useKeycloak();
  const query = useQueryParams();

  const handleSignin = async () => {
    const url = keycloak.createLoginUrl({
      redirectUri: `${window.location.origin}/${
        query.get(REDIRECT_URI_KEY) || STATIC_ROUTES.STUDIES
      }`,
      locale: intl.getInitOptions().currentLocale,
    });
    window.location.assign(url);
  };

  return (
    <Modal
      closable
      closeIcon={
        <div className={style.closeBtn}>
          <CloseOutlined className={style.closeIcon} />
          {intl.get('screen.publicStudies.loginModal.close')}
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      className={style.modal}
    >
      <div className={style.contentWrapper}>
        <div className={style.titleWrapper}>
          <IncludeIcon height={56} />
          <Title className={style.title} level={2}>
            {intl.get('screen.publicStudies.loginModal.title')}
          </Title>
        </div>
        <div className={style.subtitle}>
          {intl.get('screen.publicStudies.loginModal.subtitleStart')}
          <span className={style.subtitleBlue}>
            {intl.get('screen.publicStudies.loginModal.subtitleBlue')}
          </span>
          {intl.get('screen.publicStudies.loginModal.subtitleEnd')}
        </div>
        <div className={style.description}>{intl.get('screen.publicStudies.loginModal.text')}</div>
        <Space size={8}>
          <Button type="primary" size="large" data-cy="Login" onClick={handleSignin}>
            {intl.get('screen.publicStudies.loginModal.login')}
          </Button>
          <Button ghost size="large" data-cy="Signup" onClick={handleSignin}>
            {intl.get('screen.publicStudies.loginModal.signup')}
          </Button>
        </Space>
      </div>
    </Modal>
  );
};

export default LoginModal;

import { useDispatch } from 'react-redux';
import { Button } from 'antd';

import { LANG } from 'common/constants';
import useFeatureToggle from 'hooks/useFeatureToggle';
import { globalActions, useLang } from 'store/global';

import LoginForm from './LoginForm';
import MondoChart from './MondoChart';

import styles from './index.module.css';

const FT_FLAG_SHOW_TRANSLATION_BTN = 'SHOW_TRANSLATION_BTN';

const TopBanner = () => {
  const dispatch = useDispatch();
  const lang = useLang();
  const targetLang = lang === LANG.EN ? LANG.ES : LANG.EN;
  const { isEnabled: isShowTranslationBtnEnabled } = useFeatureToggle(FT_FLAG_SHOW_TRANSLATION_BTN);
  return (
    <div className={styles.topBanner}>
      <div className={styles.contentContainer}>
        {isShowTranslationBtnEnabled && (
          <Button
            className={styles.language}
            type="ghost"
            onClick={() => dispatch(globalActions.changeLang(targetLang))}
          >
            {targetLang.toUpperCase()}
          </Button>
        )}
        <LoginForm />
        <MondoChart />
      </div>
    </div>
  );
};

export default TopBanner;

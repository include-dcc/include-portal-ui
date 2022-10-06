import intl from 'react-intl-universal';
import { useParams } from 'react-router-dom';
import { ExperimentOutlined } from '@ant-design/icons';
import SidebarMenu, { ISidebarMenuItem } from '@ferlab/ui/core/components/SidebarMenu';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';

import PageContent from './components/PageContent';
import { SCROLL_WRAPPER_ID, TAB_IDS } from './utils/constants';

import styles from 'views/Variants/index.module.scss';

const Variants = () => {
  const { tab } = useParams<{ tab: string }>(); // to sync filters with querybuilder
  //const variantMappingResults = useGetExtendedMappings('variant');

  const menuItems: ISidebarMenuItem[] = [
    {
      key: TAB_IDS.VARIANTS,
      title: intl.get('screen.variants.sidemenu.variant'),
      icon: <ExperimentOutlined className={styles.sideMenuIcon} />,
      panelContent: () => {},
    },
    {
      key: '2',
      title: intl.get('screen.variants.sidemenu.variant'),
      icon: <ExperimentOutlined className={styles.sideMenuIcon} />,
      panelContent: () => {},
    },
    {
      key: '3',
      title: intl.get('screen.variants.sidemenu.variant'),
      icon: <ExperimentOutlined className={styles.sideMenuIcon} />,
      panelContent: () => {},
    },
  ];

  return (
    <div className={styles.variantsLayout}>
      <SidebarMenu className={styles.sideMenu} menuItems={menuItems} />
      <ScrollContent id={SCROLL_WRAPPER_ID} className={styles.scrollContent}>
        <PageContent
          variantMapping={{
            data: [],
            loading: false,
          }}
          tabId={tab}
        />
      </ScrollContent>
    </div>
  );
};

export default Variants;

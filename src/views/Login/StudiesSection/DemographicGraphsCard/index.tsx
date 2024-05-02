import intl from 'react-intl-universal';
import PieChart from '@ferlab/ui/core/components/Charts/Pie';
import Empty from '@ferlab/ui/core/components/Empty';
import { ArrangerValues } from '@ferlab/ui/core/data/arranger/formatting';
import GridCard from '@ferlab/ui/core/view/v2/GridCard/index';
import { Col, Row, Typography } from 'antd';
import { isEmpty } from 'lodash';

import { getCommonColors } from 'common/charts';
import { useGlobals } from 'store/global';

import styles from './index.module.scss';

const colors = getCommonColors();
const { Title } = Typography;

const graphSetting = {
  margin: {
    top: 0,
    bottom: 8,
    left: 12,
    right: 12,
  },
};

const getChartData = (data: Record<string, number>): any[] =>
  Object.keys(data).map((key) => {
    const dataKey = key === ArrangerValues.missing ? 'No Data' : key;
    return {
      id: dataKey,
      label: dataKey,
      value: data[key],
    };
  });

const DemographicGraphsCard = () => {
  const { stats } = useGlobals();
  const { downSyndromeStatus = {}, race = {}, sex = {} } = stats || {};
  const downSyndromeStatusData = getChartData(downSyndromeStatus);
  const raceData = getChartData(race);
  const sexData = getChartData(sex);

  // To change tooltip
  downSyndromeStatusData.forEach((el) => {
    if (el.label === 'T21') el.id = 'Trisomy 21';
    if (el.label === 'D21') el.id = 'Disomy 21, euploid';
  });

  return (
    <GridCard
      wrapperClassName={styles.wrapper}
      className={styles.card}
      theme="shade"
      title={<Title level={4}>{intl.get('screen.loginPage.demographic.cardTitle')}</Title>}
      content={
        <div className={styles.cardContent}>
          <Row gutter={[12, 24]} className={styles.graphRowWrapper}>
            <Col xs={24} sm={20} md={12} lg={8} className={styles.colGraph}>
              {isEmpty(downSyndromeStatusData) ? (
                <Empty imageType="grid" />
              ) : (
                <PieChart
                  title={intl.get('screen.loginPage.demographic.downSyndromeStatusTitle')}
                  data={downSyndromeStatusData}
                  colors={colors}
                  wrapperClassname={styles.pieChartWrapper}
                  {...graphSetting}
                />
              )}
            </Col>
            <Col xs={24} sm={20} md={12} lg={8} className={styles.colGraph}>
              {isEmpty(sexData) ? (
                <Empty imageType="grid" />
              ) : (
                <PieChart
                  title={intl.get('screen.loginPage.demographic.sexTitle')}
                  data={sexData}
                  colors={colors}
                  wrapperClassname={styles.pieChartWrapper}
                  {...graphSetting}
                />
              )}
            </Col>
            <Col xs={24} sm={20} md={12} lg={8} className={styles.colGraph}>
              {isEmpty(raceData) ? (
                <Empty imageType="grid" />
              ) : (
                <PieChart
                  title={intl.get('screen.loginPage.demographic.raceTitle')}
                  data={raceData}
                  colors={colors}
                  wrapperClassname={styles.pieChartWrapper}
                  {...graphSetting}
                />
              )}
            </Col>
          </Row>
        </div>
      }
    />
  );
};

export default DemographicGraphsCard;

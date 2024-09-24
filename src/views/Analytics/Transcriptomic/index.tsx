import React, { useState } from 'react';
import intl from 'react-intl-universal';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Empty from '@ferlab/ui/core/components/Empty';
import { addQuery } from '@ferlab/ui/core/components/QueryBuilder/utils/useQueryBuilderState';
import { generateQuery, generateValueFilter } from '@ferlab/ui/core/data/sqon/utils';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Button, Divider, Select, Space, Typography } from 'antd';
import TranscriptomicDataset from 'views/Analytics/Transcriptomic/Dataset';
import TranscriptomicsScatterPlotCanvas from 'views/Analytics/Transcriptomic/ScatterPlotCanvas';
import TranscriptomicSearchByGene from 'views/Analytics/Transcriptomic/SearchByGene';
import TranscriptomicSearchBySample from 'views/Analytics/Transcriptomic/SearchBySample';
import TranscriptomicsSwarmPlot from 'views/Analytics/Transcriptomic/SwarmPlot';
import { DATA_EXPLORATION_QB_ID, SCROLL_WRAPPER_ID } from 'views/DataExploration/utils/constant';

import { useTranscriptomicsDiffGeneExp } from 'store/analytics';

import ExternalLinkIcon from '../../../components/Icons/ExternalLinkIcon';
import { INDEXES } from '../../../graphql/constants';
import { transcriptomicsSampleGeneExpSelector } from '../../../store/analytics/selector';
import { STATIC_ROUTES } from '../../../utils/routes';

import SideBar, { TTranscriptomicSideBarItem } from './SideBar';

import styles from './index.module.css';

const { Title } = Typography;

// TODO: will be used for the dynamic layer system

// enum Layers {
//   interactive,
//   select,
// }

const menuItems: () => TTranscriptomicSideBarItem[] = () => [
  {
    key: '1',
    title: intl.get('screen.analytics.transcriptomic.sidebar.statisticalCorrection'),
    content: (
      <Select value="bh_fdr" className={styles.sidebarSelect}>
        <Select.Option value="bh_fdr">
          {intl.get('screen.analytics.transcriptomic.sidebar.bhfdr')}
        </Select.Option>
      </Select>
    ),
  },
  {
    key: '2',
    title: intl.get('screen.analytics.transcriptomic.sidebar.statisticalTest'),
    content: (
      <Select value="linear_regression_model" className={styles.sidebarSelect}>
        <Select.Option value="linear_regression_model">
          {intl.get('screen.analytics.transcriptomic.sidebar.linearProgression')}
        </Select.Option>
      </Select>
    ),
  },
];

export const Transcriptomic = () => {
  // const facets = useTranscriptomicsFacets();
  const navigate = useNavigate();
  const diffGeneExp = useTranscriptomicsDiffGeneExp();
  const sampleGeneExp = useSelector(transcriptomicsSampleGeneExpSelector);
  const [selectedGeneIds, setSelectedGeneIds] = useState<string[]>([]);
  const [selectedSampleIds, setSelectedSampleIds] = useState<string[]>([]);

  const viewInExploration = () => {
    addQuery({
      queryBuilderId: DATA_EXPLORATION_QB_ID,
      query: generateQuery({
        newFilters: [
          generateValueFilter({
            field: 'sample_id',
            value: sampleGeneExp.data?.data ? sampleGeneExp.data?.data.map((x) => x.sample_id) : [],
            index: INDEXES.BIOSPECIMEN,
          }),
        ],
      }),
      setAsActive: true,
    });
    navigate(STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS);
  };

  // TODO: add activeLayer={activeLayer} to ScatterPlotCanvasChart, will be used for selectboxlayer
  // const [activeLayer, setActiveLayer] = useState<Layers>(Layers.interactive);

  return (
    <div className={styles.transcriptomicPage}>
      <SideBar className={styles.sideMenu} menuItems={menuItems()} />
      <ScrollContent id={SCROLL_WRAPPER_ID} className={styles.scrollContent}>
        <Space direction="vertical" size={16} className={styles.pageContent}>
          <div>
            <Title className={styles.title} level={4}>
              {intl.get('screen.analytics.transcriptomic.title')}
            </Title>
          </div>
          <TranscriptomicDataset />
          <GridCard
            className={styles.gridCard}
            contentClassName={styles.gridCardContent}
            content={
              <div>
                <div className={styles.header}>
                  <div className={styles.container}>
                    <TranscriptomicSearchByGene
                      options={diffGeneExp.data}
                      onSelectOptions={setSelectedGeneIds}
                      selectedOptionsIds={selectedGeneIds}
                    />
                  </div>
                  <div className={styles.vDivider} />
                  <div className={styles.container}>
                    <TranscriptomicSearchBySample
                      options={sampleGeneExp.data}
                      onSelectOptions={setSelectedSampleIds}
                      selectedOptionsIds={selectedSampleIds}
                      disabled={selectedGeneIds.length !== 1}
                    />
                  </div>
                </div>
                <Divider className={styles.hDivider} />
                <div className={styles.content}>
                  <div className={styles.chartContainer}>
                    <TranscriptomicsScatterPlotCanvas
                      selectedNodesId={selectedGeneIds}
                      setSelectedNodesId={setSelectedGeneIds}
                      data={diffGeneExp.data}
                      loading={diffGeneExp.loading}
                    />
                  </div>
                  <div className={styles.vDivider} />
                  <div className={styles.chartContainer}>
                    {selectedGeneIds.length !== 1 ? (
                      <Empty />
                    ) : (
                      <>
                        <TranscriptomicsSwarmPlot
                          diffGeneExpId={selectedGeneIds[0]}
                          sampleIds={selectedSampleIds}
                          setSampleIds={setSelectedSampleIds}
                        />
                        <div className={styles.explorationButtonContainer}>
                          <Button onClick={viewInExploration}>
                            {intl.get('global.viewInExploration')}
                            <ExternalLinkIcon />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            }
          />
        </Space>
      </ScrollContent>
    </div>
  );
};

export default Transcriptomic;

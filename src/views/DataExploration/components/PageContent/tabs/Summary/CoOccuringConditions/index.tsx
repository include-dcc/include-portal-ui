import { useEffect, useRef, useState } from 'react';
import intl from 'react-intl-universal';
import Empty from '@ferlab/ui/core/components/Empty';
import ResizableGridCard from '@ferlab/ui/core/layout/ResizableGridLayout/ResizableGridCard';
import { asSets, ISetLike, UpSetJS } from '@upsetjs/react';
import useParticipantResolvedSqon from 'graphql/participants/useParticipantResolvedSqon';
import { isEmpty, throttle } from 'lodash';
import { DATA_EXPLORATION_QB_ID } from 'views/DataExploration/utils/constant';

import { useCoOccuringConditions } from 'store/upset';
import { getResizableGridDictionary } from 'utils/translation';

import { CO_OCCURING_CONDITIONS_ID, UID } from '../utils/grid';

import styles from './index.module.css';

const ATTRIBUTE_ID = 'data-text';
const SETS_NAME_QUERY = '#upset text[class^="setTextStyle-upset"]';
const CS_QUERY = '#upset [data-upset="cs"]';
const INTERACTIVE_UPSET_QUERY = '#upset g[data-upset="sets"] g[class^="interactive-upset"]';

const computeUpsetTextSize = () => {
  const csNode = document.querySelector(CS_QUERY);
  if (!csNode) return;
  const interactiveNodes = document.querySelectorAll(INTERACTIVE_UPSET_QUERY);
  interactiveNodes.forEach((node: any) => {
    const nameNode = node.querySelector('text[class^="setTextStyle-upset"]');
    if (!nameNode) return;

    const csNodeTransform = csNode.getAttribute('transform');
    if (!csNodeTransform) return;
    const match = csNodeTransform.match(/translate\(([^,]+),/);
    if (!match) return;

    // compute ellipsis size with font
    nameNode.textContent = '…';
    const ellipsisWidth = nameNode.getBBox().width;

    // compute text available space
    const csNodeX = parseFloat(match[1]);
    const nameNodeX = parseFloat(nameNode.getAttribute('x'));
    const availableDisplayWidth = Math.floor(csNodeX - nameNodeX - ellipsisWidth);
    const text = nameNode.getAttribute(ATTRIBUTE_ID);
    nameNode.textContent = '';
    let isOverlapping = false;

    for (let i = 0; i < text.length; i++) {
      nameNode.textContent = text.substring(0, i);
      if (nameNode.getBBox().width > availableDisplayWidth) {
        nameNode.textContent = text.substring(0, i - 1) + '…';
        isOverlapping = true;
        break;
      }
    }

    if (!isOverlapping) {
      nameNode.textContent = text;
    }
  });
};

// https://upset.js.org/api/model/modules.html
const CoOccuringConditionsGraphCard = () => {
  const { sqon } = useParticipantResolvedSqon(DATA_EXPLORATION_QB_ID);
  const { data, loading } = useCoOccuringConditions(sqon, 10);
  const gridRef = useRef<any>(null);
  const [width, setWidth] = useState<number>(400);
  const [height, setHeight] = useState<number>(300);
  const [selection, setSelection] = useState<ISetLike<unknown> | null>(null);

  const sets = asSets(data);

  const throttleComputeUpsetTextSize = throttle(computeUpsetTextSize, 250);

  useEffect(() => {
    if (loading) return;
    if (isEmpty(data)) return;

    const textElements = document.querySelectorAll(SETS_NAME_QUERY);
    textElements.forEach((element: any) => {
      if (!element.getAttribute(ATTRIBUTE_ID)) {
        element.setAttribute(ATTRIBUTE_ID, element.textContent);
      }
    });

    throttleComputeUpsetTextSize();

    const gridObserver = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
      setHeight(entries[0].contentRect.height);
      throttleComputeUpsetTextSize();
    });
    gridObserver.observe(gridRef.current);

    return () => gridRef.current && gridObserver.unobserve(gridRef.current);
  }, [loading, data]);

  return (
    <ResizableGridCard
      gridUID={UID}
      id={CO_OCCURING_CONDITIONS_ID}
      theme="shade"
      loading={loading}
      loadingType="spinner"
      dictionary={getResizableGridDictionary()}
      headerTitle={intl.get('screen.dataExploration.tabs.summary.coOccuringConditions.title')}
      modalSettings={{
        width: 1000,
        height: 600,
      }}
      downloadSettings={{
        svg: false,
        png: true,
        tsv: false,
      }}
      modalContent={
        <>
          {isEmpty(data) ? (
            <Empty imageType="grid" size="large" noPadding />
          ) : (
            <div className={styles.wrapper}>
              <div ref={gridRef} className={styles.content}>
                <UpSetJS
                  setLabelAlignment={'left'}
                  sets={sets}
                  setName={intl.get(
                    'screen.dataExploration.tabs.summary.coOccuringConditions.label',
                  )}
                  combinationName={intl.get(
                    'screen.dataExploration.tabs.summary.coOccuringConditions.label',
                  )}
                  exportButtons={false}
                  selection={selection}
                  combinations={{
                    min: 2,
                    limit: 25,
                    type: 'distinctIntersection',
                  }}
                  widthRatios={[0.12249999999999998, 0.22749999999999998]}
                  heightRatios={[0.55]}
                  emptySelection={false}
                  width={900}
                  height={600}
                  onHover={(s) => setSelection(s)}
                />
              </div>
            </div>
          )}
        </>
      }
      content={
        <>
          {isEmpty(data) ? (
            <Empty imageType="grid" size="large" noPadding />
          ) : (
            <div className={styles.wrapper}>
              <div id="upset" ref={gridRef} className={styles.content}>
                <UpSetJS
                  setLabelAlignment={'left'}
                  sets={sets}
                  setName={intl.get(
                    'screen.dataExploration.tabs.summary.coOccuringConditions.label',
                  )}
                  combinationName={intl.get(
                    'screen.dataExploration.tabs.summary.coOccuringConditions.label',
                  )}
                  exportButtons={false}
                  selection={selection}
                  combinations={{
                    min: 2,
                    limit: 25,
                    type: 'distinctIntersection',
                  }}
                  widthRatios={[0.12249999999999998, 0.22749999999999998]}
                  heightRatios={[0.55]}
                  emptySelection={false}
                  width={width}
                  height={height}
                  onHover={(s) => setSelection(s)}
                />
              </div>
            </div>
          )}
        </>
      }
    />
  );
};

export default CoOccuringConditionsGraphCard;

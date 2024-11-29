import { useEffect, useMemo, useRef, useState } from 'react';
import intl from 'react-intl-universal';
import ResizableGridCard from '@ferlab/ui/core/layout/ResizableGridLayout/ResizableGridCard';
import { extractCombinations, ISetLike, UpSetJS } from '@upsetjs/react';

import { getResizableGridDictionary } from 'utils/translation';

import { UID } from '../utils/grid';

import mock from './mock';

import styles from './index.module.css';

// https://upset.js.org/api/model/modules.html
const CoOccuringConditionsGraphCard = () => {
  const ref = useRef<any>(null);
  const [width, setWidth] = useState<number>(100);
  const [height, setHeight] = useState<number>(100);
  const [selection, setSelection] = useState<ISetLike<unknown> | null>(null);

  const data = mock
    .map((m) => {
      const combination = m.Combination.split(', ');
      return {
        name: m.Combination,
        sets: combination,
      };
    })
    .filter((m) => m.sets.length > 1);

  const { sets, combinations } = useMemo(
    () =>
      extractCombinations(data, {
        setLimit: 8,
      }),
    [],
  );

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
      setHeight(entries[0].contentRect.height);
    });
    observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(
      '[class^="root-upset-"] text[class^="setTextStyle-upset"]',
    );
    elements.forEach((element: any) => {
      element.textContent = element.textContent.substring(0, 28) + '…';
    });
  }, []);

  return (
    <ResizableGridCard
      gridUID={UID}
      id="co-occurring-conditions"
      theme="shade"
      loading={false}
      loadingType="spinner"
      dictionary={getResizableGridDictionary()}
      headerTitle={intl.get('screen.dataExploration.tabs.summary.coOccuringConditions.title')}
      content={
        <div className={styles.wrapper}>
          <div ref={ref} className={styles.content}>
            <UpSetJS
              setLabelAlignment={'left'}
              sets={sets}
              exportButtons={false}
              selection={selection}
              combinations={combinations}
              emptySelection={false}
              width={width}
              height={height}
              onHover={(s) => setSelection(s)}
            />
          </div>
        </div>
      }
    />
  );
};

export default CoOccuringConditionsGraphCard;

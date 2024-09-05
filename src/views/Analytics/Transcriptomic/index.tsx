import { useState } from 'react';
import ScatterPlot from '@ferlab/ui/core/components/Charts/ScatterPlot';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { Space } from 'antd';

export const Transcriptomic = () => {
  console.log('TranscriptomicAnalysis'); //TODO: to remove
  // const [selectedNodes, setSelectedNodes] = useState<ScatterPlotNodeData<ScatterPlotDatum>[]>([]);
  return (
    <Space>
      <GridCard
        content={
          <div>
            {/* <ScatterPlot
              data={[]}
              height={400}
              width={400}
              layers={['grid', 'axes', 'nodes', 'markers', 'mesh', 'legends', 'annotations']}
              legends={[
                {
                  anchor: 'bottom',
                  direction: 'row',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemOpacity: 1,
                      },
                    },
                  ],
                  itemDirection: 'left-to-right',
                  itemHeight: 12,
                  itemsSpacing: 8,
                  itemWidth: 100,
                  justify: false,
                  symbolShape: 'circle',
                  symbolSize: 12,
                  translateX: 0,
                  translateY: 64,
                },
              ]}
            /> */}
          </div>
        }
      />
    </Space>
  );
};

export default Transcriptomic;

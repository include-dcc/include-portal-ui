import React, { memo, useMemo, useState } from 'react';
import SelectBox from '@ferlab/ui/core/components/Charts/Core/SelectBox';
import {
  SwarmPlotCustomLayerProps,
  SwarmRawDatum,
} from '@ferlab/ui/core/components/Charts/SwarmPlot/type';
import { getSVGRelativeMousePosition, useTheme } from '@ferlab/ui/core/components/Charts/utils';
import { animated, useSpring } from '@react-spring/web';

type TVector2 = {
  x: number;
  y: number;
};

export type TSelectBox = {
  width: number;
  height: number;
  origin: TVector2;
  transform: TVector2;
};

type TAnimatedCircle = {
  x: number;
  y: number;
  size: number;
};

export type TSwarmPlotSelectBoxLayer = SwarmPlotCustomLayerProps<SwarmRawDatum> & {
  active?: boolean;
  handleOnSelect: (nodes: SwarmRawDatum[]) => void;
  selectedNodes: SwarmRawDatum[];
  animate: boolean;
  setAnimate: (value: boolean) => void;
};

const AnimatedCircle = ({ size, x, y }: TAnimatedCircle): JSX.Element => {
  const theme = useTheme();
  const style = useMemo(
    () => ({
      ...theme.annotations.symbol,
    }),
    [theme.annotations.symbol],
  );

  return <animated.circle cx={x} cy={y} fill={style.fill} r={size / 2} style={style} />;
};

/**
 * ScatterPlot layer
 * Since zooming/data change re-draw the layer, we must keep track of selected nodes in parent
 *
 * @bug react-spring will cause compilation issue if we export this component to ferlab-ui
 *
 * @returns
 */
const SelectBoxSvgLayer = memo(
  ({
    active = false,
    animate,
    handleOnSelect,
    nodes,
    outerHeight,
    outerWidth,
    selectedNodes,
    setAnimate,
  }: TSwarmPlotSelectBoxLayer): React.ReactElement => {
    const [activeMouseCapture, setActiveMouseCapture] = useState<boolean>(false);
    const [origin, setOrigin] = useState<TVector2>({ x: 0, y: 0 });
    const [transform, setTransform] = useState<TVector2>({ x: 0, y: 0 });
    const [selectBoxNodes, setSelectBoxNodes] = useState<SwarmRawDatum[]>(selectedNodes);
    const springConfig = useSpring({
      delay: 375,
      from: { opacity: 0 },
      to: { opacity: 1 },
    });

    /**
     * Top-left corner of the rect svg is Vector(0,0) while Bottom-Right is (width, height)
     * Only check selection from left to right or right to left
     */
    const onSelect = useMemo(
      () => (origin: TVector2, transform: TVector2) => {
        // select from left to right
        let isInsideSelectBox = (origin: TVector2, transform: TVector2, point: TVector2): boolean =>
          point.x > origin.x &&
          point.x < transform.x &&
          point.y > origin.y &&
          point.y < transform.y;

        // select from right to left
        if (origin.x > transform.x) {
          isInsideSelectBox = (origin: TVector2, transform: TVector2, point: TVector2): boolean =>
            point.x < origin.x &&
            point.x > transform.x &&
            point.y > origin.y &&
            point.y < transform.y;
        }

        const newSelectedNodes = nodes.filter((node) =>
          isInsideSelectBox(origin, transform, { x: node.x, y: node.y }),
        );

        // highlight node
        // TODO: to update when select box is enabled, now works with isSelected property
        setSelectBoxNodes(newSelectedNodes.map((n) => ({ ...n, isSelected: true })));
      },
      [origin, transform],
    );

    if (!active) return <></>;

    return (
      <animated.g style={animate ? springConfig : {}} transform="translate(0,0)">
        <rect
          fill="rgba(0, 0, 0, 0)"
          height={outerHeight}
          onMouseDown={(event) => {
            setActiveMouseCapture(true);
            const position = getSVGRelativeMousePosition(event);
            setOrigin({ x: position.x, y: position.y });
            setAnimate(false);
          }}
          onMouseMove={(event) => {
            if (!activeMouseCapture) return;
            const position = getSVGRelativeMousePosition(event);
            setTransform({ x: position.x, y: position.y });
            onSelect(origin, transform);
          }}
          onMouseUp={() => {
            setActiveMouseCapture(false);
            handleOnSelect(selectBoxNodes);
          }}
          width={outerWidth}
        />
        {activeMouseCapture && (
          <SelectBox
            height={innerHeight}
            origin={origin}
            transform={transform}
            width={innerWidth}
          />
        )}
        {nodes.map((node) => {
          if (!selectBoxNodes.map((n) => n.id).includes(node.id)) return;
          return <AnimatedCircle {...node} />;
        })}
      </animated.g>
    );
  },
);

export default SelectBoxSvgLayer;

import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
import {RW} from '@theme/utils';
const CloseSvg = ({width = RW(18), height = RW(18), color = '#282828'}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 18 18">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeWidth={2}
      d="m1 1 16 16M17 1 1 17"
    />
  </Svg>
);
export default memo(CloseSvg);

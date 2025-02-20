import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
import {RH, RW} from '@theme/utils';
const CheckSvg = ({color = '#fff', width = RW(14), height = RH(13)}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 14 13">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeWidth={2}
      d="m1 7.5 3.148 3.542a1 1 0 0 0 1.574-.101L12.5 1"
    />
  </Svg>
);

export default memo(CheckSvg);

import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
const CheckSvg = ({color = '#E31335'}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={35}
    height={20}
    fill="none"
    viewBox="10 0 48 24">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeWidth={2}
      d="m31 12 2.793 2.793a1 1 0 0 0 1.414 0L41 9"
    />
  </Svg>
);
export default memo(CheckSvg);

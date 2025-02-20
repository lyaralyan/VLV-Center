import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
import {RH, RW} from '@theme/utils';
const PhoneSvg = ({width = RW(14), height = RH(14)}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 14 14">
    <Path
      fill="#E31335"
      d="m13.983 10.559-.657 2.758a.822.822 0 0 1-.82.683C5.61 13.973 0 8.374 0 1.492c0-.41.246-.737.657-.82L3.42.018a.882.882 0 0 1 .958.492l1.286 2.977c.137.355.055.764-.246.983L3.94 5.67a9.493 9.493 0 0 0 4.379 4.343l1.204-1.475c.218-.273.629-.382.985-.246l2.982 1.284c.356.19.575.6.493.983Z"
    />
  </Svg>
);
export default memo(PhoneSvg);

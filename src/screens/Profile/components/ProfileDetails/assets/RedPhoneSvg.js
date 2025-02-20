import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
const RedPhoneSvg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={15}
    fill="none"
    {...props}>
    <Path
      fill="#E31335"
      d="m13.983 11.059-.657 2.758a.822.822 0 0 1-.82.683C5.61 14.473 0 8.874 0 1.992c0-.41.246-.737.657-.82L3.42.518a.882.882 0 0 1 .958.492l1.286 2.977c.137.355.055.764-.246.983L3.94 6.17a9.493 9.493 0 0 0 4.379 4.343l1.204-1.475c.218-.273.629-.382.985-.246l2.982 1.284c.356.19.575.6.493.983Z"
    />
  </Svg>
);
export default memo(RedPhoneSvg);

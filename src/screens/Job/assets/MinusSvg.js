import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
const MinusSvg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={4}
    fill="none"
    {...props}>
    <Path stroke="#282828" strokeWidth={3} d="M18 2H0" />
  </Svg>
);
export default memo(MinusSvg);

import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
const MinusSvg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={2}
    fill="none"
    {...props}>
    <Path stroke="#282828" strokeWidth={0.767} d="M.777 1.165h12.776" />
  </Svg>
);
export default memo(MinusSvg);

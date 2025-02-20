import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
const RuFlagSvg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={11}
    fill="none"
    {...props}>
    <Path fill="#FF4B55" d="M0 0h18v11H0V0Z" />
    <Path fill="#41479B" d="M0 0h18v7.333H0V0Z" />
    <Path fill="#F5F5F5" d="M0 0h18v3.667H0V0Z" />
  </Svg>
);

export default memo(RuFlagSvg);

import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
import {RH, RW} from '@theme/utils';
const BackArrowSvg = ({width = RW(10), height = RH(18), color = '#282828'}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 10 18">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeWidth={2}
      d="M9 1 1.725 7.929a1 1 0 0 0-.034 1.414L9 17"
    />
  </Svg>
);

export default memo(BackArrowSvg);

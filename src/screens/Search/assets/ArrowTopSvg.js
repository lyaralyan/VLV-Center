import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
const ArrowTopSvg = ({color = '#282828', strokeWidth = 2}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={23}
    height={10}
    fill="none"
    viewBox="0 0 13 9">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeWidth={strokeWidth}
      d="M12 7.5 7 2 1.5 7.5"
    />
  </Svg>
);

export default memo(ArrowTopSvg);

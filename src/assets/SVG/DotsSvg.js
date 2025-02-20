import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
const DotsSvg = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={3}
    fill="none"
    viewBox="0 0 13 3">
    <Path
      fill="#282828"
      d="M3 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM8 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM13 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
    />
  </Svg>
);

export default memo(DotsSvg);

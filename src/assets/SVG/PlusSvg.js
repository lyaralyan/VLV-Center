import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
const PlusSvg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={14}
    fill="#fff"
    viewBox="0 0 13 14"
    {...props}>
    <Path
      stroke="rgba(0,0,0,0.4)"
      strokeWidth={1.5}
      d="M.203 7.165H12.98M6.59.777v12.776"
    />
  </Svg>
);
export default memo(PlusSvg);

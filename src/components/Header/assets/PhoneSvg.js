import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
const PhoneSvg = ({height = 24, width = 24}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24">
    <Path
      fill="#E31335"
      d="M10.316 13.694a.469.469 0 1 1-.937 0 .469.469 0 0 1 .937 0Z"
    />
    <Path
      stroke="#282828"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      d="M8.478 12.091c-.297-.39-.58-.794-.845-1.21-.348-.545-.243-1.269.215-1.727l1.591-1.591a.876.876 0 0 0 0-1.24L5.694 2.578a.876.876 0 0 0-1.24 0l-.948.948C1.968 5.064 1.552 7.41 2.518 9.36c1.718 3.469 5.253 8.785 12.064 12.125a5.113 5.113 0 0 0 5.853-.988l.97-.97a.877.877 0 0 0 0-1.24l-3.746-3.744a.876.876 0 0 0-1.24 0l-1.591 1.591c-.458.458-1.181.564-1.728.215a17.998 17.998 0 0 1-1.698-1.23"
    />
  </Svg>
);
export default memo(PhoneSvg);

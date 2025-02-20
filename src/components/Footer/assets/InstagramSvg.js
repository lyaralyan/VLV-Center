import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
const InstagramSvg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
    />
    <Path
      stroke="#000"
      strokeWidth={1.5}
      d="M3 16V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5Z"
    />
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m17.5 6.51.01-.011"
    />
  </Svg>
);

export default memo(InstagramSvg);

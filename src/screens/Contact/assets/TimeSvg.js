import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
const TimeSvg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}>
    <Path
      fill="#31BA5F"
      d="M7 14c-3.883 0-7-3.117-7-7 0-3.855 3.117-7 7-7 3.855 0 7 3.145 7 7 0 3.883-3.145 7-7 7Zm-.656-7c0 .219.11.438.273.547l2.625 1.75c.301.219.711.137.902-.164a.663.663 0 0 0-.164-.93L7.656 6.672v-3.39c0-.356-.3-.657-.683-.657-.356 0-.657.3-.657.656L6.344 7Z"
    />
  </Svg>
);
export default memo(TimeSvg);

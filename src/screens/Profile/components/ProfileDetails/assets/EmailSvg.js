import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
const EmailSvg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={15}
    fill="none"
    {...props}>
    <Path
      fill="#282828"
      fillOpacity={0.4}
      fillRule="evenodd"
      d="M10.336 10.563c-.809.62-1.899.62-2.707 0L0 4.582v7.584C0 13.479.984 14.5 2.25 14.5h13.5c1.23 0 2.25-1.02 2.25-2.333V4.583l-7.664 5.98Z"
      clipRule="evenodd"
    />
    <Path
      fill="#E31335"
      d="M16.313.5C17.227.5 18 1.302 18 2.25c0 .583-.281 1.094-.703 1.422L9.668 9.615c-.422.328-.95.328-1.371 0L.668 3.672C.246 3.344 0 2.833 0 2.25 0 1.302.738.5 1.688.5h14.624Z"
    />
  </Svg>
);
export default memo(EmailSvg);

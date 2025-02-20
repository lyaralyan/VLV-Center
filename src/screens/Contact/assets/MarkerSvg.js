import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
import {RH, RW} from '@theme/utils';
const MarkerSvg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={RW(18)}
    height={RH(18)}
    fill="none"
    viewBox="0 0 21 28"
    {...props}>
    <Path
      fill="#E31335"
      fillRule="evenodd"
      d="M9.653 27.354s10.606-10.918 10.606-16.64c0-5.722-4.477-10.36-10-10.36s-10 4.638-10 10.36c0 5.722 9.394 16.64 9.394 16.64Zm.606-14.786c1.726 0 3.125-1.44 3.125-3.214 0-1.776-1.4-3.215-3.125-3.215-1.726 0-3.125 1.44-3.125 3.215s1.4 3.214 3.125 3.214Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default memo(MarkerSvg);

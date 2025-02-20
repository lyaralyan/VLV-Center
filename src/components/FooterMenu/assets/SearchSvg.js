import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
import {RW, RH} from '@theme/utils';
const SearchSvg = ({active, color = '#282828'}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={RW(21)}
    height={RH(19)}
    fill="none"
    viewBox="0 0 21 19">
    <Path
      stroke={active ? '#E31335' : color}
      strokeWidth={2.067}
      d="m14.328 15.22 3.514 2.97"
    />
    <Path
      stroke={active ? '#E31335' : color}
      strokeWidth={1.824}
      d="M17.28 9.876c0 4.411-3.598 7.996-8.048 7.996s-8.048-3.585-8.048-7.996c0-4.411 3.598-7.996 8.048-7.996s8.049 3.585 8.049 7.996Z"
    />
    <Path
      fill="#F5F5F5"
      d="m18.69 17.3-6.47-5.445-2.988-.99 10.952.99-1.493 5.444Z"
    />
  </Svg>
);
export default memo(SearchSvg);

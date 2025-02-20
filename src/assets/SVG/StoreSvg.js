import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {memo} from 'react';
import {RH, RW} from '@theme/utils';
const StoreSvg = ({active = false, width = RW(17), height = RH(16)}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 17 16">
    <G fill={active ? 'rgb(227, 19, 53)' : '#fff'}>
      <Path d="M15.642 2.718A1.995 1.995 0 0 0 14.107 2H3.328L3.3 1.766A2 2 0 0 0 1.315 0h-.148a.667.667 0 1 0 0 1.333h.148a.667.667 0 0 1 .662.589l.917 7.8a3.333 3.333 0 0 0 3.31 2.945h6.963a.667.667 0 0 0 0-1.334H6.205A2 2 0 0 1 4.325 10h7.946a3.333 3.333 0 0 0 3.281-2.742l.523-2.903a1.995 1.995 0 0 0-.433-1.637Zm-.875 1.4-.524 2.903a2 2 0 0 1-1.972 1.646H4.113l-.628-5.334h10.622a.667.667 0 0 1 .66.786ZM5.167 16a1.333 1.333 0 1 0 0-2.667 1.333 1.333 0 0 0 0 2.667ZM11.833 16a1.333 1.333 0 1 0 0-2.667 1.333 1.333 0 0 0 0 2.667Z" />
    </G>
  </Svg>
);

export default memo(StoreSvg);

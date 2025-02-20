import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';
import {memo} from 'react';
const ExitSvg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={12}
    fill="none"
    {...props}>
    <G clipPath="url(#a)">
      <Path
        stroke="#282828"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.188 3.125v-1.25a1.25 1.25 0 0 0-1.25-1.25h-6a1.25 1.25 0 0 0-1.25 1.25v7.5a1.25 1.25 0 0 0 1.25 1.25h6a1.25 1.25 0 0 0 1.25-1.25v-1.25m2-5 2.5 2.5m0 0-2.5 2.5m2.5-2.5H5.155"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h15v12H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default memo(ExitSvg);

import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';
import {memo} from 'react';
const DeliverySvg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    {...props}>
    <G
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      clipPath="url(#a)">
      <Path d="M15.125 6.875h3.66a.687.687 0 0 1 .637.43l1.203 3.008M1.375 12.375h13.75M15.813 18.563a2.062 2.062 0 1 0 0-4.125 2.062 2.062 0 0 0 0 4.124ZM6.188 18.563a2.062 2.062 0 1 0 0-4.125 2.062 2.062 0 0 0 0 4.124ZM13.75 16.5h-5.5" />
      <Path d="M15.125 10.313h5.5v5.5a.687.687 0 0 1-.688.687h-2.062M4.125 16.5H2.062a.687.687 0 0 1-.687-.688V6.188a.688.688 0 0 1 .688-.688h13.062v9.055" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h22v22H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default memo(DeliverySvg);

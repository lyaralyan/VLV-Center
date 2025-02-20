import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';
import {memo} from 'react';
const WalletSvg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    {...props}>
    <G clipPath="url(#a)">
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3.438 5.5v11a1.375 1.375 0 0 0 1.374 1.375h13.75a.687.687 0 0 0 .688-.688V7.563a.687.687 0 0 0-.688-.687H4.813A1.375 1.375 0 0 1 3.438 5.5Zm0 0a1.375 1.375 0 0 1 1.374-1.375H16.5"
      />
      <Path
        fill="#000"
        d="M15.469 13.063a1.031 1.031 0 1 0 0-2.063 1.031 1.031 0 0 0 0 2.063Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h22v22H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default memo(WalletSvg);

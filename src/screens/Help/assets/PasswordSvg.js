import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';
import {memo} from 'react';
const PasswordSvg = props => (
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
        d="M17.875 7.563H4.125a.687.687 0 0 0-.688.687v9.625c0 .38.308.688.688.688h13.75c.38 0 .688-.308.688-.688V8.25a.687.687 0 0 0-.688-.688Z"
      />
      <Path
        fill="#000"
        d="M11 14.094a1.031 1.031 0 1 0 0-2.063 1.031 1.031 0 0 0 0 2.063Z"
      />
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7.563 7.563v-2.75a3.437 3.437 0 1 1 6.875 0v2.75"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h22v22H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default memo(PasswordSvg);

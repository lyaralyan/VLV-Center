import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';
import {memo} from 'react';
import {RW, RH} from '@theme/utils';

const ShopSvg = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={RW(20)}
    height={RH(20)}
    fill="none"
    viewBox="0 0 20 20">
    <G fill="#fff" clipPath="url(#a)">
      <Path d="M18.549 4.214a2.364 2.364 0 0 0-1.82-.85H3.958l-.034-.278A2.37 2.37 0 0 0 1.571.993h-.176a.79.79 0 1 0 0 1.58h.176a.79.79 0 0 1 .784.698l1.087 9.243a3.95 3.95 0 0 0 3.923 3.49h8.25a.79.79 0 1 0 0-1.58h-8.25a2.37 2.37 0 0 1-2.227-1.58h9.417a3.95 3.95 0 0 0 3.887-3.25l.62-3.44a2.366 2.366 0 0 0-.513-1.94Zm-1.037 1.66-.621 3.44a2.37 2.37 0 0 1-2.336 1.95H4.886l-.743-6.32H16.73a.79.79 0 0 1 .782.93ZM6.135 19.954a1.58 1.58 0 1 0 0-3.16 1.58 1.58 0 0 0 0 3.16ZM14.036 19.954a1.58 1.58 0 1 0 0-3.16 1.58 1.58 0 0 0 0 3.16Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.605.993h18.96v18.96H.605z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default memo(ShopSvg);

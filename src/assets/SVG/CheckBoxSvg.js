import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';
import {memo} from 'react';
import {RH, RW} from '@theme/utils';
const CheckBoxSvg = ({height = RH(18), width = RW(18)}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 18 18"
    fill="none">
    <G clipPath="url(#a)">
      <Path
        fill="#000"
        d="M2 .296a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9.814c0-.976-1.255-1.374-1.817-.576a1 1 0 0 0-.183.576v4.482a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4.498a2 2 0 0 1 2-2l4.151.002c.227 0 .449-.07.634-.2.88-.62.443-2.004-.633-2.004H2Zm14.849 1.84a1.224 1.224 0 0 0-1.6.114L13 4.5l-2.633 2.593a2 2 0 0 1-2.833-.026l-.738-.754a1.187 1.187 0 1 0-1.687 1.67l2.414 2.412a2 2 0 0 0 2.828 0l.972-.972 5.64-5.426a1.224 1.224 0 0 0-.114-1.86Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h18v18H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default memo(CheckBoxSvg);

import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';
import {memo} from 'react';
const FacebookSvg = ({style = {}}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={35}
    height={36}
    fill="none"
    viewBox="0 0 35 36"
    style={style}>
    <G clipPath="url(#a)">
      <Path
        fill="#1877F2"
        d="M35 18c0-9.941-7.835-18-17.5-18S0 8.059 0 18c0 8.984 6.4 16.43 14.766 17.781V23.203h-4.444V18h4.444v-3.966c0-4.511 2.612-7.003 6.61-7.003 1.914 0 3.917.352 3.917.352v4.43h-2.207c-2.174 0-2.852 1.387-2.852 2.81V18h4.854l-.776 5.203h-4.078v12.578C28.6 34.431 35 26.984 35 18Z"
      />
      <Path
        fill="#fff"
        d="M24.312 23.203 25.088 18h-4.854v-3.377c0-1.423.678-2.81 2.852-2.81h2.207v-4.43s-2.003-.352-3.917-.352c-3.998 0-6.61 2.492-6.61 7.003V18h-4.444v5.203h4.444v12.578a17.151 17.151 0 0 0 5.468 0V23.203h4.078Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h35v36H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default memo(FacebookSvg);

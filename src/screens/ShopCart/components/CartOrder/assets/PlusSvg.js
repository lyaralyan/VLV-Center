import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {memo} from 'react';
const PlusSvg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={21}
    fill="none"
    {...props}>
    <G fill="#fff" opacity={0.4}>
      <Path d="M9.759 0h2.561v20.484H9.759z" />
      <Path d="M.797 11.523V8.962H21.28v2.56z" />
    </G>
  </Svg>
);

export default memo(PlusSvg);

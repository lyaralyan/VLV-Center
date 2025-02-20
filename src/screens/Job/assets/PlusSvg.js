import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
const PlusSvg = props => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="none">
    <Path stroke="#282828" strokeWidth={3} d="M9 0v9m0 0v9m0-9h9M9 9H0" />
  </Svg>
);

export default memo(PlusSvg);

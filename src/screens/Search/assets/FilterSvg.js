import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
const FilterSvg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={23}
    fill="none"
    viewBox="0 0 24 23"
    {...props}>
    <Path
      fill="#fff"
      d="M13.986 18.573a.912.912 0 0 0 .22-.596V11.37c0-.231.088-.453.245-.622l8.374-9.008a.913.913 0 0 0-.669-1.535H1.801a.913.913 0 0 0-.678 1.525l8.13 9.02a.913.913 0 0 1 .236.612v9.973c0 .847 1.052 1.238 1.605.596l2.892-3.358Z"
    />
  </Svg>
);
export default memo(FilterSvg);

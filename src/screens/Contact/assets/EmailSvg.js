import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
import {RH, RW} from '@theme/utils';
const EmailSvg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={RW(18)}
    height={RH(18)}
    fill="none"
    viewBox="0 0 33 25"
    {...props}>
    <Path
      fill="#282828"
      fillOpacity={0.4}
      fillRule="evenodd"
      d="M19.087 17.604a4.031 4.031 0 0 1-4.812 0L.712 7.354v13c0 2.25 1.75 4 4 4h24c2.188 0 4-1.75 4-4v-13l-13.625 10.25Z"
      clipRule="evenodd"
    />
    <Path
      fill="#E31335"
      d="M29.712.354c1.625 0 3 1.375 3 3 0 1-.5 1.875-1.25 2.437L17.9 15.979c-.75.562-1.688.562-2.438 0L1.9 5.79C1.15 5.229.712 4.354.712 3.354a3 3 0 0 1 3-3h26Z"
    />
  </Svg>
);
export default memo(EmailSvg);

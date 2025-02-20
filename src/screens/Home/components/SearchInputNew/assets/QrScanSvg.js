import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
const QrScanSvg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}>
    <Path
      stroke="#282828"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M1.088 4.375V3.25A2.25 2.25 0 0 1 3.338 1h2.25M1.088 15.625v1.125A2.25 2.25 0 0 0 3.338 19h2.25M14.588 1h2.25a2.25 2.25 0 0 1 2.25 2.25v1.125M14.588 19h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.125M2.213 10h15.75"
    />
    <Path
      stroke="#282828"
      strokeLinecap="round"
      strokeWidth={0.5}
      d="M6.912 5.765h6.882M7.441 14.765h5.824"
    />
  </Svg>
);
export default memo(QrScanSvg);

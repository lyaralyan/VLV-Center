import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
const QRBorderSvg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={364}
    height={269}
    fill="none"
    {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1 51.042v-16.68c0-8.849 2.96-17.334 8.226-23.59C14.493 4.514 21.637 1 29.086 1h28.087M1 217.849v16.68c0 8.848 2.96 17.334 8.226 23.59 5.267 6.257 12.411 9.772 19.86 9.772h28.087M306.828 1h28.086c7.449 0 14.593 3.515 19.86 9.771 5.267 6.257 8.226 14.742 8.226 23.59v16.681M306.828 267.891h28.086c7.449 0 14.593-3.515 19.86-9.772 5.267-6.256 8.226-14.742 8.226-23.59v-16.68"
    />
  </Svg>
);
export default memo(QRBorderSvg);

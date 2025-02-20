import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
const BackArrowSvg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={13}
    viewBox="0 0 25 16"
    fill="none"
    {...props}>
    <Path
      fill="#000"
      fillOpacity={0.34}
      d="M.293 7.293a1 1 0 0 0 0 1.414l6.364 6.364a1 1 0 0 0 1.414-1.414L2.414 8l5.657-5.657A1 1 0 0 0 6.657.93L.293 7.293ZM25 7H1v2h24V7Z"
    />
  </Svg>
);

export default memo(BackArrowSvg);

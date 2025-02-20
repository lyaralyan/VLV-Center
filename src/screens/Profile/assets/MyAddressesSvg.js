import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
const MyAddressesSvg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={17}
    fill="none"
    {...props}>
    <Path
      stroke="#000"
      d="M.5 6.368c0 .704.24 1.496.584 2.285.35.797.826 1.633 1.343 2.438 1.033 1.61 2.251 3.135 3.002 4.032.544.65 1.57.65 2.113 0 .75-.896 1.975-2.42 3.016-4.03.52-.805 1-1.642 1.353-2.439.348-.789.589-1.58.589-2.286 0-3.2-2.709-5.758-6-5.758-3.322 0-6 2.56-6 5.758Zm7.333 0c0 .684-.58 1.253-1.333 1.253-.777 0-1.333-.564-1.333-1.253 0-.666.562-1.253 1.333-1.253.748 0 1.333.592 1.333 1.253Z"
    />
  </Svg>
);
export default memo(MyAddressesSvg);

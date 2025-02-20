import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
const EyeSvg = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 20 16">
    <Path
      fill="#838589"
      fillRule="evenodd"
      d="M10 .212c5.16 0 8.1 3.532 9.392 5.637a4.09 4.09 0 0 1 0 4.302C18.1 12.256 15.16 15.787 10 15.787c-5.16 0-8.1-3.531-9.392-5.636a4.09 4.09 0 0 1 0-4.302C1.9 3.744 4.84.212 10 .212Zm0 13.909c4.35 0 6.862-3.038 7.972-4.843a2.432 2.432 0 0 0 0-2.556C16.862 4.913 14.349 1.879 10 1.879c-4.35 0-6.862 3.038-7.972 4.843a2.432 2.432 0 0 0 0 2.556c1.11 1.805 3.623 4.843 7.972 4.843ZM7.685 4.535a4.167 4.167 0 1 1 4.63 6.93 4.167 4.167 0 0 1-4.63-6.93Zm.926 5.544A2.5 2.5 0 1 0 11.39 5.92 2.5 2.5 0 0 0 8.61 10.08Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default memo(EyeSvg);

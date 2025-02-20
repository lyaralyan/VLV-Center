import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
const MenuSvg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Path
      fill="#282828"
      fillRule="evenodd"
      d="M20.75 6a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75ZM20.75 12a.75.75 0 0 1-.75.75H10a.75.75 0 0 1 0-1.5h10a.75.75 0 0 1 .75.75Zm-14 0a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h2a.75.75 0 0 1 .75.75ZM20.75 18a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default memo(MenuSvg);

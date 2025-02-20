import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
const FavoritesSvg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={14}
    fill="none"
    {...props}>
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.078}
      d="M4.25.75C2.455.75 1 2.266 1 4.137c0 1.51.569 5.094 6.167 8.717a.617.617 0 0 0 .666 0C13.43 9.23 14 5.647 14 4.137 14 2.267 12.545.75 10.75.75S7.5 2.803 7.5 2.803 6.045.75 4.25.75Z"
    />
    <Path
      fill="#fff"
      d="m9.45 13.75-2.6-2.053 1.3-1.368 2.925 2.395L9.45 13.75Z"
    />
    <Path
      stroke="#000"
      strokeWidth={0.719}
      d="M10.1 3.145c.975.114 2.535.957.975 3.42"
    />
  </Svg>
);
export default memo(FavoritesSvg);

import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
import {memo} from 'react';
const ProfileDetailsSvg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={15}
    fill="none"
    {...props}>
    <Rect
      width={6.292}
      height={6.292}
      x={3.354}
      y={1.115}
      stroke="#282828"
      strokeWidth={1.508}
      rx={3.146}
    />
    <Rect
      width={11.492}
      height={3.692}
      x={0.754}
      y={9.781}
      stroke="#282828"
      strokeWidth={1.508}
      rx={1.846}
    />
    <Path
      fill="#fff"
      d="M6.13 14.638 2.6 14.49l.268-1.995 4.025.242-.763 1.902Z"
    />
  </Svg>
);
export default memo(ProfileDetailsSvg);

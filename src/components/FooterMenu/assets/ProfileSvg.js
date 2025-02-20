import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';
import {memo} from 'react';
import {RW, RH} from '@theme/utils';
const ProfileSvg = ({active}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={RW(17)}
    height={RH(18)}
    fill="none"
    viewBox="0 0 17 18">
    <Rect
      width={7.608}
      height={7.608}
      x={4.818}
      y={0.928}
      stroke={active ? '#E31335' : '#282828'}
      strokeWidth={1.824}
      rx={3.804}
    />
    <Rect
      width={13.896}
      height={4.464}
      x={1.674}
      y={11.408}
      stroke={active ? '#E31335' : '#282828'}
      strokeWidth={1.824}
      rx={2.232}
    />
    <Path
      fill="#F5F5F5"
      d="m8.174 17.281-4.268-.18.324-2.413 4.867.292-.923 2.301Z"
    />
  </Svg>
);
export default memo(ProfileSvg);

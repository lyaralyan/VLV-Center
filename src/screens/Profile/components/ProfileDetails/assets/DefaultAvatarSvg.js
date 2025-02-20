import * as React from 'react';
import Svg, {Circle, G, Path, Defs, ClipPath, Rect} from 'react-native-svg';
import {memo} from 'react';
const DefaultAvatarSvg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={66}
    height={66}
    fill="none"
    {...props}>
    <Circle cx={33} cy={33} r={33} fill="#000" fillOpacity={0.2} />
    <G fill="#282828" clipPath="url(#a)">
      <Path d="M32.676 31.706a10.353 10.353 0 1 0-10.353-10.353 10.363 10.363 0 0 0 10.353 10.353Zm0-17.255a6.902 6.902 0 1 1 0 13.804 6.902 6.902 0 0 1 0-13.804ZM32.677 36.883c-4.804.005-9.409 1.725-12.805 4.781-3.397 3.057-5.308 7.202-5.313 11.525 0 .48.212.941.59 1.281.377.34.89.53 1.423.53.534 0 1.046-.19 1.424-.53.377-.34.59-.8.59-1.28 0-3.364 1.484-6.59 4.127-8.969 2.642-2.378 6.226-3.714 9.964-3.714 3.737 0 7.321 1.336 9.964 3.714 2.642 2.379 4.127 5.605 4.127 8.968 0 .48.212.941.59 1.281.377.34.89.53 1.423.53.534 0 1.046-.19 1.424-.53.377-.34.59-.8.59-1.28-.006-4.324-1.917-8.469-5.313-11.526-3.397-3.056-8.002-4.776-12.805-4.78Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Rect width={44} height={44} x={11} y={11} fill="#fff" rx={5} />
      </ClipPath>
    </Defs>
  </Svg>
);
export default memo(DefaultAvatarSvg);

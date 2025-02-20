import * as React from 'react';
import Svg, {G, Rect, Defs, ClipPath, Path} from 'react-native-svg';
import {memo} from 'react';
const ComparisonListSvg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={14}
    fill="none"
    {...props}>
    <G fill="#282828" clipPath="url(#a)">
      <Rect width={1.368} height={7.526} x={0.65} y={5.834} rx={0.684} />
      <Rect width={1.368} height={13} x={3.968} y={0.36} rx={0.684} />
      <Rect width={1.368} height={8.895} x={7.287} y={4.465} rx={0.684} />
      <Rect width={1.368} height={10.263} x={10.605} y={3.097} rx={0.684} />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 .36h13v13H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default memo(ComparisonListSvg);

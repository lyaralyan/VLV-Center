import * as React from 'react';
import Svg, {G, Rect, Path, Defs, RadialGradient, Stop} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */
import {memo} from 'react';
import {RH, RW} from '@theme/utils';
const GiftSvg = ({width = RW(37), height = RH(37), ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="-5 -10 37 37"
    {...props}>
    <G filter="url(#a)">
      <Rect width={27} height={27} x={5} y={1} fill="url(#b)" rx={5} />
    </G>
    <Path
      fill="#fff"
      d="m18.5 9.846 1.069-1.688c.422-.653 1.181-1.061 1.997-1.061h.084c1.238 0 2.25.98 2.25 2.177 0 .517-.169.953-.45 1.306h.9c.731 0 1.35.6 1.35 1.307v1.742c0 .571-.394 1.061-.9 1.252v4.41c0 .979-.816 1.741-1.8 1.741h-9c-1.012 0-1.8-.762-1.8-1.742v-4.41a1.33 1.33 0 0 1-.9-1.251v-1.742c0-.708.59-1.307 1.35-1.307h.872c-.281-.353-.422-.789-.422-1.306 0-1.198.984-2.177 2.25-2.177h.056c.816 0 1.575.408 1.997 1.061L18.5 9.846Zm3.066-1.878c-.507 0-.957.272-1.238.653l-1.265 1.96h2.587c.731 0 1.35-.572 1.35-1.307 0-.708-.619-1.306-1.35-1.306h-.084Zm-3.657 2.612-1.265-1.96c-.281-.38-.731-.652-1.238-.652h-.056c-.76 0-1.35.598-1.35 1.306 0 .735.59 1.306 1.35 1.306h2.56Zm-5.259.871a.455.455 0 0 0-.45.436v1.742c0 .245.197.435.45.435h5.4v-2.613h-5.4Zm6.3 2.613h5.4c.225 0 .45-.19.45-.435v-1.742c0-.218-.225-.436-.45-.436h-5.4v2.613Zm-.9.871H13.1v4.355c0 .49.394.871.9.871h4.05v-5.226Zm.9 5.226H23c.478 0 .9-.381.9-.87v-4.356h-4.95v5.226Z"
    />
    <Defs>
      <RadialGradient
        id="b"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="rotate(-131.846 21.161 6.817) scale(35.0754 34.0845)"
        gradientUnits="userSpaceOnUse">
        <Stop offset={0.005} stopColor="#AF001D" />
        <Stop offset={1} stopColor="#E31335" />
      </RadialGradient>
    </Defs>
  </Svg>
);
export default memo(GiftSvg);

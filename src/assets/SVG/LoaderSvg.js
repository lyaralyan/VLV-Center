// @assets/SVG/LoaderSvg.js
import React from 'react';
import Svg, {Circle} from 'react-native-svg';

const LoaderSvg = ({size = 100, color = 'red'}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Circle
      cx="50"
      cy="50"
      r="45"
      stroke={color}
      strokeWidth="10"
      strokeLinecap="round"
      strokeDasharray="283"
      strokeDashoffset="75"
    />
  </Svg>
);

export default LoaderSvg;

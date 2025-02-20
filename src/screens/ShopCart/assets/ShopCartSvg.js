import * as React from 'react';
import Svg, {Path, Defs, RadialGradient, Stop} from 'react-native-svg';
import {memo} from 'react';
const ShopCartSvg = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={117} height={106} fill="none">
    <Path
      fill="#444"
      d="M46.738 2.597 23.759 28.334c-1.28 1.434-1.398 3.855-.262 5.407s3.094 1.647 4.375.213L50.85 8.217c1.281-1.434 1.399-3.855.263-5.407-1.136-1.552-3.094-1.647-4.375-.213ZM70.754 2.597l22.978 25.737c1.28 1.434 1.398 3.855.262 5.407-1.135 1.552-3.094 1.647-4.375.213L66.641 8.217c-1.281-1.434-1.399-3.855-.263-5.407 1.136-1.552 3.095-1.647 4.376-.213Z"
    />
    <Path
      fill="url(#a)"
      d="M110.92 27.159H6.028a6.028 6.028 0 1 0 0 12.056H110.92a6.028 6.028 0 0 0 0-12.056Z"
    />
    <Path
      fill="url(#b)"
      d="M7.005 49.38c-1.052-3.23 1.356-6.548 4.755-6.548h93.604c3.347 0 5.749 3.224 4.791 6.43l-15.732 52.695a5 5 0 0 1-4.791 3.569h-60.71a5 5 0 0 1-4.754-3.451L7.005 49.381Z"
    />
    <Path
      stroke="#fff"
      strokeWidth={7}
      d="m43.403 59.711 30.142 30.142m0-30.142L43.403 89.853"
    />
    <Defs>
      <RadialGradient
        id="a"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(-19.49136 4.74031 -3.029 -12.45476 77.466 30.508)"
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#FF616A" />
        <Stop offset={1} stopColor="#E31335" />
      </RadialGradient>
      <RadialGradient
        id="b"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(-17.86709 24.64889 -32.59557 -23.62735 75.883 60.247)"
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#FF616A" />
        <Stop offset={1} stopColor="#E31335" />
      </RadialGradient>
    </Defs>
  </Svg>
);
export default memo(ShopCartSvg);

import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
const RotateSvg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={42}
    height={42}
    fill="none"
    {...props}>
    <Path
      fill="#E31335"
      d="M32.156 28.875h3.984A17.063 17.063 0 0 1 3.937 21H1.313a19.687 19.687 0 0 0 36.75 9.804v3.977h2.624V26.25h-8.53v2.625ZM9.844 13.125H5.86A17.063 17.063 0 0 1 38.063 21h2.624a19.687 19.687 0 0 0-36.75-9.804V7.219H1.313v8.531h8.53v-2.625Z"
    />
  </Svg>
);
export default memo(RotateSvg);

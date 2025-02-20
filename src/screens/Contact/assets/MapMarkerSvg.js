import * as React from 'react';
import Svg, {Ellipse, Path} from 'react-native-svg';
import {memo} from 'react';
const MapMarkerSvg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={54}
    height={79}
    fill="none"
    {...props}>
    <Ellipse cx={26.825} cy={27.413} fill="#E31335" rx={26.654} ry={26.608} />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="m4.947 19.91 4.835 7.942 4.811 7.902h6.916V19.868h-4.378l-.004 3.872-.005 3.872-2.135-3.866-2.135-3.866-3.965-.006c-3.84-.006-3.963-.005-3.94.036Zm18.01 7.9v7.944h15.93l.857-1.422.858-1.422-5.066-.006-5.067-.006v-13.03h-7.513v7.943Zm9.219-2.276v5.665l4.827-.006 4.827-.006 3.437-5.649c1.89-3.107 3.438-5.654 3.438-5.66 0-.005-1.78-.01-3.957-.01h-3.956l-2.087 3.9-2.086 3.9-.005-3.9-.005-3.9h-4.433v5.666Z"
      clipRule="evenodd"
    />
    <Ellipse cx={27.223} cy={75.466} fill="#E31335" rx={3.183} ry={3.177} />
    <Path
      stroke="#E31335"
      strokeLinecap="round"
      strokeWidth={1.591}
      d="M27.223 57.992v10.326"
    />
  </Svg>
);
export default memo(MapMarkerSvg);

import * as React from 'react';
import Svg, {G, Path, Defs} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */
import {memo} from 'react';
const MyProfileSvg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}>
    <G filter="url(#a)">
      <G filter="url(#b)">
        <G filter="url(#c)">
          <Path
            fill="#282828"
            d="M5.42.361A1.662 1.662 0 0 1 6.46 0c.38 0 .748.128 1.039.361l4.845 3.89c.18.145.325.325.424.53.1.203.151.425.152.65v6.46c0 .273-.114.535-.316.727a1.103 1.103 0 0 1-.761.302h-2.96c-.286 0-.56-.109-.762-.302a1.005 1.005 0 0 1-.315-.726V8.294H5.114v3.598c0 .272-.113.534-.315.726a1.103 1.103 0 0 1-.762.302h-2.96c-.286 0-.56-.109-.762-.302A1.005 1.005 0 0 1 0 11.892V5.43c0-.225.052-.447.151-.651.1-.204.245-.385.425-.53L5.421.36v.001Zm1.386.787a.554.554 0 0 0-.693 0l-4.845 3.89a.517.517 0 0 0-.191.393v6.46h2.96V8.293c0-.272.114-.534.316-.726.202-.193.475-.302.761-.302h2.692c.285 0 .559.109.76.302.203.192.316.454.316.726v3.598h2.96v-6.46a.494.494 0 0 0-.19-.394l-4.846-3.89Z"
          />
          <Path
            fill="#fff"
            d="m12.564 13.35-2.296-1.813 1.148-1.21L14 12.444l-1.436.907Z"
          />
        </G>
      </G>
    </G>
    <Defs></Defs>
  </Svg>
);
export default memo(MyProfileSvg);

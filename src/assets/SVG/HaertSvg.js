import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
import {RW, RH} from '@theme/utils';
const HaertSvg = ({active, height = 19, width = 19}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={RW(width)}
    height={RH(height)}
    fill="none"
    viewBox="0 0 19 18">
    <Path
      stroke={active ? '#E31335' : '#282828'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.824}
      d="M5.2 1.016c-2.315 0-4.192 1.956-4.192 4.369 0 1.947.734 6.57 7.955 11.243a.795.795 0 0 0 .858 0c7.222-4.673 7.955-9.296 7.955-11.244 0-2.412-1.877-4.368-4.192-4.368-2.315 0-4.192 2.648-4.192 2.648S7.515 1.016 5.2 1.016Z"
    />
    <Path
      fill="#F5F5F5"
      d="m11.907 17.784-3.354-2.648 1.677-1.765 3.773 3.09-2.096 1.323Z"
    />
    <Path
      stroke={active ? '#E31335' : '#282828'}
      strokeWidth={1.216}
      d="M12.745 4.105c1.258.147 3.27 1.235 1.258 4.412"
    />
  </Svg>
);
export default memo(HaertSvg);

import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
import Colors from '@theme/colors';
const ComapreSvg = ({active}) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="none">
    <Path
      fill={active ? Colors.red : '#282828'}
      fillRule="evenodd"
      d="M5.4.9a.9.9 0 1 1 1.8 0v10.8a.9.9 0 1 1-1.8 0V.9ZM.9 8.526a.947.947 0 0 1 1.895 0v8.527a.947.947 0 0 1-1.895 0V8.526ZM6.3 13.5a.9.9 0 0 0-.9.9v2.7a.9.9 0 1 0 1.8 0v-2.7a.9.9 0 0 0-.9-.9Zm3.79-6.869a.947.947 0 1 1 1.894 0v10.421a.947.947 0 0 1-1.895 0V6.632ZM15.63 3.79a.947.947 0 0 0-.947.947v12.316a.947.947 0 1 0 1.895 0V4.736a.947.947 0 0 0-.948-.947Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default memo(ComapreSvg);

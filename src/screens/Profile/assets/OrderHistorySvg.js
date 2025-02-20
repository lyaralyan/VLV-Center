import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';
import {memo} from 'react';
const OrderHistorySvg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={13}
    fill="none"
    {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#282828"
        d="M12.303 2.208a1.621 1.621 0 0 0-1.248-.583H2.298l-.023-.19A1.625 1.625 0 0 0 .662 0h-.12a.542.542 0 1 0 0 1.083h.12a.542.542 0 0 1 .538.479l.745 6.337a2.708 2.708 0 0 0 2.69 2.393h5.657a.542.542 0 0 0 0-1.084H4.635a1.625 1.625 0 0 1-1.527-1.083h6.456a2.708 2.708 0 0 0 2.666-2.228l.425-2.358a1.622 1.622 0 0 0-.352-1.33Zm-.711 1.138-.426 2.359a1.624 1.624 0 0 1-1.602 1.337H2.935l-.51-4.334h8.63a.542.542 0 0 1 .537.638Z"
      />
      <Path
        fill="#fff"
        d="m12.169 7.83-2.3-1.816 1.15-1.21 2.587 2.118-1.437.908Z"
      />
      <Path
        fill="#282828"
        d="M3.792 13a1.083 1.083 0 1 0 0-2.167 1.083 1.083 0 0 0 0 2.167ZM9.208 13a1.083 1.083 0 1 0 0-2.167 1.083 1.083 0 0 0 0 2.167Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h13v13H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default memo(OrderHistorySvg);

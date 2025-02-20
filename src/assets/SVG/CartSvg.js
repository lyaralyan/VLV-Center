import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';
import {memo} from 'react';
const CartSvg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={12}
    fill="none"
    {...props}>
    <G fill="#fff" clipPath="url(#a)">
      <Path d="M11.117 2.622a1.339 1.339 0 0 0-1.03-.482h-7.23l-.019-.157A1.341 1.341 0 0 0 1.507.8h-.1a.447.447 0 1 0 0 .894h.1a.447.447 0 0 1 .444.395l.615 5.232a2.236 2.236 0 0 0 2.22 1.975h4.67a.447.447 0 1 0 0-.894h-4.67a1.342 1.342 0 0 1-1.26-.895h5.33a2.236 2.236 0 0 0 2.2-1.839l.352-1.947a1.34 1.34 0 0 0-.291-1.098Zm-.587.94-.352 1.946a1.342 1.342 0 0 1-1.322 1.104H3.383l-.42-3.577h7.124a.447.447 0 0 1 .443.526ZM4.09 11.531a.894.894 0 1 0 0-1.788.894.894 0 0 0 0 1.788ZM8.562 11.531a.894.894 0 1 0 0-1.788.894.894 0 0 0 0 1.788Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.96.799h10.732V11.53H.96z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default memo(CartSvg);

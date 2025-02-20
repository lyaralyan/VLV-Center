import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const ArmFlagSvg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={11}
    fill="none"
    viewBox="0 0 18 11"
    {...props}>
    <Path fill="#FFBD00" d="M0 0h18v11H0V0Z" />
    <Path fill="#1700B3" d="M0 0h18v7.333H0V0Z" />
    <Path fill="#FF1E00" d="M0 0h18v3.667H0V0Z" />
  </Svg>
);
export default React.memo(ArmFlagSvg);

import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
const CloseEyeSvg = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 20 16">
    <Path
      fill="#838589"
      d="M19.392 7.849a13.222 13.222 0 0 0-2.809-3.257l2.334-2.334a.833.833 0 0 0-1.179-1.178l-2.537 2.54A10.045 10.045 0 0 0 10 2.213c-5.16 0-8.1 3.532-9.392 5.637a4.09 4.09 0 0 0 0 4.302 13.221 13.221 0 0 0 2.809 3.257l-2.334 2.333a.834.834 0 1 0 1.179 1.179l2.543-2.544A10.045 10.045 0 0 0 10 17.788c5.16 0 8.1-3.531 9.392-5.636a4.09 4.09 0 0 0 0-4.302Zm-17.364 3.43a2.432 2.432 0 0 1 0-2.557C3.139 6.917 5.652 3.879 10 3.879a8.417 8.417 0 0 1 3.972.97l-1.678 1.678a4.16 4.16 0 0 0-5.766 5.767l-1.925 1.925a11.435 11.435 0 0 1-2.575-2.94ZM12.5 9.998a2.5 2.5 0 0 1-2.5 2.5 2.46 2.46 0 0 1-1.07-.25l3.32-3.32c.163.334.249.7.25 1.07Zm-5 0A2.5 2.5 0 0 1 10 7.5a2.46 2.46 0 0 1 1.07.25l-3.32 3.322A2.46 2.46 0 0 1 7.5 10Zm10.473 1.28C16.86 13.082 14.348 16.12 10 16.12a8.416 8.416 0 0 1-3.972-.971l1.678-1.678a4.16 4.16 0 0 0 5.766-5.766l1.926-1.925c1.02.825 1.891 1.82 2.575 2.94a2.432 2.432 0 0 1 0 2.557Z"
    />
  </Svg>
);

export default memo(CloseEyeSvg);

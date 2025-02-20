import * as React from 'react';
import Svg, {G, Mask, Path, Defs, ClipPath} from 'react-native-svg';
import {memo} from 'react';
const OnlineCreditSvg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}>
    <G clipPath="url(#a)">
      <Mask
        id="b"
        width={20}
        height={20}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'luminance',
        }}>
        <Path fill="#fff" d="M20 0H0v20h20V0Z" />
      </Mask>
      <G fill="#E31335" mask="url(#b)">
        <Path d="M19.08 18.173H.907a.92.92 0 0 0-.907.92C0 19.6.413 20 .907 20H19.08a.908.908 0 0 0 0-1.813v-.014ZM2.04 15.813a.908.908 0 0 0-.907.907c0 .493.414.907.907.907h15.907a.908.908 0 0 0 .906-.907.916.916 0 0 0-.906-.907h-.227V7.64h.227a.45.45 0 0 0 .453-.453.45.45 0 0 0-.453-.454H2.04a.45.45 0 0 0-.453.454c0 .253.2.453.453.453h.227v8.173H2.04ZM15.907 7.64v8.173h-2.72V7.64h2.72Zm-4.547 0v8.173H8.64V7.64h2.72Zm-7.267 0h2.72v8.173h-2.72V7.64ZM.907 5.907h18.186A.908.908 0 0 0 20 5c0-.4-.253-.733-.613-.853L10.373.08a.911.911 0 0 0-.746 0L.533 4.173c-.386.174-.6.6-.506 1.014.093.413.453.72.893.72H.907Z" />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default memo(OnlineCreditSvg);

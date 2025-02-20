import {Platform, PixelRatio, Dimensions} from 'react-native';
import Colors from './colors';
const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');
const RatioH = SCREEN_HEIGHT / 852;
const RatioW = SCREEN_WIDTH / 393;
export const RW = value => RatioW * value;
export const RH = value => RatioH * value;

export const normalizePixel = size => {
  const newSize = size * RatioH;

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }

  if (size > 12) {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }

  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const getFontFamily = fontFamily => {
  switch (fontFamily) {
    case 'bold':
      return 'Mardoto-Bold';
    case 'medium':
      return 'Mardoto-Medium';
    case 'regular':
      return 'Mardoto-Regular';
  }
};

export const font = (
  fontFamily,
  fontSize = undefined,
  color = Colors.black,
  lineHeight = undefined,
) => {
  const fontStyle = {
    fontFamily: getFontFamily(fontFamily),
  };
  if (fontSize !== undefined) {
    fontStyle.fontSize = normalizePixel(fontSize);
  }
  if (color !== undefined) {
    fontStyle.color = color;
  }
  if (lineHeight !== undefined) {
    fontStyle.lineHeight = normalizePixel(lineHeight);
  }

  return fontStyle;
};

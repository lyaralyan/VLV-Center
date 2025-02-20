import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Colors from '../../theme/colors';
import {RH} from '../../theme/utils';
import {font} from '@theme/utils';

const Button = ({
  text = 'Button',
  onPress = () => {},
  red = true,
  style = {},
}) => {
  return (
    <Pressable
      style={({pressed}) => [
        styles.container,
        {
          backgroundColor: red
            ? pressed
              ? Colors.darkRed
              : Colors.red
            : pressed
              ? Colors.darkBlack
              : Colors.black,
        },
        style,
      ]}
      onPress={onPress}>
      <Text allowFontScaling={false} style={styles.text}>
        {text}
      </Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: RH(58),
    borderRadius: RH(29),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...font('regular', 16, Colors.white),
    maxWidth: '80%',
    overflow: 'hidden',
    maxHeight: RH(40),
  },
});

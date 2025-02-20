import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import {RH} from '@theme/utils';
import Colors from '../../theme/colors';
import BgWaveSvg from '../../assets/BgWaveSvg';

const ScreenMask = ({children, style}) => {
  const CustomTouchableNativeFeedback = Keyboard.isVisible()
    ? TouchableNativeFeedback
    : View;
  return (
    <SafeAreaView style={{...styles.container, ...style}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        {...(Platform.OS === 'ios'
          ? {
              behavior: 'padding',
              keyboardVerticalOffset: RH(10),
              enabled: true,
            }
          : {})}>
        <CustomTouchableNativeFeedback
          style={{flex: 1}}
          onPress={() => Keyboard.dismiss()}>
          <SafeAreaView style={{flex: 1, zIndex: 2}}>
            <BgWaveSvg />
            {children}
          </SafeAreaView>
        </CustomTouchableNativeFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ScreenMask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.linear,
  },
});

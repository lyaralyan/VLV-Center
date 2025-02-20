import CheckSvg from '@assets/SVG/CheckSvg';
import Colors from '@theme/colors';
import {RH, RW} from '@theme/utils';
import React, {useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolateColor,
  withTiming,
} from 'react-native-reanimated';

const ToggleSwitch = ({value = true, setValue = () => {}}) => {
  const translateX = useSharedValue(value ? RW(26) : 0);
  const switchOn = useSharedValue(!value);

  const toggleSwitch = () => {
    setValue(!value);
  };
  useEffect(() => {
    if (!!value !== !!switchOn.value) {
      switchOn.value = !switchOn.value;
      translateX.value = !switchOn.value ? RW(26) : 0;
    }
  }, [value]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: withTiming(translateX.value)}],
    };
  });
  const animatedContainerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translateX.value,
      [0, 26],
      ['#e5e5e5', Colors.red],
    );
    return {
      backgroundColor: withTiming(backgroundColor),
    };
  });

  return (
    <TouchableOpacity onPress={toggleSwitch}>
      <Animated.View style={[styles.switchContainer, animatedContainerStyle]}>
        <Animated.View style={[styles.switch, animatedStyle]}>
          <CheckSvg color={value ? Colors.red : '#e5e5e5'} />
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    width: RW(50),
    height: RH(24),
    borderRadius: 20,
    backgroundColor: '#e5e5e5',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  switch: {
    width: RW(20),
    height: RH(20),
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ToggleSwitch;

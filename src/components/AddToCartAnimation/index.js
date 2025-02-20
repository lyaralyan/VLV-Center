import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Image from '@components/Image';
import {RH, RW} from '@theme/utils';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {setAddToCartAnimation} from '@store/CartSlice';
import {cartBtnPosition} from '@components/FooterMenu';

const DURATION = 500;

const AddToCartAnimation = () => {
  const addToCartAnimation = useSelector(({cart}) => cart.addToCartAnimation);
  const animatedY = useSharedValue(addToCartAnimation?.y);
  const animatedX = useSharedValue(addToCartAnimation?.x);
  const animatedWidth = useSharedValue(addToCartAnimation?.width);
  const animatedHeight = useSharedValue(addToCartAnimation?.height);
  const animatedOpacity = useSharedValue(1);

  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(addToCartAnimation || {}).length) {
      animatedY.value = addToCartAnimation?.y;
      animatedX.value = addToCartAnimation?.x;
      animatedWidth.value = addToCartAnimation?.width;
      animatedHeight.value = addToCartAnimation?.height;
      animatedOpacity.value = 1;
      setTimeout(() => {
        animatedY.value = withTiming(cartBtnPosition?.y, {
          duration: DURATION,
        });
        animatedX.value = withTiming(cartBtnPosition?.x, {
          duration: DURATION,
        });
        animatedWidth.value = withTiming(RW(30), {
          duration: DURATION,
        });
        animatedHeight.value = withTiming(RH(30), {
          duration: DURATION,
        });
        animatedOpacity.value = withTiming(0.2, {
          duration: DURATION,
        });
        setTimeout(() => {
          dispatch(setAddToCartAnimation(null));
          animatedWidth.value = addToCartAnimation?.width;
          animatedHeight.value = addToCartAnimation?.height;
          animatedOpacity.value = 1;
        }, DURATION);
      }, 0);
    }
  }, [addToCartAnimation]);

  const animatedStyles = useAnimatedStyle(() => ({
    top: animatedY.value,
    left: animatedX.value,
    width: animatedWidth.value,
    height: animatedHeight.value,
    opacity: animatedOpacity.value,
  }));

  if (!Object.keys(addToCartAnimation || {}).length) return null;
  return (
    <Animated.View
      style={[
        {
          height: addToCartAnimation?.height,
          width: addToCartAnimation?.width,
          position: 'absolute',
          zIndex: 9,
        },
        animatedStyles,
      ]}>
      <Image
        style={{
          height: '100%',
          width: '100%',
        }}
        url={addToCartAnimation?.image}
      />
    </Animated.View>
  );
};

export default AddToCartAnimation;

const styles = StyleSheet.create({});

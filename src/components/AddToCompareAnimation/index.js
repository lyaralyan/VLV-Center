import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Image from '@components/Image';
import {RH, RW} from '@theme/utils';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {compareBtnPosition} from '@components/FooterMenu';
import {setAddToCompareAnimation} from '@store/CartSlice';

const DURATION = 500;

const AddToCompareAnimation = () => {
  const addToCompareAnimation = useSelector(
    ({cart}) => cart.addToCompareAnimation,
  );
  const animatedY = useSharedValue(addToCompareAnimation?.y);
  const animatedX = useSharedValue(addToCompareAnimation?.x);
  const animatedWidth = useSharedValue(addToCompareAnimation?.width);
  const animatedHeight = useSharedValue(addToCompareAnimation?.height);
  const animatedOpacity = useSharedValue(1);

  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(addToCompareAnimation || {}).length) {
      animatedY.value = addToCompareAnimation?.y;
      animatedX.value = addToCompareAnimation?.x;
      animatedWidth.value = addToCompareAnimation?.width;
      animatedHeight.value = addToCompareAnimation?.height;
      animatedOpacity.value = 1;
      setTimeout(() => {
        animatedY.value = withTiming(compareBtnPosition?.y, {
          duration: DURATION,
        });
        animatedX.value = withTiming(compareBtnPosition?.x, {
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
          dispatch(setAddToCompareAnimation(null));
          animatedWidth.value = addToCompareAnimation?.width;
          animatedHeight.value = addToCompareAnimation?.height;
          animatedOpacity.value = 1;
        }, DURATION);
      }, 0);
    }
  }, [addToCompareAnimation]);

  const animatedStyles = useAnimatedStyle(() => ({
    top: animatedY.value,
    left: animatedX.value,
    width: animatedWidth.value,
    height: animatedHeight.value,
    opacity: animatedOpacity.value,
  }));

  if (!Object.keys(addToCompareAnimation || {}).length) return null;
  return (
    <Animated.View
      style={[
        {
          height: addToCompareAnimation?.height,
          width: addToCompareAnimation?.width,
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
        url={addToCompareAnimation?.image}
      />
    </Animated.View>
  );
};

export default AddToCompareAnimation;

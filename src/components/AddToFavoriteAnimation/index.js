import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Image from '@components/Image';
import {RH, RW} from '@theme/utils';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {setAddToFavoriteAnimation} from '@store/CartSlice';
import {favoriteBtnPosition} from '@components/FooterMenu';

const DURATION = 500;

const AddToFavoriteAnimation = () => {
  const addToFavoriteAnimation = useSelector(
    ({cart}) => cart.addToFavoriteAnimation,
  );
  const animatedY = useSharedValue(addToFavoriteAnimation?.y);
  const animatedX = useSharedValue(addToFavoriteAnimation?.x);
  const animatedWidth = useSharedValue(addToFavoriteAnimation?.width);
  const animatedHeight = useSharedValue(addToFavoriteAnimation?.height);
  const animatedOpacity = useSharedValue(1);

  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(addToFavoriteAnimation || {}).length) {
      animatedY.value = addToFavoriteAnimation?.y;
      animatedX.value = addToFavoriteAnimation?.x;
      animatedWidth.value = addToFavoriteAnimation?.width;
      animatedHeight.value = addToFavoriteAnimation?.height;
      animatedOpacity.value = 1;
      setTimeout(() => {
        animatedY.value = withTiming(favoriteBtnPosition?.y, {
          duration: DURATION,
        });
        animatedX.value = withTiming(favoriteBtnPosition?.x, {
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
          dispatch(setAddToFavoriteAnimation(null));
          animatedWidth.value = addToFavoriteAnimation?.width;
          animatedHeight.value = addToFavoriteAnimation?.height;
          animatedOpacity.value = 1;
        }, DURATION);
      }, 0);
    }
  }, [addToFavoriteAnimation]);

  const animatedStyles = useAnimatedStyle(() => ({
    top: animatedY.value,
    left: animatedX.value,
    width: animatedWidth.value,
    height: animatedHeight.value,
    opacity: animatedOpacity.value,
  }));

  if (!Object.keys(addToFavoriteAnimation || {}).length) return null;
  return (
    <Animated.View
      style={[
        {
          height: addToFavoriteAnimation?.height,
          width: addToFavoriteAnimation?.width,
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
        url={addToFavoriteAnimation?.image}
      />
    </Animated.View>
  );
};

export default AddToFavoriteAnimation;

import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  Keyboard,
  Image,
  Dimensions,
} from 'react-native';
import Colors from '@theme/colors';
import {RW} from '@theme/utils';
import {useSelector} from 'react-redux';
import LoaderSvg from '@assets/SVG/LoaderSvg';
import {BlurView} from '@react-native-community/blur';

const InnerLoader = ({children}) => {
  const pending = useSelector(({main}) => main.innerPending);
  const loaderAnimation = useRef(new Animated.Value(0)).current;

  const startImageRotateFunction = () => {
    loaderAnimation.setValue(0);
    Animated.timing(loaderAnimation, {
      toValue: 360,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      if (pending) {
        startImageRotateFunction();
      }
    });
  };

  useEffect(() => {
    Keyboard.dismiss();
    startImageRotateFunction();
    return () => {
      loaderAnimation.stopAnimation(); // Clean up the animation on unmount
    };
  }, [pending]);

  return (
    <View style={{flex: 1}}>
      {pending && (
        <View
          style={[
            StyleSheet.absoluteFill,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <BlurView
            style={styles.body}
            blurAmount={20}
            blurType="light"
            overlayColor="transparent"
          />

          <Image
            source={require('../../assets/LoaderGif/Loading.gif')}
            style={[styles.loaderImage, {zIndex: 99}]}
          />
        </View>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    zIndex: 10,
  },
  loaderImage: {
    width: Dimensions.get('window').width / 3,
    resizeMode: 'contain',
  },
});

export default InnerLoader;

import {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  Keyboard,
  Image,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import {BlurView} from '@react-native-community/blur';

const Loader = ({children}) => {
  const {pending} = useSelector(({main}) => main);
  const loaderAnimation = new Animated.Value(0);

  const startImageRotateFunction = () => {
    loaderAnimation.setValue(0);
    Animated.timing(loaderAnimation, {
      toValue: 3,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      if (pending) {
        startImageRotateFunction();
      }
    });
  };

  useEffect(() => {
    Keyboard.dismiss();
    startImageRotateFunction();
  }, [pending]);

  return (
    <View style={{flex: 1, backgroundColor: '#ffffffb5'}}>
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

export default Loader;

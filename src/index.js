import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import FooterMenu from './components/FooterMenu';
import {useDispatch} from 'react-redux';
import {getMainInfo, setPending} from './store/MainSlice';
import Menu from './components/Menu';
import NetInfo from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/native';
import DrawerFilter from '@screens/Search/components/DrawerFilter';
import {getToken} from '@store/UserSlice';
import CameraBottomSheet from '@components/Camera';
import AddToCartAnimation from '@components/AddToCartAnimation';
import AddToFavoriteAnimation from '@components/AddToFavoriteAnimation';
import AddToCompareAnimation from '@components/AddToCompareAnimation';
import WebViewCartOrder from '@components/WebViewCartOrder';
import {
  notificationListener,
  requestUserPermission,
} from './utils/NotificationServices';
import SignInModal from '@components/SignInModal';
import {getHeaderSliderRequest} from '@store/getHeaderSliderSlice';

let internetConnectionFailed = false;
const MyApp = () => {
  const [activePageName, setActivePageName] = useState('Home');

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const unsubscribe = NetInfo.addEventListener(state => {
    if (!state.isConnected) {
      dispatch(setPending(false));
      navigation.navigate('NoInternet');
      internetConnectionFailed = true;
    } else if (internetConnectionFailed) {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate('Home');
      }
    }
  });

  useEffect(() => {
    dispatch(getToken());
    dispatch(getMainInfo());
    dispatch(getHeaderSliderRequest());
    requestUserPermission();
    notificationListener();
    const navigationListener = navigation.addListener('state', state => {
      setActivePageName(
        state?.data?.state?.routes?.[state?.data?.state?.index]?.name,
      );
    });

    return () => {
      unsubscribe();
      navigation.removeListener(navigationListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        {...(Platform.OS === 'ios' && activePageName !== 'CartOrder'
          ? {
              behavior: 'padding',
              // behavior: 'height',
              // keyboardVerticalOffset: 100,
              enabled: true,
            }
          : {})}>
        <Menu />
        <DrawerFilter />
        <AppNavigator />
        <FooterMenu />
        <AddToCartAnimation />
        <AddToFavoriteAnimation />
        <AddToCompareAnimation />
      </KeyboardAvoidingView>
      <WebViewCartOrder />
      <CameraBottomSheet />
      <SignInModal />
    </React.Fragment>
  );
};
const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
});

export default MyApp;

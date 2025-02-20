import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
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
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AddToCartAnimation from '@components/AddToCartAnimation';
import AddToFavoriteAnimation from '@components/AddToFavoriteAnimation';
import AddToCompareAnimation from '@components/AddToCompareAnimation';
import WebViewCartOrder from '@components/WebViewCartOrder';
import {
  notificationListener,
  requestUserPermission,
} from './utils/NotificationServices';
import SignInModal from '@components/SignInModal';

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
  }, []);

  return (
    <React.Fragment>
      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
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

export default MyApp;

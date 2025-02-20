import {
  Image,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {RW, font} from '@theme/utils';
import Header from '../components/Header';
import {RH} from '@theme/utils';
import Input from '@components/Input/Input';
import Button from '@components/Button/Button';
// import Row from '@theme/wrappers/row';
// import GoogleSvg from '../../../assets/SVG/GoogleSvg';
// import FacebookSvg from '../../../assets/SVG/FacebookSvg';
import {
  UserLogin,
  // UserLoginGoogle,
  setRedirectToCartAfterAuth,
} from '@store/UserSlice';
import {useDispatch, useSelector} from 'react-redux';
import LangCurrency from '@components/LangCurrency';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useTranslation} from 'react-i18next';
import isValidEmail from '@helpers/checkEmail';
import {setShowSignInModal} from '@store/MainSlice';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Login = ({isModal, showDisscountModal, route, modalToastRef}) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const {userId, redirectToCartAfterAuth} = useSelector(({user}) => user);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const redirectToCart = route?.params?.redirectToCart;

  useEffect(() => {
    if (userId && (redirectToCartAfterAuth || redirectToCart) && !isModal) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'ShopCart',
          },
        ],
      });
    } else if (userId && !isModal) {
      navigation.reset({
        index: 1,
        routes: [
          {
            name: 'Home',
          },
          {
            name: 'Profile',
          },
        ],
      });
    }
  }, [userId, redirectToCartAfterAuth, redirectToCart]);
  useEffect(() => {
    dispatch(setRedirectToCartAfterAuth(redirectToCart));
  }, [redirectToCart]);

  // GoogleSignin.configure({
  //   // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  //   scopes: ['profile', 'email'],
  //   webClientId:
  //     '665508169429-mvv17gppijn1uag7gdn7u176ecs8ftj6.apps.googleusercontent.com',
  //   offlineAccess: true,

  //   forceCodeForRefreshToken: true,
  //   iosClientId:
  //     '665508169429-boet7pnnd9o9jl0kufl486t81967n13s.apps.googleusercontent.com',
  //   androidClientId:
  //     '665508169429-2uq5dlamt1o4d0apuvi9iq06qj7hjcbo.apps.googleusercontent.com',
  // });
  // const signInGoogle = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = GoogleSignin.signIn();
  //     dispatch(UserLoginGoogle(userInfo?.user));
  //   } catch (error) {
  //     Toast.show({
  //       type: 'error',
  //       text1: error.code || t('error_message'),
  //     });
  //     // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //     //   // user cancelled the login flow
  //     // } else if (error.code === statusCodes.IN_PROGRESS) {
  //     //   // operation (e.g. sign in) is in progress already
  //     // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //     //   // play services not available or outdated
  //     // } else {
  //     //   // some other error happened
  //     // }
  //   }
  // };

  // const logoutWithFacebook = () => {
  //   LoginManager.logOut();
  //   // this.setState({userInfo: {}});
  // };

  // const getInfoFromToken = token => {
  //   const PROFILE_REQUEST_PARAMS = {
  //     fields: {
  //       string: 'id,name,first_name,last_name, email',
  //     },
  //   };
  //   const profileRequest = new GraphRequest(
  //     '/me',
  //     {token, parameters: PROFILE_REQUEST_PARAMS},
  //     (error, user) => {
  //       if (error) {
  //         console.log('login info has error: ' + error);
  //       } else {
  //         console.log('result:', user);
  //       }
  //     },
  //   );
  //   new GraphRequestManager().addRequest(profileRequest).start();
  // };

  // const loginWithFacebook = () => {
  //   // Attempt a login using the Facebook login dialog asking for default permissions.
  //   LoginManager.logInWithPermissions(['public_profile', 'email']).then(
  //     login => {
  //       if (login.isCancelled) {
  //         console.log('Login cancelled');
  //       } else {
  //         AccessToken.getCurrentAccessToken().then(data => {
  //           const accessToken = data.accessToken.toString();
  //           getInfoFromToken(accessToken);
  //         });
  //       }
  //     },
  //     error => {
  //       console.log('Login fail with error: ' + error);
  //     },
  //   );
  // };

  const {t} = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.container, !isModal && {paddingTop: insets.top}]}
      contentContainerStyle={!isModal && {paddingBottom: RH(140)}}>
      {!isModal && <Header style={{paddingHorizontal: RW(16)}} />}
      {showDisscountModal ? (
        <>
          <Image
            style={{
              width: RW(140),
              height: RH(155),
              alignSelf: 'center',
            }}
            source={require('./assets/Disscount.png')}
          />
          <Text
            allowFontScaling={false}
            style={[styles.title, {textTransform: 'uppercase'}]}>
            {t('profitable')}
          </Text>
          <Text allowFontScaling={false} style={styles.desc}>
            {t('discount modal text')}
          </Text>
        </>
      ) : (
        <>
          <Text allowFontScaling={false} style={styles.title}>
            {t('Login')}
          </Text>
          <LangCurrency />
          <Text allowFontScaling={false} style={styles.subTitle}>
            {t('enter_log_pass')}
          </Text>
        </>
      )}

      <View style={styles.wrapper}>
        <Input
          placeholder={t('email')}
          value={login}
          onChange={setLogin}
          style={{marginBottom: RH(30)}}
          error={loginError}
        />
        <Input
          placeholder={t('password')}
          value={password}
          onChange={setPassword}
          password
          error={passwordError}
        />
        <Pressable
          style={styles.forgotPassword}
          onPress={() => {
            if (isModal) {
              dispatch(setShowSignInModal(false));
            }
            navigation.navigate('ForgotPassword');
          }}>
          <Text allowFontScaling={false} style={styles.forgotPasswordText}>
            {t('Forgot Password?')}
          </Text>
        </Pressable>
        <Button
          text={t('Login')}
          onPress={() => {
            setLoginError(!login || !isValidEmail(login));
            setPasswordError(!password);
            if (login && password) {
              Keyboard.dismiss();
              dispatch(
                UserLogin({
                  login,
                  password,
                  modalToastRef,
                }),
              );
            }
          }}
        />
      </View>
      <View style={styles.line} />
      <View style={styles.wrapper}>
        <Button
          text={t('Sign Up')}
          red={false}
          onPress={() => {
            if (isModal) {
              dispatch(setShowSignInModal(false));
            }
            navigation.navigate('SignUp');
          }}
        />
      </View>
      {/* <Text allowFontScaling={false} style={styles.bottomText}>{t('social_acc')}</Text>

      <Row style={styles.socBtns}>
        <Pressable onPress={signInGoogle} style={{marginRight: RW(15)}}>
          <GoogleSvg />
        </Pressable>
        <Pressable onPress={loginWithFacebook}>
          <FacebookSvg />
        </Pressable>
      </Row> */}
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    ...font('bold', 22),
    alignSelf: 'center',
    marginTop: RH(40),
    marginBottom: RH(26),
  },
  subTitle: {
    ...font('medium', 18),
    alignSelf: 'center',
    textAlign: 'center',
    width: '100%',
    marginBottom: RH(26),
    paddingHorizontal: RW(30),
  },
  desc: {
    ...font('medium', 14, 'rgba(40, 40, 40, 0.6)'),
    alignSelf: 'center',
    textAlign: 'center',
    width: '100%',
    marginBottom: RH(26),
    paddingHorizontal: RW(30),
  },
  wrapper: {
    width: RW(325),
    alignSelf: 'center',
  },
  forgotPassword: {
    marginTop: RH(12),
  },
  forgotPasswordText: {
    textDecorationLine: 'underline',
    ...font('medium', 14),
    marginBottom: RH(48),
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(40, 40, 40, 0.4)',
    marginVertical: RH(15),
  },
  bottomText: {
    ...font('medium', 16),
    alignSelf: 'center',
    textAlign: 'center',
    width: '100%',
    marginVertical: RH(30),
  },
  socBtns: {
    justifyContent: 'center',
  },
});

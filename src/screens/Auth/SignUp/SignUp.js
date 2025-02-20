import {
  Keyboard,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RW, font} from '@theme/utils';
import Header from '../components/Header';
import {RH} from '@theme/utils';
import Input from '@components/Input/Input';
import Button from '@components/Button/Button';
import Row from '@theme/wrappers/row';
import GoogleSvg from '../../../assets/SVG/GoogleSvg';
import FacebookSvg from '../../../assets/SVG/FacebookSvg';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {
  UserLoginGoogle,
  UserSignUp,
  sendOtp,
  setRedirectToCartAfterAuth,
} from '@store/UserSlice';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
import Toast from 'react-native-toast-message';
import {useTranslation} from 'react-i18next';
import isValidEmail from '@helpers/checkEmail';
import isValidPhone from '@helpers/checkPhone';
import {useNavigation} from '@react-navigation/native';

const SignUp = props => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [loginError, setLoginError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [password2Error, setPassword2Error] = useState(false);
  const {signUpErrors, userId, redirectToCartAfterAuth} = useSelector(
    ({user}) => user,
  );
  const redirectToCart = props.route.params?.redirectToCart;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  GoogleSignin.configure({
    // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
    scopes: ['profile', 'email'],
    webClientId:
      '665508169429-mvv17gppijn1uag7gdn7u176ecs8ftj6.apps.googleusercontent.com',
    offlineAccess: true,
    forceCodeForRefreshToken: true,

    iosClientId:
      '665508169429-boet7pnnd9o9jl0kufl486t81967n13s.apps.googleusercontent.com',
    androidClientId:
      '665508169429-2uq5dlamt1o4d0apuvi9iq06qj7hjcbo.apps.googleusercontent.com',
  });
  const signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      dispatch(UserLoginGoogle(userInfo?.user));
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error.code || t('error_message'),
      });
      // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      //   // user cancelled the login flow
      // } else if (error.code === statusCodes.IN_PROGRESS) {
      //   // operation (e.g. sign in) is in progress already
      // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      //   // play services not available or outdated
      // } else {
      //   // some other error happened
      // }
    }
  };

  const logoutWithFacebook = () => {
    LoginManager.logOut();
    // this.setState({userInfo: {}});
  };

  const getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id,name,first_name,last_name, email',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      (error, user) => {
        if (error) {
          console.error('login info has error: ' + error);
        } else {
          console.info('result:', user);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  const loginWithFacebook = () => {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      login => {
        if (login.isCancelled) {
          console.warn('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const accessToken = data.accessToken.toString();
            getInfoFromToken(accessToken);
          });
        }
      },
      error => {
        console.error('Login fail with error: ' + error);
      },
    );
  };
  useEffect(() => {
    dispatch(setRedirectToCartAfterAuth(redirectToCart));
  }, [redirectToCart]);

  useEffect(() => {
    signUpErrors?.forEach(e => {
      switch (e) {
        case 'email':
          setLoginError(true);
          break;
        case 'first_name':
          setNameError(true);
          break;
        case 'user_password':
          setPasswordError(true);
          break;
        case 'phone':
          setPhoneError(true);
          break;
      }
    });
  }, [signUpErrors]);
  const {t} = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom: RH(70)}}>
        <Header style={{paddingHorizontal: RW(16)}} />
        <Text allowFontScaling={false} style={styles.title}>
          {t('Sign Up')}
        </Text>
        <Text allowFontScaling={false} style={styles.subTitle}>
          {t('enter_log_pass')}
        </Text>
        <View style={styles.wrapper}>
          <Input
            placeholder={t('first_name')}
            value={name}
            onChange={setName}
            style={styles.input}
            error={nameError}
          />
          <Input
            placeholder={t('last_name')}
            value={lastName}
            onChange={setLastName}
            style={styles.input}
            error={lastNameError}
          />
          <Input
            placeholder={t('email')}
            value={email}
            onChange={setEmail}
            style={styles.input}
            error={loginError}
          />
          <Input
            placeholder="0XXXXXXXX *"
            value={phone}
            onChange={setPhone}
            style={styles.input}
            error={phoneError}
          />
          <Input
            placeholder={t('password')}
            value={password}
            onChange={setPassword}
            style={styles.input}
            password
            error={passwordError}
          />
          <Input
            placeholder={t('repeat_password')}
            value={password2}
            onChange={setPassword2}
            style={styles.input}
            password
            error={password2Error}
          />
          <Button
            onPress={() => {
              setNameError(!name);
              setLastNameError(!lastName);
              setLoginError(!email || !isValidEmail(email));
              setPhoneError(!phone || !isValidPhone(phone));
              setPasswordError(!password);
              setPassword2Error(!password2 || password !== password2);
              if (
                name &&
                lastName &&
                email &&
                isValidEmail(email) &&
                phone &&
                isValidPhone(phone) &&
                password &&
                password == password2
              ) {
                Keyboard.dismiss();
                dispatch(
                  sendOtp({
                    name,
                    email,
                    phone,
                    callback: otp => {
                      if (otp) {
                        navigation.navigate('OTP', {
                          otp: otp,
                          userData: {
                            first_name: name,
                            last_name: lastName,
                            email,
                            phone,
                            user_password: password,
                            password_confirmation: password2,
                          },
                        });
                      }
                    },
                  }),
                );
                // navigation.navigate('OTP', {
                // userData: {
                //   first_name: name,
                //   last_name: lastName,
                //   email,
                //   phone,
                //   user_password: password,
                //   password_confirmation: password2,
                // },
                // });
                //   dispatch(
                // UserSignUp({
                //   first_name: name,
                //   last_name: lastName,
                //   email,
                //   phone,
                //   user_password: password,
                //   password_confirmation: password2,
                // }),
                //   );
              }
            }}
            text={t('sign_up')}
          />
        </View>
        <View style={styles.line} />
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
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    ...font('medium', 22),
    alignSelf: 'center',
    marginTop: RH(40),
    marginBottom: RH(56),
  },
  subTitle: {
    ...font('medium', 18),
    alignSelf: 'center',
    textAlign: 'center',
    width: '100%',
    marginBottom: RH(56),
  },
  wrapper: {
    width: RW(325),
    alignSelf: 'center',
  },
  input: {marginBottom: RH(30)},
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
    marginBottom: RH(30),
  },
  socBtns: {
    justifyContent: 'center',
  },
});

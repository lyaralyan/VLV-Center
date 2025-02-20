import {
  Image,
  Keyboard,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {RW, font} from '@theme/utils';
import Header from '../components/Header';
import {RH} from '@theme/utils';
import Button from '@components/Button/Button';
import Row from '@theme/wrappers/row';
import GoogleSvg from '../../../assets/SVG/GoogleSvg';
import FacebookSvg from '../../../assets/SVG/FacebookSvg';
import {forgotPassword2} from '@store/UserSlice';
import {useDispatch} from 'react-redux';
import OTPInputCustom from '@components/OTPCustomView';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Toast from 'react-native-toast-message';

const ForgotPassword2 = props => {
  const {otp, user_id, phone} = props.route.params;
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {t} = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <Header style={{paddingHorizontal: RW(16)}} />
      <View style={styles.imgBlock}>
        <Image
          style={styles.img}
          source={require('../ForgotPassword/assets/forgot_password.png')}
        />
      </View>
      <Text allowFontScaling={false} style={styles.subTitle}>
        {t('enter_otp')}
      </Text>
      <View style={styles.wrapper}>
        <OTPInputCustom error={error} value={code} setValue={setCode} />
        <Button
          text={t('submit')}
          onPress={() => {
            Keyboard.dismiss();
            setError(otp != code.join('').trim());
            if (otp == code.join('').trim()) {
              dispatch(
                forgotPassword2(
                  user_id,
                  code.join('').trim(),
                  phone,
                  navigation,
                ),
              );
            } else {
              Toast.show({
                type: 'error',
                text1: t('invalid_otp'),
              });
            }
          }}
        />
      </View>
      <View style={styles.line} />
      {/* <Text allowFontScaling={false} style={styles.bottomText}>{t('social_acc')}</Text>
      <Row style={styles.socBtns}>
        <Pressable style={{marginRight: RW(15)}}>
          <GoogleSvg />
        </Pressable>
        <Pressable>
          <FacebookSvg />
        </Pressable>
      </Row> */}
    </SafeAreaView>
  );
};

export default ForgotPassword2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgBlock: {
    width: RW(300),
    height: RH(180),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(247,246,249)',
    alignSelf: 'center',
    marginVertical: RH(30),
    paddingHorizontal: RW(14),
    paddingVertical: RH(11),
  },
  img: {
    width: RW(270),
    height: RH(160),
    resizeMode: 'contain',
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

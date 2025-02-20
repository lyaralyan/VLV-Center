import {
  Image,
  Keyboard,
  Pressable,
  SafeAreaView,
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
import Row from '@theme/wrappers/row';
import GoogleSvg from '../../../assets/SVG/GoogleSvg';
import FacebookSvg from '../../../assets/SVG/FacebookSvg';
import {forgotPassword} from '@store/UserSlice';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

const ForgotPassword = () => {
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {t} = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <Header style={{paddingHorizontal: RW(16)}} />
      <View style={styles.imgBlock}>
        <Image
          style={styles.img}
          source={require('./assets/forgot_password.png')}
        />
      </View>
      <Text allowFontScaling={false} style={styles.subTitle}>
        {t('Forgot Password?')}
      </Text>
      <View style={styles.wrapper}>
        <Input
          placeholder={t('phone')}
          value={phone}
          onChange={setPhone}
          style={{marginBottom: RH(30)}}
          error={phoneError}
        />
        <Button
          text={t('send')}
          onPress={() => {
            setPhoneError(!phone);
            if (phone) {
              Keyboard.dismiss();
              dispatch(forgotPassword(phone, navigation));
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

export default ForgotPassword;

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

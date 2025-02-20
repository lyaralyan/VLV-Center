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
import {resetPassword} from '@store/UserSlice';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Input from '@components/Input/Input';
import {useTranslation} from 'react-i18next';

const ForgotPassword3 = props => {
  const email = props?.route?.params?.email;
  const phone = props?.route?.params?.phone;

  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [password1Error, setPassword1Error] = useState(false);
  const [password2Error, setPassword2Error] = useState(false);

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
        {t('new_password')}
      </Text>
      <View style={styles.wrapper}>
        <Input
          value={password1}
          onChange={e => setPassword1(e)}
          style={{marginBottom: RH(30)}}
          placeholder={t('password')}
          password
          error={password1Error}
        />
        <Input
          value={password2}
          onChange={e => setPassword2(e)}
          style={{marginBottom: RH(40)}}
          placeholder={t('repeat_password')}
          password
          error={password2Error}
        />

        <Button
          text={t('confirm')}
          onPress={() => {
            setPassword1Error(!password1);
            setPassword2Error(!password2 || password1 !== password2);
            if (password1 === password2) {
              Keyboard.dismiss();
              dispatch(resetPassword(email, phone, password1, navigation));
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

export default ForgotPassword3;

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

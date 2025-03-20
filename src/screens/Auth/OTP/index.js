import Button from '@components/Button/Button';
import Header from '@components/Header';
import OTPInputCustom from '@components/OTPCustomView';
import {useNavigation} from '@react-navigation/native';
import {UserSignUp} from '@store/UserSlice';
import {RH, RW, font} from '@theme/utils';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';

export default function OTP(props) {
  const [otpValue, setOtpValue] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {userId, redirectToCartAfterAuth} = useSelector(({user}) => user);

  useEffect(() => {
    if (userId && redirectToCartAfterAuth) {
      navigation.reset({
        index: 1,
        routes: [
          {
            name: 'Home',
          },
          {
            name: 'ShopCart',
          },
        ],
      });
      return null;
    }
    if (userId)
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Home',
          },
        ],
      });
  }, [userId, redirectToCartAfterAuth]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom: RH(70)}}>
        <Header style={{paddingHorizontal: RW(16)}} />
        <Text allowFontScaling={false} style={styles.title}>
          {t('Sign Up')}
        </Text>
        <Text allowFontScaling={false} style={styles.subTitle}>
          {t('enter_otp')}
        </Text>
        <View style={styles.wrapper}>
          <OTPInputCustom
            error={error}
            value={otpValue}
            setValue={setOtpValue}
          />
          <Button
            onPress={() => {
              const trimmedCode = otpValue.join('').trim();
              const trimmedOtp = (props.route?.params?.otp || '')
                .toString()
                .trim();

              setError(trimmedOtp !== trimmedCode);
              if (trimmedOtp === trimmedCode) {
                dispatch(UserSignUp(props.route?.params?.userData));
              } else {
                Toast.show({
                  type: 'error',
                  text1: t('invalid_otp'),
                });
              }
            }}
            text={t('sign_up')}
          />
        </View>
        <View style={styles.line} />
        <Text allowFontScaling={false} style={styles.bottomText}>
          {t('social_acc')}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

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

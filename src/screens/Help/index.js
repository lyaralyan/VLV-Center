import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Row from '@theme/wrappers/row';
import {useNavigation} from '@react-navigation/native';
import {RH, RW, font} from '@theme/utils';
import Colors from '@theme/colors';
import {useTranslation} from 'react-i18next';
import CloseSvg from '@assets/SVG/CloseSvg';
import WalletSvg from './assets/WalletSvg';
import PasswordSvg from './assets/PasswordSvg';
import DeliverySvg from './assets/DeliverySvg';
import HaertSvg from '@assets/SVG/HaertSvg';
import HelpSvg from '@assets/SVG/HelpSvg';
import {userSubscribe} from '@store/MainSlice';
import {useDispatch} from 'react-redux';
import isValidEmail from '@helpers/checkEmail';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Help = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={[styles.container, {paddingTop: insets.top}]}>
      <Row style={styles.header}>
        <Pressable
          style={{
            zIndex: 2,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <CloseSvg />
        </Pressable>

        <View style={styles.titleContainer}>
          <Text allowFontScaling={false} style={styles.title}>
            {t('support')}
          </Text>
        </View>

        <View />
      </Row>
      <View style={styles.row}>
        <WalletSvg />
        <View>
          <Text allowFontScaling={false} style={styles.rowTitle}>
            {t('type_pay')}
          </Text>
          <Text allowFontScaling={false} style={styles.rowDescription}>
            {t('pay_text')}
          </Text>
          <Pressable onPress={() => navigation.navigate('Payment')}>
            <Text
              allowFontScaling={false}
              style={[styles.rowDescription, styles.underlineText]}>
              {t('type_pay')}
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.row}>
        <PasswordSvg />
        <View>
          <Text allowFontScaling={false} style={styles.rowTitle}>
            {t('pravicy_policy')}
          </Text>
          <Text allowFontScaling={false} style={styles.rowDescription}>
            {t('help_page_pravicy_policy_description')}
          </Text>
          <Pressable
            onPress={() => {
              navigation.navigate('Privacy');
            }}>
            <Text
              allowFontScaling={false}
              style={[styles.rowDescription, styles.underlineText]}>
              {t('pravicy_policy')}
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.row}>
        <DeliverySvg />
        <View>
          <Text allowFontScaling={false} style={styles.rowTitle}>
            {t('delivery_options')}
          </Text>
          <Text allowFontScaling={false} style={styles.rowDescription}>
            {t('pay_text')}
          </Text>
          <Pressable onPress={() => navigation.navigate('Delivery')}>
            <Text
              allowFontScaling={false}
              style={[styles.rowDescription, styles.underlineText]}>
              {t('type_pay')}
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.row}>
        <HaertSvg />
        <View>
          <Text allowFontScaling={false} style={styles.rowTitle}>
            {t('news_and_promotions_for_members_only')}
          </Text>
          <View
            style={[
              styles.inputContainer,
              emailError && {borderWidth: RW(1), borderColor: Colors.red},
            ]}>
            <TextInput
              allowFontScaling={false}
              value={email}
              onChangeText={e => setEmail(e)}
              style={[styles.input]}
              placeholder={t('email')}
              placeholderTextColor={Colors.gray}
            />
            <Pressable
              style={styles.inputBtn}
              onPress={() => {
                setEmailError(!email || !isValidEmail(email));
                if (email && isValidEmail(email))
                  dispatch(userSubscribe(email));
              }}>
              <Text allowFontScaling={false} style={styles.inputBtnText}>
                {t('subscribe')}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={[styles.row, styles.bottomRow]}>
        <HelpSvg />
        <View>
          <Text allowFontScaling={false} style={styles.rowTitle}>
            {t('we_are_here_to_help_you')}
          </Text>
          <Pressable onPress={() => navigation.navigate('Contact')}>
            <Text
              allowFontScaling={false}
              style={[styles.rowDescription, styles.underlineText]}>
              {t('contact_us')}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default Help;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginHorizontal: RW(16),
    marginBottom: RH(58),
  },
  titleContainer: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
  },
  title: {
    ...font('medium', 16, Colors.black),
  },
  row: {
    width: RW(337),
    alignSelf: 'center',
    flexDirection: 'row',
    columnGap: RW(11),
    marginBottom: RH(40),
  },
  rowTitle: {
    ...font('bold', 14),
    marginBottom: RH(16),
  },
  rowDescription: {
    maxWidth: '93%',
    ...font('regular', 12),
  },
  inputContainer: {
    width: '100%',
    height: RH(37),
    borderRadius: RH(20),
    borderWidth: RW(1),
    borderColor: 'rgba(40, 40, 40, 0.4)',
    justifyContent: 'center',
    paddingHorizontal: RW(15),
  },
  inputBtn: {
    position: 'absolute',
    paddingHorizontal: RW(26),
    paddingVertical: RH(10),
    backgroundColor: Colors.red,
    borderRadius: RH(20),
    right: RW(1),
  },
  inputBtnText: font('regular', 10, '#fff'),
  input: {
    ...font('regular', 10, 'rgba(40, 40, 40, 0.6)'),
  },
  bottomRow: {
    marginTop: RH(60),
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
});

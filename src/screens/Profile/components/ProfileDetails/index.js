import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {RH, RW, font} from '@theme/utils';
import DefaultAvatarSvg from './assets/DefaultAvatarSvg';
import {useDispatch, useSelector} from 'react-redux';
import Row from '@theme/wrappers/row';
import RedPhoneSvg from './assets/RedPhoneSvg';
import EditSvg from '@assets/SVG/EditSvg';
import EmailSvg from './assets/EmailSvg';
import Input from '@components/Input/Input';
import Button from '@components/Button/Button';
import ToggleSwitch from '@components/ToggleSwitch';
import {
  deleteBankCard,
  editUserInfo,
  resetPassword,
  updateNotificationSettings,
} from '@store/UserSlice';
import CheckBoxSvg from '@assets/SVG/CheckBoxSvg';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import DeleteSvg from '@assets/SVG/DeleteSvg';
import BankCardSvg from './assets/BankCardSvg';
import VisaSvg from './assets/VisaSvg';
import MasterCardSvg from './assets/MasterCardSvg';
import AmericanExpressSvg from './assets/AmericanExpressSvg';
import ArcaSvg from './assets/ArcaSvg';

const detectCardTypeByBin = bin => {
  const firstDigit = bin.charAt(0);
  const firstTwoDigits = bin.substring(0, 2);
  if (firstDigit === '4') {
    return 'Visa';
  } else if (parseInt(firstTwoDigits) >= 51 && parseInt(firstTwoDigits) <= 55) {
    return 'Mastercard';
  } else if (firstTwoDigits === '34' || firstTwoDigits === '37') {
    return 'AmericanExpress';
  } else if (firstTwoDigits === '42') {
    return 'Arca';
  } else {
    return 'Unknown';
  }
};
const cardIcon = {
  Visa: <VisaSvg />,
  Mastercard: <MasterCardSvg />,
  AmericanExpress: <AmericanExpressSvg />,
  Arca: <ArcaSvg />,
  Unknown: <BankCardSvg />,
};

const ProfileDetails = () => {
  const [oldPassword, setOldPassword] = useState('');

  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [editEmail, setEditEmail] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(userInfo?.personal_information?.phone);
  const navigation = useNavigation();
  const userInfo = useSelector(({user}) => user.userInfo);

  const dispatch = useDispatch();
  const {t} = useTranslation();
  const emailInputRef = useRef();
  const phoneInputRef = useRef();
  useEffect(() => {
    if (editEmail) {
      setEditPhone(false);
      emailInputRef.current.focus();
    }
  }, [editEmail]);
  useEffect(() => {
    if (editPhone) {
      setEditEmail(false);
      phoneInputRef.current.focus();
    }
  }, [editPhone]);
  useEffect(() => {
    setEmail(userInfo?.personal_information?.email || '');
    setPhone(userInfo?.personal_information?.phone || '');
  }, [userInfo]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: RH(60)}}
      showsVerticalScrollIndicator={false}>
      <Text allowFontScaling={false} style={styles.title}>
        {t('personal_info')}
      </Text>
      <DefaultAvatarSvg style={{alignSelf: 'center'}} />
      <Text allowFontScaling={false} style={styles.userName}>
        {userInfo?.personal_information?.name}
      </Text>
      <Row style={[styles.row]}>
        <View style={styles.editRow}>
          <RedPhoneSvg />
          <TextInput
            allowFontScaling={false}
            ref={phoneInputRef}
            editable={editPhone}
            style={styles.editRowText}
            value={phone || ''}
            onChangeText={e => setPhone(e)}
          />
        </View>
        <Pressable
          onPress={() => {
            if (!editPhone) {
              setEditPhone(true);
            } else {
              setEditPhone(false);
              dispatch(editUserInfo({phone}));
            }
          }}>
          {editPhone ? (
            <CheckBoxSvg />
          ) : (
            <EditSvg width={RW(18)} height={RH(18)} />
          )}
        </Pressable>
      </Row>
      <Row style={styles.row}>
        <View style={styles.editRow}>
          <EmailSvg />
          <TextInput
            allowFontScaling={false}
            ref={emailInputRef}
            editable={editEmail}
            style={styles.editRowText}
            value={email || ''}
            onChangeText={e => setEmail(e)}
          />
        </View>
        <Pressable
          onPress={() => {
            if (!editEmail) {
              setEmail(userInfo?.personal_information?.email);
              setEditEmail(true);
            } else {
              setEditEmail(false);
              dispatch(editUserInfo({email}));
            }
          }}>
          {editEmail ? (
            <CheckBoxSvg />
          ) : (
            <EditSvg width={RW(18)} height={RH(18)} />
          )}
        </Pressable>
      </Row>
      <Text allowFontScaling={false} style={styles.changePasswordTitle}>
        {t('change_password')}
      </Text>
      <Input
        placeholder={t('current_password')}
        value={oldPassword}
        onChange={setOldPassword}
        style={styles.input}
        password
      />
      <Input
        placeholder={t('new_password')}
        value={password}
        onChange={setPassword}
        style={styles.input}
        password
      />
      <Input
        placeholder={t('repeat_the_new_password')}
        value={password2}
        onChange={setPassword2}
        style={styles.input}
        password
      />
      <Button
        style={styles.saveBtn}
        text={t('Save')}
        onPress={() => {
          if (password == password2) {
            dispatch(
              resetPassword(
                userInfo?.personal_information?.email,
                password,
                navigation,
              ),
            );
          }
        }}
      />
      <Text allowFontScaling={false} style={styles.changePasswordTitle}>
        {t('notifications')}
      </Text>
      <Row style={styles.row}>
        <Text allowFontScaling={false} style={styles.notificationText}>
          {t('notification_email')}
        </Text>
        <ToggleSwitch
          setValue={() => {
            dispatch(updateNotificationSettings());
          }}
          value={userInfo?.user_notification}
        />
      </Row>
      {!!userInfo?.personal_information?.pan && (
        <View>
          <Text allowFontScaling={false} style={styles.cardTitle}>
            {t('Preferred payment method')}
          </Text>
          <View style={styles.cardMain}>
            <LinearGradient
              colors={['#E31335', '#610010']}
              style={styles.linearGradient}>
              {
                cardIcon[
                  detectCardTypeByBin(userInfo?.personal_information?.pan)
                ]
              }
              <Row>
                <Text allowFontScaling={false} style={styles.cardPanCode}>
                  ****
                </Text>
                <Text allowFontScaling={false} style={styles.cardPanCode}>
                  ****
                </Text>
                <Text allowFontScaling={false} style={styles.cardPanCode}>
                  ****
                </Text>
                <Text allowFontScaling={false} style={styles.cardPanCode}>
                  {userInfo?.personal_information?.pan.slice(
                    userInfo?.personal_information?.pan.length - 4,
                    userInfo?.personal_information?.pan.length,
                  )}
                </Text>
              </Row>

              <Row style={styles.cardRow}>
                <Text allowFontScaling={false} style={styles.cardText}>
                  {t('Valid until')}: **/**
                </Text>
                <Text allowFontScaling={false} style={styles.cardText}>
                  CVV: ***
                </Text>
                <Pressable onPress={() => dispatch(deleteBankCard())}>
                  <DeleteSvg width={RW(25)} height={RH(30)} color="#fff" />
                </Pressable>
              </Row>
            </LinearGradient>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: RW(15),
    paddingTop: RH(30),
  },
  title: {
    ...font('medium', 22),
    marginBottom: RH(40),
    alignSelf: 'center',
  },
  userName: {
    ...font('medium', 18),
    marginTop: RH(10),
    marginBottom: RH(50),
    alignSelf: 'center',
  },
  row: {
    width: '100%',
    marginBottom: RH(20),
  },
  editRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: RW(6),
  },
  editRowText: {
    ...font('regular', 16),
    padding: 0,
    margin: 0,
    height: RH(22),
  },
  changePasswordTitle: {
    alignSelf: 'flex-start',
    marginVertical: RH(15),
    ...font('medium', 18),
  },
  input: {
    marginBottom: RH(15),
  },
  saveBtn: {
    marginBottom: RH(10),
  },
  notificationText: font('regular', 14),
  cardTitle: font('medium', 18),
  cardMain: {
    height: RH(180),
    width: '100%',
    borderRadius: RW(10),
    overflow: 'hidden',
    marginTop: RH(15),
  },
  linearGradient: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: RW(23),
    paddingVertical: RH(15),
  },
  cardRow: {
    width: '100%',
    alignItems: 'flex-end',
  },
  cardPanCode: {
    ...font('medium', 25, '#fff'),
    lineHeight: RH(30),
  },
  cardText: {
    ...font('medium', 10, '#fff'),
  },
});

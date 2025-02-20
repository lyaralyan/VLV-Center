import {Linking, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../theme/colors';
import LogoSvg from '../../assets/SVG/LogoSvg';
import PhoneSvg from '../Header/assets/PhoneSvg';
import {RH, RW, font} from '../../theme/utils';
import FacebookSvg from './assets/FacebookSvg';
import InstagramSvg from './assets/InstagramSvg';
import WhatsappSvg from './assets/WhatsappSvg';
import ViberSvg from './assets/ViberSvg';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import LogoEnSvg from '@assets/SVG/LogoEnSvg';

export default function Footer() {
  const currentLanguage = useSelector(({main}) => main.currentLanguage);
  const navigation = useNavigation();
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.logoBlock}>
          {currentLanguage == 'hy' ? (
            <LogoSvg height={RH(40)} />
          ) : (
            <LogoEnSvg height={RH(40)} />
          )}

          <Pressable
            onPress={() => Linking.openURL(`tel:010349944`)}
            style={styles.phoneBtn}>
            <PhoneSvg height={14} width={14} />
            <Text allowFontScaling={false} style={styles.phoneText}>
              010-34-99-44
            </Text>
          </Pressable>
        </View>
        <View style={styles.menusBlock}>
          <View style={styles.menusRow}>
            <Pressable
              style={styles.menuBtn}
              onPress={() => {
                navigation.navigate('AboutUs');
              }}>
              <Text allowFontScaling={false} style={styles.menuText}>
                {t('about_us')}
              </Text>
            </Pressable>
            <Pressable
              style={styles.menuBtn}
              onPress={() => {
                navigation.navigate('Contact');
              }}>
              <Text allowFontScaling={false} style={styles.menuText}>
                {t('our_stores')}
              </Text>
            </Pressable>
            <Pressable
              style={styles.menuBtn}
              onPress={() => {
                navigation.navigate('Sales');
              }}>
              <Text allowFontScaling={false} style={styles.menuText}>
                {t('promotions')}
              </Text>
            </Pressable>
            <Pressable
              style={styles.menuBtn}
              onPress={() => {
                navigation.navigate('Payment');
              }}>
              <Text allowFontScaling={false} style={styles.menuText}>
                {t('payment')}
              </Text>
            </Pressable>
            <Pressable
              style={styles.menuBtn}
              onPress={() => {
                navigation.navigate('Credit');
              }}>
              <Text allowFontScaling={false} style={styles.menuText}>
                {t('credit')}
              </Text>
            </Pressable>
          </View>
          <View style={styles.menusRow}>
            <Pressable
              style={styles.menuBtn}
              onPress={() => {
                navigation.navigate('FAQ');
              }}>
              <Text allowFontScaling={false} style={styles.menuText}>
                {t('faq')}
              </Text>
            </Pressable>
            <Pressable
              style={styles.menuBtn}
              onPress={() => {
                navigation.navigate('Job');
              }}>
              <Text allowFontScaling={false} style={styles.menuText}>
                {t('jobo')}
              </Text>
            </Pressable>
            <Pressable style={styles.menuBtn}>
              <Text
                style={styles.menuText}
                onPress={() => {
                  navigation.navigate('Delivery');
                }}>
                {t('delivery')}
              </Text>
            </Pressable>
            <Pressable
              style={styles.menuBtn}
              onPress={() => {
                navigation.navigate('Service');
              }}>
              <Text allowFontScaling={false} style={styles.menuText}>
                {t('Service')}
              </Text>
            </Pressable>
            <Pressable
              style={styles.menuBtn}
              onPress={() => {
                navigation.navigate('Privacy');
              }}>
              <Text allowFontScaling={false} style={styles.menuText}>
                {t('pravicy_policy')}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.socIcons}>
        <Pressable
          style={styles.socIconBtn}
          onPress={() =>
            Linking.openURL(
              'https://www.facebook.com/people/VLV_Electronics/100086233453767/',
            )
          }>
          <FacebookSvg />
        </Pressable>
        <Pressable
          style={styles.socIconBtn}
          onPress={() =>
            Linking.openURL('https://www.instagram.com/vlv_electronics/')
          }>
          <InstagramSvg />
        </Pressable>
        <Pressable
          style={styles.socIconBtn}
          onPress={() => Linking.openURL('https://wa.me/' + '+37491296655')}>
          <WhatsappSvg />
        </Pressable>
        <Pressable
          style={styles.socIconBtn}
          onPress={() =>
            Linking.openURL('viber://chat?number=' + '+37491296655')
          }>
          <ViberSvg />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.bgGray,
    paddingVertical: RH(20),
  },
  logoBlock: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneBtn: {
    flexDirection: 'row',
    columnGap: RW(6),
    marginTop: RH(15),
    marginBottom: RH(20),
  },
  phoneText: {
    ...font('regular', 12),
    lineHeight: RH(14),
  },
  menusBlock: {
    flexDirection: 'row',
    paddingHorizontal: RW(70),
    justifyContent: 'space-between',
  },
  menusRow: {
    rowGap: RH(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    ...font('regular', 12),
  },
  socIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: RH(13),
    columnGap: RW(20),
  },
  socIconBtn: {
    width: RW(40),
    height: RW(40),
    borderColor: 'rgba(40, 40, 40, 0.25)',
    borderWidth: RW(1),
    borderRadius: RW(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

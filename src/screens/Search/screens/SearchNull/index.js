/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '@components/InnerHeader';
import {useTranslation} from 'react-i18next';
import {RH, RW, font} from '@theme/utils';
import FastImage from 'react-native-fast-image';
import Colors from '@theme/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const SearchNull = () => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
      }}>
      <Header title={t('search')} profile />
      <View style={styles.main}>
        <FastImage
          style={styles.img}
          source={require('./assets/search_null.jpg')}
        />
        <Text allowFontScaling={false} style={styles.title}>
          {t('no_data')}
        </Text>
        <Text allowFontScaling={false} style={styles.subTitle}>
          {t('NOTHING WAS FOUND FOR YOUR QUERY')}
        </Text>
      </View>
    </View>
  );
};

export default SearchNull;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: RW(240),
    height: RH(170),
  },
  title: {
    ...font('bold', 22),
    marginTop: RH(30),
    marginBottom: RH(38),
  },
  subTitle: {
    ...font('regular', 16),
    textAlign: 'center',
    marginHorizontal: RW(24),
  },
  btn: {
    paddingHorizontal: RW(15),
    paddingVertical: RH(10),
    borderRadius: RW(4),
    backgroundColor: Colors.red,
    marginTop: RH(60),
  },
  btnText: font('regular', 12, '#fff'),
});

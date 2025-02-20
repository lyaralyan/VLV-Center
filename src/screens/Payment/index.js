import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '@components/Header';
import HeaderCategories from '@components/HeaderCategories';
import SearchInput from '@screens/Home/components/SearchInputNew/SearchInput';
import {RH, RW, font} from '@theme/utils';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {SvgUri} from 'react-native-svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Payment = () => {
  const currentLanguage = useSelector(({main}) => main.currentLanguage);
  const data = [
    {
      img: 'https://vlv.am/public/payment_gateway/cache.png',
      text: {
        hy: 'ՎՃԱՐԵԼ ՏԵՂՈՒՄ ԿԱՆԽԻԿ ԿԱՄ ԲԱՆԿԱՅԻՆ ՔԱՐՏՈՎ',
        ru: 'ОПЛАТА НА МЕСТЕ НАЛИЧНЫМИ ИЛИ БАНКОВСКОЙ КАРТОЙ',
        en: 'PAY ON THE SPOT BY CASH OR BANK CARD',
      },
    },
    {
      img: 'https://vlv.am/public/payment_gateway/idram.png',
      text: {
        hy: 'ԻԴՐԱՄ',
        ru: 'ИДРАМ:',
        en: 'IDRAM',
      },
    },
    {
      img: 'https://vlv.am/public/payment_gateway/telcell.png',
      text: {
        hy: 'TELCELL ԴՐԱՄԱՊԱՆԱԿ',
        ru: 'TELCELL КОШЕЛЕК',
        en: 'TELCELL WALLET ',
      },
    },
    {
      svg: 'https://vlv.am/public/payment_gateway/express_mir.svg',
      text: {
        hy: 'AMERICAN EXPRESS & MIR',
        ru: 'АМЕРИКАН ЭКСПРЕСС И МИР',
        en: 'AMERICAN EXPRESS & MIR',
      },
    },
    {
      img: 'https://vlv.am/public/payment_gateway/online_aparic.png',
      text: {
        hy: 'ՕՆԼԱՅՆ ԱՊԱՌԻԿ',
        ru: 'ОНЛАЙН КРЕДИТ',
        en: 'ONLINE CREDIT',
      },
    },
    {
      img: 'https://vlv.am/public/payment_gateway/bank_cart.png',
      text: {
        hy: 'ԲԱՆԿԱՅԻՆ ՔԱՐՏՈՎ',
        ru: 'БАНКОВСКОЙ КАРТОЙ',
        en: 'BY BANK CARD',
      },
    },
    {
      img: 'https://vlv.am/public/payment_gateway/invoice.png',
      text: {
        hy: 'ՎՃԱՐԵԼ ՀԱՇՎԻ ԱՊՐԱՆՔԱԳՐՈՎ',
        ru: 'ОПЛАТА ПО ЧЕКУ',
        en: 'PAY BY RECEIPT',
      },
    },
    {
      img: 'https://vlv.am/public/payment_gateway/bonus.png',
      text: {
        hy: 'ՎՃԱՐՈՒՄ ԲՈՆՈՒՍՆԵՐՈՎ',
        ru: 'ОПЛАТА БОНУСАМИ',
        en: 'PAYMENT WITH BONUSES',
      },
    },
    {
      img: 'https://vlv.am/public/payment_gateway/easypay.png',
      text: {
        hy: 'EASY PAY',
        ru: 'EASY PAY',
        en: 'EASY PAY',
      },
    },
  ];
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.container, {paddingTop: insets.top}]}
      contentContainerStyle={{
        paddingBottom: RH(140),
      }}
      showsVerticalScrollIndicator={false}>
      <Header />
      <HeaderCategories />
      <SearchInput />
      <View style={styles.wrapper}>
        <FastImage
          style={styles.banner}
          source={
            currentLanguage === 'en'
              ? require('./assets/paymentEn.png')
              : currentLanguage === 'ru'
                ? require('./assets/paymentRu.png')
                : require('./assets/paymentAm.png')
          }
        />
      </View>
      <View style={styles.main}>
        {data.map((item, index) => (
          <View style={styles.item} key={index}>
            {item.img ? (
              <FastImage
                resizeMode="contain"
                style={styles.itemImg}
                source={{uri: item.img}}
              />
            ) : (
              <SvgUri style={styles.itemImg} uri={item.svg} />
            )}

            <Text allowFontScaling={false} style={styles.itemText}>
              {item?.text?.[currentLanguage]}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: RW(16),
  },
  banner: {
    width: '100%',
    height: 'auto',
    aspectRatio: '3.2/1',
  },
  main: {
    paddingHorizontal: RW(16),
    paddingVertical: RH(20),
    backgroundColor: '#f7f7fb',
    marginTop: RH(20),
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: RW(10),
  },
  item: {
    width: RW(170),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: RW(10),
  },
  itemImg: {
    width: RW(100),
    height: RH(50),
  },
  itemText: {
    ...font('medium', 10),
    textAlign: 'center',
    marginTop: RH(10),
  },
});

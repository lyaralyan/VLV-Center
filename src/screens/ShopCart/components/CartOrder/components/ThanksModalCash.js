import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {RH, RW, font} from '@theme/utils';
import Button from '@components/Button/Button';
import {useTranslation} from 'react-i18next';
import Colors from '@theme/colors';

const ThanksModalCash = props => {
  const {t} = useTranslation();
  const {data} = props;

  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={require('../assets/cart/ThanksSuccess.png')}
      />
      <Text allowFontScaling={false} style={styles.text1}>
        {t('thanks')}
      </Text>
      {/* <Text allowFontScaling={false} style={styles.text2}>
        {t('order_alert_text')}
      </Text> */}
      <View style={styles.dataWrapper}>
        <View style={styles.itemWrapper}>
          <Text>{data?.date}</Text>
        </View>
        <View style={styles.itemWrapper}>
          <Text style={styles.halfBox} numberOfLines={1}>
            Պատվեր №
          </Text>
          <Text style={styles.halfBox} numberOfLines={1}>
            {data?.order_number}
          </Text>
        </View>
        <View style={styles.itemWrapper}>
          <Text style={styles.halfBox} numberOfLines={1}>
            Ստացող
          </Text>
          <Text style={styles.halfBox} numberOfLines={1}>
            {data?.order?.address?.shipping_name}
          </Text>
        </View>
        <View style={styles.itemWrapper}>
          <Text style={styles.halfBox} numberOfLines={1}>
            Հեառախոսահամար
          </Text>
          <Text style={styles.halfBox} numberOfLines={1}>
            {data?.order?.address?.shipping_phone}
          </Text>
        </View>
        <View style={styles.itemWrapper}>
          <Text style={styles.halfBox} numberOfLines={1}>
            էլ. հասցե
          </Text>
          <Text style={styles.halfBox} numberOfLines={1}>
            {data?.order?.address?.billing_email}
          </Text>
        </View>
        <View style={styles.itemWrapper}>
          <Text style={styles.halfBox} numberOfLines={1}>
            հասցե
          </Text>
          <Text style={styles.halfBox} numberOfLines={1}>
            {data?.adress}
          </Text>
        </View>
        <View style={styles.itemWrapper}>
          <Text style={styles.halfBox} numberOfLines={1}>
            Վճարման տեսակ
          </Text>
          <Text style={styles.halfBox} numberOfLines={1}>
            {data?.pay_type}
          </Text>
        </View>
      </View>
      <View style={styles.dataWrapper}>
        <View style={styles.itemWrapper}>
          <View>
            <View style={styles.row}>
              <Text style={styles.total}>Ապրանքի քանակ</Text>
              <View style={styles.countParent}>
                <Text style={[styles.count]}>{data?.count}</Text>
              </View>
            </View>
            <Image
              style={styles.image}
              source={require('../assets/Group2.png')}
            />
          </View>
          <View>
            <Text style={styles.total}>Ընդհանուր</Text>
            <Text style={styles.grand_total}>{data?.grand_total}</Text>
          </View>
        </View>
      </View>
      <Button
        style={styles.btn}
        onPress={props?.dismiss}
        text={t('to_close')}
      />
    </View>
  );
};

export default ThanksModalCash;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: RW(360),
    padding: RW(20),
    alignItems: 'center',
  },
  img: {
    width: 135,
    height: 150,
    marginBottom: 10,
  },
  text1: {...font('bold', 20), textTransform: 'uppercase'},
  text2: {
    ...font('regular', 14),
    textAlign: 'center',
    marginVertical: RH(15),
  },
  dataWrapper: {
    width: '100%',
    borderWidth: 0.54,
    borderColor: '#2828281A',
    borderStyle: 'dashed',
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  itemWrapper: {
    width: '100%',
    borderBottomWidth: 1,
    borderBlockColor: '#2828281A',
    backgroundColor: '#F7F7FB',
    paddingHorizontal: 20,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  halfBox: {
    maxWidth: '50%',
  },
  total: {
    color: '#28282866',
    ...font('bold', 8.6),
  },
  countParent: {
    backgroundColor: Colors.red,
    borderRadius: 50,
    minWidth: 15,
    minHeight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    ...font('bold', 8.6),
    color: '#fff',
  },
  grand_total: {
    ...font('bold', 16.12),
  },
  image: {
    width: 90,
    height: 28,
  },
  row: {
    flexDirection: 'row',
    gap: 5,
    marginBottom: 5,
    alignItems: 'center',
  },
});

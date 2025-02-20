import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Image from '@components/Image';
import {RH, RW, font} from '@theme/utils';
import Button from '@components/Button/Button';
import {useTranslation} from 'react-i18next';

const ThanksModal = props => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Image style={styles.img} url={'img/order_alert.png'} />
      <Text allowFontScaling={false} style={styles.text1}>
        {t('ushadrutyun')}
      </Text>
      <Text allowFontScaling={false} style={styles.text2}>
        {t('order_alert_text')}
      </Text>
      <Button
        style={styles.btn}
        onPress={props?.dismiss}
        text={t('to_close')}
      />
    </View>
  );
};

export default ThanksModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: RW(360),
    padding: RW(20),
    alignItems: 'center',
  },
  img: {
    width: RW(200),
    height: RH(200),
    marginBottom: RH(10),
  },
  text1: font('medium', 20),
  text2: {
    ...font('regular', 14),
    textAlign: 'center',
    marginVertical: RH(15),
  },
});

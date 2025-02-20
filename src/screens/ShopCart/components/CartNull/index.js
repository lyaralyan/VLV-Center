import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ShopCartSvg from '@screens/ShopCart/assets/ShopCartSvg';
import Row from '@theme/wrappers/row';
import Button from '@components/Button/Button';
import {RH, RW, font} from '@theme/utils';
import Colors from '@theme/colors';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';

const CartNull = ({length}) => {
  const navigation = useNavigation();
  const userId = useSelector(({user}) => user.userId);
  const {t} = useTranslation();
  return (
    <View style={styles.main}>
      {userId ? (
        <ShopCartSvg />
      ) : (
        <FastImage
          resizeMode="contain"
          style={{
            width: RW(300),
            height: RH(180),
          }}
          source={require('../../assets/NoAuthImage.png')}
        />
      )}

      <Text allowFontScaling={false} style={styles.text}>
        {userId
          ? t('cart_is_empty')
          : t('for_purchases_please_log_in_or_register')}
      </Text>
      {!userId && (
        <Row style={styles.btnsContainer}>
          <Button
            style={{width: RW(178), marginRight: RW(5)}}
            text={t('Login')}
            onPress={() =>
              navigation.navigate('Login', {
                redirectToCart: !!length,
              })
            }
          />
          <Button
            style={{width: RW(178)}}
            red={false}
            text={t('register')}
            onPress={() =>
              navigation.navigate('SignUp', {
                redirectToCart: !!length,
              })
            }
          />
        </Row>
      )}
    </View>
  );
};

export default CartNull;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: RH(772),
  },
  text: {
    ...font('bold', 22, Colors.black),
    marginTop: RH(50),
    textAlign: 'center',
  },
  btnsContainer: {
    position: 'absolute',
    bottom: RH(100),
  },
});

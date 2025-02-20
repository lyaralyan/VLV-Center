import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '@theme/colors';
import {useDispatch, useSelector} from 'react-redux';
import ProductCard from '@components/ProductCard';
import {RH, RW, font} from '@theme/utils';
import FastImage from 'react-native-fast-image';
import StoreSvg from '@assets/SVG/StoreSvg';
import {useNavigation} from '@react-navigation/native';
import {
  addCardStore,
  addCardStoreProducts,
  getCartPageProducts,
} from '@store/CartSlice';
import Toast from 'react-native-toast-message';
import {getHomeActionPrice, setPending} from '@store/MainSlice';
import {useTranslation} from 'react-i18next';
import {USER_ID} from '@store/UserSlice';

const BuyTwoGetOneGift = () => {
  const buyTwoGetOneGift = useSelector(({main}) => main.buyTwoGetOneGift);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {t} = useTranslation();
  if (!Object.keys(buyTwoGetOneGift || {}).length || buyTwoGetOneGift.error) {
    return null;
  }
  const handelSubmit = async () => {
    try {
      if (USER_ID) {
        dispatch(setPending(true));
        const productsArray =
          buyTwoGetOneGift?.products?.map(product => ({
            product_id: product?.skus?.[0]?.id,
            seller_id: 1,
            qty: 1,
            section: 2,
            page: 0,
            price:
              product?.promo_price ||
              +(product?.online_price && product?.online_selling_price) ||
              product?.skus[0]?.selling_price,
            shipping_method_id: 0,
            type: 'product',
            is_buy_now: 'yes',
          })) || [];

        await dispatch(addCardStoreProducts(productsArray));

        let ids =
          buyTwoGetOneGift?.products?.[0]?.seller_product_id +
          ',' +
          buyTwoGetOneGift?.products?.[1]?.seller_product_id +
          ',' +
          buyTwoGetOneGift?.products?.[2]?.seller_product_id;
        dispatch(
          getHomeActionPrice(ids, e => {
            dispatch(
              getCartPageProducts(() => {
                navigation.navigate('CartOrder', {
                  price: e.total,
                  discount: e.discount,
                });
                dispatch(setPending(false));
              }),
            );
          }),
        );
      } else {
        navigation.navigate('Login');
      }
    } catch {
      dispatch(setPending(false));
      Toast.show({
        type: 'error',
        text1: t('error_message'),
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text allowFontScaling={false} style={styles.title}>
          {t('buy2')}{' '}
          <Text
            allowFontScaling={false}
            style={[styles.title, {color: Colors.red}]}>
            2 {t('Product2')}
          </Text>
        </Text>
        <Text
          allowFontScaling={false}
          style={[styles.title, {alignSelf: 'flex-end'}]}>
          {t('get_a_product') + ' '}
          <Text
            allowFontScaling={false}
            style={[styles.title, {color: Colors.red}]}>
            {t('by_gif')}
          </Text>
        </Text>
        <View style={styles.main}>
          <ProductCard
            containerStyle={{
              transform: 'rotate(-11deg)',
              bottom: RH(5),
              left: RW(7),
            }}
            smallProduct
            singleImage
            product={buyTwoGetOneGift?.products?.[0]}
          />
          <FastImage
            style={[styles.plusImg, {left: RW(80), top: RH(55)}]}
            resizeMode="contain"
            source={require('./assets/plus.png')}
          />
          <ProductCard
            containerStyle={{transform: 'rotate(6deg)', right: RW(7)}}
            singleImage
            smallProduct
            product={buyTwoGetOneGift?.products?.[1]}
          />
          <FastImage
            style={[styles.equalImg, {left: RW(200), top: RH(55)}]}
            resizeMode="contain"
            source={require('./assets/equal.png')}
          />
          <ProductCard
            singleImage
            smallProduct
            product={buyTwoGetOneGift?.products?.[2]}
          />
          <View></View>
        </View>
      </View>
      <View style={styles.btnBlock}>
        <Pressable
          style={({pressed}) => [
            styles.btn,
            {backgroundColor: pressed ? Colors.darkRed : Colors.red},
          ]}
          onPress={handelSubmit}>
          <StoreSvg />
          <Text allowFontScaling={false} style={styles.btnText}>
            {t('by_nou')}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default BuyTwoGetOneGift;

const styles = StyleSheet.create({
  container: {
    marginBottom: RH(15),
  },
  wrapper: {
    paddingHorizontal: RW(22),
  },
  title: {
    ...font('bold', 22),
    textTransform: 'uppercase',
    marginHorizontal: RW(21),
  },
  main: {
    flexDirection: 'row',
    paddingTop: RH(15),
    paddingBottom: RH(40),
  },
  plusImg: {
    width: RW(52),
    height: RH(52),
    position: 'absolute',
    zIndex: 2,
  },
  equalImg: {
    width: RW(48),
    height: RH(48),
    position: 'absolute',
    zIndex: 2,
  },
  btnBlock: {
    paddingBottom: RH(15),
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    paddingVertical: RH(10),
    width: RW(180),
    justifyContent: 'center',
    borderRadius: RW(4),
    columnGap: RW(8),
  },
  btnText: font('regular', 12, '#fff'),
});

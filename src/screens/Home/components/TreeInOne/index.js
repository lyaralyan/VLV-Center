import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RH, RW, font} from '@theme/utils';
import Row from '@theme/wrappers/row';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import Image from '@components/Image';
import Colors from '@theme/colors';
import {USER_ID, _TOKEN} from '@store/UserSlice';
import StoreSvg from '@assets/SVG/StoreSvg';
import {useNavigation} from '@react-navigation/native';
import {
  addCardStore,
  addCardStoreProducts,
  getCartPageProducts,
} from '@store/CartSlice';
import axios from 'axios';
import {setPending} from '@store/MainSlice';
import Toast from 'react-native-toast-message';
import {useTranslation} from 'react-i18next';

const threeInOne = () => {
  const threeInOne = useSelector(({main}) => main.threeInOne);

  const sequence = [1, 2, 3, 2, 3, 1, 3, 1, 2];

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handelSubmit = async () => {
    try {
      if (USER_ID) {
        dispatch(setPending(true));
        const productsArray =
          threeInOne?.products?.map(product => ({
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

        dispatch(addCardStoreProducts(productsArray));
        setTimeout(async () => {
          await axios
            .post('https://vlv.am/getThreeInOnePrice', {
              _token: _TOKEN,
              id: 1,
            })
            .then(e => {
              dispatch(getCartPageProducts());
              navigation.navigate('CartOrder', {
                price: e.data.total,
              });
            });
        }, 1);
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

  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <Row>
        <FastImage
          style={styles.banner}
          source={require('./assets/banner.png')}
        />
        <View style={styles.products}>
          {sequence.map((number, index) => (
            <View key={index} style={styles.item}>
              <View
                style={[
                  styles.circle,
                  {
                    top: threeInOne?.threeInOne?.['img_' + number + '_x']
                      ? threeInOne?.threeInOne?.['img_' + number + '_x'] / 2 +
                        '%'
                      : undefined,
                    left: threeInOne?.threeInOne?.['img_' + number + '_y']
                      ? threeInOne?.threeInOne?.['img_' + number + '_y'] + '%'
                      : undefined,
                    opacity: index == 0 || index == 4 || index == 8 ? 1 : 0,
                  },
                ]}>
                <View style={styles.miniCircle} />
              </View>

              <Image
                style={styles.img}
                url={
                  threeInOne?.products?.[number]?.product
                    ?.gallary_images_api?.[0]?.thum_image_sourc
                }
              />
            </View>
          ))}
        </View>
      </Row>
      <View style={styles.btnBlock}>
        <Pressable style={styles.btn} onPress={handelSubmit}>
          <StoreSvg />
          <Text allowFontScaling={false} style={styles.btnText}>
            {t('by_nou')}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default threeInOne;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(247, 247, 251, 1)',
    paddingHorizontal: RW(16),
    paddingVertical: RH(15),
  },
  banner: {
    width: RW(140),
    height: RH(200),
    borderRadius: RW(10),
    marginRight: RW(13),
  },
  products: {
    width: RW(240),
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: RW(5),
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: RW(10),
    width: RW(70),
    height: RH(65),
    overflow: 'hidden',
  },
  img: {
    width: RW(65),
    height: RH(65),
    top: RH(-10),
  },
  circle: {
    width: RW(10),
    height: RW(10),
    borderRadius: RW(5),
    backgroundColor: 'rgb(236, 236, 236)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  miniCircle: {
    width: RW(9),
    height: RW(9),
    borderRadius: RW(4),
    borderColor: Colors.red,
    borderWidth: RW(3),
  },
  btnBlock: {
    paddingTop: RH(20),
    alignItems: 'center',
  },
  btn: {
    backgroundColor: Colors.red,
    flexDirection: 'row',
    paddingVertical: RH(10),
    width: RW(180),
    justifyContent: 'center',
    borderRadius: RW(4),
    columnGap: RW(8),
  },
  btnText: font('regular', 12, '#fff'),
});

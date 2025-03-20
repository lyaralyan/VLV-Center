import React, {memo, useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Row from '@theme/wrappers/row';
import Image from '@components/Image';
import {RH, RW, font} from '@theme/utils';
import {useDispatch, useSelector} from 'react-redux';
import MinusSvg from '@assets/SVG/MinusSvg';
import PlusSvg from '@assets/SVG/PlusSvg';
import Colors from '@theme/colors';
import DeleteSvg from '@assets/SVG/DeleteSvg';
import UseCalcPrice from '@helpers/UseCalcPrice';
import ToggleSwitch from '@components/ToggleSwitch';
import {
  changeInstalling,
  getCartPageProducts,
  removeCartProduct,
  setCartCount,
  setCartPageDelete,
  setCartPageUpdateQty,
  setDiscountTotalPrice,
  setTotalPrice,
} from '@store/CartSlice';
import {useTranslation} from 'react-i18next';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import useProductPrice from '@helpers/useProductPrice';
import FastImage from 'react-native-fast-image';

const CartProduct = ({product}) => {
  const [count, setCount] = useState(product?.qty || 1);
  const [installingCount, setInstallingCount] = useState(
    product?.installing_count || 0,
  );
  const [withInstalling, setWithInstalling] = useState(!!product?.installing);
  const {currentLanguage, currentCurrency} = useSelector(({main}) => main);
  const {totalPrice, discountTotalPrice, cartCount} = useSelector(
    ({cart}) => cart,
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {t} = useTranslation();
  const isFocused = useIsFocused();
  const calculatePrice = useProductPrice();

  useEffect(() => {
    if (isFocused && typeof product !== 'object') {
      dispatch(getCartPageProducts());
    }
  }, [dispatch, isFocused, product]);

  // Calculate promo and discounted price
  const promoPrice =
    product?.seller_product?.promo_price ||
    product?.seller_product?.recommended_retail_price ||
    product?.seller_product?.skus?.[0]?.selling_price;
  const selling_price = product?.seller_product?.skus?.[0]?.selling_price;

  const {finalPrice, appliedDiscount, isDiscountApplied} = calculatePrice({
    product_id: product?.seller_product?.product_id,
    category_id: product?.seller_product?.categories?.[0]?.id,
    brand_id: product?.seller_product?.product?.brand?.id,
    price: promoPrice,
    promoPrice,
  });

  const discount = promoPrice - finalPrice;

  // Handle delete press
  const handleDeletePress = () => {
    dispatch(setCartCount(cartCount - count));
    dispatch(setCartPageDelete({id: product.cart_id}));
    dispatch(removeCartProduct(product));
    dispatch(setDiscountTotalPrice(discountTotalPrice - count * discount));
    dispatch(setTotalPrice(totalPrice - count * promoPrice));
  };

  // Handle quantity change
  const handleQuantityChange = type => {
    const newCount = type === '+' ? count + 1 : count - 1;
    if (newCount < 1) {
      return;
    }

    setCount(newCount);
    dispatch(setCartCount(type === '+' ? cartCount + 1 : cartCount - 1));
    dispatch(
      setCartPageUpdateQty({
        type,
        id: product?.cart_id,
        qty: newCount,
      }),
    );

    const priceChange = type === '+' ? finalPrice : -finalPrice;
    dispatch(setDiscountTotalPrice(discountTotalPrice + priceChange));
    dispatch(setTotalPrice(totalPrice + priceChange));

    if (withInstalling) {
      setInstallingCount(newCount);
    }
  };

  const price =
    product?.seller_product?.pricing ?? product?.seller_product?.skus?.[0];

  return (
    <Row style={styles.container}>
      {/* Product Image */}
      <Pressable
        onPress={() =>
          navigation.navigate('ProductPage', {
            productId: product.seller_product?.id,
          })
        }>
        <Image
          url={
            product?.seller_product?.product?.gallary_images_api?.[0]
              ?.images_source
          }
          style={styles.img}
        />
      </Pressable>

      {isDiscountApplied && (
        <View
          style={[
            styles.mobileDiscount,
            typeof onDeletePress === 'function' && {top: RH(25)},
          ]}>
          <FastImage
            style={styles.mobileDiscountImg}
            resizeMode="contain"
            source={require('../../../../assets/mobile_discount.png')}
          />
          <Text allowFontScaling={false} style={styles.mobileDiscountText}>
            -{UseCalcPrice(appliedDiscount, currentCurrency)}
            {'\n'}
            {t('discount')}
          </Text>
        </View>
      )}

      {/* Product Info */}
      <View style={styles.infoBlock}>
        <Row>
          <View>
            <Pressable
              onPress={() =>
                navigation.navigate('ProductPage', {
                  productId: product.seller_product?.id,
                })
              }>
              <Image
                url={product?.seller_product?.product?.brand?.logo}
                style={styles.brand}
                withoutDefault
              />
              <Text allowFontScaling={false} style={styles.category}>
                {
                  product?.seller_product?.categories?.[0]?.[
                    'name_' + currentLanguage
                  ]
                }
              </Text>
              <Text allowFontScaling={false} style={styles.productName}>
                {product?.seller_product?.product?.brand?.name +
                  ' ' +
                  product?.seller_product?.product?.product_name}
              </Text>
            </Pressable>
          </View>
          <Pressable onPress={handleDeletePress} style={styles.pressable}>
            <DeleteSvg />
          </Pressable>
        </Row>

        {/* Installing Price Section */}
        {!!product?.seller_product?.product?.installing_price && (
          <Row style={styles.row}>
            <Row>
              <Text allowFontScaling={false} style={styles.installingText}>
                {t('installing')}
              </Text>
              <Text allowFontScaling={false} style={styles.installingPrice}>
                {UseCalcPrice(
                  product?.seller_product?.product?.installing_price,
                  currentCurrency,
                )}
              </Text>
            </Row>
            <ToggleSwitch
              value={withInstalling}
              setValue={value => {
                setWithInstalling(value);
                dispatch(
                  changeInstalling({
                    id: product?.cart_id,
                    installement: +value,
                  }),
                );
              }}
            />
          </Row>
        )}

        {/* Quantity and Price Section */}
        <Row>
          {/* Quantity Control */}
          <Row style={styles.countBlock}>
            <Pressable
              style={styles.minusBtn}
              onPress={() => handleQuantityChange('-')}>
              <MinusSvg />
            </Pressable>
            <Text allowFontScaling={false} style={styles.countText}>
              {count}
            </Text>
            <Pressable
              style={styles.minusBtn}
              onPress={() => handleQuantityChange('+')}>
              <PlusSvg />
            </Pressable>
          </Row>

          {/* Price Display */}
          <View>
            {finalPrice < selling_price ? (
              <View>
                <Text allowFontScaling={false} style={styles.selingPrice}>
                  {UseCalcPrice(selling_price, currentCurrency)}
                </Text>
                <View style={styles.selingPriceLine} />
                <Text allowFontScaling={false} style={styles.promoPrice}>
                  {UseCalcPrice(finalPrice, currentCurrency)}
                </Text>
              </View>
            ) : (
              <Text allowFontScaling={false} style={styles.price}>
                {UseCalcPrice(finalPrice, currentCurrency)}
              </Text>
            )}
          </View>
        </Row>
      </View>
    </Row>
  );
};

export default memo(CartProduct);

const styles = StyleSheet.create({
  container: {},
  img: {
    width: RW(80),
    height: RW(80),
  },
  infoBlock: {
    flex: 1,
    paddingLeft: RW(10),
  },
  brand: {
    height: RH(22),
    width: RW(30),
  },
  category: font('regular', 10, 'rgba(40, 40, 40, 0.60)'),
  productName: {
    ...font('regular', 12),
    marginTop: RH(3),
  },
  countBlock: {
    marginTop: RH(10),
  },
  minusBtn: {
    width: RW(35),
    height: RW(35),
    borderRadius: RW(4),
    borderColor: 'rgba(40, 40, 40, 0.2)',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    paddingHorizontal: RW(14),
    ...font('regular', 14),
  },
  promoPrice: {
    ...font('bold', 12, Colors.red),
    marginRight: RW(10),
  },
  selingPrice: {
    ...font('bold', 10),
  },
  price: {
    ...font('bold', 12),
  },
  selingPriceLine: {
    width: '100%',
    position: 'absolute',
    borderBottomColor: Colors.red,
    borderBottomWidth: 1,
    top: RH(5.8),
    transform: 'rotate(-7deg)',
    left: 0,
  },
  installingText: {
    ...font('regular', 12, 'rgba(40, 40, 40, 0.6)'),
    marginRight: RW(5),
    textTransform: 'uppercase',
  },
  installingPrice: font('bold', 14),
  mobileDiscount: {
    width: RW(48),
    height: RW(48),
    position: 'absolute',
    left: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mobileDiscountImg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  mobileDiscountText: {
    ...font('bold', 6, '#fff'),
    textAlign: 'center',
  },
  row: {
    alignItems: 'flex-start',
    paddingVertical: RH(10),
  },
  pressable: {
    alignSelf: 'flex-start',
  },
});

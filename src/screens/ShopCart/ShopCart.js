import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import Header from '@components/InnerHeader';
import CartNull from './components/CartNull';
import {useDispatch, useSelector} from 'react-redux';
import Cart from './components/Cart';
import {useTranslation} from 'react-i18next';
import {getCartPageProducts} from '@store/CartSlice';
import {RH, RW, font} from '@theme/utils';
import Button from '@components/Button/Button';
import {useNavigation} from '@react-navigation/native';
import UseCalcPrice from '@helpers/UseCalcPrice';
import Colors from '@theme/colors';
import Row from '@theme/wrappers/row';
import DashedLine from 'react-native-dashed-line';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useProductPrice from '@helpers/useProductPrice';

const ShopCart = () => {
  const {cartProducts, totalPrice, cartCount} = useSelector(({cart}) => cart);
  const currentCurrency = useSelector(({main}) => main.currentCurrency || '');
  const userId = useSelector(({user}) => user.userId || null);
  const calculatePrice = useProductPrice();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [isFirstCall, setIsFirstCall] = useState(true);

  useEffect(() => {
    const fetchCartData = async () => {
      if (isFirstCall) {
        // First call with withLoader = true
        await dispatch(getCartPageProducts(() => {}, true));
        setIsFirstCall(false);
      } else {
        // Subsequent calls with withLoader = false
        await dispatch(getCartPageProducts(() => {}, false));
      }
    };
    fetchCartData();
  }, [dispatch, cartCount, isFirstCall]);

  const totalDiscountedAmount = useMemo(() => {
    return cartProducts.reduce((totalDiscount, product) => {
      const qty = product?.qty || 1;
      const basePrice = product?.seller_product?.skus?.[0]?.selling_price || 0;
      const promoPrice = product?.seller_product?.promo_price || basePrice;

      const {finalPrice} = calculatePrice({
        product_id: product?.seller_product?.product_id,
        category_id: product?.seller_product?.categories?.[0]?.id,
        brand_id: product?.seller_product?.product?.brand?.id,
        price: promoPrice,
        promoPrice,
      });

      const discountPerProduct = (basePrice - finalPrice) * qty;

      return (
        totalDiscount + (!isNaN(discountPerProduct) ? discountPerProduct : 0)
      );
    }, 0);
  }, [cartProducts, calculatePrice]);

  const totalBonus = useMemo(() => {
    return cartProducts.reduce((totalDiscount, product) => {
      const qty = product?.qty || 1;
      const basePrice = product?.seller_product?.skus?.[0]?.selling_price || 0;
      const promoPrice = product?.seller_product?.promo_price || basePrice;

      const {appliedDiscount} = calculatePrice({
        product_id: product?.seller_product?.product_id,
        category_id: product?.seller_product?.categories?.[0]?.id,
        brand_id: product?.seller_product?.product?.brand?.id,
        price: promoPrice,
        promoPrice,
      });

      const discountPerProduct = appliedDiscount * qty;

      return (
        totalDiscount + (!isNaN(discountPerProduct) ? discountPerProduct : 0)
      );
    }, 0);
  }, [cartProducts, calculatePrice]);

  const finalTotalPrice = useMemo(() => {
    const baseTotalPrice = cartProducts.reduce((sum, product) => {
      const qty = product?.qty || 1;
      const basePrice = product?.seller_product?.skus?.[0]?.selling_price || 0;
      const promoPrice = product?.seller_product?.promo_price || basePrice;

      const {appliedDiscount} = calculatePrice({
        product_id: product?.seller_product?.product_id,
        category_id: product?.seller_product?.categories?.[0]?.id,
        brand_id: product?.seller_product?.product?.brand?.id,
        price: promoPrice,
        promoPrice,
      });

      // return sum + basePrice - appliedDiscount * qty;
      return sum + (basePrice - appliedDiscount) * qty;
    }, 0);

    const validDiscountAmount = !isNaN(totalDiscountedAmount)
      ? totalDiscountedAmount
      : 0;

    return Math.max(0, baseTotalPrice - validDiscountAmount);
  }, [calculatePrice, cartProducts, totalDiscountedAmount]);

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: RH(140),
        }}>
        <Header title={t('cart')} />
        {!userId ||
        !Array.isArray(cartProducts) ||
        cartProducts.length === 0 ? (
          <CartNull length={cartProducts.length || 0} />
        ) : (
          <Cart />
        )}

        <View style={styles.textMain}>
          <View style={styles.wrapper}>
            <Row style={styles.textRow}>
              <Text
                allowFontScaling={false}
                style={[styles.text, styles.grayText]}>
                {t('Product')} ({cartCount})
              </Text>
              <Text allowFontScaling={false} style={[styles.boldText]}>
                {UseCalcPrice(totalPrice, currentCurrency)}
              </Text>
            </Row>
            <Row style={styles.textRow}>
              <Text
                allowFontScaling={false}
                style={[styles.text, styles.grayText]}>
                {t('delivery')}
              </Text>
              <Text allowFontScaling={false} style={[styles.boldText]}>
                0 ֏
              </Text>
            </Row>
            <Text allowFontScaling={false} style={[styles.shipingText]}>
              {t('shiping_state')}
            </Text>
          </View>

          <DashedLine
            dashLength={4}
            dashThickness={1}
            dashColor="rgba(0, 0, 0, 0.25)"
            style={styles.dashLine}
          />

          <View style={styles.wrapper}>
            {totalDiscountedAmount > 0 && (
              <Row style={styles.textRow}>
                <Text
                  allowFontScaling={false}
                  style={[styles.text, styles.redText]}>
                  {t('discount')}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={[styles.boldText, styles.redText]}>
                  -{UseCalcPrice(totalDiscountedAmount, currentCurrency)}
                </Text>
              </Row>
            )}
            {totalBonus > 0 && (
              <Row style={styles.textRow}>
                <Text
                  allowFontScaling={false}
                  style={[styles.text, styles.redText]}>
                  {t('Bonus')}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={[styles.boldText, styles.redText]}>
                  -{UseCalcPrice(totalBonus, currentCurrency)}
                </Text>
              </Row>
            )}
            <Row style={styles.textRow}>
              <Text allowFontScaling={false} style={[styles.boldText]}>
                {t('total')}
              </Text>
              <Text allowFontScaling={false} style={[styles.boldText]}>
                {UseCalcPrice(finalTotalPrice, currentCurrency)}
              </Text>
            </Row>
          </View>
        </View>
      </ScrollView>

      {!!userId && !!cartProducts.length && (
        <View style={styles.nextBtn}>
          <Button
            text={t('continue')}
            onPress={() => {
              navigation.navigate('CartOrder');
            }}
          />
        </View>
      )}
    </View>
  );
};

export default ShopCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nextBtn: {
    zIndex: 2,
    position: 'absolute',
    width: '100%',
    bottom: RH(80),
  },
  textMain: {
    backgroundColor: '#F7F6F9',
    paddingTop: RH(48),
    paddingBottom: RH(39),
    marginTop: RH(50),
  },
  wrapper: {
    marginHorizontal: RW(16),
  },
  boldText: font('bold', 16),
  text: font('regular', 16),
  redText: {
    color: Colors.red,
  },
  grayText: {
    color: 'rgba(40, 40, 40, 0.6)',
  },
  shipingText: {
    ...font('regular', 10, Colors.red),
    maxWidth: RW(270),
  },
  dashLine: {
    marginTop: RH(20),
    marginBottom: RH(10),
  },
  textRow: {
    marginBottom: RH(20),
  },
});

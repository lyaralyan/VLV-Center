/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import {RH, RW, font} from '../../theme/utils';
import {useDispatch, useSelector} from 'react-redux';
import Row from '../../theme/wrappers/row';
import Colors from '../../theme/colors';
import UseCalcPrice from '../../helpers/UseCalcPrice';
import {credit24Month} from '../../helpers/creditCalculator';
import StoreSvg from '../../assets/SVG/StoreSvg';
import {useNavigation} from '@react-navigation/native';
import Image from '../Image';
import {
  addCardStore,
  addCartCount,
  addCartProduct,
  setAddToCartAnimation,
} from '@store/CartSlice';
import {ScrollView} from 'react-native-gesture-handler';
import GiftSvg from '@assets/SVG/GiftSvg';
import {SvgUri} from 'react-native-svg';
import {STORAGE_URL} from '@env';
import FastImage from 'react-native-fast-image';
import DeleteSvg from '@assets/SVG/DeleteSvg';
import {setPending} from '@store/MainSlice';
import useProductPrice from '@helpers/useProductPrice';
import {useTranslation} from 'react-i18next';
const ProductCard = ({
  product,
  singleImage = false,
  containerStyle = {},
  smallProduct = false,
  onDeletePress,
  onPressAddCart,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [storeAdded, setStoreAdded] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const {currentLanguage, currentCurrency} = useSelector(({main}) => main);
  const {t} = useTranslation();
  const calculatePrice = useProductPrice();
  const cartProducts = useSelector(({cart}) => cart.cartProducts);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const imageRef = useRef();

  const prod = product?.product ?? product;
  const price = prod?.pricing ?? product?.skus?.[0];
  const gallery = prod?.media ?? prod?.gallary_images_api;

  useEffect(() => {
    if (cartProducts?.find(id => prod?.seller_id === id)) {
      setStoreAdded(true);
    } else {
      setStoreAdded(false);
    }
  }, [cartProducts, prod?.seller_id]);

  let promoPrice =
    (prod?.online_price && prod?.online_selling_price) ||
    product?.recommended_retail_price ||
    product?.promo_price;
  const {finalPrice, appliedDiscount, isDiscountApplied} = calculatePrice({
    product_id: product?.id,
    category_id: product?.categories?.[0]?.laravel_through_key,
    brand_id: prod?.brand?.id,
    price: price?.selling_price,
    promoPrice,
  });

  const handleScroll = event => {
    const pageIndex = Math.round(event.nativeEvent.contentOffset.x / RW(110));
    setActiveIndex(pageIndex);
  };

  return (
    <View
      style={[
        styles.container,
        smallProduct && {
          width: RW(110),
          height: RW(151),
          shadowColor: 'rgba(0, 0, 0, 0.15)',
          borderRadius: 0,
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 1,
          shadowRadius: 7,
          elevation: 7,
        },
        containerStyle,
      ]}>
      <View style={[styles.imgBlock, smallProduct && {height: RH(60)}]}>
        {typeof onDeletePress === 'function' && (
          <Pressable
            onPress={() => {
              onDeletePress(product);
            }}
            style={[styles.deleteBtn]}>
            <DeleteSvg color={Colors.gray} width={RW(17)} height={RH(17)} />
          </Pressable>
        )}
        <FastImage
          style={[styles.brandImg, smallProduct && {width: RW(35)}]}
          resizeMode="contain"
          source={{
            uri: STORAGE_URL + (prod?.brand?.logo || prod?.brand?.logo_three),
          }}
        />

        {singleImage ? (
          <Image
            ref={imageRef}
            onPress={() => {
              if (!smallProduct) {
                navigation.navigate('ProductPage', {
                  productId: prod?.seller_id ?? product?.id,
                });
              }
            }}
            style={[styles.productImg, smallProduct && {height: RH(60)}]}
            url={gallery?.[0]?.images_source}
          />
        ) : (
          <ScrollView
            horizontal
            pagingEnabled
            bounces={false}
            ref={imageRef}
            showsHorizontalScrollIndicator={false}
            style={styles.images}
            scrollEventThrottle={16}
            onScroll={handleScroll}>
            {gallery?.length > 0 ? (
              <>
                {prod?.media_ids
                  ? prod?.media_ids?.split(',')?.map((item, index) => (
                      <Image
                        onPress={() => {
                          navigation.navigate('ProductPage', {
                            productId: prod?.seller_id ?? product?.id,
                          });
                        }}
                        key={index}
                        style={styles.productImg}
                        url={
                          gallery?.find(
                            galery => galery?.media_id?.toString() === item,
                          )?.images_source
                        }
                      />
                    ))
                  : prod?.gallary_images_api?.map((item, index) => (
                      <Image
                        onPress={() => {
                          navigation.navigate('ProductPage', {
                            productId: prod?.seller_id ?? product?.id,
                          });
                        }}
                        key={index}
                        style={styles.productImg}
                        url={item?.images_source}
                      />
                    ))}
              </>
            ) : (
              <Image
                onPress={() => {
                  navigation.navigate('ProductPage', {
                    productId: prod?.seller_id ?? product?.id,
                  });
                }}
                style={styles.productImg}
                url={null}
              />
            )}
          </ScrollView>
        )}
        {!singleImage && (
          <Row
            style={{
              width: RW(110),
              alignSelf: 'center',
              marginTop: RH(6),
              columnGap: RW(2),
            }}>
            {gallery?.map((_, index) => (
              <View
                key={index}
                style={{
                  height: RH(2),
                  width: 100 / gallery?.length + '%',
                  backgroundColor:
                    index !== activeIndex ? Colors.bgGray : Colors.red,
                  borderRadius: RH(2),
                }}
              />
            ))}
          </Row>
        )}
        {(!!prod?.gift_images?.length || !!prod?.sticker) && (
          <View
            style={[
              styles.giftContainer,
              smallProduct && {
                bottom: RH(-10),
                right: RW(10),
              },
            ]}>
            {prod?.sticker?.map((item, index) => (
              <SvgUri
                key={index}
                uri={STORAGE_URL + item['image_' + currentLanguage]}
              />
            ))}

            {showGiftModal && (
              <Pressable
                onPress={() => {
                  if (!smallProduct) {
                    navigation.navigate('ProductPage', {
                      productId: prod?.gift_images?.[0]?.product_id,
                    });
                  }
                }}
                style={styles.giftModal}>
                <View style={styles.giftModalMain}>
                  <Image
                    style={styles.giftModalImg}
                    url={prod?.gift_images?.[0]?.image}
                  />
                </View>
              </Pressable>
            )}

            {!!prod?.gift_images?.length && (
              <Pressable onPress={() => setShowGiftModal(!showGiftModal)}>
                <GiftSvg
                  width={smallProduct ? RW(30) : RW(37)}
                  height={smallProduct ? RH(30) : RH(37)}
                />
              </Pressable>
            )}
          </View>
        )}
        {isDiscountApplied && (
          <View
            style={[
              styles.mobileDiscount,
              typeof onDeletePress === 'function' && {top: RH(25)},
            ]}>
            <FastImage
              style={styles.mobileDiscountImg}
              resizeMode="contain"
              source={require('./../../assets/mobile_discount.png')}
            />
            <Text allowFontScaling={false} style={styles.mobileDiscountText}>
              -{UseCalcPrice(appliedDiscount, currentCurrency)}
              {'\n'}
              {t('discount')}
            </Text>
          </View>
        )}
      </View>
      <Pressable
        onPress={() => {
          if (!smallProduct) {
            navigation.navigate('ProductPage', {
              productId: product.id,
            });
          }
        }}
        style={styles.descriptionBlock}>
        <Text
          style={[
            styles.category,
            smallProduct && {
              ...font('regular', 7),
            },
          ]}>
          {prod?.categories?.[0]?.['name_' + currentLanguage]}
        </Text>
        <Text
          style={[
            styles.productName,
            smallProduct && {
              ...font('regular', 8),
            },
          ]}>
          {prod?.brand?.name + ' ' + prod?.product_name}
        </Text>
        {!!prod?.cashback && (
          <View style={styles.cashback}>
            <Text allowFontScaling={false} style={styles.cashbackText}>
              Cashback
            </Text>
            <Text allowFontScaling={false} style={styles.selingPrice}>
              {UseCalcPrice(prod?.cashback, currentCurrency)}
            </Text>
          </View>
        )}
        <Row
          style={[
            styles.pirceAndBtnBlock,
            prod?.cashback && {paddingTop: RH(5)},
          ]}>
          <View>
            {(finalPrice && finalPrice < price?.selling_price) ||
            (promoPrice && promoPrice < price?.selling_price) ? (
              <View>
                <Text
                  style={[
                    styles.promoPrice,
                    smallProduct && {
                      ...font('regular', 8),
                    },
                  ]}>
                  {UseCalcPrice(finalPrice || promoPrice, currentCurrency)}
                </Text>
                <View>
                  <Text
                    style={[
                      styles.selingPrice,
                      smallProduct && {
                        ...font('regular', 7),
                      },
                    ]}>
                    {UseCalcPrice(price?.selling_price, currentCurrency)}
                  </Text>
                  <View style={styles.selingPriceLine} />
                </View>
              </View>
            ) : (
              <Text
                style={[
                  styles.price,
                  smallProduct && {
                    ...font('regular', 8),
                  },
                ]}>
                {UseCalcPrice(price?.selling_price, currentCurrency)}
              </Text>
            )}
            <Text
              style={[
                styles.monthlyPrice,
                smallProduct
                  ? {
                      ...font('regular', 7),
                    }
                  : null,
              ]}>
              {credit24Month(
                promoPrice || price?.selling_price,
                true,
                currentCurrency,
              )}
            </Text>
          </View>
          <Pressable
            style={({pressed}) => {
              return [
                styles.storeBtn,
                {
                  backgroundColor: storeAdded
                    ? '#fff'
                    : pressed
                    ? Colors.darkRed
                    : Colors.red,
                },
                smallProduct
                  ? {
                      width: RW(28),
                      height: RH(17),
                    }
                  : null,
              ];
            }}
            onPress={async () => {
              if (!smallProduct) {
                console.log('📢 [index.js:383]', prod, '');
                dispatch(
                  addCartProduct(
                    prod?.seller_product_skus ||
                      prod?.skus?.[0]?.id ||
                      prod.id,
                  ),
                );
                dispatch(addCartCount());
                dispatch(
                  addCardStore({
                    ...product,
                    price: finalPrice || promoPrice || price?.selling_price,
                  }),
                );
                if (onPressAddCart) {
                  dispatch(setPending(true));
                  setTimeout(() => {
                    onPressAddCart();
                  }, 100);
                }
                imageRef?.current?.measure((fx, fy, width, height, px, py) => {
                  dispatch(
                    setAddToCartAnimation({
                      x: px,
                      y: py,
                      width,
                      height,
                      image: prod?.gallary_images_api?.[0]?.thum_image_sourc,
                    }),
                  );
                });
              }
            }}>
            <StoreSvg
              width={smallProduct ? RW(9) : RW(17)}
              height={smallProduct ? RW(9) : RH(16)}
              active={storeAdded}
            />
          </Pressable>
        </Row>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: RW(180),
    height: RH(250),
    justifyContent: 'space-between',
    marginRight: RW(5),
    backgroundColor: '#fff',
    paddingHorizontal: RW(10),
    paddingVertical: RH(12),
    marginBottom: RH(10),
    borderRadius: RH(6),
  },
  brandImg: {
    width: RW(85),
    height: RH(16),
  },
  images: {
    maxWidth: RW(109.3),
    alignSelf: 'center',
  },
  productImg: {
    height: RH(100),
    width: RW(110),
    alignSelf: 'center',
    objectFit: 'contain',
  },
  descriptionBlock: {
    marginTop: RH(20),
  },
  category: {
    ...font('regular', 10),
    opacity: 0.6,
  },
  productName: {
    ...font('regular', 12),
  },
  pirceAndBtnBlock: {
    justifyContent: 'space-between',
    marginTop: RH(10),
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
    width: '70%',
    position: 'absolute',
    borderBottomColor: Colors.red,
    borderBottomWidth: 1,
    top: RH(5.8),
    transform: 'rotate(-7deg)',
    left: 0,
  },
  monthlyPrice: {
    ...font('regular', 10),
  },
  storeBtn: {
    width: RW(47),
    height: RH(28),
    borderColor: Colors.red,
    borderWidth: RW(1),
    borderRadius: RW(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  giftContainer: {
    position: 'absolute',
    right: RW(20),
    bottom: RH(0),
    alignItems: 'flex-end',
  },
  giftModal: {
    width: RW(70),
    height: RH(60),
    backgroundColor: '#fff',
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 14,
    borderRadius: RW(5),
    marginBottom: RH(-8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  giftModalMain: {
    width: RW(50),
    height: RH(40),
    borderWidth: RW(1),
    borderColor: '#dfdfe2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  giftModalImg: {
    width: RW(40),
    height: RW(30),
  },
  stickerImg: {
    width: RW(20),
    height: RW(20),
    right: RW(35),
    bottom: RH(-15),
  },
  deleteBtn: {
    position: 'absolute',
    right: RW(0),
    zIndex: 2,
    width: RW(47),
    height: RH(28),
    borderRadius: RW(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cashback: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: RW(5),
  },
  cashbackText: font('regular', 12, Colors.red),
  mobileDiscount: {
    width: RW(48),
    height: RW(48),
    position: 'absolute',
    right: 0,
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
});

export default ProductCard;

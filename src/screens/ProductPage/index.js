import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  getProductInfo,
  getRecentProducts,
  getRelatedProducts,
  getSimilarProducts,
  setPending,
  setShowCamera,
} from '../../store/MainSlice';
import {useDispatch, useSelector} from 'react-redux';
import BackArrowSvg from '../../assets/SVG/BackArrowSvg';
import HaertSvg from '../../assets/SVG/HaertSvg';
import {RH, RW, font} from '../../theme/utils';
import ImgBlock from './components/ImgBlock';
import {useNavigation} from '@react-navigation/native';
import Row from '../../theme/wrappers/row';
import Image from '../../components/Image';
import UseCalcPrice from '../../helpers/UseCalcPrice';
import Colors from '../../theme/colors';
import DashedLine from 'react-native-dashed-line';
import {
  credit12Month,
  credit24Month,
  credit36Month,
} from '../../helpers/creditCalculator';
import MinusSvg from '../../assets/SVG/MinusSvg';
import PlusSvg from '../../assets/SVG/PlusSvg';
import CartSvg from '../../assets/SVG/CartSvg';
import OnlinePriceSvg from './assets/OnlinePriceSvg';
import OnlineCreditSvg from './assets/OnlineCreditSvg';
import ProductsWithSlide from '../../components/ProductsWithSlide';
import {useTranslation} from 'react-i18next';
import RelatedProducts from './components/RelatedProducts';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import Button from '@components/Button/Button';
import {
  addCardStore,
  addCartCount,
  addCartProduct,
  addCompare,
  addCompares,
  addFavorites,
  addWishList,
  getCartPageProducts,
  removeCompares,
  removeFavorites,
  setAddToCartAnimation,
  setAddToCompareAnimation,
  setAddToFavoriteAnimation,
} from '@store/CartSlice';
import ToggleSwitch from '@components/ToggleSwitch';
import ComapreSvg from '@assets/SVG/ComapreSvg';
import Toast from 'react-native-toast-message';
import {STORAGE_URL} from '@env';
import useProductPrice from '@helpers/useProductPrice';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getCategoryWithSlugRequest} from '@screens/Home/components/SearchInputNew/request/getCategoryWithSlugSlice';

export default function ProductPage(props) {
  const bottomSheetRef = useRef();
  const scrollRef = useRef();
  const imageRef = useRef(null);
  const [count, setCount] = useState(1);
  const [showMoreAtributes, setShowMoreAtributes] = useState(false);
  const [showBottomSheet, setShowBottomSheet] = useState(null);
  const [installingOn, setInstallingOn] = useState(true);
  const insets = useSafeAreaInsets();
  const productInfo = useSelector(({main}) => main.productInfo?.product);
  const {currentLanguage, similarProducts, relatedProducts, currentCurrency} =
    useSelector(({main}) => main);
  const {favorites, compares} = useSelector(({cart}) => cart);
  const navigation = useNavigation();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const productId = props.route.params?.productId;
  const snapPoints = useMemo(() => ['50%'], []);
  const calculatePrice = useProductPrice();
  const {getCategoryWithSlugData} = useSelector(
    ({getCategoryWithSlugSlice}) => getCategoryWithSlugSlice,
  );
  const {discount, maxPrice, minPrice, sort_by} = useSelector(
    ({filterSlice}) => filterSlice,
  );

  const promoPrice = useMemo(
    () =>
      productInfo?.skus?.[0]?.recommended_retail_price ||
      productInfo?.skus[0]?.promo_price,
    [productInfo],
  );

  const {finalPrice, appliedDiscount, isDiscountApplied} = calculatePrice({
    product_id: productInfo?.product_id,
    category_id: productInfo?.categories?.[0]?.id,
    brand_id: productInfo?.brand?.id,
    price: productInfo?.skus[0]?.selling_price,
    promoPrice,
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: false,
    });
    dispatch(getProductInfo(productId));
    dispatch(getSimilarProducts(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (productInfo?.skus[0].product_id) {
      dispatch(getRelatedProducts(productInfo?.skus[0].product_id));
      dispatch(getRecentProducts(productInfo?.skus[0].product_id));
    }
  }, [dispatch, productInfo]);

  const renderBackdrop = useCallback(backdropProps => {
    return (
      <BottomSheetBackdrop
        {...backdropProps}
        opacity={0.7}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    );
  }, []);

  const bottomSheetData = {
    online_price: {
      title: t('online_price_info'),
      description: t('online_price_prod_popup'),
    },
    credit: {
      title: t('credit_info_product'),
      description: t('cred_info_prod_popup'),
    },
  };

  const handelSubmitBuyNow = async () => {
    try {
      dispatch(setPending(true));

      await dispatch(addCardStore(productInfo, 'yes')).then(() => {
        dispatch(
          getCartPageProducts(() => {
            navigation.navigate('CartOrder');
          }),
        );
      });
    } catch {
      dispatch(setPending(false));
      Toast.show({
        type: 'error',
        text1: t('error_message'),
      });
    }
  };

  return (
    <>
      <ScrollView
        ref={scrollRef}
        style={[styles.container, {paddingTop: insets.top}]}>
        <Row style={styles.header}>
          <Pressable
            style={{
              paddingHorizontal: RW(10),
              paddingVertical: RH(5),
            }}
            onPress={() => {
              dispatch(
                getCategoryWithSlugRequest({
                  brand: [],
                  slug: getCategoryWithSlugData?.category?.slug,
                  manufacture: [],
                  discount,
                  maxPrice,
                  minPrice,
                  page: 1,
                  sort_by,
                }),
              );
              navigation.goBack();
            }}>
            <BackArrowSvg />
          </Pressable>
          <View style={styles.headerRightBlock}>
            <Pressable
              onPress={() => {
                if (!compares?.includes(productInfo?.seller_product_sku_id)) {
                  dispatch(addCompares(productInfo?.seller_product_sku_id));
                } else {
                  dispatch(removeCompares(productInfo?.seller_product_sku_id));
                }
                dispatch(
                  addCompare({
                    product_sku_id: productInfo?.seller_product_sku_id,
                    data_type: 'productInfo?.product.product_type',
                  }),
                );
                imageRef?.current?.measure((fx, fy, width, height, px, py) => {
                  dispatch(
                    setAddToCompareAnimation({
                      width,
                      height,
                      x: px,
                      y: py,
                      image:
                        productInfo?.gallary_images_api?.[0]?.thum_image_sourc,
                    }),
                  );
                });
              }}>
              <ComapreSvg
                active={compares?.includes(productInfo?.seller_product_sku_id)}
              />
            </Pressable>
            <Pressable
              onPress={() => {
                if (favorites?.includes(productInfo?.seller_product_id)) {
                  dispatch(removeFavorites(productInfo?.seller_product_id));
                } else {
                  dispatch(addFavorites(productInfo?.seller_product_id));
                }
                dispatch(
                  addWishList({
                    seller_product_id: productInfo?.seller_product_id,
                  }),
                );
                imageRef?.current?.measure((fx, fy, width, height, px, py) => {
                  dispatch(
                    setAddToFavoriteAnimation({
                      width,
                      height,
                      x: px,
                      y: py,
                      image:
                        productInfo?.gallary_images_api?.[0]?.thum_image_sourc,
                    }),
                  );
                });
              }}>
              <HaertSvg
                active={favorites?.includes(productInfo?.seller_product_id)}
                width={22}
                height={22}
              />
            </Pressable>
          </View>
        </Row>

        <ImgBlock
          ref={imageRef}
          imgs={productInfo?.gallary_images_api}
          gift_images={productInfo?.gift_images}
          sticker={productInfo?.sticker}
          guaranty={productInfo?.guaranty}
        />
        <View style={styles.wrapper}>
          <Row style={styles.row}>
            <Image style={styles.brandLogo} url={productInfo?.brand?.logo} />
            <Row>
              <Text allowFontScaling={false} style={styles.sku}>
                SKU
              </Text>
              <Text allowFontScaling={false} style={styles.skuNumber}>
                {productInfo?.li_product_id}
              </Text>
            </Row>
          </Row>
          <Text allowFontScaling={false} style={styles.categoryName}>
            {productInfo?.categories[0]?.['name_' + currentLanguage]}
          </Text>
          <Text allowFontScaling={false} style={styles.productName}>
            {productInfo?.brand.name + ' ' + productInfo?.product_name}
          </Text>
          {productInfo?.cashback && (
            <View style={styles.cashback}>
              <Text allowFontScaling={false} style={styles.cashbackText}>
                Cashback
              </Text>
              <Text allowFontScaling={false} style={styles.selingPrice}>
                {UseCalcPrice(productInfo?.cashback, currentCurrency)}
              </Text>
            </View>
          )}
          <Row>
            {productInfo?.average_price ? (
              <View>
                <Text allowFontScaling={false} style={styles.averagePrice}>
                  {t('average_price')}
                </Text>
                <View style={{width: RW(95)}}>
                  <Text allowFontScaling={false} style={[styles.selingPrice]}>
                    {UseCalcPrice(productInfo?.average_price, currentCurrency)}
                  </Text>
                  <View style={styles.selingPriceLine} />
                </View>
              </View>
            ) : (
              <View />
            )}
            <View style={styles.priceWrapper}>
              {finalPrice && finalPrice < productInfo?.skus[0].selling_price ? (
                <View style={styles.flexEnd}>
                  <Text allowFontScaling={false} style={styles.promoPrice}>
                    {UseCalcPrice(
                      finalPrice ||
                        productInfo?.skus?.[0]?.selling_price -
                          (!installingOn ? productInfo?.installing_price : 0),
                      currentCurrency,
                    )}
                  </Text>

                  {/* <View>
                    <Text allowFontScaling={false} style={[styles.price]}>
                      {UseCalcPrice(
                        productInfo?.skus[0].selling_price -
                          (!installingOn ? productInfo?.installing_price : 0),
                        currentCurrency,
                      )}
                    </Text>
                    <View style={styles.priceLine} />
                  </View> */}
                </View>
              ) : (
                <Text allowFontScaling={false} style={[styles.price]}>
                  {UseCalcPrice(
                    productInfo?.skus[0].selling_price -
                      (!installingOn ? productInfo?.installing_price : 0),
                    currentCurrency,
                  )}
                </Text>
              )}
              {isDiscountApplied && (
                <View style={styles.mobileDiscount}>
                  <FastImage
                    style={styles.mobileDiscountImg}
                    resizeMode="contain"
                    source={require('./../../assets/mobile_discount.png')}
                  />
                  <Text
                    allowFontScaling={false}
                    style={styles.mobileDiscountText}>
                    {UseCalcPrice(appliedDiscount, currentCurrency)}
                    {'\n'}
                    {t('discount')}
                  </Text>
                </View>
              )}
            </View>
          </Row>
        </View>
        <DashedLine
          dashLength={4}
          dashThickness={1}
          dashColor="rgba(0, 0, 0, 0.25)"
        />

        {productInfo?.skus[0].selling_price > 26000 && (
          <Row style={styles.creditRow}>
            <View style={styles.creditColumn}>
              <Text allowFontScaling={false} style={styles.creditTitle}>
                {t('cash')}
              </Text>
              <Text allowFontScaling={false} style={styles.creditPrice}>
                {/* {UseCalcPrice(
                  productInfo?.skus[0].selling_price,
                  currentCurrency,
                )} */}
                {UseCalcPrice(
                  finalPrice ??
                    productInfo?.cash_price ??
                    productInfo?.skus[0].selling_price,
                  currentCurrency,
                )}
              </Text>
            </View>
            <View style={styles.monthLine} />
            <View style={styles.creditColumn}>
              <Text allowFontScaling={false} style={styles.creditTitle}>
                36 {t('month')}
              </Text>
              <Text allowFontScaling={false} style={styles.creditPrice}>
                {credit36Month(
                  finalPrice || productInfo?.skus?.[0]?.selling_price,
                  false,
                  currentCurrency,
                )}
              </Text>
            </View>
            <View style={styles.monthLine} />
            <View style={styles.creditColumn}>
              <Text allowFontScaling={false} style={styles.creditTitle}>
                24 {t('month')}
              </Text>
              <Text allowFontScaling={false} style={styles.creditPrice}>
                {credit24Month(
                  finalPrice || productInfo?.skus?.[0]?.selling_price,
                  false,
                  currentCurrency,
                )}
              </Text>
            </View>
            <View style={styles.monthLine} />
            <View style={styles.creditColumn}>
              <Text allowFontScaling={false} style={styles.creditTitle}>
                12 {t('month')}
              </Text>
              <Text allowFontScaling={false} style={styles.creditPrice}>
                {credit12Month(
                  finalPrice || productInfo?.skus?.[0]?.selling_price,
                  false,
                  currentCurrency,
                )}
              </Text>
            </View>
          </Row>
        )}

        <View style={styles.wrapper}>
          {!!productInfo?.installing_price && (
            <Row style={styles.installingRow}>
              <View style={styles.installingPriceContainer}>
                <Text allowFontScaling={false} style={styles.installingText}>
                  {t('installing')}
                </Text>
                <Text allowFontScaling={false} style={styles.installingPrice}>
                  {UseCalcPrice(productInfo?.installing_price, currentCurrency)}
                </Text>
              </View>
              <ToggleSwitch value={installingOn} setValue={setInstallingOn} />
            </Row>
          )}
          <Row style={styles.btnsRow}>
            <Row style={styles.countBlock}>
              <Pressable
                style={styles.minusBtn}
                onPress={() => {
                  if (count > 1) {
                    setCount(count - 1);
                  }
                }}>
                <MinusSvg />
              </Pressable>
              <Text allowFontScaling={false} style={styles.countText}>
                {count}
              </Text>
              <Pressable
                style={styles.plusBtn}
                onPress={() => setCount(count + 1)}>
                <PlusSvg />
              </Pressable>
            </Row>
            <Pressable
              style={styles.addCartBtn}
              onPress={() => {
                dispatch(addCartProduct(productInfo?.id));
                dispatch(addCartCount(count));
                dispatch(
                  addCardStore({
                    ...productInfo,
                    price: finalPrice || productInfo?.skus[0].selling_price,
                    qty: count,
                    installing_is_on: installingOn,
                  }),
                );

                imageRef?.current?.measure((fx, fy, width, height, px, py) => {
                  dispatch(
                    setAddToCartAnimation({
                      width,
                      height,
                      x: px,
                      y: py,
                      image:
                        productInfo?.gallary_images_api?.[0]?.thum_image_sourc,
                    }),
                  );
                });
              }}>
              <CartSvg />
              <Text allowFontScaling={false} style={styles.addCartBtnText}>
                {t('add')}
              </Text>
            </Pressable>
            {/* // */}
            <Pressable style={styles.creditBtn} onPress={handelSubmitBuyNow}>
              <Text allowFontScaling={false} style={styles.creditBtnText}>
                {t('by_nou')}
              </Text>
            </Pressable>
          </Row>
          <Pressable
            style={styles.cameraBtn}
            onPress={() => {
              if (!productInfo?.gallary_images_api?.[0]?.images_source) {
                Toast.show({
                  type: 'error',
                  text1: 'No image',
                });
                return;
              }

              dispatch(
                setShowCamera({
                  type: 'product',
                  image:
                    STORAGE_URL +
                    productInfo?.gallary_images_api?.[0]?.images_source,
                }),
              );
            }}>
            <Text allowFontScaling={false} style={styles.cameraBtnText}>
              {t('viewing_the_product_with_the_camera')}
            </Text>
          </Pressable>
        </View>

        <View style={styles.grayWrapper}>
          <Text allowFontScaling={false} style={styles.descriptionTitle}>
            {t('character')}
          </Text>
          {productInfo?.variations.map((item, index) => {
            if (index > 5 && !showMoreAtributes) {
              return null;
            }
            if (
              item?.attribute?.['name_' + currentLanguage] &&
              item?.attribute_value?.['value_' + currentLanguage]
            ) {
              return (
                <Row style={styles.infoRow} key={index}>
                  <Text allowFontScaling={false} style={styles.infoRowKey}>
                    {item?.attribute?.['name_' + currentLanguage]}
                  </Text>
                  <View style={styles.mh}>
                    <DashedLine
                      dashLength={5}
                      dashThickness={1}
                      dashColor="rgba(0, 0, 0, 0.6)"
                    />
                  </View>

                  <Text allowFontScaling={false} style={styles.infoRowValue}>
                    {item?.attribute_value?.color?.[
                      'name_' + currentLanguage
                    ] || item?.attribute_value?.['value_' + currentLanguage]}
                  </Text>
                </Row>
              );
            }
          })}
          {productInfo?.variations.length > 5 ? (
            <Pressable onPress={() => setShowMoreAtributes(!showMoreAtributes)}>
              <Text allowFontScaling={false} style={styles.seeMoreVariation}>
                {showMoreAtributes ? t('close') : t('load_more')}
              </Text>
            </Pressable>
          ) : null}
        </View>
        <DashedLine
          dashLength={4}
          dashThickness={1}
          dashColor="rgba(0, 0, 0, 0.25)"
        />
        <View style={styles.grayWrapper}>
          <Row style={styles.between}>
            <Pressable
              onPress={() => {
                setShowBottomSheet('online_price');
                bottomSheetRef.current.expand();
              }}>
              <Row style={styles.onlinePriceBlock}>
                <OnlinePriceSvg />
                <Text allowFontScaling={false} style={styles.onlinePriceText}>
                  {t('online_price_info')}
                </Text>
              </Row>
            </Pressable>
            <Pressable
              onPress={() => {
                setShowBottomSheet('credit');
                bottomSheetRef.current.expand();
              }}>
              <Row style={styles.onlinePriceBlock}>
                <OnlineCreditSvg />
                <Text allowFontScaling={false} style={styles.onlinePriceText}>
                  {t('credit_info_product')}
                </Text>
              </Row>
            </Pressable>
          </Row>
        </View>

        <ProductsWithSlide
          products={similarProducts}
          title={t('related_products')}
        />
        {!!relatedProducts?.related_categories?.length &&
          Object.keys(relatedProducts?.related_categories_products || {})
            ?.length && <RelatedProducts data={relatedProducts} />}
        <View style={styles.h130} />
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}>
        <View style={styles.bottomSheetMain}>
          <View>
            <Text allowFontScaling={false} style={styles.bottomSheetTitle}>
              {bottomSheetData?.[showBottomSheet]?.title}
            </Text>
            <Text
              allowFontScaling={false}
              style={styles.bottomSheetDescription}>
              {bottomSheetData?.[showBottomSheet]?.description}
            </Text>
          </View>
          <Button
            onPress={() => {
              bottomSheetRef.current.close();
            }}
            text={t('close')}
          />
        </View>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  h130: {
    height: 130,
  },
  header: {
    paddingHorizontal: RW(15),
    justifyContent: 'space-between',
    marginBottom: RH(20),
  },
  headerRightBlock: {
    flexDirection: 'row',
    columnGap: RW(20),
  },
  wrapper: {
    paddingHorizontal: RW(15),
    paddingVertical: RH(20),
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: RH(25),
  },
  brandLogo: {
    height: RH(33),
    width: RW(93),
  },
  sku: {
    ...font('regular', 10, 'rgba(40, 40, 40, 0.6)'),
    marginRight: RW(8),
  },
  skuNumber: {
    ...font('regular', 10),
  },
  categoryName: {
    ...font('regular', 12, 'rgba(40, 40, 40, 0.6)'),
    textTransform: 'uppercase',
  },
  productName: {
    ...font('regular', 14),
  },
  priceLine: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.red,
    position: 'absolute',
    width: '80%',
    left: 0,
    top: RH(9),
    transform: 'rotate(-7deg)',
  },
  price: {
    ...font('bold', 16),
    alignSelf: 'center',
  },
  averagePrice: {
    ...font('regular', 12, 'rgba(40, 40, 40, 0.6)'),
    textTransform: 'uppercase',
    marginTop: RH(10),
  },
  monthLine: {
    height: RH(34),
    width: RW(1),
    backgroundColor: Colors.black,
  },
  creditRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: RH(20),
  },
  creditColumn: {
    width: '24.5%',
    rowGap: RH(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  creditTitle: {
    ...font('bold', 12, 'rgba(40, 40, 40, 0.6)'),
  },
  creditPrice: {
    ...font('bold', 12),
  },
  btnsRow: {
    justifyContent: 'space-between',
  },
  countBlock: {},
  minusBtn: {
    width: RW(38),
    height: RW(38),
    borderRadius: RW(4),
    borderColor: 'rgba(40, 40, 40, 0.2)',
    borderWidth: RW(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusBtn: {
    width: RW(38),
    height: RW(38),
    borderRadius: RW(4),
    // backgroundColor: Colors.red,
    borderColor: 'rgba(40, 40, 40, 0.2)',
    borderWidth: RW(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    paddingHorizontal: RW(14),
    ...font('regular', 14),
  },
  addCartBtn: {
    height: RW(38),
    paddingHorizontal: RW(21),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.red,
    borderRadius: RW(4),
    flexDirection: 'row',
    columnGap: 8,
  },
  addCartBtnText: {
    ...font('medium', 10, '#fff'),
  },
  creditBtn: {
    height: RW(38),
    paddingHorizontal: RW(21),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: RW(1),
    borderColor: Colors.red,
    borderRadius: RW(4),
    flexDirection: 'row',
  },
  creditBtnText: {
    ...font('medium', 10, Colors.red),
  },
  cameraBtn: {
    backgroundColor: Colors.black,
    marginTop: RH(18),
    marginBottom: RH(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RW(4),
    paddingVertical: RH(12),
    width: '100%',
  },
  cameraBtnText: {
    ...font('medium', 12, '#fff'),
  },
  grayWrapper: {
    backgroundColor: Colors.bgGray,
    paddingHorizontal: RW(15),
    paddingVertical: RH(20),
  },
  between: {
    justifyContent: 'space-between',
  },
  descriptionTitle: {
    marginBottom: RH(15),
    textTransform: 'uppercase',
    ...font('bold', 16),
  },
  infoRow: {
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: RH(4),
  },
  mh: {
    flex: 1,
    marginHorizontal: RW(5),
  },
  infoRowKey: {
    ...font('bold', 10, 'rgba(40, 40, 40, 0.60)'),
  },
  infoRowValue: {
    ...font('bold', 10, 'rgba(40, 40, 40, 0.60)'),
  },
  seeMoreVariation: {
    textDecorationLine: 'underline',
    marginTop: RH(18),
    ...font('bold', 10, Colors.red),
  },
  onlinePriceBlock: {
    paddingHorizontal: RW(15),
    paddingVertical: RH(9),
    borderRadius: RW(4),
    borderColor: Colors.black,
    borderWidth: 1,
    columnGap: RW(6),
  },
  onlinePriceText: {
    ...font('bold', 12),
    textTransform: 'uppercase',
  },
  bottomSheetMain: {
    flex: 1,
    paddingHorizontal: RW(16),
    justifyContent: 'space-between',
    paddingTop: RH(40),
    paddingBottom: RH(90),
  },
  bottomSheetTitle: {
    ...font('bold', 20),
    textAlign: 'center',
    marginBottom: RH(25),
  },
  bottomSheetDescription: {
    ...font('regular', 14),
    textAlign: 'center',
    paddingHorizontal: RW(24),
  },

  installingRow: {
    marginVertical: RH(15),
  },
  installingPriceContainer: {
    flexDirection: 'row',
    columnGap: RW(20),
  },
  installingPrice: font('bold', 16),
  installingText: {
    ...font('regular', 16, 'rgba(40, 40, 40, 0.6)'),
    textTransform: 'uppercase',
  },
  selingPrice: {
    ...font('bold', 14),
  },
  selingPriceLine: {
    width: '70%',
    position: 'absolute',
    borderBottomColor: Colors.red,
    borderBottomWidth: 1,
    top: RH(6.8),
    transform: 'rotate(-7deg)',
    left: 0,
  },
  priceWrapper: {
    flexDirection: 'row',
    columnGap: RW(5),
  },
  flexEnd: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  promoPrice: {
    ...font('bold', 20, Colors.red),
  },
  cashback: {
    marginVertical: RH(10),
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: RW(5),
  },
  cashbackText: font('regular', 16, 'rgba(255, 0, 0, 0.6)'),
  mobileDiscount: {
    width: RW(48),
    height: RW(48),
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

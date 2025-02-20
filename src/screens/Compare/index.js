import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Header from '@components/InnerHeader';
import {useDispatch, useSelector} from 'react-redux';
import {
  addCompare,
  getComparePageProducts,
  removeCompares,
  setComparePageProducts,
} from '@store/CartSlice';
import ProductCard from '@components/ProductCard';
import {RH, RW, font} from '@theme/utils';
import Colors from '@theme/colors';
import {SvgUri} from 'react-native-svg';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import {} from 'react-native-gesture-handler';

const Compare = () => {
  const [variations, setVariations] = useState({});
  const currentLanguage = useSelector(({main}) => main.currentLanguage);
  const {comparePageProducts, compares} = useSelector(({cart}) => cart);
  const dispatch = useDispatch();
  const scrollView1Ref = useRef(null);
  const scrollView2Ref = useRef(null);

  const handleScroll = (event, scrollViewRef) => {
    const {x, y} = event.nativeEvent.contentOffset;
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({x, y, animated: false});
    }
  };

  useEffect(() => {
    dispatch(getComparePageProducts());
  }, []);
  useEffect(() => {
    let variations = {};
    comparePageProducts?.forEach(({product}, index) => {
      product.variations.forEach(item => {
        let attribute_id = item.attribute_id;
        if (Object.keys(variations?.[attribute_id] || {}).length) {
          variations[attribute_id].values[index] = item.attribute_value;
        } else {
          variations[attribute_id] = {
            attribute: item.attribute,
            values: Array.from({length: comparePageProducts.length}),
          };

          variations[attribute_id].values[index] = item.attribute_value;
        }
      });
    });
    setVariations(variations);
  }, [comparePageProducts]);
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{
        paddingTop: insets.top,
      }}
      contentContainerStyle={[
        {
          paddingBottom: RH(120),
        },
        comparePageProducts?.length ? {} : {flex: 1},
      ]}
      showsVerticalScrollIndicator={false}
      scrollEnabled
      horizontal={false}>
      <Header title={t('product_compare')} />
      {comparePageProducts?.length ? (
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.wrapper}
            ref={scrollView1Ref}
            onScroll={event => handleScroll(event, scrollView2Ref)}
            scrollEventThrottle={16}
            bounces={false}>
            {comparePageProducts?.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                onDeletePress={product => {
                  dispatch(removeCompares(product?.seller_product_sku_id));
                  dispatch(
                    addCompare({
                      product_sku_id: product?.seller_product_sku_id,
                      data_type: 'productInfo.product.product_type',
                    }),
                  );
                  let filteredData = comparePageProducts.filter(
                    ({seller_product_sku_id}) =>
                      seller_product_sku_id !== product?.seller_product_sku_id,
                  );
                  dispatch(setComparePageProducts(filteredData));
                }}
              />
            ))}
          </ScrollView>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.wrapper]}
            ref={scrollView2Ref}
            onScroll={event => handleScroll(event, scrollView1Ref)}
            scrollEventThrottle={16}
            bounces={false}>
            <View style={[styles.variationsContainer]}>
              {Object.keys(variations || {})?.map((item, index) => {
                return (
                  <View key={index}>
                    <Text
                      allowFontScaling={false}
                      style={styles.variationTitle}>
                      {variations[item].attribute['name_' + currentLanguage]}
                    </Text>
                    <View style={styles.variationValues}>
                      {variations[item].values.map((item, index) => {
                        return (
                          <Text
                            allowFontScaling={false}
                            style={styles.variationValue}
                            key={index}>
                            {item?.['value_' + currentLanguage]}
                          </Text>
                        );
                      })}
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      ) : (
        <View style={styles.notCompareContainer}>
          <SvgUri uri={'https://vlv.am/public/img/empty_compare.svg'} />
          <Text allowFontScaling={false} style={styles.notCompareText}>
            {t('compare_list_is_empty')}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Compare;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: RW(16),
  },
  variationsContainer: {
    flexDirection: 'column',
  },
  variationTitle: {
    ...font('medium', 16),
    marginVertical: RH(10),
    // height: RH(20),
  },
  variationValues: {
    flexDirection: 'row',
    backgroundColor: Colors.bgGray,
    paddingVertical: RH(4),
    // height: RH(20),
  },
  variationValue: {
    ...font('regular', 14),
    width: RW(185),
    paddingHorizontal: RW(20),
  },
  notCompareContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notCompareText: {
    ...font('medium', 16),
    textTransform: 'uppercase',
    marginTop: RH(20),
  },
});

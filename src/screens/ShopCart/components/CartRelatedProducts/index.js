import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Row from '../../../../theme/wrappers/row';
import Colors from '../../../../theme/colors';
import {RH, RW, font} from '../../../../theme/utils';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import ProductsWithSlide from '../../../../components/ProductsWithSlide';
import {getCartPageProducts} from '@store/CartSlice';

const CartRelatedProducts = ({data}) => {
  const [activeCategory, setActiveCategory] = useState(
    data?.cart_similar_categories?.[0]?.id,
  );
  const currentLanguage = useSelector(({main}) => main.currentLanguage);
  const {t} = useTranslation();

  const dispatch = useDispatch();

  useEffect(() => {
    setActiveCategory(data?.cart_similar_categories?.[0]?.id);
  }, [data]);

  return (
    <View>
      <Row style={styles.header}>
        <Text allowFontScaling={false} style={styles.title}>
          {t('related_products')}
        </Text>
      </Row>
      <FlatList
        data={data?.cart_similar_categories}
        horizontal
        keyExtractor={(item, index) => `key-${index}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginBottom: RH(13),
          paddingHorizontal: RW(16),
        }}
        renderItem={({item}) => {
          //   if (data?.related_categories_products?.[item.id]?.length) {
          return (
            <Pressable
              onPress={() => setActiveCategory(item.id)}
              style={[
                styles.categoryBtn,
                item.id == activeCategory && {backgroundColor: Colors.red},
              ]}>
              <Text
                style={[
                  styles.categoryText,
                  item.id == activeCategory && font('bold', 12, '#fff'),
                ]}>
                {item['name_' + currentLanguage]}
              </Text>
            </Pressable>
          );
          //   }
        }}
      />
      <ProductsWithSlide
        products={data?.cart_similar_products?.[activeCategory]?.map(item => ({
          id: item.seller_product_id,
          categories: item.categories,
          promo_price: item.promo_price,
          seller_product_sku_id: item.seller_product_sku_id,
          skus: item.skus,
          product: {
            brand: item.brand,
            product_name: item.product_name,
            gallary_images_api: item.gallary_images_api,
            thumbnail_image_source: item.thumbnail_image_source,
            gift_images: item.gift_images,
            sticker: item.sticker,
            media_ids: item.media_ids,
            average_price: item.average_price,
            cashback: item.cashback,
            product_type: item.product_type,
          },
        }))}
        onPressAddCart={() => {
          dispatch(getCartPageProducts());
        }}
      />
    </View>
  );
};

export default CartRelatedProducts;

const styles = StyleSheet.create({
  header: {
    paddingVertical: RH(20),
    paddingHorizontal: RW(16),
    marginTop: RH(40),
  },
  title: {
    textTransform: 'uppercase',
    ...font('medium', 14),
  },
  categoryBtn: {
    paddingHorizontal: RW(13),
    paddingVertical: RH(10),
    borderRadius: RW(20),
  },
  categoryText: {
    ...font('regular', 12),
  },
});

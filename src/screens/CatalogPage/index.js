import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import HaedaerCategoryItem from '../../components/HeaderCategories/components/HaedaerCategoryItem';
import Banners from '../Home/components/Banners';
import ProductsWithSlide from '../../components/ProductsWithSlide';
import {RH, RW} from '../../theme/utils';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {getCatalogPageData, setPending} from '../../store/MainSlice';
import GridProducts from '../../components/GridProducts';
import Header from '@components/Header';
import SearchInput from '@screens/Home/components/SearchInputNew/SearchInput';
import FeatureCategories from '@screens/Home/components/FeatureCategories';
import Brands from '@screens/Home/components/Brands';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const CatalogPage = props => {
  const {headerCategorys, currentLanguage, catalogPageData} = useSelector(
    ({main}) => main,
  );
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const slug = props.route.params?.slug;
  useEffect(() => {
    dispatch(getCatalogPageData(slug));
  }, [slug]);
  const insets = useSafeAreaInsets();

  if (!Object.keys(catalogPageData || {}).length) return null;
  return (
    <ScrollView style={[styles.container, {paddingTop: insets.top}]}>
      <Header />
      <FlatList
        data={headerCategorys}
        horizontal
        keyExtractor={(item, index) => `key-${index}`}
        showsHorizontalScrollIndicator={false}
        style={styles.headerCategories}
        renderItem={({item}) => {
          return (
            <HaedaerCategoryItem
              name={item['name_' + currentLanguage]}
              icon={item?.icon}
              logo={item.logo}
              slug={item.slug}
              active={item.slug === slug}
            />
          );
        }}
      />
      <SearchInput />
      <Banners
        data={catalogPageData?.slider1?.map(
          item => item['image_' + currentLanguage],
        )}
        imgStyle={{
          height: RH(181),
        }}
        imgContainerStyle={{
          height: RH(181),
        }}
      />
      {!!catalogPageData?.categories?.length && (
        <FeatureCategories
          data={catalogPageData?.famous_categories}
          style={{marginBottom: RH(10)}}
        />
      )}

      <ProductsWithSlide
        products={catalogPageData?.best_deal_products?.data}
        title={t('top_piketc')}
      />
      <Banners
        data={catalogPageData.slider4?.map(
          item => item['image_' + currentLanguage],
        )}
        imgStyle={{
          height: RH('100%'),
        }}
      />

      <GridProducts
        products={catalogPageData?.new_products?.data}
        title={t('new_products')}
      />
      <ProductsWithSlide
        products={catalogPageData?.many_viewed_products?.data}
        title={t('many_viewed_products')}
      />
      {!!catalogPageData?.brands?.length && (
        <Brands data={catalogPageData?.brands} />
      )}

      <View style={{height: 130}} />
    </ScrollView>
  );
};

export default CatalogPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  featureCategories: {
    paddingHorizontal: RW(11),
    marginBottom: RH(30),
  },
  headerCategories: {
    paddingHorizontal: RW(11),
    marginTop: RH(15),
  },
});

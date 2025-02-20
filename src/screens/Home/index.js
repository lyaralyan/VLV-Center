import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useRef} from 'react';
import Header from '@components/Header';
import Banners from './components/Banners';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import Sales from './components/Sales';
import ProductsWithSlide from '../../components/ProductsWithSlide';
import GridProducts from '../../components/GridProducts';
import HeaderCategories from '../../components/HeaderCategories';
import Brands from './components/Brands';
import Footer from '@components/Footer';
import FeatureCategories from './components/FeatureCategories';
import TreeInOne from './components/TreeInOne';
import BuyTwoGetOneGift from './components/BuyTwoGetOneGift';
import {RH, RW} from '@theme/utils';
// import SearchInput from './components/SearchInputNew/SearchInput';
import SearchInput from './components/SearchInputNew/SearchInput';

const Home = () => {
  const {
    headerSliders,
    bestDealProduct,
    topRatingProduct,
    bannerSliders,
    currentLanguage,
  } = useSelector(({main}) => main);

  const threeInOne = useSelector(({main}) => main.threeInOne);
  const buyTwoGetOneGift = useSelector(({main}) => main.buyTwoGetOneGift);

  const {t} = useTranslation();
  const scrollRef = useRef();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView ref={scrollRef}>
        <Header />
        <HeaderCategories />
        <SearchInput />
        <Banners
          data={headerSliders?.map(item => {
            return {
              image: item?.['slider_image_' + currentLanguage],
              navigate: item?.navigate,
            };
          })}
        />
        <FeatureCategories />
        <Sales />
        <ProductsWithSlide
          onPressAddCart={null}
          products={bestDealProduct}
          title={t('top_piketc')}
        />
        <Banners
          imgStyle={{
            width: RW(393),
            height: RH('100%'),
          }}
          // resizeMode="cover"
          data={bannerSliders?.map(item => {
            return {
              image: item?.['image_' + currentLanguage],
              navigate: item?.navigate,
            };
          })}
        />
        <GridProducts
          scrollRef={scrollRef}
          products={topRatingProduct}
          title={t('new_products')}
        />
        {buyTwoGetOneGift === null ? null : <BuyTwoGetOneGift />}
        {threeInOne?.message === 'Three in one section not found.' ? null : (
          <TreeInOne />
        )}
        <Brands />
        <Footer />
        <View style={{height: 130}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

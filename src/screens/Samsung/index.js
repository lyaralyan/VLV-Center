import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Header from '@components/Header';
import HeaderCategories from '@components/HeaderCategories';
import SearchInput from '@screens/Home/components/SearchInputNew/SearchInput';
import {useDispatch, useSelector} from 'react-redux';
import {RH, RW, font} from '@theme/utils';
import Banners from '@screens/Home/components/Banners';
import RenderHTML from 'react-native-render-html';
import Image from '@components/Image';
import GridProducts from '@components/GridProducts';
import ProductsWithSlide from '@components/ProductsWithSlide';
import {useTranslation} from 'react-i18next';
import {getBrandPageData} from '@store/MainSlice';
import Colors from '@theme/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const screenWidth = Dimensions.get('screen').width;
const Samsung = () => {
  const {samsung, currentLanguage} = useSelector(({main}) => main);
  const insets = useSafeAreaInsets();

  const {t} = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!Object.keys(samsung || {}).length) {
      dispatch(getBrandPageData('samsung'));
    }
  }, [dispatch, samsung]);

  if (!Object.keys(samsung || {}).length) {
    return null;
  }
  return (
    <ScrollView
      style={[styles.container, {paddingTop: insets.top}]}
      contentContainerStyle={{paddingBottom: RH(140)}}>
      <Header />
      <HeaderCategories />
      <SearchInput />
      <Banners
        data={samsung?.slider1}
        imgStyle={styles.slider1Img}
        keyName={'image_' + currentLanguage}
      />
      <View style={styles.wrapper}>
        <RenderHTML
          contentWidth={screenWidth}
          source={{
            html: samsung?.info?.['text_1_' + currentLanguage],
          }}
          tagsStyles={{
            body: {
              color: Colors.black,
            },
          }}
        />
      </View>

      <View style={styles.wrapper}>
        <Image
          resizeMode="cover"
          style={styles.image2}
          url={samsung?.baners?.['baner_1_' + currentLanguage]}
        />
        <Image
          resizeMode="cover"
          style={styles.image2}
          url={samsung?.baners?.['baner_2_' + currentLanguage]}
        />
        <Image
          resizeMode="cover"
          style={styles.image3}
          url={samsung?.baners?.['baner_3_' + currentLanguage]}
        />
        <Text allowFontScaling={false} style={styles.title1}>
          {samsung?.info?.['subtitle2_' + currentLanguage]}
        </Text>
      </View>
      <ProductsWithSlide
        products={samsung?.products_second_slider}
        title={t('top_piketc')}
      />
      <Banners
        data={samsung?.slider2}
        keyName={'image_' + currentLanguage}
        imgStyle={styles.banner4Img}
      />
      <GridProducts products={samsung?.products_third_slider} />
      <View style={styles.wrapper}>
        <Image
          resizeMode="cover"
          style={styles.image4}
          url={samsung?.baners?.['baner_4_' + currentLanguage]}
        />
      </View>

      <GridProducts products={{products: samsung?.products_last_slider}} />
      <View style={styles.wrapper}>
        <RenderHTML
          contentWidth={screenWidth}
          source={{
            html: samsung?.info?.['text_2_' + currentLanguage],
          }}
          tagsStyles={{
            body: {
              color: Colors.black,
            },
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Samsung;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: RW(16),
  },
  slider1Img: {
    width: RW(393),
    height: RH('100%'),
  },
  image2: {
    width: '100%',
    height: 'auto',
    aspectRatio: '2.2/1',
    borderRadius: RW(10),
    marginBottom: RH(5),
  },
  image3: {
    width: '100%',
    height: 'auto',
    aspectRatio: '4.57/1',
    borderRadius: RW(10),
    marginBottom: RH(5),
  },
  banner4Img: {
    width: '100%',
    height: 'auto',
    aspectRatio: '3.83/1',
  },
  image4: {
    width: '100%',
    height: 'auto',
    aspectRatio: '2.8/1',
    borderRadius: RW(10),
    marginBottom: RH(5),
  },
  title1: {
    ...font('medium', 18),
    textAlign: 'center',
    marginTop: RH(30),
  },
  slider2Img: {
    width: RW(178),
    height: RH(260),
    borderRadius: RW(10),
  },
});

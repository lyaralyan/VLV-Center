import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import Header from '@components/Header';
import HeaderCategories from '@components/HeaderCategories';
import SearchInput from '@screens/Home/components/SearchInputNew/SearchInput';
import {useDispatch, useSelector} from 'react-redux';
import Image from '@components/Image';
import {RH, RW} from '@theme/utils';
import Row from '@theme/wrappers/row';
import RenderHTML from 'react-native-render-html';
import ProductsWithSlide from '@components/ProductsWithSlide';
import GridProducts from '@components/GridProducts';
import {useTranslation} from 'react-i18next';
import {getBrandPageData} from '@store/MainSlice';
import Colors from '@theme/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('screen').width;

const Toshiba = () => {
  const {toshiba, currentLanguage} = useSelector(({main}) => main);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!Object.keys(toshiba || {}).length) {
      dispatch(getBrandPageData('toshiba'));
    }
  }, [toshiba]);
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();

  if (!Object.keys(toshiba || {}).length) return null;
  return (
    <ScrollView
      style={[styles.container, {paddingTop: insets.top}]}
      contentContainerStyle={{paddingBottom: RH(140)}}>
      <Header />
      <HeaderCategories />
      <SearchInput />
      <View style={styles.wrapper}>
        <Image
          style={styles.banner1}
          url={toshiba?.baners?.['baner_1_' + currentLanguage]}
        />
        <Row style={styles.banner2Row}>
          <Image
            style={styles.banner2}
            url={toshiba?.baners?.['baner_2_' + currentLanguage]}
          />
          <Image
            style={styles.banner2}
            url={toshiba?.baners?.['baner_3_' + currentLanguage]}
          />
        </Row>
        <RenderHTML
          contentWidth={screenWidth}
          source={{
            html: toshiba?.info?.['text_1_' + currentLanguage],
          }}
          tagsStyles={{
            body: {
              color: Colors.black,
            },
          }}
        />
        <RenderHTML
          contentWidth={screenWidth}
          source={{
            html: toshiba?.info?.['subtitle1_' + currentLanguage],
          }}
          tagsStyles={{
            body: {
              color: Colors.black,
            },
          }}
        />
      </View>
      <ProductsWithSlide
        title={t('top_piketc')}
        products={toshiba?.products_first_slider}
      />
      <View style={styles.wrapper}>
        <Image
          style={styles.banner1}
          url={toshiba?.baners?.['baner_4_' + currentLanguage]}
        />
        <Image
          style={[styles.banner1, {marginBottom: RH(10)}]}
          url={toshiba?.baners?.['baner_5_' + currentLanguage]}
        />
      </View>
      <GridProducts products={toshiba?.products_second_slider} />
      <View style={styles.wrapper}>
        <RenderHTML
          contentWidth={screenWidth}
          source={{
            html: toshiba?.info?.['text_2_' + currentLanguage],
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

export default Toshiba;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: RW(16),
  },
  banner1: {
    width: '100%',
    aspectRatio: '2.7/1',
  },
  banner2Row: {
    columnGap: RW(5),
    marginTop: RH(5),
  },
  banner2: {
    width: RW(177),
    aspectRatio: '1.35/1',
  },
});

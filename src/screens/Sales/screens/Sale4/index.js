import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '@components/Header';
import HeaderCategories from '@components/HeaderCategories';
import SearchInput from '@screens/Home/components/SearchInputNew/SearchInput';
import {useDispatch, useSelector} from 'react-redux';
import Image from '@components/Image';
import {RH, RW, font} from '@theme/utils';
import RenderHTML from 'react-native-render-html';
import GridProducts from '@components/GridProducts';
import Banners from '@screens/Home/components/Banners';
import {getSalePage, setPending} from '@store/MainSlice';
import {filterForSalePage, searchPageProducts} from '@store/SearchPageSlice';
import {sortFunction} from '@screens/Search/helpers/sortFunction';
import Filter from '@screens/Search/components/Filter';
import Colors from '@theme/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const screenWith = Dimensions.get('screen').width;

let sortedProducts = [];
const Sale4 = props => {
  const [render, setRender] = useState(false);
  const {salePage, currentLanguage} = useSelector(({main}) => main);
  const {products, sortType} = useSelector(({searchSlice}) => searchSlice);
  let saleId = props.route.params.id;

  const dispatch = useDispatch();

  useEffect(() => {
    if (salePage?.sale?.id !== salePage) {
      dispatch(getSalePage(saleId));
    }
  }, [saleId]);
  useEffect(() => {
    if (salePage?.data?.products) {
      dispatch(filterForSalePage({slug: salePage?.sale?.id}));
    }
  }, [salePage]);

  useEffect(() => {
    if (searchPageProducts?.length) {
      sortedProducts = sortFunction(sortType, searchPageProducts);
    }
  }, [sortType, searchPageProducts]);

  useEffect(() => {
    setRender(!render);
  }, [sortedProducts]);
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.container, {paddingTop: insets.top}]}
      contentContainerStyle={{paddingBottom: RH(140)}}>
      <Header />
      <HeaderCategories />
      <SearchInput />

      <View style={styles.wrapper}>
        <Pressable
          onPress={() => {
            if (salePage?.sale?.baner_gl_navigate == 'SearchPage') {
              if (!salePage?.sale?.baner_gl_navigate_params) {
                return null;
              }
              dispatch(setPending(true));
              dispatch(
                getSearchPageInfo({
                  ...salePage?.sale?.baner_gl_navigate_params,
                  navigation,
                }),
              );
            } else if (salePage?.sale?.baner_gl_navigate) {
              navigation.navigate(
                salePage?.sale?.baner_gl_navigate,
                salePage?.sale?.baner_gl_navigate_params || {},
              );
            }
          }}>
          <Image
            style={styles.banner1}
            url={salePage?.sale?.['baner_gl_' + currentLanguage]}
          />
        </Pressable>
        {!!salePage?.sale?.['description_' + currentLanguage] && (
          <RenderHTML
            contentWidth={screenWith}
            source={{
              html: salePage?.sale?.['description_' + currentLanguage],
            }}
            tagsStyles={{
              body: {
                color: Colors.black,
              },
            }}
          />
        )}
        <Text allowFontScaling={false} style={styles.title1}>
          {salePage?.sale?.['title_' + currentLanguage]}
        </Text>
        <Banners data={salePage?.sliders} />
      </View>
      {!!sortedProducts.length && (
        <>
          <Filter />
          <GridProducts
            products={sortedProducts}
            containerStyle={{marginTop: RH(20)}}
            limit={16}
          />
        </>
      )}
    </ScrollView>
  );
};

export default Sale4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: RW(16),
  },
  banner1: {
    width: '100%',
    height: 'auto',
    aspectRatio: '3.61/1',
    alignSelf: 'center',
    borderRadius: RW(10),
    marginBottom: RH(5),
  },
  title1: {
    ...font('medium', 18),
    textAlign: 'center',
    marginTop: RH(10),
    marginBottom: RH(20),
  },
});

import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Header from '@components/Header';
import HeaderCategories from '@components/HeaderCategories';
import SearchInput from '@screens/Home/components/SearchInputNew/SearchInput';
import {getSalePage, setPending} from '@store/MainSlice';
import {useDispatch, useSelector} from 'react-redux';
import Image from '@components/Image';
import {RH, RW, font} from '@theme/utils';
import RenderHTML from 'react-native-render-html';
import BrandPageCategories from '@components/BrandPageCategories';
import {getSearchPageInfo} from '@store/SearchPageSlice';
import {useNavigation} from '@react-navigation/native';
import ProductsWithSlide from '@components/ProductsWithSlide';
import GridProducts from '@components/GridProducts';
import Colors from '@theme/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const screenWith = Dimensions.get('screen').width;
const Sale1 = props => {
  const {salePage, currentLanguage} = useSelector(({main}) => main);
  let saleId = props.route.params.id;

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (salePage?.sale?.id !== saleId) {
      dispatch(getSalePage(saleId));
    }
  }, [saleId]);
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.container, {paddingTop: insets.top}]}
      contentContainerStyle={{paddingBottom: RH(100)}}>
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
        <Text allowFontScaling={false} style={styles.title1}>
          {salePage?.sale?.['title_' + currentLanguage]}
        </Text>

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
        <BrandPageCategories
          data={salePage?.categories}
          onPress={item => {
            dispatch(setPending(true));
            dispatch(
              getSearchPageInfo({
                slug: item?.slug,
                params: {
                  b: salePage?.sale?.brand_ids
                    ? salePage?.sale?.brand_ids.split(',')
                    : [],
                },
                navigation,
                category: true,
              }),
            );
          }}
        />
      </View>
      <ProductsWithSlide products={salePage?.products_first_slider} />
      <View style={styles.wrapper}>
        <Pressable
          onPress={() => {
            if (salePage?.sale?.slider1_navigate == 'SearchPage') {
              if (!salePage?.sale?.slider1_navigate_params) {
                return null;
              }
              dispatch(setPending(true));
              dispatch(
                getSearchPageInfo({
                  ...salePage?.sale?.slider1_navigate_params,
                  navigation,
                }),
              );
            } else if (salePage?.sale?.slider1_navigate) {
              navigation.navigate(
                salePage?.sale?.slider1_navigate,
                salePage?.sale?.slider1_navigate_params || {},
              );
            }
          }}>
          <Image
            style={styles.banner1}
            url={salePage?.sale?.['slider_image1_' + currentLanguage]}
          />
        </Pressable>
        <Image
          style={styles.banner1}
          url={salePage?.sale?.['slider_image2_' + currentLanguage]}
        />
      </View>
      <GridProducts products={salePage?.products_second_slider} />
    </ScrollView>
  );
};

export default Sale1;

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

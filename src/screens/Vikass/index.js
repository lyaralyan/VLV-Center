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
import Banners from '@screens/Home/components/Banners';
import RenderHTML from 'react-native-render-html';
import {RH, RW, font} from '@theme/utils';
import BrandPageCategories from '@components/BrandPageCategories';
import Image from '@components/Image';
import GridProducts from '../../components/GridProducts/index';
import Row from '@theme/wrappers/row';
import {useNavigation} from '@react-navigation/native';
import Colors from '@theme/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getCategoryWithSlugRequest} from '@screens/Home/components/SearchInputNew/request/getCategoryWithSlugSlice';
import {setBrand} from '@screens/Home/components/SearchInputNew/request/filterSlice';
import {getBrandPageDataRequest} from '@store/getBrandPageDataSlice';

const screenWidth = Dimensions.get('screen').width;

const Vikass = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [activeId, setActiveId] = useState();
  const {currentLanguage} = useSelector(({main}) => main);
  const {vikass} = useSelector(
    ({getBrandPageDataSlice}) => getBrandPageDataSlice,
  );

  useEffect(() => {
    if (!Object.keys(vikass || {}).length) {
      dispatch(getBrandPageDataRequest('vikass'));
    }
    setActiveId(vikass?.categories3?.[0]?.id);
  }, [dispatch, vikass]);

  if (!Object.keys(vikass || {}).length) {
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
        data={vikass?.slider1}
        keyName={'image_' + currentLanguage}
        imgStyle={{width: RW(393), height: RH('100%')}}
      />

      <View style={styles.wrapper}>
        <RenderHTML
          contentWidth={screenWidth}
          source={{
            html: vikass?.info?.['descr1_' + currentLanguage],
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
            html: vikass?.info?.['subtitle1_' + currentLanguage],
          }}
          tagsStyles={{
            body: {
              color: Colors.black,
            },
          }}
        />
      </View>
      <BrandPageCategories
        data={vikass?.categories1}
        onPress={item => {
          dispatch(setBrand(vikass?.brand));
          dispatch(
            getCategoryWithSlugRequest({
              slug: item.slug,
              brand: [vikass?.brand],
              manufacture: [],
            }),
          );
          navigation.navigate('CategoryPage');
        }}
      />
      <View style={styles.wrapper}>
        <View style={styles.categoriesContainer}>
          {vikass?.categories2?.map((item, index) => (
            <Pressable
              style={styles.category}
              key={index}
              onPress={() => {
                dispatch(setBrand(vikass?.brand));
                dispatch(
                  getCategoryWithSlugRequest({
                    slug: item.slug,
                    brand: [vikass?.brand],
                    manufacture: [],
                  }),
                );
                navigation.navigate('CategoryPage');
              }}>
              <Text allowFontScaling={false} style={styles.categoryText}>
                {item?.['name_' + currentLanguage]}
              </Text>
              <Image
                style={styles.categoryImage}
                url={item?.category_image?.image}
              />
            </Pressable>
          ))}
        </View>
        <Image
          style={styles.banner1}
          url={vikass?.info?.['baner_2_' + currentLanguage]}
        />
        <Image
          style={styles.banner1}
          url={vikass?.info?.['baner_3_' + currentLanguage]}
        />
        <Text allowFontScaling={false} style={styles.subTitle2}>
          {vikass?.info?.['subtitle2_' + currentLanguage]}
        </Text>
      </View>
      <BrandPageCategories
        data={vikass?.categories3}
        setActiveId={setActiveId}
        activeId={activeId}
      />
      <GridProducts
        products={{
          products: vikass?.products_slider?.filter(
            item => item.product.categories[0].id === activeId,
          ),
        }}
      />
      <View style={styles.wrapper}>
        <Row>
          <Image
            style={styles.banner2}
            url={vikass?.info?.['baner_1_' + currentLanguage]}
          />
          <Image
            style={styles.banner2}
            url={vikass?.info?.['baner_4_' + currentLanguage]}
          />
        </Row>

        <RenderHTML
          contentWidth={screenWidth}
          source={{
            html: vikass?.info?.['descr2_' + currentLanguage],
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

export default Vikass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: RW(16),
  },
  categoriesContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    maxHeight: RH(406),
    gap: RH(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  category: {
    width: RW(178),
    height: RW(198),
    borderRadius: RW(10),
    backgroundColor: 'rgba(247, 246, 249, 1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: font('regular', 12),
  categoryImage: {
    width: RW(140),
    height: RH(140),
    marginTop: RH(6),
  },
  banner1: {
    width: '100%',
    height: RH(130),
  },
  banner2: {
    width: RW(178),
    height: RH(260),
    borderRadius: RW(20),
  },
  subTitle2: {
    alignSelf: 'center',
    ...font('medium', 18),
    marginVertical: RH(30),
  },
});

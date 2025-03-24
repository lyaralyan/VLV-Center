import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '@components/Header';
import HeaderCategories from '@components/HeaderCategories';
import SearchInput from '@screens/Home/components/SearchInputNew/SearchInput';
import {useDispatch, useSelector} from 'react-redux';
import {RH, RW, font} from '@theme/utils';
import Banners from '@screens/Home/components/Banners';
import RenderHTML from 'react-native-render-html';
import BrandPageCategories from '@components/BrandPageCategories';
import Image from '@components/Image';
import Row from '@theme/wrappers/row';
import GridProducts from '@components/GridProducts';
import Colors from '@theme/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getBrandPageDataRequest} from '@store/getBrandPageDataSlice';

const screenWidth = Dimensions.get('screen').width;
const Hisense = () => {
  const [activeId, setActiveId] = useState();
  const [activeId2, setActiveId2] = useState();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const {currentLanguage} = useSelector(({main}) => main);

  const {hisense} = useSelector(
    ({getBrandPageDataSlice}) => getBrandPageDataSlice,
  );

  useEffect(() => {
    if (!Object.keys(hisense || {}).length) {
      dispatch(getBrandPageDataRequest('hisense'));
    }
    setActiveId(hisense?.categories1?.[0]?.id);
    setActiveId2(hisense?.categories4?.[0]?.id);
  }, [dispatch, hisense]);

  if (!Object.keys(hisense || {}).length) {
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
        data={hisense?.slider1}
        imgStyle={styles.slider1Img}
        keyName={'image_' + currentLanguage}
      />
      <View style={styles.wrapper}>
        <RenderHTML
          contentWidth={screenWidth}
          source={{
            html: hisense?.info?.['descr1_' + currentLanguage],
          }}
          tagsStyles={{
            body: {
              color: Colors.black,
            },
          }}
        />
        <Text allowFontScaling={false} style={styles.title1}>
          {hisense?.info?.['subtitle1_' + currentLanguage]}
        </Text>
      </View>
      <BrandPageCategories
        data={hisense?.categories1}
        setActiveId={setActiveId}
        activeId={activeId}
      />
      <View style={styles.wrapper}>
        <Row style={styles.row}>
          {hisense?.photos
            ?.filter(prod => prod.category_id === activeId)
            .map((item, index) => {
              if (index === 0) {
                return null;
              }
              return (
                <Image
                  key={index}
                  resizeMode="cover"
                  style={styles.slider2Img}
                  url={item?.['image_' + currentLanguage]}
                />
              );
            })}
        </Row>
        <Image
          resizeMode="cover"
          style={styles.image3}
          url={hisense?.baners?.['baner_1_' + currentLanguage]}
        />
        <Text allowFontScaling={false} style={styles.title1}>
          {hisense?.info?.['subtitle2_' + currentLanguage]}
        </Text>
      </View>
      <GridProducts
        products={hisense?.products_first_slider}
        title={hisense?.categories2?.[0]['name_' + currentLanguage]}
      />
      <GridProducts
        products={hisense?.products_second_slider}
        title={hisense?.categories3?.[0]['name_' + currentLanguage]}
      />
      <View style={styles.wrapper}>
        <Image
          resizeMode="cover"
          style={styles.image3}
          url={hisense?.baners?.['baner_2_' + currentLanguage]}
        />
        <Image
          resizeMode="cover"
          style={styles.image3}
          url={hisense?.baners?.['baner_3_' + currentLanguage]}
        />
        <Image
          resizeMode="cover"
          style={styles.image3}
          url={hisense?.baners?.['baner_4_' + currentLanguage]}
        />
        <Image
          resizeMode="cover"
          style={styles.image3}
          url={hisense?.baners?.['baner_5_' + currentLanguage]}
        />
        <Text allowFontScaling={false} style={styles.title1}>
          {hisense?.info?.['subtitle4_' + currentLanguage]}
        </Text>
      </View>
      <BrandPageCategories
        data={hisense.categories4}
        setActiveId={setActiveId2}
        activeId={activeId2}
      />
      <GridProducts
        products={{
          products: hisense?.products_third_slider.filter(
            item => item.product.categories[0].id === activeId2,
          ),
        }}
      />
      <View style={styles.wrapper}>
        <RenderHTML
          contentWidth={screenWidth}
          source={{
            html: hisense?.info?.['descr2_' + currentLanguage],
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

export default Hisense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    columnGap: RW(5),
    justifyContent: 'center',
    marginBottom: RH(5),
  },
  wrapper: {
    paddingHorizontal: RW(16),
  },
  slider1Img: {
    width: RW(393),
    height: RH('100%'),
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
  image3: {
    width: '100%',
    height: 'auto',
    aspectRatio: '2.9/1',
    borderRadius: RW(10),
    marginBottom: RH(5),
  },
});

import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import BackArrowSvg from '@assets/SVG/BackArrowSvg';
import {RH, RW, font} from '@theme/utils';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Filter from '../../components/Filter';
import GridProducts from '@components/GridProducts';
import {SvgUri} from 'react-native-svg';
import {STORAGE_URL} from '@env';
import Image from '@components/Image';
import Row from '@theme/wrappers/row';
import FeatureCategories from '@screens/Home/components/FeatureCategories';
import Colors from '@theme/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import {clearFilterData} from '@screens/Home/components/SearchInputNew/request/getCategoryWithSlugSlice';
import {clearSearchData} from '@screens/Home/components/SearchInputNew/request/searchSlice';
import {setMaxPrice, setMinPrice} from '@store/SearchPageSlice';
import {clearSelectedFilters} from '@screens/Home/components/SearchInputNew/request/filterSlice';

const CategoryPage = () => {
  const currentLanguage = useSelector(({main}) => main.currentLanguage);
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const {subCategories} = useSelector(({searchSlice}) => searchSlice);
  const navigation = useNavigation();
  const {getCategoryWithSlugData} = useSelector(
    ({getCategoryWithSlugSlice}) => getCategoryWithSlugSlice,
  );

  useFocusEffect(
    useCallback(() => {
      console.info('📢 Screen Focused');

      return () => {
        console.info('📢 Screen Unfocused (Leaving)');
        dispatch(clearSelectedFilters());
        // dispatch(clearFilterData());
        dispatch(clearSearchData());
        dispatch(setMaxPrice(getCategoryWithSlugData.originalMaxPrice));
        dispatch(setMinPrice(getCategoryWithSlugData.originalMinPrice));
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <ScrollView
      style={[styles.container, {paddingTop: insets.top}]}
      showsVerticalScrollIndicator={false}>
      <View style={styles.wrapper}>
        <Row style={styles.row}>
          <Pressable
            style={{paddingHorizontal: RW(10), paddingVertical: RH(5)}}
            onPress={() => navigation.goBack()}>
            <BackArrowSvg />
          </Pressable>
          <View style={styles.headerCenter}>
            <View style={styles.subTitleContainer}>
              {!!getCategoryWithSlugData?.category?.icon &&
                (getCategoryWithSlugData?.category?.icon.endsWith('.svg') ? (
                  <SvgUri
                    width={RW(20)}
                    height={RH(20)}
                    uri={STORAGE_URL + getCategoryWithSlugData?.category?.icon}
                  />
                ) : (
                  <Image
                    style={{
                      width: RW(20),
                      height: RH(20),
                    }}
                    url={getCategoryWithSlugData?.category?.icon}
                  />
                ))}
              <Text allowFontScaling={false} style={styles.subTitle}>
                {getCategoryWithSlugData?.category?.['name_' + currentLanguage]}
              </Text>
            </View>
            {Array.isArray(getCategoryWithSlugData) &&
              getCategoryWithSlugData.length > 0 && (
                <View style={styles.count}>
                  <Text allowFontScaling={false} style={styles.countText}>
                    {String(getCategoryWithSlugData.length)}
                  </Text>
                </View>
              )}
          </View>
          <View style={{width: RW(30)}} />
        </Row>
      </View>
      {getCategoryWithSlugData?.category_slider_image?.[0]?.[
        'image_' + currentLanguage
      ] && (
        <Image
          resizeMode="cover"
          style={styles.banner}
          url={
            getCategoryWithSlugData?.slider_image?.[0]?.[
              'image_' + currentLanguage
            ]
          }
        />
      )}

      {Array.isArray(subCategories) && subCategories?.length > 0 && (
        <FeatureCategories data={subCategories} />
      )}
      <Filter />
      <GridProducts
        products={{products: getCategoryWithSlugData.products}}
        containerStyle={styles.products}
        limit={20}
        contentContainerStyle={{paddingBottom: RH(40)}}
        onPressMoreBtn={() => {}}
      />
    </ScrollView>
  );
};

export default CategoryPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: RH(60),
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: RW(10),
  },
  count: {
    backgroundColor: Colors.red,
    paddingHorizontal: RW(5),
    paddingVertical: RH(3),
    borderRadius: RW(120),
  },
  countText: font('bold', 13, '#fff'),
  wrapper: {
    paddingHorizontal: RW(16),
  },
  subTitleContainer: {
    flexDirection: 'row',
    columnGap: RW(5),
  },
  subTitle: {
    ...font('medium', 16),
  },
  products: {
    paddingVertical: RH(15),
    marginTop: RH(20),
  },
  banner: {
    width: RW(361),
    height: RH(97),
    alignSelf: 'center',
    borderRadius: RW(10),
    marginBottom: RH(10),
  },
  row: {
    alignItems: 'center',
    marginBottom: RH(20),
  },
});

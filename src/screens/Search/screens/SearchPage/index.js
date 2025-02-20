import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import BackArrowSvg from '@assets/SVG/BackArrowSvg';
import {RH, RW, font} from '@theme/utils';
import {useNavigation} from '@react-navigation/native';
import Filter from '../../components/Filter';
import GridProducts from '@components/GridProducts';
import {useTranslation} from 'react-i18next';
import SearchInput from '@screens/Home/components/SearchInputNew/SearchInput';
import {
  getDynamicPageInfo,
  getSearchPageInfo,
  searchPageData,
  searchWithKeyword,
  setActiveBrands,
  setSearch,
} from '@store/SearchPageSlice';
import {setInnerPending} from '@store/MainSlice';
import FeatureCategories from '@screens/Home/components/FeatureCategories';
import Colors from '@theme/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const SearchPage = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const currentLanguage = useSelector(({main}) => main.currentLanguage);
  const {isDynamic, searchType} = useSelector(({searchSlice}) => searchSlice);
  const {getCategoryWithSlugData} = useSelector(
    ({getCategoryWithSlugSlice}) => getCategoryWithSlugSlice,
  );

  useEffect(() => {
    dispatch(setInnerPending(false));
  }, [dispatch]);

  useEffect(() => {
    if (props.route.params?.keyword) {
      dispatch(searchWithKeyword(props.route.params?.keyword, navigation));
    } else if (props.route.params?.slug) {
      dispatch(setInnerPending(true));
      let params = {};
      if (props.route.params?.st) {
        params.st = props.route.params?.st;
        dispatch(setSearch(props.route.params?.st));
      }
      if (props.route.params?.b) {
        params.b = [props.route.params?.b];
        dispatch(setActiveBrands([props.route.params?.b]));
      }
      if (props.route.params?.dynamic) {
        dispatch(
          getDynamicPageInfo({
            slug: props.route.params?.slug,
            params: params,
            navigation,
          }),
        );
      } else {
        dispatch(
          getSearchPageInfo({
            slug: props.route.params?.slug,
            params: params,
            category: props.route.params?.item === 'category',
            brand: props.route.params?.item === 'brand',
            navigation,
          }),
        );
      }
    }
  }, [dispatch, navigation, props.route.params]);

  return (
    <ScrollView
      style={[styles.container, {paddingTop: insets.top}]}
      showsVerticalScrollIndicator={false}>
      <View style={styles.wrapper}>
        <Pressable
          style={{paddingHorizontal: RW(10), paddingVertical: RH(5)}}
          onPress={() => navigation.goBack()}>
          <BackArrowSvg />
        </Pressable>
        <View style={styles.titleContainer}>
          {isDynamic ? (
            <View>
              <Text allowFontScaling={false} style={styles.title}>
                {searchPageData?.pageTitle?.['title_' + currentLanguage]}
              </Text>
            </View>
          ) : (
            <Text allowFontScaling={false} style={styles.title}>
              {t('search_result')}
            </Text>
          )}
          {!!getCategoryWithSlugData?.productCount && (
            <View style={styles.count}>
              <Text allowFontScaling={false} style={styles.countText}>
                {getCategoryWithSlugData?.productCount}
              </Text>
            </View>
          )}
        </View>
      </View>
      <SearchInput />
      {searchPageData?.categoryList?.length > 0 && (
        <FeatureCategories
          data={searchPageData?.categoryList}
          brand={
            searchType === 'brand' &&
            searchPageData?.products?.[0]?.product?.brand?.id
          }
        />
      )}

      <Filter />
      <GridProducts
        products={getCategoryWithSlugData}
        containerStyle={styles.products}
        limit={16}
        contentContainerStyle={{paddingBottom: RH(40)}}
      />
    </ScrollView>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: RH(60),
  },
  wrapper: {
    paddingHorizontal: RW(16),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: RW(10),
  },
  title: {
    ...font('medium', 22),
    textTransform: 'uppercase',
    marginVertical: RH(13),
  },

  products: {
    paddingVertical: RH(15),
    marginTop: RH(20),
  },
  count: {
    backgroundColor: Colors.red,
    paddingHorizontal: RW(5),
    paddingVertical: RH(3),
    borderRadius: RW(120),
  },
  countText: font('bold', 13, '#fff'),
});

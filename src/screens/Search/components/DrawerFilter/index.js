import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import React, {memo, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RH, RW, font} from '@theme/utils';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  filterForSalePage,
  searchedSlug,
  setShowDrawerFilter,
} from '@store/SearchPageSlice';
import Dropdown from '../Dropdown';
import {useTranslation} from 'react-i18next';
import Colors from '@theme/colors';
import Row from '@theme/wrappers/row';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  clearSelectedFilters,
  setBrand,
  setMaxPrice,
  setMinPrice,
} from '@screens/Home/components/SearchInputNew/request/filterSlice';
import {
  clearFilterData,
  getCategoryWithSlugRequest,
} from '@screens/Home/components/SearchInputNew/request/getCategoryWithSlugSlice';
import {getBrandRequest} from '@screens/Home/components/SearchInputNew/request/getBrandSlice';
import {
  clearSearchData,
  searchRequest,
  setSearchValue,
} from '@screens/Home/components/SearchInputNew/request/searchSlice';
import PriceRange from '../PriceRange';
import DropdownDiscount from '../DropdownDiscount';
import FilterSvg from '@screens/Search/assets/FilterSvg';
import sort_types from '@screens/Search/data/sort_types';

const _drawerWith = RW(300);

const DrawerFilter = () => {
  const currentLanguage = useSelector(({main}) => main.currentLanguage);
  const {height: screenHeight} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const {searchValue, showDrawerFilter, salePage} = useSelector(
    ({searchSlice}) => searchSlice,
  );
  const {isSearchPage} = useSelector(({pageSlice}) => pageSlice);
  const {
    selectedFilters,
    brand,
    ct,
    discount,
    slug,
    maxPrice,
    minPrice,
    sort_by,
  } = useSelector(({filterSlice}) => filterSlice);
  const {getCategoryWithSlugData} = useSelector(
    ({getCategoryWithSlugSlice}) => getCategoryWithSlugSlice,
  );

  const drawerAnimation = useSharedValue(-_drawerWith);
  const backgroundAnimation = useSharedValue(0);
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const {t} = useTranslation();

  useEffect(() => {
    if (showDrawerFilter) {
      backgroundAnimation.value = withTiming(1, {duration: 100});
      drawerAnimation.value = withTiming(0, {duration: 300});
    } else {
      backgroundAnimation.value = withTiming(0, {duration: 100});
      drawerAnimation.value = withTiming(-_drawerWith, {duration: 300});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDrawerFilter]);

  const interpolatedDrawerAnimation = useAnimatedStyle(() => ({
    transform: [{translateX: drawerAnimation.value}],
  }));

  const interpolatedBackgroundAnimation = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      backgroundAnimation.value,
      [0, 1],
      ['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)'],
    ),
  }));

  const searchFunc = useCallback(
    async (value, closeFilter) => {
      if (closeFilter) {
        dispatch(setShowDrawerFilter(false));
      }

      if (value.trim().length === 0) {
        dispatch(clearSearchData());
        const data = {
          slug: getCategoryWithSlugData?.category?.slug,
          manufacture: selectedFilters,
          brand,
          ct,
          discount,
          maxPrice,
          minPrice,
          page: 1,
          sort_by,
        };

        if (isSearchPage) {
          data.sh = 1;
          data.search = slug;
          data.searchInfo = 1;
        }

        dispatch(getCategoryWithSlugRequest(data));

        return;
      } // Skip if search is empty

      const result = await dispatch(searchRequest({keyword: value})).unwrap();

      if (result.search && result?.category?.slug && result?.brand?.id) {
        dispatch(
          getCategoryWithSlugRequest({
            slug: result?.category?.slug,
            brand: result.brand?.id ? [result.brand] : undefined,
            page: 1,
            fs: String(result.search),
            sort_by,
          }),
        )
          .unwrap()
          .then(() => {
            navigation.navigate('SearchPage');
          });
      } else if (result.search) {
        dispatch(
          getCategoryWithSlugRequest({
            slug: result.search,
            searchText: value,
            searchInfo: 1,
            search: String(result.search),
            brand: result.brand?.id ? [result.brand] : undefined,
            manufacture: [],
            maxPrice: undefined,
            minPrice: undefined,
            page: 1,
            sort_by,
          }),
        )
          .unwrap()
          .then(() => {
            navigation.navigate('SearchPage');
          });
      } else if (result?.product_id) {
        navigation.navigate('ProductPage', {
          productId: result?.product_id,
        });
      } else if (result?.brand?.id && !result?.category?.name_hy) {
        dispatch(getBrandRequest({brand: result?.brand?.slug}))
          .unwrap()
          .then(res => {
            navigation.navigate('BrandCategoriesPage');
          });
      } else if (Object?.keys(result?.category)?.length > 0) {
        const firstCategory = result.category;
        dispatch(setBrand(result?.brand));
        if (firstCategory.slug) {
          dispatch(
            getCategoryWithSlugRequest({
              brand: result.brand?.id ? [result.brand] : undefined,
              slug: result?.category?.slug,
              discount,
              manufacture: [],
              maxPrice,
              minPrice,
              page: 1,
              sort_by,
            }),
          )
            .unwrap()
            .then(() => {
              navigation.navigate('CategoryPage');
            });
        }
      } else {
        navigation.navigate('SearchNull');
      }
    },
    [
      brand,
      ct,
      discount,
      dispatch,
      getCategoryWithSlugData?.category?.slug,
      isSearchPage,
      maxPrice,
      minPrice,
      navigation,
      selectedFilters,
      slug,
      sort_by,
    ],
  );

  if (!showDrawerFilter) {
    return null;
  }

  return (
    <View>
      <Animated.View
        style={[
          styles.container,
          {
            height: screenHeight - insets.top,
            top: insets.top,
          },
          interpolatedBackgroundAnimation,
        ]}>
        <Animated.View style={[styles.main, interpolatedDrawerAnimation]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                minHeight:
                  Dimensions.get('window').height - (150 + insets.bottom),
              }}>
              {typeof showDrawerFilter === 'boolean' && (
                <TextInput
                  allowFontScaling={false}
                  style={styles.input}
                  placeholderTextColor={'rgba(40, 40, 40, 0.40)'}
                  placeholder={t('search_your_item')}
                  value={searchValue}
                  onChangeText={e => {
                    dispatch(setSearchValue(e));
                    searchFunc(e);
                  }}
                />
              )}

              <Dropdown
                icon={
                  <View style={styles.filterIcon}>
                    <FilterSvg width={RW(18)} />
                  </View>
                }
                currentData={sort_types}
                opened={showDrawerFilter === 'sort'}
              />

              {(typeof showDrawerFilter === 'boolean' ||
                showDrawerFilter === 'categories') && (
                <Dropdown
                  title={t('Category')}
                  currentData={getCategoryWithSlugData?.category_list}
                  multiSelect
                  isCategory={true}
                  opened={showDrawerFilter === 'categories'}
                />
              )}

              {(typeof showDrawerFilter === 'boolean' ||
                showDrawerFilter === 'price') && (
                <PriceRange searchFunc={searchFunc} />
              )}

              {(typeof showDrawerFilter === 'boolean' ||
                showDrawerFilter === 'discount') && (
                <DropdownDiscount searchFunc={searchFunc} />
              )}

              {/* {(typeof showDrawerFilter === 'boolean' ||
                  (showDrawerFilter === 'color' &&
                    searchPageData?.color?.length > 0)) && (
                  <Dropdown
                    key={searchPageData?.color?.color?.id}
                    title={t('color')}
                    currentData={searchPageData?.color}
                    multiSelect
                    color={true}
                    opened={
                      showDrawerFilter === searchPageData.color?.color?.id
                    }
                  />
                )} */}
              {(typeof showDrawerFilter === 'boolean' ||
                showDrawerFilter === 'brands') && (
                <Dropdown
                  title={t('brands')}
                  isBrand={true}
                  currentData={getCategoryWithSlugData?.brandList}
                  multiSelect
                  opened={showDrawerFilter === 'brands'}
                />
              )}
              {getCategoryWithSlugData?.filters?.map((item, index) => {
                return (
                  <Dropdown
                    key={index}
                    title={item?.['name_' + currentLanguage]}
                    currentData={item}
                    multiSelect
                    opened={showDrawerFilter === item.id}
                  />
                );
              })}
            </View>
            <Row
              style={{
                ...styles.btnsRow,
                ...{
                  marginTop: 20,
                  marginBottom: insets.bottom,
                },
              }}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(clearSelectedFilters());
                  dispatch(clearFilterData());
                  dispatch(clearSearchData());
                  dispatch(
                    setMaxPrice(getCategoryWithSlugData.originalMaxPrice),
                  );
                  dispatch(
                    setMinPrice(getCategoryWithSlugData.originalMinPrice),
                  );

                  if (salePage) {
                    dispatch(
                      filterForSalePage({
                        slug: searchedSlug,
                        params: {},
                        navigation,
                        category: true,
                      }),
                    );
                  } else {
                    dispatch(
                      getCategoryWithSlugRequest({
                        slug: getCategoryWithSlugData.category.slug,
                        brand: [],
                        manufacture: [],
                        maxPrice: getCategoryWithSlugData.originalMaxPrice,
                        minPrice: getCategoryWithSlugData.originalMinPrice,
                        page: 1,
                        sort_by,
                      }),
                    );
                  }

                  dispatch(setShowDrawerFilter(false));
                }}
                style={styles.deleteBtn}>
                <Text allowFontScaling={false} style={styles.btnText}>
                  {t('delete')}
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity style={styles.saveBtn} onPress={searchFunc}>
                  <Text allowFontScaling={false} style={styles.btnText}>
                    {t('filter2')}
                  </Text>
                </TouchableOpacity> */}
            </Row>
          </ScrollView>
        </Animated.View>
      </Animated.View>

      {drawerAnimation.value <= 0 && (
        <TouchableOpacity
          style={[
            styles.closeView,
            {
              width: Dimensions.get('window').width - _drawerWith,
              height: Dimensions.get('window').height,
            },
          ]}
          onPress={() => {
            searchFunc('', true);
          }}
        />
      )}
    </View>
  );
};

export default memo(DrawerFilter);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    zIndex: 3,
    flex: 1,
  },
  main: {
    width: _drawerWith,
    height: '100%',
    backgroundColor: '#fff',
  },
  filterIcon: {
    width: RW(40),
    height: RW(40),
    borderRadius: RW(20),
    backgroundColor: Colors.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnsRow: {
    width: '100%',
    justifyContent: 'center',
    columnGap: RW(5),
  },
  deleteBtn: {
    width: RW(128),
    height: RH(58),
    backgroundColor: Colors.black,
    borderRadius: RH(28),
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveBtn: {
    width: RW(128),
    height: RH(58),
    backgroundColor: Colors.red,
    borderRadius: RH(28),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: font('regular', 12, '#fff'),
  input: {
    marginLeft: RW(15),
    marginRight: RW(30),
    width: '100%',
    height: RH(45),
    borderRadius: RW(8),
    marginVertical: RH(15),
    textAlign: 'center',
    borderColor: 'rgba(40, 40, 40, 0.20)',
    borderWidth: RW(1),
    maxWidth: RW(250),
    ...font('regular', 12, 'rgba(40, 40, 40, 0.60)'),
  },
  closeView: {
    position: 'absolute',
    right: 0,
    zIndex: 10,
  },
});

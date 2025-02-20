import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FilterSvg from '@screens/Search/assets/FilterSvg';
import {RH, RW, font} from '@theme/utils';
import Colors from '@theme/colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  filterForSalePage,
  getDynamicPageInfo,
  getSearchPageInfo,
  last_request_params,
  searchPageData,
  searchedSlug,
  setActiveBrands,
  setActiveCategories,
  setActiveColor,
  setActiveDiscount,
  setActiveMaxPrice,
  setActiveMinPrice,
  setSearch,
  setShowDrawerFilter,
} from '@store/SearchPageSlice';
import {useTranslation} from 'react-i18next';
import CloseSvg from '@assets/SVG/CloseSvg';
import {useNavigation} from '@react-navigation/native';
import {setInnerPending} from '@store/MainSlice';
import {getCategoryWithSlugRequest} from '@screens/Home/components/SearchInputNew/request/getCategoryWithSlugSlice';
import {setSelectedFilters} from '@screens/Home/components/SearchInputNew/request/filterSlice';

const Filter = () => {
  const {currentLanguage} = useSelector(({main}) => main);
  const {
    brands,
    activeAttributes,
    activeCategories,
    activeBrands,
    activeColor,
    activeMaxPrice,
    activeMinPrice,
    activeDiscount,
    salePage,
    isDynamic,
    search,
  } = useSelector(({searchSlice}) => searchSlice);
  const {getCategoryWithSlugData} = useSelector(
    ({getCategoryWithSlugSlice}) => getCategoryWithSlugSlice,
  );
  const {selectedFilters, brand, discount, maxPrice, minPrice, sort_by} =
    useSelector(({filterSlice}) => filterSlice);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {t} = useTranslation();

  const toggleCheckbox = item => {
    const updatedFilters = [...selectedFilters];

    // Check if the item is already in selectedFilters
    const itemIndex = updatedFilters.findIndex(val => val.id === item.id);

    if (itemIndex !== -1) {
      // ✅ Item exists → Remove it (toggle off)
      updatedFilters.splice(itemIndex, 1);
    } else {
      // ✅ Item does not exist → Add it (toggle on)
      updatedFilters.push(item);
    }

    dispatch(
      getCategoryWithSlugRequest({
        slug:
          getCategoryWithSlugData?.category?.slug ||
          getCategoryWithSlugData?.category_list[0]?.slug,
        manufacture: updatedFilters,
        brand,
        discount,
        maxPrice,
        minPrice,
        page: 1,
        sort_by,
      }),
    );
    // Dispatch updated filters to Redux
    dispatch(setSelectedFilters(updatedFilters));
  };

  const isFilterSelected = selectedFilters.map(fil => fil.length);

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          paddingHorizontal: RW(16),
          columnGap: RW(6),
          marginTop: RH(25),
        }}>
        <Pressable
          style={({pressed}) => [
            styles.filterBtn,
            {backgroundColor: pressed ? Colors.darkRed : Colors.red},
          ]}
          onPress={() => {
            dispatch(setShowDrawerFilter(true));
          }}>
          <FilterSvg />
        </Pressable>
        <Pressable
          style={({pressed}) => [
            styles.sortBtn,
            {backgroundColor: pressed ? Colors.darkRed : Colors.red},
          ]}
          onPress={() => dispatch(setShowDrawerFilter('sort'))}>
          <Text allowFontScaling={false} style={styles.sortBtnText}>
            {t('sorting')}
          </Text>
        </Pressable>

        {Array.isArray(brand) && brand?.length > 1 && (
          <Pressable
            style={styles.btn}
            onPress={() => dispatch(setShowDrawerFilter('brands'))}>
            <Text allowFontScaling={false} style={styles.btnText}>
              {t('brands')}
            </Text>
          </Pressable>
        )}

        {Array.isArray(getCategoryWithSlugData.category_list) &&
          getCategoryWithSlugData.category_list?.length > 1 && (
            <Pressable
              style={styles.btn}
              onPress={() => dispatch(setShowDrawerFilter('categories'))}>
              <Text allowFontScaling={false} style={styles.btnText}>
                {t('Category')}
              </Text>
            </Pressable>
          )}
        {discount !== 0 && (
          <Pressable
            style={styles.btn}
            onPress={() => dispatch(setShowDrawerFilter('discount'))}>
            <Text allowFontScaling={false} style={styles.btnText}>
              {t('discounted_products')}
            </Text>
          </Pressable>
        )}
        <Pressable
          style={styles.btn}
          onPress={() => dispatch(setShowDrawerFilter('price'))}>
          <Text allowFontScaling={false} style={styles.btnText}>
            {t('price')}
          </Text>
        </Pressable>
        {searchPageData?.attributes?.map((item, index) => {
          if (!item?.show_in_mobile) {
            return null;
          }
          if (item?.attribute_values?.length > 1) {
            return (
              <Pressable
                style={styles.btn}
                key={index}
                onPress={() => dispatch(setShowDrawerFilter(item.id))}>
                <Text allowFontScaling={false} style={styles.btnText}>
                  {item?.['name_' + currentLanguage]}
                </Text>
              </Pressable>
            );
          }
        })}
      </ScrollView>
      <View style={styles.activeAttributes}>
        {search !== '' && (
          <Pressable
            style={styles.btn}
            onPress={e => {
              dispatch(setInnerPending(true));
              dispatch(setSearch(''));
              let data = activeBrands.filter(({id}) => {
                return e.id !== id;
              });
              dispatch(setActiveBrands(data));

              const params = {
                ct: activeCategories,
                c: activeColor, // ct u c helnuma
                b: data,
                mx: activeMaxPrice,
                mn: activeMinPrice,
                d: +activeDiscount,
                a: activeAttributes,
              };
              if (salePage) {
                dispatch(
                  filterForSalePage({
                    slug: searchedSlug,
                    params,
                    navigation,
                    category: true,
                  }),
                );
                dispatch(setShowDrawerFilter(false));
              } else if (
                (Object.keys(last_request_params || {}).length > 0 &&
                  JSON.stringify(last_request_params) !==
                    JSON.stringify(params)) ||
                !Object.keys(last_request_params || {}).length > 0
              ) {
                dispatch(
                  getSearchPageInfo({
                    slug: searchedSlug,
                    params,
                    navigation,
                    category: true,
                  }),
                );
              }
            }}>
            <Text allowFontScaling={false} style={styles.btnText}>
              {search}
            </Text>

            <CloseSvg width={RW(10)} color={Colors.red} />
          </Pressable>
        )}
        {Array.isArray(activeCategories) &&
          activeCategories?.length > 0 &&
          activeCategories.map((e, index) => (
            <Pressable
              key={index}
              style={styles.btn}
              onPress={() => {
                dispatch(setInnerPending(true));
                let data = activeCategories.filter(({value}) => {
                  return e.value !== value;
                });

                dispatch(setActiveCategories(data));
                const params = {
                  ct: data,
                  c: activeColor,
                  b: activeBrands,
                  mx: activeMaxPrice,
                  mn: activeMinPrice,
                  d: +activeDiscount,
                  a: activeAttributes,
                };
                if (isDynamic) {
                  dispatch(
                    getDynamicPageInfo({
                      slug: searchedSlug,
                      params,
                      navigation,
                    }),
                  );
                } else if (salePage) {
                  dispatch(
                    filterForSalePage({
                      slug: searchedSlug,
                      params,
                      navigation,
                      category: true,
                    }),
                  );
                  dispatch(setShowDrawerFilter(false));
                } else if (
                  (Object.keys(last_request_params || {})?.length > 0 &&
                    JSON.stringify(last_request_params) !==
                      JSON.stringify(params)) ||
                  !Object.keys(last_request_params || {})?.length > 0
                ) {
                  dispatch(
                    getSearchPageInfo({
                      slug: searchedSlug,
                      params,
                      navigation,
                      category: true,
                    }),
                  );
                }
                dispatch(setInnerPending(false));
              }}>
              <Text allowFontScaling={false} style={styles.btnText}>
                {e.value}
              </Text>

              <CloseSvg width={RW(10)} color={Colors.red} />
            </Pressable>
          ))}
        {Array.isArray(activeBrands) &&
          activeBrands?.length > 0 &&
          activeBrands.map((e, index) => (
            <Pressable
              key={index}
              style={styles.btn}
              onPress={() => {
                dispatch(setInnerPending(true));
                let data = activeBrands.filter(({id}) => {
                  return e.id !== id;
                });
                dispatch(setActiveBrands(data));

                const params = {
                  ct: activeCategories,
                  c: activeColor,
                  b: data,
                  mx: activeMaxPrice,
                  mn: activeMinPrice,
                  d: +activeDiscount,
                  a: activeAttributes,
                };
                if (salePage) {
                  dispatch(
                    filterForSalePage({
                      slug: searchedSlug,
                      params,
                      navigation,
                      category: true,
                    }),
                  );
                  dispatch(setShowDrawerFilter(false));
                } else if (
                  (Object.keys(last_request_params || {}).length > 0 &&
                    JSON.stringify(last_request_params) !==
                      JSON.stringify(params)) ||
                  !Object.keys(last_request_params || {}).length > 0
                ) {
                  dispatch(
                    getSearchPageInfo({
                      slug: searchedSlug,
                      params,
                      navigation,
                      category: true,
                    }),
                  );
                }
              }}>
              <Text allowFontScaling={false} style={styles.btnText}>
                {e?.name || brands.find(item => item.id === e)?.name || ''}
              </Text>

              <CloseSvg width={RW(10)} color={Colors.red} />
            </Pressable>
          ))}
        {activeDiscount && (
          <Pressable
            style={styles.btn}
            onPress={() => {
              dispatch(setInnerPending(true));
              dispatch(setActiveDiscount(false));
              const params = {
                ct: activeCategories,
                c: activeColor,
                b: activeBrands,
                mx: activeMaxPrice,
                mn: activeMinPrice,
                d: 0,
                a: activeAttributes,
              };
              if (salePage) {
                dispatch(
                  filterForSalePage({
                    slug: searchedSlug,
                    params,
                    navigation,
                    category: true,
                  }),
                );
                dispatch(setShowDrawerFilter(false));
              } else if (
                (Object.keys(last_request_params || {}).length > 0 &&
                  JSON.stringify(last_request_params) !==
                    JSON.stringify(params)) ||
                !Object.keys(last_request_params || {}).length > 0
              ) {
                dispatch(
                  getSearchPageInfo({
                    slug: searchedSlug,
                    params,
                    navigation,
                    category: true,
                  }),
                );
              }
            }}>
            <Text allowFontScaling={false} style={styles.btnText}>
              {t('discounted_products')}
            </Text>

            <CloseSvg width={RW(10)} color={Colors.red} />
          </Pressable>
        )}

        {(!!(activeMinPrice && activeMinPrice !== minPrice) ||
          !!(activeMaxPrice && activeMaxPrice !== maxPrice)) && (
          <Pressable
            style={styles.btn}
            onPress={() => {
              dispatch(setInnerPending(true));
              dispatch(setActiveMinPrice(minPrice));
              dispatch(setActiveMaxPrice(maxPrice));
              const params = {
                ct: activeCategories,
                c: activeColor,
                b: activeBrands,
                mx: maxPrice,
                mn: minPrice,
                d: +activeDiscount,
                a: activeAttributes,
              };
              if (salePage) {
                dispatch(
                  filterForSalePage({
                    slug: searchedSlug,
                    params,
                    navigation,
                    category: true,
                  }),
                );
                dispatch(setShowDrawerFilter(false));
              } else if (
                (Object.keys(last_request_params || {}).length > 0 &&
                  JSON.stringify(last_request_params) !==
                    JSON.stringify(params)) ||
                !Object.keys(last_request_params || {}).length > 0
              ) {
                dispatch(
                  getSearchPageInfo({
                    slug: searchedSlug,
                    params,
                    navigation,
                    category: true,
                  }),
                );
              }
            }}>
            <Text allowFontScaling={false} style={styles.btnText}>
              {t('price')}
            </Text>

            <CloseSvg width={RW(10)} color={Colors.red} />
          </Pressable>
        )}

        {Object.keys(activeColor).map((key, index) => {
          return (
            <Pressable
              key={index}
              style={styles.btn}
              onPress={() => {
                dispatch(setInnerPending(true));
                let data = {...activeColor};
                delete data[key];

                dispatch(setActiveColor(data));
                const params = {
                  ct: activeCategories,
                  c: data,
                  b: activeBrands,
                  mx: activeMaxPrice,
                  mn: activeMinPrice,
                  d: +activeDiscount,
                  a: activeAttributes,
                };
                if (salePage) {
                  dispatch(
                    filterForSalePage({
                      slug: searchedSlug,
                      params,
                      navigation,
                      category: true,
                    }),
                  );
                  dispatch(setShowDrawerFilter(false));
                } else if (
                  (Object.keys(last_request_params || {}).length > 0 &&
                    JSON.stringify(last_request_params) !==
                      JSON.stringify(params)) ||
                  !Object.keys(last_request_params || {}).length > 0
                ) {
                  dispatch(
                    getSearchPageInfo({
                      slug: searchedSlug,
                      params,
                      navigation,
                      category: true,
                    }),
                  );
                }
              }}>
              <Text allowFontScaling={false} style={styles.btnText}>
                {String(
                  activeColor[key][0]?.color?.['name_' + currentLanguage] || '',
                )}
              </Text>

              <CloseSvg width={RW(10)} color={Colors.red} />
            </Pressable>
          );
        })}
        {isFilterSelected &&
          selectedFilters?.map((e, index) => (
            <Pressable
              key={index}
              style={styles.btn}
              onPress={async () => {
                await toggleCheckbox(e);
              }}>
              <Text allowFontScaling={false} style={styles.btnText}>
                {String(e?.values[0]?.['value_' + currentLanguage] || '')}
              </Text>

              <CloseSvg width={RW(10)} color={Colors.red} />
            </Pressable>
          ))}
      </View>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  filterBtn: {
    width: RW(52),
    height: RW(52),
    borderRadius: RW(26),
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortBtn: {
    height: RW(52),
    paddingHorizontal: RW(20),
    justifyContent: 'center',
    borderRadius: RW(26),
  },
  sortBtnText: font('bold', 15, '#fff'),
  btn: {
    height: RW(52),
    paddingHorizontal: RW(20),
    justifyContent: 'center',
    backgroundColor: '#f7f6f9',
    borderRadius: RW(26),
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: RW(5),
  },
  btnText: font('bold', 15),
  activeAttributes: {
    paddingHorizontal: RW(16),
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: RH(15),
    gap: RW(6),
  },
});

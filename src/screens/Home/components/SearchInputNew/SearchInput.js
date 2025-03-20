import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import React, {createRef, useCallback, useState} from 'react';
import {font, RH, RW} from '@theme/utils';
import QrScanSvg from './assets/QrScanSvg';
import SearchSvg from './assets/SearchSvg';
import Colors from '../../../../theme/colors';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setShowCamera} from '@store/MainSlice';
import {useTranslation} from 'react-i18next';
import {clearSearchData, searchRequest} from './request/searchSlice';
import {getCategoryWithSlugRequest} from './request/getCategoryWithSlugSlice';
import {getBrandsRequest} from './request/getBrandsSlice';
import {setBrand, setSlug} from './request/filterSlice';
export const searchRef = createRef();

const SearchInput = ({containerStyle = {}}) => {
  const [value, setValue] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {discount, maxPrice, minPrice, sort_by} = useSelector(
    state => state.filterSlice,
  );

  const onSubmit = useCallback(async () => {
    dispatch(setSlug(''));
    if (value.trim().length === 0) {
      dispatch(clearSearchData());
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
          manufacture: [],
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
          sort_by: undefined,
        }),
      )
        .unwrap()
        .then(res => {
          navigation.navigate('SearchPage');
        });
    } else if (result?.product_id) {
      navigation.navigate('ProductPage', {
        productId: result?.product_id,
      });
    } else if (result?.brand?.id && !result?.category?.name_hy) {
      dispatch(getBrandsRequest({brand: result?.brand?.slug}))
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
  }, [discount, dispatch, maxPrice, minPrice, navigation, sort_by, value]);

  return (
    <View style={styles.container}>
      <View style={[styles.main, containerStyle]}>
        <Pressable
          onPress={() => dispatch(setShowCamera(true))}
          style={styles.qrScanBtn}>
          <QrScanSvg />
        </Pressable>
        <TextInput
          allowFontScaling={false}
          ref={searchRef}
          style={styles.input}
          placeholderTextColor={'rgba(40, 40, 40, 0.40)'}
          placeholder={t('search_your_item')}
          value={value}
          onChangeText={setValue}
          onSubmitEditing={onSubmit}
        />
        <Pressable
          onPress={onSubmit}
          style={({pressed}) => [
            styles.searchBtn,
            {backgroundColor: pressed ? Colors.darkRed : Colors.red},
          ]}>
          <SearchSvg />
        </Pressable>
      </View>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: RH(15),
  },
  main: {
    width: RW(360),
    height: RH(45),
    borderColor: 'rgba(40, 40, 40, 0.20)',
    borderWidth: RW(1),
    borderRadius: RW(8),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    maxWidth: RW(250),
    ...font('regular', 12, 'rgba(40, 40, 40, 0.60)'),
  },
  qrScanBtn: {
    position: 'absolute',
    left: RW(6),
    alignSelf: 'center',
  },
  searchBtn: {
    position: 'absolute',
    right: RW(6),
    alignSelf: 'center',
    width: RW(42),
    height: RH(32),
    borderRadius: RW(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import React from 'react';
import {Pressable, StyleSheet, Text, View, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Header from '@components/InnerHeader';
import {RH, RW, font} from '@theme/utils';
import {SvgUri} from 'react-native-svg';
import Colors from '@theme/colors';
import Image from '@components/Image';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getCategoryWithSlugRequest} from '@screens/Home/components/SearchInputNew/request/getCategoryWithSlugSlice';
import {
  setBrand,
  setSlug,
} from '@screens/Home/components/SearchInputNew/request/filterSlice';

const BrandCategoriesPage = props => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const {currentLanguage} = useSelector(({main}) => main);
  const {getBrandData} = useSelector(({getBrandSlice}) => getBrandSlice);
  const {selectedFilters, discount, maxPrice, minPrice, sort_by} = useSelector(
    ({filterSlice}) => filterSlice,
  );

  const dispatch = useDispatch();

  const handlePress = async (brandId, slug) => {
    try {
      const brandResult = await dispatch(setBrand(brandId));

      await dispatch(
        getCategoryWithSlugRequest({
          brand: [brandResult.payload],
          slug,
          discount,
          manufacture: selectedFilters,
          maxPrice,
          minPrice,
          page: 1,
          sort_by,
        }),
      );

      // Set the slug after the request
      dispatch(setSlug(slug));

      navigation.navigate('CategoryPage');
    } catch (error) {
      console.error('Error handling brand press:', error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        marginTop: insets.top,
        paddingBottom: RH(140),
      }}>
      <Header title={getBrandData?.brand_info?.name} />
      <View style={styles.wrapper}>
        <View style={styles.headRow}>
          {/* <Image url={getBrandData?.brand_info?.logo} style={styles.logo} /> */}
          <SvgUri uri={getBrandData?.brand_info?.logo} style={styles.logo} />
          <Text allowFontScaling={false} style={styles.title}>
            {getBrandData?.brand_info?.name}
          </Text>
          <View style={styles.count}>
            <Text allowFontScaling={false} style={styles.countText}>
              {getBrandData?.product_count}
            </Text>
          </View>
        </View>
        <View style={styles.categories}>
          {getBrandData?.brand_categories?.map((item, index) => (
            <Pressable
              onPress={() => handlePress(getBrandData?.brand_info, item.slug)}
              style={styles.categoryItem}
              key={index}>
              <View style={styles.categoryItemImageBlock}>
                <Image
                  style={styles.categoryItemImage}
                  url={item?.category_image?.image}
                />
              </View>
              <Text allowFontScaling={false} style={styles.categoryItemText}>
                {item?.['name_' + currentLanguage]}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: RW(16),
  },
  headRow: {
    flexDirection: 'row',
    columnGap: RW(10),
    alignItems: 'center',
    marginVertical: RH(20),
  },
  logo: {
    width: RW(60),
    height: RH(30),
  },
  title: {
    ...font('medium', 20, Colors.black),
  },
  count: {
    height: RH(25),
    paddingHorizontal: RW(12),
    backgroundColor: Colors.red,
    borderRadius: RH(13),
    justifyContent: 'center',
  },
  countText: font('medium', 16, '#fff'),
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    rowGap: RH(30),
  },
  categoryItem: {
    width: RW(170),
    alignItems: 'center',
    rowGap: RH(10),
  },
  categoryItemImageBlock: {
    width: RW(170),
    height: RW(170),
    backgroundColor: Colors.bgGray,
    borderRadius: RW(85),
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryItemImage: {
    width: RW(120),
    height: RH(100),
  },
  categoryItemText: {
    textAlign: 'center',
    ...font('regular', 14),
  },
});

export default BrandCategoriesPage;

import {StyleSheet} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import FeatureCategoriesItem from './components/FeatureCategoriesItem/FeatureCategoriesItem';
import {FlatList} from 'react-native-gesture-handler';
import {RW} from '@theme/utils';

const FeatureCategories = ({data, onPress, style = {}, brand}) => {
  const {currentLanguage} = useSelector(({main}) => main);
  const {featureCategories} = useSelector(
    ({getFeatureCategoriesSlice}) => getFeatureCategoriesSlice,
  );

  return (
    <FlatList
      data={data || featureCategories}
      horizontal
      keyExtractor={(_, index) => `key-${index}`}
      contentContainerStyle={[styles.featureCategories, style]}
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => {
        return (
          <FeatureCategoriesItem
            title={
              item?.['title_' + currentLanguage] ||
              item?.['name_' + currentLanguage]
            }
            img={
              item?.image?.image ||
              item?.image ||
              item?.category_image?.image ||
              item?.icon
            }
            slug={item?.slug}
            onPress={onPress}
            brand={brand}
          />
        );
      }}
    />
  );
};

export default FeatureCategories;

const styles = StyleSheet.create({
  featureCategories: {
    paddingHorizontal: RW(12),
  },
});

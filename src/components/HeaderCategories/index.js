import {StyleSheet} from 'react-native';
import React from 'react';
import HaedaerCategoryItem from './components/HaedaerCategoryItem';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {RH, RW} from '@theme/utils';

const HeaderCategories = () => {
  const {headerCategorys, currentLanguage} = useSelector(({main}) => main);

  return (
    <FlatList
      data={headerCategorys}
      horizontal
      keyExtractor={(item, index) => `key-${index}`}
      showsHorizontalScrollIndicator={false}
      style={styles.headerCategories}
      contentContainerStyle={{paddingHorizontal: RW(15)}}
      renderItem={({item, index}) => {
        return (
          <HaedaerCategoryItem
            name={item?.['name_' + currentLanguage]}
            icon={item?.icon}
            logo={item?.logo}
            slug={item?.slug}
            brand={index > 3}
          />
        );
      }}
    />
  );
};

export default HeaderCategories;

const styles = StyleSheet.create({
  headerCategories: {
    maxHeight: RW(54),
    marginTop: RH(15),
  },
});

import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import {RH, RW, font} from '../../../../../../theme/utils';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Image from '@components/Image';
import {getCategoryWithSlugRequest} from '@screens/Home/components/SearchInputNew/request/getCategoryWithSlugSlice';

const FeatureCategoriesItem = ({img, title, slug, onPress = () => {}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {selectedFilters, discount, maxPrice, minPrice, sort_by} = useSelector(
    ({filterSlice}) => filterSlice,
  );

  const handlePress = async () => {
    try {
      await dispatch(
        getCategoryWithSlugRequest({
          brand: [],
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
      // dispatch(setSlug(slug));

      navigation.navigate('CategoryPage');
    } catch (error) {
      console.error('Error handling brand press:', error);
    }
  };

  return (
    <Pressable
      onPress={() => {
        handlePress();
        onPress();
      }}
      style={styles.container}>
      <Text allowFontScaling={false} style={styles.title} ellipsizeMode="tail">
        {title}
      </Text>
      <Image style={styles.img} url={img} />
    </Pressable>
  );
};

export default FeatureCategoriesItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(247, 246, 249)',
    width: RW(101),
    height: RH(102),
    marginHorizontal: RW(5),
    borderRadius: RH(5),
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  title: {
    ...font('medium', 9.5),
    marginTop: RH(12),
    marginLeft: RW(7),
  },
  img: {
    width: RW(90),
    height: RH(90),
    alignSelf: 'flex-end',
    right: -RW(20),
  },
});

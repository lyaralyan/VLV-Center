import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {RH, RW} from '../../../../../../theme/utils';
import Image from '@components/Image';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const SaleItem = ({item, width = RW(100), height = RH(150)}) => {
  const navigation = useNavigation();
  const currentLanguage = useSelector(({main}) => main.currentLanguage);
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('Sale' + (item?.view || 1), {
          id: item?.gallary_images[0].sale_id,
        });
      }}>
      <Image
        style={[styles.image, {height}]}
        url={
          item?.gallary_images?.find(elem => elem?.lang === currentLanguage)
            ?.image
        }
      />
    </Pressable>
  );
};

export default SaleItem;

const styles = StyleSheet.create({
  image: {
    borderRadius: RH(6),
    marginHorizontal: RW(5),
    aspectRatio: '0.65/1',
  },
});

import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import {RH, RW, font} from '../../../../../../theme/utils';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getSearchPageInfo} from '@store/SearchPageSlice';
import Image from '@components/Image';
import {setPending} from '@store/MainSlice';

const FeatureCategoriesItem = ({
  img,
  title,
  slug,
  onPress = () => {},
  brand,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        let params = {};
        if (brand) {
          params.b = [brand];
        }
        dispatch(setPending(true));
        dispatch(
          getSearchPageInfo({
            slug: slug,
            params,
            navigation,
            category: true,
          }),
        );
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

import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import {SvgUri} from 'react-native-svg';
import {STORAGE_URL} from '@env';
import {RW, font} from '../../../../theme/utils';
import {useNavigation} from '@react-navigation/native';
import Image from '@components/Image';
import {getBrandPageData} from '@store/MainSlice';
import {useDispatch} from 'react-redux';

const capitalizeFirstLetter = word => {
  let withoutFirst = word.slice(1, word.length);
  let firstLetter = word.slice(0, 1);
  return firstLetter.toUpperCase() + withoutFirst;
};
const HaedaerCategoryItem = ({icon, logo, name, active = false, slug}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <Pressable
      style={[styles.container, active && {width: 'auto', padding: RW(15)}]}
      onPress={() => {
        if (!icon) {
          dispatch(getBrandPageData(slug));

          navigation.navigate(capitalizeFirstLetter(slug));
        } else {
          navigation.navigate('CatalogPage', {slug: slug});
        }
      }}>
      {icon ? (
        <SvgUri
          width={RW(24)}
          height={RW(24)}
          uri={STORAGE_URL + (icon || logo)}
        />
      ) : (
        <Image style={{width: RW(40), height: RW(24)}} url={logo} />
      )}

      {active && (
        <Text allowFontScaling={false} style={styles.text}>
          {name}
        </Text>
      )}
    </Pressable>
  );
};

export default HaedaerCategoryItem;

const styles = StyleSheet.create({
  container: {
    height: RW(54),
    width: RW(54),
    borderRadius: RW(50),
    backgroundColor: 'rgb(247, 246, 249)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: RW(5),
    flexDirection: 'row',
    columnGap: 13,
  },
  text: {
    maxHeight: RW(24),
    flexWrap: 'wrap',
    maxWidth: RW(75),
    textTransform: 'uppercase',
    ...font('medium', 9.8),
  },
});

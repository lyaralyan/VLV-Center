import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {font, RW, RH} from '@theme/utils';
import Row from '@theme/wrappers/row';
import {useTranslation} from 'react-i18next';
import {getBrandCategories, getBrands} from '../../../../store/MainSlice';
import Image from '@components/Image';
import {useNavigation} from '@react-navigation/native';
import Colors from '@theme/colors';

const Brands = ({data}) => {
  const brands = useSelector(({main}) => main.brands);
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (!brands?.length) {
      dispatch(getBrands());
    }
  }, []);

  return (
    <View style={styles.container}>
      <Row style={styles.sectionHeaeder}>
        <Text allowFontScaling={false} style={styles.sectionHeaederTitle}>
          {t('brands')}
        </Text>
        <Pressable onPress={() => navigation.navigate('Brands')}>
          <Text allowFontScaling={false} style={styles.sectionHeaederMoreText}>
            {t('see_all')}
          </Text>
        </Pressable>
      </Row>
      <ScrollView
        contentContainerStyle={styles.brands}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {(data || brands)?.map((item, index) => {
          return (
            <Pressable
              key={index}
              style={styles.brandBtn}
              onPress={() =>
                dispatch(getBrandCategories(item.slug, navigation))
              }>
              <Image style={styles.brand} url={item.logo} />
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Brands;

const styles = StyleSheet.create({
  container: {
    marginBottom: RH(45),
  },
  sectionHeaeder: {
    justifyContent: 'space-between',
    marginTop: RH(28),
    marginBottom: RH(12),
    paddingHorizontal: RW(15),
  },
  sectionHeaederTitle: {
    textTransform: 'uppercase',
    ...font('medium', 14),
  },
  sectionHeaederMoreText: {
    ...font('regular', 12, 'rgba(137, 137, 137, 1)'),
  },
  brands: {
    paddingHorizontal: RW(11),
    columnGap: RW(15),
  },
  brandBtn: {
    width: RW(150),
    height: RH(70),
    borderWidth: RW(1),
    borderColor: '#eee',
    borderRadius: RW(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  brand: {
    width: RW(90),
    height: RH(35),
    resizeMode: 'contain',
  },
});

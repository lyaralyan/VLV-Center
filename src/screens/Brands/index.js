import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {getAllBrands, getBrandCategories} from '@store/MainSlice';
import {useDispatch, useSelector} from 'react-redux';
import Header from '@components/InnerHeader';
import Image from '@components/Image';
import {RH, RW, font} from '@theme/utils';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getBrandsRequest} from '@screens/Home/components/SearchInputNew/request/getBrandsSlice';

const Brands = () => {
  const allBrands = useSelector(({main}) => main.allBrands);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    dispatch(getAllBrands());
  }, []);

  const {t} = useTranslation();
  return (
    <View style={{flex: 1, paddingTop: insets.top}}>
      <Header title={t('brands')} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        {allBrands.map((item, index) => (
          <Pressable
            style={styles.btn}
            key={index}
            onPress={() => {
              dispatch(getBrandsRequest({brand: item.slug}))
                .unwrap()
                .then(res => {
                  navigation.navigate('BrandCategoriesPage');
                });
            }}>
            <Image style={styles.brand} url={item.logo} />
            <Text allowFontScaling={false} style={styles.brandName}>
              {item.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default Brands;

const styles = StyleSheet.create({
  contentContainerStyle: {
    alignItems: 'center',
    gap: RW(15),
    marginTop: RH(40),
    paddingBottom: RH(140),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  btn: {
    width: RW(166),
    height: RH(80),
    borderRadius: RW(10),
    borderWidth: RW(1),
    borderColor: 'rgba(40, 40, 40, 0.3)',
    justifyContent: 'center',
  },
  brand: {
    width: RW(100),
    height: RH(40),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  brandName: {
    ...font('bold', 10),
    position: 'absolute',
    left: RW(8),
    bottom: RH(5),
  },
});

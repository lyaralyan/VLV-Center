import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Header from '@components/InnerHeader';
import Image from '@components/Image';
import {RH, RW, font} from '@theme/utils';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getBrandRequest} from '@screens/Home/components/SearchInputNew/request/getBrandSlice';
import {getAllBrandsRequest} from '@store/getAllBrandsSlice';

const Brands = () => {
  const {allBrands} = useSelector(({getAllBrandsSlice}) => getAllBrandsSlice);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const {t} = useTranslation();

  useEffect(() => {
    dispatch(getAllBrandsRequest());
  }, [dispatch]);

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <Header title={t('brands')} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        {allBrands?.map((item, index) => (
          <Pressable
            style={styles.btn}
            key={index}
            onPress={() => {
              dispatch(getBrandRequest({brand: item.slug}))
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
  container: {
    flex: 1,
  },
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

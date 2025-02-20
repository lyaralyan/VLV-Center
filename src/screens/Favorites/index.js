import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Header from '@components/InnerHeader';

import GridProducts from '@components/GridProducts';
import {useDispatch, useSelector} from 'react-redux';
import {
  addWishList,
  getFavoritesPageproducts,
  removeFavorites,
  setFavoritesPageproducts,
} from '@store/CartSlice';
import {SvgUri} from 'react-native-svg';
import {RH, font} from '@theme/utils';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Favorites = () => {
  const {favoritesPageproducts} = useSelector(({cart}) => cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFavoritesPageproducts());
  }, []);
  const insets = useSafeAreaInsets();
  const {t} = useTranslation();
  return (
    <View style={{flex: 1, paddingTop: insets.top}}>
      <Header title={t('Favorites')} />

      {favoritesPageproducts?.length ? (
        <GridProducts
          products={favoritesPageproducts}
          containerStyle={{backgroundColor: '#fff'}}
          contentContainerStyle={{
            backgroundColor: '#fff',
            paddingBottom: RH(100),
          }}
          scrollEnabled={true}
          onDeletePress={product => {
            dispatch(removeFavorites(product?.seller_product_id));
            dispatch(
              addWishList({
                seller_product_id: product?.seller_product_id,
              }),
            );
            let filteredData = favoritesPageproducts.filter(
              ({seller_product_sku_id}) =>
                seller_product_sku_id !== product?.seller_product_sku_id,
            );
            dispatch(setFavoritesPageproducts(filteredData));
          }}
        />
      ) : (
        <View style={styles.notFavoritesContainer}>
          <SvgUri uri={'https://vlv.am/public/img/novu.svg'} />
          <Text allowFontScaling={false} style={styles.notFavoritesText}>
            {t('not_favs')}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  notFavoritesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: RH(30),
  },
  notFavoritesText: {
    ...font('medium', 16),
    textTransform: 'uppercase',
    marginTop: RH(20),
  },
});

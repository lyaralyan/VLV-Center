import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {RH, font} from '@theme/utils';
import {useDispatch, useSelector} from 'react-redux';
import {
  addWishList,
  removeFavorites,
  setFavoritesPageproducts,
} from '@store/CartSlice';
import GridProducts from '@components/GridProducts';
import {SvgUri} from 'react-native-svg';
import {useTranslation} from 'react-i18next';

const Favorites = () => {
  const {favoritesPageproducts, favoriteLoader} = useSelector(({cart}) => cart);
  const dispatch = useDispatch();

  const {t} = useTranslation();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={{flex: 1}}>
      <Text allowFontScaling={false} style={styles.title}>
        {t('favorites2')}
      </Text>

      {favoriteLoader ? (
        <ActivityIndicator />
      ) : favoritesPageproducts?.length ? (
        <GridProducts
          products={favoritesPageproducts}
          containerStyle={{backgroundColor: '#fff'}}
          contentContainerStyle={{backgroundColor: '#fff'}}
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
    </ScrollView>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: RH(30),
  },
  title: {
    ...font('medium', 22),
    marginBottom: RH(40),
    alignSelf: 'center',
  },
  notFavoritesContainer: {
    flex: 1,
    paddingBottom: RH(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFavoritesText: {
    ...font('medium', 16),
    textTransform: 'uppercase',
    marginTop: RH(20),
  },
});

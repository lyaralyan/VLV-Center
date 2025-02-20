import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CartProduct from '../CartProduct';
import {RH, RW} from '@theme/utils';
import {getCartSimilarProducts} from '@store/CartSlice';
import CartRelatedProducts from '../CartRelatedProducts';

const Cart = () => {
  const {cartProducts, cartSimilarProducts} = useSelector(({cart}) => cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartSimilarProducts());
  }, []);
  
  return (
    <View>
      <View style={styles.products}>
        {cartProducts?.map((product, index) => (
          <CartProduct
            product={product}
            key={product.cart_id || Math.random()}
          />
        ))}
      </View>
      {!!(
        cartSimilarProducts?.cart_similar_categories?.length &&
        Object.keys(cartSimilarProducts?.cart_similar_products || {})?.length
      ) && <CartRelatedProducts data={cartSimilarProducts} />}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  products: {
    marginTop: RH(50),
    rowGap: RH(24),
    paddingHorizontal: RW(20),
  },
});

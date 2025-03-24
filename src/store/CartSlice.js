import {createSlice} from '@reduxjs/toolkit';
import axiosInstance from './request';
import {LOGIN, PASSWORD, TOKEN} from '@env';
import {S_D, USER_ID, _TOKEN, getUserInfo} from './UserSlice';
import {DEVICE_ID} from './UserSlice';
import Toast from 'react-native-toast-message';
import {t} from 'i18next';
import {setPending} from './MainSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import isProductPrice from '@helpers/isProductPrice';
import {Http} from 'http';

const initialState = {
  cartProducts: [],
  cartPageProducts: [],
  favorites: [],
  cartCount: 0,
  favoritesPageproducts: [],
  comparePageProducts: [],
  cartSimilarProducts: [],
  compares: [],
  totalPrice: 0,
  discountTotalPrice: 0,
  addToCartAnimation: null,
  addToFavoriteAnimation: null,
  addToCompareAnimation: null,
  favoriteLoader: false,
  compareLoader: false,
  couponAmount: {
    amount: 0,
  },
  attachBankCardRedirectUrl: null,
  showThanksModal: false,
  showThanksModalCash: false,
  promoCode: '',
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartProduct: (store, action) => {
      if (Array.isArray(store.cartProducts)) {
        return {
          ...store,
          cartProducts: [...store.cartProducts, action.payload],
        };
      } else {
        return {
          ...store,
          cartProducts: [action.payload],
        };
      }
    },
    removeCartProduct: (store, action) => {
      const filteredData = store.cartProducts.filter(
        ({cart_id}) => action.payload?.cart_id !== cart_id,
      );
      return {
        ...store,
        cartProducts: filteredData,
      };
    },
    setCartProduct: (store, action) => {
      return {
        ...store,
        cartProducts: action.payload,
      };
    },
    setCartPageProducts: (store, action) => {
      return {
        ...store,
        cartPageProducts: action.payload,
      };
    },
    setFavorites: (store, action) => {
      return {
        ...store,
        favorites: action.payload,
      };
    },
    addFavorites: (store, action) => {
      return {
        ...store,
        favorites: [...store.favorites, action.payload],
      };
    },
    removeFavorites: (store, action) => {
      let data = store.favorites.filter(id => id !== action.payload);

      return {
        ...store,
        favorites: data,
      };
    },
    setCompares: (store, action) => {
      return {
        ...store,
        compares: action.payload,
      };
    },
    addCompares: (store, action) => {
      return {
        ...store,
        compares: [...store.compares, action.payload],
      };
    },
    removeCompares: (store, action) => {
      let data = store.compares.filter(id => id !== action.payload);

      return {
        ...store,
        compares: data,
      };
    },
    addCartCount: (store, action) => {
      return {
        ...store,
        cartCount: store.cartCount + (action.payload || 1),
      };
    },
    setCartCount: (store, action) => {
      return {
        ...store,
        cartCount: action.payload,
      };
    },
    setFavoritesPageproducts: (store, action) => {
      return {
        ...store,
        favoritesPageproducts: action.payload,
      };
    },
    setComparePageProducts: (store, action) => {
      return {
        ...store,
        comparePageProducts: action.payload,
      };
    },
    setCartSimilarProducts: (store, action) => {
      return {
        ...store,
        cartSimilarProducts: action.payload,
      };
    },
    setTotalPrice: (store, action) => {
      return {
        ...store,
        totalPrice: action.payload,
      };
    },
    setDiscountTotalPrice: (store, action) => {
      return {
        ...store,
        discountTotalPrice: action.payload,
      };
    },
    setAddToCartAnimation: (store, action) => {
      return {
        ...store,
        addToCartAnimation: action.payload,
      };
    },
    setAddToCompareAnimation: (store, action) => {
      return {
        ...store,
        addToCompareAnimation: action.payload,
      };
    },
    setAddToFavoriteAnimation: (store, action) => {
      return {
        ...store,
        addToFavoriteAnimation: action.payload,
      };
    },
    setCompareLoader: (store, action) => {
      return {
        ...store,
        compareLoader: action.payload,
      };
    },
    setFavoriteLoader: (store, action) => {
      return {
        ...store,
        favoriteLoader: action.payload,
      };
    },
    setCouponAmount: (store, action) => {
      return {
        ...store,
        couponAmount: action.payload,
      };
    },
    setAttachBankCardRedirectUrl: (store, action) => {
      return {
        ...store,
        attachBankCardRedirectUrl: action.payload,
      };
    },
    setShowThanksModal: (store, action) => {
      return {
        ...store,
        showThanksModal: action.payload,
      };
    },
    setShowThanksModalCash: (store, action) => {
      return {
        ...store,
        showThanksModalCash: action.payload,
      };
    },
    setPromoCode: (store, action) => {
      return {
        ...store,
        promoCode: action.payload,
      };
    },
  },
});
export const getWishlistCartCount = () => async dispatch => {
  const compare_d = await AsyncStorage.getItem('commapres');
  if (compare_d && compare_d?.length) {
    dispatch(setCompares(JSON.parse(compare_d)));
  }
  if (S_D) {
    axiosInstance
      .get(
        'https://vlv.am/wishlist/count/' + S_D + (USER_ID ? '/' + USER_ID : ''),
      )
      .then(response => {
        dispatch(setFavorites(response.data.wishlist[0].ids || []));
        dispatch(setCartCount(response.data?.cart?.[0]?.qty || 0));
      })
      .catch(err => {
        console.warn('Error: getWishlistCartCount', err);
      });
  }
};

export const addCardStore =
  (product, is_buy_now = 'no') =>
  async (dispatch, getState) => {
    const userId = await getState().user.userId;

    const installing = product?.category?.installation
      ? product?.category?.installing
      : 0;

    const installing_count = +(
      product.installing_is_on || !!product?.pricing?.installing_price
    );

    axiosInstance
      .post(
        'https://vlv.am/cart/store',
        {
          login: LOGIN,
          password: PASSWORD,
          token: TOKEN,
          _token: _TOKEN,
          session_id: S_D,
          auth: +!!userId,
          auth_user_id: userId || 0,
          installing,
          installing_count,
          installing_qty: +(
            product.installing_is_on || !!product?.product?.installing_price
          ),
          price:
            product.price ||
            product?.promo_price ||
            product?.skus[0]?.selling_price ||
            product.pricing.selling_price,
          qty: product?.qty || 1,
          product_id:
            product?.seller_product_skus ||
            product?.seller_product_sku_id ||
            product?.skus?.[0]?.id ||
            product.id,
          seller_id: 1,
          shipping_method_id: 0,
          type: 'product',
          is_buy_now,
        },
        {
          headers: {
            common: {
              'X-Requested-With': 'XMLHttpRequest',
              withCredentials: true,
            },
          },
        },
      )

      .catch(err => {
        console.warn('Error: addCardStore', err);
      });
  };
export const addCardStoreProducts =
  productsArray => async (dispatch, getState) => {
    const userId = await getState().user.userId;
    axiosInstance
      .post(
        'https://vlv.am/cart/store',
        {
          login: LOGIN,
          password: PASSWORD,
          token: TOKEN,
          _token: _TOKEN,
          session_id: S_D,
          auth: +!!userId,
          auth_user_id: userId || 0,
          array: productsArray,
        },
        {
          headers: {
            common: {
              'X-Requested-With': 'XMLHttpRequest',
              withCredentials: true,
            },
          },
        },
      )

      .catch(err => {
        console.warn('Error: addCardStoreProducts', err);
      });
  };
export const getCartPageProducts =
  (callback = () => {}, withLoader = true) =>
  async (dispatch, getState) => {
    if (withLoader) {
      dispatch(setPending(true));
    }
    const mobileDisscounts = await getState().main.mobileDisscounts;

    axiosInstance
      .post('cart/get-products', {
        login: LOGIN,
        password: PASSWORD,
        token: TOKEN,
        session_id: S_D,
        _token: _TOKEN,
        auth_user_id: USER_ID,
      })
      .then(res => {
        if (!res.data?.error) {
          let count = res.data.cart?.reduce((count, product) => {
            return count + product?.qty;
          }, 0);
          dispatch(setCartCount(count));

          const totalPrice = res?.data?.cart?.reduce((count, product) => {
            let productPrice =
              product?.seller_product?.promo_price ||
              (product?.seller_product?.product?.online_price &&
                product?.seller_product?.product?.online_selling_price) ||
              product?.seller_product?.skus?.[0]?.selling_price;
            let total = 0;

            let discountedPrice = isProductPrice({
              mobileDisscounts: mobileDisscounts,
              price: productPrice,
              product_id: product?.seller_product?.product_id,
              category_id: product?.seller_product?.categories?.id, // ??,
              brand_id: product?.seller_product?.product?.brand?.id,
            });
            if (discountedPrice) {
              productPrice = discountedPrice;
            }
            if (product?.installing_count) {
              total +=
                (product.qty - product.installing_count) *
                (productPrice -
                  product?.seller_product?.product?.installing_price);
              total += product.installing_count * productPrice;
            } else {
              total +=
                product.qty *
                (product?.seller_product?.product?.installing_price &&
                !product.installing_count
                  ? productPrice -
                    product?.seller_product?.product?.installing_price
                  : productPrice);
            }
            return count + total;
          }, 0);

          // const discountTotalPrice =
          //   +res?.data?.cart?.reduce((total, product) => {
          //     let total1 = 0;
          //     if (product?.installing_count) {
          //       total1 +=
          //         (product.qty - product.installing_count) *
          //         (product?.seller_product?.skus?.[0]?.selling_price -
          //           product?.seller_product?.product?.installing_price);
          //       total1 +=
          //         product.installing_count *
          //         product?.seller_product?.skus?.[0]?.selling_price;
          //     } else {
          //       total1 +=
          //         product.qty *
          //         (product?.seller_product?.product?.installing_price &&
          //         !product.installing_count
          //           ? product?.seller_product?.skus?.[0]?.selling_price -
          //             product?.seller_product?.product?.installing_price
          //           : product?.seller_product?.skus?.[0]?.selling_price);
          //     }
          //     return total1 + total;
          //   }, 0) - +totalPrice;
          const discountTotalPrice = res?.data?.cart?.reduce(
            (total, product) => {
              let sellingPrice =
                product?.seller_product?.skus?.[0]?.selling_price || 0;
              let installingPrice =
                product?.seller_product?.product?.installing_price || 0;

              let totalProductDiscount = 0;

              // Եթե ապրանքը ունի զեղչված գին
              if (product?.installing_count) {
                // Հաշվարկում ենք installing_count-ի տարբեր գնի վրա ազդեցությունը
                totalProductDiscount +=
                  product.installing_count * (sellingPrice - installingPrice);
              }

              // Եթե չկա installing_count, բայց կա զեղչված գին
              if (!product.installing_count && installingPrice) {
                totalProductDiscount +=
                  product.qty * (sellingPrice - installingPrice);
              }

              return total + totalProductDiscount;
            },
            0,
          );

          dispatch(setTotalPrice(totalPrice));
          dispatch(setDiscountTotalPrice(discountTotalPrice));

          dispatch(setCartProduct(res.data.cart));
        } else {
          dispatch(setCartProduct([]));
        }
        callback();
      })
      .catch(err => {
        console.warn('Error: getCartPageProducts', err);
      })
      .finally(() => {
        dispatch(setPending(false));
      });
  };

export const getCartSimilarProducts = () => dispatch => {
  Http.post(
    'cart/similar-products',
    {
      'Device-ID': DEVICE_ID,
    },
    {
      login: LOGIN,
      password: PASSWORD,
      token: TOKEN,
      session_id: S_D,
      _token: _TOKEN,
      user_id: USER_ID,
    },
  )
    .then(response => {
      dispatch(setCartSimilarProducts(response));
    })
    .catch(err => {
      console.warn('Error: getCartSimilarProducts', err);
    });
};
export const setCartPageUpdateQty = data => dispatch => {
  axiosInstance
    .post('https://vlv.am/cart/update-qty', {
      login: LOGIN,
      password: PASSWORD,
      token: TOKEN,
      _token: _TOKEN,
      ...data,
    })
    .catch(err => {
      console.warn('Error: getCartPageUpdateQty', err);
    });
};
export const setCartPageDelete = data => dispatch => {
  axiosInstance
    .post('cart/delete', {
      login: LOGIN,
      password: PASSWORD,
      token: TOKEN,
      _token: _TOKEN,
      ...data,
    })
    .catch(err => {
      console.warn('Error: getCartPageUpdateQty', err);
    });
};
export const getFavoritesPageproducts =
  (loading = true) =>
  dispatch => {
    if (loading) {
      dispatch(setPending(true));
    }

    axiosInstance
      .post('/wishlist-products', {
        login: LOGIN,
        password: PASSWORD,
        token: TOKEN,
        _token: _TOKEN,
        'Device-ID': DEVICE_ID,
        session_id: S_D,
        auth_user_id: USER_ID,
      })
      .then(response => {
        if (response.data?.error || !response.data?.products?.length) {
          // throw t('error_message');
          throw 'Հավանած ապրանքնր չկան';
        }
        let productIds = response.data?.products?.map(product => product.id);
        dispatch(setFavorites(productIds));
        dispatch(setFavoritesPageproducts(response.data?.products));
      })
      .catch(err => {
        console.warn('err', err);
        dispatch(setFavorites([]));
        dispatch(setFavoritesPageproducts([]));
      })
      .finally(() => {
        dispatch(setFavoriteLoader(false));
        dispatch(setPending(false));
      });
  };
export const addWishList = data => dispatch => {
  axiosInstance
    .post('https://vlv.am/wishlist/store', {
      login: LOGIN,
      password: PASSWORD,
      token: TOKEN,
      _token: _TOKEN,
      'Device-ID': DEVICE_ID,
      session_id: S_D,
      type: 'product',
      seller_id: 1,
      shipping_method_id: 0,
      ...data,
    })
    .then(response => {
      if (!response.data.error) {
      } else {
        Toast.show({
          type: 'error',
          text1: t('error_message'),
        });
        console.warn('wishlist error', response.data);
      }
    })
    .catch(err => {
      console.error('Error: addWishList', err);
    });
};

export const getComparePageProducts =
  (loading = true) =>
  async dispatch => {
    const compare_d = await AsyncStorage.getItem('commapres');
    if (loading) {
      dispatch(setPending(true));
    }

    await axiosInstance
      .post('/compare-products', {
        login: LOGIN,
        password: PASSWORD,
        token: TOKEN,
        _token: _TOKEN,
        'Device-ID': DEVICE_ID,
        session_id: S_D,
        compare_id: compare_d?.slice(1, compare_d.length - 1),
      })
      .then(response => {
        dispatch(setComparePageProducts(response.data.products));
      })
      .catch(err => {
        dispatch(setComparePageProducts([]));
        console.warn('Error: getComparePageProducts', err);
      })
      .finally(() => {
        dispatch(setCompareLoader(false));
        dispatch(setPending(false));
      });
  };
export const addCompare = data => async (dispatch, getStore) => {
  const compares = await getStore().cart.compares;

  await AsyncStorage.setItem('commapres', JSON.stringify(compares));
  // await AsyncStorage.setItem(
  //   'commapres',
  //   JSON.stringify([...store.compares, action.payload]),
  // );
  axiosInstance
    .post('https://vlv.am/compare', {
      login: LOGIN,
      password: PASSWORD,
      token: TOKEN,
      _token: _TOKEN,
      'Device-ID': DEVICE_ID,
      session_id: S_D,
      product_sku_id: data.product_sku_id,
      data_type: data.data_type,
      product_type: 'product',
    })
    .then(response => {})
    .catch(err => {
      console.warn('Error: addCompare', err);
    });
};

export const guestAddressStore =
  (data, callBack = () => {}, errorCallBack = () => {}) =>
  dispatch => {
    axiosInstance
      .post('https://vlv.am/checkout/guest-address/store', {
        token: TOKEN,
        login: LOGIN,
        password: PASSWORD,
        _token: _TOKEN,
        'Device-ID': DEVICE_ID,
        deliveryType: 'on',
        km: 0,
        fast_delivery: '',
        city: '',
        state: '',
        address: '',
        address_id: 0,
        ...data,
      })
      .then(callBack)
      .catch(err => {
        errorCallBack();
        console.warn('Error: guestAddressStore', err);
      });
  };

export const postCreditModal =
  (data, callBack = () => {}, errorCallBack = () => {}) =>
  dispatch => {
    axiosInstance
      .get('https://vlv.am/checkout8', {
        params: {
          token: TOKEN,
          login: LOGIN,
          password: PASSWORD,
          step: 'complete_order',
          shipping_method: 1,
          delivery_type: 1,
          // number_of_package: 1,
          ...data,
          session_id: S_D,
          lang: 'hy',
          type_mobile: 1,
        },
      })
      .then(callBack)
      .catch(err => {
        errorCallBack();
        console.warn('Error: postCreditModal', err);
      });
  };
export const checkOrderStatus = (orderId, callBack) => dispatch => {
  axiosInstance
    .post(`status/order/${orderId}`, {
      token: TOKEN,
      login: LOGIN,
      password: PASSWORD,
      type_mobile: 1,
    })
    .then(callBack)
    .catch(err => {
      callBack(err);
      console.warn('Error: postCreditModal', err);
    });
};
export const postCreditModal2 = (data, callBack) => dispatch => {
  axios
    .post(
      'https://vlv.am/checkout-credit-email',
      {...data, type_mobile: 1},
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    .then(callBack)
    .catch(err => {
      dispatch(setPending(false));
      console.warn('Error: postCreditModal2', err);
    });
};

export const changeInstalling = data => () => {
  axiosInstance
    .post('https://vlv.am/change-installing', {
      login: LOGIN,
      password: PASSWORD,
      token: TOKEN,
      _token: _TOKEN,
      'Device-ID': DEVICE_ID,
      ...data,
    })
    .catch(err => {
      console.warn('Error: changeInstalling', err);
    });
};
export const checkPromoCode = (code, products) => dispatch => {
  axiosInstance
    .post('coupon-apply', {
      login: LOGIN,
      password: PASSWORD,
      token: TOKEN,
      _token: _TOKEN,
      'Device-ID': DEVICE_ID,
      user_id: USER_ID,
      code,
    })
    .then(e => {
      if (e.data?.error) {
        dispatch(
          setCouponAmount({
            amount: 0,
          }),
        );
        Toast.show({
          type: 'error',
          text1: t('invalid_coupon'),
        });
      } else {
        let promoCodeData = e.data.data;
        let discount = false;
        if (promoCodeData) {
          products?.map(({product_id, category_id, brand_id}) => {
            promoCodeData?.brands_with_exceptions_ids?.map(each_brand_id => {
              if (each_brand_id == brand_id) {
                if (
                  promoCodeData.except_brands[brand_id].find(
                    item => category_id == item,
                  )
                ) {
                  discount = false;
                  return;
                }
                discount = true;
              }
            });
            promoCodeData?.categories_with_exceptions_ids?.map(
              each_category_id => {
                if (each_category_id == category_id) {
                  if (
                    promoCodeData?.except_categories?.[category_id]?.find(
                      item => brand_id == item,
                    )
                  ) {
                    discount = false;
                    return;
                  }
                  discount = true;
                }
              },
            );
            Object.keys(promoCodeData.brands || {})?.map(key => {
              if (
                brand_id == key &&
                promoCodeData.brands[key].find(item => category_id == item)
              ) {
                discount = true;
              }
            });
            Object.keys(promoCodeData.categories || {})?.map(key => {
              if (
                category_id == key &&
                promoCodeData.categories[key].find(item => brand_id == item)
              ) {
                discount = true;
              }
            });
            if (
              JSON.parse('[' + promoCodeData.product_ids + ']').find(
                each_product_id => each_product_id == product_id,
              )
            ) {
              discount = true;
            } else if (
              JSON.parse('[' + promoCodeData.except_product_ids + ']').find(
                each_product_id => each_product_id == product_id,
              )
            ) {
              discount = false;
            }
          });
        }

        if (discount) {
          axiosInstance
            .post('coupon-count', {
              login: LOGIN,
              password: PASSWORD,
              token: TOKEN,
              _token: _TOKEN,
              'Device-ID': DEVICE_ID,
              user_id: USER_ID,
              coupon_type: promoCodeData.coupon_type,
              coupon_discount: promoCodeData.coupon_discount,
              coupon_discount_type: promoCodeData.coupon_discount_type,
              coupon_id: promoCodeData.coupon_id,
            })
            .then(e => {
              if (e.data.coupon_amount) {
                Toast.show({
                  type: 'success',
                  text1: t('coupon_applied_successfully'),
                });
                dispatch(
                  setCouponAmount({
                    amount: e.data.coupon_amount,
                    'Device-ID': DEVICE_ID,
                    coupon_type: promoCodeData.coupon_type,
                    coupon_discount: promoCodeData.coupon_discount,
                    coupon_discount_type: promoCodeData.coupon_discount_type,
                    coupon_id: promoCodeData.coupon_id,
                  }),
                );
              } else {
                throw new Error();
              }
            })
            .catch(err => {
              dispatch(
                setCouponAmount({
                  amount: 0,
                }),
              );
              Toast.show({
                type: 'error',
                text1: t('invalid_coupon'),
              });
            });
        } else {
          dispatch(
            setCouponAmount({
              amount: 0,
            }),
          );
          Toast.show({
            type: 'error',
            text1: t('invalid_coupon'),
          });
        }
      }
    })
    .catch(err => {
      dispatch(
        setCouponAmount({
          amount: 0,
        }),
      );
      console.warn('Error: checkPromoCode', err);

      Toast.show({
        type: 'error',
        text1: err?.response?.data?.message || t('invalid_coupon'),
      });
    });
};
export const AttachBankCard4 = threeDSServerTransID => dispatch => {
  axiosInstance
    .post('https://vlv.am/mobile-make-binding-info', {
      threeDSServerTransID: threeDSServerTransID,
    })
    .then(response => {
      console.info('AttachBankCard4', response.data);
    })
    .catch(err => {
      console.warn('Error: AttachBankCard4', err);

      Toast.show({
        type: 'error',
        text1: t('error_message'),
      });
    });
};
export const AttachBankCard3 = orderId => dispatch => {
  axiosInstance
    .post('https://vlv.am/mobile-make-binding-getUrls', {
      mdOrder: orderId,
    })
    .then(response => {
      dispatch(AttachBankCard4(response.data.threeDSServerTransID));
    })
    .catch(err => {
      console.warn('Error: AttachBankCard3', err);

      Toast.show({
        type: 'error',
        text1: t('error_message'),
      });
    });
};
export const AttachBankCard2 = (orderId, userId, bindingId) => dispatch => {
  axiosInstance
    .post('https://vlv.am/mobile-make-binding-arca', {
      mdOrder: orderId,
      bindingId,
      user_id: userId,
    })
    .then(response => {
      console.info('AttachBankCard2', response.data);
      dispatch(
        setAttachBankCardRedirectUrl({...response.data, orderId: orderId}),
      );
    })
    .catch(err => {
      console.warn('Error: AttachBankCard2', err);

      Toast.show({
        type: 'error',
        text1: t('error_message'),
      });
    })
    .finally(() => {
      dispatch(setPending(false));
    });
};
export const AttachBankCard = (order_number, cardPan) => dispatch => {
  dispatch(setPending(true));
  axiosInstance
    .post('https://vlv.am/mobile-make-binding-payment', {
      login: LOGIN,
      password: PASSWORD,
      token: TOKEN,
      _token: _TOKEN,
      'Device-ID': DEVICE_ID,
      save_card: cardPan ? 2 : 1,
      auth_user_id: USER_ID,
      order_number,
    })
    .then(e => {
      console.info('AttachBankCard', e.data);
      if (cardPan) {
        dispatch(AttachBankCard2(e.data.orderId, USER_ID, e.data.bindingId));
        dispatch(AttachBankCard3(e.data.orderId));
      } else {
        dispatch(setAttachBankCardRedirectUrl(e.data));
      }
    })
    .catch(err => {
      console.warn('Error: AttachBankCard', err);

      Toast.show({
        type: 'error',
        text1: t('error_message'),
      });
    })
    .finally(() => {
      if (!cardPan) {
        dispatch(setPending(false));
      }
    });
};
export const checkAttachBankCard = orderId => dispatch => {
  axiosInstance
    .get('https://vlv.am/mobile-make-binding-result', {
      params: {
        orderId: orderId,
      },
    })
    .then(res => {
      dispatch(setAttachBankCardRedirectUrl(false));
      if (res.data == 2) {
        dispatch(setShowThanksModal(true));
        dispatch(getUserInfo());
      } else {
        Toast.show({
          type: 'error',
          text1: t('error_message'),
        });
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'Home',
            },
          ],
        });
      }
    })
    .catch(err => {
      console.warn('Error: checkAttachBankCard', err);

      Toast.show({
        type: 'error',
        text1: t('error_message'),
      });
    })
    .finally(() => {
      dispatch(setPending(false));
    });
};

export const {
  addCartProduct,
  removeCartProduct,
  setCartProduct,
  setCartPageProducts,
  setFavorites,
  addFavorites,
  removeFavorites,
  setCartCount,
  addCartCount,
  setFavoritesPageproducts,
  setComparePageProducts,
  setCompares,
  addCompares,
  removeCompares,
  setCartSimilarProducts,
  setTotalPrice,
  setDiscountTotalPrice,
  setAddToCartAnimation,
  setAddToFavoriteAnimation,
  setAddToCompareAnimation,
  setCompareLoader,
  setFavoriteLoader,
  setCouponAmount,
  setAttachBankCardRedirectUrl,
  setShowThanksModal,
  setShowThanksModalCash,
  setPromoCode,
} = cartSlice.actions;
export default cartSlice.reducer;

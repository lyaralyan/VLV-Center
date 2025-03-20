import {createSlice} from '@reduxjs/toolkit';
import axiosInstance from './request';
import {LOGIN, PASSWORD, TOKEN, SERVER_URL} from '@env';
import {
  getBrandCategories,
  setInnerPending,
  setOpenMenu,
  setPending,
} from './MainSlice';
import {getUniqueId} from 'react-native-device-info';
import {DEVICE_ID} from './UserSlice';
import Toast from 'react-native-toast-message';

const initialState = {
  sliders: [],
  featureCategories: [],
  products: [],
  categoryName: null,
  showDrawerFilter: false,
  sortType: {
    label_en: 'Price (Low to High)',
    label_hy: 'Գին` ցածրից բարձր',
    label_ru: 'Цена :  мин - макс',
    value: 'low_to_high',
  },
  attributes: [],
  brands: [],
  categories: [],
  colors: [],
  discount: false,
  minPrice: 0,
  maxPrice: 0,
  activeCategories: [],
  activeBrands: [],
  activeAttributes: {},
  activeMinPrice: 0,
  activeMaxPrice: 0,
  activeDiscount: false,
  activeColor: [],
  subCategories: [],
  salePage: false,
  searchPage: false,
  search: '',
  submitFormTag: null,
  orderId: null,
  searchType: 'search',
  filterPending: false,
  totalCount: 0,
};

let defaultPrices = {},
  defaultBrands = new Set(),
  defaultCategories = new Set(),
  defaultDiscount = false;

export let searchPageData = {};
export let searchPageProducts = [];
export let searchedSlug = null;
export let last_request_params = {};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchPageData: (store, action) => {
      return {
        ...store,
        searchPageData: action.payload,
      };
    },
    setProducts: (store, action) => {
      return {
        ...store,
        products: action.payload,
      };
    },
    setFeatureCategories: (store, action) => {
      return {
        ...store,
        featureCategories: action.payload,
      };
    },
    setSliders: (store, action) => {
      return {
        ...store,
        sliders: action.payload,
      };
    },
    setCategoryName: (store, action) => {
      return {
        ...store,
        categoryName: action.payload,
      };
    },
    setShowDrawerFilter: (store, action) => {
      return {
        ...store,
        showDrawerFilter: action.payload,
      };
    },

    setSortType: (store, action) => {
      return {
        ...store,
        sortType: action.payload,
      };
    },
    setAttributes: (store, action) => {
      return {
        ...store,
        attributes: action.payload,
      };
    },
    setBrands: (store, action) => {
      return {
        ...store,
        brands: action.payload,
      };
    },
    setCategories: (store, action) => {
      return {
        ...store,
        categories: action.payload,
      };
    },
    setDiscount: (store, action) => {
      return {
        ...store,
        discount: action.payload,
      };
    },
    setMinPrice: (store, action) => {
      return {
        ...store,
        minPrice: action.payload,
      };
    },
    setMaxPrice: (store, action) => {
      return {
        ...store,
        maxPrice: action.payload,
      };
    },
    setDefaultFilteres: (store, action) => {
      return {
        ...store,
        attributes: [],
        brands: [],
        categories: [],
        colors: [],
        discount: false,
        minPrice: defaultPrices?.min,
        maxPrice: defaultPrices?.max,
        search: '',
      };
    },
    setActiveCategories: (store, action) => {
      return {
        ...store,
        activeCategories: action.payload,
      };
    },
    setActiveBrands: (store, action) => {
      return {
        ...store,
        activeBrands: action.payload,
      };
    },
    setActiveAttributes: (store, action) => {
      return {
        ...store,
        activeAttributes: action.payload,
      };
    },
    setActiveMinPrice: (store, action) => {
      return {
        ...store,
        activeMinPrice: action.payload,
      };
    },
    setActiveMaxPrice: (store, action) => {
      return {
        ...store,
        activeMaxPrice: action.payload,
      };
    },
    setActiveDiscount: (store, action) => {
      return {
        ...store,
        activeDiscount: action.payload,
      };
    },
    setIsDynamic: (store, action) => {
      return {
        ...store,
        isDynamic: action.payload,
      };
    },
    setActiveColor: (store, action) => {
      return {
        ...store,
        activeColor: action.payload,
      };
    },
    clearActiveFilters: (store, action) => {
      return {
        ...store,
        discount: false,
        // minPrice: defaultPrices?.min,
        // maxPrice: defaultPrices?.max,
        activeCategories: [],
        activeBrands: [],
        activeAttributes: {},
        activeMinPrice: 0,
        activeMaxPrice: 0,
        activeDiscount: false,
        activeColor: [],
        search: '',
      };
    },
    setSubCategories: (store, action) => {
      return {
        ...store,
        subCategories: action.payload,
      };
    },
    setSalePage: (store, action) => {
      return {
        ...store,
        salePage: action.payload,
      };
    },
    setSearchPage: (store, action) => {
      return {
        ...store,
        searchPage: action.payload,
      };
    },
    setSearch: (store, action) => {
      return {
        ...store,
        search: action.payload,
      };
    },
    setSubmitFormTag: (store, action) => {
      return {
        ...store,
        submitFormTag: action.payload,
      };
    },
    setOrderId: (store, action) => {
      return {
        ...store,
        orderId: action.payload,
      };
    },
    setSearchType: (store, action) => {
      return {
        ...store,
        searchType: action.payload,
      };
    },
    setTotalCount: (store, action) => {
      return {
        ...store,
        totalCount: action.payload,
      };
    },
  },
});

export const createSearchPageFilter = () => dispatch => {
  defaultPrices = {};
  defaultBrands = new Set();
  defaultCategories = new Set();
  defaultDiscount = false;
  // dispatch(setSearch(''));
  defaultPrices.min = searchPageData?.initial_min_price_lowest;
  defaultPrices.max = searchPageData?.initial_max_price_highest;

  searchPageData?.brandList?.map(brand => {
    defaultBrands?.add(
      JSON.stringify({
        logo: brand?.logo,
        name: brand?.name,
        id: brand?.id,
      }),
    );
  });
  searchPageData?.categoryList?.map(item => {
    defaultCategories?.add(
      JSON.stringify({
        name_en: item?.name_en,
        name_ru: item?.name_ru,
        name_hy: item?.name_hy,
        id: item?.id,
      }),
    );
  });

  defaultDiscount = !!searchPageData.discount;

  defaultCategories = Array.from(defaultCategories || [])?.map(JSON.parse);
  defaultBrands = Array.from(defaultBrands || [])?.map(JSON.parse);

  dispatch(setMaxPrice(defaultPrices.max));
  dispatch(setMinPrice(defaultPrices.min));
  dispatch(setCategories(defaultCategories));
  dispatch(setBrands(defaultBrands));
  dispatch(setDiscount(defaultDiscount));
};
export const getSubCategories = slug => dispatch => {
  axiosInstance
    .post(`/sub-categories/${slug}`, {
      login: LOGIN,
      password: PASSWORD,
      token: TOKEN,
      'Device-ID': DEVICE_ID,
    })
    .then(response => {
      if (response.data.error) {
        throw new Error();
      }
      dispatch(setSubCategories(response?.data?.sub_categories));
    })
    .catch(err => {
      Toast.show({
        type: 'error',
        text1: t('som_wrong'),
      });
      console.warn('Error: getBrandCategories', err);
    })
    .finally(() => {
      dispatch(setPending(false));
    });
};

export const getSearchPageInfo =
  ({slug, params = {}, navigation, category, brand}) =>
  async (dispatch, getState) => {
    if (searchedSlug !== slug) {
      dispatch(clearActiveFilters());
    }
    const searchPage = await getState().search.searchPage;
    searchedSlug = slug;
    defaultPrices = {};
    defaultBrands = new Set();
    defaultCategories = new Set();
    defaultDiscount = false;
    // dispatch(setSearch(''));
    if (!slug) {
      throw new Error('slug not found');
    }

    last_request_params = params;
    if (category) {
      dispatch(setIsDynamic(false));
      dispatch(setSalePage(false));
      dispatch(setSearchPage(false));
    }

    const phoneId = await getUniqueId();
    let request_url = new URL(SERVER_URL + `category-new/${slug}`);
    let searchType = category
      ? 'category'
      : brand
      ? 'brand'
      : searchPage
      ? 'search'
      : 'category';
    dispatch(setSearchType(searchType));
    request_url.searchParams.append('item', searchType);

    if (Object.keys(params || {})?.length) {
      for (const key in params) {
        if (key == 'd' || key == 'mn' || key == 'mx' || key == 'st') {
          request_url.searchParams.append(key, params?.[key]);
        } else if (key == 'a' || key == 'c') {
          let attrs;
          for (const attribute_id in params?.[key]) {
            params?.[key][attribute_id].map(({id}) => {
              if (attrs) {
                attrs = attrs + ',' + attribute_id + '_' + id;
              } else {
                attrs = attribute_id + '_' + id;
              }
            });
          }
          if (attrs) {
            request_url.searchParams.append(key, attrs);
          }
        } else {
          if (key == 'b') {
            dispatch(setActiveBrands(params?.[key]));
          }
          if (key == 'st') {
            dispatch(setSearch(params?.[key]));
          }
          let paramStr;

          if (Array.isArray(params?.[key])) {
            params?.[key]?.map(item => {
              if (paramStr) {
                paramStr = paramStr + ',' + (item?.id || item);
              } else {
                paramStr = item?.id || item;
              }
            });
          }

          if (paramStr) {
            request_url.searchParams.append(key, paramStr);
          }
        }
      }
    }
    if (!brand) {
      request_url.searchParams.append('p', 5000);
    }
    axiosInstance
      .post(request_url.toString(), {
        login: LOGIN,
        password: PASSWORD,
        token: TOKEN,
        'Device-ID': phoneId,
      })
      .then(res => {
        if (res.data?.data?.products?.length) {
          dispatch(getSubCategories(slug));
          dispatch(setCategoryName(res.data?.data.category_name));
          dispatch(setOpenMenu(false));

          searchPageData = res.data?.data;
          searchPageProducts = res.data?.data?.products;

          dispatch(setTotalCount(res.data?.data?.pagination.total));
          dispatch(createSearchPageFilter());

          if (category) {
            navigation.navigate('CategoryPage');
          } else if (brand) {
            dispatch(getBrandCategories(slug, navigation));
          } else {
            navigation.navigate('SearchPage');
          }
        } else if (res.data?.data?.seller_product_id) {
          navigation.navigate('ProductPage', {
            productId: res.data?.data?.seller_product_id,
          });
        }
      })
      .catch(err => {
        console.warn('Error: getSearchPageInfo', err);
      })
      .finally(() => {
        dispatch(setPending(false));
        dispatch(setInnerPending(false));
      });
  };

export const getDynamicPageInfo =
  ({slug, params = {}, navigation}) =>
  async dispatch => {
    if (searchedSlug !== slug) {
      dispatch(clearActiveFilters());
    }
    searchedSlug = slug;
    defaultPrices = {};
    defaultBrands = new Set();
    defaultCategories = new Set();
    defaultDiscount = false;
    // dispatch(setSearch(''));
    if (!slug) {
      throw new Error('slug not found');
    }

    last_request_params = params;
    dispatch(setIsDynamic(true));
    dispatch(setSalePage(false));
    dispatch(setSearchPage(false));
    const phoneId = await getUniqueId();
    let request_url = new URL(`new/pages/${slug}`);

    if (Object.keys(params || {})?.length) {
      for (const key in params) {
        if (key == 'd' || key == 'mn' || key == 'mx') {
          request_url.searchParams.append(key, params?.[key]);
        } else if (key == 'a') {
          let attrs;
          for (const attribute_id in params?.[key]) {
            params?.[key][attribute_id].map(({id}) => {
              if (attrs) {
                attrs = attrs + ',' + attribute_id + '_' + id;
              } else {
                attrs = attribute_id + '_' + id;
              }
            });
          }
          if (attrs) {
            request_url.searchParams.append(key, attrs);
          }
        } else {
          if (key == 'b') {
            dispatch(setActiveBrands(params?.[key]));
          }

          let paramStr;
          if (Array.isArray(params?.[key])) {
            params?.[key]?.map(item => {
              if (paramStr) {
                paramStr = paramStr + ',' + item?.id;
              } else {
                paramStr = item?.id;
              }
            });
          }

          if (paramStr) {
            request_url.searchParams.append(key, paramStr);
          }
        }
      }
    }
    axiosInstance
      .post(request_url.toString(), {
        login: LOGIN,
        password: PASSWORD,
        token: TOKEN,
        'Device-ID': phoneId,
      })
      .then(res => {
        if (res.data?.data?.products?.length) {
          // dispatch(getSubCategories(slug));
          dispatch(setCategoryName(res.data?.data.category_name));
          dispatch(setOpenMenu(false));

          searchPageData = res.data?.data;
          searchPageProducts = res.data?.data?.products;

          dispatch(setTotalCount(res.data?.data?.pagination.total));
          dispatch(createSearchPageFilter());

          navigation.navigate('SearchPage');
        }
      })
      .catch(err => {
        console.warn('Error: getDynamicPageInfo', err);
      })
      .finally(() => {
        dispatch(setInnerPending(false));
        dispatch(setPending(false));
      });
  };
export const filterProducts = () => async (dispatch, getState) => {
  const {
    activeBrands,
    activeCategories,
    activeAttributes,
    activeDiscount,
    activeMinPrice,
    activeMaxPrice,
  } = await getState().search;
  const currentLanguage = await getState().main.currentLanguage;
  const filteredProducts = searchPageData.products?.filter(product => {
    if (
      activeBrands.length &&
      !activeBrands.find(({id}) => {
        return id == product.product.brand.id;
      })
    ) {
      return null;
    }

    if (
      activeCategories?.length &&
      !activeCategories?.find(({value}) => {
        return (
          value == product?.categories[0]?.['name_' + currentLanguage] ||
          value == product?.categories[0]?.name_en
        );
      })
    ) {
      return null;
    }

    if (Object.keys(activeAttributes || {}).length) {
      let returnNull = true;
      Object.keys(activeAttributes || {})?.forEach?.(attrId => {
        product.product?.variations?.forEach(({attribute_value_id}) => {
          if (
            activeAttributes?.[attrId]?.find(({id}) => id == attribute_value_id)
          ) {
            returnNull = false;
          }
        });
      });
      if (returnNull) {
        return false;
      }
    }

    if (activeDiscount) {
      if (
        !(
          (product.product.online_price &&
            product.product.online_selling_price) ||
          product.promo_price ||
          product.recommended_retail_price
        )
      ) {
        return null;
      }
    }
    const price =
      (product.product.online_price && product.product.online_selling_price) ||
      product.promo_price ||
      product.recommended_retail_price ||
      product.skus[0].selling_price;

    if (price < activeMinPrice || price > activeMaxPrice) {
      return null;
    }

    // if (colors.length) {
    //   let returnNull = true;
    //   colors.forEach(attrId => {
    //     product.product?.variations?.forEach(color => {
    //       if (color.attribute_value_id == attrId) {
    //         returnNull = false;
    //       }
    //     });
    //   });
    //   if (returnNull) return null;
    // }
    return true;
  });
  searchPageProducts = filteredProducts;
  // dispatch(updateSearchPageFilter());
  dispatch(setProducts(filteredProducts?.length));
};

export const filterForSalePage =
  ({slug, params = {}}) =>
  async dispatch => {
    if (searchedSlug !== slug) {
      dispatch(clearActiveFilters());
    }
    searchedSlug = slug;
    defaultPrices = {};
    defaultBrands = new Set();
    defaultCategories = new Set();
    defaultDiscount = false;
    // dispatch(setSearch(''));
    if (!slug) {
      throw new Error('slug not found');
    }

    last_request_params = params;
    dispatch(setIsDynamic(false));
    dispatch(setSalePage(true));
    dispatch(setSearchPage(false));
    const phoneId = await getUniqueId();
    let request_url = new URL(`sale/${slug}`);
    if (Object.keys(params || {})?.length) {
      for (const key in params) {
        if (key == 'd' || key == 'mn' || key == 'mx') {
          request_url.searchParams.append(key, params?.[key]);
        } else if (key == 'a') {
          let attrs;
          for (const attribute_id in params?.[key]) {
            params?.[key][attribute_id].map(({id}) => {
              if (attrs) {
                attrs = attrs + ',' + attribute_id + '_' + id;
              } else {
                attrs = attribute_id + '_' + id;
              }
            });
          }
          if (attrs) {
            request_url.searchParams.append(key, attrs);
          }
        } else {
          if (key == 'b') {
            dispatch(setActiveBrands(params?.[key]));
          }

          let paramStr;
          if (Array.isArray(params?.[key])) {
            params?.[key]?.map(item => {
              if (paramStr) {
                paramStr = paramStr + ',' + item?.id;
              } else {
                paramStr = item?.id;
              }
            });
          }

          if (paramStr) {
            request_url.searchParams.append(key, paramStr);
          }
        }
      }
    }
    request_url.searchParams.append('p', 5000);
    axiosInstance
      .post(request_url.toString(), {
        login: LOGIN,
        password: PASSWORD,
        token: TOKEN,
        'Device-ID': phoneId,
      })
      .then(res => {
        if (res.data?.data?.products?.length) {
          // dispatch(getSubCategories(slug));
          dispatch(setCategoryName(res.data?.data.category_name));
          dispatch(setOpenMenu(false));

          searchPageData = res.data?.data;
          searchPageProducts = res.data?.data?.products;

          dispatch(setTotalCount(res.data?.data?.pagination.total));

          dispatch(createSearchPageFilter());
        }
      })
      .catch(err => {
        console.warn('Error: filterForSalePage', err);
      })
      .finally(() => {
        dispatch(setInnerPending(false));
        dispatch(setPending(false));
      });
  };

export const {
  setSearchPageData,
  setProducts,
  setSliders,
  setFeatureCategories,
  setCategoryName,
  setShowDrawerFilter,
  setSortType,
  setAttributes,
  addAttribute,
  removeAttribute,
  addBrand,
  removeBrand,
  setBrands,
  setCategories,
  addCategory,
  removeCategory,
  addColor,
  removeColor,
  setDiscount,
  setMinPrice,
  setMaxPrice,
  setDefaultFilteres,
  setActiveBrands,
  setActiveCategories,
  setActiveAttributes,
  setActiveMinPrice,
  setActiveMaxPrice,
  setActiveDiscount,
  setIsDynamic,
  setActiveColor,
  clearActiveFilters,
  setSubCategories,
  setSalePage,
  setSearchPage,
  setSearch,
  setSubmitFormTag,
  setOrderId,
  setSearchType,
  totalCount,
  setTotalCount,
} = searchSlice.actions;
export default searchSlice.reducer;

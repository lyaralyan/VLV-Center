import {createSlice} from '@reduxjs/toolkit';
import axiosInstance from './request';
import {LOGIN, PASSWORD, TOKEN, SERVER_URL} from '@env';
import Toast from 'react-native-toast-message';
import DeviceInfo, {getUniqueId} from 'react-native-device-info';
import {t} from 'i18next';
import {USER_ID, _TOKEN} from './UserSlice';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

let DEVICE_ID = null;

const getId = async () => {
  DEVICE_ID = await getUniqueId();
};

if (!DEVICE_ID) {
  getId();
}

const initialState = {
  currentLanguage: 'hy',
  currentCurrency: {
    label: '(֏) Դրամ',
    value: 'amd',
    currency: '֏',
    convertRate: 1,
    id: 121,
  },
  pending: false,
  innerPending: false,
  headerCategorys: [],
  haederSliders: [],
  sales: [],
  featureCategories: [],
  bestDealProduct: [],
  bannerSliders: [],
  topRatingProduct: [],
  threeInOne: null,
  brands: [],
  productInfo: null,
  relatedProducts: [],
  recentProducts: [],
  catalogPageData: [],
  openMenu: false,
  menuData: null,
  salePage: null,
  showCamera: false,
  allBrands: [],
  vikass: null,
  toshiba: null,
  hisense: null,
  samsung: null,
  contactdata: null,
  creditPageData: null,
  faqPageData: null,
  deliveryData: null,
  servicePageData: null,
  privacyPageData: null,
  buyTwoGetOneGift: null,
  brandCategories: null,
  showSignInModal: false,
  activeMobileDisscount: false,
  mobileDisscounts: null,
};
const defaultSendData = {
  login: LOGIN,
  password: PASSWORD,
  token: TOKEN,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setCurrentLanguage: (store, action) => {
      return {
        ...store,
        currentLanguage: action.payload,
      };
    },
    setCurrentCurrency: (store, action) => {
      return {
        ...store,
        currentCurrency: {
          ...store.currentCurrency,
          ...action.payload,
        },
      };
    },

    setPending: (store, action) => {
      return {
        ...store,
        pending: action.payload,
      };
    },
    setInnerPending: (store, action) => {
      return {
        ...store,
        innerPending: action.payload,
      };
    },
    setHeaderCategorys: (store, action) => {
      return {
        ...store,
        headerCategorys: action.payload,
      };
    },
    setHeaderSliders: (store, action) => {
      return {
        ...store,
        headerSliders: action.payload,
      };
    },
    setSales: (store, action) => {
      return {
        ...store,
        sales: action.payload,
      };
    },
    setFeatureCategories: (store, action) => {
      return {
        ...store,
        featureCategories: action.payload,
      };
    },
    setBestDealProduct: (store, action) => {
      return {
        ...store,
        bestDealProduct: action.payload,
      };
    },
    setBannerSliders: (store, action) => {
      return {
        ...store,
        bannerSliders: action.payload,
      };
    },
    setTopRatingProduct: (store, action) => {
      return {
        ...store,
        topRatingProduct: action.payload,
      };
    },
    setThreeInOne: (store, action) => {
      return {
        ...store,
        threeInOne: action.payload,
      };
    },
    setBrands: (store, action) => {
      return {
        ...store,
        brands: action.payload,
      };
    },
    setProductInfo: (store, action) => {
      return {
        ...store,
        productInfo: action.payload,
      };
    },
    setRelatedProducts: (store, action) => {
      return {
        ...store,
        relatedProducts: action.payload,
      };
    },
    setRecentProducts: (store, action) => {
      return {
        ...store,
        recentProducts: action.payload,
      };
    },
    setSimilarProducts: (store, action) => {
      return {
        ...store,
        similarProducts: action.payload,
      };
    },
    setCatalogPageData: (store, action) => {
      return {
        ...store,
        catalogPageData: action.payload,
      };
    },
    setOpenMenu: (store, action) => {
      return {
        ...store,
        openMenu: action.payload,
      };
    },
    setMenuData: (store, action) => {
      return {
        ...store,
        menuData: action.payload,
      };
    },
    setSalePage: (store, action) => {
      return {
        ...store,
        salePage: action.payload,
      };
    },
    setShowCamera: (store, action) => {
      return {
        ...store,
        showCamera: action.payload,
      };
    },
    setAllBrands: (store, action) => {
      return {
        ...store,
        allBrands: action.payload,
      };
    },
    setVikass: (store, action) => {
      return {
        ...store,
        vikass: action.payload,
      };
    },
    setSamsung: (store, action) => {
      return {
        ...store,
        samsung: action.payload,
      };
    },
    setToshiba: (store, action) => {
      return {
        ...store,
        toshiba: action.payload,
      };
    },
    setHisense: (store, action) => {
      return {
        ...store,
        hisense: action.payload,
      };
    },
    setAboutUsData: (store, action) => {
      return {
        ...store,
        aboutUsData: action.payload,
      };
    },
    setContactData: (store, action) => {
      return {
        ...store,
        contactData: action.payload,
      };
    },
    setCreditPageData: (store, action) => {
      return {
        ...store,
        creditPageData: action.payload,
      };
    },
    setFaqPageData: (store, action) => {
      return {
        ...store,
        faqPageData: action.payload,
      };
    },
    setJobPageData: (store, action) => {
      return {
        ...store,
        jobPageData: action.payload,
      };
    },
    setDeliveryData: (store, action) => {
      return {
        ...store,
        deliveryData: action.payload,
      };
    },
    setServicePageData: (store, action) => {
      return {
        ...store,
        servicePageData: action.payload,
      };
    },
    setPrivacyPageData: (store, action) => {
      return {
        ...store,
        privacyPageData: action.payload,
      };
    },
    setBuyTwoGetOneGift: (store, action) => {
      return {
        ...store,
        buyTwoGetOneGift: action.payload,
      };
    },
    setBrandCategories: (store, action) => {
      return {
        ...store,
        brandCategories: action.payload,
      };
    },
    setShowSignInModal: (store, action) => {
      return {
        ...store,
        showSignInModal: action.payload,
      };
    },
    setMobileDisscounts: (store, action) => {
      return {
        ...store,
        mobileDisscounts: action.payload,
      };
    },
  },
});

export const getConvertRate = id => dispatch => {
  axiosInstance
    .get('/Localcurrency', {
      params: {
        currency: id,
        token: TOKEN,
        login: LOGIN,
        password: PASSWORD,
      },
    })
    .then(response => {
      dispatch(
        setCurrentCurrency({
          convertRate: response.data.convert_rate,
        }),
      );
    })
    .catch(err => {
      console.warn('Error: getConvertRate', err);
    });
};
export const getMainInfo = () => async dispatch => {
  dispatch(setPending(true));
  const fcmToken = await AsyncStorage.getItem('fcmToken');
  if (fcmToken) {
    postPushNotificationToken(fcmToken);
  }
  const openSignInModal = async () => {
    dispatch(
      getActiveMobileDisscount(async e => {
        if (e && !USER_ID) {
          dispatch(setShowSignInModal('showDisscountModal'));
        } else {
          let alreadyLaunched = await AsyncStorage.getItem('alreadyLaunched');
          if (!alreadyLaunched) {
            AsyncStorage.setItem('alreadyLaunched', 'true');
            dispatch(setShowSignInModal(true));
          }
        }
      }),
    );
  };

  if (!DEVICE_ID) {
    DEVICE_ID = await getUniqueId();
  }
  if (TOKEN) {
    Promise.all([
      dispatch(getHaedaerCategorys()),
      dispatch(getHaedaerSliders()),
      dispatch(getSales()),
      openSignInModal(),
      dispatch(getFeatureCategories()),
      dispatch(getBestDealProduct()),
      dispatch(getBannerSliders()),
      dispatch(getTopRatingProduct()),
      dispatch(getThreeInOne()),
      dispatch(getMenuData()),
      dispatch(getBuyTwoGetOneGift()),
    ]).finally(() => {
      dispatch(setPending(false));
    });
  }
};
export const getHaedaerCategorys = () => async dispatch => {
  await axiosInstance
    .post('/header-category', {
      ...defaultSendData,
      'Device-ID': DEVICE_ID,
    })
    .then(response => {
      dispatch(
        setHeaderCategorys([...response.data.Category, ...response.data.Brand]),
      );
    })
    .catch(err => {
      console.warn('Error: getHaedaerCategorys', err.request?._response);
    });
};
export const getHaedaerSliders = () => async dispatch => {
  await axiosInstance
    .post('/header-slider', {
      ...defaultSendData,
      'Device-ID': DEVICE_ID,
    })
    .then(async response => {
      const data = await response?.data?.Sliders;
      dispatch(setHeaderSliders(data));
    })
    .catch(err => {
      console.warn('Error: getHaedaerSliders', err.request?._response);
    });
};
export const getSales = () => async dispatch => {
  await axiosInstance
    .post('/sales', {
      ...defaultSendData,
      'Device-ID': DEVICE_ID,
    })
    .then(async response => {
      dispatch(setSales(response.data?.sales));
    })
    .catch(err => {
      console.warn('Error: getSales', err.request?._response);
    });
};
export const getThreeInOne = () => async dispatch => {
  await axiosInstance
    .post('/three-in-one', {
      ...defaultSendData,
      'Device-ID': DEVICE_ID,
    })
    .then(response => {
      dispatch(setThreeInOne(response.data));
    })
    .catch(err => {
      console.warn('Error: getThreeInOne', err);
    });
};
export const getBrands = () => dispatch => {
  axiosInstance
    .post(`/brand?Device-ID=${DEVICE_ID}`, {
      ...defaultSendData,
      'Device-ID': DEVICE_ID,
    })
    .then(response => {
      dispatch(setBrands(response.data.Brand));
    })
    .catch(err => {
      console.warn('Error: getBrands', err.request?._response);
    });
};
export const getBrandCategories = (slug, navigation) => dispatch => {
  dispatch(setPending(true));
  axiosInstance
    .post(`/brand/categories/${slug}`, {
      ...defaultSendData,
      'Device-ID': DEVICE_ID,
    })
    .then(response => {
      if (response.data.error) {
        throw new Error();
      }
      dispatch(
        setBrandCategories({
          brand_info: {
            id: response.data?.brand_info?.id,
            logo: response.data?.brand_info?.logo,
            name: response.data?.brand_info?.name,
            slug: response.data?.brand_info?.slug,
          },
          product_count: response.data.product_count,
          brand_categories: response.data?.brand_categories,
        }),
      );
      navigation.navigate('BrandCategoriesPage');
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

export const getFeatureCategories = () => async dispatch => {
  await axiosInstance
    .post('/feature-categories-cat', {
      ...defaultSendData,
      'Device-ID': DEVICE_ID,
    })
    .then(async response => {
      const itemsArray = response.data.featureCategoriesCat.map(item => {
        return {
          title_hy: item?.name_hy,
          title_ru: item?.name_ru,
          title_en: item?.name_en,
          image: item?.category_image?.image,
          slug: item.slug,
        };
      });
      dispatch(setFeatureCategories(itemsArray));
    })
    .catch(err => {
      console.warn('Error: getFeatureCategories', err.request?._response);
    });
};
export const getBestDealProduct = () => async dispatch => {
  await axiosInstance
    .post('/best-deal-product', {
      ...defaultSendData,
      'Device-ID': DEVICE_ID,
    })
    .then(response => {
      dispatch(setBestDealProduct(response.data.bestDealProduct));
    })
    .catch(err => {
      console.warn('Error: getBestDealProduct', err);
    });
};
export const getBannerSliders = () => async dispatch => {
  await axiosInstance
    .post('/baner-slider', {
      ...defaultSendData,
      'Device-ID': DEVICE_ID,
    })
    .then(response => {
      dispatch(setBannerSliders(response?.data?.banerSlider));
    })
    .catch(err => {
      console.warn('Error: getBannerSliders', err);
    });
};
export const getTopRatingProduct = () => async dispatch => {
  await axiosInstance
    .post('/top-rating-product', {
      ...defaultSendData,
      'Device-ID': DEVICE_ID,
    })
    .then(response => {
      dispatch(setTopRatingProduct(response.data?.topRatingProduct));
    })
    .catch(err => {
      console.warn('Error: getTopRatingProduct', err);
    });
};
export const getProductInfo = id => dispatch => {
  dispatch(setPending(true));
  axiosInstance
    .post(`product-info/${id}`, {
      ...defaultSendData,
      'Device-ID': DEVICE_ID,
    })
    .then(response => {
      dispatch(setProductInfo(response?.data));
    })
    .catch(err => {
      console.warn('Error: getProductInfo', err);
    })
    .finally(() => {
      dispatch(setPending(false));
    });
};
export const getRelatedProducts = id => dispatch => {
  axiosInstance
    .post(`related-products/${id}`, {
      ...defaultSendData,
      'Device-ID': DEVICE_ID,
    })
    .then(response => {
      dispatch(setRelatedProducts(response.data));
    })
    .catch(err => {
      console.warn('Error: getRelatedProducts', err);
    });
};
export const getRecentProducts = id => dispatch => {
  axiosInstance
    .post(`recent-products/${id}`, {
      ...defaultSendData,
      'Device-ID': DEVICE_ID,
    })
    .then(response => {
      dispatch(setRecentProducts(response.data.products));
    })
    .catch(err => {
      console.warn('Error: getRecentProducts', err);
    });
};
export const getSimilarProducts = id => dispatch => {
  axiosInstance
    .post(`similar-products/${id}`, {
      ...defaultSendData,
      'Device-ID': DEVICE_ID,
    })
    .then(response => {
      dispatch(setSimilarProducts(response.data?.similarProducts));
    })
    .catch(err => {
      console.warn('Error: getSimilarProducts', err);
    });
};
export const getCatalogPageData = slug => dispatch => {
  dispatch(setPending(true));
  axiosInstance
    .post(`catalog/${slug}`, {
      ...defaultSendData,
      'Device-ID': DEVICE_ID,
    })
    .then(response => {
      dispatch(setCatalogPageData(response.data));
    })
    .catch(err => {
      console.warn('Error: getCatalogPageData', err);
    })
    .finally(() => {
      dispatch(setPending(false));
    });
};
export const getMenuData = () => async dispatch => {
  await axiosInstance
    .post('/menu-select-mobile', {
      ...defaultSendData,
      'Device-ID': DEVICE_ID,
    })
    .then(response => {
      dispatch(setMenuData(response.data));
    })
    .catch(err => {
      console.warn('Error: getMenuData', err);
    });
};

export const getSalePage = id => dispatch => {
  dispatch(setPending(true));
  axiosInstance
    .post(`sale/${id}`, {
      ...defaultSendData,
      'Device-ID': DEVICE_ID,
    })
    .then(response => {
      dispatch(setSalePage(response.data));
    })
    .catch(err => {
      console.warn('Error: getSalePage', err);
    })
    .finally(() => {
      dispatch(setPending(false));
    });
};
export const getAllBrands = () => dispatch => {
  dispatch(setPending(true));
  axiosInstance
    .post('brands/all', {
      ...defaultSendData,
      'Device-ID': DEVICE_ID,
    })
    .then(response => {
      if (response.data?.Brand?.length) {
        dispatch(setAllBrands(response.data?.Brand));
      } else {
        throw 'Brands not found';
      }
    })
    .catch(err => {
      Toast.show({
        type: 'error',
        text1: err,
      });
      console.warn('Error: getAllBrands', err);
    })
    .finally(() => {
      dispatch(setPending(false));
    });
};
export const getBrandPageData = slug => async (dispatch, getState) => {
  const data = getState().main?.[slug];
  if (data) {
    return null;
  }
  dispatch(setPending(true));
  axiosInstance
    .post(`brand/${slug}`, {
      ...defaultSendData,
      'Device-ID': DEVICE_ID,
    })
    .then(response => {
      if (response.data.message) {
        throw response.data.message;
      }
      if (slug == 'vikass') {
        dispatch(setVikass(response.data));
      } else if (slug == 'hisense') {
        dispatch(setHisense(response.data));
      } else if (slug == 'toshiba') {
        dispatch(setToshiba(response.data));
      } else if (slug == 'samsung') {
        dispatch(setSamsung(response.data));
      }
    })
    .catch(err => {
      Toast.show({
        type: 'error',
        text1: err || t('error_message'),
      });
      console.warn('Error: getBrandPageData', err);
    })
    .finally(() => {
      dispatch(setPending(false));
    });
};
export const userSubscribe = email => () => {
  axiosInstance
    .post('/footer-subscribe', {
      ...defaultSendData,
      email: email,
    })
    .then(response => {
      if (!response.data.error) {
        Toast.show({
          type: 'success',
          text1: t('you_have_registered'),
        });
      } else {
        Toast.show({
          type: 'error',
          text1: response.data.message.email[0],
        });
      }
    })
    .catch(err => {
      Toast.show({
        type: 'error',
        text1: err.message,
      });
      console.warn('Error: getProductInfo', err);
    });
};
export const getAbouUsPageData = () => dispatch => {
  dispatch(setPending(true));
  axiosInstance
    .post('/about-us', {...defaultSendData, 'Device-ID': DEVICE_ID})
    .then(response => {
      dispatch(setAboutUsData(response.data));
    })
    .catch(err => {
      Toast.show({
        type: 'error',
        text1: t('som_wrong'),
      });
      console.warn('Error: getAbouUstPageData', err);
    })
    .finally(() => {
      dispatch(setPending(false));
    });
};
export const getContactPageData = () => dispatch => {
  dispatch(setPending(true));
  axiosInstance
    .post('/contact-us', {...defaultSendData, 'Device-ID': DEVICE_ID})
    .then(response => {
      dispatch(setContactData(response.data));
    })
    .catch(err => {
      Toast.show({
        type: 'error',
        text1: t('som_wrong'),
      });
      console.warn('Error: getContactPageData', err);
    })
    .finally(() => {
      dispatch(setPending(false));
    });
};
export const getCreditPageData = () => async dispatch => {
  dispatch(setPending(true));
  await axiosInstance
    .post('/credit-page-info', {...defaultSendData, 'Device-ID': DEVICE_ID})
    .then(response => {
      dispatch(setCreditPageData(response?.data));
    })
    .catch(err => {
      Toast.show({
        type: 'error',
        text1: t('som_wrong'),
      });
      console.warn('Error: getCreditPageInfo', err);
    })
    .finally(() => {
      dispatch(setPending(false));
    });
};
export const getFaqPageData = () => async dispatch => {
  dispatch(setPending(true));
  await axiosInstance
    .post('/faq', {...defaultSendData, 'Device-ID': DEVICE_ID})
    .then(response => {
      dispatch(setFaqPageData(response.data));
    })
    .catch(err => {
      Toast.show({
        type: 'error',
        text1: t('som_wrong'),
      });
      console.warn('Error: getCreditPageInfo', err);
    })
    .finally(() => {
      dispatch(setPending(false));
    });
};
export const getJobPageData = () => async dispatch => {
  dispatch(setPending(true));
  await axiosInstance
    .post('/job', {...defaultSendData, 'Device-ID': DEVICE_ID})
    .then(response => {
      dispatch(setJobPageData(response.data));
    })
    .catch(err => {
      Toast.show({
        type: 'error',
        text1: t('som_wrong'),
      });
      console.warn('Error: getCreditPageInfo', err);
    })
    .finally(() => {
      dispatch(setPending(false));
    });
};
export const postJobPageCV = item => dispatch => {
  let formData = new FormData();

  formData.append('login', LOGIN);
  formData.append('password', PASSWORD);
  formData.append('token', TOKEN);
  formData.append('job_id', item.id);
  formData.append('file', {
    uri: item.uri,
    name: item.name,
    type: item.type,
  });

  axios
    .post(SERVER_URL + 'job/send-cv', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRF-Token': _TOKEN,
      },
    })
    .then(response => {
      if (response.data.success) {
        Toast.show({
          type: 'success',
          text1: 'success',
          text2: t('success_resume'),
        });
      } else {
        throw new Error();
      }
    })
    .catch(error => {
      Toast.show({
        type: 'error',
        text1: t('som_wrong'),
      });
    });
};
export const getDeliveryPageData = () => dispatch => {
  axiosInstance
    .post(`/delivery`, {
      login: LOGIN,
      password: PASSWORD,
      token: TOKEN,
      _token: _TOKEN,
      'Device-ID': DEVICE_ID,
    })
    .then(response => {
      if (response.data.error) {
        throw new Error(response.data?.message);
      }
      dispatch(setDeliveryData(response.data));
    })
    .catch(err => {
      Toast.show({
        type: 'error',
        text1: t('som_wrong'),
      });
      console.warn('Error: getDeliveryPageData', err);
    });
};
export const getServicePageData = () => dispatch => {
  axiosInstance
    .post('service', {
      login: LOGIN,
      password: PASSWORD,
      token: TOKEN,
      _token: _TOKEN,
      'Device-ID': DEVICE_ID,
    })
    .then(response => {
      if (response.data.error) {
        throw new Error(response.data?.message);
      }
      dispatch(setServicePageData(response.data));
    })
    .catch(err => {
      Toast.show({
        type: 'error',
        text1: t('som_wrong'),
      });
      console.warn('Error: getServicePageData', err);
    });
};

export const getPrivacyPageData = () => dispatch => {
  axiosInstance
    .post('privacy-policy', {
      login: LOGIN,
      password: PASSWORD,
      token: TOKEN,
      _token: _TOKEN,
      'Device-ID': DEVICE_ID,
    })
    .then(response => {
      if (response.data.error) {
        throw new Error(response.data?.message);
      }
      dispatch(setPrivacyPageData(response.data));
    })
    .catch(err => {
      Toast.show({
        type: 'error',
        text1: t('som_wrong'),
      });
      console.warn('Error: getServicePageData', err);
    });
};
export const getBuyTwoGetOneGift = () => async dispatch => {
  await axiosInstance
    .post('home-product', {
      login: LOGIN,
      password: PASSWORD,
      token: TOKEN,
      _token: _TOKEN,
      'Device-ID': DEVICE_ID,
    })
    .then(response => {
      if (response.data.error) {
        throw new Error(response.data?.message);
      }
      dispatch(setBuyTwoGetOneGift(response.data));
    })
    .catch(err => {
      // Toast.show({
      //   type: 'error',
      //   text1: t('som_wrong'),
      // });
      console.warn('Error: getBuyTwoGetOneGift', err);
    });
};
export const getHomeActionPrice = (ids, calback) => async dispatch => {
  await axiosInstance
    .post('https://vlv.am/getHomeActionPrice', {
      login: LOGIN,
      password: PASSWORD,
      token: TOKEN,
      _token: _TOKEN,
      id: ids,
      'Device-ID': DEVICE_ID,
    })
    .then(response => {
      if (response.data.error) {
        throw new Error(response.data?.message);
      } else {
        calback?.(response.data);
      }
    })
    .catch(err => {
      dispatch(setPending(false));
      Toast.show({
        type: 'error',
        text1: t('som_wrong'),
      });
      console.warn('Error: getHomeActionPrice', err);
    });
};
export const postPushNotificationToken = async firirebase_token => {
  DEVICE_ID = await getUniqueId();
  await axiosInstance
    .post('https://vlv.am/login/devices/token', {
      login: LOGIN,
      password: PASSWORD,
      token: TOKEN,
      _token: _TOKEN,
      'Device-ID': DEVICE_ID,
      firirebase_token: firirebase_token,
    })
    .catch(err => {
      console.warn('Error: postPushNotificationToken', err);
    });
};
export const getActiveMobileDisscount = callback => dispatch => {
  axiosInstance
    .post('/mobile-discounts', {
      login: LOGIN,
      password: PASSWORD,
      token: TOKEN,
      _token: _TOKEN,
      'Device-ID': DEVICE_ID,
    })
    .then(e => {
      dispatch(setMobileDisscounts(e.data));
      callback(e.data.status);
    })
    .catch(err => {
      console.warn('Error: getActiveMobileDisscount', err);
    });
};
export const sendUserAnalystics = async time_spent => {
  const ip_address = await DeviceInfo.getIpAddress();
  axiosInstance
    .post('/track-time', {
      login: LOGIN,
      password: PASSWORD,
      token: TOKEN,
      _token: _TOKEN,
      'Device-ID': DEVICE_ID,
      ip_address,
      is_mobile: true,
      time_spent,
    })
    .catch(err => {
      console.warn('Error: sendUserAnalystics', err);
    });
};

export const {
  setCurrentLanguage,
  setCurrentCurrency,
  setPending,
  setInnerPending,
  setHeaderCategorys,
  setHeaderSliders,
  setSalesImages,
  setSales,
  setFeatureCategories,
  setBestDealProduct,
  setBannerSliders,
  setTopRatingProduct,
  setThreeInOne,
  setBrands,
  setProductInfo,
  setRelatedProducts,
  setRecentProducts,
  setSimilarProducts,
  setCatalogPageData,
  setOpenMenu,
  setMenuData,
  setSalePage,
  setShowCamera,
  setAllBrands,
  setHisense,
  setSamsung,
  setToshiba,
  setVikass,
  setAboutUsData,
  setContactData,
  setCreditPageData,
  setFaqPageData,
  setJobPageData,
  setDeliveryData,
  setServicePageData,
  setPrivacyPageData,
  setBuyTwoGetOneGift,
  setBrandCategories,
  setShowSignInModal,
  setMobileDisscounts,
} = mainSlice.actions;
export default mainSlice.reducer;

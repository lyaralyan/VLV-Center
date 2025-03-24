import {createSlice} from '@reduxjs/toolkit';
import axiosInstance from './request';
import {LOGIN, PASSWORD, TOKEN, SERVER_URL} from '@env';
import Toast from 'react-native-toast-message';
import DeviceInfo, {getUniqueId} from 'react-native-device-info';
import {t} from 'i18next';
import {USER_ID, _TOKEN} from './UserSlice';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getSalesRequest} from '@store/getSalesSlice';
import {getFeatureCategoriesRequest} from '@store/getFeatureCategoriesSlice';
import {getBestDealProductRequest} from '@store/getBestDealProductSlice';
import {getBannerSlidersRequest} from '@store/getBannerSlidersSlice';
import {getTopRatingProductRequest} from '@store/getTopRatingProductSlice';
import {getHeaderCategoriesRequest} from './getHeaderCategoriesSlice';
import {getThreeInOneRequest} from './getThreeInOneSlice';

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
  productInfo: null,
  relatedProducts: [],
  recentProducts: [],
  catalogPageData: [],
  openMenu: false,
  menuData: null,
  salePage: null,
  showCamera: false,
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
      dispatch(getHeaderCategoriesRequest()),
      dispatch(getSalesRequest()),
      dispatch(getFeatureCategoriesRequest()),
      openSignInModal(),
      dispatch(getBestDealProductRequest()),
      dispatch(getBannerSlidersRequest()),
      dispatch(getTopRatingProductRequest()),
      dispatch(getThreeInOneRequest()),
      dispatch(getMenuData()),
      dispatch(getBuyTwoGetOneGift()),
    ]).finally(() => {
      dispatch(setPending(false));
    });
  }
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
  setSalesImages,
  setProductInfo,
  setRelatedProducts,
  setRecentProducts,
  setSimilarProducts,
  setCatalogPageData,
  setOpenMenu,
  setMenuData,
  setSalePage,
  setShowCamera,
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

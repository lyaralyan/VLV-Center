import {createSlice} from '@reduxjs/toolkit';
import axiosInstance from './request';
import {LOGIN, PASSWORD, TOKEN, GOOGLE_MAP_API_KEY} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUniqueId} from 'react-native-device-info';
import Toast from 'react-native-toast-message';
import {getWishlistCartCount, setCartPageProducts} from './CartSlice';
import {t} from 'i18next';
import {setCurrentLanguage, setPending, setShowSignInModal} from './MainSlice';
import axios from 'axios';
import i18n from '@translations/i18n';

export let S_D, _TOKEN, DEVICE_ID, USER_ID;
const defaultSendData = {
  login: LOGIN,
  password: PASSWORD,
  token: TOKEN,
  session_id: S_D,
};
const initialState = {
  userId: null,
  userInfo: {},
  redirectToCartAfterAuth: null,
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (store, action) => {
      return {
        ...store,
        userId: action.payload,
      };
    },
    setUserInfo: (store, action) => {
      return {
        ...store,
        userInfo: action.payload,
      };
    },
    changeUserNotificationSettings: (store, action) => {
      return {
        ...store,
        userInfo: {
          ...store.userInfo,
          user_notification: !store.userInfo.user_notification,
        },
      };
    },
    setSignUpErrors: (store, action) => {
      return {
        ...store,
        signUpErrors: action.payload,
      };
    },
    setRedirectToCartAfterAuth: (store, action) => {
      return {
        ...store,
        redirectToCartAfterAuth: action.payload,
      };
    },
    setAccessToken: (store, action) => {
      return {
        ...store,
        accessToken: action.payload,
      };
    },
    setDeleteBankCard: (store, action) => {
      return {
        ...store,
        userInfo: {
          ...store.userInfo,
          personal_information: {
            ...store.userInfo.personal_information,
            pan: null,
            bindingId: null,
          },
        },
      };
    },
  },
});

export const clearUser = () => dispatch => {
  AsyncStorage.removeItem('user_id');
  dispatch(setUserId(null));
  dispatch(setCartPageProducts([]));
  dispatch(setUserInfo({}));

  USER_ID = null;
};
export const getToken = () => async dispatch => {
  dispatch(setPending(true));
  const userId = await AsyncStorage.getItem('user_id');
  const language = await AsyncStorage.getItem('language');
  const accessToken = await AsyncStorage.getItem('access_token');

  if (language) {
    await dispatch(setCurrentLanguage(language));
    await i18n.changeLanguage(language);
  }
  dispatch(setAccessToken(accessToken));
  dispatch(setUserId(userId));
  USER_ID = userId;
  DEVICE_ID = await getUniqueId();

  axios
    .get('https://vlv.am/login/devices', {
      params: {
        'Device-ID': DEVICE_ID,
      },
    })
    .then(async response => {
      _TOKEN = response.data._token;
      S_D = response.data.session_id;
      AsyncStorage.setItem('_token', response.data._token);
      AsyncStorage.setItem('session_id', response.data.session_id);
      dispatch(getWishlistCartCount());
    })
    .catch(err => {
      console.warn('Error: getToken', err.request?._response);
    })
    .finally(() => {
      dispatch(setPending(false));
    });
};

export const UserLogin =
  ({login, password}) =>
  dispatch => {
    axiosInstance
      .post('/user/login', {
        ...defaultSendData,
        _token: _TOKEN,
        'Device-ID': DEVICE_ID,
        username: login,
        user_password: password,
      })
      .then(response => {
        if (!response.data.error) {
          if (!response.data.user_id) {
            Toast.show({
              type: 'error',
              text1: 'user_id not found | Need fix it from BE',
            });
            return null;
          }
          Toast.show({
            type: 'success',
            text1: t('logged_in_successfully'),
          });
          dispatch(setUserId(response.data.user_id));
          dispatch(setAccessToken(response.data.token));

          dispatch(setShowSignInModal(false));
          USER_ID = response.data.user_id;
          AsyncStorage.setItem(
            'user_id',
            JSON.stringify(response.data.user_id),
          );
          AsyncStorage.setItem('access_token', response.data.token);
        } else {
          Toast.show({
            type: 'error',
            text1: t('error_message'),
          });
        }
      })
      .catch(err => {
        console.warn('error in sign in');

        Toast.show({
          type: 'error',
          text1: t('wrong_msg'),
        });

        console.warn('Error: Login', err);
      });
  };
export const UserLoginGoogle = data => dispatch => {
  axiosInstance
    .post('/user/login/google', {
      ...defaultSendData,
      _token: _TOKEN,
      'Device-ID': DEVICE_ID,
      ...data,
    })
    .then(response => {
      if (response.data.code === 3) {
        Toast.show({
          type: 'success',
          text1: t('logged_in_successfully'),
        });
        dispatch(setAccessToken(response.data.access_token));

        dispatch(setUserId(response.data.user_id));
        USER_ID = response.data.user_id;
        AsyncStorage.setItem('user_id', JSON.stringify(response.data.user_id));
      } else {
        Toast.show({
          type: 'error',
          text1: t('error_message'),
        });
      }
    })
    .catch(err => {
      if (err?.message) {
        Toast.show({
          type: 'error',
          text1: err?.message,
        });
      }

      console.warn('Error: UserLoginGoogle', err);
    });
};

export const getUserInfo = () => async (dispatch, getState) => {
  const accessToken = await getState().user.accessToken;
  axiosInstance
    .post('/profile/dashboard', {
      ...defaultSendData,
      _token: _TOKEN,
      'Device-ID': DEVICE_ID,
      access_token: accessToken,
    })
    .then(response => {
      if (!response.data.error) dispatch(setUserInfo(response.data));
    })
    .catch(err => {
      console.warn('Error: getUserInfo', err);
    });
};
export const editUserInfo = props => async (dispatch, getState) => {
  const accessToken = await getState().user.accessToken;
  axiosInstance
    .post('profile/personal-info/update', {
      ...defaultSendData,
      _token: _TOKEN,
      'Device-ID': DEVICE_ID,
      access_token: accessToken,
      ...props,
    })
    .then(response => {
      if (!response.data.error) {
        Toast.show({
          type: 'success',
          text1: t('update_successfully'),
        });
      } else {
        // dispatch(setUserInfo(response.data));
      }
    })
    .catch(err => {
      console.warn('Error: getUserInfo', err);
    });
};
export const updateNotificationSettings = () => async (dispatch, getState) => {
  const accessToken = await getState().user.accessToken;
  axiosInstance
    .post('profile/notification/update', {
      ...defaultSendData,
      _token: _TOKEN,
      'Device-ID': DEVICE_ID,
      access_token: accessToken,
    })
    .then(e => {
      if (e.data.error) {
        throw Error(e.data?.message);
      } else {
        dispatch(changeUserNotificationSettings());
      }
    })
    .catch(err => {
      Toast.show({
        text1: err,
        type: 'error',
      });
      console.warn('Error: updateNotificationSettings', err);
    });
};
export const UserSignUp = data => dispatch => {
  axiosInstance
    .post('/user/register', {
      ...defaultSendData,
      _token: _TOKEN,
      'Device-ID': DEVICE_ID,
      first_name: data?.first_name,
      last_name: data?.last_name,
      email: data.email,
      phone: data?.phone,
      user_password: data?.user_password,
      password_confirmation: data?.password_confirmation,
    })
    .then(response => {
      if (!response.data.error) {
        dispatch(setAccessToken(response.data.token));
        dispatch(setUserId(response.data.user_id));
        USER_ID = response.data.user_id;
        AsyncStorage.setItem('user_id', JSON.stringify(response.data.user_id));
      } else {
        console.info('resp', response.data);
      }
    })
    .catch(err => {
      let res;
      if (typeof err?.request?._response == 'string') {
        res = JSON.parse(err?.request?._response);
      } else {
        res = err?.request?._response;
      }
      dispatch(setSignUpErrors(Object.keys(res?.message || {})));
      Object.keys(res?.message || {}).map(key => {
        if (res?.message?.[key]) {
          res?.message?.[key].map(item => {
            Toast.show({
              type: 'error',
              text1: item,
            });
          });
        }
      });
      console.warn('Error: SignUp', err);
    });
};
export const forgotPassword = (phone, navigation) => dispatch => {
  dispatch(setPending(true));
  axiosInstance
    .post('send-password-reset-code', {
      ...defaultSendData,
      _token: _TOKEN,
      'Device-ID': DEVICE_ID,
      phone,
    })
    .then(e => {
      if (!e.data.error) {
        Toast.show({
          type: 'success',
          text1: t('otp_send_successful'),
        });
        navigation.navigate('ForgotPassword2', {
          otp: e.data.verification_code,
          user_id: e.data.user_id,
          phone,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: e.data.message,
        });
      }
    })
    .catch(err => {
      console.warn('Error: forgotPassword', err);
      Toast.show({
        type: 'error',
        text1: err.message,
      });
    })
    .finally(() => {
      dispatch(setPending(false));
    });
};
export const forgotPassword2 =
  (user_id, code, phone, navigation) => dispatch => {
    dispatch(setPending(true));
    axiosInstance
      .post('check-password-verification-code', {
        ...defaultSendData,
        _token: _TOKEN,
        'Device-ID': DEVICE_ID,
        user_id,
        verification_code: code,
      })
      .then(e => {
        if (!e.data.error) {
          navigation.navigate('ForgotPassword3', {phone});
        } else {
          Toast.show({
            type: 'error',
            text1: e.data.message,
          });
        }
      })
      .catch(err => {
        console.warn('Error: forgotPassword', err);
        Toast.show({
          type: 'error',
          text1: err.message,
        });
      })
      .finally(() => {
        dispatch(setPending(false));
      });
  };
export const resetPassword =
  (email, phone, password, navigation) => dispatch => {
    dispatch(setPending(true));
    axiosInstance
      .post('user/reset-password', {
        ...defaultSendData,
        _token: _TOKEN,
        'Device-ID': DEVICE_ID,
        email,
        phone,
        user_password: password,
        password_confirmation: password,
      })
      .then(e => {
        navigation?.navigate('Login');
        if (!e.data.error) {
          Toast.show({
            type: 'success',
            text1: t('the_password_has_been_successfully_changed'),
          });
        } else {
          Toast.show({
            type: 'error',
            text1: e.data.message,
          });
        }
      })
      .catch(err => {
        console.warn('Error: forgotPassword', err);
        Toast.show({
          type: 'error',
          text1: err.message,
        });
      })
      .finally(() => {
        dispatch(setPending(false));
      });
  };
export const getLocationNameFromCordinates = (data, callBack = () => {}) => {
  axiosInstance
    .get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        key: GOOGLE_MAP_API_KEY,
        latlng: `${data?.latitude},${data?.longitude}`,
      },
    })
    .then(e => {
      if (e.data.status == 'OK') {
        callBack(e.data?.results?.[0]?.formatted_address);
      }
    })
    .catch(err => {
      console.warn('Error: getLocationNameFromCordinates', err);
    });
};
export const addAddress = (address, phone) => async (dispatch, getState) => {
  const accessToken = await getState().user.accessToken;
  const user = await getState().user.userInfo.personal_information;

  axiosInstance
    .post('profile/add-address', {
      ...defaultSendData,
      _token: _TOKEN,
      'Device-ID': DEVICE_ID,
      access_token: accessToken,
      address: address,
      name: user.first_name,
      surname: user.last_name || user.first_name,
      email: user.email,
      phone,
    })
    .then(e => {
      if (!e.data.error) {
        Toast.show({
          type: 'success',
          text1: t('created_successfully'),
        });
        dispatch(getUserInfo());
      } else {
        Toast.show({
          type: 'error',
          text1: e.data.message,
        });
      }
    })
    .catch(err => {
      console.warn('Error: forgotPassword', err);
      Toast.show({
        type: 'error',
        text1: err.message,
      });
    })
    .finally(() => {
      dispatch(setPending(false));
    });
};
export const editAddress =
  (address, id, phone) => async (dispatch, getState) => {
    const accessToken = await getState().user.accessToken;
    const user = await getState().user.userInfo.personal_information;

    axiosInstance
      .post('profile/update-address', {
        ...defaultSendData,
        _token: _TOKEN,
        'Device-ID': DEVICE_ID,
        access_token: accessToken,
        id: id,
        address: address,
        name: user.first_name,
        surname: user.last_name || user.first_name,
        email: user.email,
        phone,
      })
      .then(e => {
        if (!e.data.error) {
          Toast.show({
            type: 'success',
            text1: t('updated_successfully'),
          });
          dispatch(getUserInfo());
        } else {
          Toast.show({
            type: 'error',
            text1: e.data.message,
          });
        }
      })
      .catch(err => {
        console.warn('Error: forgotPassword', err);
        Toast.show({
          type: 'error',
          text1: err.message,
        });
      })
      .finally(() => {
        dispatch(setPending(false));
      });
  };
export const deleteAddress = id => async (dispatch, getState) => {
  const accessToken = await getState().user.accessToken;

  axiosInstance
    .post('profile/delete-address', {
      ...defaultSendData,
      _token: _TOKEN,
      'Device-ID': DEVICE_ID,
      access_token: accessToken,
      id: id,
    })
    .then(e => {
      if (!e.data.error) {
        Toast.show({
          type: 'success',
          text1: t('deleted_successfully'),
        });
        dispatch(getUserInfo());
      } else {
        Toast.show({
          type: 'error',
          text1: e.data.message,
        });
      }
    })
    .catch(err => {
      console.warn('Error: forgotPassword', err);
      Toast.show({
        type: 'error',
        text1: err.message,
      });
    })
    .finally(() => {
      dispatch(setPending(false));
    });
};

export const sendOtp =
  ({phone, name, email, callback}) =>
  async (dispatch, getState) => {
    axiosInstance
      .post('send-otp', {
        ...defaultSendData,
        _token: _TOKEN,
        'Device-ID': DEVICE_ID,
        phone,
        name,
        email,
      })
      .then(e => {
        if (!e.data.error) {
          Toast.show({
            type: 'success',
            text1: t('otp_send_successful'),
          });
          callback(e.data.otp);
        } else {
          if (e.data.error == 2) {
            dispatch(setSignUpErrors(['email']));
          } else if (e.data.error == 3) {
            dispatch(setSignUpErrors(['phone']));
          }
          Toast.show({
            type: 'error',
            text1: e.data.message,
          });
        }
      })
      .catch(err => {
        console.warn('Error: sendOtp', err);
        Toast.show({
          type: 'error',
          text1: err.message,
        });
      })
      .finally(() => {
        dispatch(setPending(false));
      });
  };

export const deleteAccount =
  (navigation, dismiss) => async (dispatch, getState) => {
    const userId = await getState().user.userId;
    axiosInstance
      .post('/user/delete', {
        ...defaultSendData,
        _token: _TOKEN,
        'Device-ID': DEVICE_ID,
        user_id: userId,
      })
      .then(e => {
        if (!e.data.error) {
          Toast.show({
            type: 'success',
            text1: t('deleted_successfully'),
          });
          dispatch(clearUser());
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'Home',
              },
            ],
          });
        } else {
          Toast.show({
            type: 'error',
            text1: e.data.message,
          });
        }
      })
      .catch(err => {
        console.warn('Error: deleteAccount', err);
        Toast.show({
          type: 'error',
          text1: err.message,
        });
      })
      .finally(() => {
        dismiss();
        dispatch(setPending(false));
      });
  };
export const deleteBankCard = () => async (dispatch, getState) => {
  const userId = await getState().user.userId;
  axiosInstance
    .post('https://vlv.am/mobile-make-delete-card', {
      ...defaultSendData,
      _token: _TOKEN,
      'Device-ID': DEVICE_ID,
      auth_user_id: userId,
    })
    .then(e => {
      if (!e.data.error) {
        dispatch(setDeleteBankCard());
        Toast.show({
          type: 'success',
          text1: t('deleted_successfully'),
        });
      } else {
        Toast.show({
          type: 'error',
          text1: e.data.message,
        });
      }
    })
    .catch(err => {
      console.warn('Error: deleteAccount', err);
      Toast.show({
        type: 'error',
        text1: err.message,
      });
    })
    .finally(() => {
      dispatch(setPending(false));
    });
};

export const {
  setUserId,
  setUserInfo,
  setSignUpErrors,
  setRedirectToCartAfterAuth,
  setAccessToken,
  setDeleteBankCard,
  changeUserNotificationSettings,
} = userSlice.actions;
export default userSlice.reducer;

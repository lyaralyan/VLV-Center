import {
  Alert,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import Header from '@components/InnerHeader';
import {RH, RW, font} from '@theme/utils';
import Input from '@components/Input/Input';
import Row from '@theme/wrappers/row';
import ToggleSwitch from '@components/ToggleSwitch';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Colors from '@theme/colors';
import BankCardSvg from './assets/BankCardSvg';
import PaymentType from './components/PaymentType';
import BankCheckSvg from './assets/BankCheckSvg';
import TelcellSvg from './assets/TelcellSvg';
import IdramSvg from './assets/IdramSvg';
import CashSvg from './assets/CashSvg';
import {useDispatch, useSelector} from 'react-redux';
import UseCalcPrice from '@helpers/UseCalcPrice';
import DashedLine from 'react-native-dashed-line';
import Button from '@components/Button/Button';
import Toast from 'react-native-toast-message';
import {getLocationNameFromCordinates, getUserInfo} from '@store/UserSlice';
import {
  AttachBankCard,
  checkPromoCode,
  guestAddressStore,
  postCreditModal,
  setCartCount,
  setCouponAmount,
  setPromoCode,
  setShowThanksModal,
  setShowThanksModalCash,
} from '@store/CartSlice';
import {setPending} from '@store/MainSlice';
import CheckSvg from '@assets/SVG/CheckSvg';
import axiosInstance from '@store/request';
import CustomModal from '@components/Modal';
import ThanksModal from './components/ThanksModal';
import {useNavigation} from '@react-navigation/native';
import MapMarkerSvg from '@screens/Contact/assets/MapMarkerSvg';
import OnlineCreditSvg from './assets/OnlineCreditSvg';
import LongBackArrowSvg from './assets/LongBackArrowSvg';
import {useTranslation} from 'react-i18next';
import {setOrderId, setSubmitFormTag} from '@store/SearchPageSlice';
import BankCardSvg2 from './assets/BankCardSvg2';
import Geolocation from '@react-native-community/geolocation';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {GOOGLE_MAP_API_KEY} from '@env';
import useProductPrice from '@helpers/useProductPrice';
import ThanksModalCash from './components/ThanksModalCash';

const creditItems = [
  {
    icon: 'https://vlv.am/public/img/vtb.png',
    name: 'Vtb',
  },
  // {
  //   icon: 'https://vlv.am/public/img/unii.png',
  //   name: 'Uni',
  // },
  {
    icon: 'https://vlv.am/public/img/ineco.png',
    name: 'ineco',
  },
  {
    icon: 'https://vlv.am/public/img/acba.png',
    name: 'acba',
  },
  // {
  //   icon: 'https://vlv.am/public/img/evoca.png',
  //   name: 'evoca',
  // },
];
const CartOrder = () => {
  const [deliveryToMyAddress, setDeliveryToMyAddress] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [choosedAdress, setChoosedAdress] = useState();
  const [deliveryToRegions, setDeliveryToRegions] = useState(false);
  const [activeAddress, setActiveAddress] = useState({
    latitude: 40.150011,
    longitude: 44.495715,
  });
  const [activePaymentType, setActivePaymentType] = useState(null);
  const [credit, setCredit] = useState(false);

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState('');
  const [autocompleteKey, setAutocompleteKey] = useState(0);
  const [note, setNote] = useState('');
  const [paymentSuccessData, setPaymentSuccessData] = useState(null);

  const {
    promoCode,
    cartProducts,
    totalPrice,
    discountTotalPrice,
    couponAmount,
    showThanksModal,
    showThanksModalCash,
  } = useSelector(({cart}) => cart);

  const userInfo = useSelector(({user}) => user);
  const cardPan = useSelector(({user}) => user.user?.personal_information?.pan);
  const currentCurrency = useSelector(({main}) => main.currentCurrency);
  const insets = useSafeAreaInsets();
  const mapRef = useRef(null);
  const googlePlacesRef = useRef(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {t} = useTranslation();
  const calculatePrice = useProductPrice();

  const paymentItems = [
    {
      icon: <BankCardSvg />,
      name: t('attach / add a bank card'),
      id: 23,
      pan: cardPan,
    },
    {
      icon: <BankCardSvg2 />,
      name: t('By bank card'),
      id: 17,
    },
    {
      icon: <BankCheckSvg />,
      name: t('pay_by_receipt'),
      id: 33333,
    },
    {
      icon: <CashSvg />,
      name: t('PAY ON THE SPOT BY CASH OR Bank Card'),
      id: 1,
    },
    {
      icon: <IdramSvg />,
      name: 'Idram',
      id: 15,
    },
    {
      icon: <TelcellSvg />,
      name: 'Telcell',
      id: 16,
    },
    {
      icon: <OnlineCreditSvg />,
      name: t('Online credit'),
      id: 100,
    },
  ];

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({latitude, longitude});
        setActiveAddress({latitude, longitude});
        reverseGeocode({latitude, longitude});
      },
      error => Alert.alert('Error', 'Could not fetch location.'),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  const reverseGeocode = location => {
    const {latitude, longitude} = location;
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GOOGLE_MAP_API_KEY}`,
    )
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results[0]) {
          const formattedAddress = data.results[0].formatted_address;
          setAddress(formattedAddress);
          // Force re-render of GooglePlacesAutocomplete by changing the key
          setAutocompleteKey(prevKey => prevKey + 1);
        }
      })
      .catch(error => console.error(error));
  };

  const handleMarkerDragEnd = e => {
    const newLocation = e.nativeEvent.coordinate;
    setActiveAddress(newLocation);
    reverseGeocode(newLocation);
  };

  const handleMapPress = e => {
    const coordinate = e.nativeEvent.coordinate;
    setActiveAddress(coordinate);
    reverseGeocode(coordinate);
  };

  useEffect(() => {
    if (Object.keys(activeAddress || {}).length) {
      getLocationNameFromCordinates(activeAddress, e => setAddress(e));
    }
  }, [activeAddress]);

  useEffect(() => {
    if (userInfo.userId && !Object.keys(userInfo?.userInfo || {}).length) {
      dispatch(getUserInfo());
    } else {
      if (userInfo?.userInfo?.addresses?.[0]?.address) {
        setDeliveryToMyAddress(true);
        setChoosedAdress(userInfo?.userInfo?.addresses?.[0]?.address);
      }
      setName(userInfo?.userInfo?.personal_information?.first_name);
      setLastName(userInfo?.userInfo?.personal_information?.last_name);
      setEmail(userInfo?.userInfo?.personal_information?.email);
      setPhone(userInfo?.userInfo?.personal_information?.phone);
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (couponAmount.amount) {
      const products = cartProducts.map(product => {
        return {
          product_id: product.seller_product.product_id,
          category_id: product.seller_product.categories[0].id,
          brand_id: product.seller_product.product.brand.id,
        };
      });
      dispatch(checkPromoCode(promoCode, products));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartProducts]);

  const orderFunc = () => {
    dispatch(setOrderId(null));
    if (!name) {
      Toast.show({
        type: 'error',
        text1: t('first_name') + ' ' + t('not_selected'),
      });
      return null;
    }
    if (!lastName) {
      Toast.show({
        type: 'error',
        text1: t('last_name') + ' ' + t('not_selected'),
      });
      return null;
    }
    if (!email) {
      Toast.show({
        type: 'error',
        text1: t('mail') + ' ' + t('not_selected'),
      });
      return null;
    }
    if (!phone) {
      Toast.show({
        type: 'error',
        text1: t('phone_number') + ' ' + t('not_selected'),
      });
      return null;
    }
    if (!address) {
      Toast.show({
        type: 'error',
        text1: 'հասցեն',
      });
      return null;
    }
    if (
      !(
        typeof activePaymentType === 'number' ||
        typeof activePaymentType === 'string'
      )
    ) {
      Toast.show({
        type: 'error',
        text1: t('Payment type') + ' ' + t('not_selected'),
      });
      return null;
    }

    if (
      name &&
      lastName &&
      email &&
      phone &&
      address &&
      (typeof activePaymentType === 'number' ||
        typeof activePaymentType === 'string')
    ) {
      dispatch(setPending(true));
      dispatch(setCartCount(0));
      let sendData = {
        not: note,
        number_of_package: cartProducts.length,
        number_of_item:
          cartProducts?.reduce((count, product) => {
            return count + product?.qty;
          }, 0) || 1,
        map_address: deliveryToMyAddress ? choosedAdress : address,
        discount_total: discountTotalPrice || 0,
        discount: discountTotalPrice || 0,
        grand_total: totalPrice,
        sub_total: totalPrice,
        flat: address2,
        auth: +!!userInfo.userId,
        auth_user_id: userInfo.userId,
        email: email,
        phone: phone,
      };

      if (activePaymentType === 23) {
        sendData.gateway_id = 23;
        sendData.payment_id = 23;
      } else if (activePaymentType === 33333) {
        sendData.payment_id = 20;
        sendData.gateway_id = 20;
        // sendData.hvhh = hvhh;
        // sendData.corporate_name = corporateName;
        // sendData.legal_address = legalAddress;
        dispatch(setPending(false));
        navigation.navigate('BankTransfer', sendData);
        return null;
      } else if (typeof activePaymentType === 'number') {
        sendData.gateway_id = activePaymentType;
        sendData.payment_id = activePaymentType;
      } else {
        sendData.gateway_id = 18;
        sendData.payment_id = 18;
        sendData.credit = activePaymentType;
      }
      if (couponAmount.amount) {
        sendData = {...sendData, ...couponAmount};
      }

      dispatch(
        postCreditModal(
          sendData,
          e => {
            dispatch(setCouponAmount({amount: 0}));
            dispatch(setPromoCode(''));
            if (e.data.order?.id) {
              if (activePaymentType === 23) {
                dispatch(setOrderId(e.data.order?.id));
                dispatch(AttachBankCard(e.data.order.order_number, cardPan));
              } else if (activePaymentType === 'Vtb') {
                Linking.openURL('https://www.vtb.am/am/register/');
                dispatch(setPending(false));
              } else if (activePaymentType === 1) {
                dispatch(setPending(false));
                dispatch(setShowThanksModalCash(true));

                setPaymentSuccessData(e.data);
              } else if (activePaymentType === 16) {
                dispatch(setOrderId(e.data.order.id));
                axiosInstance
                  .get('https://vlv.am/tellcell', {
                    params: {
                      id: e.data.order.id,
                      total: totalPrice,
                    },
                  })
                  .then(err => {
                    dispatch(setPending(false));
                    dispatch(setSubmitFormTag(err.data));
                  })
                  .catch(() => {
                    Toast.show({
                      type: 'error',
                      text1: t('error_message'),
                    });
                    dispatch(setPending(false));
                  });
              } else if (activePaymentType === 15) {
                dispatch(setOrderId(e.data.order.id));
                axiosInstance
                  .get('https://vlv.am/idram', {
                    params: {
                      id: e.data.order.id,
                      total: totalPrice,
                    },
                  })
                  .then(err => {
                    dispatch(setPending(false));
                    dispatch(setSubmitFormTag(err.data));
                  })

                  .catch(error => {
                    console.warn('idram error', error);
                    Toast.show({
                      type: 'error',
                      text1: 'idram error' + t('error_message'),
                    });
                    dispatch(setPending(false));
                  });
              } else if (activePaymentType === 17) {
                dispatch(setOrderId(e.data.order.id));
                axiosInstance
                  .get('https://vlv.am/arca/paymant/5', {
                    params: {
                      id: e.data.order.order_number,
                      total: totalPrice,
                    },
                  })
                  .then(err => {
                    if (err.data.fail) {
                      dispatch(setPending(false));
                      Toast.show({
                        type: 'error',
                        text1: t('error_message'),
                      });
                    } else {
                      dispatch(setPending(false));
                      dispatch(setSubmitFormTag(err.data.form));
                    }
                  });
              } else if (activePaymentType === 19) {
                dispatch(setOrderId(e.data.order.id));
                axiosInstance
                  .get('https://vlv.am/ineco/index10', {
                    params: {
                      id: e.data.order.order_number,
                      total: totalPrice,
                    },
                  })
                  .then(err => {
                    if (err.data.fail) {
                      dispatch(setPending(false));
                      Toast.show({
                        type: 'error',
                        text1: t('error_message'),
                      });
                    } else {
                      dispatch(setPending(false));
                      dispatch(setSubmitFormTag(e.data?.form));
                    }
                  });
              } else {
                Alert.alert('aparik');
                dispatch(setPending(false));
                navigation.navigate('AgreementInfo', {
                  text: e.data.cred_info.credit_info_text,
                  icon: e.data.cred_info.icon_en,
                  order_id: e.data.order?.id,
                  order_number: e.data.order.order_number,
                  activePaymentType: activePaymentType,
                  name: name,
                });
              }
            } else {
              dispatch(setPending(false));
              Toast.show({
                type: 'error',
                text1: 'checkout8 ' + t('error_message'),
              });
            }
          },
          () => {
            dispatch(setPending(false));
          },
        ),
      );
    }
  };

  const totalDiscountedAmount = useMemo(() => {
    return cartProducts.reduce((totalDiscount, product) => {
      const qty = product?.qty || 1;
      const basePrice = product?.seller_product?.skus?.[0]?.selling_price || 0;
      const promoPrice = product?.seller_product?.promo_price || basePrice;

      const {finalPrice} = calculatePrice({
        product_id: product?.seller_product?.product_id,
        category_id: product?.seller_product?.categories?.[0]?.id,
        brand_id: product?.seller_product?.product?.brand?.id,
        price: promoPrice,
        promoPrice,
      });

      const discountPerProduct = (basePrice - finalPrice) * qty;

      return (
        totalDiscount + (!isNaN(discountPerProduct) ? discountPerProduct : 0)
      );
    }, 0);
  }, [cartProducts, calculatePrice]);

  const totalBonus = useMemo(() => {
    return cartProducts.reduce((totalDiscount, product) => {
      const qty = product?.qty || 1;
      const basePrice = product?.seller_product?.skus?.[0]?.selling_price || 0;
      const promoPrice = product?.seller_product?.promo_price || basePrice;

      const {appliedDiscount} = calculatePrice({
        product_id: product?.seller_product?.product_id,
        category_id: product?.seller_product?.categories?.[0]?.id,
        brand_id: product?.seller_product?.product?.brand?.id,
        price: promoPrice,
        promoPrice,
      });

      const discountPerProduct = appliedDiscount * qty;

      return (
        totalDiscount + (!isNaN(discountPerProduct) ? discountPerProduct : 0)
      );
    }, 0);
  }, [cartProducts, calculatePrice]);

  const finalTotalPrice = useMemo(() => {
    const baseTotalPrice = cartProducts.reduce((sum, product) => {
      const qty = product?.qty || 1;
      const basePrice = product?.seller_product?.skus?.[0]?.selling_price || 0;
      const promoPrice = product?.seller_product?.promo_price || basePrice;

      const {appliedDiscount} = calculatePrice({
        product_id: product?.seller_product?.product_id,
        category_id: product?.seller_product?.categories?.[0]?.id,
        brand_id: product?.seller_product?.product?.brand?.id,
        price: promoPrice,
        promoPrice,
      });

      return sum + (basePrice - appliedDiscount) * qty;
    }, 0);

    const validDiscountAmount = !isNaN(totalDiscountedAmount)
      ? totalDiscountedAmount
      : 0;

    return Math.max(0, baseTotalPrice - validDiscountAmount);
  }, [calculatePrice, cartProducts, totalDiscountedAmount]);

  return (
    <>
      <KeyboardAvoidingView
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
        }}
        {...(Platform.OS === 'ios'
          ? {
              behavior: 'padding',
              // behavior: 'height',
              // keyboardVerticalOffset: 100,
              enabled: true,
            }
          : {})}>
        <ScrollView style={{paddingTop: insets.top}}>
          <Header title={t('cart')} />
          <View style={styles.wrapper}>
            <Text allowFontScaling={false} style={styles.title}>
              {t('order_confirmation')}
            </Text>
            <Text allowFontScaling={false} style={styles.subTitle}>
              {t('personal_info')}
            </Text>
            <Input
              value={name}
              onChange={setName}
              autoComplete="name"
              style={styles.input}
              placeholder={t('first_name') + ' *'}
            />
            <Input
              value={lastName}
              onChange={setLastName}
              style={styles.input}
              placeholder={t('last_name') + ' *'}
            />

            <Input
              value={email}
              onChange={setEmail}
              style={styles.input}
              autoComplete="email"
              placeholder={t('mail') + ' *'}
            />
            <Input
              value={phone}
              onChange={setPhone}
              style={styles.input}
              autoComplete="tel"
              placeholder={t('phone_number') + ' *'}
            />
            {!!userInfo?.userInfo?.addresses?.length && (
              <View>
                {userInfo?.userInfo?.addresses.map((item, index) => (
                  <Pressable
                    key={index}
                    onPress={() => {
                      setChoosedAdress(item.address);
                    }}
                    style={[
                      styles.userAddress,
                      choosedAdress == item.address && styles.activeUserAdress,
                    ]}>
                    <View style={styles.ratioBtn}>
                      {choosedAdress == item.address && (
                        <View style={styles.ratioBtnChecked} />
                      )}
                    </View>
                    <Text
                      style={[
                        styles.userAddressText,
                        choosedAdress == item.address &&
                          styles.userAddressTextActive,
                      ]}>
                      {item?.address}
                    </Text>
                  </Pressable>
                ))}

                <View style={styles.checkBoxBlock}>
                  <Text allowFontScaling={false} style={styles.checkBoxText}>
                    {t('delivery_to_my_address')}
                  </Text>
                  <Pressable
                    style={styles.checkBox}
                    onPress={() => {
                      setDeliveryToMyAddress(!deliveryToMyAddress);
                    }}>
                    {!!deliveryToMyAddress && <CheckSvg />}
                  </Pressable>
                </View>
              </View>
            )}

            {!deliveryToMyAddress && (
              <>
                <Row style={{marginBottom: RH(10), marginTop: RH(30)}}>
                  <Text
                    allowFontScaling={false}
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{textTransform: 'uppercase'}}>
                    {t('Delivery in Yerevan')}
                  </Text>
                  <ToggleSwitch
                    value={!deliveryToRegions}
                    setValue={() => setDeliveryToRegions(!deliveryToRegions)}
                  />
                </Row>
                <Row>
                  <Text
                    allowFontScaling={false}
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{textTransform: 'uppercase'}}>
                    {t('Delivery Regions')}
                  </Text>
                  <ToggleSwitch
                    value={deliveryToRegions}
                    setValue={() => setDeliveryToRegions(!deliveryToRegions)}
                  />
                </Row>
                <Text allowFontScaling={false} style={styles.text1}>
                  {t('Fill in the data')}
                </Text>
                {!deliveryToRegions ? (
                  <View>
                    <GooglePlacesAutocomplete
                      key={autocompleteKey}
                      textInputProps={{
                        value: address,
                        onChange: setAddress,
                      }}
                      placeholder={t('City, region, community, address...')}
                      fetchDetails={true}
                      onPress={(data, details = null) => {
                        const location = details.geometry.location;
                        setActiveAddress({
                          latitude: location.lat,
                          longitude: location.lng,
                        });
                        setAddress(details.formatted_address);
                      }}
                      query={{
                        key: GOOGLE_MAP_API_KEY,
                        language: 'en',
                      }}
                      styles={{
                        textInputContainer: {
                          alignSelf: 'center',
                          // marginBottom: RH(18),
                          width: '100%',
                          height: RH(50),
                          justifyContent: 'center',
                          marginBottom: 10,
                        },
                        textInput: {
                          width: '100%',
                          height: '100%',
                          backgroundColor: 'rgb(247, 246, 249)',
                          borderRadius: RH(10),
                          paddingHorizontal: RW(15),
                          ...font('regular', 14),
                          alignSelf: 'center',
                        },
                        listView: {
                          backgroundColor: 'white',
                          shadowColor: 'rgb(247, 246, 249)',
                          shadowRadius: 5,
                          shadowOffset: {height: 2, width: 2},
                          shadowOpacity: 0.5,
                          elevation: 5,
                          borderLeftColor: 'rgb(247, 246, 249)',
                          borderRightColor: 'rgb(247, 246, 249)',
                          borderLeftWidth: 2,
                          borderRightWidth: 2,
                        },
                      }}
                    />
                    <Button
                      text={t('select_your_current_location')}
                      style={{marginBottom: RH(10)}}
                      onPress={() => {
                        setActiveAddress({
                          latitude: currentLocation.latitude,
                          longitude: currentLocation.longitude,
                        });
                        reverseGeocode(currentLocation);
                      }}
                    />
                    <MapView
                      ref={mapRef}
                      provider={PROVIDER_GOOGLE}
                      googleMapId={GOOGLE_MAP_API_KEY}
                      style={styles.map}
                      showsMyLocationButton
                      showsUserLocation
                      zoomControlEnabled
                      zoomEnabled
                      zoomTapEnabled
                      onPress={handleMapPress}
                      region={{
                        ...activeAddress,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                      }}>
                      {!!activeAddress && (
                        <Marker
                          draggable
                          coordinate={activeAddress}
                          onDragEnd={handleMarkerDragEnd}>
                          <MapMarkerSvg />
                        </Marker>
                      )}
                    </MapView>
                  </View>
                ) : (
                  <Input
                    value={address}
                    onChange={setAddress}
                    style={styles.address}
                    placeholder={t('City, region, community, address...')}
                  />
                )}
              </>
            )}

            <Input
              value={address2}
              onChange={setAddress2}
              placeholder={t('flat_room')}
            />
          </View>
          {!credit && (
            <View
              style={[
                styles.wrapper,
                {
                  backgroundColor: Colors.bgGray,
                  marginVertical: RH(30),
                  paddingVertical: RH(20),
                },
              ]}>
              <Text allowFontScaling={false} style={styles.payTypeTitle}>
                {t('type_pay')}
              </Text>

              <View style={styles.paymenTypes}>
                {paymentItems.map((item, index) => {
                  if (+totalPrice < 26000 && item.id === 100) {
                    return null;
                  }

                  return (
                    <PaymentType
                      selected={activePaymentType === item.id}
                      onSelect={() => {
                        if (item.id === 100) {
                          setCredit(true);
                        } else {
                          setActivePaymentType(item.id);
                        }
                      }}
                      key={index}
                      data={item}
                    />
                  );
                })}
              </View>
            </View>
          )}
          {!!credit && (
            <View
              style={[
                styles.wrapper,
                {
                  backgroundColor: Colors.bgGray,
                  marginVertical: RH(30),
                  paddingVertical: RH(20),
                },
              ]}>
              <View style={styles.paymentTypeHead}>
                <Pressable
                  style={styles.backArrowBtn}
                  onPress={() => {
                    setActivePaymentType(null);
                    setCredit(false);
                  }}>
                  <LongBackArrowSvg />
                </Pressable>
                <Text
                  allowFontScaling={false}
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={[styles.payTypeTitle, {marginBottom: 0}]}>
                  {t('Installment payment')}
                </Text>
              </View>

              <View style={styles.paymenTypes}>
                {creditItems.map((item, index) => {
                  if (totalPrice < 26000 && item.name === 'acba') {
                    return null;
                  }
                  if (
                    totalPrice < 30000 &&
                    (item.name === 'Vtb' || item.name === 'ineco')
                    // item.name === 'Uni' ||
                  ) {
                    return null;
                  }
                  if (totalPrice < 200000 && item.name === 'evoca') {
                    return null;
                  }

                  return (
                    <PaymentType
                      selected={activePaymentType === item.name}
                      onSelect={() => setActivePaymentType(item.name)}
                      key={index}
                      data={item}
                    />
                  );
                })}
              </View>
            </View>
          )}

          <View style={styles.wrapper}>
            <TextInput
              allowFontScaling={false}
              placeholder={t('comment_order')}
              placeholderTextColor={Colors.gray}
              style={styles.descriptionInput}
              multiline
              value={note}
              onChangeText={setNote}
            />
          </View>
          <View style={styles.textMain}>
            <View style={styles.wrapper}>
              <Row style={styles.textRow}>
                <Text
                  allowFontScaling={false}
                  style={[styles.text, styles.grayText]}>
                  {t('Product')}(
                  {cartProducts?.reduce((count, product) => {
                    return count + product?.qty;
                  }, 0)}
                  )
                </Text>
                <Text allowFontScaling={false} style={[styles.boldText]}>
                  {UseCalcPrice(
                    totalPrice + discountTotalPrice,
                    currentCurrency,
                  )}
                </Text>
              </Row>
              <Row style={styles.textRow}>
                <Text
                  allowFontScaling={false}
                  style={[styles.text, styles.grayText]}>
                  {t('delivery')}
                </Text>
                <Text allowFontScaling={false} style={[styles.boldText]}>
                  0 ֏
                </Text>
              </Row>
              <Text allowFontScaling={false} style={[styles.shipingText]}>
                {t('shiping_state')}
              </Text>
            </View>
            <DashedLine
              dashLength={4}
              dashThickness={1}
              dashColor="rgba(0, 0, 0, 0.25)"
              style={styles.dashLine}
            />
            <View style={styles.wrapper}>
              {totalDiscountedAmount > 0 && (
                <Row style={styles.textRow}>
                  <Text
                    allowFontScaling={false}
                    style={[styles.text, styles.redText]}>
                    {t('discount')}
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={[styles.boldText, styles.redText]}>
                    -{UseCalcPrice(totalDiscountedAmount, currentCurrency)}
                  </Text>
                </Row>
              )}
              {totalBonus > 0 && (
                <Row style={styles.textRow}>
                  <Text
                    allowFontScaling={false}
                    style={[styles.text, styles.redText]}>
                    {t('Bonus')}
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={[styles.boldText, styles.redText]}>
                    -{UseCalcPrice(totalBonus, currentCurrency)}
                  </Text>
                </Row>
              )}
              <Row style={styles.textRow}>
                <Text allowFontScaling={false} style={[styles.boldText]}>
                  {t('total')}
                </Text>
                <Text allowFontScaling={false} style={[styles.boldText]}>
                  {UseCalcPrice(finalTotalPrice, currentCurrency)}
                </Text>
              </Row>
              <Text allowFontScaling={false} style={styles.promoCodeTitle}>
                {t('Do you have a promo code?')}
              </Text>
              <View style={styles.promoCodeContainer}>
                <TextInput
                  allowFontScaling={false}
                  value={promoCode}
                  onChangeText={e => dispatch(setPromoCode(e))}
                  style={styles.promoCodeInput}
                  placeholder={t('Promo code')}
                />
                <Pressable
                  onPress={() => {
                    if (promoCode) {
                      const products = cartProducts.map(product => {
                        return {
                          product_id: product.seller_product.product_id,
                          category_id: product.seller_product.categories[0].id,
                          brand_id: product.seller_product.product.brand.id,
                        };
                      });
                      dispatch(checkPromoCode(promoCode, products));
                    } else {
                      Toast.show({
                        type: 'error',
                        text1: t('coupon_field_is_required'),
                      });
                    }
                  }}
                  style={({pressed}) => [
                    styles.promoCodeBtn,
                    {backgroundColor: pressed ? Colors.darkRed : Colors.red},
                  ]}>
                  <Text
                    allowFontScaling={false}
                    style={styles.promoCodeBtnText}>
                    {t('activate')}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {!!cartProducts?.length && (
        <View style={styles.nextBtn}>
          <Button text={t('confirm')} onPress={orderFunc} />
        </View>
      )}
      <CustomModal
        visible={showThanksModal}
        dismiss={() => {
          dispatch(setShowThanksModal(false));
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'Home',
              },
            ],
          });
        }}>
        <ThanksModal
          dismiss={() => {
            dispatch(setShowThanksModal(false));
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'Home',
                },
              ],
            });
          }}
        />
      </CustomModal>
      <CustomModal
        visible={showThanksModalCash}
        dismiss={() => {
          dispatch(setShowThanksModalCash(false));
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'Home',
              },
            ],
          });
        }}>
        <ThanksModalCash
          data={paymentSuccessData}
          dismiss={() => {
            dispatch(setShowThanksModalCash(false));
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'Home',
                },
              ],
            });
          }}
        />
      </CustomModal>
    </>
  );
};

export default CartOrder;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: RW(16),
  },
  title: {
    ...font('medium', 22),
    marginTop: RH(30),
  },
  subTitle: {
    ...font('medium', 18),
    marginTop: RH(45),
    marginBottom: RH(20),
  },
  input: {
    marginBottom: RH(17),
  },
  text1: {
    ...font('regular', 8),
    marginTop: RH(28),
    marginBottom: RH(18),
  },
  mapInput: {
    paddingHorizontal: RW(16),
    alignSelf: 'center',
    marginBottom: RH(18),
  },
  map: {
    height: RH(300),
    width: '100%',
    marginBottom: RH(20),
  },
  address: {
    marginBottom: RH(15),
  },
  payTypeTitle: {
    ...font('medium', 18),
    marginBottom: RH(20),
  },
  payTypeDescription: {
    ...font('regular', 12, 'rgba(40, 40, 40, 0.6)'),
  },
  paymenTypes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: RW(3),
    marginTop: RH(10),
  },
  descriptionInput: {
    width: '100%',
    height: RH(107),
    backgroundColor: Colors.bgGray,
    borderRadius: RW(10),
    paddingHorizontal: RW(12),
    paddingTop: RH(18),
    borderWidth: RW(1),
    borderColor: 'rgba(40, 40, 40, 0.1)',
  },
  textMain: {
    backgroundColor: '#F7F6F9',
    paddingTop: RH(48),
    // paddingBottom: RH(39),
    paddingBottom: RH(180),

    marginTop: RH(50),
  },
  boldText: font('bold', 16),
  text: font('regular', 16),
  redText: {
    color: Colors.red,
  },
  grayText: {
    color: 'rgba(40, 40, 40, 0.6)',
  },
  shipingText: {
    ...font('regular', 10, Colors.red),
    maxWidth: RW(270),
  },
  dashLine: {
    marginTop: RH(20),
    marginBottom: RH(10),
  },
  textRow: {
    marginBottom: RH(20),
  },
  nextBtn: {
    zIndex: 2,
    width: '100%',
    bottom: RH(80),
    position: 'absolute',
  },
  userAddress: {
    backgroundColor: Colors.bgGray,
    paddingHorizontal: RW(22),
    height: RH(52),
    borderRadius: RW(5),
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: RW(10),
    marginBottom: RH(10),
  },
  activeUserAdress: {
    backgroundColor: Colors.red,
    paddingHorizontal: RW(22),
    height: RH(52),
    borderRadius: RW(5),
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: RW(10),
    marginBottom: RH(10),
  },
  ratioBtn: {
    width: RW(15),
    height: RW(15),
    borderRadius: RW(8),
    borderColor: '#fff',
    borderWidth: RW(2.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratioBtnChecked: {
    width: RW(5),
    height: RW(5),
    borderRadius: RW(2.5),
    backgroundColor: '#fff',
  },
  userAddressText: {
    ...font('regular', 14, '#000'),
  },
  userAddressTextActive: {
    ...font('regular', 14, '#fff'),
  },
  checkBoxBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    columnGap: RW(8),
    marginVertical: RH(20),
  },
  checkBoxText: font('regular', 14),
  checkBox: {
    width: RW(15),
    height: RW(15),
    borderWidth: RW(1),
    borderColor: Colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: RW(2),
  },
  paymentTypeHead: {
    flexDirection: 'row',
    columnGap: RW(10),
    alignItems: 'center',
    marginBottom: RH(20),
  },
  backArrowBtn: {
    backgroundColor: '#eaeff5',
    paddingVertical: RH(10),
    paddingHorizontal: RW(15),
  },
  promoCodeTitle: {
    ...font('regular', 14, 'rgba(0, 0, 0, 0.6)'),
  },
  promoCodeContainer: {
    flexDirection: 'row',
    position: 'relative',
    width: '100%',
    height: RH(37),
    borderWidth: RW(1),
    borderColor: 'rgba(40, 40, 40, 0.4)',
    borderRadius: RW(20),
    marginTop: RH(20),
  },
  promoCodeInput: {
    width: '100%',
    paddingHorizontal: RW(15),
    ...font('regular', 10, 'rgba(0, 0, 0, 0.6)'),
  },
  promoCodeBtn: {
    position: 'absolute',
    right: 0,
    paddingHorizontal: RW(17),
    backgroundColor: Colors.red,
    height: '100%',
    justifyContent: 'center',
    borderRadius: RW(20),
  },
  promoCodeBtnText: {
    ...font('regular', 10, '#fff'),
  },
});

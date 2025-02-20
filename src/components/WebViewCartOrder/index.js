import {Pressable, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  checkAttachBankCard,
  checkOrderStatus,
  setAttachBankCardRedirectUrl,
} from '@store/CartSlice';
import Toast from 'react-native-toast-message';
import {setSubmitFormTag} from '@store/SearchPageSlice';
import {RH, RW} from '@theme/utils';
import BackArrowSvg from '@assets/SVG/BackArrowSvg';
import WebView from 'react-native-webview';
import {t} from 'i18next';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const WebViewCartOrder = () => {
  const {submitFormTag, orderId} = useSelector(({searchSlice}) => searchSlice);
  const attachBankCardRedirectUrl = useSelector(
    ({cart}) => cart.attachBankCardRedirectUrl,
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onNavigationStateChange = async navState => {
    const {url} = navState;
    if (url === 'https://vlv.am/cart') {
      dispatch(
        checkOrderStatus(orderId, e => {
          if (e.data.message == 'failed paid') {
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
          } else {
            //
            Toast.show({
              type: 'success',
              text1: t('transaction_successfully'),
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
        }),
      );
      dispatch(setSubmitFormTag(null));
    } else if (url?.startsWith('https://vlv.am/mobile-make-binding-result')) {
      dispatch(checkAttachBankCard(attachBankCardRedirectUrl.orderId));
    }
  };
  const insets = useSafeAreaInsets();

  if (!submitFormTag && !attachBankCardRedirectUrl) return null;
  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        flex: 1,
        paddingTop: insets.top,
        backgroundColor: '#fff',
        zIndex: 99999,
      }}>
      <Pressable
        style={{marginLeft: RW(16), marginBottom: RH(10)}}
        onPress={async () => {
          if (submitFormTag) {
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'Home',
                },
              ],
            });
            dispatch(
              checkOrderStatus(orderId, e => {
                if (e.data.message == 'failed paid' || e.data.error) {
                  navigation.reset({
                    index: 0,
                    routes: [
                      {
                        name: 'Home',
                      },
                    ],
                  });
                  Toast.show({
                    type: 'error',
                    text1: t('error_message'),
                  });
                } else {
                  navigation.reset({
                    index: 0,
                    routes: [
                      {
                        name: 'Home',
                      },
                    ],
                  });
                  Toast.show({
                    type: 'success',
                    text1: t('transaction_successfully'),
                  });
                }
              }),
            );
            dispatch(setSubmitFormTag(null));
          } else {
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'Home',
                },
              ],
            });
            Toast.show({
              type: 'error',
              text1: t('error_message'),
            });
            dispatch(setAttachBankCardRedirectUrl(null));
          }
        }}>
        <BackArrowSvg />
      </Pressable>
      <WebView
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          zIndex: 99999,
        }}
        startInLoadingState
        autoManageStatusBarEnabled={false}
        source={
          attachBankCardRedirectUrl?.form_url
            ? {uri: attachBankCardRedirectUrl.form_url}
            : {
                html:
                  (attachBankCardRedirectUrl?.acsUrl
                    ? `<form style="display: none" action="${attachBankCardRedirectUrl.acsUrl}" method="POST">
                      <input type="hidden" id="cReq" name="creq" value="${attachBankCardRedirectUrl.cReq}">
                      <input type="submit" value="Submit">
                    </form>`
                    : submitFormTag) +
                  `<script>setTimeout(() => {
                    const formTag = document.querySelector("form")
                    formTag.submit()
                }, 100)</script>`,
              }
        }
        onError={err => console.warn('WebView error: ', err)}
        onNavigationStateChange={onNavigationStateChange}
      />
    </View>
  );
};

export default WebViewCartOrder;

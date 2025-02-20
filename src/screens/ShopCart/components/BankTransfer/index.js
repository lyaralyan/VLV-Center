import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Header from '@components/InnerHeader';
import {RH, RW, font} from '@theme/utils';
import Colors from '@theme/colors';
import Input from '@components/Input/Input';
import {useDispatch} from 'react-redux';
import {setPending} from '@store/MainSlice';
import {postCreditModal} from '@store/CartSlice';
import ThanksModal from '../CartOrder/components/ThanksModal';
import {useNavigation} from '@react-navigation/native';
import CustomModal from '@components/Modal';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const BankTransfer = props => {
  const sendData = props?.route?.params;

  const [hvhh, setHvhh] = useState('');
  const [corporateName, setCorporateName] = useState('');
  const [legalAddress, setLegalAddress] = useState('');
  const [thanksModal, setThanksModal] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const hundleSubmit = () => {
    dispatch(setPending(true));
    let data = {...sendData};
    data.hvhh = hvhh;
    data.corporate_name = corporateName;
    data.legal_address = legalAddress;
    dispatch(
      postCreditModal(data, () => {
        dispatch(setPending(false));
        setThanksModal(true);
      }),
    );
  };

  const {t} = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <>
      <ScrollView
        style={{paddingTop: insets.top}}
        contentContainerStyle={{paddingBottom: RH(140)}}>
        <Header title={t('cart')} />
        <View style={styles.wrapper}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.textBlock}>
            <Text allowFontScaling={false} style={styles.text}>
              {t('PAY_ON_THE_SPOT_BY_CASH_OR_Bank_Card_Policy')}
            </Text>
          </ScrollView>
          <Text allowFontScaling={false} style={styles.title}>
            {t('receipt_info')}
          </Text>
          <Input
            placeholder={t('hvhh') + '*'}
            value={hvhh}
            maxLength={8}
            onChange={e => setHvhh(e)}
          />
          <Input
            placeholder={t('corporate_name') + '*'}
            value={corporateName}
            onChange={e => setCorporateName(e)}
          />
          <Input
            placeholder={t('legal_address') + '*'}
            value={legalAddress}
            onChange={e => setLegalAddress(e)}
          />
          <Pressable
            style={[
              styles.sendBtn,
              !(hvhh && corporateName && legalAddress) && styles.disableBtn,
            ]}
            onPress={hundleSubmit}>
            <Text allowFontScaling={false} style={styles.sendBtnText}>
              {t('send')}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
      <CustomModal
        visible={thanksModal}
        dismiss={() => {
          setThanksModal(false);
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
            setThanksModal(false);
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

export default BankTransfer;

const styles = StyleSheet.create({
  wrapper: {
    margin: RW(16),
    padding: RW(15),
    rowGap: RH(20),
  },
  textBlock: {
    height: RH(310),
  },
  text: font('regular', 14, 'rgba(40,40,40,.7)', 18),
  title: {
    ...font('bold', 18),
    textTransform: 'uppercase',
    textAlign: 'center',
  },

  sendBtn: {
    backgroundColor: Colors.red,
    alignItems: 'center',
    paddingVertical: RH(20),
    borderRadius: RW(10),
  },
  sendBtnText: font('regular', 16, '#fff'),
  disableBtn: {
    opacity: 0.6,
  },
});

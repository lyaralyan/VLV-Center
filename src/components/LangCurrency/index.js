import {
  ActionSheetIOS,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {Fragment, useRef, useState} from 'react';
import {currencyData, languageFlags, languagesData} from './data';
import {useDispatch, useSelector} from 'react-redux';
import {
  getConvertRate,
  setCurrentCurrency,
  setCurrentLanguage,
} from '@store/MainSlice';
import i18n from '@translations/i18n';
import {RH, RW, font} from '@theme/utils';
import Row from '@theme/wrappers/row';
import Colors from '@theme/colors';
import ArrowTopSvg from '@screens/Search/assets/ArrowTopSvg';
import {useTranslation} from 'react-i18next';
import ActionSheet from 'react-native-actions-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LangCurrency = () => {
  const [lang, setLang] = useState(true);
  const {currentLanguage, currentCurrency} = useSelector(({main}) => main);
  const dispatch = useDispatch();
  const actionSheetRef = useRef();
  const {t} = useTranslation();

  const chooseLanguageFunc = () => {
    if (Platform.OS == 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [
            t('Cancel'),
            ...languagesData.map(({label}) => {
              return label;
            }),
          ],
          destructiveButtonIndex: 4,
          cancelButtonIndex: 0,
          userInterfaceStyle: 'white',
        },
        async buttonIndex => {
          if (buttonIndex === 0) {
            // cancel action
          } else {
            await i18n.changeLanguage(languagesData[buttonIndex - 1].value);
            await AsyncStorage.setItem(
              'language',
              languagesData[buttonIndex - 1].value,
            );
            await dispatch(
              setCurrentLanguage(languagesData[buttonIndex - 1].value),
            );
          }
        },
      );
    } else {
      setLang(true);
      actionSheetRef.current.show();
    }
  };
  const chooseCurrencyFunc = () => {
    if (Platform.OS == 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [
            t('Cancel'),
            ...currencyData.map(({label}) => {
              return label;
            }),
          ],
          destructiveButtonIndex: 4,
          cancelButtonIndex: 0,
          userInterfaceStyle: 'white',
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            // cancel action
          } else {
            if (!currencyData[buttonIndex - 1]?.convert_rate)
              dispatch(getConvertRate(currencyData[buttonIndex - 1].id));
            dispatch(setCurrentCurrency(currencyData[buttonIndex - 1]));
          }
        },
      );
    } else {
      setLang(false);
      actionSheetRef.current.show({
        type: 'currency',
      });
    }
  };
  return (
    <View
      style={{
        alignItems: 'center',
        // zIndex: 2,
        flexDirection: 'row',
        columnGap: RW(10),
        width: '100%',
        justifyContent: 'center',
      }}>
      <Pressable onPress={chooseLanguageFunc}>
        <Row style={styles.container}>
          {languageFlags[currentLanguage]}
          <Text allowFontScaling={false} style={styles.currentCurrencyText}>
            {' '}
            /{' '}
            {languagesData
              .find(({value}) => currentLanguage == value)
              ?.label.slice(0, 3)}
          </Text>
          <View style={{transform: 'rotate(180deg)'}}>
            <ArrowTopSvg strokeWidth={1} />
          </View>
        </Row>
      </Pressable>
      <Pressable onPress={chooseCurrencyFunc}>
        <Row style={styles.container}>
          <Text allowFontScaling={false} style={styles.currentCurrencyText}>
            {currentCurrency?.label}
          </Text>
          <View style={{transform: 'rotate(180deg)'}}>
            <ArrowTopSvg strokeWidth={1} />
          </View>
        </Row>
      </Pressable>
      <ActionSheet ref={actionSheetRef}>
        {lang
          ? languagesData.map(({label, value}, index) => {
              return (
                <Fragment key={index}>
                  <Pressable
                    style={styles.sheetBtn}
                    onPress={async () => {
                      await i18n.changeLanguage(value);
                      await dispatch(setCurrentLanguage(value));
                      await AsyncStorage.setItem('language', value);
                      await actionSheetRef.current.hide();
                    }}>
                    <Text allowFontScaling={false} style={styles.sheetBtnText}>
                      {label}
                    </Text>
                  </Pressable>
                  <View style={styles.line} />
                </Fragment>
              );
            })
          : currencyData.map((item, index) => {
              return (
                <Fragment key={index}>
                  <Pressable
                    style={styles.sheetBtn}
                    onPress={() => {
                      if (!item?.convert_rate)
                        dispatch(getConvertRate(item.id));
                      dispatch(setCurrentCurrency(item));
                      actionSheetRef.current.hide();
                    }}>
                    <Text allowFontScaling={false} style={styles.sheetBtnText}>
                      {item?.label}
                    </Text>
                  </Pressable>
                  <View style={styles.line} />
                </Fragment>
              );
            })}
        <Pressable
          style={styles.sheetBtn}
          onPress={() => {
            actionSheetRef.current.hide();
          }}>
          <Text allowFontScaling={false} style={styles.chanelSheetBtnText}>
            {t('Cancel')}
          </Text>
        </Pressable>
        <View style={{height: RH(10)}} />
      </ActionSheet>
    </View>
  );
};

export default LangCurrency;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: RW(10),
    backgroundColor: Colors.bgGray,
    alignSelf: 'center',
    paddingHorizontal: RW(10),
    paddingVertical: RH(5),
    borderRadius: RW(5),
    marginBottom: RH(20),
  },
  currentCurrencyText: {
    ...font('regular', 14),
  },
  modal: {
    top: RH(30),
    // width: RW(200),
    columnGap: RW(10),
    borderRadius: RW(10),
    backgroundColor: '#fff',
    position: 'absolute',
    shadowColor: 'rgba(0,0,0,0.15)',
    shadowOffset: {
      width: 0,
      height: RH(5),
    },
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 14,
    rowGap: RW(10),
    padding: RW(10),
    flexDirection: 'row',
  },
  modalTitle: font('regular', 14),
  sheetBtn: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: RH(20),
  },
  sheetBtnText: font('medium', 16),
  chanelSheetBtnText: font('medium', 16, Colors.red),
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(40, 40, 40, 0.2)',
  },
});

import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import React, {createRef, useState} from 'react';
import {font, RH, RW} from '@theme/utils';
import QrScanSvg from './assets/QrScanSvg';
import SearchSvg from './assets/SearchSvg';
import Colors from '../../../../theme/colors';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setShowCamera} from '@store/MainSlice';
import {searchWithKeyword} from '@store/SearchPageSlice';
import {useTranslation} from 'react-i18next';

export const searchRef = createRef();

const SearchInput = ({containerStyle = {}}) => {
  const [value, setValue] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const onSubmit = () => {
    if (value.length) {
      dispatch(searchWithKeyword(value, navigation));
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.main, containerStyle]}>
        <Pressable
          onPress={() => dispatch(setShowCamera(true))}
          style={styles.qrScanBtn}>
          <QrScanSvg />
        </Pressable>
        <TextInput
          allowFontScaling={false}
          ref={searchRef}
          style={styles.input}
          placeholderTextColor={'rgba(40, 40, 40, 0.40)'}
          placeholder={t('search_your_item')}
          value={value}
          onChangeText={setValue}
          onSubmitEditing={onSubmit}
        />
        <Pressable
          onPress={onSubmit}
          style={({pressed}) => [
            styles.searchBtn,
            {backgroundColor: pressed ? Colors.darkRed : Colors.red},
          ]}>
          <SearchSvg />
        </Pressable>
      </View>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: RH(15),
  },
  main: {
    width: RW(360),
    height: RH(45),
    borderColor: 'rgba(40, 40, 40, 0.20)',
    borderWidth: RW(1),
    borderRadius: RW(8),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    maxWidth: RW(250),
    ...font('regular', 12, 'rgba(40, 40, 40, 0.60)'),
  },
  qrScanBtn: {
    position: 'absolute',
    left: RW(6),
    alignSelf: 'center',
  },
  searchBtn: {
    position: 'absolute',
    right: RW(6),
    alignSelf: 'center',
    width: RW(42),
    height: RH(32),
    borderRadius: RW(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

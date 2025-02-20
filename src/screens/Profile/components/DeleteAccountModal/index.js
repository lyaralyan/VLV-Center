import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import Button from '@components/Button/Button';
import Row from '@theme/wrappers/row';
import {RH, RW, font} from '@theme/utils';
import {useDispatch} from 'react-redux';
import {deleteAccount} from '@store/UserSlice';
import {useNavigation} from '@react-navigation/native';

const DeleteAccountModal = ({dismiss}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <View style={styles.main}>
      <Text allowFontScaling={false} style={styles.text}>
        {t('Are you sure to delete ?')}
      </Text>
      <Row style={styles.btnsRow}>
        <Button
          onPress={dismiss}
          style={styles.btn}
          red={false}
          text={t('Cancel')}
        />
        <Button
          onPress={() => {
            dispatch(deleteAccount(navigation, dismiss));
          }}
          style={styles.btn}
          text={t('delete_profile')}
        />
      </Row>
    </View>
  );
};

export default DeleteAccountModal;

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    width: RW(370),
    paddingHorizontal: RW(30),
    paddingVertical: RH(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RW(10),
    rowGap: RW(30),
  },
  text: {
    ...font('regular', 18),
  },
  btnsRow: {
    columnGap: RW(10),
  },
  btn: {
    width: 'auto',
    minWidth: RW(160),
  },
});

import {Linking, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import Row from '@theme/wrappers/row';
import {RW} from '@theme/utils';
import LogoSvg from '@assets/SVG/LogoSvg';
import MenuSvg from './assets/MenuSvg';
import PhoneSvg from './assets/PhoneSvg';
import {setOpenMenu} from '@/store/MainSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import LogoEnSvg from '@assets/SVG/LogoEnSvg';

const Header = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentLanguage = useSelector(({main}) => main.currentLanguage);

  return (
    <>
      <Row style={styles.container}>
        <Pressable
          onPress={() => {
            dispatch(setOpenMenu(true));
          }}>
          <MenuSvg />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Home')}>
          {currentLanguage == 'hy' ? (
            <LogoSvg width={120} height={40} />
          ) : (
            <LogoEnSvg width={120} height={40} />
          )}
        </Pressable>
        <Pressable onPress={() => Linking.openURL('tel:+37410349944')}>
          <PhoneSvg />
        </Pressable>
      </Row>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: RW(15),
  },
});

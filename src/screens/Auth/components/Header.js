import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import Row from '@theme/wrappers/row';
import BackArrowSvg from '@assets/SVG/BackArrowSvg';
import HelpSvg from '@assets/SVG/HelpSvg';
import {RH, RW, font} from '@theme/utils';
import Colors from '../../../theme/colors';
import {useNavigation} from '@react-navigation/native';

const Header = ({style}) => {
  const navigation = useNavigation();
  return (
    <Row style={[styles.container, style]}>
      <Pressable
        style={{paddingHorizontal: RW(10), paddingVertical: RH(5)}}
        onPress={() => navigation.goBack()}>
        <BackArrowSvg />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Help')}>
        <HelpSvg />
      </Pressable>
    </Row>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'space-between',
  },
  title: {
    ...font('regular', 16, Colors.black),
  },
});

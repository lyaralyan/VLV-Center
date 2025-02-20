import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';
import {RH, RW, font} from '@theme/utils';
import Colors from '@theme/colors';
import LinearGradient from 'react-native-linear-gradient';
import PlusSvg from '../assets/PlusSvg';
import AttachCartIcons from '../assets/AttachCartIcons';

const AddCard = () => {
  return (
    <Pressable style={styles.container}>
      <LinearGradient
        colors={['#E31335', '#610010']}
        style={styles.linearGradient}>
        <Text allowFontScaling={false} style={styles.text1}>
          կցել / Ավելացնել
        </Text>
        <Text allowFontScaling={false} style={styles.text2}>
          բանկային քարտ
        </Text>
        <PlusSvg />
        <AttachCartIcons />
      </LinearGradient>
    </Pressable>
  );
};

export default AddCard;

const styles = StyleSheet.create({
  container: {
    width: RW(115),
    height: RH(60),
    borderRadius: RW(5),
    overflow: 'hidden',
  },
  linearGradient: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    paddingVertical: RH(5),
    justifyContent: 'space-between',
  },
  text1: {
    ...font('bold', 3, '#fff'),
    textAlign: 'center',
  },
  text2: {
    ...font('bold', 6, '#fff'),
    textAlign: 'center',
  },
  dot: {
    position: 'absolute',
    width: RW(7),
    height: RW(7),
    borderRadius: RW(4),
    backgroundColor: 'rgba(229, 229, 238, 1)',
    zIndex: 1,
    top: RH(8),
    left: RW(8),
  },
  activeDot: {
    borderWidth: RW(2),
    borderColor: Colors.red,
  },
  img: {
    // width: RW(80),
    // height: RH(40),
    width: '100%',
    height: '100%',
    maxWidth: RW(75),
    maxHeight: RH(40),
  },
});

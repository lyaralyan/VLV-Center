import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RH, RW, font} from '@theme/utils';
import Colors from '@theme/colors';
import FastImage from 'react-native-fast-image';
import PlusSvg from '@assets/SVG/PlusSvg';

const PaymentType = ({selected, onSelect, data}) => {
  return (
    <Pressable style={styles.container} onPress={onSelect}>
      <View style={[styles.dot, selected && styles.activeDot]} />
      {data?.id === 23 && (
        <>
          <Text allowFontScaling={false} style={styles.text1}>
            {data.name}
          </Text>
          {data?.pan ? (
            <Text allowFontScaling={false} style={styles.cardPan}>
              {data?.pan}
            </Text>
          ) : (
            <PlusSvg
              width={RW(16)}
              height={RW(16)}
              style={{marginBottom: RH(3)}}
            />
          )}
        </>
      )}
      {data?.id ? (
        data.icon
      ) : (
        <FastImage
          resizeMode="contain"
          style={styles.img}
          source={{uri: data.icon}}
        />
      )}
      {!!data?.id && data?.id !== 23 && (
        <Text allowFontScaling={false} style={styles.text}>
          {data.name}
        </Text>
      )}
    </Pressable>
  );
};

export default PaymentType;

const styles = StyleSheet.create({
  container: {
    width: RW(115),
    height: RH(60),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: 'rgba(229, 229, 238, 1)',
    borderWidth: RW(1),
    borderRadius: RW(5),
  },
  text: {
    ...font('medium', 7),
    textAlign: 'center',
    marginHorizontal: RW(10),
    marginTop: RH(8),
  },
  text1: {
    ...font('medium', 6),
    textAlign: 'center',
    marginHorizontal: RW(10),
    marginBottom: RH(3),
    width: RW(60),
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
    width: '100%',
    height: '100%',
    maxWidth: RW(75),
    maxHeight: RH(40),
  },
  cardPan: {
    ...font('medium', 10, 'rgba(0,0,0,0.6)'),
    marginBottom: RH(3),
  },
});

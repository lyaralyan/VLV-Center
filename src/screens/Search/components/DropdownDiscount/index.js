import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Row from '@theme/wrappers/row';
import {RH, RW, font} from '@theme/utils';
import Colors from '@theme/colors';
import {useDispatch, useSelector} from 'react-redux';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {useTranslation} from 'react-i18next';
import {setActiveDiscount} from '@store/SearchPageSlice';
import {setInnerPending} from '@store/MainSlice';

const DropdownDiscount = ({searchFunc}) => {
  const {activeDiscount, discount} = useSelector(
    ({searchSlice}) => searchSlice,
  );
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const interpolatedBtnAnimation = useAnimatedStyle(() => {
    return {
      left: withTiming(activeDiscount ? 20 : 0),
    };
  });
  const interpolatedBtnColorAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        activeDiscount,
        [false, true],
        ['#000', Colors.red],
      ),
    };
  });

  if (!discount) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Row style={styles.header}>
        <Text allowFontScaling={false} style={styles.title}>
          {t('discounted_products')}
        </Text>
        <Pressable
          onPress={() => {
            dispatch(setInnerPending(true));
            dispatch(setActiveDiscount(!activeDiscount));
            searchFunc({activeDiscount: !activeDiscount});
          }}>
          <Animated.View
            style={[styles.btnContainer, interpolatedBtnColorAnimation]}>
            <Animated.View style={[styles.btn, interpolatedBtnAnimation]} />
          </Animated.View>
        </Pressable>
      </Row>
      <View style={styles.line} />
    </View>
  );
};

export default DropdownDiscount;

const styles = StyleSheet.create({
  container: {
    marginLeft: RW(15),
    marginRight: RW(30),
    overflow: 'hidden',
  },
  header: {
    height: RH(60),
    alignItems: 'center',
  },
  title: font('bold', 14),
  btnContainer: {
    backgroundColor: Colors.black,
    borderRadius: RW(4),
    height: RH(20),
    width: RW(40),
    justifyContent: 'center',
    paddingHorizontal: RW(2),
  },
  btn: {
    width: RW(16),
    height: RH(16),
    borderRadius: RW(2),
    backgroundColor: '#fff',
  },

  line: {
    width: '100%',
    height: RH(1),
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
});

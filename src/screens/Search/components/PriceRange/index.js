import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Row from '@theme/wrappers/row';
import ArrowTopSvg from '@screens/Search/assets/ArrowTopSvg';
import {RH, RW, font} from '@theme/utils';
import Colors from '@theme/colors';
import {useDispatch, useSelector} from 'react-redux';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useTranslation} from 'react-i18next';
import {setActiveMaxPrice, setActiveMinPrice} from '@store/SearchPageSlice';
import RnRangeSlider from 'rn-range-slider';
import {setInnerPending} from '@store/MainSlice';
let timeoutId;

const PriceRange = ({searchFunc}) => {
  const [open, setOpen] = useState(true);

  const {minPrice, maxPrice, activeMinPrice, activeMaxPrice} = useSelector(
    ({searchSlice}) => searchSlice,
  );
  const [min, setMin] = useState(minPrice || activeMinPrice || 0);
  const [max, setMax] = useState(maxPrice || activeMaxPrice || 1);

  const dispatch = useDispatch();
  const dropdownAnimation = useSharedValue(RH(80));

  const interpolatedArrowAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withTiming(open ? '0deg' : '180deg', {
            duration: 600,
          }),
        },
      ],
    };
  });

  const interpolatedDropdownAnimation = useAnimatedStyle(() => {
    return {
      height: withTiming(dropdownAnimation.value, {duration: 300}),
    };
  });

  useEffect(() => {
    setMin(activeMinPrice || minPrice);
    setMax(activeMaxPrice || maxPrice);
  }, [minPrice, maxPrice, activeMinPrice, activeMaxPrice, dispatch]);
  useEffect(() => {
    if (!!open !== !!dropdownAnimation.value) {
      dropdownAnimation.value = withTiming(
        dropdownAnimation.value ? 0 : RH(80),
      );
    }
  }, [open]);

  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setOpen(!open)}>
        <Row style={styles.header}>
          <Text allowFontScaling={false} style={styles.title}>
            {t('cost')}
          </Text>
          <Animated.View style={interpolatedArrowAnimation}>
            <ArrowTopSvg />
          </Animated.View>
        </Row>
      </Pressable>

      <Animated.View style={[styles.main, interpolatedDropdownAnimation]}>
        <Row style={{alignItems: 'center'}}>
          <View style={styles.priceContainer}>
            <Text allowFontScaling={false} style={styles.input}>
              {min}
            </Text>
          </View>
          <View style={styles.inputLine} />
          <View style={styles.priceContainer}>
            <Text allowFontScaling={false} style={styles.input}>
              {max}
            </Text>
          </View>
        </Row>

        <RnRangeSlider
          style={{marginTop: RH(20)}}
          min={minPrice}
          max={maxPrice}
          step={1}
          floatingLabel
          low={min}
          high={max}
          renderThumb={() => <View style={styles.thumb} />}
          renderRail={() => (
            <View
              style={{width: '100%', height: 4, backgroundColor: Colors.bgGray}}
            />
          )}
          renderRailSelected={() => (
            <View
              style={{width: '100%', height: 4, backgroundColor: Colors.red}}
            />
          )}
          onValueChanged={(low, high) => {
            setMin(low);
            setMax(high);
          }}
          onSliderTouchEnd={(low, high) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
              dispatch(setInnerPending(true));
              searchFunc({
                activeMinPrice: low,
                activeMaxPrice: high,
              });
              dispatch(setActiveMinPrice(low));
              dispatch(setActiveMaxPrice(high));
            }, 1000);
          }}
        />
      </Animated.View>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: RW(15),
    paddingRight: RW(30),
    overflow: 'hidden',
  },
  main: {
    overflow: 'hidden',
  },
  header: {
    height: RH(60),
    alignItems: 'center',
  },
  title: font('bold', 14),
  line: {
    width: '100%',
    height: RH(1),
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  priceContainer: {
    width: RW(120),
    height: RH(24),
    borderRadius: RW(4),
    borderColor: 'rgba(40, 40, 40, 0.4)',
    borderWidth: RW(1),
    paddingHorizontal: RW(9),
    justifyContent: 'center',
  },
  price: font('regular', 11),
  inputLine: {
    width: RW(7),
    height: RH(1),
    backgroundColor: 'rgba(40, 40, 40, 0.4)',
  },
  thumb: {
    width: RW(22),
    height: RW(22),
    borderRadius: RW(4),
    borderWidth: RW(1),
    borderColor: Colors.red,
    backgroundColor: '#fff',
  },
});

export default PriceRange;

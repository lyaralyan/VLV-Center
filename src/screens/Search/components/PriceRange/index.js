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

import RnRangeSlider from 'rn-range-slider';
import {
  setMaxPrice,
  setMinPrice,
} from '@screens/Home/components/SearchInputNew/request/filterSlice';
let timeoutId;

const PriceRange = ({searchFunc}) => {
  const {t} = useTranslation();
  const [open, setOpen] = useState(true);
  const {minPrice, maxPrice} = useSelector(({filterSlice}) => filterSlice);
  const {getCategoryWithSlugData} = useSelector(
    ({getCategoryWithSlugSlice}) => getCategoryWithSlugSlice,
  );
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);
  const [localMinPrice, setLocalMinPrice] = useState(minPrice);

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

  const handleSliderChange = (low, high) => {
    dispatch(setMinPrice(String(low)));
    dispatch(setMaxPrice(String(high)));
    setLocalMinPrice(String(low));
    setLocalMaxPrice(String(high));
  };

  useEffect(() => {
    setLocalMaxPrice(String(getCategoryWithSlugData.maxPrice));
    setLocalMinPrice(String(getCategoryWithSlugData.minPrice));
  }, [getCategoryWithSlugData]);

  useEffect(() => {
    if (!!open !== !!dropdownAnimation.value) {
      dropdownAnimation.value = withTiming(
        dropdownAnimation.value ? 0 : RH(80),
      );
    }
  }, [dropdownAnimation, open]);

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
        <Row style={styles.row}>
          <View style={styles.priceContainer}>
            <Text allowFontScaling={false} style={styles.input}>
              {localMinPrice}
            </Text>
          </View>
          <View style={styles.inputLine} />
          <View style={styles.priceContainer}>
            <Text allowFontScaling={false} style={styles.input}>
              {localMaxPrice}
            </Text>
          </View>
        </Row>

        <RnRangeSlider
          style={{marginTop: RH(20)}}
          min={Math.round(Number(getCategoryWithSlugData.originalMinPrice))}
          max={Math.round(Number(getCategoryWithSlugData.originalMaxPrice))}
          step={1}
          floatingLabel
          low={Number(localMinPrice) || 0}
          high={Number(localMaxPrice) || 0}
          renderThumb={() => <View style={styles.thumb} />}
          renderRail={() => <View style={styles.renderRail} />}
          renderRailSelected={() => <View style={styles.renderRailSelected} />}
          onValueChanged={handleSliderChange}
          onSliderTouchEnd={(low, high) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
              searchFunc({
                activeMinPrice: low,
                activeMaxPrice: high,
              });
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
  row: {
    alignItems: 'center',
  },
  renderRail: {
    width: '100%',
    height: 4,
    backgroundColor: Colors.bgGray,
  },
  renderRailSelected: {
    width: '100%',
    height: 4,
    backgroundColor: Colors.red,
  },
});

export default PriceRange;

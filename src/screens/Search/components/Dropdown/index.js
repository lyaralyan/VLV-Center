/* eslint-disable react-native/no-inline-styles */
import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Row from '@theme/wrappers/row';
import ArrowTopSvg from '@screens/Search/assets/ArrowTopSvg';
import {RH, RW, font} from '@theme/utils';
import Colors from '@theme/colors';
import {useDispatch, useSelector} from 'react-redux';
import CheckSvg from '@screens/Search/assets/CheckSvg';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  setBrand,
  setCt,
  setSelectedFilters,
  setSortBy,
} from '@screens/Home/components/SearchInputNew/request/filterSlice';
import {SvgUri} from 'react-native-svg';
import {STORAGE_URL} from '@env';

const Dropdown = ({
  title,
  icon,
  currentData = [],
  multiSelect = false,
  opened = false,
  isBrand = false,
  isCategory = false,
}) => {
  const [open, setOpen] = useState(opened);
  const currentLanguage = useSelector(({main}) => main.currentLanguage);
  const dropdownAnimation = useSharedValue(0);
  const dispatch = useDispatch();
  const {selectedFilters, brand, sort_by, ct} = useSelector(
    ({filterSlice}) => filterSlice,
  );

  const interpolatedArrowAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate:
            withTiming((open ? 0 : 180) + 'deg', {
              duration: 600,
            }) || '0deg',
        },
      ],
    };
  });
  const interpolatedDropdownAnimation = useAnimatedStyle(() => {
    return {
      height: withTiming(dropdownAnimation.value, {duration: 300}),
    };
  });

  // useEffect(() => {
  //   if (+open !== dropdownAnimation.value) {
  //     dropdownAnimation.value = withTiming(
  //       dropdownAnimation.value ? 0 : currentData?.length * RH(60),
  //     );
  //   }
  // }, [currentData?.length, dropdownAnimation, open]);

  useEffect(() => {
    dropdownAnimation.value = withTiming(
      open ? currentData?.length * RH(60) : 0,
      {
        duration: 300,
      },
    );
  }, [open, currentData?.length, dropdownAnimation]);

  const isItemChecked = item => {
    if (currentData?.name_hy === 'Տեսակավորում') {
      return sort_by?.id === item.id;
    }

    if (isBrand) {
      const brandExists = brand.some(b => b?.id === item?.id);
      return brandExists;
    }
    if (isCategory) {
      const ctExists = ct.some(c => c?.id === item?.id);
      return ctExists;
    }

    /**
     * Check if a filter item is selected
     */
    const category = selectedFilters.find(
      cat => cat.name_hy === currentData.name_hy,
    );

    return category?.values.some(val => val.id === item.id) || false;
  };

  const toggleSortBox = value => {
    dispatch(setSortBy(value));
  };

  const toggleBrandBox = value => {
    dispatch(setBrand(value));
  };
  const toggleCtBox = value => {
    dispatch(setCt(value));
  };

  const toggleCheckbox = item => {
    const updatedFilters = [...selectedFilters];

    const categoryIndex = updatedFilters.findIndex(
      cat => cat.name_hy === currentData.name_hy,
    );

    if (categoryIndex !== -1) {
      const category = updatedFilters[categoryIndex];
      const updatedValues = isItemChecked(item)
        ? category.values.filter(val => val.id !== item.id) // Remove item
        : [...category.values, item]; // Add item

      if (updatedValues.length > 0) {
        // Update category with new values
        updatedFilters[categoryIndex] = {...category, values: updatedValues};
      } else {
        // Remove category if no items remain
        updatedFilters.splice(categoryIndex, 1);
      }
    } else {
      // Add new category with selected item
      updatedFilters.push({...currentData, values: [item]});
    }

    // Dispatch updated filters to Redux
    dispatch(setSelectedFilters(updatedFilters));
  };

  const data =
    (Array.isArray(currentData?.values) && currentData?.values) || currentData;

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setOpen(!open)}>
        <Row style={styles.header}>
          {title ? (
            <Text allowFontScaling={false} style={styles.title}>
              {title}
            </Text>
          ) : icon ? (
            icon
          ) : (
            <View />
          )}
          <Animated.View style={interpolatedArrowAnimation}>
            <ArrowTopSvg />
          </Animated.View>
        </Row>
      </Pressable>
      <Animated.View style={interpolatedDropdownAnimation}>
        {data.length > 0 &&
          data?.map((item, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => {
                  if (currentData.name_hy === 'Տեսակավորում') {
                    toggleSortBox(item);
                  } else if (isBrand) {
                    toggleBrandBox(item);
                  } else if (isCategory) {
                    toggleCtBox(item);
                  } else {
                    toggleCheckbox(item);
                  }
                }}>
                <Row
                  style={[
                    styles.selectRow,
                    item?.color && {
                      justifyContent: 'flex-start',
                      columnGap: RW(15),
                    },
                  ]}>
                  {item?.color && (
                    <View
                      style={[
                        styles.selectedCheckBtn,
                        {backgroundColor: item?.value_en.toLowerCase()},
                      ]}>
                      {isItemChecked(item) && (
                        <CheckSvg
                          color={
                            item?.value_en.toLowerCase() === 'black'
                              ? '#fff'
                              : '#000'
                          }
                        />
                      )}
                    </View>
                  )}
                  {isBrand && item?.logo ? (
                    <SvgUri
                      style={styles.brandLogo}
                      uri={`${STORAGE_URL}${item.logo}`}
                    />
                  ) : (
                    <Text allowFontScaling={false} style={styles.selectTitle}>
                      {item?.color?.['name_' + currentLanguage] ||
                        item?.['name_' + currentLanguage] ||
                        item?.['value_' + currentLanguage] ||
                        item?.['label_' + currentLanguage] ||
                        item?.name ||
                        item?.value}
                    </Text>
                  )}

                  {!item?.color &&
                    (multiSelect ? (
                      <View style={styles.checkBtn}>
                        {isItemChecked(item) ? (
                          <View style={styles.selectedCheckBtn}>
                            <CheckSvg />
                          </View>
                        ) : null}
                      </View>
                    ) : (
                      <View style={styles.radioBtn}>
                        {isItemChecked(item) ? (
                          <View style={[styles.selectedRadioBtn]} />
                        ) : null}
                      </View>
                    ))}
                </Row>
              </Pressable>
            );
          })}
      </Animated.View>
      <View style={styles.line} />
    </View>
  );
};

export default Dropdown;

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
  selectRow: {
    height: RH(60),
  },
  selectTitle: {
    ...font('regular', 12),
    maxWidth: '95%',
  },
  radioBtn: {
    width: 23,
    height: 23,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  selectedRadioBtn: {
    width: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: Colors.red,
    position: 'absolute',
  },
  checkBtn: {
    width: RW(23),
    height: RW(23),
    borderRadius: RW(4),
    borderWidth: RW(1),
    borderColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCheckBtn: {
    width: RW(23),
    height: RW(23),
    borderRadius: RW(4),
    backgroundColor: Colors.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: '100%',
    height: RH(1),
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  brandLogo: {
    width: RW(60),
    height: RH(25),
  },
});

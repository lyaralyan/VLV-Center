import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setOpenMenu} from '@store/MainSlice';
import SearchInput from '@screens/Home/components/SearchInputNew/SearchInput';
import {RH, RW, font} from '@theme/utils';
import {SvgUri} from 'react-native-svg';
import {STORAGE_URL} from '@env';
import Colors from '@theme/colors';
import Row from '@theme/wrappers/row';
import Image from '@components/Image';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {getDynamicPageInfo} from '@store/SearchPageSlice';
import {useNavigation} from '@react-navigation/native';
import CloseSvg from '@assets/SVG/CloseSvg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getCategoryWithSlugRequest} from '@screens/Home/components/SearchInputNew/request/getCategoryWithSlugSlice';
import {setSlug} from '@screens/Home/components/SearchInputNew/request/filterSlice';

const width = Dimensions.get('screen').width;
const minLengthForBig = 9;
const Menu = () => {
  const [activeMenu, setActiveMenu] = useState(0);
  const {openMenu, menuData, currentLanguage} = useSelector(({main}) => main);
  const menuAnimation = useSharedValue(0);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const {discount, maxPrice, minPrice, sort_by} = useSelector(
    ({filterSlice}) => filterSlice,
  );

  useEffect(() => {
    if (+openMenu * -width === menuAnimation.value) {
      menuAnimation.value = withTiming(+!openMenu * -width);
    }
  }, [menuAnimation, openMenu]);

  const interpolatedMenuAnimation = useAnimatedStyle(() => {
    return {
      transform: [{translateX: menuAnimation.value}],
    };
  });

  if (!menuData?.length) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        interpolatedMenuAnimation,
        {paddingTop: insets.top},
      ]}>
      <View style={styles.main}>
        <Pressable
          style={{paddingHorizontal: RW(16)}}
          onPress={() => {
            // Vibration.vibrate([100]);
            dispatch(setOpenMenu(!openMenu));
          }}>
          <CloseSvg />
        </Pressable>
        <SearchInput />
        <Row style={{paddingTop: RH(10)}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.leftBlock}
            contentContainerStyle={{paddingBottom: RH(160)}}>
            {menuData?.map((elm, index) => {
              return (
                <Pressable
                  style={[
                    styles.menuItem,
                    activeMenu === index && styles.activeMenu,
                  ]}
                  key={index}
                  onPress={() => setActiveMenu(index)}>
                  {activeMenu === index && (
                    <View style={styles.activeMenuLine} />
                  )}
                  {elm?.item?.icon?.endsWith('png') ? (
                    <Image
                      style={{width: RW(25), height: RH(25)}}
                      url={elm.item.icon}
                    />
                  ) : elm?.item?.icon?.endsWith('svg') ? (
                    <SvgUri width={RW(25)} uri={STORAGE_URL + elm.item.icon} />
                  ) : elm?.item?.header_category_logo ? (
                    <Image
                      style={{width: RW(50), height: RH(50)}}
                      url={elm?.item?.header_category_logo}
                    />
                  ) : null}

                  <Text
                    style={[
                      styles.menuItemText,
                      activeMenu === index && styles.activeMenuText,
                    ]}>
                    {elm.item['name_' + currentLanguage] ||
                      elm.item['title_' + currentLanguage]}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <ScrollView
            style={styles.rightBlock}
            contentContainerStyle={{paddingBottom: RH(160)}}>
            <FlatList
              style={{maxHeight: RH(75)}}
              keyExtractor={(item, index) => `key-${index}`}
              data={
                menuData?.[activeMenu]?.from === 'dynamic'
                  ? menuData?.[activeMenu]?.item?.sliders.filter(
                      ({lang}) => lang === currentLanguage,
                    )
                  : menuData?.[activeMenu]?.item?.category_slider_image
              }
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              renderItem={({index, item}) => {
                return (
                  <Animated.View style={styles.imgContainer}>
                    <Image
                      resizeMode="cover"
                      style={styles.img}
                      url={item['image_' + currentLanguage] || item?.image}
                    />
                  </Animated.View>
                );
              }}
            />
            <Pressable
              onPress={() => {
                // dispatch(setPending(true));
                if (menuData?.[activeMenu]?.from === 'dynamic') {
                  dispatch(
                    getDynamicPageInfo({
                      slug: menuData?.[activeMenu]?.item?.slug,
                      params: {},
                      navigation,
                    }),
                  );
                } else {
                  dispatch(setSlug(menuData?.[activeMenu]?.item?.slug));
                  dispatch(
                    getCategoryWithSlugRequest({
                      brand: [],
                      slug: menuData?.[activeMenu]?.item?.slug,
                      manufacture: [],
                      discount,
                      maxPrice,
                      minPrice,
                      page: 1,
                      sort_by,
                    }),
                  );
                  navigation.navigate('CategoryPage');
                  dispatch(setOpenMenu(!openMenu));
                }
              }}
              style={styles.titleBlock}>
              <Text allowFontScaling={false} style={styles.title}>
                {menuData?.[activeMenu]?.from === 'dynamic'
                  ? menuData?.[activeMenu]?.item?.['title_' + currentLanguage]
                  : menuData?.[activeMenu].item?.['name_' + currentLanguage]}
              </Text>
              <View style={styles.count}>
                <Text allowFontScaling={false} style={styles.countText}>
                  {menuData?.[activeMenu]?.product_count}
                </Text>
              </View>
            </Pressable>
            <View style={styles.subCategories}>
              {(menuData?.[activeMenu]?.from === 'dynamic'
                ? Object.values(menuData?.[activeMenu]?.dynamic_category || {})
                : menuData?.[activeMenu]?.item?.sub_categories
              )?.map((item, index) => (
                <Pressable
                  onPress={() => {
                    if (menuData?.[activeMenu]?.from === 'dynamic') {
                      dispatch(
                        getDynamicPageInfo({
                          slug: menuData?.[activeMenu]?.item.slug,
                          params: {},
                          navigation,
                          activeCategory: item?.id,
                        }),
                      );
                    } else {
                      dispatch(setSlug(item.slug));
                      dispatch(
                        getCategoryWithSlugRequest({
                          brand: [],
                          slug: item.slug,
                          manufacture: [],
                          discount,
                          maxPrice,
                          minPrice,
                          page: 1,
                          sort_by,
                        }),
                      );
                      dispatch(setOpenMenu(!openMenu));
                      navigation.navigate('CategoryPage');
                    }
                  }}
                  style={
                    menuData?.[activeMenu]?.item?.sub_categories?.length >
                    minLengthForBig
                      ? styles.subCategoryItemContainer
                      : styles.subCategoryItemContainerBig
                  }
                  key={index}>
                  <Text
                    allowFontScaling={false}
                    style={styles.subCategoryItemTitle}>
                    {item['name_' + currentLanguage]}
                  </Text>

                  <Image
                    style={
                      menuData?.[activeMenu]?.item?.sub_categories?.length >
                      minLengthForBig
                        ? styles.subCategoryItemImg
                        : styles.subCategoryItemImgBig
                    }
                    url={item?.category_image?.image}
                  />
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </Row>
      </View>
    </Animated.View>
  );
};

export default memo(Menu);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: width,
    backgroundColor: '#fff',
    zIndex: 3,
  },
  main: {
    height: '100%',
  },
  leftBlock: {
    width: RW(100),
    alignSelf: 'flex-start',
    backgroundColor: '#F7F6F9',
  },
  menuItem: {
    height: RH(70),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: RW(10),
  },
  menuItemText: {
    marginTop: RH(5),
    textAlign: 'center',
    ...font('regular', 9),
  },
  activeMenu: {
    backgroundColor: '#fff',
  },
  activeMenuText: {
    color: Colors.red,
  },
  activeMenuLine: {
    height: RH(28),
    width: RW(4),
    backgroundColor: Colors.red,
    position: 'absolute',
    left: 0,
    borderRadius: RW(10),
  },
  rightBlock: {
    width: RW(293),
    alignSelf: 'flex-start',
  },
  imgContainer: {
    width: RW(293),
    alignItems: 'center',
  },
  img: {
    width: RW(293) - RW(10),
    height: RH(75),
    borderRadius: RH(5),
  },
  titleBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: RW(10),
    marginTop: RH(18),
    marginHorizontal: RW(5),
  },
  count: {
    backgroundColor: Colors.red,
    paddingHorizontal: RW(5),
    paddingVertical: RH(3),
    borderRadius: RW(120),
  },
  countText: font('bold', 13, '#fff'),
  title: {
    ...font('medium', 12),
  },
  subCategories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: RH(14),
    gap: 7,
    marginHorizontal: RW(5),
  },
  subCategoryItemContainer: {
    backgroundColor: 'rgb(247, 246, 249)',
    width: RW(89),
    alignSelf: 'center',
    height: RH(99),
    borderRadius: RH(5),
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  subCategoryItemContainerBig: {
    backgroundColor: 'rgb(247, 246, 249)',
    width: RW(137),
    alignSelf: 'center',
    height: RH(99),
    borderRadius: RH(5),
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  subCategoryItemTitle: {
    ...font('medium', 9),
    marginTop: RH(12),
    marginLeft: RW(7),
  },
  subCategoryItemImg: {
    width: RW(70),
    height: RH(70),
    right: RW(-10),
    alignSelf: 'flex-end',
  },
  subCategoryItemImgBig: {
    width: RW(100),
    height: RH(100),
    right: RW(-10),
    alignSelf: 'flex-end',
  },
});

import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Header from '@components/Header';
import HeaderCategories from '@components/HeaderCategories';
import SearchInput from '@screens/Home/components/SearchInputNew/SearchInput';
import {RH, RW, font} from '@theme/utils';
import {useDispatch, useSelector} from 'react-redux';
import {getDeliveryPageData, getJobPageData} from '@store/MainSlice';
import Image from '@components/Image';
import Colors from '@theme/colors';
import RenderHTML from 'react-native-render-html';
import {SvgUri} from 'react-native-svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('screen').width;

const Delivery = () => {
  const {currentLanguage, deliveryData} = useSelector(({main}) => main);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDeliveryPageData());
  }, []);
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.container, {paddingTop: insets.top}]}
      contentContainerStyle={{
        paddingBottom: RH(140),
      }}
      showsVerticalScrollIndicator={false}>
      <Header />
      <HeaderCategories />
      <SearchInput />
      <View style={styles.wrapper}>
        <Image
          style={styles.banner}
          url={deliveryData?.baner['image_' + currentLanguage]}
        />
        {deliveryData?.delivery['banners_' + currentLanguage].map(
          (item, index) => (
            <View key={index} style={styles.deliveryTypeItem}>
              <Text
                allowFontScaling={false}
                style={styles.deliveryTypeItemText}>
                {item}
              </Text>
            </View>
          ),
        )}

        <RenderHTML
          contentWidth={screenWidth}
          source={{
            html: deliveryData?.delivery?.['text_1_' + currentLanguage],
          }}
          tagsStyles={{
            body: {
              color: Colors.black,
            },
          }}
        />
        <RenderHTML
          contentWidth={screenWidth}
          source={{
            html: deliveryData?.delivery['title_' + currentLanguage],
          }}
          tagsStyles={{
            body: {
              color: Colors.black,
            },
          }}
        />
        <View style={styles.deliveryInfoBlock}>
          {deliveryData?.delivery['info_' + currentLanguage].map(
            (item, index) => (
              <View key={index} style={styles.deliveryInfoItem}>
                <View style={styles.deliveryInfoItemImg}>
                  <SvgUri width={RW(26)} height={RW(26)} url={item?.icon} />
                </View>
                <Text
                  allowFontScaling={false}
                  style={styles.deliveryInfoItemTitle}>
                  {item.title}
                </Text>
              </View>
            ),
          )}
        </View>
        <View style={styles.deliveryStepBlock}>
          <Text allowFontScaling={false} style={styles.deliveryStepTitle}>
            {deliveryData?.delivery['title_' + currentLanguage]}
          </Text>
          {deliveryData?.delivery['condition_' + currentLanguage].map(
            (item, index) => (
              <View style={styles.deliveryStepItem} key={index}>
                <View style={styles.deliveryStepItemCount}>
                  <Text
                    allowFontScaling={false}
                    style={styles.deliveryStepItemCountText}>
                    0{index + 1}
                  </Text>
                </View>
                <Text
                  allowFontScaling={false}
                  style={styles.deliveryStepItemText}>
                  {item}
                </Text>
              </View>
            ),
          )}
          <RenderHTML
            contentWidth={screenWidth}
            source={{
              html: deliveryData?.delivery['text_2_' + currentLanguage],
            }}
            tagsStyles={{
              body: {
                color: Colors.black,
              },
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Delivery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: RW(16),
  },
  banner: {
    width: '100%',
    height: 'auto',
    aspectRatio: '3.2/1',
    marginBottom: RH(20),
  },
  deliveryTypeItem: {
    width: '100%',
    height: RH(80),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: RW(2),
    borderColor: Colors.red,
    marginBottom: RH(16),
    borderRadius: RW(10),
  },
  deliveryTypeItemText: {
    ...font('medium', 18),
    textTransform: 'uppercase',
  },
  deliveryInfoBlock: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: RW(20),
    marginTop: RH(20),
    marginBottom: RH(20),
  },
  deliveryInfoItem: {
    width: RW(150),
    backgroundColor: Colors.bgGray,
    justifyContent: 'center',
    alignItems: 'center',
    padding: RW(10),
    rowGap: RH(10),
  },
  deliveryInfoItemImg: {
    width: RW(56),
    height: RW(56),
    backgroundColor: '#eaeff5',
    borderWidth: RW(1),
    borderColor: 'rgba(40,40,40,.2)',
    borderRadius: RW(28),
  },
  deliveryInfoItemTitle: {
    ...font('bold', 12),
    textAlign: 'center',
    marginHorizontal: RW(10),
  },
  deliveryStepItem: {
    backgroundColor: Colors.bgGray,
    flexDirection: 'row',
    gap: RW(14),
    padding: RW(20),
    alignItems: 'center',
    marginTop: RH(20),
  },
  deliveryStepItemCount: {
    width: RW(68),
    height: RW(68),
    borderRadius: RW(34),
    borderWidth: RW(1),
    borderColor: 'rgba(40,40,40,.2)',
    backgroundColor: '#eaeff5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveryStepItemCountText: font('bold', 23),
  deliveryStepItemText: {
    width: RW(243),
    ...font('bold', 16),
  },
});

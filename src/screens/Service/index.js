import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Header from '@components/Header';
import HeaderCategories from '@components/HeaderCategories';
import SearchInput from '@screens/Home/components/SearchInputNew/SearchInput';
import {RH, RW, font} from '@theme/utils';
import {useDispatch, useSelector} from 'react-redux';
import {getServicePageData} from '@store/MainSlice';
import Image from '@components/Image';
import Colors from '@theme/colors';
import RenderHTML from 'react-native-render-html';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('screen').width;

const Service = () => {
  const [active, setActive] = useState();
  const {currentLanguage, servicePageData} = useSelector(({main}) => main);
  const dispatch = useDispatch();
  const scrollRef = useRef();

  useEffect(() => {
    dispatch(getServicePageData());
  }, []);
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      ref={scrollRef}
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
          url={servicePageData?.mainPhoto?.['image_' + currentLanguage]}
        />

        <RenderHTML
          contentWidth={screenWidth}
          source={{
            html: servicePageData?.service_page?.['text_' + currentLanguage],
          }}
          tagsStyles={{
            body: {
              color: Colors.black,
            },
          }}
        />
        <View style={{height: RH(20)}} />
        <RenderHTML
          contentWidth={screenWidth}
          source={{
            html: servicePageData?.service_page?.[
              'banners_' + currentLanguage
            ][0].title,
          }}
          tagsStyles={{
            body: {
              color: Colors.black,
            },
          }}
        />

        <View>
          <Text allowFontScaling={false} style={styles.servicesTitle}>
            Ոչ երաշխիքային (վճարովի) սպասարկում
          </Text>
          <View style={styles.servicesBlock}>
            {servicePageData?.service.map((item, index) => (
              <Pressable
                style={styles.serviceItem}
                onPress={() => setActive(item.id)}
                key={index}>
                <View
                  style={[
                    styles.serviceItemImgContainer,
                    active == item.id && styles.serviceItemActive,
                  ]}>
                  <Image
                    style={styles.serviceItemImg}
                    url={item?.['icon_' + currentLanguage]}
                  />
                </View>
                <Text allowFontScaling={false} style={styles.serviceItemText}>
                  {item?.['name_' + currentLanguage]}
                </Text>
              </Pressable>
            ))}
          </View>
          {active && (
            <View
              style={styles.serviceInfoBlock}
              onLayout={event => {
                const layout = event.nativeEvent.layout;
                scrollRef.current.scrollTo({
                  x: 0,
                  y: layout.y + RH(2700),
                  animated: true,
                });
              }}>
              <View style={styles.serviceInfoItem}>
                <Text allowFontScaling={false} style={styles.serviceInfoTitle}>
                  Վերանորոգման տեսակը
                </Text>
              </View>
              {servicePageData?.service
                .find(({id}) => id == active)
                ?.service_type?.map((item, index) => {
                  return (
                    <View key={index} style={styles.serviceInfoItem}>
                      <Text
                        allowFontScaling={false}
                        style={styles.serviceInfoText}>
                        {item?.['type_' + currentLanguage]}
                      </Text>
                    </View>
                  );
                })}
              <View style={styles.serviceInfoItem}>
                <Text allowFontScaling={false} style={styles.serviceInfoTitle}>
                  Գինը
                </Text>
              </View>
              {servicePageData?.service
                .find(({id}) => id == active)
                ?.service_type?.map((item, index) => {
                  return (
                    <View key={index} style={styles.serviceInfoItem}>
                      <Text
                        allowFontScaling={false}
                        style={styles.serviceInfoText}>
                        {item?.['value_' + currentLanguage]}
                      </Text>
                    </View>
                  );
                })}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Service;

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
  servicesTitle: {
    marginTop: RH(20),
    textTransform: 'uppercase',
    ...font('bold', 20),
  },
  servicesBlock: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: RW(20),
    justifyContent: 'space-between',
    paddingTop: RH(20),
  },
  serviceItem: {
    width: RW(160),
    alignItems: 'center',
    rowGap: RW(10),
  },
  serviceItemImgContainer: {
    backgroundColor: Colors.bgGray,
    height: RH(120),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RW(10),
  },
  serviceItemImg: {
    width: RW(80),
    height: RH(80),
  },
  serviceItemText: font('regular', 16),
  serviceItemActive: {
    borderWidth: RW(1),
    borderColor: Colors.red,
  },
  serviceInfoBlock: {
    backgroundColor: Colors.bgGray,
    marginTop: RH(40),
    paddingVertical: RH(30),
    paddingHorizontal: RW(14),
    borderRadius: RW(2),
    rowGap: RH(10),
  },
  serviceInfoItem: {
    backgroundColor: '#eeeef5',
    borderRadius: RW(2),
    padding: RW(16),
  },
  serviceInfoTitle: {
    textTransform: 'uppercase',
    ...font('bold', 16),
  },
  serviceInfoText: font('regular', 12, '#898383'),
});

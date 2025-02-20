import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {forwardRef, useRef, useState} from 'react';
import {STORAGE_URL} from '@env';
import {RH, RW, font} from '../../../../theme/utils';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import Colors from '../../../../theme/colors';
import Image from '../../../../components/Image';
import GiftSvg from '@assets/SVG/GiftSvg';
import {SvgUri} from 'react-native-svg';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

export default forwardRef(function ImgBlock(
  {imgs, gift_images, sticker, guaranty},
  ref,
) {
  const [activeImg, setActiveImg] = useState(0);

  const [showGiftModal, setShowGiftModal] = useState(false);
  const currentLanguage = useSelector(({main}) => main.currentLanguage);
  const handleScroll = event => {
    const pageIndex = Math.ceil(event.nativeEvent.contentOffset.x / width);
    setActiveImg(pageIndex);
    const miniImagesPageIndex = Math.floor(
      event.nativeEvent.contentOffset.x / (width * 3.5),
    );
    miniImagesScrollRef.current.scrollTo({
      x: miniImagesPageIndex * width,
      animated: true,
    });
  };

  const scrollRef = useRef();
  const miniImagesScrollRef = useRef();
  const navigation = useNavigation();

  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <View ref={ref}>
        {imgs?.length ? (
          <FlatList
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => `image-${index}`}
            bounces={false}
            data={imgs}
            onScroll={handleScroll}
            scrollEventThrottle={200}
            renderItem={({item}) => (
              <Image
                ref={ref}
                style={styles.mainImg}
                url={item?.images_source}
                withoutDefault={true}
              />
            )}
          />
        ) : (
          <Image style={styles.mainImg} url={null} />
        )}

        <View style={styles.stickersRow}>
          {sticker?.map((item, index) => (
            <SvgUri
              key={index}
              style={styles.stickerImg}
              url={STORAGE_URL + item['image_' + currentLanguage]}
            />
          ))}
          {!!gift_images?.length && (
            <View style={styles.giftContainer}>
              {showGiftModal && (
                <Pressable
                  onPress={() => {
                    navigation.navigate('ProductPage', {
                      productId: gift_images?.[0]?.product_id,
                    });
                  }}
                  style={styles.giftModal}>
                  <View style={styles.giftModalMain}>
                    <Image
                      style={styles.giftModalImg}
                      url={gift_images[0].image}
                    />
                  </View>
                </Pressable>
              )}

              <Pressable onPress={() => setShowGiftModal(!showGiftModal)}>
                <GiftSvg width={RH(45)} height={RH(45)} />
              </Pressable>
            </View>
          )}
          {!!Object.keys(guaranty || {}).length && (
            <View style={styles.guarantyBlock}>
              <View style={styles.guarantyBlockTop}>
                <Text
                  allowFontScaling={false}
                  style={styles.guarantyBlockTopText}>
                  {t('guaranty')}
                </Text>
              </View>
              <View style={styles.guarantyBlockBottom}>
                <Text
                  allowFontScaling={false}
                  style={styles.guarantyBlockBottomText}>
                  {guaranty?.[currentLanguage]}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
      <ScrollView
        ref={miniImagesScrollRef}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}>
        {imgs?.map((item, index) => {
          return (
            <View key={index}>
              <Pressable
                onPress={() => {
                  scrollRef.current.scrollToIndex({index});
                }}>
                <Image style={styles.miniImg} url={item?.images_source} />
              </Pressable>
              <View
                style={{
                  height: RH(2),
                  width: RW(80),
                  marginHorizontal: RW(6),
                  backgroundColor:
                    index !== activeImg ? Colors.bgGray : Colors.red,
                  borderRadius: RH(2),
                }}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: RW(15),
  },
  mainImg: {
    width: width - RW(30),
    height: RH(350),
  },
  miniImg: {
    width: RW(80),
    height: RH(90),
    marginHorizontal: RW(6),
  },
  stickersRow: {
    position: 'absolute',
    right: RW(0),
    bottom: RH(0),
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  giftContainer: {
    alignItems: 'flex-end',
    marginRight: RW(5),
  },
  giftModal: {
    width: RW(100),
    height: RH(90),
    backgroundColor: '#fff',
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 14,
    borderRadius: RW(5),
    justifyContent: 'center',
    alignItems: 'center',
    bottom: RW(-5),
  },
  giftModalMain: {
    width: RW(80),
    height: RH(70),
    borderWidth: RW(1),
    borderColor: '#dfdfe2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  giftModalImg: {
    width: RW(70),
    height: RW(60),
  },
  stickerImg: {
    width: RW(20),
    height: RW(20),
  },
  guarantyBlock: {
    width: RW(50),
    height: RH(30),
    overflow: 'hidden',
    borderRadius: RW(4),
    backgroundColor: '#fff',
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 14,
  },
  guarantyBlockTop: {
    backgroundColor: Colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  guarantyBlockBottom: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  guarantyBlockTopText: font('bold', 6, '#fff'),
  guarantyBlockBottomText: font('bold', 6),
});

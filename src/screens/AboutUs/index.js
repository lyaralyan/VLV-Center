import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image as RNImage,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAbouUsPageData} from '@store/MainSlice';
import Image from '@components/Image';
import {RH, RW, font} from '@theme/utils';
import Header from '@components/Header';
import HeaderCategories from '@components/HeaderCategories';
import SearchInput from '@screens/Home/components/SearchInputNew/SearchInput';
import RenderHTML from 'react-native-render-html';
import Colors from '@theme/colors';
import {useNavigation} from '@react-navigation/native';
import Banners from '@screens/Home/components/Banners';
import Row from '@theme/wrappers/row';
import Sales from '@screens/Home/components/Sales';
import {useTranslation} from 'react-i18next';
import {SvgUri} from 'react-native-svg';
import {STORAGE_URL} from '@env';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const screenWith = Dimensions.get('window').width;
const AboutUs = () => {
  const {aboutUsData, currentLanguage} = useSelector(({main}) => main);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    dispatch(getAbouUsPageData());
  }, []);
  const banksAboutList = [
    'https://vlv.am/public/img/ineco.png',
    'https://vlv.am/public/img/unii.png',
    'https://vlv.am/public/img/idram.svg',
    'https://vlv.am/public/img/aeb.png',
    'https://vlv.am/public/img/evoca.png',
    'https://vlv.am/public/img/norman.png',
    'https://vlv.am/public/img/ameria.png',
    'https://vlv.am/public/img/converse.png',
    'https://vlv.am/public/img/arcax.png',
    'https://vlv.am/public/img/vtb.png',
    'https://vlv.am/public/img/sef.png',
    'https://vlv.am/public/img/acba.png',
  ];
  const {t} = useTranslation();
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
          style={styles.banner1}
          url={aboutUsData?.baner['image_' + currentLanguage]}
        />
        <RenderHTML
          contentWidth={screenWith}
          source={{
            html: aboutUsData?.about_us['block_1_' + currentLanguage],
          }}
          tagsStyles={{
            body: {
              color: Colors.black,
            },
          }}
        />
        <View style={styles.brands}>
          {aboutUsData?.brands.slice(0, 3)?.map(item => (
            <Pressable style={styles.brandBtn} onPress={() => {}}>
              <SvgUri style={styles.brandImg} uri={STORAGE_URL + item.logo} />
              {/* <Image style={styles.brandImg} url={item.logo} /> */}
            </Pressable>
          ))}
          <Pressable
            style={styles.brandMoreBtn}
            onPress={() => navigation.navigate('Brands')}>
            <Text allowFontScaling={false} style={styles.brandMoreBtnText}>
              {t('more')}
            </Text>
          </Pressable>
        </View>
        <View style={styles.secondBlock}>
          <RenderHTML
            contentWidth={screenWith}
            source={{
              html: aboutUsData?.about_us['block_3_' + currentLanguage],
            }}
            tagsStyles={{
              body: {
                color: Colors.black,
              },
            }}
          />
          <Image
            style={styles.secondBlockImg}
            url={aboutUsData?.about_us?.['block_3_image_' + currentLanguage]}
          />
        </View>
        <RenderHTML
          contentWidth={screenWith}
          source={{
            html: aboutUsData?.about_us['block_4_' + currentLanguage],
          }}
          tagsStyles={{
            body: {
              color: Colors.black,
            },
          }}
        />
      </View>
      <Banners
        imgStyle={styles.thirdBannerImg}
        data={aboutUsData?.about_us['slides_' + currentLanguage]}
      />
      <View style={styles.wrapper}>
        <RenderHTML
          contentWidth={screenWith}
          source={{
            html: aboutUsData?.about_us['block_5_' + currentLanguage],
          }}
          tagsStyles={{
            body: {
              color: Colors.black,
            },
          }}
        />
        <Row style={styles.teamInfoBlock}>
          <View style={styles.teamInfoBlockLeft}>
            <RenderHTML
              contentWidth={screenWith}
              source={{
                html: aboutUsData?.about_us['block_6_title_' + currentLanguage],
              }}
              tagsStyles={{
                body: {
                  color: Colors.black,
                },
              }}
            />

            <Pressable
              onPress={() => navigation.navigate('Job')}
              style={styles.teamInfoBlockLeftBtn}>
              <Text
                allowFontScaling={false}
                style={styles.teamInfoBlockLeftBtnText}>
                {t('more')}
              </Text>
            </Pressable>
          </View>
          <Image
            style={styles.teamInfoBlockImg}
            url={aboutUsData?.about_us['block_6_image_' + currentLanguage]}
          />
        </Row>
        <RenderHTML
          contentWidth={screenWith}
          source={{
            html: aboutUsData?.about_us['block_7_' + currentLanguage],
          }}
          tagsStyles={{
            body: {
              color: Colors.black,
            },
          }}
        />
        <View style={styles.banks}>
          {banksAboutList.map(item => (
            <View style={styles.bankItem}>
              <RNImage style={styles.bankItemImg} src={item} />
            </View>
          ))}
        </View>
        <RenderHTML
          contentWidth={screenWith}
          source={{
            html: aboutUsData?.about_us['block_8_' + currentLanguage],
          }}
          tagsStyles={{
            body: {
              color: Colors.black,
            },
          }}
        />
      </View>
      <Sales />
    </ScrollView>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: RW(16),
  },
  banner1: {
    width: '100%',
    height: 'auto',
    aspectRatio: '3.15/1',
  },
  brands: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: RW(10),
  },
  brandBtn: {
    width: RW(166),
    height: RH(80),
    borderRadius: RW(10),
    borderWidth: RW(1),
    borderColor: 'rgba(40, 40, 40, 0.3)',
    justifyContent: 'center',
  },
  brandImg: {
    width: RW(150),
    height: RH(50),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  brandMoreBtn: {
    width: RW(166),
    height: RH(80),
    borderRadius: RW(10),
    backgroundColor: Colors.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandMoreBtnText: font('bold', 14, '#fff'),
  secondBlock: {
    backgroundColor: '#f7f7fb',
    gap: RW(20),
    padding: RW(20),
    margin: RW(20),
  },
  secondBlockImg: {
    width: '100%',
    height: 'auto',
    aspectRatio: '1.87/1',
  },
  thirdBannerImg: {
    width: RW(393),
    height: RH(231),
  },
  teamInfoBlock: {
    backgroundColor: '#f7f7fb',
    gap: RW(20),
    padding: RW(20),
    margin: RW(20),
  },
  teamInfoBlockLeft: {
    justifyContent: 'space-between',
    height: RH(150),
    maxWidth: RW(100),
  },
  teamInfoBlockImg: {
    width: RW(140),
    height: RH(150),
  },
  teamInfoBlockLeftBtn: {
    height: RH(40),
    paddingHorizontal: RW(10),
    backgroundColor: Colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RW(5),
  },
  teamInfoBlockLeftBtnText: font('medium', 10, '#fff'),
  banks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: RW(10),
  },
  bankItem: {
    width: RW(166),
    height: RH(80),
    borderRadius: RW(10),
    borderWidth: RW(1),
    borderColor: 'rgba(40, 40, 40, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bankItemImg: {
    width: RW(146),
    height: RH(60),
    resizeMode: 'contain',
  },
});

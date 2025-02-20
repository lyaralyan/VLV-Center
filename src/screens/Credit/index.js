import {
  Dimensions,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Header from '@components/Header';
import HeaderCategories from '@components/HeaderCategories';
import SearchInput from '@screens/Home/components/SearchInputNew/SearchInput';
import {RH, RW, font} from '@theme/utils';
import {useDispatch, useSelector} from 'react-redux';
import {getCreditPageData} from '@store/MainSlice';
import Image from '@components/Image';
import RenderHTML from 'react-native-render-html';
import Colors from '@theme/colors';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('screen').width;

const Credit = () => {
  const {currentLanguage, creditPageData} = useSelector(({main}) => main);
  const insets = useSafeAreaInsets();

  const dispatch = useDispatch();
  useEffect(() => {
    if (!creditPageData) {
      dispatch(getCreditPageData());
    }
  }, []);
  const bankItemsList = [
    {
      id: 1,
      img: 'https://vlv.am/public//uploads/images/pages/63e1fc1c6a434.png',
      phoneNumber: '(010)510510',
      bankName: 'inecobank.am',
      href: 'https://www.inecobank.am/',
      creditPage: 'https://www.inecobank.am/hy/Individual/point-of-sales',
    },
    {
      id: 2,
      img: 'https://vlv.am/public//uploads/images/pages/63e1f07a8e9eb.png',
      phoneNumber: '+(374 8000) 87-87',
      bankName: 'vtb.am',
      creditPage:
        'https://www.vtb.am/am/credits/installments/installments-loan/',
      href: 'https://www.vtb.am/',
    },
    {
      id: 3,
      img: 'https://vlv.am/public//uploads/images/pages/64396ae6e4727.png',
      phoneNumber: '010/012 561111',
      bankName: 'ameriabank.am',
      creditPage:
        'https://ameriabank.am/personal/loans/consumer-loans/consumer-finance',
      href: 'https://ameriabank.am/',
    },
    {
      id: 4,
      img: 'https://vlv.am/public//uploads/images/pages/63e1fcabf1d09.png',
      phoneNumber: '(010) 318888',
      bankName: 'acba.am',
      creditPage: 'https://www.acba.am/hy/individuals/loans/installment-loan',
      href: 'https://www.acba.am/',
    },
    // {
    //   id: 5,
    //   img: 'https://vlv.am/public//uploads/images/pages/64396a3c1b616.png',
    //   phoneNumber: '(010)592259,595555',
    //   bankName: 'unibank.am',
    //   creditPage: 'https://www.unibank.am/hy/service/consumer.php',
    //   href: 'https://www.unibank.am/',
    // },
    // {
    //   id: 6,
    //   img: 'https://vlv.am/public//uploads/images/pages/63e1f986b8520.png',
    //   phoneNumber: '(010)605555',
    //   bankName: 'evoca.am',
    //   creditPage:
    //     'https://www.evoca.am/hy/loans/online-and-point-of-sale-loans/',
    //   href: 'https://www.evoca.am/',
    // },
    {
      id: 7,
      img: 'https://vlv.am/public//uploads/images/pages/63e1fd369899c.png',
      phoneNumber: '(012)777772',
      bankName: 'artsakhbank.am',
      creditPage: 'https://www.artsakhbank.am/loans/consumer-loans/installment',
      href: 'https://www.artsakhbank.am/',
    },
    {
      id: 8,
      img: 'https://vlv.am/public//uploads/images/pages/63e1fa69ee472.png',
      phoneNumber: '(012)241024',
      bankName: 'velox.am',
      creditPage:
        'https://www.velox.am/%D5%BD%D5%A1%D5%AF%D5%A1%D5%A3%D5%B6%D5%A5%D6%80-%D6%87-%D5%BA%D5%A1%D5%B5%D5%B4%D5%A1%D5%B6%D5%B6%D5%A5%D6%80',
      href: 'https://www.velox.am/',
    },
    {
      id: 9,
      img: 'https://vlv.am/public//uploads/images/pages/641029fa4f72b.png',
      phoneNumber: '86 86 ,(010)510910',
      bankName: 'aeb.am',
      creditPage: 'https://www.aeb.am/hy/aparik-aeb/',
      href: 'https://www.aeb.am/',
    },
  ];
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
          url={creditPageData?.mainPhoto['image_' + currentLanguage]}
        />
        <RenderHTML
          contentWidth={screenWidth}
          source={{
            html: creditPageData?.credits_info['text_' + currentLanguage],
          }}
          tagsStyles={{
            body: {
              color: Colors.black,
            },
          }}
        />
        {creditPageData?.credits_info['banners_' + currentLanguage].map(
          (item, index) => (
            <View style={styles.creditItem}>
              <Image style={styles.creditItemImg} url={item.icon} />
              <Text allowFontScaling={false} style={styles.creditItemText}>
                {item.title}
              </Text>
            </View>
          ),
        )}
        <Text allowFontScaling={false} style={styles.text1}>
          Ապառիկի ֆինանսավորման պայմաններին ծանոթանալու համար սեղմեք
          տարբերանշանի վրա։
        </Text>
        <View style={styles.banksList}>
          {bankItemsList.map(item => (
            <View style={styles.bankItem}>
              <Pressable onPress={() => Linking.openURL(item.creditPage)}>
                <FastImage
                  resizeMode="contain"
                  style={styles.bankItemsImage}
                  source={{uri: item.img}}
                />
              </Pressable>
              <Text allowFontScaling={false} style={styles.bankItemsText}>
                {item.phoneNumber} | {item.bankName}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Credit;

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
    marginBottom: RH(10),
  },
  main: {
    paddingHorizontal: RW(16),
    paddingVertical: RH(20),
    backgroundColor: '#f7f7fb',
    marginTop: RH(20),
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: RW(10),
  },
  item: {
    width: RW(170),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: RW(10),
  },
  itemImg: {
    width: RW(100),
    height: RH(50),
  },
  itemText: {
    ...font('medium', 10),
    textAlign: 'center',
    marginTop: RH(10),
  },
  creditItem: {
    backgroundColor: Colors.bgGray,
    flexDirection: 'row',
    paddingHorizontal: RW(20),
    height: RH(80),
    alignItems: 'center',
    columnGap: RW(20),
    marginVertical: RH(10),
  },
  creditItemImg: {
    width: RW(40),
    height: RH(40),
  },
  creditItemText: {
    ...font('bold', 15),
    flexShrink: 1,
  },
  text1: {
    ...font('medium', 13),
    marginVertical: RH(30),
  },
  banksList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: RW(20),
    justifyContent: 'space-between',
  },
  bankItem: {
    width: RW(170),
    height: RH(110),
    shadowColor: '#000',
    backgroundColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 6,
    borderRadius: RW(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: RW(10),
  },
  bankItemsImage: {
    width: RW(140),
    height: RH(60),
    marginBottom: RH(20),
  },
  bankItemsText: {
    // position: 'absolute',
    bottom: RH(10),
    width: RW(140),
    alignSelf: 'center',
    textAlign: 'center',
    ...font('regular', 11),
  },
});

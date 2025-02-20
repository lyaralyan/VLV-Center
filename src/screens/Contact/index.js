import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getContactPageData} from '@store/MainSlice';
import {RH, RW, font} from '@theme/utils';
import Header from '@components/Header';
import HeaderCategories from '@components/HeaderCategories';
import SearchInput from '@screens/Home/components/SearchInputNew/SearchInput';
import Colors from '@theme/colors';
import Row from '@theme/wrappers/row';
import Image from '@components/Image';
import InstagramSvg from '@components/Footer/assets/InstagramSvg';
import WhatsappSvg from '@components/Footer/assets/WhatsappSvg';
import ViberSvg from '@components/Footer/assets/ViberSvg';
import FacebookSvg from '@components/Footer/assets/FacebookSvg';
import PhoneSvg from './assets/PhoneSvg';
import TimeSvg from './assets/TimeSvg';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MarkerSvg from './assets/MarkerSvg';
import EmailSvg from './assets/EmailSvg';
import MapMarkerSvg from './assets/MapMarkerSvg';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Contact = () => {
  const [search, setSearch] = useState('');
  const [activeAddress, setActiveAddress] = useState();
  const [filteredAddresses, setFilteredAddresses] = useState([]);

  const {contactData, currentLanguage} = useSelector(({main}) => main);
  const dispatch = useDispatch();
  const mapRef = useRef();
  useEffect(() => {
    if (!contactData) {
      dispatch(getContactPageData());
    } else {
      setActiveAddress(contactData?.addresses[0]);
      setFilteredAddresses(contactData?.addresses);
    }
  }, [contactData]);
  useEffect(() => {
    if (search) {
      let data = contactData?.addresses.filter(
        item =>
          item.address_en.toLowerCase().includes(search.toLowerCase()) ||
          item.address_ru.toLowerCase().includes(search.toLowerCase()) ||
          item.address_hy.toLowerCase().includes(search.toLowerCase()),
      );
      setFilteredAddresses(data);
    } else {
      setFilteredAddresses(contactData?.addresses);
    }
  }, [search]);
  const {t} = useTranslation();
  // if (!contactData || !filteredAddresses) return null;
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
        <View style={styles.contactsRow}>
          <View style={styles.contactsIcon}>
            <MarkerSvg />
          </View>
          <Text allowFontScaling={false} style={styles.contactsText}>
            {
              contactData?.contact?.['banners_' + currentLanguage]?.address
                ?.title
            }
          </Text>
          <View style={styles.contactsIcon}>
            <EmailSvg />
          </View>
          <Text allowFontScaling={false} style={styles.contactsText}>
            {contactData?.contact?.['banners_' + currentLanguage]?.email?.title}
          </Text>
        </View>

        <View style={styles.line} />
        <View style={styles.contactsRow}>
          <View style={styles.contactsIcon}>
            <PhoneSvg width={RW(18)} height={RH(18)} />
          </View>
          <Text allowFontScaling={false} style={styles.contactsText}>
            {contactData?.contact?.['banners_' + currentLanguage]?.tel?.title}
          </Text>

          <View style={styles.contactsIcon}>
            <PhoneSvg width={RW(18)} height={RH(18)} />
          </View>
          <Text allowFontScaling={false} style={styles.contactsText}>
            {contactData?.contact?.['banners_' + currentLanguage]?.tel2?.title}
          </Text>
        </View>
        <View style={styles.line} />

        <Text allowFontScaling={false} style={styles.socTitle}>
          {contactData?.contact?.['soc_title_' + currentLanguage]}
        </Text>

        <View style={styles.socIcons}>
          <Pressable
            style={styles.socIconBtn}
            onPress={() =>
              Linking.openURL(contactData?.contact?.socs_en.fb.link)
            }>
            <FacebookSvg />
          </Pressable>
          <Pressable
            style={styles.socIconBtn}
            onPress={() =>
              Linking.openURL(contactData?.contact?.socs_en.fb.insta)
            }>
            <InstagramSvg />
          </Pressable>
          <Pressable
            style={styles.socIconBtn}
            onPress={() =>
              Linking.openURL(
                'https://wa.me/' + contactData?.contact?.socs_en.fb.whatsapp,
              )
            }>
            <WhatsappSvg />
          </Pressable>
          <Pressable
            style={styles.socIconBtn}
            onPress={() =>
              Linking.openURL(
                'viber://chat?number=' + contactData?.contact?.socs_en.fb.viber,
              )
            }>
            <ViberSvg />
          </Pressable>
        </View>
      </View>
      <View style={{paddingHorizontal: RW(16)}}>
        <Text allowFontScaling={false} style={styles.shopsTitle}>
          {t('shops')}
        </Text>
        <View style={styles.search}>
          <TextInput
            allowFontScaling={false}
            value={search}
            onChangeText={e => setSearch(e)}
            placeholder="Հասցե"
            placeholderTextColor={Colors.gray}
            style={styles.searchInput}
          />
          <Pressable style={styles.searchInputBtn}>
            <Text allowFontScaling={false} style={styles.searchInputBtnText}>
              {t('search')}
            </Text>
          </Pressable>
        </View>
        <ScrollView
          scrollEnabled
          showsVerticalScrollIndicator={false}
          style={styles.addresses}>
          {filteredAddresses?.map(item => (
            <Pressable
              key={item?.id}
              style={[
                styles.addressItem,
                activeAddress.id == item.id && styles.activeAddressItem,
              ]}
              onPress={() => setActiveAddress(item)}>
              <Image
                resizeMode="cover"
                style={styles.addressItemImg}
                url={item?.['image_' + currentLanguage]}
              />
              <View>
                <Text
                  allowFontScaling={false}
                  style={styles.addressItemAddressName}>
                  {item?.['address_' + currentLanguage]}
                </Text>
                <View style={styles.addressItemRow}>
                  <TimeSvg />
                  <Text allowFontScaling={false} style={styles.addressItemTime}>
                    {item?.['work_time_' + currentLanguage]}
                  </Text>
                </View>
                <View style={styles.addressItemRow}>
                  <PhoneSvg width={RW(14)} height={RH(14)} />
                  <Text allowFontScaling={false} style={styles.addressItemTime}>
                    {item?.['tel_' + currentLanguage]}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          showsMyLocationButton
          showsUserLocation
          zoomControlEnabled
          zoomEnabled
          zoomTapEnabled
          region={{
            latitude: activeAddress?.location?.lat,
            longitude: activeAddress?.location?.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}>
          {!!activeAddress && (
            <Marker
              ref={mapRef}
              coordinate={{
                latitude: activeAddress?.location?.lat,
                longitude: activeAddress?.location?.lng,
              }}>
              <MapMarkerSvg />
              <Callout>
                <View
                  style={{
                    width: RW(220),
                    height: 'auto',
                    backgroundColor: '#fff',
                    padding: RW(10),
                  }}>
                  <Text
                    style={[
                      styles.addressItemAddressName,
                      {marginBottom: RH(10)},
                    ]}>
                    {activeAddress?.['address_' + currentLanguage]}
                  </Text>
                  <Row>
                    <View style={styles.addressItemRow}>
                      <TimeSvg />
                      <Text
                        allowFontScaling={false}
                        style={styles.addressItemTime}>
                        {activeAddress?.['work_time_' + currentLanguage]}
                      </Text>
                    </View>
                    <View style={styles.addressItemRow}>
                      <PhoneSvg width={RW(14)} height={RH(14)} />
                      <Text
                        allowFontScaling={false}
                        style={styles.addressItemTime}>
                        {activeAddress?.['tel_' + currentLanguage]}
                      </Text>
                    </View>
                  </Row>
                  <Image
                    style={{width: '100%', height: RH(80)}}
                    url={activeAddress?.['image_' + currentLanguage]}
                  />
                </View>
              </Callout>
            </Marker>
          )}
        </MapView>
      </View>
    </ScrollView>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: RW(16),
    backgroundColor: '#f7f7fb',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  contactsRow: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: RW(20),
    marginVertical: RH(20),
  },
  contactsIcon: {
    width: RW(40),
    height: RW(40),
    padding: RW(15),
    borderRadius: RW(25),
    backgroundColor: '#eaeff5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: RW(1),
    borderColor: 'rgba(40, 40, 40, 0.2)',
  },
  line: {
    alignSelf: 'center',
    backgroundColor: 'rgba(40,40,40,.1)',
    width: RW(80),
    height: RH(1),
  },
  socTitle: {
    width: '100%',
    textAlign: 'center',
    ...font('regular', 14),
    marginVertical: RH(20),
  },
  socIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: RH(13),
    columnGap: RW(20),
  },
  socIconBtn: {
    width: RW(40),
    height: RW(40),
    borderColor: 'rgba(40, 40, 40, 0.25)',
    borderWidth: RW(1),
    borderRadius: RW(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  shopsTitle: {
    ...font('regular', 16),
    textTransform: 'uppercase',
    marginVertical: RH(20),
  },
  search: {
    width: '100%',
    height: RH(40),
    borderColor: '#28282833',
    borderWidth: RW(1),
    borderRadius: RW(10),
    justifyContent: 'center',
    paddingHorizontal: RW(20),
    marginBottom: RH(20),
  },
  searchInput: {
    width: '100%',
    height: '100%',
    ...font('regular', 12),
  },
  searchInputBtn: {
    position: 'absolute',
    right: RW(5),
    backgroundColor: Colors.red,
    height: RH(30),
    width: RW(80),
    borderRadius: RW(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInputBtnText: font('regular', 12, '#fff'),
  addresses: {
    height: RH(400),
  },
  addressItem: {
    gap: RW(20),
    flexDirection: 'row',
    width: '100%',
    height: RH(100),
    backgroundColor: '#f7f7fb',
    borderWidth: RW(1),
    borderColor: 'rgba(40, 40, 40, 0.2)',
    paddingHorizontal: RW(20),
    alignItems: 'center',
    marginVertical: RH(5),
  },
  activeAddressItem: {
    borderColor: Colors.red,
    borderWidth: RW(1),
  },
  addressItemImg: {
    height: RH(80),
    width: RH(80),
    borderRadius: RW(40),
  },
  addressItemAddressName: {
    ...font('medium', 16),
    marginBottom: RH(20),
  },
  addressItemRow: {
    flexDirection: 'row',
    columnGap: RW(5),
  },
  addressItemTime: {
    ...font('regular', 12, Colors.gray),
    marginBottom: RH(5),
  },
  map: {
    height: RH(450),
    width: '100%',
    marginVertical: RH(30),
  },
});

import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {RH, RW, font} from '@theme/utils';
import {useDispatch, useSelector} from 'react-redux';
import PlusSvg from './assets/PlusSvg';
import Row from '@theme/wrappers/row';
import ToggleSwitch from '@components/ToggleSwitch';
import Input from '@components/Input/Input';
import Button from '@components/Button/Button';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {
  addAddress,
  deleteAddress,
  editAddress,
  getLocationNameFromCordinates,
} from '@store/UserSlice';
import DeleteSvg from '@assets/SVG/DeleteSvg';
import Colors from '@theme/colors';
import {useTranslation} from 'react-i18next';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const MyAddresses = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [address, setAddress] = useState(null);
  const [phone, setPhone] = useState(personal_information?.phone || '');
  const [phoneError, setPhoneError] = useState(false);
  const [autocompleteKey, setAutocompleteKey] = useState(0);
  const [addressRegion, setAddressRegion] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const {addresses, personal_information} = useSelector(
    ({user}) => user.userInfo,
  );
  const mapRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({latitude, longitude});
        // setActiveAddress({latitude, longitude});
        reverseGeocode({latitude, longitude});
      },
      error => Alert.alert('Error', 'Could not fetch location.'),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  const reverseGeocode = location => {
    const {latitude, longitude} = location;
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GOOGLE_MAP_API_KEY}`,
    )
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results[0]) {
          const formattedAddress = data.results[0].formatted_address;
          setAddress(formattedAddress);
          // Force re-render of GooglePlacesAutocomplete by changing the key
          setAutocompleteKey(prevKey => prevKey + 1);
        }
      })
      .catch(error => console.error(error));
  };

  const handleMarkerDragEnd = e => {
    const newLocation = e.nativeEvent.coordinate;
    // setActiveAddress(newLocation);
    reverseGeocode(newLocation);
  };

  const handleMapPress = e => {
    const coordinate = e.nativeEvent.coordinate;
    // setActiveAddress(coordinate);
    reverseGeocode(coordinate);
  };

  useEffect(() => {
    if (Object.keys(currentLocation || {}).length) {
      getLocationNameFromCordinates(currentLocation, e => setAddress(e));
    }
  }, [currentLocation]);
  useEffect(() => {
    if (selectedAddress) {
      setShowMap(false);
      setAddressRegion(
        Object.values(addresses || {})?.find(item => item.id == selectedAddress)
          ?.address,
      );
    }
  }, [selectedAddress]);

  useEffect(() => {
    setPhone(personal_information?.phone);
  }, [personal_information]);

  const {t} = useTranslation();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: RH(80)}}>
      <Text allowFontScaling={false} style={styles.title}>
        {t('my_addresses')}
      </Text>
      {!Object.values(addresses || {})?.length ? null : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsRow}>
          <Pressable
            onPress={() => {
              setSelectedAddress(null);
              setAddress('');
              setAddressRegion('');
              setShowMap(false);
            }}
            style={[styles.card, styles.minCard]}>
            <PlusSvg />
          </Pressable>
          {Object.values(addresses || {}).map((item, index) => {
            return (
              <Pressable
                onPress={() => {
                  setSelectedAddress(item.id);
                }}
                key={index}
                style={[styles.card]}>
                <Row>
                  <Text allowFontScaling={false} style={styles.addressText}>
                    {item.address}
                  </Text>
                  <Pressable
                    onPress={() => {
                      dispatch(deleteAddress(item.id));
                      setSelectedAddress(null);
                    }}>
                    <DeleteSvg />
                  </Pressable>
                </Row>
                <View style={styles.radioBtnContainer}>
                  <Text allowFontScaling={false} style={styles.radioBtnText}>
                    {t('select_an_address')}
                  </Text>
                  <View style={styles.radioBtn}>
                    {!!selectedAddress == item.id && (
                      <View style={styles.activeRadioBtn} />
                    )}
                  </View>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
      )}
      <Row style={styles.showMapRow}>
        <Text allowFontScaling={false} style={styles.showMapText}>
          {t('fill_in_the_data')}
        </Text>
        <ToggleSwitch value={showMap} setValue={setShowMap} />
        <Text allowFontScaling={false} style={styles.showMapText}>
          {t('show_on_the_map')}
        </Text>
      </Row>
      <Input
        style={styles.mapInput}
        value={phone}
        onChange={e => setPhone(e)}
        placeholder={'0XXXXXXXX *'}
        error={phoneError}
      />

      {!!showMap ? (
        <View>
          <GooglePlacesAutocomplete
            key={autocompleteKey}
            textInputProps={{
              value: address,
              onChange: setAddress,
            }}
            placeholder={t('City, region, community, address...')}
            fetchDetails={true}
            onPress={(data, details = null) => {
              const location = details.geometry.location;
              setCurrentLocation({
                latitude: location.lat,
                longitude: location.lng,
              });
              setAddress(details.formatted_address);
            }}
            query={{
              key: process.env.GOOGLE_MAP_API_KEY,
              language: 'en',
            }}
            styles={styles.GooglePlacesAutocomplete}
          />
          <Button
            text={t('select_your_current_location')}
            style={{marginBottom: RH(10)}}
            onPress={() => {
              setCurrentLocation({
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              });
              reverseGeocode(currentLocation);
            }}
          />

          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            ref={mapRef}
            showsMyLocationButton
            showsUserLocation
            zoomControlEnabled
            zoomEnabled
            zoomTapEnabled
            onPress={e => {
              setCurrentLocation({
                ...e?.nativeEvent?.coordinate,
                latitudeDelta: 0.005,
                longitudeDelta: 0.001,
              });
            }}
            region={
              currentLocation || {
                latitude: 40.150011,
                longitude: 44.495715,
                latitudeDelta: 0.15,
                longitudeDelta: 0.05,
              }
            }>
            {!!currentLocation && (
              <Marker
                draggable
                coordinate={currentLocation}
                onDragEnd={handleMarkerDragEnd}
              />
            )}
          </MapView>
        </View>
      ) : (
        <View style={styles.wrapper}>
          <Input
            value={addressRegion}
            onChange={e => setAddressRegion(e)}
            placeholder={t('Region, community, address...')}
          />
        </View>
      )}

      <View style={styles.wrapper}>
        <Button
          onPress={() => {
            setPhoneError(!phone);
            if (!phone) {
              return null;
            }
            if (address || addressRegion) {
              if (selectedAddress) {
                dispatch(
                  editAddress(address || addressRegion, selectedAddress, phone),
                );
              } else {
                dispatch(addAddress(address || addressRegion, phone));
              }
            }
          }}
          style={styles.saveBtn}
          text={selectedAddress ? t('change') : t('Save')}
        />
      </View>
    </ScrollView>
  );
};

export default MyAddresses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: RW(15),
    paddingTop: RH(30),
  },
  title: {
    ...font('medium', 22),
    marginBottom: RH(40),
    alignSelf: 'center',
  },
  cardsRow: {
    columnGap: RW(6),
  },
  card: {
    width: RW(280),
    height: RH(140),
    backgroundColor: 'rgb(239, 239, 246)',
    borderRadius: RW(5),
    padding: RW(22),
    justifyContent: 'space-between',
  },
  emptyCard: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  minCard: {
    justifyContent: 'center',
    alignItems: 'center',
    width: RW(35),
  },
  addressText: {
    ...font('medium', 14),
    width: '90%',
  },
  radioBtnContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: RW(8),
  },
  radioBtnText: font('regular', 12),
  radioBtn: {
    width: RW(20),
    height: RW(20),
    borderRadius: RW(10),
    borderWidth: RW(3),
    borderColor: Colors.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeRadioBtn: {
    width: RW(8),
    height: RW(8),
    borderRadius: RW(4),
    backgroundColor: Colors.red,
  },
  showMapRow: {
    width: '100%',
    marginVertical: RH(24),
  },
  showMapText: {
    ...font('regular', 12),
  },
  wrapper: {
    flex: 1,
    width: '100%',
    paddingHorizontal: RW(16),
    rowGap: RH(18),
  },

  mapInput: {
    paddingHorizontal: RW(16),
    alignSelf: 'center',
    marginBottom: RH(18),
  },
  map: {
    height: RH(300),
    width: '100%',
  },
  saveBtn: {
    marginTop: RH(20),
  },

  GooglePlacesAutocomplete: {
    textInputContainer: {
      alignSelf: 'center',
      width: '100%',
      height: RH(50),
      justifyContent: 'center',
      marginBottom: 18,
    },
    textInput: {
      marginHorizontal: 16,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgb(247, 246, 249)',
      borderRadius: RH(10),
      paddingHorizontal: RW(15),
      ...font('regular', 14),
      alignSelf: 'center',
    },
    listView: {
      backgroundColor: 'white',
      shadowColor: 'rgb(247, 246, 249)',
      shadowRadius: 5,
      shadowOffset: {height: 2, width: 2},
      shadowOpacity: 0.5,
      elevation: 5,
      borderLeftColor: 'rgb(247, 246, 249)',
      borderRightColor: 'rgb(247, 246, 249)',
      borderLeftWidth: 2,
      borderRightWidth: 2,
    },
  },
});

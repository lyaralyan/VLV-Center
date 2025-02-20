import {
  Alert,
  Dimensions,
  Linking,
  PermissionsAndroid,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import {useDispatch, useSelector} from 'react-redux';
import {setShowCamera} from '@store/MainSlice';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {RH, RW} from '@theme/utils';
import ImageZoom from 'react-native-image-pan-zoom';
import RotateSvg from './assets/RotateSvg';
import QRBorderSvg from './assets/QRBorderSvg';
import Colors from '@theme/colors';
const CameraBottomSheet = () => {
  const [rotation, setRotation] = useState(0);
  const showCamera = useSelector(({main}) => main.showCamera);
  const snapPoints = useMemo(() => ['90%', '90%'], []);
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const bottomSheetRef = useRef();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const renderBackdrop = useCallback(backdropProps => {
    return (
      <BottomSheetBackdrop
        {...backdropProps}
        opacity={0.7}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    );
  }, []);

  useEffect(() => {
    if (showCamera) {
      bottomSheetRef.current.expand();
    } else {
      bottomSheetRef.current.close();
    }
    if (!hasPermission && showCamera) {
      requestPermission()
        .then(e => {
          if (!e) {
            Alert.alert(
              'Camera permission is not granted',
              'To use this feature, please give permission to the camera for this app',
              [
                {
                  text: 'Go to settings',
                  onPress: () => {
                    Linking.openSettings();
                  },
                },
              ],
            );
          }
        })
        .catch(e => {
          console.warn('requestPermission catch', e);
          Alert.alert(
            'Camera permission is not granted',
            'To use this feature, please give permission to the camera for this app',
            [
              {
                text: 'Go to settings',
                onPress: () => {
                  Linking.openSettings();
                },
              },
            ],
          );
        });
    }
  }, [showCamera, hasPermission]);

  const codeScannerFunc = useCallback(
    codes => {
      if (showCamera) {
        if (
          codes.find(code => code.value.startsWith('https://vlv.am/Product/'))
        ) {
          let value = codes.find(code =>
            code.value.startsWith('https://vlv.am/Product/'),
          ).value;
          dispatch(setShowCamera(false));

          navigation.navigate('ProductPage', {
            productId: value?.slice(23, value.length),
          });

          return;
        }
      }
    },
    [showCamera],
  );
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    //"code-128" | "code-39" | "code-93" | "codabar" | "ean-13" | "ean-8" | "itf" | "upc-e" | "qr" | "pdf-417" | "aztec" | "data-matrix"
    onCodeScanned: codeScannerFunc,
  });

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      onClose={() => {
        dispatch(setShowCamera(false));
      }}>
      <BottomSheetView style={{flex: 1}}>
        {device == null || !hasPermission ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: Colors.black}}>
              Please give permission to use the camera
            </Text>
          </View>
        ) : (
          <Camera
            style={[
              styles.camera,
              showCamera?.type !== 'product' && {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: RH(20),
              },
            ]}
            device={device}
            isActive={!!showCamera}
            {...(showCamera && showCamera?.type !== 'product'
              ? {codeScanner}
              : {})}>
            {showCamera?.type === 'product' ? (
              <>
                <Pressable
                  onPress={() => {
                    if (rotation == 270) {
                      setRotation(0);
                    } else {
                      setRotation(rotation + 90);
                    }
                  }}
                  style={{alignSelf: 'center'}}>
                  <RotateSvg />
                </Pressable>
                <ImageZoom
                  cropWidth={Dimensions.get('window').width}
                  cropHeight={Dimensions.get('window').height - RH(200)}
                  imageWidth={RW(200)}
                  imageHeight={RH(200)}>
                  <View>
                    <FastImage
                      resizeMode="contain"
                      source={{uri: showCamera?.image}}
                      style={{
                        width: RW(200),
                        height: RH(200),
                        transform: [{rotate: rotation + 'deg'}],
                      }}
                    />
                  </View>
                </ImageZoom>
              </>
            ) : (
              <QRBorderSvg />
            )}
          </Camera>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
};

export default CameraBottomSheet;

const styles = StyleSheet.create({
  camera: {
    ...StyleSheet.absoluteFill,
    flex: 1,
  },
});

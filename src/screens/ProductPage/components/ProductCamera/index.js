import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {RH, RW} from '@theme/utils';
import ImageZoom from 'react-native-image-pan-zoom';
import ViewShot from 'react-native-view-shot';
import FastImage from 'react-native-fast-image';
import DeleteSvg from '@assets/SVG/DeleteSvg';
import Colors from '@theme/colors';

const ProductCameraBottomSheet = ({show, setShow, productImage}) => {
  const [uri, setUri] = useState('');
  const snapPoints = useMemo(() => ['90%', '90%'], []);
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const bottomSheetRef = useRef();
  const viewShot = useRef(null);

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
    if (show) {
      bottomSheetRef.current.snapToIndex(1);
    } else {
      bottomSheetRef.current.close();
    }
  }, [show]);
  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      containerStyle={{zIndex: 99999}}
      backgroundStyle={{}}
      backdropComponent={renderBackdrop}
      onClose={() => {
        setShow(false);
      }}>
      {uri ? (
        <View
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
          }}>
          <Pressable
            onPress={() => {
              setUri(null);
            }}>
            <DeleteSvg width={RW(100)} height={RW(100)} color={Colors.red} />
          </Pressable>
          <FastImage
            resizeMode="contain"
            source={{uri: uri}}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
      ) : device == null ? (
        <View style={{flex: 1}}>
          <Text>NO CAMERA</Text>
        </View>
      ) : (
        <ViewShot ref={viewShot} style={{flex: 1}}>
          <Camera style={styles.camera} device={device} isActive={!!show}>
            <ImageZoom
              cropWidth={Dimensions.get('window').width}
              cropHeight={Dimensions.get('window').height - 200}
              imageWidth={RW(200)}
              imageHeight={RH(200)}>
              <View>
                <FastImage
                  resizeMode="contain"
                  source={{uri: productImage}}
                  style={{
                    width: RW(200),
                    height: RH(200),
                  }}
                />
              </View>
            </ImageZoom>
          </Camera>
        </ViewShot>
      )}
    </BottomSheet>
  );
};

export default ProductCameraBottomSheet;

const styles = StyleSheet.create({
  camera: {
    ...StyleSheet.absoluteFill,
    flex: 1,
  },
});

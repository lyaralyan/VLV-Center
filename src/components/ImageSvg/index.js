import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {STORAGE_URL} from '@env';

export default function Image({
  url,
  resizeMode = 'contain',
  style = {},
  onPress,
}) {
  const [error, setError] = useState(false);
  const Container = typeof onPress === 'function' ? Pressable : View;
  return (
    <Container onPress={onPress}>
      <FastImage
        style={style}
        resizeMode={resizeMode}
        source={
          error
            ? require('../../assets/defaultImg.png')
            : {uri: STORAGE_URL + url}
        }
        onError={() => {
          setError(true);
        }}
      />
    </Container>
  );
}

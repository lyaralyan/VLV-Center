import {Pressable, View} from 'react-native';
import React, {useEffect, useState, forwardRef} from 'react';
import FastImage from 'react-native-fast-image';
import {STORAGE_URL} from '@env';

export default forwardRef(function Image(
  {url, resizeMode = 'contain', style = {}, onPress, withoutDefault},
  ref,
) {
  const [error, setError] = useState(false);
  const Container = typeof onPress === 'function' ? Pressable : View;
  useEffect(() => {
    setError(false);
  }, [url]);
  return (
    <Container onPress={onPress}>
      <FastImage
        ref={ref}
        style={style}
        resizeMode={resizeMode}
        source={
          (error || !url) && !withoutDefault
            ? require('../../assets/defaultImg.png')
            : {uri: STORAGE_URL + url}
        }
        onError={() => {
          setError(true);
        }}
      />
    </Container>
  );
});

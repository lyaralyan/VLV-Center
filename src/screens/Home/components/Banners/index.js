import {
  Animated,
  Dimensions,
  Linking,
  Pressable,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {RW, RH} from '../../../../theme/utils';
import Colors from '../../../../theme/colors';
import {ExpandingDot} from 'react-native-animated-pagination-dots';
import Image from '../../../../components/Image';
import {FlatList} from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('screen').width;
const Banners = ({
  data = [],
  imgStyle = {},
  imgContainerStyle = {},
  keyName = '',
  resizeMode = 'contain',
}) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  if (!Array.isArray(data) || !data.length) {
    return null;
  }

  return (
    <>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item, index) => `carusel-key-${index}`}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        bouncesZoom={false}
        alwaysBounceVertical={false}
        snapToAlignment="start"
        decelerationRate={'fast'}
        snapToInterval={screenWidth}
        alwaysBounceHorizontal
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
        renderItem={({index, item}) => {
          return (
            <Animated.View style={[styles.imgContainer, imgContainerStyle]}>
              <Pressable
                style={[styles.imgBtn, imgStyle]}
                onPress={() => {
                  if (item?.navigate) {
                    Linking.openURL(item?.navigate);
                  }
                }}>
                <Image
                  resizeMode={resizeMode}
                  style={[styles.img]}
                  url={keyName ? item[keyName] : item?.image || item}
                />
              </Pressable>
            </Animated.View>
          );
        }}
      />
      <ExpandingDot
        data={Array.from({length: data?.length}, (_, index) => index)}
        expandingDotWidth={16}
        scrollX={scrollX}
        inActiveDotColor="rgba(191, 191, 191, 1)"
        activeDotColor={Colors.red}
        dotStyle={{
          height: RW(8),
          width: RW(8),
          borderRadius: RW(4),
          marginHorizontal: RH(4),
        }}
        containerStyle={styles.containerStyle}
      />
    </>
  );
};

export default Banners;
const styles = StyleSheet.create({
  imgContainer: {
    flex: 1,
    width: screenWidth,
    height: RH(147),
    alignItems: 'center',
  },
  imgBtn: {
    width: screenWidth - RW(32),
    height: RH(147),
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: RH(10),
  },
  dotsContainer: {
    justifyContent: 'center',
  },
  dot: {
    height: RW(8),
    width: RW(8),
    borderRadius: RW(4),
    marginHorizontal: RH(4),
  },
  containerStyle: {
    position: 'relative',
    marginTop: RH(5),
  },
});

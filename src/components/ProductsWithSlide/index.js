import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import ProductCard from '../ProductCard';
import Row from '../../theme/wrappers/row';
import Colors from '../../theme/colors';
import {font, RH, RW} from '@theme/utils';

export default function ProductsWithSlide({
  products = {},
  title,
  containerStyle = {},
  onPressAddCart,
}) {
  return (
    <View
      style={[
        {backgroundColor: Colors.bgGray, paddingVertical: RH(20)},
        containerStyle,
      ]}>
      {title && (
        <Row style={styles.header}>
          <Text allowFontScaling={false} style={styles.title}>
            {title}
          </Text>
        </Row>
      )}
      <FlatList
        data={products}
        horizontal
        // pagingEnabled
        keyExtractor={(item, index) => `key-${index}`}
        contentContainerStyle={{
          backgroundColor: Colors.bgGray,
          paddingHorizontal: RW(15),
          marginBottom: RH(10),
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <ProductCard
            product={item}
            singleImage={true}
            onPressAddCart={onPressAddCart}
          />
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    paddingBottom: RH(20),
    paddingHorizontal: RW(15),
  },
  title: {
    textTransform: 'uppercase',
    ...font('medium', 14),
  },
});

import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import ProductCard from '../ProductCard';
import Row from '../../theme/wrappers/row';
import Colors from '../../theme/colors';
import {font, RH, RW} from '@theme/utils';
import {useTranslation} from 'react-i18next';
import {FlatList} from 'react-native-gesture-handler';

export default function GridProducts({
  products = [],
  title,
  containerStyle = {},
  withLimit = true,
  scrollEnabled = false,
  limit = 4,
  contentContainerStyle = {},
  onDeletePress,
  scrollRef,
}) {
  const [showedProducts, setShowedProducts] = useState(limit);
  const {t} = useTranslation();
  let yPos;
  const productList = Array.isArray(products)
    ? products
    : products?.products ?? [];
  if (!products?.products?.length) {
    return null;
  }

  return (
    <View
      onLayout={e => {
        yPos = e?.nativeEvent?.layout.y;
      }}
      style={[
        {
          backgroundColor: Colors.bgGray,
          marginBottom: RH(20),
          paddingTop: RH(15),
        },
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
        data={withLimit ? productList?.slice(0, showedProducts) : productList}
        numColumns={2}
        keyExtractor={(item, index) => `key-${index}`}
        pagingEnabled
        contentContainerStyle={{
          backgroundColor: Colors.bgGray,
          paddingHorizontal: RW(15),
          ...contentContainerStyle,
        }}
        scrollEnabled={scrollEnabled}
        renderItem={({item}) => (
          <ProductCard product={item} onDeletePress={onDeletePress} />
        )}
        // ListEmptyComponent={
        //   <View
        //     style={{
        //       flex: 1,
        //       justifyContent: 'center',
        //       alignItems: 'center',
        //       backgroundColor: 'red',
        //     }}>
        //     <Text style={{color: 'white', fontSize: 16}}>
        //       Products not found
        //     </Text>
        //   </View>
        // }
      />
      {withLimit && showedProducts < products?.products?.length ? (
        <Pressable
          style={({pressed}) => [
            styles.showMoreBtn,
            {backgroundColor: pressed ? Colors.darkRed : Colors.red},
          ]}
          onPress={() => {
            setShowedProducts(showedProducts + limit);
          }}>
          <Text allowFontScaling={false} style={styles.showMoreBtnText}>
            {t('see_all')}
          </Text>
        </Pressable>
      ) : limit < products?.products?.length ? (
        <Pressable
          style={({pressed}) => [
            styles.showMoreBtn,
            {backgroundColor: pressed ? Colors.darkRed : Colors.red},
          ]}
          onPress={() => {
            scrollRef?.current?.scrollTo({
              y: yPos,
              animated: true,
            });
            setShowedProducts(limit);
          }}>
          <Text allowFontScaling={false} style={styles.showMoreBtnText}>
            {t('to_close')}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    paddingTop: RH(5),
    paddingBottom: RH(20),
    paddingHorizontal: RW(15),
  },
  title: {
    textTransform: 'uppercase',
    ...font('medium', 14),
  },
  showMoreBtn: {
    paddingHorizontal: RW(18),
    paddingVertical: RH(11),
    borderRadius: RW(4),
    alignSelf: 'center',
    marginBottom: RH(50),
  },
  showMoreBtnText: {
    ...font('regular', 12, '#fff'),
  },
});

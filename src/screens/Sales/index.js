import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '@components/InnerHeader';
import {useTranslation} from 'react-i18next';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {getSales} from '@store/MainSlice';
import Colors from '@theme/colors';
import {RH, RW, font} from '@theme/utils';
import SaleItem from '@screens/Home/components/Sales/components/SaleItem';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Sales = () => {
  const [showedSales, setShowedSales] = useState(8);
  const sales = useSelector(({main}) => main.sales);

  const dispatch = useDispatch();
  const {t} = useTranslation();
  useEffect(() => {
    if (!Object.keys(sales || {}).length) dispatch(getSales());
  }, []);

  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.container, {paddingTop: insets.top}]}>
      <Header title={t('promotions')} />
      <FlatList
        data={sales.slice(0, showedSales)}
        numColumns={2}
        keyExtractor={(item, index) => `key-${index}`}
        pagingEnabled
        contentContainerStyle={{
          rowGap: RH(15),
          marginTop: RH(40),
          paddingHorizontal: RW(15),
        }}
        scrollEnabled={false}
        renderItem={({item}) => (
          <SaleItem item={item} width={RW(170)} height={RH(260)} />
        )}
      />
      {showedSales < sales.length && (
        <Pressable
          style={styles.showMoreBtn}
          onPress={() => {
            setShowedSales(showedSales + 4);
          }}>
          <Text allowFontScaling={false} style={styles.showMoreBtnText}>
            {t('load_more')}
          </Text>
        </Pressable>
      )}
      <View style={{height: RH(100)}} />
    </ScrollView>
  );
};

export default Sales;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  showMoreBtn: {
    backgroundColor: Colors.red,
    paddingHorizontal: RW(18),
    paddingVertical: RH(11),
    borderRadius: RW(4),
    marginTop: RH(20),
    alignSelf: 'center',
  },
  showMoreBtnText: {
    ...font('regular', 12, '#fff'),
  },
});

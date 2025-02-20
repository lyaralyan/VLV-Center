import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Row from '../../../../theme/wrappers/row';
import SaleItem from './components/SaleItem';
import {useTranslation} from 'react-i18next';
import {RH, RW, font} from '@theme/utils';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
export default function Sales() {
  const sales = useSelector(({main}) => main.sales);
  const navigation = useNavigation();
  const {t} = useTranslation();

  if (sales?.length === 0 || !sales) {
    return null;
  }

  return (
    <View>
      <Row style={styles.sectionHeaeder}>
        <Text allowFontScaling={false} style={styles.sectionHeaederTitle}>
          {t('we_sale')}
        </Text>
        <Pressable onPress={() => navigation.navigate('Sales')}>
          <Text allowFontScaling={false} style={styles.sectionHeaederMoreText}>
            {t('see_all')}
          </Text>
        </Pressable>
      </Row>
      <FlatList
        data={sales}
        horizontal
        keyExtractor={(item, index) => `key-${index}`}
        contentContainerStyle={styles.sales}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <SaleItem item={item} />}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  sectionHeaeder: {
    justifyContent: 'space-between',
    marginTop: RH(28),
    marginBottom: RH(12),
    paddingHorizontal: RW(15),
  },
  sectionHeaederTitle: {
    textTransform: 'uppercase',
    ...font('medium', 14),
  },
  sectionHeaederMoreText: {
    ...font('regular', 12, 'rgba(137, 137, 137, 1)'),
  },
  sales: {
    paddingHorizontal: RW(11),
    marginBottom: RH(18),
  },
});

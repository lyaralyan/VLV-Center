import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {RH, RW, font} from '@theme/utils';
import Colors from '@theme/colors';

const BrandPageCategories = ({data, setActiveId, activeId, onPress}) => {
  const currentLanguage = useSelector(({main}) => main.currentLanguage);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}>
      {data?.map(item => (
        <Pressable
          style={[
            styles.btn,
            activeId == item.id && {backgroundColor: Colors.red},
          ]}
          key={item.id}
          onPress={() => {
            if (setActiveId) setActiveId(item.id);
            if (onPress) onPress(item);
          }}>
          <Text
            style={[styles.text, activeId == item.id && {color: Colors.white}]}>
            {item['name_' + currentLanguage]}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default BrandPageCategories;

const styles = StyleSheet.create({
  row: {
    columnGap: RW(5),
    marginVertical: RH(25),
    paddingHorizontal: RW(16),
  },
  btn: {
    paddingHorizontal: RW(15),
    height: RH(42),
    backgroundColor: 'rgba(247, 246, 249, 1)',
    borderRadius: RH(21),
    justifyContent: 'center',
  },
  text: font('bold', 12),
});

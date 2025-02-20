import React from 'react';
import {StyleSheet, View} from 'react-native';

const Row = ({style, children}) => {
  return <View style={[styles.row, style]}>{children}</View>;
};

export default Row;

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

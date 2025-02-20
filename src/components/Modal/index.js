import {Modal, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import Toast from 'react-native-toast-message';
const CustomModal = props => {
  return (
    <View>
      <Modal
        visible={props.visible}
        animationType="fade"
        transparent={true}
        onRequestClose={props.dismiss}>
        <Pressable style={styles.modalContainer} onPress={props.dismiss}>
          <View style={styles.modalOverlay} />
          <Pressable activeOpacity={1}>{props.children}</Pressable>
          <Toast />
        </Pressable>
      </Modal>
    </View>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

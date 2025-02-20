import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {setShowSignInModal} from '@store/MainSlice';
import {useDispatch, useSelector} from 'react-redux';
import CustomModal from '@components/Modal';
import {RH, RW} from '@theme/utils';
import {Login} from '@screens';
import CloseSvg from '@assets/SVG/CloseSvg';

const SignInModal = () => {
  const showSignInModal = useSelector(({main}) => main.showSignInModal);
  const dispatch = useDispatch();
  return (
    <CustomModal
      visible={!!showSignInModal}
      dismiss={() => {
        dispatch(setShowSignInModal(false));
      }}>
      <View style={styles.container}>
        <View>
          <Pressable
            onPress={() => dispatch(setShowSignInModal(false))}
            style={styles.closeBtn}>
            <CloseSvg />
          </Pressable>
        </View>
        <Login
          isModal={true}
          showDisscountModal={showSignInModal == 'showDisscountModal'}
        />
      </View>
    </CustomModal>
  );
};

export default SignInModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: RH(750),
    backgroundColor: '#fff',
    width: RW(360),
    borderRadius: RW(20),
  },
  closeBtn: {
    alignSelf: 'flex-end',
    padding: RW(10),
    marginTop: RH(10),
    marginRight: RW(10),
  },
});

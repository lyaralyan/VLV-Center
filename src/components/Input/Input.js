import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import React, {memo, useState} from 'react';
import {RH, RW} from '../../theme/utils';
import {font} from '@theme/utils';
import CloseEyeSvg from './assets/CloseEyeSvg';
import EyeSvg from './assets/EyeSvg';
import Colors from '@theme/colors';

const Input = ({
  value = '',
  placeholder = '',
  onChange = () => {},
  style = {},
  inputStyle = {},
  password = false,
  autoComplete,
  error = false,
  ...props
}) => {
  const [show, setShow] = useState(false);
  return (
    <View style={[styles.conatiner, style]}>
      <TextInput
        allowFontScaling={false}
        value={value}
        placeholder={placeholder}
        onChangeText={onChange}
        style={[styles.input, inputStyle, error && styles.inputErrorStyle]}
        secureTextEntry={password && !show}
        placeholderTextColor={Colors.gray}
        autoComplete={autoComplete}
        {...props}
      />
      {password ? (
        <Pressable style={styles.eyeBtn} onPress={() => setShow(!show)}>
          {show ? <CloseEyeSvg /> : <EyeSvg />}
        </Pressable>
      ) : null}
    </View>
  );
};

export default memo(Input);

const styles = StyleSheet.create({
  conatiner: {
    width: '100%',
    height: RH(50),
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(247, 246, 249)',
    borderRadius: RH(10),
    paddingHorizontal: RW(15),
    ...font('regular', 14),
    alignSelf: 'center',
  },
  eyeBtn: {
    position: 'absolute',
    right: RW(13),
  },
  inputErrorStyle: {
    borderWidth: RW(1),
    borderColor: Colors.red,
  },
});

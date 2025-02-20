import {
  PermissionsAndroid,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Colors from '@theme/colors';
import {RH, RW} from '@theme/utils';

const OTPInputCustom = ({value, setValue, error}) => {
  const [active, setActive] = useState(0);
  const inputRefs = useRef([...Array(6)].map(() => React.createRef()));

  const handleFocus = () => {
    if (active < inputRefs.current.length) {
      inputRefs.current[active].current.focus();
    }
  };

  // Handle input value changes
  useEffect(() => {
    const length = value.length;
    setActive(length);
    if (length < 6) {
      inputRefs.current[length]?.current.focus(); // Focus on next input
    }
  }, [value]);

  return (
    <Pressable onPress={handleFocus} style={styles.container}>
      {inputRefs.current.map((ref, index) => (
        <TextInput
          key={index}
          allowFontScaling={false}
          style={[
            styles.input,
            active === index && styles.activeInput,
            error && styles.error,
          ]}
          value={value[index] || ''}
          onChangeText={e => {
            if (e) {
              const newValue = [...value];
              newValue[index] = e; // Update the current input
              setValue(newValue); // Update the value state
              if (index < 5) {
                inputRefs.current[index + 1].current.focus(); // Move to the next input
              }
            }
          }}
          onKeyPress={({nativeEvent}) => {
            if (nativeEvent.key === 'Backspace') {
              const newValue = [...value];
              newValue[index] = ''; // Clear the current input
              setValue(newValue); // Update the value state
              if (index > 0) {
                inputRefs.current[index - 1].current.focus(); // Move to the previous input
              }
            }
          }}
          keyboardType="number-pad"
          ref={ref}
          maxLength={1}
        />
      ))}
    </Pressable>
  );
};

export default OTPInputCustom;

const styles = StyleSheet.create({
  container: {
    height: RH(100),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.black,
    borderRadius: RW(5),
    color: Colors.black,
    height: RW(50),
    width: RW(50),
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  activeInput: {
    borderColor: Colors.red,
  },
  error: {
    borderColor: Colors.red,
  },
});

import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import NoInternetSvg from './assets/NoInternetSvg';
import {RH, RW, font} from '@theme/utils';
import Colors from '@theme/colors';
import {refresh} from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/native';

const NoInternet = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <NoInternetSvg />
      <Text allowFontScaling={false} style={styles.title}>
        Կապի խափանում
      </Text>
      <Text allowFontScaling={false} style={styles.subTitle}>
        Խնդրում ենք համոզվել, որ Ձեր սարքը միացված է ինտերնետին:
      </Text>
      <Pressable
        style={styles.btn}
        onPress={() => {
          refresh().then(({isConnected}) => {
            if (isConnected) {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate('Home');
              }
            }
          });
        }}>
        <Text allowFontScaling={false} style={styles.btnText}>
          Կրկին փորձել
        </Text>
      </Pressable>
    </View>
  );
};

export default NoInternet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginTop: RH(15),
    ...font('medium', 20),
  },
  subTitle: {
    textAlign: 'center',
    alignSelf: 'center',
    width: RW(329),
    marginBottom: RH(63),
    marginTop: RH(25),
    ...font('regular', 16),
  },
  btn: {
    width: RW(361),
    height: RH(58),
    borderRadius: RH(29),
    backgroundColor: Colors.red,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: font('regular', 16, '#fff'),
});

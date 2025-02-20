import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Row from '@theme/wrappers/row';
import BackArrowSvg from '@assets/SVG/BackArrowSvg';
import HelpSvg from '@assets/SVG/HelpSvg';
import DotsSvg from '@assets/SVG/DotsSvg';
import {RH, RW, font} from '@theme/utils';
import Colors from '../../theme/colors';
import {useNavigation} from '@react-navigation/native';
import ProfileSvg from '@components/FooterMenu/assets/ProfileSvg';
import {useSelector} from 'react-redux';

const Header = ({title, dots, profile}) => {
  const userId = useSelector(({user}) => user.userId);
  const navigation = useNavigation();
  return (
    <Row style={styles.container}>
      <Pressable
        style={{
          zIndex: 2,
          paddingHorizontal: RW(10),
          paddingVertical: RH(5),
        }}
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          } else {
            navigation.navigate('Home');
          }
        }}>
        <BackArrowSvg />
      </Pressable>

      <View style={styles.titleContainer}>
        <Text allowFontScaling={false} style={styles.title}>
          {title}
        </Text>
      </View>

      <Row style={styles.rightContainer}>
        <Pressable
          style={styles.helpBtn}
          onPress={() => navigation.navigate('Help')}>
          <HelpSvg />
        </Pressable>
        {dots && (
          <Pressable style={{marginLeft: RW(34)}} onPress={() => {}}>
            <DotsSvg />
          </Pressable>
        )}
        {profile && (
          <Pressable
            style={{marginLeft: RW(34)}}
            onPress={() => {
              if (userId) {
                navigation.navigate('Profile');
              } else {
                navigation.navigate('Login');
              }
            }}>
            <ProfileSvg />
          </Pressable>
        )}
      </Row>
    </Row>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: RW(16),
  },
  titleContainer: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
  },
  title: {
    ...font('regular', 16, Colors.black),
    textTransform: 'capitalize',
  },
  helpBtn: {},
  rightContainer: {
    alignSelf: 'flex-end',
  },
});

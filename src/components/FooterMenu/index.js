import {StyleSheet, View, Pressable, Text} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Colors from '@theme/colors';
import Row from '@theme/wrappers/row';
import {RH, RW, font} from '@theme/utils';
import HomeSvg from './assets/HomeSvg';
import ShopSvg from './assets/ShopSvg';
import HaertSvg from '../../assets/SVG/HaertSvg';
import ProfileSvg from './assets/ProfileSvg';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import CompareSvg from './assets/CompareSvg';
export const cartBtnPosition = {};
export const favoriteBtnPosition = {};
export const compareBtnPosition = {};

const FooterMenu = () => {
  const [activePageName, setActivePageName] = useState('Home');
  const userId = useSelector(({user}) => user.userId);
  const {cartCount, favorites, compares} = useSelector(({cart}) => cart);
  const navigation = useNavigation();
  const cartBtnRef = useRef();
  const favoriteBtnRef = useRef();
  const compareBtnRef = useRef();

  useEffect(() => {
    const navigationListener = navigation.addListener('state', state => {
      setActivePageName(
        state?.data?.state?.routes?.[state?.data?.state?.index]?.name,
      );
    });
    return () => {
      navigation.removeListener(navigationListener);
    };
  }, []);
  if (activePageName == 'Profile' || activePageName == 'NoInternet') {
    return null;
  }
  return (
    <Row style={styles.container}>
      <Pressable style={styles.btn} onPress={() => navigation.navigate('Home')}>
        <HomeSvg active={activePageName == 'Home'} />
      </Pressable>
      <Pressable
        style={styles.btn}
        onPress={() => navigation.navigate('Favorites')}
        ref={favoriteBtnRef}
        onLayout={() => {
          favoriteBtnRef?.current?.measure((fx, fy, width, height, px, py) => {
            favoriteBtnPosition.x = px + RW(10);
            favoriteBtnPosition.y = py - RH(5);
          });
        }}>
        {!!favorites?.length && (
          <View
            style={[
              styles.cartCount,
              {
                backgroundColor: Colors.red,
                top: RW(5),
                right: RW(15),
              },
            ]}>
            <Text
              allowFontScaling={false}
              style={[styles.cartCountText, {color: '#fff'}]}>
              {favorites?.length}
            </Text>
          </View>
        )}

        <HaertSvg active={activePageName == 'Favorites' || favorites?.length} />
      </Pressable>
      <View style={styles.shopBtnBorder}>
        <Pressable
          style={({pressed}) => [
            styles.shopBtn,
            {backgroundColor: pressed ? Colors.darkRed : Colors.red},
          ]}
          ref={cartBtnRef}
          onPress={() => navigation.navigate('ShopCart')}
          onLayout={() => {
            cartBtnRef?.current?.measure((fx, fy, width, height, px, py) => {
              cartBtnPosition.x = px + RW(10);
              cartBtnPosition.y = py - RH(5);
            });
          }}>
          {!!cartCount && (
            <View style={styles.cartCount}>
              <Text allowFontScaling={false} style={styles.cartCountText}>
                {cartCount}
              </Text>
            </View>
          )}
          <ShopSvg />
        </Pressable>
      </View>

      <Pressable
        style={styles.btn}
        onPress={() => navigation.navigate('Compare')}
        ref={compareBtnRef}
        onLayout={() => {
          compareBtnRef?.current?.measure((fx, fy, width, height, px, py) => {
            compareBtnPosition.x = px + RW(10);
            compareBtnPosition.y = py - RH(5);
          });
        }}>
        {!!compares?.length && (
          <View
            style={[
              styles.cartCount,
              {
                backgroundColor: Colors.red,
                top: RW(5),
                right: RW(15),
              },
            ]}>
            <Text
              allowFontScaling={false}
              style={[styles.cartCountText, {color: '#fff'}]}>
              {compares?.length}
            </Text>
          </View>
        )}

        <CompareSvg active={activePageName == 'Compare' || compares?.length} />
      </Pressable>
      <Pressable
        style={styles.btn}
        onPress={() => {
          if (userId) {
            navigation.navigate('Profile');
          } else {
            navigation.navigate('Login');
          }
        }}>
        <ProfileSvg active={activePageName == 'Profile'} />
      </Pressable>
    </Row>
  );
};

export default FooterMenu;

const styles = StyleSheet.create({
  container: {
    height: RW(70),
    zIndex: 2,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgb(245, 245, 245)',
    borderTopRightRadius: RW(30),
    borderTopLeftRadius: RW(30),
    shadowColor: 'rgba(0,0,0,0.15)',
    shadowOffset: {
      width: 0,
      height: -RH(5),
    },
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 14,
    justifyContent: 'space-between',
    paddingHorizontal: RW(5),
  },
  shopBtnBorder: {
    backgroundColor: 'rgb(245, 245, 245)',
    width: RW(68),
    height: RW(68),
    borderRadius: RW(34),
    justifyContent: 'center',
    alignItems: 'center',
    top: -RW(20),
    borderColor: 'rgb(235, 235, 235)',
    borderWidth: 1,
  },
  shopBtn: {
    width: RW(56),
    height: RW(56),
    borderRadius: RW(28),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: RW(68),
    alignItems: 'center',
    height: RH(50),
    justifyContent: 'center',
  },
  cartCount: {
    width: RW(15),
    height: RW(15),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: RW(10),
    zIndex: 1,
    top: RW(10),
    right: RW(10),
  },
  cartCountText: {
    ...font('bold', 9, Colors.black),
    textAlign: 'center',
  },
});

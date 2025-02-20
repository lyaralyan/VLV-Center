import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Pressable,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import CloseSvg from '@assets/SVG/CloseSvg';
import HelpSvg from '@assets/SVG/HelpSvg';
import Row from '@theme/wrappers/row';
import {RH, RW, font} from '@theme/utils';
import {useNavigation} from '@react-navigation/native';
import LogoSvg from '@assets/SVG/LogoSvg';
import {
  ComparisonListSvg,
  ExitSvg,
  FavoritesSvg,
  MyAddressesSvg,
  OrderHistorySvg,
  ProfileDetailsSvg,
} from './assets';
import BackArrowSvg from '@assets/SVG/BackArrowSvg';
import ProfileDetails from './components/ProfileDetails';
import MyAddresses from './components/MyAddresses';
import OrderHistory from './components/OrderHistory';
import ComparisonList from './components/ComparisonList';
import Favorites from './components/Favorites';
import {clearUser, getToken, getUserInfo} from '@store/UserSlice';
import {useDispatch, useSelector} from 'react-redux';
import LangCurrency from '@components/LangCurrency';
import {useTranslation} from 'react-i18next';
import {
  getComparePageProducts,
  getFavoritesPageproducts,
  setCompareLoader,
  setFavoriteLoader,
} from '@store/CartSlice';
import LogoEnSvg from '@assets/SVG/LogoEnSvg';
import DeleteSvg from '@assets/SVG/DeleteSvg';
import Colors from '@theme/colors';
import CustomModal from '@components/Modal';
import DeleteAccountModal from './components/DeleteAccountModal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

const Profile = () => {
  const [page, setPage] = useState('MyProfile');
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const currentLanguage = useSelector(({main}) => main.currentLanguage);
  const userInfo = useSelector(({user}) => user.userInfo);

  const navigation = useNavigation();
  const bottomSheetRef = useRef();
  const snapPoints = useMemo(() => ['90%'], []);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const renderBackdrop = React.useCallback(backdropProps => {
    return (
      <BottomSheetBackdrop
        {...backdropProps}
        opacity={0.7}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    );
  }, []);

  const data = [
    {
      Icon: ProfileDetailsSvg,
      text: t('personal_info'),
      navigate: 'ProfileDetails',
    },
    {
      Icon: MyAddressesSvg,
      text: t('my_addresses'),
      navigate: 'MyAddresses',
    },
    {
      Icon: OrderHistorySvg,
      text: t('order_history'),
      navigate: 'OrderHistory',
    },
    {
      Icon: ComparisonListSvg,
      text: t('compare_list'),
      navigate: 'ComparisonList',
      onPress: () => {
        dispatch(setCompareLoader(true));
        dispatch(getComparePageProducts(false));
      },
    },
    {
      Icon: FavoritesSvg,
      text: t('favorites2'),
      navigate: 'Favorites',
      onPress: () => {
        dispatch(setFavoriteLoader(true));
        dispatch(getFavoritesPageproducts(false));
      },
    },
    // {
    //   Icon: BonusesSvg,
    //   text: 'Բոնուսներ',
    // },
    {
      Icon: ExitSvg,
      text: t('logout'), //'Ելք',
      onPress: () => {
        dispatch(clearUser());
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'Home',
            },
          ],
        });
        dispatch(getToken());
      },
    },
    {
      Icon: DeleteSvg,
      text: t('delete_profile'), //'Ելք',
      onPress: () => {
        setShowDeleteAccountModal(true);
      },
      color: Colors.red,
    },
  ];
  useEffect(() => {
    if (!Object.keys(userInfo || {}).length) {
      dispatch(getUserInfo());
    }
  }, [userInfo]);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <Row>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <CloseSvg />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Help')}>
          <HelpSvg />
        </TouchableOpacity>
      </Row>
      <View style={styles.logoContainer}>
        <Text allowFontScaling={false} style={styles.welcomeText}>
          {t('welcome')}
        </Text>
        {currentLanguage == 'hy' ? (
          <LogoSvg width={140} height={45} />
        ) : (
          <LogoEnSvg width={140} height={45} />
        )}
      </View>
      <View style={{marginTop: RH(20)}}>
        <LangCurrency
          modalStyle={{
            left: 0,
          }}
        />
      </View>
      <View style={styles.list}>
        {data.map(({Icon, text, navigate, onPress, color = '#000'}, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              if (navigate) {
                setPage(navigate);

                setTimeout(() => {
                  if (bottomSheetRef.current) {
                    bottomSheetRef.current.expand();
                  } else {
                    console.warn('BottomSheet reference is undefined');
                  }
                }, 200); // Delay to ensure ref initialization
              }
              if (onPress) {
                onPress();
              }
            }}>
            <Row style={styles.row}>
              <View style={styles.leftBlock}>
                <Icon color={color} />
                <Text
                  allowFontScaling={false}
                  style={[styles.text, {color: color}]}>
                  {text}
                </Text>
              </View>
              <View style={styles.arrow}>
                <BackArrowSvg color={color} height={10} />
              </View>
            </Row>
            {data.length - 1 !== index && <View style={styles.line} />}
          </TouchableOpacity>
        ))}
      </View>
      <CustomModal
        visible={showDeleteAccountModal}
        dismiss={() => {
          setShowDeleteAccountModal(false);
        }}>
        <DeleteAccountModal
          dismiss={() => {
            setShowDeleteAccountModal(false);
          }}
        />
      </CustomModal>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}>
        <BottomSheetView style={{flex: 1}}>
          {page === 'ProfileDetails' ? (
            <ProfileDetails />
          ) : page === 'MyAddresses' ? (
            <MyAddresses />
          ) : page === 'OrderHistory' ? (
            <OrderHistory />
          ) : page === 'ComparisonList' ? (
            <ComparisonList />
          ) : page === 'Favorites' ? (
            <Favorites />
          ) : null}
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: RW(15),
  },
  logoContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    ...font('medium', 22),
    marginBottom: RH(10),
  },
  list: {
    marginVertical: RH(20),
  },
  row: {
    paddingHorizontal: RW(10),
    alignItems: 'center',
    paddingVertical: RH(20),
  },
  leftBlock: {
    flexDirection: 'row',
    columnGap: RW(20),
    alignItems: 'center',
  },
  text: font('regular', 16),
  arrow: {
    transform: 'rotate(180deg)',
    paddingHorizontal: RW(10),
    paddingVertical: RH(5),
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(40, 40, 40, 0.10)',
  },
});

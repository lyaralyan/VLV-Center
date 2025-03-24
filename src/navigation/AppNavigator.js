import React from 'react';
import {
  Home,
  ShopCart,
  Login,
  SignUp,
  ForgotPassword,
  ProductPage,
  CatalogPage,
  SearchPage,
  Sales,
  Profile,
  Sale1,
  Sale2,
  Sale3,
  Sale4,
  Help,
} from '../screens';
import {DefaultTheme} from '@react-navigation/native';
import NoInternet from '@screens/NoInternet';
import ForgotPassword2 from '@screens/Auth/ForgotPassword2';
import SearchNull from '@screens/Search/screens/SearchNull';
import CategoryPage from '@screens/Search/screens/CategoryPage';
import Favorites from '@screens/Favorites';
import Compare from '@screens/Compare';
import Brands from '@screens/Brands';
import Hisense from '@screens/Hisense';
import Toshiba from '@screens/Toshiba';
import Samsung from '@screens/Samsung';
import Vikass from '@screens/Vikass';
import ForgotPassword3 from '@screens/Auth/ForgotPassword3';
import AboutUs from '@screens/AboutUs';
import Contact from '@screens/Contact';
import Credit from '@screens/Credit';
import Delivery from '@screens/Delivery';
import Job from '@screens/Job';
import Payment from '@screens/Payment';
import FAQ from '@screens/FAQ';
import Service from '@screens/Service';
import Privacy from '@screens/Privacy';
import CartOrder from '@screens/ShopCart/components/CartOrder';
import AgreementInfo from '@screens/ShopCart/components/AgreementInfo';
import BankTransfer from '@screens/ShopCart/components/BankTransfer';
import BrandCategoriesPage from '@screens/BrandCategoriesPage';
import OTP from '@screens/Auth/OTP';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const navTheme = DefaultTheme;
  navTheme.colors.background = '#fff';
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'ios_from_right',
      }}>
      <Stack.Screen name={'Home'} component={Home} />
      <Stack.Screen name={'NoInternet'} component={NoInternet} />
      <Stack.Screen name={'ShopCart'} component={ShopCart} />
      <Stack.Screen name={'CartOrder'} component={CartOrder} />
      <Stack.Screen name={'AgreementInfo'} component={AgreementInfo} />
      <Stack.Screen name={'BankTransfer'} component={BankTransfer} />
      <Stack.Screen name={'Login'} component={Login} />
      <Stack.Screen name={'ForgotPassword'} component={ForgotPassword} />
      <Stack.Screen name={'ForgotPassword2'} component={ForgotPassword2} />
      <Stack.Screen name={'ForgotPassword3'} component={ForgotPassword3} />
      <Stack.Screen name={'SignUp'} component={SignUp} />
      <Stack.Screen name={'OTP'} component={OTP} />
      <Stack.Screen name={'ProductPage'} component={ProductPage} />
      <Stack.Screen name={'CatalogPage'} component={CatalogPage} />
      <Stack.Screen name={'CategoryPage'} component={CategoryPage} />
      <Stack.Screen name={'SearchPage'} component={SearchPage} />
      <Stack.Screen name={'SearchNull'} component={SearchNull} />
      <Stack.Screen name={'Sales'} component={Sales} />
      <Stack.Screen name={'Sale1'} component={Sale1} />
      <Stack.Screen name={'Sale2'} component={Sale2} />
      <Stack.Screen name={'Sale3'} component={Sale3} />
      <Stack.Screen name={'Sale4'} component={Sale4} />
      <Stack.Screen name={'Profile'} component={Profile} />
      <Stack.Screen name={'Help'} component={Help} />
      <Stack.Screen name={'Favorites'} component={Favorites} />
      <Stack.Screen name={'Compare'} component={Compare} />
      <Stack.Screen name={'Brands'} component={Brands} />
      <Stack.Screen
        name={'BrandCategoriesPage'}
        component={BrandCategoriesPage}
      />
      <Stack.Screen name={'Hisense'} component={Hisense} />
      <Stack.Screen name={'Toshiba'} component={Toshiba} />
      <Stack.Screen name={'Samsung'} component={Samsung} />
      <Stack.Screen name={'Vikass'} component={Vikass} />
      <Stack.Screen name={'AboutUs'} component={AboutUs} />
      <Stack.Screen name={'Contact'} component={Contact} />
      <Stack.Screen name={'Payment'} component={Payment} />
      <Stack.Screen name={'Credit'} component={Credit} />
      <Stack.Screen name={'FAQ'} component={FAQ} />
      <Stack.Screen name={'Job'} component={Job} />
      <Stack.Screen name={'Delivery'} component={Delivery} />
      <Stack.Screen name={'Service'} component={Service} />
      <Stack.Screen name={'Privacy'} component={Privacy} />
    </Stack.Navigator>
  );
};
export default AppNavigator;

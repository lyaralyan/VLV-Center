import {Linking} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {getStateFromPath} from '@react-navigation/native';

export default {
  prefixes: ['vlvapp://', 'https://vlvapp.com'],
  config: {
    screens: {
      Home: {
        path: 'Home',
      },
      NoInternet: {
        path: 'NoInternet',
      },
      ShopCart: {
        path: 'ShopCart',
      },
      CartOrder: {
        path: 'CartOrder',
      },
      AgreementInfo: {
        path: 'AgreementInfo',
      },
      BankTransfer: {
        path: 'BankTransfer',
      },
      Login: {
        path: 'Login',
      },
      ForgotPassword: {
        path: 'ForgotPassword',
      },
      SignUp: {
        path: 'SignUp',
      },
      ProductPage: {
        path: 'ProductPage',
      },
      CatalogPage: {
        path: 'CatalogPage',
      },
      SearchPage: {
        path: 'SearchPage',
      },
      SearchNull: {
        path: 'SearchNull',
      },
      Sales: {
        path: 'Sales',
      },
      Sale1: {
        path: 'Sale1',
      },
      Sale2: {
        path: 'Sale2',
      },
      Sale3: {
        path: 'Sale3',
      },
      Sale4: {
        path: 'Sale4',
      },
      Profile: {
        path: 'Profile',
      },
      Help: {
        path: 'Help',
      },
      Favorites: {
        path: 'Favorites',
      },
      Compare: {
        path: 'Compare',
      },
      Brands: {
        path: 'Brands',
      },
      BrandCategoriesPage: {
        path: 'BrandCategoriesPage',
      },
      Samsung: {
        path: 'Samsung',
      },
      Hisense: {
        path: 'Hisense',
      },
      Toshiba: {
        path: 'Toshiba',
      },
      Vikass: {
        path: 'Vikass',
      },
      AboutUs: {
        path: 'AboutUs',
      },
      Contact: {
        path: 'Contact',
      },
      Payment: {
        path: 'Payment',
      },
      Credit: {
        path: 'Credit',
      },
      FAQ: {
        path: 'FAQ',
      },
      Job: {
        path: 'Job',
      },
      Delivery: {
        path: 'Delivery',
      },
      Service: {
        path: 'Service',
      },
      Privacy: {
        path: 'Privacy',
      },
    },
  },
  async getInitialURL(e) {
    // Check if app was opened from a deep link
    const url = await Linking.getInitialURL();
    if (url != null) {
      return url;
    }

    // Check if there is an initial firebase notification
    // const message = await messaging().getInitialNotification();

    // Get the `url` property from the notification which corresponds to a screen
    // This property needs to be set on the notification payload when sending it
    // return message?.data?.url;
  },

  subscribe(listener) {
    const onReceiveURL = ({url, ...e}) => {
      listener(url);
    };

    // Listen to incoming links from deep linking
    const subscription = Linking.addEventListener('url', onReceiveURL);

    // Listen to firebase push notifications
    // const unsubscribeNotification = messaging().onNotificationOpenedApp(
    //   message => {
    //     const url = message.data?.url;

    //     if (url) {
    //       // Any custom logic to check whether the URL needs to be handled
    //       //...

    //       // Call the listener to let React Navigation handle the URL
    //       listener(url);
    //     }
    //   },
    // );

    return () => {
      // Clean up the event listeners
      subscription.remove();
      // unsubscribeNotification();
    };
  },
};

import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {postPushNotificationToken} from '@store/MainSlice';
import {PermissionsAndroid, Platform} from 'react-native';

const requestUserPermission = async () => {
  if (Platform.OS == 'android') {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    ).then(e => {
      if (!e) {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      }
    });
  }

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    getFcmToken();
  }
};
const getFcmToken = async () => {
  const fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
    try {
      let fcmToken = await messaging().getToken();
      if (fcmToken) {
        postPushNotificationToken(fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {
      console.error('Error rasied in fcmToken', error);
    }
  }
};

const notificationListener = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.info(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });
  messaging().setBackgroundMessageHandler(e => {
    console.info('setBackgroundMessageHandler', e);
  });
  messaging().onMessage(async remoteMessage => {
    console.info('Recived in foreground', remoteMessage);
    // alert(remoteMessage?.notification?.title);
  });
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.info(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
};

export {requestUserPermission, notificationListener};

import Colors from '@theme/colors';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  Linking,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import VersionCheck from 'react-native-version-check';

const APP_STORE_URL = 'https://apps.apple.com/am/app/vlv-centre/id6476923086';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.vlv';
const UpdateModal = () => {
  const [visible, setVisible] = useState(false);
  const [storeUrl, setStoreUrl] = useState('');

  useEffect(() => {
    const checkForUpdate = async () => {
      try {
        const latestVersion = await VersionCheck.getLatestVersion();
        const currentVersion = VersionCheck.getCurrentVersion();
        const updateNeeded = await VersionCheck.needUpdate({
          currentVersion,
          latestVersion,
        });

        if (updateNeeded?.isNeeded) {
          const url = await VersionCheck.getStoreUrl();

          if (url) {
            setStoreUrl(
              url || (Platform.OS === 'ios' ? APP_STORE_URL : PLAY_STORE_URL),
            ); // Use fallback URL

            setVisible(true);
          } else {
            console.warn(
              '⚠️ Store URL is empty. Check if the app is published.',
            );
          }
        }
      } catch (error) {
        console.error('Update check failed:', error);
      }
    };

    checkForUpdate();
  }, []);

  const handleUpdatePress = () => {
    if (storeUrl) {
      Linking.openURL(storeUrl); // Բացում ենք App Store կամ Google Play
    }
    setVisible(false); // Փակում ենք մոդալը
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Նոր տարբերակ հասանելի է!</Text>
          <Text style={styles.description}>
            Խնդրում ենք թարմացնել հավելվածը լավագույն փորձառության համար։
          </Text>
          <Image source={require('./splash.png')} style={styles.logo} />
          <Image source={require('./Update.png')} style={styles.updateImage} />
          <Text style={styles.text}>Հավելվածը թարմացնելը պարտադիր է</Text>
          <TouchableOpacity onPress={handleUpdatePress} style={styles.button}>
            <Text style={styles.buttonText}>Թարմացնել</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },

  button: {
    width: '80%',
    height: 56,
    backgroundColor: Colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  logo: {
    width: 118,
    height: 41,
    marginBottom: 98,
  },
  updateImage: {
    width: 269,
    height: 269,
  },
  text: {
    fontSize: 26,
    color: Colors.DARK,
    textAlign: 'center',
    marginTop: 23,
    marginBottom: 29,
  },
});

export default UpdateModal;

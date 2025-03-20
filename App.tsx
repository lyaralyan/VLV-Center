import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import MyApp from './src';
import './src/translations/i18n';
import Toast from 'react-native-toast-message';
import LinkingConfig from '@navigation/LinkingConfig';
import useAppAnalytics from '@helpers/useAppAnalytics';
import Loader from '@components/Loader';
import InnerLoader from '@components/InnerLoader';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {store} from '@store/store';
import {StyleSheet} from 'react-native';
import UpdateModal from '@components/UpdateModal/UpdateModal';

export default function App() {
  useAppAnalytics();
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <Provider store={store}>
          <UpdateModal />
          <Loader>
            <InnerLoader>
              <NavigationContainer
                linking={LinkingConfig}
                onStateChange={state => {
                  if (!state) {
                    return;
                  }
                  const currentRouteName = state.routes[state.index]?.name;
                  console.log('Current Screen:', currentRouteName);
                }}>
                <MyApp />
                <Toast />
              </NavigationContainer>
            </InnerLoader>
          </Loader>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});

import {AppState} from 'react-native';
import {useEffect} from 'react';
import {sendUserAnalystics} from '@store/MainSlice';
let startTime = new Date();
const useAppAnalytics = () => {
  const handleAppStateChange = nextAppState => {
    if (nextAppState === 'active') {
      startTime = new Date();
    } else if (nextAppState === 'inactive') {
      if (startTime) {
        const endTime = new Date();
        const usageTimeSeconds = (endTime - startTime) / 1000; // Calculate usage time in seconds
        startTime = null;
        sendUserAnalystics();
      }
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return null;
};

export default useAppAnalytics;

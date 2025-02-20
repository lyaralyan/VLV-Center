import axios from 'axios';
import {SERVER_URL} from '@env';
// import {getUniqueId} from 'react-native-device-info';

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(
  async config => {
    config.headers.Accept = '*/*';
    config.headers['Content-Type'] = 'application/json; charset=utf-8';
    config.baseURL = SERVER_URL;
    return config;
  },
  error => {
    console.warn('axiosInstance error', error);
    return Promise.reject(error);
  },
);
export default axiosInstance;

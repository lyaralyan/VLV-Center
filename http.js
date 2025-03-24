import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SERVER_URL} from '@env';

export class Http {
  static async getAuthToken() {
    try {
      const authUserString = await AsyncStorage.getItem('_token');
      if (authUserString) {
        return authUserString || null;
      }
    } catch (e) {
      console.error('Failed to retrieve authUser:', e);
    }
    return null;
  }

  static async request(
    url,
    method = 'GET',
    headers = {},
    data = null,
    customBaseUrl = null,
  ) {
    // const authToken = await Http.getAuthToken();

    const instance = axios.create({
      baseURL: customBaseUrl || SERVER_URL, // Use custom URL if provided, else default
      headers: {
        'Content-Type': 'application/json',
        // ...(authToken && {Authorization: `Bearer ${authToken}`}),
        ...headers,
      },
    });

    try {
      const response = await instance({
        url,
        method,
        data: data || {},
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  }

  static get(url, headers = {}, customBaseUrl = null) {
    return Http.request(url, 'GET', headers, null, customBaseUrl);
  }

  static post(url, headers = {}, data = {}, customBaseUrl = null) {
    return Http.request(url, 'POST', headers, data, customBaseUrl);
  }

  static put(url, headers = {}, data = {}, customBaseUrl = null) {
    return Http.request(url, 'PUT', headers, data, customBaseUrl);
  }

  static patch(url, headers = {}, data = {}, customBaseUrl = null) {
    return Http.request(url, 'PATCH', headers, data, customBaseUrl);
  }

  static delete(url, headers = {}, customBaseUrl = null) {
    return Http.request(url, 'DELETE', headers, null, customBaseUrl);
  }
}

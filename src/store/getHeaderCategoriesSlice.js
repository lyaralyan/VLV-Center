import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Http} from '../../http';
import {LOGIN, PASSWORD, TOKEN} from '@env';
import {getUniqueId} from 'react-native-device-info';
const initialState = {
  getHeaderCategoriesLoader: false,
  headerCategories: [],
};

export const getHeaderCategoriesRequest = createAsyncThunk(
  'getHeaderCategories/getHeaderCategoriesRequest',
  async (_, {rejectWithValue}) => {
    try {
      const response = await Http.post('header-category', undefined, {
        'Device-ID': await getUniqueId(),
        login: LOGIN,
        password: PASSWORD,
        token: TOKEN,
      });

      return response;
    } catch (error) {
      return rejectWithValue({
        error: error.response?.data || 'An error occurred',
      });
    }
  },
);

const getHeaderCategoriesSlice = createSlice({
  name: 'getHeaderCategories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getHeaderCategoriesRequest.pending, state => {
        state.getHeaderCategoriesLoader = true;
      })
      .addCase(getHeaderCategoriesRequest.fulfilled, (state, {payload}) => {
        state.getHeaderCategoriesLoader = false;
        state.headerCategories = [...payload.Category, ...payload.Brand];
      })
      .addCase(getHeaderCategoriesRequest.rejected, state => {
        state.getHeaderCategoriesLoader = false;
      });
  },
});

export default getHeaderCategoriesSlice.reducer;

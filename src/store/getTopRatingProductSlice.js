import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Http} from '../../http';
import {LOGIN, PASSWORD, TOKEN} from '@env';
import {getUniqueId} from 'react-native-device-info';
const initialState = {
  getTopRatingProductLoader: false,
  topRatingProduct: [],
};

export const getTopRatingProductRequest = createAsyncThunk(
  'getTopRatingProduct/getTopRatingProductRequest',
  async (_, {rejectWithValue}) => {
    try {
      const response = await Http.post('top-rating-product', undefined, {
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

const getTopRatingProductSlice = createSlice({
  name: 'getTopRatingProduct',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTopRatingProductRequest.pending, state => {
        state.getTopRatingProductLoader = true;
      })
      .addCase(getTopRatingProductRequest.fulfilled, (state, {payload}) => {
        state.getTopRatingProductLoader = false;
        state.topRatingProduct = payload?.topRatingProduct;
      })
      .addCase(getTopRatingProductRequest.rejected, state => {
        state.getTopRatingProductLoader = false;
      });
  },
});

export default getTopRatingProductSlice.reducer;

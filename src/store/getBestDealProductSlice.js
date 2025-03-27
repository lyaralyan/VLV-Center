import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Http} from '../../http';
import {LOGIN, PASSWORD, TOKEN} from '@env';
import {getUniqueId} from 'react-native-device-info';
const initialState = {
  bestDealProductLoader: false,
  bestDealProduct: [],
};

export const getBestDealProductRequest = createAsyncThunk(
  'getBestDealProduct/getBestDealProductRequest',
  async (_, {rejectWithValue}) => {
    try {
      const response = await Http.post('best-deal-product', undefined, {
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

const getBestDealProductSlice = createSlice({
  name: 'getBestDealProduct',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getBestDealProductRequest.pending, state => {
        state.bestDealProductLoader = true;
      })
      .addCase(getBestDealProductRequest.fulfilled, (state, {payload}) => {
        state.bestDealProductLoader = false;
        state.bestDealProduct = payload?.bestDealProduct;
      })
      .addCase(getBestDealProductRequest.rejected, state => {
        state.bestDealProductLoader = false;
      });
  },
});

export default getBestDealProductSlice.reducer;

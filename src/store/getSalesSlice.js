import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Http} from '../../http';
import {LOGIN, PASSWORD, TOKEN} from '@env';
import {getUniqueId} from 'react-native-device-info';
const initialState = {
  getSalesLoader: false,
  sales: [],
};

export const getSalesRequest = createAsyncThunk(
  'getSales/getSalesRequest',
  async (_, {rejectWithValue}) => {
    try {
      const response = await Http.post('sales', undefined, {
        'Device-ID': getUniqueId(),
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

const getSalesSlice = createSlice({
  name: 'getSales',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getSalesRequest.pending, state => {
        state.getSalesLoader = true;
      })
      .addCase(getSalesRequest.fulfilled, (state, {payload}) => {
        state.getSalesLoader = false;
        state.sales = payload?.sales;
      })
      .addCase(getSalesRequest.rejected, state => {
        state.getSalesLoader = false;
      });
  },
});

export default getSalesSlice.reducer;

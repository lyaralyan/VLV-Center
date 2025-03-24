import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Http} from '../../http';
import {LOGIN, PASSWORD, TOKEN} from '@env';
import {getUniqueId} from 'react-native-device-info';
const initialState = {
  getBrandsLoader: false,
  brands: [],
};

export const getBrandsRequest = createAsyncThunk(
  'getBrands/getBrandsRequest',
  async (_, {rejectWithValue}) => {
    try {
      const response = await Http.post(
        `brand?Device-ID=${getUniqueId()}`,
        undefined,
        {
          'Device-ID': getUniqueId(),
          login: LOGIN,
          password: PASSWORD,
          token: TOKEN,
        },
      );

      return response;
    } catch (error) {
      return rejectWithValue({
        error: error.response?.data || 'An error occurred',
      });
    }
  },
);

const getBrandsSlice = createSlice({
  name: 'getBrands',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getBrandsRequest.pending, state => {
        state.getBrandsLoader = true;
      })
      .addCase(getBrandsRequest.fulfilled, (state, {payload}) => {
        state.getBrandsLoader = false;
        state.brands = payload?.Brand;
      })
      .addCase(getBrandsRequest.rejected, state => {
        state.getBrandsLoader = false;
      });
  },
});

export default getBrandsSlice.reducer;

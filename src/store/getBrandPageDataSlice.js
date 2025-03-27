import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Http} from '../../http';
import {LOGIN, PASSWORD, TOKEN} from '@env';
import {getUniqueId} from 'react-native-device-info';
const initialState = {
  getBrandPageDataLoader: false,
  hisense: {},
  vikass: {},
  toshiba: {},
  samsung: {},
};

export const getBrandPageDataRequest = createAsyncThunk(
  'getBrandPageData/getBrandPageDataRequest',
  async (slug, {rejectWithValue}) => {
    try {
      const response = await Http.post(`brand/${slug}`, undefined, {
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

const getBrandPageDataSlice = createSlice({
  name: 'getBrandPageData',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getBrandPageDataRequest.pending, state => {
        state.getBrandPageDataLoader = true;
      })
      .addCase(getBrandPageDataRequest.fulfilled, (state, {payload}) => {
        state.getBrandPageDataLoader = false;
        state.hisense = payload;
        state.vikass = payload;
        state.samsung = payload;
        state.toshiba = payload;
      })
      .addCase(getBrandPageDataRequest.rejected, state => {
        state.getBrandPageDataLoader = false;
      });
  },
});

export default getBrandPageDataSlice.reducer;

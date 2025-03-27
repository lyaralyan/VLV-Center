import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Http} from '../../http';
import {LOGIN, PASSWORD, TOKEN} from '@env';
import {getUniqueId} from 'react-native-device-info';
const initialState = {
  bannerSlidersLoader: false,
  bannerSliders: [],
};

export const getBannerSlidersRequest = createAsyncThunk(
  'getBannerSliders/getBannerSlidersRequest',
  async (_, {rejectWithValue}) => {
    try {
      const response = await Http.post('baner-slider', undefined, {
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

const getBannerSlidersSlice = createSlice({
  name: 'getBannerSliders',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getBannerSlidersRequest.pending, state => {
        state.bannerSlidersLoader = true;
      })
      .addCase(getBannerSlidersRequest.fulfilled, (state, {payload}) => {
        state.bannerSlidersLoader = false;
        state.bannerSliders = payload?.banerSlider;
      })
      .addCase(getBannerSlidersRequest.rejected, state => {
        state.bannerSlidersLoader = false;
      });
  },
});

export default getBannerSlidersSlice.reducer;

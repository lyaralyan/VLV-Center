import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Http} from '../../http';
import {LOGIN, PASSWORD, TOKEN} from '@env';
import {getUniqueId} from 'react-native-device-info';
const initialState = {
  headerSliderLoader: false,
  headerSlider: [],
};

export const getHeaderSliderRequest = createAsyncThunk(
  'getHeaderSlider/getHeaderSliderRequest',
  async (_, {rejectWithValue}) => {
    try {
      const response = await Http.post('header-slider', undefined, {
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

const getHeaderSliderSlice = createSlice({
  name: 'getHeaderSlider',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getHeaderSliderRequest.pending, state => {
        state.headerSliderLoader = true;
      })
      .addCase(getHeaderSliderRequest.fulfilled, (state, {payload}) => {
        state.headerSliderLoader = false;
        state.headerSlider = payload?.Sliders;
      })
      .addCase(getHeaderSliderRequest.rejected, state => {
        state.headerSliderLoader = false;
      });
  },
});

export default getHeaderSliderSlice.reducer;

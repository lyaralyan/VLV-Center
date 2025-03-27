import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Http} from '../../http';
import {LOGIN, PASSWORD, TOKEN} from '@env';
import {getUniqueId} from 'react-native-device-info';
const initialState = {
  getThreeInOneLoader: false,
  threeInOne: [],
};

export const getThreeInOneRequest = createAsyncThunk(
  'getThreeInOne/getThreeInOneRequest',
  async (_, {rejectWithValue}) => {
    try {
      const response = await Http.post('three-in-one', undefined, {
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

const getThreeInOneSlice = createSlice({
  name: 'getThreeInOne',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getThreeInOneRequest.pending, state => {
        state.getThreeInOneLoader = true;
      })
      .addCase(getThreeInOneRequest.fulfilled, (state, {payload}) => {
        state.getThreeInOneLoader = false;
        state.threeInOne = payload;
      })
      .addCase(getThreeInOneRequest.rejected, state => {
        state.getThreeInOneLoader = false;
      });
  },
});

export default getThreeInOneSlice.reducer;

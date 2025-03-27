import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Http} from '../../http';
import {LOGIN, PASSWORD, TOKEN} from '@env';
import {getUniqueId} from 'react-native-device-info';
import Toast from 'react-native-toast-message';
const initialState = {
  getAllBrandsLoader: false,
  allBrands: [],
};

export const getAllBrandsRequest = createAsyncThunk(
  'getAllBrands/getAllBrandsRequest',
  async (_, {rejectWithValue}) => {
    try {
      const response = await Http.post('brands/all', undefined, {
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

const getAllBrandsSlice = createSlice({
  name: 'getAllBrands',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllBrandsRequest.pending, state => {
        state.getAllBrandsLoader = true;
      })
      .addCase(getAllBrandsRequest.fulfilled, (state, {payload}) => {
        state.getAllBrandsLoader = false;
        state.allBrands = payload?.Brand;
      })
      .addCase(getAllBrandsRequest.rejected, (state, {payload}) => {
        state.getAllBrandsLoader = false;
        Toast.show({
          type: 'error',
          text1: payload.err,
        });
      });
  },
});

export default getAllBrandsSlice.reducer;

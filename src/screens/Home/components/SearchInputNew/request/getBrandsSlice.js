import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Http} from '../../../../../../http';

const initialState = {
  getBrandsLoader: false,
  getBrandsData: {
    brand_categories: [],
    brand_info: {id: Number()},
    brand_page_slider: [],
  },
};

export const getBrandsRequest = createAsyncThunk(
  'getBrands/getBrandsRequest',
  async ({brand}, {rejectWithValue}) => {
    try {
      const response = await Http.post(`brand/categories/${brand}`);
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
        state.getBrandsData = payload;
      })
      .addCase(getBrandsRequest.rejected, state => {
        state.getBrandsLoader = false;
      });
  },
});

export default getBrandsSlice.reducer;

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Http} from '../../../../../../http';

const initialState = {
  getBrandLoader: false,
  getBrandData: {
    brand_categories: [],
    brand_info: {id: Number()},
    brand_page_slider: [],
  },
};

export const getBrandRequest = createAsyncThunk(
  'getBrand/getBrandRequest',
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

const getBrandSlice = createSlice({
  name: 'getBrand',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getBrandRequest.pending, state => {
        state.getBrandLoader = true;
      })
      .addCase(getBrandRequest.fulfilled, (state, {payload}) => {
        state.getBrandLoader = false;
        state.getBrandData = payload;
      })
      .addCase(getBrandRequest.rejected, state => {
        state.getBrandLoader = false;
      });
  },
});

export default getBrandSlice.reducer;

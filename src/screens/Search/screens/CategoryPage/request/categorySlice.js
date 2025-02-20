import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Http} from '../../../../../../http';

const initialState = {
  category: {},
  loading: false,
};

export const categoryRequest = createAsyncThunk(
  'category/categoryRequest',
  async ({slug}, {rejectWithValue}) => {
    try {
      const response = await Http.post(
        `category/${slug}`,
        undefined,
        {
          slug: slug,
          login: process.env.LOGIN,
          password: process.env.PASSWORD,
          token: process.env.TOKEN,
        },
        'https://v1.vlv.am/api/',
      );

      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  },
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(categoryRequest.pending, state => {
        state.loading = true;
      })
      .addCase(categoryRequest.fulfilled, (state, {payload}) => {
        state.category = payload;

        state.loading = false;
      })
      .addCase(categoryRequest.rejected, state => {
        state.loading = false;
      });
  },
});

export default categorySlice.reducer;

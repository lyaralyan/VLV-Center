import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Http} from '../../../../../../http';

const initialState = {
  search: [],
  loading: false,
  searchValue: '',
};

export const searchRequest = createAsyncThunk(
  'search/searchRequest',
  async ({keyword}, {rejectWithValue}) => {
    try {
      const response = await Http.post(
        'search',
        {},
        {keyword},
        'https://v1.vlv.am/api/',
      );

      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  },
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue: (state, {payload}) => {
      state.searchValue = payload;
    },
    clearSearchData: state => {
      state.searchData = {
        brand: {id: null, slug: null, name: null, logo: null},
        category: {slug: '', logo: '', name_hy: ''},
        search: false,
        products: [],
        li_product_id: '',
        product_id: '',
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(searchRequest.pending, state => {
        state.loading = true;
      })
      .addCase(searchRequest.fulfilled, (state, {payload}) => {
        // const {data} = payload;
        state.search = payload;
        state.loading = false;
      })
      .addCase(searchRequest.rejected, state => {
        state.loading = false;
      });
  },
});

export default searchSlice.reducer;
export const {clearSearchData, setSearchValue} = searchSlice.actions;

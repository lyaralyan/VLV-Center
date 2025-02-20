import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Http} from '../../../../../../http';

const initialState = {
  getCategoryWithSlugLoader: false,
  getCategoryWithSlugData: {
    filters: [],
    products: [],
    productCount: 0,
    category: {id: 0, name_hy: '', slug: '', children: []},
    category_list: [{id: 0, name_hy: '', slug: '', children: []}],
    totalPages: 0,
    maxPrice: '',
    minPrice: '',
    brandList: [],
    originalMaxPrice: '',
    originalMinPrice: '',
  },
};

export const getCategoryWithSlugRequest = createAsyncThunk(
  'getCategoryWithSlug/getCategoryWithSlugRequest',
  async (
    {
      slug,
      page,
      sort_by,
      discount,
      minPrice,
      maxPrice,
      brand,
      manufacture,
      searchInfo,
      searchText,
      search,
      fs,
    },
    {rejectWithValue, getState},
  ) => {
    const concatSelected = manufacture
      .filter(a => a.attribute_id) // Ensure attribute_id exists
      .flatMap(a => a.values.map(el => `${a.attribute_id}_${el.id}`))
      .join(',');

    const deviceId = getState()?.filterSlice?.deviceId;

    const state = getState()?.getCategoryWithSlugSlice?.getCategoryWithSlugData;
    const mx = state?.maxPrice;
    const mn = state?.minPrice;

    const payload = {};
    if (slug) {
      payload.slug = slug;
    }
    if (page) {
      payload.page = page;
    }
    if (sort_by) {
      payload.s = sort_by;
    }
    if (discount) {
      payload.d = discount;
    }
    if (minPrice !== mn && minPrice !== '') {
      payload.mn = minPrice;
    }
    if (maxPrice !== mx && maxPrice !== '') {
      payload.mx = maxPrice;
    }
    if (searchInfo) {
      payload.searchInfo = searchInfo;
    }
    if (searchText) {
      payload.searchText = searchText;
    }
    if (search) {
      payload.search = search;
    }
    if (fs) {
      payload.fs = fs;
    }
    if (brand && brand.length > 0) {
      payload.b = brand.flatMap(b => b.id).join(',');
    }
    payload.session_id = deviceId;

    console.log('📢 [getCategoryWithSlugSlice.js:89]', payload, 'payload');
    if (concatSelected) {
      payload.a = concatSelected;
    }

    try {
      const response = await Http.post(
        `category/${slug}`,
        undefined,
        payload,
        'https://v1.vlv.am/api/',
      );
      console.log('📢 [getCategoryWithSlugSlice.js:99]', response, 'response');
      return response;
    } catch (error) {
      console.error(
        '📢 [getCategoryWithSlugSlice.js:102]',
        error.response.data,
        'error.response.data',
      );
      return rejectWithValue({
        error: error.response?.data || 'An error occurred',
      });
    }
  },
);

const getCategoryWithSlugSlice = createSlice({
  name: 'getCategoryWithSlug',
  initialState,
  reducers: {
    clearFilterData: state => {
      state.getCategoryWithSlugData = {
        filters: [],
        products: [],
        productCount: 0,
        category: {id: 0, name_hy: '', slug: '', children: []},
        category_list: [{id: 0, name_hy: '', slug: '', children: []}],
        totalPages: 0,
        maxPrice: '',
        minPrice: '',
        brandList: [],
        originalMaxPrice: '',
        originalMinPrice: '',
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCategoryWithSlugRequest.pending, state => {
        state.getCategoryWithSlugLoader = true;
      })
      .addCase(getCategoryWithSlugRequest.fulfilled, (state, {payload}) => {
        state.getCategoryWithSlugLoader = false;
        const {
          filters,
          products,
          productCount,
          category,
          totalPages,
          maxPrice,
          minPrice,
          brandList,
          category_list,
          originalMaxPrice,
          originalMinPrice,
        } = payload;
        state.getCategoryWithSlugData = {
          filters,
          products,
          productCount,
          category,
          totalPages,
          maxPrice,
          minPrice,
          brandList,
          category_list,
          originalMaxPrice,
          originalMinPrice,
        };
      })
      .addCase(getCategoryWithSlugRequest.rejected, state => {
        state.getCategoryWithSlugLoader = false;
      });
  },
});

export default getCategoryWithSlugSlice.reducer;
export const {clearFilterData} = getCategoryWithSlugSlice.actions;

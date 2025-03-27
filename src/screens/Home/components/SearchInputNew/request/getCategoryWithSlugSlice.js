import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Http} from '../../../../../../http';
import {getUniqueId} from 'react-native-device-info';

const initialState = {
  getCategoryWithSlugLoader: false,
  getCategoryWithSlugData: {},
};

export const getCategoryWithSlugRequest = createAsyncThunk(
  'getCategoryWithSlug/getCategoryWithSlugRequest',
  async (
    {
      slug,
      page,
      p,
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
      ct,
      sh,
      dynamic = false,
    },
    {rejectWithValue, getState},
  ) => {
    const concatSelected = manufacture
      .filter(a => a.attribute_id) // Ensure attribute_id exists
      .flatMap(a => a.values.map(el => `${a.attribute_id}_${el.id}`))
      .join(',');

    const deviceId = await getUniqueId();

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
    if (p) {
      payload.p = p;
    }
    if (sh) {
      payload.sh = sh;
    }
    if (sort_by) {
      payload.s = sort_by.value;
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
    if (ct && ct.length > 0) {
      payload.ct = ct.flatMap(c => c.id).join(',');
    }
    payload.session_id = deviceId;

    if (concatSelected) {
      payload.a = concatSelected;
    }

    try {
      const response = await Http.post(
        dynamic
          ? `/page/search/${slug}`
          : `category/${slug}?deviceId=${await getUniqueId()}`,
        {
          deviceId: await getUniqueId(),
        },
        payload,
        'https://v1.vlv.am/api/',
      );

      return response;
    } catch (error) {
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
      state.getCategoryWithSlugData = {};
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCategoryWithSlugRequest.pending, state => {
        state.getCategoryWithSlugLoader = true;
      })
      .addCase(getCategoryWithSlugRequest.fulfilled, (state, {payload}) => {
        state.getCategoryWithSlugLoader = false;
        state.getCategoryWithSlugData = payload;
      })
      .addCase(getCategoryWithSlugRequest.rejected, state => {
        state.getCategoryWithSlugLoader = false;
      });
  },
});

export default getCategoryWithSlugSlice.reducer;
export const {clearFilterData} = getCategoryWithSlugSlice.actions;

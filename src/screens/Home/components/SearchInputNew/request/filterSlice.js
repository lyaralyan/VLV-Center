import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  selectedFilters: [],
  slug: '',
  brand: [],
  ct: [],
  maxPrice: '',
  minPrice: '',
  discount: 0,
  sort_by: '',
  deviceId: '',
};

const filterSlice = createSlice({
  name: 'filterState',
  initialState,
  reducers: {
    setDeviceId: (state, {payload}) => {
      state.deviceId = payload;
    },
    setSlug: (state, {payload}) => {
      state.slug = payload;
    },
    setMinPrice: (state, {payload}) => {
      state.minPrice = payload;
    },
    setMaxPrice: (state, {payload}) => {
      state.maxPrice = payload;
    },
    setDiscount: (state, {payload}) => {
      state.discount = payload;
    },
    setBrand: (state, action) => {
      const brand = action.payload;

      // Check if the brand is already selected
      const exists = state.brand.some(b => b?.id === brand?.id);

      if (exists) {
        // Remove the brand if it's already in the state
        state.brand = state.brand.filter(b => b?.id !== brand?.id);
      } else if (brand === null || brand === undefined) {
        state.brand = [];
      } else {
        // Add the brand to the state
        state.brand.push(brand);
      }
    },
    setCt: (state, action) => {
      const ct = action.payload;

      // Check if the brand is already selected
      const exists = state.ct.some(b => b?.id === ct?.id);

      if (exists) {
        // Remove the brand if it's already in the state
        state.ct = state.ct.filter(c => c?.id !== ct?.id);
      } else if (ct === null || ct === undefined) {
        state.ct = [];
      } else {
        // Add the brand to the state
        state.ct.push(ct);
      }
    },
    setSortBy: (state, {payload}) => {
      state.sort_by = payload;
    },
    setSelectedFilters: (state, action) => {
      state.selectedFilters = action.payload;
    },
    clearSelectedFilters: state => {
      state.selectedFilters = [];
      state.slug = '';
      state.brand = [];
      state.maxPrice = '';
      state.minPrice = '';
      state.discount = 0;
      state.sort_by = '';
      state.ct = [];
    },
  },
});

export const {
  setSelectedFilters,
  clearSelectedFilters,
  setSlug,
  setMinPrice,
  setMaxPrice,
  setDiscount,
  setBrand,
  setCt,
  setSortBy,
  setDeviceId,
} = filterSlice.actions;
export default filterSlice.reducer;

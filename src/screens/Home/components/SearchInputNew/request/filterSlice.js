import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  selectedFilters: [],
  slug: '',
  brand: [],
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
      } else if (brand === null) {
        state.brand = [];
      } else {
        // Add the brand to the state
        state.brand.push(brand);
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
  setSortBy,
  setDeviceId,
} = filterSlice.actions;
export default filterSlice.reducer;

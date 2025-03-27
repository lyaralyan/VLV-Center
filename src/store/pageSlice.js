import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isSearchPage: false,
};

const pageSlice = createSlice({
  name: 'isSearchPage',
  initialState,
  reducers: {
    setIsSearchPage: (state, {payload}) => {
      state.isSearchPage = payload;
    },
  },
});

export default pageSlice.reducer;
export const {setIsSearchPage} = pageSlice.actions;

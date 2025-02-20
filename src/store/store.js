import {combineReducers, configureStore} from '@reduxjs/toolkit';
import mainSlice from './MainSlice';
import cartSlice from './CartSlice';
import UserSlice from './UserSlice';
import searchSlice from './SearchPageSlice';
import categorySlice from '@screens/Search/screens/CategoryPage/request/categorySlice';
import filterSlice from '@screens/Home/components/SearchInputNew/request/filterSlice';
import getBrandsSlice from '@screens/Home/components/SearchInputNew/request/getBrandsSlice';
import getCategoryWithSlugSlice from '@screens/Home/components/SearchInputNew/request/getCategoryWithSlugSlice';

const rootReducer = combineReducers({
  main: mainSlice,
  cart: cartSlice,
  user: UserSlice,
  searchSlice,
  categorySlice,
  filterSlice,
  getBrandsSlice,
  getCategoryWithSlugSlice,
});

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  reducer: rootReducer,
});

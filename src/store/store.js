import {combineReducers, configureStore} from '@reduxjs/toolkit';
import mainSlice from './MainSlice';
import cartSlice from './CartSlice';
import UserSlice from './UserSlice';
import searchSlice from './SearchPageSlice';
import categorySlice from '@screens/Search/screens/CategoryPage/request/categorySlice';
import filterSlice from '@screens/Home/components/SearchInputNew/request/filterSlice';
import getBrandSlice from '@screens/Home/components/SearchInputNew/request/getBrandSlice';
import getCategoryWithSlugSlice from '@screens/Home/components/SearchInputNew/request/getCategoryWithSlugSlice';
import getHeaderSliderSlice from '@store/getHeaderSliderSlice';
import getSalesSlice from '@store/getSalesSlice';
import getFeatureCategoriesSlice from '@store/getFeatureCategoriesSlice';
import getBestDealProductSlice from '@store/getBestDealProductSlice';
import getBannerSlidersSlice from '@store/getBannerSlidersSlice';
import getTopRatingProductSlice from '@store/getTopRatingProductSlice';
import getBrandsSlice from '@store/getBrandsSlice';
import getHeaderCategoriesSlice from '@store/getHeaderCategoriesSlice';
import getThreeInOneSlice from '@store/getThreeInOneSlice';
import getBrandPageDataSlice from '@store/getBrandPageDataSlice';
import getAllBrandsSlice from '@store/getAllBrandsSlice';
import getCartPageProductsSlice from '@store/getCartPageProductsSlice';
import pageSlice from './pageSlice';

const rootReducer = combineReducers({
  main: mainSlice,
  cart: cartSlice,
  user: UserSlice,
  searchSlice,
  categorySlice,
  filterSlice,
  getBrandSlice,
  getCategoryWithSlugSlice,
  getHeaderSliderSlice,
  getSalesSlice,
  getFeatureCategoriesSlice,
  getBestDealProductSlice,
  getBannerSlidersSlice,
  getTopRatingProductSlice,
  getBrandsSlice,
  getHeaderCategoriesSlice,
  getThreeInOneSlice,
  getBrandPageDataSlice,
  getAllBrandsSlice,
  pageSlice,
  getCartPageProductsSlice,
});

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  reducer: rootReducer,
});

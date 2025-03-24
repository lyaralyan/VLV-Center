import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Http} from '../../http';
import {LOGIN, PASSWORD, TOKEN} from '@env';
import {getUniqueId} from 'react-native-device-info';
const initialState = {
  getFeatureCategoriesLoader: false,
  featureCategories: [],
};

export const getFeatureCategoriesRequest = createAsyncThunk(
  'getFeatureCategoriesSlice/getFeatureCategoriesRequest',
  async (_, {rejectWithValue}) => {
    try {
      const response = await Http.post('feature-categories-cat', undefined, {
        'Device-ID': getUniqueId(),
        login: LOGIN,
        password: PASSWORD,
        token: TOKEN,
      });

      return response;
    } catch (error) {
      return rejectWithValue({
        error: error.response?.data || 'An error occurred',
      });
    }
  },
);

const getFeatureCategoriesSlice = createSlice({
  name: 'getFeatureCategories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getFeatureCategoriesRequest.pending, state => {
        state.getFeatureCategoriesLoader = true;
      })
      .addCase(getFeatureCategoriesRequest.fulfilled, (state, {payload}) => {
        state.getFeatureCategoriesLoader = false;

        state.featureCategories = payload.featureCategoriesCat.map(item => {
          return {
            title_hy: item?.name_hy,
            title_ru: item?.name_ru,
            title_en: item?.name_en,
            image: item?.category_image?.image,
            slug: item.slug,
          };
        });
      })
      .addCase(getFeatureCategoriesRequest.rejected, state => {
        state.getFeatureCategoriesLoader = false;
      });
  },
});

export default getFeatureCategoriesSlice.reducer;

import { createAsyncThunk } from '@reduxjs/toolkit';
import * as categoryRepo from '@bic_todo/repositories/category';
import * as categorySlice from '@bic_todo/redux/slices/categorySlice';

export const fetchAllCategories = createAsyncThunk(
  'category/fetchAll',
  async (_, { dispatch }) => {
    try {
      const categories = await categoryRepo.fetchAllCategories();
      dispatch(categorySlice.fetchAllCategories(categories));
    } catch (error: any) {
      console.error(error);
    }
  },
);

import {
  createCategoriesTableIfNotExist,
  fetchAllCategories,
} from '@bic_todo/repositories/category';
import { createTasksTableIfNotExist } from '@bic_todo/repositories/task';
import * as categorySlice from '@bic_todo/redux/slices/categorySlice';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const initialize = createAsyncThunk(
  'app/initialize',
  async (_, { dispatch }) => {
    await createCategoriesTableIfNotExist();
    await createTasksTableIfNotExist();

    const categories = await fetchAllCategories();
    dispatch(categorySlice.fetchAllCategories(categories));
  },
);

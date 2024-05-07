import {
  createCategoriesTableIfNotExist,
  fetchAllCategories,
} from '@bic_todo/repositories/category';
import {
  createTasksTableIfNotExist,
  fetchAllTasks,
} from '@bic_todo/repositories/task';
import * as categorySlice from '@bic_todo/redux/slices/categorySlice';
import * as taskSlice from '@bic_todo/redux/slices/taskSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const initialize = createAsyncThunk(
  'app/initialize',
  async (_, { dispatch }) => {
    await createCategoriesTableIfNotExist();
    await createTasksTableIfNotExist();

    const categories = await fetchAllCategories();
    dispatch(categorySlice.fetchAllCategories(categories));

    const tasks = await fetchAllTasks();
    dispatch(taskSlice.fetchAllTasks(tasks));
  },
);

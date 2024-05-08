import * as repository from '@bic_todo/repositories/task';
import * as taskSlice from '@bic_todo/redux/slices/taskSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllTasksByCategoryId = createAsyncThunk(
  'task/fetchAllTasksByCategoryId',
  async (categoryId: number, { dispatch }) => {
    const tasks = await repository.fetchAllTasksByCategoryId(categoryId);
    dispatch(taskSlice.fetchAllCategoryTasks(tasks));
  },
);

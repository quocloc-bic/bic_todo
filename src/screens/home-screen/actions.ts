import * as repository from '@bic_todo/repositories/task';
import * as taskSlice from '@bic_todo/redux/slices/taskSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllTasks = createAsyncThunk(
  'task/fetchAllTasks',
  async (_, { dispatch }) => {
    const tasks = await repository.fetchAllTasks();
    dispatch(taskSlice.fetchAllTasks(tasks));
  },
);

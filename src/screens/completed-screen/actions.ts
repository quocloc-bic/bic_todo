import * as repository from '@bic_todo/repositories/task';
import * as taskSlice from '@bic_todo/redux/slices/taskSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllCompletedTasks = createAsyncThunk(
  'task/fetchAllCompletedTasks',
  async (_, { dispatch }) => {
    const tasks = await repository.fetchAllCompletedTasks();
    dispatch(taskSlice.fetchAllCompletedTasks(tasks));
  },
);

import * as repository from '@bic_todo/repositories/task';
import * as taskSlice from '@bic_todo/redux/slices/taskSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllTodayTasks = createAsyncThunk(
  'task/fetchAllTodayTasks',
  async (_, { dispatch }) => {
    const tasks = await repository.fetchAllTodayTasks();
    dispatch(taskSlice.fetchAllTodayTasks(tasks));
  },
);
